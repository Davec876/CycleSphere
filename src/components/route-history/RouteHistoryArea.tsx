'use client';

import type { IRouteHistoryEntry } from '@/models/schemas/RouteHistoryEntry';
import { Box, Container, Typography } from '@mui/material';
import { useState } from 'react';
import ListRouteHistory from './ListRouteHistory';
import FilterBtn from './FilterBtn';

export default function RouteHistoryArea({
	routeHistory,
}: {
	routeHistory: IRouteHistoryEntry[];
}) {
	const [filteredRouteHistory, setFilteredRouteHistory] =
		useState(routeHistory);

	return (
		<Container maxWidth="sm" sx={{ p: 1 }}>
			<Box display="flex" justifyContent="space-between" alignItems="center">
				<Typography variant="h3" component="h2">
					Route History
				</Typography>
				<FilterBtn
					routeHistory={routeHistory}
					setFilteredRouteHistory={setFilteredRouteHistory}
				/>
			</Box>

			<ListRouteHistory routeHistory={filteredRouteHistory} />
		</Container>
	);
}
