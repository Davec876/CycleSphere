import AppBar from '@/components/AppBar';
import Box from '@mui/material/Box';
import { auth } from '@/components/auth/auth';

export default async function OurTeamPage() {
	const session = await auth();

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
					<div>Your profile page!</div>
				</Box>
				{session && <p>Welcome {session?.user?.name}!</p>}
			</main>
		</>
	);
}
