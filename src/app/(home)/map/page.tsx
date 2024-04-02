import AppBar from '@/components/AppBar';
import Box from '@mui/material/Box';

export default function MapPage() {
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
					<div>This is the maps page.</div>
				</Box>
			</main>
		</>
	);
}
