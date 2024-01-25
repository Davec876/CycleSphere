import mongoose, { Schema } from 'mongoose';

mongoose.connect(process.env.MONGODB_URI!);
mongoose.Promise = global.Promise;

interface IUser {
	name: string;
	email: string;
	password?: string;
}

const userSchema = new Schema<IUser>(
	{
		name: String,
		email: String,
		password: String,
	},
	{ timestamps: true }
);

const User: mongoose.Model<IUser> =
	mongoose.models.User || mongoose.model<IUser>('User', userSchema);

export default User;
