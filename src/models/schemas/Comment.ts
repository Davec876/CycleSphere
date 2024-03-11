import { type FlattenMaps, Schema } from 'mongoose';
import type { IAuthor } from './Author';
import authorSchema from './Author';

export interface IComment {
	id: string;
	author: IAuthor;
	body: string;
	likedByUserIds: string[];
	replies: {
		author: IAuthor;
		body: string;
	}[];
	imageId?: string;
	pin?: {
		location: {
			lat: number;
			lng: number;
		};
	};
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
		replies: [
			new Schema(
				{
					author: {
						type: authorSchema,
						required: true,
					},
					body: {
						type: String,
						required: true,
					},
				},
				{ _id: false }
			),
		],
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
