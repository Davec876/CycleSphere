// Author: Kevin Orenday

import { useState } from 'react';
import BaseTabPanel from './BaseTabPanel';
import Grid from '@mui/material/Unstable_Grid2';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Typography from '@mui/material/Typography';
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import type { IProfile } from '@/models/Profile';
import { getRoutesByAuthorId } from '@/service/Route';
import type { IRouteFlat } from '@/models/Route';
import { formatDate } from '@/util/formatDate';

export default function HistoryTab(props: {
	index: number;
	value: number;
	profile: IProfile;
}) {
	const [filtered_list, setList] = useState([] as IRouteFlat[]);
	const [routes, setRoutes] = useState(undefined as unknown as IRouteFlat[]);

	if (!routes)
		getRoutesByAuthorId(props.profile.id).then((data) => {
			setRoutes(data);
			setList(data);
		});

	return (
		<BaseTabPanel index={props.index} value={props.value}>
			<Grid container sx={{ justifyContent: 'space-between' }}>
				<Grid lg={'auto'}>
					<Typography variant="h5">Activity History</Typography>
				</Grid>

				<Grid lg={5}>
					{/* https://mui.com/material-ui/react-autocomplete/ */}
					<Autocomplete
						id="history-search-box"
						freeSolo
						disableClearable
						sx={{ minWidth: '250px' }}
						options={routes?.map((list: { title: string }) => list.title) || []}
						renderInput={(params) => (
							<TextField
								{...params}
								label="Search history"
								InputProps={{ ...params.InputProps, type: 'search' }}
							/>
						)}
						onInputChange={(event, value) => {
							event.preventDefault();
							const temp = routes.filter((route: { title: string }) => {
								const regex = new RegExp(`.*${value}.*`, 'ig');
								return route?.title?.match(regex)?.length;
							});
							setList(temp);
						}}
					/>
				</Grid>
			</Grid>

			{filtered_list.length > 0 ? (
				<List>
					{filtered_list.map(
						(route: { title: string; updatedAt: Date }, index) => (
							<ListItem key={`item-${index}`}>
								<ListItemText
									primary={route.title}
									secondary={formatDate(route.updatedAt)}
								/>
							</ListItem>
						)
					)}
				</List>
			) : (
				<Typography
					variant="overline"
					display={'block'}
					textAlign={'center'}
					marginTop={'2.5em'}
				>
					There are no activities in your history
				</Typography>
			)}
		</BaseTabPanel>
	);
}
