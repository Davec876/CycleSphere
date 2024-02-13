import AppBar from '@/components/AppBar';
import Box from '@mui/material/Box';

export default function FAQPage() {
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
					<div>FAQ!</div>
				</Box>
			</main>
		</>
	);
}
