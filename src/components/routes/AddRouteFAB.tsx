'use client';

import { type Dispatch, type SetStateAction, useState } from 'react';
import Fab from '@mui/material/Fab';
import AddIcon from '@mui/icons-material/Add';
import TextField from '@mui/material/TextField';
import Alert from '@mui/material/Alert';
import Snackbar from '@mui/material/Snackbar';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogActions from '@mui/material/DialogActions';
import Slider from '@mui/material/Slider';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import AutoCompleteMap from './map/AutoCompleteMap';
import type { IRouteFlat } from '@/models/Route';
import { addRoute, getRoutes } from '@/service/Route';
import FileUploadButton from './FileUploadButton';

export type MapDetails = {
	selectedLocation?: {
		lat: number;
		lng: number;
	};
	selectedPoints: {
		lat: number;
		lng: number;
	}[];
} | null;

export default function AddRouteFAB({
	setRoutes,
}: {
	setRoutes: Dispatch<SetStateAction<IRouteFlat[]>>;
}) {
	const [alertOpen, setAlertOpen] = useState(false);
	const [alertMessage, setAlertMessage] = useState('');
	const [open, setOpen] = useState(false);
	const [mapDetails, setMapDetails] = useState<MapDetails>(null);
	const [difficulty, setDifficulty] = useState(2.5);
	const [uploadedImageId, setUploadedImageId] = useState('');

	const handleClickOpen = () => {
		setOpen(true);
	};

	const handleClose = () => {
		setOpen(false);
	};

	const handleSliderChange = (event: Event, newValue: number | number[]) => {
		if (typeof newValue === 'number') {
			setDifficulty(newValue);
		}
	};

	const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		const formData = new FormData(event.currentTarget);
		// eslint-disable-next-line @typescript-eslint/no-explicit-any
		const formJson = Object.fromEntries((formData as any).entries());
		if (!mapDetails?.selectedLocation) {
			setAlertMessage('Please select a place before submitting.');
			setAlertOpen(true);
			return;
		}

		await addRoute({
			title: formJson.trailTitle,
			body: formJson.trailBody,
			imageId: uploadedImageId,
			difficulty,
			location: mapDetails.selectedLocation,
			selectedPoints: mapDetails.selectedPoints,
		});
		// fetch updated routes via server action and update state
		const routes = await getRoutes();
		setRoutes(routes);
		handleClose();
	};

	return (
		<>
			<Fab
				color="primary"
				aria-label="add"
				sx={{
					position: 'fixed',
					right: 20,
					bottom: 20,
				}}
				onClick={handleClickOpen}
			>
				<AddIcon />
			</Fab>
			<Dialog
				open={open}
				onClose={handleClose}
				PaperProps={{
					component: 'form',
					onSubmit: handleSubmit,
				}}
			>
				<DialogTitle>Add Route</DialogTitle>
				<DialogContent>
					<DialogContentText>
						Please enter your route details below in order to add your route to
						the website.
					</DialogContentText>
					<TextField
						autoFocus
						required
						name="trailTitle"
						label="Trail title"
						type="text"
						fullWidth
						variant="standard"
					/>
					<TextField
						autoFocus
						required
						name="trailBody"
						label="Trail description"
						type="text"
						fullWidth
						variant="standard"
					/>
					<Typography id="difficulty-slider" marginY={2}>
						Difficulty Level
					</Typography>
					<Slider
						aria-labelledby="difficulty-slider"
						value={difficulty}
						onChange={handleSliderChange}
						valueLabelDisplay="auto"
						step={0.5}
						marks
						min={0}
						max={5}
					/>
					<FileUploadButton
						imageId={uploadedImageId}
						setImageId={setUploadedImageId}
					/>
					<AutoCompleteMap setMapDetails={setMapDetails} />
				</DialogContent>
				<DialogActions>
					<Button onClick={handleClose}>Cancel</Button>
					<Button type="submit">Submit</Button>
				</DialogActions>
			</Dialog>
			<Snackbar
				open={alertOpen}
				autoHideDuration={6000}
				onClose={() => setAlertOpen(false)}
			>
				<Alert
					onClose={() => setAlertOpen(false)}
					severity="error"
					sx={{ width: '100%' }}
				>
					{alertMessage}
				</Alert>
			</Snackbar>
		</>
	);
}
