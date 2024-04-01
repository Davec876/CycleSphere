// Author: Kevin Orenday

import { useState, useEffect } from 'react';
import { getActivitiesByUserId } from '@/service/Activity';
import { formatDate } from '@/util/formatDate';
import type { IProfile } from '@/models/Profile';
import type { IActivity } from '@/models/Activity';
import BaseTabPanel from './BaseTabPanel';
import Grid from '@mui/material/Unstable_Grid2';
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ButtonGroup from '@mui/material/ButtonGroup';
import Button from '@mui/material/Button';
import CheckIcon from '@mui/icons-material/Check';
import DeleteIcon from '@mui/icons-material/Delete';

export default function ActivitiesTab(props: {
	index: number;
	value: number;
	profile: IProfile;
}) {
	const [filtered_list, setList] = useState([] as IActivity[]);
	const [activities, setActivities] = useState(null as unknown as IActivity[]);

	useEffect(() => {
		if (!activities) {
			getActivitiesByUserId(props.profile.id)
				.then((activities: IActivity[]) => {
					setList(activities);
					setActivities(activities);
				})
				.catch((error) => console.log(error));
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

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
						<ListItem
							key={`activity-item-${index}`}
							secondaryAction={
								<ButtonGroup variant="outlined">
									<Button
										variant="outlined"
										color="success"
										startIcon={<CheckIcon />}
									>
										Complete
									</Button>
									<Button
										variant="outlined"
										color="error"
										startIcon={<DeleteIcon />}
									>
										Delete
									</Button>
								</ButtonGroup>
							}
						>
							<ListItemText
								primary={activity.name}
								secondary={formatDate(activity.createdAt)}
							/>
						</ListItem>
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
