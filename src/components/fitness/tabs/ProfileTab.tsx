import BaseTabPanel from "./BaseTabPanel";
import Grid from '@mui/material/Unstable_Grid2';
import Button from '@mui/material/Button';
import AccountBoxIcon from '@mui/icons-material/AccountBox';
import Typography from '@mui/material/Typography';
import { useState, SyntheticEvent } from "react";
import { IProfile } from "@/models/Profile";
import { updateFitnessTracking } from "@/service/User";

export default function ProfileTab(props : {
    index: number; 
    value: number;
    profile: IProfile;
    handler: any;
}) {
    const [ tracking, setTracking ] = useState(props.profile.fitness_tracking || false);

    console.dir(tracking);

    function changeTracking(e : SyntheticEvent) {
        e.preventDefault();
        updateFitnessTracking(props.profile.id, !tracking);
        props.handler(!tracking);
        setTracking(!tracking);
    }

    return(
        <BaseTabPanel index={props.index} value={props.value}>
            
            <Grid container rowSpacing={4} sx={{ alignItems: 'center', justifyContent: 'space-evenly' }}>
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
                        <Typography variant="subtitle1">{tracking ? 'Currently tracking your fitness activity.' : 'Fitness tracking currently disabled.'}</Typography>
                    </Grid>

                    <Grid container sx={{ justifyContent: 'center' }}>
                        <Button variant="contained" color={tracking ? 'error' : 'success'} onClick={changeTracking}>{tracking ? 'Disable Fitness Tracking' : 'Enable Fitness Tracking'}</Button>
                    </Grid>
                </Grid>
            </Grid>

        </BaseTabPanel>
    );
}