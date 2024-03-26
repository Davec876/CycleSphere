'use client';

import type { IRouteHistoryEntry } from '@/models/schemas/RouteHistoryEntry';
import { DatePicker } from '@mui/x-date-pickers';
import { useState } from 'react';
import {
	Box,
	Button,
	Container,
	Dialog,
	DialogContent,
	DialogTitle,
	TextField,
	Typography,
} from '@mui/material';
import Grid from '@mui/material/Unstable_Grid2';
import type { RouteGroup } from './RouteGroupSection';
import RouteGroupSection from './RouteGroupSection';
import { DateTime } from 'luxon';
import type { Route } from './RouteCard';

// hardcoded data
const ROUTE_HISTORY: RouteGroup[] = [
	{
		week: 'This week',
		routes: [
			{
				id: 'mainland-n-trail',
				name: 'Mainland N Trail',
				datetime: DateTime.fromISO('2024-01-30T15:59'),
			},
		],
	},
	{
		week: 'Last week',
		routes: [
			{
				id: 'mainland-n-trail',
				name: 'Mainland N Trail',
				datetime: DateTime.fromISO('2024-01-26T16:26'),
			},
			{
				id: 'mainland-n-trail',
				name: 'Mainland N Trail',
				datetime: DateTime.fromISO('2024-01-24T13:11'),
			},
		],
	},
	{
		week: 'Week of 15 Jan',
		routes: [
			{
				id: 'geyzer-hill-trail',
				name: 'Geyzer Hill Trail',
				datetime: DateTime.fromISO('2024-01-17T17:35'),
			},
			{
				id: 'mainland-n-trail',
				name: 'Mainland N Trail',
				datetime: DateTime.fromISO('2024-01-16T11:18'),
			},
		],
	},
];

export default function RouteHistoryArea({
	initialRouteHistory,
}: {
	initialRouteHistory: IRouteHistoryEntry[];
}) {
	const [routeHistory, setRouteHistory] =
		useState<IRouteHistoryEntry[]>(initialRouteHistory);
	const [filteredRouteHistory, setFilteredRouteHistory] = useState(
		copyInitialRouteHistory()
	);

	const [filterOpen, setFilterOpen] = useState(false);
	const [filters, setFilters] = useState<{
		name: string;
		start: DateTime | null;
		end: DateTime | null;
	}>({ name: '', start: DateTime.fromISO('2024-01-01'), end: DateTime.now() });
	const [userInput, setUserInput] = useState<{
		name: string;
		start: DateTime | null;
		end: DateTime | null;
	}>({ name: '', start: DateTime.fromISO('2024-01-01'), end: DateTime.now() });

	function copyInitialRouteHistory(): RouteGroup[] {
		const copy: RouteGroup[] = [];
		ROUTE_HISTORY.forEach((routeHistGrp) => {
			const routeHistGrpCopy: { week: string; routes: Route[] } = {
				week: routeHistGrp.week,
				routes: [],
			};
			routeHistGrp.routes.forEach((routeHistEntry) => {
				routeHistGrpCopy.routes.push(routeHistEntry);
			});
			copy.push(routeHistGrpCopy);
		});
		return copy;
	}

	function applyFilterChanges() {
		setFilters(userInput);
		setFilterOpen(false);

		let newFilteredRouteHist = copyInitialRouteHistory();
		newFilteredRouteHist.forEach((routeHistoryGroup) => {
			routeHistoryGroup.routes = routeHistoryGroup.routes.filter(
				(routeHistoryEntry) => {
					return (
						routeHistoryEntry.name.includes(userInput.name) &&
						userInput.start &&
						userInput.end &&
						routeHistoryEntry.datetime > userInput.start &&
						routeHistoryEntry.datetime < userInput.end
					);
				}
			);
		});
		newFilteredRouteHist = newFilteredRouteHist.filter(
			(routeHistoryGroup) => routeHistoryGroup.routes.length > 0
		);
		setFilteredRouteHistory(newFilteredRouteHist);
	}

	return (
		<Container maxWidth="md">
			<Box display="flex" justifyContent="space-between" marginY={3}>
				<Typography variant="h4" component="h1">
					Route History
				</Typography>
				<Button variant="contained" onClick={setFilterOpen.bind(null, true)}>
					Filter
				</Button>
			</Box>

			{filteredRouteHistory.map((routeGroup) => (
				<RouteGroupSection key={routeGroup.week} routeGroup={routeGroup} />
			))}

			<Dialog
				fullWidth
				open={filterOpen}
				onClose={() => {
					setFilterOpen(false);
					setUserInput(filters);
				}}
			>
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
		</Container>
	);
}
