import { type FlattenMaps, Schema } from 'mongoose';
import authorSchema, { type IAuthor } from './Author';
import commentReplySchema, { type ICommentReply } from './CommentReply';

export interface IPin {
	location: {
		lat: number;
		lng: number;
	};
}

export interface IComment {
	id: string;
	author: IAuthor;
	body: string;
	likedByUserIds: string[];
	replies: ICommentReply[];
	imageId?: string;
	pin?: IPin;
	createdAt: Date;
	updatedAt: Date;
}

export type ICommentFlat = FlattenMaps<IComment>;
// Seperate interface for creation due to timestamps being managed by MongoDB
export interface ICommentCreation
	extends Omit<IComment, 'createdAt' | 'updatedAt'> {}

const commentSchema = new Schema<IComment>(
	{
		id: {
			type: String,
			required: true,
		},
		author: {
			type: authorSchema,
			required: true,
		},
		body: {
			type: String,
			required: true,
		},
		likedByUserIds: {
			type: [String],
			required: true,
		},
		replies: {
			type: [commentReplySchema],
			required: true,
		},
		imageId: {
			type: String,
		},
		pin: {
			location: {
				lat: {
					type: Number,
					required: true,
				},
				lng: {
					type: Number,
					required: true,
				},
			},
		},
	},
	{ _id: false, timestamps: true }
);

export default commentSchema;
