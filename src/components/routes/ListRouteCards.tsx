'use client';
import { type SyntheticEvent, useState, useMemo } from 'react';
import type { Route } from '@/app/page';
import RouteCard from './RouteCard';
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import Card from '@mui/material/Card';

export default function ListRouteCards({ routes }: { routes: Route[] }) {
	const [searchQuery, setSearchQuery] = useState('');

	const filteredRoutes = useMemo(() => {
		return routes.filter((route) =>
			route.title.toLowerCase().includes(searchQuery.toLowerCase())
		);
	}, [routes, searchQuery]);

	// Filter routes based on search input as the user types
	function handleInputChange(
		event: SyntheticEvent<Element, Event>,
		newInputValue: string
	) {
		setSearchQuery(newInputValue);
	}

	return (
		<>
			<Card sx={{ padding: 1, width: 345 }}>
				<Autocomplete
					freeSolo
					id="free-solo-2-demo"
					disableClearable
					options={routes.map((option) => option.title)}
					renderInput={(params) => (
						<TextField
							{...params}
							label="Search input"
							InputProps={{
								...params.InputProps,
								type: 'search',
							}}
						/>
					)}
					value={searchQuery}
					onInputChange={handleInputChange}
				/>
			</Card>
			{filteredRoutes.map((route) => {
				return <RouteCard key={route.id} route={route} />;
			})}
		</>
	);
}
