import BaseTabPanel from './BaseTabPanel';
import Grid from '@mui/material/Unstable_Grid2';
import Typography from '@mui/material/Typography';
import { BarChart } from '@mui/x-charts';
import { IProfile } from '@/models/Profile';

export default function StatsTab(props: {
	index: number;
	value: number;
	profile: IProfile;
}) {
	return (
		<BaseTabPanel index={props.index} value={props.value}>
			<Typography variant="h5">{`${props.profile.name}'s Fitness Statistics`}</Typography>

			<Grid
				container
				spacing={4}
				rowSpacing={2}
				sx={{ justifyContent: 'center', marginTop: '2.5em' }}
			>
				<Grid lg={12} sx={{ textAlign: 'center' }}>
					<Typography variant="h6">Weekly Distance Cycled</Typography>

					{/* https://mui.com/x/react-charts/bars/ */}
					<BarChart
						height={350}
						yAxis={[
							{
								label: 'Distance Cycled (km)',
							},
						]}
						xAxis={[
							{
								label: 'Day of the Week',
								dataKey: 'day',
								scaleType: 'band',
							},
						]}
						dataset={sample_data}
						series={[
							{
								dataKey: 'distance',
								valueFormatter: chartOneFormatter,
							},
						]}
					></BarChart>
				</Grid>

				<Grid lg={12}>
					<hr></hr>
				</Grid>

				<Grid lg={12} sx={{ textAlign: 'center' }}>
					<Typography variant="h6">Weekly Calorie Burned</Typography>
					<BarChart
						height={350}
						yAxis={[
							{
								label: 'Calorie Burned (kcal)',
							},
						]}
						xAxis={[
							{
								label: 'Day of the Week',
								dataKey: 'day',
								scaleType: 'band',
							},
						]}
						dataset={sample_data}
						series={[
							{
								dataKey: 'calories',
								valueFormatter: chartTwoFormatter,
							},
						]}
					></BarChart>
				</Grid>
			</Grid>
		</BaseTabPanel>
	);
}

const chartOneFormatter = (value: number | null) => `${value} km cycled`;
const chartTwoFormatter = (value: number | null) => `${value} kcal burned`;

// Placeholder data
const sample_data = [
	{
		day: 'Mon',
		distance: 23,
		calories: 2890,
	},
	{
		day: 'Tue',
		distance: 14,
		calories: 1946,
	},
	{
		day: 'Wed',
		distance: 18,
		calories: 2603,
	},
	{
		day: 'Thu',
		distance: 9,
		calories: 1324,
	},
	{
		day: 'Fri',
		distance: 0,
		calories: 0,
	},
	{
		day: 'Sat',
		distance: 26,
		calories: 2432,
	},
	{
		day: 'Sun',
		distance: 31,
		calories: 3063,
	},
];
