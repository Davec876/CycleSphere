import { Schema } from 'mongoose';

export interface IRouteHistoryEntry {
	id: string;
	routeId: string;
	routeTitle: string;
	datetime: Date;
}

const routeHistoryEntrySchema = new Schema<IRouteHistoryEntry>({
	id: {
		type: String,
		required: true,
	},
	routeId: {
		type: String,
		required: true,
	},
	routeTitle: {
		type: String,
		required: true,
	},
	datetime: {
		type: Date,
		required: true,
	},
});

export default routeHistoryEntrySchema;
