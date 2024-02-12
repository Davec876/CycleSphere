import { getRoute } from '@/service/Route';
import Box from '@mui/material/Box';
import DetailedRouteCard from '@/components/routes/DetailedRouteCard';

export default async function RoutePage({
	params,
}: {
	params: { routeId: string };
}) {
	const { routeId } = params;
	const selectedRoute = await getRoute(routeId);
	return (
		<>
			{selectedRoute && (
				<Box
					sx={{
						display: 'flex',
						justifyContent: 'center',
						alignItems: 'center',
					}}
				>
					<DetailedRouteCard route={selectedRoute} />
				</Box>
			)}
		</>
	);
}
