'use client';
import { type SyntheticEvent, useState, useMemo } from 'react';
import RouteCard from './RouteCard';
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';
import IconButton from '@mui/material/IconButton';
import SortButton from './SortButton';
import SearchIcon from '@mui/icons-material/Search';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import type { IRouteFlat } from '@/models/Route';
import AddRouteFAB from './AddRouteFAB';
import { useSession } from 'next-auth/react';

export default function ListRouteCards({
	routes: ssrRoutes,
}: {
	routes: IRouteFlat[];
}) {
	const { data: session } = useSession();
	const [routes, setRoutes] = useState(ssrRoutes);
	const [checked, setChecked] = useState('oldest');
	const [searchQuery, setSearchQuery] = useState('');

	const filteredAndSortedRoutes = useMemo(() => {
		// filter the routes based on the search query
		const filtered = routes.filter((route) =>
			route.title.toLowerCase().includes(searchQuery.toLowerCase())
		);

		// sort filtered routes based on checked sort option
		const sorted = filtered.sort((a, b) => {
			switch (checked) {
				case 'oldest':
					return a.createdAt.getTime() - b.createdAt.getTime();
				case 'recentlyAdded':
					return b.createdAt.getTime() - a.createdAt.getTime();
				case 'difficulty':
					return b.difficulty - a.difficulty;
				case 'liked':
					return b.likedByUserIds.length - a.likedByUserIds.length;
				default:
					return 0;
			}
		});

		return sorted;
	}, [routes, searchQuery, checked]);

	// Filter routes based on search input as the user types
	function handleInputChange(
		event: SyntheticEvent<Element, Event>,
		newInputValue: string
	) {
		setSearchQuery(newInputValue);
	}

	return (
		<>
			<Card sx={{ padding: 1, width: [350, 425, 500] }}>
				<Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
					<Autocomplete
						freeSolo
						disableClearable
						options={routes.map((option) => option.title)}
						renderInput={(params) => (
							<TextField
								{...params}
								label="Search routes"
								InputProps={{
									...params.InputProps,
									type: 'search',
									endAdornment: (
										<InputAdornment position="end">
											<IconButton>
												<SearchIcon />
											</IconButton>
										</InputAdornment>
									),
								}}
							/>
						)}
						value={searchQuery}
						onInputChange={handleInputChange}
						sx={{ width: '93%', marginRight: 1 }}
					/>
					<SortButton checked={checked} setChecked={setChecked} />
				</Box>
			</Card>
			{filteredAndSortedRoutes.map((route) => {
				return <RouteCard key={route.id} route={route} setRoutes={setRoutes} />;
			})}
			{session?.user && <AddRouteFAB setRoutes={setRoutes} />}
		</>
	);
}
