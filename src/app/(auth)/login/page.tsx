import AppBar from '@/components/AppBar';
import Box from '@mui/material/Box';

export default function LoginPage() {
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
					<div>Login!</div>
				</Box>
			</main>
		</>
	);
}
