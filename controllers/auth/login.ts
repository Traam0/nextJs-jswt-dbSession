import { NextApiRequest, NextApiResponse } from "next";
import { Session, User } from "~/Models";
import {
	InternalServerError,
	NotFoundError,
	UnAuthenticatedError,
} from "~/errors";
import bcryptjs from "bcryptjs";
import { attachCookies, signToken } from "~/utils";
import { StatusCodes } from "http-status-codes";

export async function loginAttempt(
	req: NextApiRequest,
	res: NextApiResponse
): Promise<void> {
	const salt = await bcryptjs.genSalt(10);
	const user = await User.findOne({ email: req.body.email });

	if (!user) throw NotFoundError(res, "User does not exist");

	const passwordDoesMatch: boolean = await bcryptjs.compare(
		req.body.password,
		user.password
	);

	if (!passwordDoesMatch)
		throw UnAuthenticatedError(res, "Credentials do not match!");

	const refresh = await Session.findOne({ user_id: user._id });

	if (refresh) {
		await Session.deleteOne({ _id: refresh._id });
	}

	const RTS = signToken(
		{
			id: user._id,
			email: user.email,
		},
		"30d"
	);

	try {
		await Session.create({ user_id: user._id, RTS });
	} catch (error) {
		console.log(error);
		throw InternalServerError(
			res,
			"session cannot be created --track contollers.login L31"
		);
	}

	const accessToken = signToken(
		{
			id: user._id,
			email: user.email,
			RTS,
		},
		"30m"
	);

	attachCookies({ req, res, token: accessToken });
	const { password, ...payload } = user._doc;
	res.status(StatusCodes.OK).json(payload);
}
