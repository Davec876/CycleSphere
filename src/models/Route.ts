import mongoose, { type FlattenMaps, Schema, type Types } from 'mongoose';
import commentSchema, { type IComment } from './schemas/Comment';
import type { IAuthor } from './schemas/Author';
import authorSchema from './schemas/Author';

mongoose.connect(process.env.MONGODB_URI!);
mongoose.Promise = global.Promise;

interface IRoute {
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

export type IRouteFlat = FlattenMaps<IRoute> & {
	_id: Types.ObjectId;
};

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

const Route: mongoose.Model<IRoute> =
	mongoose.models.Route || mongoose.model<IRoute>('Route', routeSchema);

export default Route;
