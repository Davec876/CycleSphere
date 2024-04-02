// Author: Kevin Orenday

import { useState, useEffect } from 'react';
import { getActivitiesByUserId } from '@/service/Activity';
import type { IProfile } from '@/models/Profile';
import type { IActivity } from '@/models/Activity';
import BaseTabPanel from './BaseTabPanel';
import Grid from '@mui/material/Unstable_Grid2';
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import List from '@mui/material/List';
import ActivityListItem from '../ActivityListItem';

export default function ActivitiesTab(props: {
	index: number;
	value: number;
	profile: IProfile;
}) {
	const [filtered_list, setList] = useState([] as IActivity[]);
	const [activities, setActivities] = useState(null as unknown as IActivity[]);
	const [reload, setReload] = useState(false);

	useEffect(() => {
		getActivitiesByUserId(props.profile.id)
			.then((activities: IActivity[]) => {
				setList(activities);
				setActivities(activities);
			})
			.catch((error) => console.log(error));
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [reload]);

	const forceReload = () => setReload(!reload);

	return (
		<BaseTabPanel index={props.index} value={props.value}>
			<Grid container sx={{ justifyContent: 'space-between' }}>
				<Grid lg={'auto'}>
					<Typography variant="h5">Activity List</Typography>
				</Grid>

				<Grid lg={5}>
					{/* https://mui.com/material-ui/react-autocomplete/ */}
					<Autocomplete
						id="activities-search-box"
						freeSolo
						disableClearable
						sx={{ minWidth: '250px' }}
						options={activities?.map((activity) => activity.name) || []}
						renderInput={(params) => (
							<TextField
								{...params}
								label="Search activity"
								InputProps={{ ...params.InputProps, type: 'search' }}
							/>
						)}
						onInputChange={(event, value) => {
							event.preventDefault();
							const temp =
								activities?.filter((activity) => {
									const regex = new RegExp(`.*${value}.*`, 'ig');
									return activity?.name?.match(regex)?.length;
								}) || [];
							setList(temp);
						}}
					/>
				</Grid>
			</Grid>

			{filtered_list.length > 0 ? (
				<List>
					{filtered_list.map((activity, index) => (
						<ActivityListItem
							activity={activity}
							key={`activity-item-${index}`}
							reload={forceReload}
						/>
					))}
				</List>
			) : (
				<Typography
					variant="overline"
					display={'block'}
					textAlign={'center'}
					marginTop={'2.5em'}
				>
					You currently have no activities
				</Typography>
			)}
		</BaseTabPanel>
	);
}
