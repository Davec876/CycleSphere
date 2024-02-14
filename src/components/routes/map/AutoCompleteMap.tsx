// Adapted from https://github.com/visgl/react-google-maps/blob/main/examples/autocomplete/src/app.tsx
'use client';

import { type Dispatch, type SetStateAction } from 'react';
import {
	APIProvider,
	ControlPosition,
	Map,
	MapControl,
} from '@vis.gl/react-google-maps';
import { AutocompleteCustom } from './AutoCompleteCustom';
import MapHandler from './MapHandler';
import Box from '@mui/material/Box';

export default function AutoCompleteMap({
	selectedPlace,
	setSelectedPlace,
}: {
	selectedPlace: google.maps.places.PlaceResult | null;
	setSelectedPlace: Dispatch<
		SetStateAction<google.maps.places.PlaceResult | null>
	>;
}) {
	return (
		<Box sx={{ mt: 2, height: [350, 425, 500], width: '100%' }}>
			<APIProvider apiKey={process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY!}>
				<Map
					defaultZoom={12}
					// Default to Halifax coordinates
					defaultCenter={{ lat: 44.64951641616885, lng: -63.58510266385201 }}
					gestureHandling={'greedy'}
					disableDefaultUI={true}
				/>

				<MapControl position={ControlPosition.TOP}>
					<AutocompleteCustom onPlaceSelect={setSelectedPlace} />
				</MapControl>

				<MapHandler place={selectedPlace} />
			</APIProvider>
		</Box>
	);
}
