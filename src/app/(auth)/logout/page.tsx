'use client';

import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { signOut } from 'next-auth/react';

export default function LogoutPage() {
	return (
		<main>
			<Box
				sx={{
					display: 'flex',
					justifyContent: 'center',
					alignItems: 'center',
					height: '100vh', // Full viewport height
				}}
			>
				<Card
					sx={{ width: ['75%', '50%', '33%'], borderRadius: 4 }}
					elevation={3}
				>
					<CardContent>
						<Typography variant="h4" component="h1" align="center" mb={2}>
							Signout
						</Typography>
						<Typography variant="h6" component="h2" align="center" mb={2}>
							Are you sure you want to sign out?
						</Typography>

						<CardActions>
							<Button
								type="submit"
								variant="contained"
								fullWidth
								sx={{
									color: 'white',
									backgroundColor: '#167EFB',
									padding: 2,
									borderRadius: '8px',
								}}
								onClick={() => signOut({ callbackUrl: '/' })}
							>
								Logout
							</Button>
						</CardActions>
					</CardContent>
				</Card>
			</Box>
		</main>
	);
}
