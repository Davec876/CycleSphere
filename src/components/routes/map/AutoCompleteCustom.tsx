// Adapted from https://github.com/visgl/react-google-maps/blob/main/examples/autocomplete/src/autocomplete-custom.tsx
'use client';

import { useEffect, useState, useCallback, type ChangeEvent } from 'react';
import { useMap, useMapsLibrary } from '@vis.gl/react-google-maps';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import TextField from '@mui/material/TextField';
import IconButton from '@mui/material/IconButton';
import ClearIcon from '@mui/icons-material/Clear';
import CircularProgress from '@mui/material/CircularProgress';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import Box from '@mui/material/Box';

interface Props {
	onPlaceSelect: (place: google.maps.places.PlaceResult | null) => void;
}

// This is a custom built autocomplete component using the "Autocomplete Service" for predictions
// and the "Places Service" for place details
export const AutocompleteCustom = ({ onPlaceSelect }: Props) => {
	const map = useMap();
	const places = useMapsLibrary('places');

	// https://developers.google.com/maps/documentation/javascript/reference/places-autocomplete-service#AutocompleteSessionToken
	const [sessionToken, setSessionToken] =
		useState<google.maps.places.AutocompleteSessionToken>();

	// https://developers.google.com/maps/documentation/javascript/reference/places-autocomplete-service
	const [autocompleteService, setAutocompleteService] =
		useState<google.maps.places.AutocompleteService | null>(null);

	// https://developers.google.com/maps/documentation/javascript/reference/places-service
	const [placesService, setPlacesService] =
		useState<google.maps.places.PlacesService | null>(null);

	const [predictionResults, setPredictionResults] = useState<
		Array<google.maps.places.AutocompletePrediction>
	>([]);

	const [inputValue, setInputValue] = useState<string>('');
	const [isLoading, setIsLoading] = useState<boolean>(false);

	useEffect(() => {
		if (!places || !map) return;

		setAutocompleteService(new places.AutocompleteService());
		setPlacesService(new places.PlacesService(map));
		setSessionToken(new places.AutocompleteSessionToken());

		return () => setAutocompleteService(null);
	}, [map, places]);

	const fetchPredictions = useCallback(
		async (inputValue: string) => {
			if (!autocompleteService || !inputValue) {
				setPredictionResults([]);
				return;
			}

			const request = { input: inputValue, sessionToken };
			const response = await autocompleteService.getPlacePredictions(request);

			setPredictionResults(response.predictions);
		},
		[autocompleteService, sessionToken]
	);

	const onInputChange = useCallback(
		(event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
			const value = (event.target as HTMLInputElement)?.value;

			setInputValue(value);
			fetchPredictions(value);
		},
		[fetchPredictions]
	);

	const handleSuggestionClick = useCallback(
		(placeId: string) => {
			if (!places) return;

			const detailRequestOptions = {
				placeId,
				fields: ['geometry', 'name', 'formatted_address'],
				sessionToken,
			};

			const detailsRequestCallback = (
				placeDetails: google.maps.places.PlaceResult | null
			) => {
				onPlaceSelect(placeDetails);
				setPredictionResults([]);
				setInputValue(placeDetails?.formatted_address ?? '');
				setSessionToken(new places.AutocompleteSessionToken());
			};

			placesService?.getDetails(detailRequestOptions, detailsRequestCallback);
		},
		[onPlaceSelect, places, placesService, sessionToken]
	);

	const clearInput = () => {
		setInputValue('');
		setPredictionResults([]);
	};

	return (
		<Box
			sx={{
				width: '100%',
				display: 'flex',
				justifyContent: 'flex-start',
				padding: 1,
			}}
		>
			<Box sx={{ position: 'relative', width: 'fit-content' }}>
				<TextField
					fullWidth
					variant="outlined"
					placeholder="Search for places in Halifax!"
					value={inputValue}
					onChange={onInputChange}
					InputProps={{
						endAdornment: isLoading ? (
							<CircularProgress color="inherit" size={20} />
						) : (
							inputValue && (
								<IconButton onClick={clearInput} edge="end">
									<ClearIcon />
								</IconButton>
							)
						),
					}}
					sx={{ width: 930 }}
				/>
				{predictionResults.length > 0 && (
					<List
						sx={{
							position: 'absolute',
							top: '100%',
							zIndex: 1,
							width: '100%',
							maxHeight: 150,
							overflow: 'auto',
							mt: 0.5,
							border: '1px solid',
							borderRadius: '4px',
							bgcolor: 'background.paper',
							boxShadow: '0 4px 6px',
						}}
					>
						{predictionResults.map(({ place_id, description }) => (
							<ListItemButton
								key={place_id}
								onClick={() => handleSuggestionClick(place_id)}
							>
								<ListItemText primary={description} />
							</ListItemButton>
						))}
					</List>
				)}
			</Box>
		</Box>
	);
};
