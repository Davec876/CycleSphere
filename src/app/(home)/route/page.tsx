// pages/add-route.js
'use client';
import React, { useState } from 'react';
import AppBar from '@/components/AppBar';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Alert from '@mui/material/Alert';
import Snackbar from '@mui/material/Snackbar';
import Slider from '@mui/material/Slider';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import AutoCompleteMap from '@/components/routes/map/AutoCompleteMap'; // Adjust the import path as necessary
import FileUploadButton from '@/components/routes/FileUploadButton'; // Adjust the import path as necessary
import { addRoute, getRoutes } from '@/service/Route'; // Adjust the import path as necessary

export default function AddRoutePage({ setRoutes }) {
	const [alertOpen, setAlertOpen] = useState(false);
	const [alertMessage, setAlertMessage] = useState('');
	const [mapDetails, setMapDetails] = useState(null);
	const [difficulty, setDifficulty] = useState(2.5);
	const [uploadedImageId, setUploadedImageId] = useState('');

	const handleSliderChange = (event, newValue) => {
		setDifficulty(newValue);
	};

	const handleSubmit = async (event) => {
		event.preventDefault();
		const formData = new FormData(event.currentTarget);
		const formJson = Object.fromEntries(formData.entries());
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

		const routes = await getRoutes();
		setRoutes(routes);
	};

	return (
		<>
			<AppBar />
			<Box
				component="form"
				onSubmit={handleSubmit}
				noValidate
				sx={{ mt: 1, mx: 4 }}
			>
				<TextField
					autoFocus
					required
					name="trailTitle"
					label="Trail title"
					type="text"
					fullWidth
					margin="normal"
					variant="outlined"
				/>
				<TextField
					required
					name="trailBody"
					label="Trail description"
					type="text"
					fullWidth
					margin="normal"
					variant="outlined"
				/>
				<Typography id="difficulty-slider" gutterBottom>
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
					label="Upload route photo"
					imageId={uploadedImageId}
					setImageId={setUploadedImageId}
				/>
				<AutoCompleteMap
					setMapDetails={setMapDetails}
					distance={mapDetails?.totalDistance}
				/>
				<Button
					type="submit"
					fullWidth
					variant="contained"
					sx={{ mt: 3, mb: 2 }}
				>
					Submit
				</Button>
			</Box>
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
