import type { IRouteHistoryEntry } from '@/models/schemas/RouteHistoryEntry';
import { Button, Dialog } from '@mui/material';
import type { DateTime } from 'luxon';
import { useState, type Dispatch, type SetStateAction } from 'react';

interface Filters {
	name: string;
	start: DateTime | null;
	end: DateTime | null;
}

const INITIAL_FILTER = {
	name: '',
	start: null,
	end: null,
};

export default function FilterBtn({
	routeHistory,
	setFilteredRouteHistory,
}: {
	routeHistory: IRouteHistoryEntry[];
	setFilteredRouteHistory: Dispatch<SetStateAction<IRouteHistoryEntry[]>>;
}) {
	const [dialogOpen, setDialogOpen] = useState(false);
	const [filters, setFilters] = useState<Filters>(INITIAL_FILTER);
	const [userInput, setUserInput] = useState<Filters>(INITIAL_FILTER);

	const applyFilterChanges = () => {
		setFilters(userInput);
		setDialogOpen(false);

		const filteredRouteHistory = routeHistory.filter((RHE) => {
			return true;
		});
	};

	return (
		<>
			<Button variant="contained">Filter</Button>
			<Dialog fullWidth open={dialogOpen}></Dialog>
		</>
	);
}
