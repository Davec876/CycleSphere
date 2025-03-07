import { useMap, useMapsLibrary } from '@vis.gl/react-google-maps';
import { useState, useEffect } from 'react';

interface Props {
	mapId: string;
}

export const BicyclingLayer = ({ mapId }: Props) => {
	const map = useMap(mapId);
	const maps = useMapsLibrary('maps');

	// https://developers.google.com/maps/documentation/javascript/reference/map#BicyclingLayer
	const [bicyclingLayer, setBicyclingLayer] =
		useState<google.maps.BicyclingLayer | null>(null);

	useEffect(() => {
		if (!maps) return;
		setBicyclingLayer(new maps.BicyclingLayer());
	}, [maps]);

	useEffect(() => {
		if (!map || !bicyclingLayer) return;
		bicyclingLayer.setMap(map);
	}, [map, bicyclingLayer]);

	return null;
};
