'use client';

import { useState } from "react";
import BaseTabPanel from "./BaseTabPanel";
import Grid from '@mui/material/Unstable_Grid2';
import Box from '@mui/material/Box';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Typography from '@mui/material/Typography';
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import { IProfile } from "@/models/Profile";

export default function HistoryTab(props: { 
    index: number;
    value: number;
    profile: IProfile;
}) {
    const [ filtered_list, setList ] = useState(history_list);

    return(
        <BaseTabPanel index={props.index} value={props.value}>

            <Grid container sx={{ justifyContent: 'space-around' }}>
                <Grid lg={8}>
                    <Typography variant='h5'>{`${props.profile.name}'s Fitness History`}</Typography>
                </Grid>

                <Grid sm={4}>
                    {/* https://mui.com/material-ui/react-autocomplete/ */}
                    <Autocomplete
                        id="search-box"
                        freeSolo
                        options={history_list.map(list => list.trail)}
                        renderInput={(params) => <TextField {...params} label='Search history' InputProps={{...params.InputProps, type: 'search'}} />}
                        onInputChange={(event, value) => {
                            event.preventDefault();
                            console.dir(value);
                            const temp = history_list.filter(item => item.trail.toUpperCase() == value.toUpperCase());
                            console.dir(temp)
                            setList(temp);
                        }}
                    />
                </Grid>
            </Grid>
            <List>
                {
                    filtered_list.map((list, index) => 
                        <ListItem key={`item-${index}`}>
                            <ListItemText primary={list.trail} secondary={list.dateCompleted.toString()} />
                        </ListItem>
                    )
                }
            </List>

        </BaseTabPanel>
    );
};

const history_list = [
    {
        trail: 'Trail #1',
        distance: 32,
        rating: 5,
        dateCompleted: '2024-03-25'
    },
    {
        trail: 'Trail #2',
        distance: 12,
        rating: 3,
        dateCompleted: '2024-03-24'
    },
    {
        trail: 'Trail #3',
        distance: 8,
        rating: 4.5,
        dateCompleted: '2024-03-21'
    },
    {
        trail: 'Trail #4',
        distance: 38,
        rating: 4.9,
        dateCompleted: '2024-03-19'
    },
    {
        trail: 'Trail #5',
        distance: 15,
        rating: 4.2,
        dateCompleted: '2024-02-25'
    },
    {
        trail: 'Trail #6',
        distance: 5,
        rating: 2.1,
        dateCompleted: '2024-02-14'
    }
];