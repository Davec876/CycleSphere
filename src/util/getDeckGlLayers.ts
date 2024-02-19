import { GeoJsonLayer } from '@deck.gl/layers/typed';
import type { Feature, FeatureCollection } from 'geojson';

export function getDeckGlLayers(data: FeatureCollection | null) {
	if (!data) return [];

	return [
		new GeoJsonLayer({
			id: 'geojson-layer',
			data,
			stroked: false,
			filled: true,
			extruded: true,
			pointType: 'circle',
			lineWidthScale: 1,
			lineWidthMinPixels: 4,
			getFillColor: [160, 160, 180, 200],
			getLineColor: (f: Feature) => {
				const hex = f?.properties?.color;

				if (!hex) return [0, 0, 0];

				return hex.match(/[0-9a-f]{2}/g)!.map((x: string) => parseInt(x, 16));
			},
			getPointRadius: 4,
			getLineWidth: 1,
			getElevation: 30,
		}),
	];
}
