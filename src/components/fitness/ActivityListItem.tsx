// Author: Kevin Orenday

import type { IActivity } from '@/models/Activity';
import type { SyntheticEvent } from 'react';
import { formatDate } from '@/util/formatDate';
import { useState } from 'react';
import Grid from '@mui/material/Unstable_Grid2';
import Avatar from '@mui/material/Avatar';
import ListItem from '@mui/material/ListItem';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import ListItemText from '@mui/material/ListItemText';
import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import TextField from '@mui/material/TextField';
import Card from '@mui/material/Card';
import CheckIcon from '@mui/icons-material/CheckSharp';
import DeleteIcon from '@mui/icons-material/DeleteSharp';
import BikeIcon from '@mui/icons-material/DirectionsBike';
import {
	finishActivity,
	deleteActivity,
	updateActivityDuration,
} from '@/service/Activity';

export default function ActivityListItem(props: {
	activity: IActivity;
	key: string;
	reload: () => void;
}) {
	const [openFinish, setOpenFinish] = useState(false);
	const [openDelete, setOpenDelete] = useState(false);

	const openFinishModal = () => setOpenFinish(true);

	const handleFinishCancel = (event: SyntheticEvent) => {
		event.preventDefault();
		setOpenFinish(false);
	};

	const handleFinishSubmit = async (
		event: React.FormEvent<HTMLFormElement>
	) => {
		event.preventDefault();
		const formData = new FormData(event.currentTarget);
		const formJson = Object.fromEntries(formData.entries());
		const { hours, minutes, seconds } = formJson;

		await updateActivityDuration({
			id: props.activity.id,
			duration: {
				hours: Number.parseInt(hours.toString()),
				minutes: Number.parseInt(minutes.toString()),
				seconds: Number.parseInt(seconds.toString()),
			},
		}).catch(console.error);

		await finishActivity(props.activity.id).catch(console.error);

		handleFinishCancel(event);
		props.reload();
	};

	const openDeleteModal = () => setOpenDelete(true);

	const handleDeleteCancel = (event: SyntheticEvent) => {
		event.preventDefault();
		setOpenDelete(false);
	};

	const handleDeleteSubmit = async (
		event: React.FormEvent<HTMLFormElement>
	) => {
		event.preventDefault();
		await deleteActivity(props.activity.id).catch(console.error);
		handleDeleteCancel(event);
		props.reload();
	};

	return (
		<Card variant="outlined" sx={{ marginY: '0.5em' }}>
			<ListItem
				secondaryAction={
					<ButtonGroup variant="outlined">
						<Button
							variant="outlined"
							color="success"
							startIcon={<CheckIcon />}
							onClick={openFinishModal}
							disabled={props.activity.status === 'finished'}
						>
							{props.activity.status === 'finished' ? 'Finished' : 'Finish'}
						</Button>
						<Button
							variant="outlined"
							color="error"
							startIcon={<DeleteIcon />}
							onClick={openDeleteModal}
						>
							Delete
						</Button>
					</ButtonGroup>
				}
			>
				<ListItemAvatar>
					<Avatar>
						<BikeIcon />
					</Avatar>
				</ListItemAvatar>
				<ListItemText
					primary={props.activity.name}
					secondary={formatDate(props.activity.createdAt)}
				/>
				<Dialog
					open={openFinish}
					onClose={handleFinishCancel}
					PaperProps={{
						component: 'form',
						onSubmit: handleFinishSubmit,
					}}
				>
					<DialogTitle>Mark as Finished?</DialogTitle>
					<DialogContent>
						<Grid
							container
							spacing={1}
							justifyContent={'space-between'}
							alignItems={'center'}
							paddingY={'2em'}
						>
							<Grid lg={5}>
								<DialogContentText>Enter Activity Duration</DialogContentText>
							</Grid>

							<Grid container lg={7}>
								<Grid lg={4}>
									<TextField
										required
										name="hours"
										label="hh"
										type="number"
										size="small"
										InputProps={{
											inputProps: { min: 0, max: 99, step: 1 },
										}}
									/>
								</Grid>
								<Grid lg={4}>
									<TextField
										required
										name="minutes"
										label="mm"
										type="number"
										size="small"
										InputProps={{ inputProps: { min: 0, max: 59, step: 1 } }}
									/>
								</Grid>
								<Grid lg={4}>
									<TextField
										required
										name="seconds"
										label="ss"
										type="number"
										size="small"
										InputProps={{ inputProps: { min: 0, max: 59, step: 1 } }}
									/>
								</Grid>
							</Grid>
						</Grid>
					</DialogContent>
					<DialogActions>
						<Button color={'error'} onClick={handleFinishCancel}>
							Cancel
						</Button>
						<Button color="primary" type="submit">
							Submit
						</Button>
					</DialogActions>
				</Dialog>

				<Dialog
					open={openDelete}
					onClose={handleDeleteCancel}
					PaperProps={{
						component: 'form',
						onSubmit: handleDeleteSubmit,
					}}
				>
					<DialogTitle>Delete Activity?</DialogTitle>
					<DialogContent>
						<DialogContentText>
							Are you sure you want to delete {props.activity.name}?
						</DialogContentText>
					</DialogContent>
					<DialogActions>
						<Button color="primary" onClick={handleDeleteCancel}>
							Cancel
						</Button>
						<Button color="error" type="submit">
							Delete
						</Button>
					</DialogActions>
				</Dialog>
			</ListItem>
		</Card>
	);
}
