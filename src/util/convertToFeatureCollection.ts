import type {
	FeatureCollection,
	Feature,
	Geometry,
	GeoJsonProperties,
} from 'geojson';

function getLineStringFeatures(
	coords: {
		lat: number;
		lng: number;
	}[]
): Feature<Geometry, GeoJsonProperties> {
	const lineStringFeature: Feature<Geometry, GeoJsonProperties> = {
		type: 'Feature',
		geometry: {
			type: 'LineString',
			coordinates: coords.map(({ lng, lat }) => [lng, lat]),
		},
		properties: {
			color: '#ef0000',
		},
	};

	return lineStringFeature;
}

export function convertToFeatureCollection(
	coords: {
		lat: number;
		lng: number;
	}[]
): FeatureCollection<Geometry> {
	// convert coords to point features
	const pointFeatures: Feature<Geometry, GeoJsonProperties>[] = coords.map(
		({ lat, lng }) => ({
			type: 'Feature',
			geometry: {
				type: 'Point',
				coordinates: [lng, lat],
			},
			properties: null,
		})
	);

	let features = [...pointFeatures];
	// create LineString feature if there are two or more points
	if (coords.length > 1) {
		const lineStringFeature = getLineStringFeatures(coords);
		features = [...features, lineStringFeature];
	}

	return {
		type: 'FeatureCollection',
		features,
	};
}
