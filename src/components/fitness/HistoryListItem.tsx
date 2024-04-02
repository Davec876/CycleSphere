// Author: Kevin Orenday

import type { IActivity } from '@/models/Activity';
import ListItem from '@mui/material/ListItem';
import Grid from '@mui/material/Unstable_Grid2';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMore from '@mui/icons-material/ExpandMore';
import { formatDate, formatTime } from '@/util/formatDate';

export default function HistoryListItem(props: {
	activity: IActivity;
	key: string;
}) {
	return (
		<ListItem>
			<Accordion sx={{ width: '100%' }}>
				<AccordionSummary expandIcon={<ExpandMore />}>
					{props.activity.name}
				</AccordionSummary>
				<AccordionDetails>
					{props.activity.historyLogs?.map((historyLog, index) => (
						<Grid
							container
							justifyContent={'space-between'}
							alignItems={'center'}
							key={`grid-${props.activity.name.toLocaleLowerCase()}-${index}`}
							sx={{ marginY: '0.5em' }}
						>
							<Grid lg={8} textAlign={'left'}>
								<Typography textAlign={'start'}>{historyLog.log}.</Typography>
							</Grid>
							<Grid lg={4} textAlign={'right'}>
								<Typography
									variant="overline"
									fontStyle={'italic'}
									color={'primary'}
								>
									{formatDate(historyLog.updatedAt)}
									{' @ '}
									{formatTime(historyLog.updatedAt)}
								</Typography>
							</Grid>
						</Grid>
					))}
				</AccordionDetails>
			</Accordion>
		</ListItem>
	);
}
