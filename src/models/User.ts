import mongoose, { Schema } from 'mongoose';

mongoose.connect(process.env.MONGODB_URI!);
mongoose.Promise = global.Promise;

interface IUser {
	id: string;
	name: string;
	email: string;
	password?: string;
}

const userSchema = new Schema<IUser>(
	{
		id: {
			type: String,
			required: true,
		},
		name: {
			type: String,
			required: true,
		},
		email: {
			type: String,
			required: true,
		},
		password: {
			type: String,
			required: true,
		},
	},
	{ timestamps: true }
);

const User: mongoose.Model<IUser> =
	mongoose.models.User || mongoose.model<IUser>('User', userSchema);

export default User;
