'use client';

import { useState, type Dispatch, type SetStateAction, useEffect } from 'react';
import {
	APIProvider,
	Map,
	type MapMouseEvent,
} from '@vis.gl/react-google-maps';
import { AutocompleteCustom } from './AutoCompleteCustom';
import MapHandler from './MapHandler';
import Box from '@mui/material/Box';
import { DeckGlOverlay } from './DeckGlOverlay';
import { getDeckGlLayers } from '@/util/getDeckGlLayers';
import type { Feature, FeatureCollection } from 'geojson';
import type { MapDetails } from '../AddRouteFAB';
import DistanceOverlay from './DistanceOverlay';
import { calculateTotalDistance } from '@/util/haversineDistance';

export default function AutoCompleteMap({
	setMapDetails,
	distance,
}: {
	setMapDetails: Dispatch<SetStateAction<MapDetails>>;
	distance?: number;
}) {
	const [selectedPlace, setSelectedPlace] =
		useState<google.maps.places.PlaceResult | null>(null);
	const [geoData, setGeoData] = useState<FeatureCollection | null>(null);

	// Update mapDetails selectedCoordinates with selected place's coordinates
	useEffect(() => {
		if (selectedPlace) {
			const selectedCoordinates = selectedPlace.geometry?.location?.toJSON();

			if (selectedCoordinates) {
				setMapDetails((prev) => ({
					selectedLocation: selectedCoordinates,
					selectedPoints: prev?.selectedPoints || [],
					totalDistance: prev?.totalDistance || 0,
				}));
			}
			return;
		}
		setMapDetails(null);
	}, [selectedPlace, setMapDetails]);

	const updateGeodata = ({ lat, lng }: { lat: number; lng: number }) => {
		const newPoint: Feature = {
			type: 'Feature',
			geometry: {
				type: 'Point',
				coordinates: [lng, lat],
			},
			properties: null,
		};
		setGeoData((prev) => {
			// init FeatureCollection with the first point and empty LineString if no data exists
			if (prev === null) {
				const newFeatureCollection: FeatureCollection = {
					type: 'FeatureCollection',
					features: [
						newPoint,
						{
							type: 'Feature',
							geometry: {
								type: 'LineString',
								coordinates: [[lng, lat]],
							},
							properties: {
								color: '#ef0000',
							},
						},
					],
				};
				return newFeatureCollection;
			}

			// add new point to FeatureCollection
			const updatedFeatures = [...prev.features, newPoint];

			// attempt to find an existing LineString feature
			let lineStringFeature = updatedFeatures.find(
				(feature) => feature.geometry.type === 'LineString'
			);
			if (!lineStringFeature) {
				// create a LineString if it doesn't exist
				lineStringFeature = {
					type: 'Feature',
					geometry: {
						type: 'LineString',
						coordinates: [],
					},
					properties: {
						color: '#ef0000',
					},
				};
				updatedFeatures.push(lineStringFeature);
			}

			// update LineString's coordinates to include the new point
			if (lineStringFeature.geometry.type === 'LineString') {
				lineStringFeature.geometry.coordinates.push([lng, lat]);
			}

			// ensure only one LineString is present, and is updated
			const filteredFeatures = updatedFeatures.filter(
				(feature) =>
					feature.geometry.type !== 'LineString' ||
					feature === lineStringFeature
			);

			// updated FeatureCollection
			return {
				...prev,
				features: filteredFeatures,
			};
		});
	};

	const handleMapClick = (event: MapMouseEvent) => {
		if (event.detail.latLng) {
			const lat = event.detail.latLng.lat;
			const lng = event.detail.latLng.lng;
			updateGeodata({ lat, lng });

			setMapDetails((prev) => {
				const newPoints = prev
					? [...prev.selectedPoints, { lat, lng }]
					: [{ lat, lng }];

				// calculate distance to add
				const distanceToAdd = calculateTotalDistance(
					prev?.selectedPoints || [],
					{ lat, lng }
				);
				const newTotalDistance = (prev?.totalDistance || 0) + distanceToAdd;

				return {
					...prev,
					...(distanceToAdd > 0 && { totalDistance: newTotalDistance }),
					selectedPoints: newPoints,
				};
			});
		}
	};

	return (
		<Box sx={{ mt: 2, height: [350, 425, 500] }}>
			<APIProvider apiKey={process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY!}>
				<AutocompleteCustom onPlaceSelect={setSelectedPlace} />
				<Map
					onClick={handleMapClick}
					defaultZoom={12}
					// Default to Halifax Coordinates
					defaultCenter={{ lat: 44.64951641616885, lng: -63.58510266385201 }}
					gestureHandling="greedy"
					disableDefaultUI={true}
				>
					<DeckGlOverlay layers={getDeckGlLayers(geoData)} />
					<DistanceOverlay distance={distance} />
				</Map>

				<MapHandler place={selectedPlace} />
			</APIProvider>
		</Box>
	);
}
