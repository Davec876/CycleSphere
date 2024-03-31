// Author: Kevin Orenday

import mongoose, { Schema } from 'mongoose';
import routeSchema from './schemas/Route';
import type { IRoute } from './schemas/Route';

mongoose.connect(process.env.MONGODB_URI!);
mongoose.Promise = global.Promise;

export interface IActivity {
	id: string;
	userId: string;
	name: string;
	route: IRoute;
	mode?: string;
	duration?: {
		hours: number;
		minutes: number;
		seconds: number;
	};
	completedOn?: Date;
	status?: string;
}

export interface IActivityCreation
	extends Omit<IActivity, 'createdAt' | 'updatedAt'> {}

const activitySchema = new Schema<IActivity>(
	{
		id: {
			type: String,
			required: true,
		},
		userId: {
			type: String,
			required: true,
		},
		name: {
			type: String,
			required: true,
		},
		route: {
			type: routeSchema,
			required: true,
		},
		mode: {
			type: String,
		},
		duration: {
			hours: {
				type: Number,
				required: true,
			},
			minutes: {
				type: Number,
				required: true,
			},
			seconds: {
				type: Number,
				required: true,
			},
		},
		completedOn: {
			type: Date,
		},
		status: {
			type: String,
		},
	},
	{ timestamps: true }
);

const Activity: mongoose.Model<IActivity> =
	mongoose.models.Activity ||
	mongoose.model<IActivity>('Activity', activitySchema);

export default Activity;
