import AppBar from '@/components/AppBar';
import ListRouteCards from '@/components/routes/ListRouteCards';
import { getRoutes } from '@/service/Route';
import Box from '@mui/material/Box';
import { Suspense } from 'react';

async function LoadRouteCards() {
	const routes = await getRoutes();
	return <ListRouteCards routes={routes} />;
}

export default function Home() {
	return (
		<>
			<AppBar />
			<main>
				<Box
					sx={{
						display: 'flex',
						justifyContent: 'center',
						alignItems: 'center',
					}}
				>
					<Box
						marginTop={1}
						sx={{
							display: 'flex',
							flexDirection: 'column',
							gap: 1,
						}}
					>
						<Suspense>
							<LoadRouteCards />
						</Suspense>
					</Box>
				</Box>
			</main>
		</>
	);
}
