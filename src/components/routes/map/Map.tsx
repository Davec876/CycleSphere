'use client';

import { useEffect, useMemo, useState } from 'react';
import { usePin } from '@/components/context/PinProvider';
import { APIProvider, Map } from '@vis.gl/react-google-maps';
import { DeckGlOverlay } from './DeckGlOverlay';
import Box from '@mui/material/Box';
import type { IRouteFlat } from '@/models/Route';
import type { FeatureCollection } from 'geojson';
import { getDeckGlLayers } from '@/util/getDeckGlLayers';
import { convertToFeatureCollection } from '@/util/convertToFeatureCollection';
import DistanceOverlay from './DistanceOverlay';
import CommentPin from './CommentPin';
import NewCommentPin from './NewCommentPin';

export default function MapComponent({
	distance,
	routeLocation,
	selectedPoints,
	comments,
}: {
	distance: IRouteFlat['distance'];
	routeLocation: IRouteFlat['location'];
	selectedPoints: IRouteFlat['selectedPoints'];
	comments: IRouteFlat['comments'];
}) {
	const [geoData, setGeoData] = useState<FeatureCollection | null>(null);
	const { highlightedPinCommentId } = usePin();

	useEffect(() => {
		if (selectedPoints?.length > 0) {
			setGeoData(convertToFeatureCollection(selectedPoints));
		}
	}, [selectedPoints]);

	// we need to filter out comments without pins so we don't have empty divs, since map needs to return some element.
	const commentsWithPins = useMemo(
		() => comments.filter((comment) => comment.pin),
		[comments]
	);

	return (
		<Box sx={{ mt: 2, height: [350, 425, 500], width: '100%' }}>
			<APIProvider apiKey={process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY!}>
				<Map
					id="map"
					mapId="7ba75f1486610fb6"
					defaultZoom={14}
					defaultCenter={{
						lat: routeLocation.lat,
						lng: routeLocation.lng,
					}}
					gestureHandling="greedy"
					disableDefaultUI={true}
				>
					<DeckGlOverlay layers={getDeckGlLayers(geoData)} />
					<DistanceOverlay distance={distance} />

					{commentsWithPins.map((comment) => (
						<CommentPin
							key={comment.id}
							comment={comment}
							isHighlighted={highlightedPinCommentId === comment.id}
						/>
					))}

					<NewCommentPin defaultLocation={routeLocation} />
				</Map>
			</APIProvider>
		</Box>
	);
}
