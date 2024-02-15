'use client';

import { useState } from 'react';
import { signIn } from 'next-auth/react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import FormControl from '@mui/material/FormControl';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

export default function RegisterPage() {
	interface RegistrationForm {
		name: string;
		email: string;
		password: string;
	}

	const [formData, setFormData] = useState({} as RegistrationForm);
	const [errorMessage, setErrorMessage] = useState('');

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const { name, value } = e.target;
		setFormData((prevState) => ({
			...prevState,
			[name]: value,
		}));
	};

	const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		setErrorMessage('');
		const res = await fetch('/api/register', {
			method: 'POST',
			body: JSON.stringify({ formData }),
		});

		if (!res.ok) {
			const response = await res.json();
			setErrorMessage(response.message);
			return;
		}
		await signIn('credentials', {
			email: formData.email,
			password: formData.password,
			callbackUrl: '/',
		});
	};

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
						<FormControl
							component="form"
							onSubmit={handleSubmit}
							sx={{ width: '100%' }}
						>
							<Typography
								variant="h4"
								component="h1"
								align="center"
								gutterBottom
							>
								Create New User
							</Typography>
							<Box
								sx={{
									padding: 1,
									display: 'flex',
									flexDirection: 'column',
									gap: 2,
								}}
							>
								<TextField
									name="name"
									label="Name"
									type="text"
									onChange={handleChange}
									required
									value={formData.name}
									sx={{ borderRadius: 4 }}
								/>
								<TextField
									name="email"
									label="Email"
									type="text"
									required
									onChange={handleChange}
									value={formData.email}
									sx={{ borderRadius: 4 }}
								/>
								<TextField
									name="password"
									label="Password"
									type="password"
									required
									onChange={handleChange}
									value={formData.password}
									sx={{ borderRadius: 4 }}
								/>
							</Box>

							<CardActions>
								<Button
									type="submit"
									variant="contained"
									fullWidth
									sx={{ padding: 1 }}
								>
									Create User
								</Button>
							</CardActions>
							{errorMessage && (
								<Typography color="error">{errorMessage}</Typography>
							)}
						</FormControl>
					</CardContent>
				</Card>
			</Box>
		</main>
	);
}
