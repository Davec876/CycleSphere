import AppBar from '@/components/AppBar';
import Box from '@mui/material/Box';

export default function RegisterPage() {
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
					<div>Register!</div>
				</Box>
			</main>
		</>
	);
}
