'use client';
import AppBar from '@/components/AppBar';
import Box from '@mui/material/Box';
import { useSession } from 'next-auth/react';
import MapEditFeature from '@/components/routes/map/MapEditFeature';
import { Suspense } from 'react';
import CommunityMap from '@/components/routes/map/CommunityMap';

export default function MapPage() {
	const { data: session } = useSession();

	return (
		<>
			<AppBar />
			<main>
				<CommunityMap />
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
						<Suspense>{session?.user && <MapEditFeature />}</Suspense>
					</Box>
				</Box>
			</main>
		</>
	);
}
