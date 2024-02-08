import { getRoutes } from '@/app/page';
import React from 'react';

export default function RoutePage({ params }: { params: { routeId: string } }) {
	const { routeId } = params;
	const selectedRoute = getRoutes().filter(({ id }) => id === routeId)[0];

	return <div>Detailed information for {selectedRoute?.title}!</div>;
}
