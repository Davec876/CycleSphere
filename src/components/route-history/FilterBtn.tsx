import {
	Button,
	Dialog,
	DialogContent,
	DialogTitle,
	TextField,
} from '@mui/material';
import Grid from '@mui/material/Unstable_Grid2';
import { DatePicker } from '@mui/x-date-pickers';
import { DateTime } from 'luxon';
import { useState, type Dispatch, type SetStateAction } from 'react';
import type { CompleteRHE } from './RouteHistoryArea';

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
	routeHistory: CompleteRHE[];
	setFilteredRouteHistory: Dispatch<SetStateAction<CompleteRHE[]>>;
}) {
	const [dialogOpen, setDialogOpen] = useState(false);
	const [filters, setFilters] = useState<Filters>(INITIAL_FILTER);
	const [userInput, setUserInput] = useState<Filters>(INITIAL_FILTER);

	const applyFilterChanges = () => {
		setFilters(userInput);
		setDialogOpen(false);

		const filteredRouteHistory = routeHistory.filter((RHE) => {
			const datetime = DateTime.fromISO(RHE.datetimeISO);
			const containsName =
				userInput.name === ''
					? true // ensures invalid routes are shown when there is no name filter
					: RHE.route?.title
							.toLowerCase()
							.includes(userInput.name.toLowerCase());
			const afterStart = userInput.start ? datetime >= userInput.start : true;
			const beforeEnd = userInput.end ? datetime <= userInput.end : true;

			return containsName && afterStart && beforeEnd;
		});
		setFilteredRouteHistory(filteredRouteHistory);
	};

	const handleDialogClose = () => {
		setDialogOpen(false);
		setUserInput(filters); // cancel user's changes to filters
	};

	return (
		<>
			<Button variant="contained" onClick={() => setDialogOpen(true)}>
				Filter
			</Button>
			<Dialog fullWidth open={dialogOpen} onClose={handleDialogClose}>
				<DialogTitle textAlign="center" variant="h3" component="h4">
					Filter
				</DialogTitle>
				<DialogContent>
					<Grid container spacing={2}>
						<Grid xs={12}>
							<TextField
								value={userInput.name}
								name="name"
								onChange={(e) =>
									setUserInput({ ...userInput, name: e.target.value })
								}
								placeholder="Trail Name"
								fullWidth
							/>
						</Grid>
						<Grid xs={12} sm={6}>
							<DatePicker
								label="Visited after..."
								disableFuture
								sx={{ width: '100% ' }}
								value={userInput.start}
								onChange={(date) => setUserInput({ ...userInput, start: date })}
							/>
						</Grid>
						<Grid xs={12} sm={6}>
							<DatePicker
								label="Visited before..."
								disableFuture
								sx={{ width: '100% ' }}
								value={userInput.end}
								onChange={(date) => setUserInput({ ...userInput, end: date })}
							/>
						</Grid>
					</Grid>
					<Button
						variant="contained"
						size="large"
						sx={{ mt: 2 }}
						onClick={applyFilterChanges}
					>
						Apply
					</Button>
				</DialogContent>
			</Dialog>
		</>
	);
}
