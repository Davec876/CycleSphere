import AppBar from '@/components/AppBar';
import Box from '@mui/material/Box';
import { auth } from '@/components/auth/auth';
import { Suspense } from 'react';

export default function ProfilePage() {
	return (
		<>
			<AppBar />
			<main>
				<Box
					sx={{
						display: 'flex',
						justifyContent: 'center',
					}}
				>
					<div>Your profile page!</div>
				</Box>
				<Suspense>
					<DisplayUser />
				</Suspense>
			</main>
		</>
	);
}

async function DisplayUser() {
	const session = await auth();

	return (
		<Box
			sx={{
				display: 'flex',
				justifyContent: 'center',
			}}
		>
			{session && <p>Welcome {session?.user?.name}!</p>}
		</Box>
	);
}
