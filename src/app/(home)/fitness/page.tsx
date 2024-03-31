// Author: Kevin Orenday

'use client';

import AppBar from '@/components/AppBar';
import Container from '@mui/material/Container';
import FitnessCard from '@/components/fitness/FitnessCard';
import type { IProfile } from '@/models/Profile';
import { redirect } from 'next/navigation';
import { useSession } from 'next-auth/react';

export default function FitnessPage() {
	const { data: session } = useSession();
	if (session === undefined || session === null) redirect('/login');

	return (
		<>
			<AppBar />
			<main>
				<Container
					maxWidth="md"
					sx={{ display: 'flex', justifyContent: 'center', paddingY: '4em' }}
				>
					<FitnessCard profile={session.user as IProfile} />
				</Container>
			</main>
		</>
	);
}
