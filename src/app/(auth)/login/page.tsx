'use client';

import { Suspense, useMemo, useState } from 'react';
import { signIn } from 'next-auth/react';
import Alert from '@mui/material/Alert';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import FormControl from '@mui/material/FormControl';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';

function ErrorMessage() {
	const searchParams = useSearchParams();
	const errorMessage = useMemo(() => {
		const error = searchParams.get('error');
		if (!error) return null;

		switch (error) {
			case 'CredentialsSignin':
				return 'Sign in failed. Check that the details you provided are correct.';
			default:
				return 'error';
		}
	}, [searchParams]);

	return (
		<>
			{errorMessage && (
				<Alert variant="filled" severity="error" sx={{ mb: 1 }}>
					{errorMessage}
				</Alert>
			)}
		</>
	);
}

export default function LoginPage() {
	interface LoginForm {
		email: string;
		password: string;
	}

	const [formData, setFormData] = useState({} as LoginForm);

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const { name, value } = e.target;
		setFormData((prevState) => ({
			...prevState,
			[name]: value,
		}));
	};

	const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
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
						<Suspense>
							<ErrorMessage />
						</Suspense>
						<FormControl
							component="form"
							onSubmit={handleSubmit}
							sx={{ width: '100%' }}
						>
							<Typography variant="h4" component="h1" align="center" mb={1}>
								Login
							</Typography>
							<Box
								sx={{
									padding: 1,
									display: 'flex',
									flexDirection: 'column',
									gap: 2,
								}}
								mb={1}
							>
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
									sx={{
										color: 'white',
										backgroundColor: '#167EFB',
										padding: 1,
										borderRadius: '8px',
										mb: 1,
									}}
								>
									Sign in
								</Button>
							</CardActions>
						</FormControl>
						<Box
							sx={{
								textAlign: 'center',
							}}
						>
							<Typography variant="subtitle2">
								<Link href="/register" style={{ color: 'inherit' }}>
									New user? Go register
								</Link>
							</Typography>
						</Box>
					</CardContent>
				</Card>
			</Box>
		</main>
	);
}
