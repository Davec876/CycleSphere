// Modified by Kevin Orenday
// Original code from models/Route.ts

import { Schema } from 'mongoose';
import type { IAuthor } from './Author';
import authorSchema from './Author';
import type { IComment } from './Comment';
import commentSchema from './Comment';

export interface IRoute {
	id: string;
	author: IAuthor;
	title: string;
	body: string;
	imageId: string;
	difficulty: number;
	likedByUserIds: string[];
	location: {
		lat: number;
		lng: number;
	};
	selectedPoints: {
		lat: number;
		lng: number;
	}[];
	comments: IComment[];
	distance?: number;
	createdAt: Date;
	updatedAt: Date;
}

const routeSchema = new Schema<IRoute>(
	{
		id: {
			type: String,
			required: true,
		},
		author: {
			type: authorSchema,
			required: true,
		},
		title: {
			type: String,
			required: true,
		},
		body: {
			type: String,
			required: true,
		},
		imageId: {
			type: String,
		},
		difficulty: {
			type: Number,
			required: true,
		},
		likedByUserIds: {
			type: [String],
			required: true,
		},
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
		selectedPoints: [
			new Schema(
				{
					lat: {
						type: Number,
						required: true,
					},
					lng: {
						type: Number,
						required: true,
					},
				},
				{ _id: false }
			),
		],
		comments: [commentSchema],
		distance: Number,
	},
	{ timestamps: true }
);

export default routeSchema;
