import mongoose, { type FlattenMaps, Schema, type Types } from 'mongoose';

mongoose.connect(process.env.MONGODB_URI!);
mongoose.Promise = global.Promise;

interface IRoute {
	id: string;
	authorId: string;
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
		authorId: {
			type: String,
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
	},
	{ timestamps: true }
);

const Route: mongoose.Model<IRoute> =
	mongoose.models.Route || mongoose.model<IRoute>('Route', routeSchema);

export default Route;
