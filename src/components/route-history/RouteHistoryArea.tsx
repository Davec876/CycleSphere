'use client';

import type { IRouteHistoryEntry } from '@/models/schemas/RouteHistoryEntry';
import { Box, Button, Container, Typography } from '@mui/material';
import { useState } from 'react';

export default function RouteHistoryArea({
	initialRouteHistory,
}: {
	initialRouteHistory: IRouteHistoryEntry[];
}) {
	const [routeHistory, setRouteHistory] =
		useState<IRouteHistoryEntry[]>(initialRouteHistory);
	const [filteredRouteHistory, setFilteredRouteHistory] =
		useState(routeHistory);

	return (
		<Container maxWidth="sm" sx={{ p: 1 }}>
			<Box display="flex" justifyContent="space-between" alignItems="center">
				<Typography variant="h3" component="h2">
					Route History
				</Typography>
				<Button variant="contained">Filter</Button>
			</Box>
			{JSON.stringify(filteredRouteHistory)}
		</Container>
	);
}
