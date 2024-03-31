// Author: Kevin Orenday

'use client';

import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import ProfileTab from './tabs/ProfileTab';
import StatsTab from './tabs/StatsTab';
import HistoryTab from './tabs/HistoryTab';
import type { SyntheticEvent } from 'react';
import type { IProfile } from '@/models/Profile';
import { useState } from 'react';
import { getUser } from '@/service/User';
import ActivitiesTab from './tabs/ActivitiesTab';

export default function FitnessCard(props: { profile: IProfile }) {
	const [tab, setTab] = useState(0);
	const [tracking, setTracking] = useState(undefined as unknown as boolean);

	if (!tracking)
		getUser(props.profile.id).then((user) => {
			props.profile.fitness_tracking = user?.fitness_tracking || false;
			setTracking(user?.fitness_tracking || false);
		});

	const changeTab = (event: SyntheticEvent, value: number) => {
		event.preventDefault();
		setTab(value);
	};

	return (
		<Card sx={{ width: '100%' }}>
			{/* https://mui.com/material-ui/react-tabs/ */}
			<Box>
				<Tabs value={tab} onChange={changeTab}>
					<Tab label="Profile" id="tab-header-0" aria-controls="tabpanel-0" />
					<Tab
						label="Activities"
						id="tab-header-1"
						aria-controls="tabpanel-1"
					/>
					<Tab label="Stats" id="tab-header-2" aria-controls="tabpanel-2" />
					<Tab label="History" id="tab-header-3" aria-controls="tabpanel-3" />
				</Tabs>
			</Box>
			<CardContent>
				<ProfileTab profile={props.profile} value={tab} index={0} />
				<ActivitiesTab profile={props.profile} value={tab} index={1} />
				<StatsTab profile={props.profile} value={tab} index={2} />
				<HistoryTab profile={props.profile} value={tab} index={3} />
			</CardContent>
		</Card>
	);
}
