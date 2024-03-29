'use client';

import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import { SyntheticEvent, useEffect, useState } from 'react';
import ProfileTab from './tabs/ProfileTab';
import StatsTab from './tabs/StatsTab';
import HistoryTab from './tabs/HistoryTab';
import { IProfile } from '@/models/Profile';
import { getUser } from '@/service/User';

export default function FitnessCard(props: { profile: IProfile }) {
    const [ tab, setTab ] = useState(0);
    const [ tracking, setTracking ] = useState(false);

    useEffect(() => {
        setTracking(props.profile.fitness_tracking);
    }, [props.profile.fitness_tracking]);

    getUser(props.profile.id).then(user => { 
        props.profile.fitness_tracking = user?.fitness_tracking || false;
    });

    const changeTab = (event: SyntheticEvent, value: number) => {
        event.preventDefault();
        setTab(value);
    }

    return(
        <Card sx={{ width: '100%' }}>
            {/* https://mui.com/material-ui/react-tabs/ */}
            <Box>
                <Tabs value={tab} onChange={changeTab}>
                    <Tab label='Profile' id='tab-header-0' aria-controls='tabpanel-0' />
                    <Tab label='Stats' id='tab-header-1' aria-controls='tabpanel-1' disabled={!tracking} />
                    <Tab label='History' id='tab-header-2' aria-controls='tabpanel-2' disabled={!tracking} />
                </Tabs>
            </Box>
            <CardContent>
                <ProfileTab profile={props.profile} value={tab} index={0} handler={setTracking} />
                <StatsTab profile={props.profile} value={tab} index={1} />
                <HistoryTab profile={props.profile} value={tab} index={2} />
            </CardContent>
        </Card>
    );
}