'use client';

import { useState, useEffect } from 'react';
import type { FeatureCollection } from 'geojson';
import { convertToFeatureCollection } from '@/util/convertToFeatureCollection';
import { DeckGlOverlay } from './map/DeckGlOverlay';
import CommentPin from './map/CommentPin';
import type { IRouteFlat } from '@/models/Route';
import { getDeckGlLayers } from '@/util/getDeckGlLayers';

export default function CommunityContribution({
	filteredRoutes,
}: {
	filteredRoutes: IRouteFlat[];
}) {
	const [geoData, setGeoData] = useState<FeatureCollection[] | null>([]);
	const [commentPins, setCommentPins] = useState<IRouteFlat['comments'][]>([]);

	useEffect(() => {
		const allSelectedPoints = filteredRoutes.map(
			(route) => route.selectedPoints
		);
		const allCommentPins = filteredRoutes.map((route) => route.comments);
		console.log(allCommentPins);
		setGeoData(
			allSelectedPoints.map((points) => convertToFeatureCollection(points))
		);
		setCommentPins(allCommentPins);
	}, [filteredRoutes]);

	return (
		<>
			{geoData?.map((data, index) => (
				<DeckGlOverlay key={index} layers={getDeckGlLayers(data)} />
			))}
			{commentPins.flatMap((commentPin) =>
				commentPin.map((comment) => (
					<CommentPin
						key={comment.id}
						comment={comment}
						isHighlighted={false}
					/>
				))
			)}
		</>
	);
}
