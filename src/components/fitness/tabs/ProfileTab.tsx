// Author: Kevin Orenday

import BaseTabPanel from './BaseTabPanel';
import Grid from '@mui/material/Unstable_Grid2';
import Button from '@mui/material/Button';
import AccountBoxIcon from '@mui/icons-material/AccountBox';
import Typography from '@mui/material/Typography';
import { useEffect, useState } from 'react';
import type { SyntheticEvent } from 'react';
import type { IProfile } from '@/models/Profile';
import { getUser, updateFitnessTracking } from '@/service/User';

export default function ProfileTab(props: {
	index: number;
	value: number;
	profile: IProfile;
}) {
	const [tracking, setTracking] = useState(null as unknown as boolean);

	useEffect(() => {
		if (!tracking)
			getUser(props.profile.id).then((user) => {
				setTracking(user?.fitness_tracking || false);
			});
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	function changeTracking(e: SyntheticEvent) {
		e.preventDefault();
		updateFitnessTracking(props.profile.id, !tracking);
		setTracking(!tracking);
	}

	return (
		<BaseTabPanel index={props.index} value={props.value}>
			<Grid
				container
				rowSpacing={4}
				sx={{ alignItems: 'center', justifyContent: 'space-evenly' }}
			>
				<Grid lg={4}>
					<Grid container sx={{ justifyContent: 'center' }}>
						<AccountBoxIcon sx={{ fontSize: 200 }} />
					</Grid>
					<Grid container sx={{ justifyContent: 'center' }}>
						<Typography variant="h5">{props.profile.name}</Typography>
					</Grid>
				</Grid>

				<Grid lg={8}>
					<Grid container spacing={4} sx={{ justifyContent: 'center' }}>
						<Grid lg={6}>
							<Button variant="contained">Connect your Strava</Button>
						</Grid>
						<Grid lg={6}>
							<Button variant="contained">Connect your Garmin</Button>
						</Grid>
					</Grid>

					<Grid container sx={{ justifyContent: 'center', marginTop: '2em' }}>
						<Typography variant="subtitle1">
							{tracking
								? 'Currently tracking your fitness activity.'
								: 'Fitness tracking currently disabled.'}
						</Typography>
					</Grid>

					<Grid container sx={{ justifyContent: 'center' }}>
						<Button
							variant="contained"
							color={tracking ? 'error' : 'success'}
							onClick={changeTracking}
						>
							{tracking
								? 'Disable Fitness Tracking'
								: 'Enable Fitness Tracking'}
						</Button>
					</Grid>
				</Grid>
			</Grid>
		</BaseTabPanel>
	);
}
