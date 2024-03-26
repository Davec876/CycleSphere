import AppBar from '@/components/AppBar';
import RouteHistoryPage from '@/components/route-history/RouteHistoryPage';
import { Suspense } from 'react';

export default function RouteHistory() {
	return (
		<>
			<AppBar />
			<Suspense>
				<RouteHistoryPage />
			</Suspense>
		</>
	);
}
