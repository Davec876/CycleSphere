'use client';

import { useState, useEffect } from 'react';
import type { FeatureCollection } from 'geojson';
import { convertToFeatureCollection } from '@/util/convertToFeatureCollection';
import { DeckGlOverlay } from './map/DeckGlOverlay';
import CommentPin from './map/CommentPin';
import type { IRouteFlat } from '@/models/Route';
import { getDeckGlLayers } from '@/util/getDeckGlLayers';

interface CommentPins {
	[key: string]: IRouteFlat['comments'];
}

export default function CommunityContribution({
	filteredRoutes,
}: {
	filteredRoutes: IRouteFlat[];
}) {
      const [geoData, setGeoData] = useState<FeatureCollection[]>([]);
	const [commentPins, setCommentPins] = useState<CommentPins>({});

	useEffect(() => {
		const allSelectedPoints = filteredRoutes.map(
			(route) => route.selectedPoints
		);
		const allCommentPins: CommentPins = {};
		filteredRoutes.forEach((route) => {
			allCommentPins[route.id] = route.comments;
		});
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
			{Object.entries(commentPins).flatMap(([routeId, comments]) =>
				comments.map((comment) => (
					<CommentPin
						key={comment.id}
						comment={comment}
						isHighlighted={false}
						routeId={routeId}
					/>
				))
			)}
		</>
	);
}
