import { StatusCodes } from "http-status-codes";
import { NextApiResponse } from "next";

export default function ConflictError(res: NextApiResponse, message: string) {
	return res.status(StatusCodes.CONFLICT).json({ message });
}
