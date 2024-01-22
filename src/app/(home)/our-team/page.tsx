import AppBar from '@/components/AppBar';
import Box from '@mui/material/Box';

export default function OurTeamPage() {
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
					<div>Our team!</div>
				</Box>
			</main>
		</>
	);
}
