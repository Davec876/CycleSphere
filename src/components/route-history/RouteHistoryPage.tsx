import { getRoute } from '@/service/Route';
import { getRouteHistory } from '@/service/User';
import { APIError } from '@/util/errors/APIError';
import { redirect } from 'next/navigation';
import { cache } from 'react';
import type { CompleteRHE } from './RouteHistoryArea';
import RouteHistoryArea from './RouteHistoryArea';

const getRouteCached = cache(getRoute);

export default async function RouteHistoryPage() {
	const routeHistory: CompleteRHE[] = await getRouteHistory()
		.then(async (RHEs) => {
			const routePromises = RHEs.map(async (RHE) =>
				getRouteCached(RHE.routeId)
			);
			const routes = await Promise.all(routePromises);
			return RHEs.map((RHE, i) => ({ ...RHE, route: routes[i] }));
		})
		.catch((e) => {
			if (e instanceof APIError && e.message === 'User is not logged in!') {
				redirect('/');
			}
			throw e;
		});

	return <RouteHistoryArea routeHistory={routeHistory} />;
}
