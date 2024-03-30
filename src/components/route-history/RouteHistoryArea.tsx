'use client';

import type { IRoute } from '@/models/Route';
import type { IRouteHistoryEntry } from '@/models/schemas/RouteHistoryEntry';
import { Box, Container, Typography } from '@mui/material';
import { useState } from 'react';
import FilterBtn from './FilterBtn';
import ListRouteHistory from './ListRouteHistory';

export interface CompleteRHE extends IRouteHistoryEntry {
	route: IRoute | null;
}

export default function RouteHistoryArea({
	routeHistory,
}: {
	routeHistory: CompleteRHE[];
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
