// Adapted from https://github.com/visgl/react-google-maps/blob/main/examples/basic-map/src/app.tsx
'use client';

import { APIProvider, Map } from '@vis.gl/react-google-maps';
import Box from '@mui/material/Box';
import type { IRouteFlat } from '@/models/Route';

export default function MapComponent({
	location,
}: {
	location: IRouteFlat['location'];
}) {
	return (
		<Box sx={{ mt: 2, height: [350, 425, 500], width: [350, 425, 500] }}>
			<APIProvider apiKey={process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY!}>
				<Map
					defaultZoom={14}
					defaultCenter={{ lat: location.lat, lng: location.lng }}
					gestureHandling="greedy"
					disableDefaultUI={true}
				/>
			</APIProvider>
		</Box>
	);
}
