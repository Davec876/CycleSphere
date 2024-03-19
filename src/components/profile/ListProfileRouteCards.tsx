'use client';

import { useState } from 'react';
import type { IRouteFlat } from '@/models/Route';
import RouteCard from '../routes/RouteCard';

export default function ListProfileRouteCards({
	userId,
	routes: ssrRoutes,
}: {
	userId: string;
	routes: IRouteFlat[];
}) {
	const [routes, setRoutes] = useState(ssrRoutes);

	return (
		<>
			{routes.map((route) => {
				return (
					<RouteCard
						key={route.id}
						route={route}
						setRoutes={setRoutes}
						userId={userId}
					/>
				);
			})}
		</>
	);
}
