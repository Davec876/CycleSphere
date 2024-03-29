'use client';

import AppBar from '@/components/AppBar';
import Container from '@mui/material/Container';
import FitnessCard from '@/components/fitness/FitnessCard';
import { IProfile } from '@/models/Profile';
import { redirect } from 'next/navigation';
import { auth } from '@/components/auth/auth';
import { useSession } from 'next-auth/react';

export default function FitnessPage() {
	// https://next-auth.js.org/getting-started/client
	const { data: session, status: sessionStatus } = useSession();
	if (session === undefined || session === null) redirect('/login');

	return(
	<>
		<AppBar />
		<main>
			<Container maxWidth='md' sx={{ display: 'flex', justifyContent: 'center', paddingY: '4em' }}>
				<FitnessCard profile={session.user as IProfile} />
			</Container>
		</main>
	</>
	);
}
