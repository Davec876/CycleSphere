import { Schema } from 'mongoose';

export interface IAuthor {
	id: string;
	name: string; // Denormalized data
}

const authorSchema = new Schema<IAuthor>(
	{
		id: {
			type: String,
			required: true,
		},
		name: {
			type: String,
			required: true,
		},
	},
	{ _id: false }
);

export default authorSchema;
