import { type FlattenMaps, Schema } from 'mongoose';
import authorSchema, { type IAuthor } from './Author';

export interface ICommentReply {
	id: string;
	author: IAuthor;
	body: string;
	likedByUserIds: string[];
	createdAt: Date;
	updatedAt: Date;
}

export type ICommentReplyFlat = FlattenMaps<ICommentReply>;
// Seperate interface for creation due to timestamps being managed by MongoDB
export interface ICommentReplyCreation
	extends Omit<ICommentReply, 'createdAt' | 'updatedAt'> {}

const commentReplySchema = new Schema<ICommentReply>(
	{
		id: {
			type: String,
			required: true,
		},
		body: {
			type: String,
			required: true,
		},
		author: {
			type: authorSchema,
			required: true,
		},
		likedByUserIds: {
			type: [String],
			required: true,
		},
	},
	{ _id: false, timestamps: true }
);

export default commentReplySchema;
