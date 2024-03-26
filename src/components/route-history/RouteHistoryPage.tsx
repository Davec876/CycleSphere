import { getRouteHistory } from '@/service/User';
import { APIError } from '@/util/errors/APIError';
import { redirect } from 'next/navigation';
import RouteHistoryArea from './RouteHistoryArea';
import type { IRouteHistoryEntry } from '@/models/schemas/RouteHistoryEntry';

export default async function RouteHistoryPage() {
	const routeHistory: IRouteHistoryEntry[] = await getRouteHistory().catch(
		(e) => {
			if (e instanceof APIError && e.message === 'User is not logged in!') {
				redirect('/');
			}
			throw e;
		}
	);

	return <RouteHistoryArea initialRouteHistoryWithoutNames={routeHistory} />;
}
