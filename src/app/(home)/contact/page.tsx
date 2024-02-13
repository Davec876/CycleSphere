import AppBar from '@/components/AppBar';
import Box from '@mui/material/Box';

export default function ContactPage() {
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
					<div>Contact us!</div>
				</Box>
			</main>
		</>
	);
}
