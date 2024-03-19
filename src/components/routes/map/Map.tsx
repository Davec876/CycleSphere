'use client';

import { useEffect, useState } from 'react';
import { APIProvider, Map } from '@vis.gl/react-google-maps';
import { DeckGlOverlay } from './DeckGlOverlay';
import Box from '@mui/material/Box';
import type { IRouteFlat } from '@/models/Route';
import type { FeatureCollection } from 'geojson';
import { getDeckGlLayers } from '@/util/getDeckGlLayers';
import { convertToFeatureCollection } from '@/util/convertToFeatureCollection';
import DistanceOverlay from './DistanceOverlay';

export default function MapComponent({
	distance,
	location,
	selectedPoints,
}: {
	distance: IRouteFlat['distance'];
	location: IRouteFlat['location'];
	selectedPoints: IRouteFlat['selectedPoints'];
}) {
	const [geoData, setGeoData] = useState<FeatureCollection | null>(null);

	useEffect(() => {
		if (selectedPoints?.length > 0) {
			setGeoData(convertToFeatureCollection(selectedPoints));
		}
	}, [selectedPoints]);

	return (
		<Box sx={{ mt: 2, height: [350, 425, 500], width: '100%' }}>
			<APIProvider apiKey={process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY!}>
				<Map
					defaultZoom={14}
					defaultCenter={{
						lat: location.lat,
						lng: location.lng,
					}}
					gestureHandling="greedy"
					disableDefaultUI={true}
				>
					<DeckGlOverlay layers={getDeckGlLayers(geoData)} />
					<DistanceOverlay distance={distance} />
				</Map>
			</APIProvider>
		</Box>
	);
}
