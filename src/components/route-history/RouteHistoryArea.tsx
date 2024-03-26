'use client';

import type { IRouteHistoryEntry } from '@/models/schemas/RouteHistoryEntry';
import { DatePicker } from '@mui/x-date-pickers';
import { useEffect, useState } from 'react';
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
import { getRoute } from '@/service/Route';

export default function RouteHistoryArea({
	initialRouteHistoryWithoutNames,
}: {
	initialRouteHistoryWithoutNames: IRouteHistoryEntry[];
}) {
	const initialRouteHistory = groupRHEsByWeek(
		initialRouteHistoryWithoutNames.map((RHE) => ({
			...RHE,
			name: '',
		}))
	);
	const [routeHistory, setRouteHistory] =
		useState<RouteGroup[]>(initialRouteHistory);
	const [filteredRouteHistory, setFilteredRouteHistory] =
		useState(routeHistory);

	const [filterOpen, setFilterOpen] = useState(false);
	const [filters, setFilters] = useState<{
		name: string;
		start: DateTime | null;
		end: DateTime | null;
	}>({ name: '', start: null, end: null });
	const [userInput, setUserInput] = useState<{
		name: string;
		start: DateTime | null;
		end: DateTime | null;
	}>({ name: '', start: null, end: null });

	useEffect(() => {
		const routeNamePromises = initialRouteHistoryWithoutNames.map(
			async (routeHistoryEntry) => {
				const route = await getRoute(routeHistoryEntry.routeId);
				if (!route) {
					throw new Error(
						`Route with ID ${routeHistoryEntry.routeId} does not exist`
					);
				}
				return route.title;
			}
		);
		Promise.all(routeNamePromises).then((routeName) => {});
	}, [initialRouteHistoryWithoutNames]);

	function groupRHEsByWeek(RHEs: (IRouteHistoryEntry & { name: string })[]) {
		// TODO
		const groupedRoutes: RouteGroup[] = [
			{
				week: 'every week',
				routes: RHEs,
			},
		];
		return groupedRoutes;
	}

	function applyFilterChanges() {
		setFilters(userInput);
		setFilterOpen(false);

		let newFilteredRouteHist = initialRouteHistory;
		newFilteredRouteHist.forEach((routeHistoryGroup) => {
			routeHistoryGroup.routes = routeHistoryGroup.routes.filter(
				(routeHistoryEntry: IRouteHistoryEntry & { name: string }) => {
					const datetime = DateTime.fromISO(routeHistoryEntry.datetimeISO);
					return (
						routeHistoryEntry.name.includes(userInput.name) &&
						(userInput.start ? datetime > userInput.start : true) &&
						(userInput.end ? datetime < userInput.end : true)
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
