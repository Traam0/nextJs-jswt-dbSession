import { Schema, model, models } from "mongoose";

const UserSchema = new Schema(
	{
		firstName: {
			type: String,
			trim: true,
			lowercase: true,
			required: true,
		},
		lastName: {
			type: String,
			trim: true,
			lowercase: true,
			required: true,
		},
		birthDate: {
			type: String,
			trim: true,
			lowercase: true,
			required: false,
		},
		email: {
			type: String,
			trim: true,
			lowercase: true,
			required: true,
			unique: true,
		},
		password: {
			type: String,
			required: true,
		},
		engram_id: {
			type: String,
			required: true,
			unique: true,
		},
	},
	{ timestamps: true }
);

export default models.User || model("User", UserSchema);
