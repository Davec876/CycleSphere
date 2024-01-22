import AppBar from '@/components/AppBar';
import Card from '@/components/Card';
import Box from '@mui/material/Box';

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
					<Box marginTop={1}>
						<Card />
					</Box>
				</Box>
			</main>
		</>
	);
}
