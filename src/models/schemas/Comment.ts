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
		imageId: {
			type: String,
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
