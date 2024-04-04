// Sourced from https://github.com/visgl/react-google-maps/blob/main/examples/autocomplete/src/map-handler.tsx
'use client';

import { useMap } from '@vis.gl/react-google-maps';
import { memo, useEffect } from 'react';
import { communityMapId } from './CommunityMap';

interface Props {
	place: google.maps.places.PlaceResult | null;
}

const MapHandler = ({ place }: Props) => {
	const map = useMap(communityMapId);

	useEffect(() => {
		if (!map || !place) return;

		if (place.geometry?.viewport) {
			map.fitBounds(place.geometry?.viewport);
		}
	}, [map, place]);

	return null;
};

export default memo(MapHandler);
