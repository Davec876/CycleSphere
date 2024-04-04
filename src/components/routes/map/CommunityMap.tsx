'use client';

import { useState } from 'react';
import Box from '@mui/material/Box';
import { APIProvider, Map } from '@vis.gl/react-google-maps';
import { AutocompleteCustom } from '@/components/routes/map/AutoCompleteCustom';
import { BicyclingLayer } from '@/components/routes/map/BicyclingLayer';
import MapHandler from '@/components/routes/map/MapHandler';
import { PinProvider } from '@/components/context/PinProvider';
import type { IRouteFlat } from '@/models/Route';
import CommunityContribution from '@/components/routes/CommunityContribution';

export const communityMapId = '7ba75f1486610fb6';

export default function CommunityMap({
	filteredRoutes,
}: {
	filteredRoutes: IRouteFlat[];
}) {
	const [selectedPlace, setSelectedPlace] =
		useState<google.maps.places.PlaceResult | null>(null);

	return (
		<PinProvider>
			<Box sx={{ m: 2, height: [350, 425, 500] }}>
				<APIProvider apiKey={process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY!}>
					<AutocompleteCustom onPlaceSelect={setSelectedPlace} />
					<Map
						id={communityMapId}
						mapId={communityMapId}
						defaultZoom={10}
						defaultCenter={{
							lat: 44.70051641616885,
							lng: -63.58510266385201,
						}}
					>
						<CommunityContribution filteredRoutes={filteredRoutes} />
					</Map>
					<BicyclingLayer mapId={communityMapId} />
					<MapHandler place={selectedPlace} />
				</APIProvider>
			</Box>
		</PinProvider>
	);
}
