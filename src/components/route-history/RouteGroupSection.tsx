import { Box, Card, Typography } from '@mui/material';
import type { Route } from './RouteCard';
import RouteCard from './RouteCard';

export interface RouteGroup {
	week: string;
	routes: Route[];
}

export default function RouteGroupSection({
	routeGroup,
}: {
	routeGroup: RouteGroup;
}) {
	return (
		<Box border="1px solid white" borderRadius={2} p={2} my={3}>
			<Typography variant="h5" component="h2" marginBottom={1}>
				{routeGroup.week}
			</Typography>
			<Card elevation={0} sx={{ border: '1px solid white', borderRadius: 0 }}>
				{routeGroup.routes.map((route) => (
					<RouteCard key={route.datetime.valueOf()} route={route} />
				))}
			</Card>
		</Box>
	);
}
