'use client';
import { useState } from 'react';
import AppBar from '@/components/AppBar';
import Box from '@mui/material/Box';
import { APIProvider, Map } from '@vis.gl/react-google-maps';
import { AutocompleteCustom } from '@/components/routes/map/AutoCompleteCustom';
import { BicyclingLayer } from '@/components/routes/map/BicyclingLayer';
import MapHandler from '@/components/routes/map/MapHandler';

export const communityMapId = 'community-shared-map';

export default function MapPage() {
	const [selectedPlace, setSelectedPlace] =
		useState<google.maps.places.PlaceResult | null>(null);

	return (
		<>
			<AppBar />
			<main>
				<Box sx={{ m: 2, height: [350, 425, 500] }}>
					<APIProvider apiKey={process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY!}>
						<AutocompleteCustom onPlaceSelect={setSelectedPlace} />
						<Map
							id={communityMapId}
							defaultZoom={12}
							defaultCenter={{
								lat: 44.64951641616885,
								lng: -63.58510266385201,
							}}
						></Map>
						<BicyclingLayer id={communityMapId} />
						<MapHandler place={selectedPlace} />
					</APIProvider>
				</Box>
			</main>
		</>
	);
}
