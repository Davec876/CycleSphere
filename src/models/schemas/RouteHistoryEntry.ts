import { Schema } from 'mongoose';

export interface IRouteHistoryEntry {
	id: string;
	routeId: string;
	datetimeISO: string;
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
	datetimeISO: {
		type: String,
		required: true,
	},
});

export default routeHistoryEntrySchema;
