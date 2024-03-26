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
import Box from '@mui/material/Box';

export type MapDetails = {
	selectedLocation?: {
		lat: number;
		lng: number;
	};
	selectedPoints: {
		lat: number;
		lng: number;
	}[];
	totalDistance?: number;
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
			distance: mapDetails.totalDistance,
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
					'@media screen and (max-width: 600px)': {
						right: '10px',
						bottom: '10px',
					},
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
					sx: {
						maxWidth: '90%',
						width: 'auto',
						maxHeight: '95vh',
						height: 'auto',
						margin: 'auto',
						display: 'flex',
						flexDirection: 'column',
						'@media screen and (max-width: 600px)': {
							width: '100%',
							maxWidth: '100%',
							margin: '10px',
						},
					},
				}}
				maxWidth="xl"
			>
				<Box
					sx={{
						display: 'flex',
						flexDirection: 'row',
						'@media screen and (max-width: 600px)': {
							flexDirection: 'column',
						},
					}}
				>
					<Box
						sx={{
							flex: 1,
							mr: 2.5,
							'@media screen and (max-width: 600px)': { mr: 0, mb: 2 },
						}}
					>
						<DialogTitle>Add Route</DialogTitle>
						<DialogContent dividers>
							<DialogContentText>
								Please enter your route details below.
							</DialogContentText>
							<TextField
								autoFocus
								required
								name="trailTitle"
								label="Trail title"
								fullWidth
								margin="dense"
							/>
							<TextField
								required
								name="trailBody"
								label="Trail description"
								fullWidth
								multiline
								rows={4}
								margin="dense"
							/>
							<Typography gutterBottom>Difficulty Level</Typography>
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
								label="Upload route photo"
								imageId={uploadedImageId}
								setImageId={setUploadedImageId}
							/>
						</DialogContent>
					</Box>
					<Box
						sx={{
							flex: 3,
							height: '100%',
							'@media screen and (max-width: 600px)': {
								height: '300px',
								mr: 0,
							},
						}}
					>
						<AutoCompleteMap
							setMapDetails={setMapDetails}
							distance={mapDetails?.totalDistance}
						/>
					</Box>
				</Box>
				<DialogActions
					sx={{
						flexShrink: 0,
						padding: 2,
						'@media screen and (max-width: 600px)': {
							flexDirection: 'column',
							alignItems: 'flex-start',
						},
					}}
				>
					<Button
						onClick={handleClose}
						variant="contained"
						color="primary"
						sx={{
							width: '100%',
							margin: '8px',
							fontSize: '1rem',
						}}
					>
						Cancel
					</Button>
					<Button
						type="submit"
						variant="contained"
						color="primary"
						sx={{
							width: '100%',
							margin: '8px',
							fontSize: '1rem',
						}}
					>
						Submit
					</Button>
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
