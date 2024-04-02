import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { usePin } from '@/components/context/PinProvider';
import { type Dispatch, type SetStateAction, useState } from 'react';
import NextLink from 'next/link';
import Alert from '@mui/material/Alert';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import FormControl from '@mui/material/FormControl';
import Link from '@mui/material/Link';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import FileUploadButton from '../FileUploadButton';
import PinDropIcon from '@mui/icons-material/PinDrop';
import { addCommentToRoute, getCommentsForRoute } from '@/service/Route';
import type { FlattenMaps } from 'mongoose';
import type { IComment } from '@/models/schemas/Comment';

export default function CommentCreationBox({
	routeId,
	setComments,
}: {
	routeId: string;
	setComments: Dispatch<SetStateAction<FlattenMaps<IComment>[]>>;
}) {
	interface CommentForm {
		body: string;
	}

	const router = useRouter();
	const { isPinAttached, setIsPinAttached, pinLocation, setPinLocation } =
		usePin();

	const { data: session, status: sessionStatus } = useSession();
	const [formData, setFormData] = useState({} as CommentForm);
	const [uploadedImageId, setUploadedImageId] = useState('');

	const refreshComments = async () => {
		// fetch updated comments via server action and update state
		const comments = await getCommentsForRoute(routeId);
		setComments(comments);
	};

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const { name, value } = e.target;
		setFormData((prevState) => ({
			...prevState,
			[name]: value,
		}));
	};

	const clearData = () => {
		formData.body = '';
		setUploadedImageId('');
		setPinLocation(null);
		setIsPinAttached(false);
	};

	const handlePinAttach = () => {
		setIsPinAttached(true);
		router.replace('#map');
	};

	const handlePinDetach = () => {
		setIsPinAttached(false);
		setPinLocation(null);
	};

	const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		await addCommentToRoute({
			id: routeId,
			body: formData.body,
			imageId: uploadedImageId,
			selectedPinLocation: pinLocation?.location,
		});
		await refreshComments();
		clearData();
	};

	return (
		<>
			{sessionStatus === 'loading' ? null : !session?.user ? (
				<Card sx={{ mb: 1 }}>
					<CardContent>
						<Typography sx={{ mb: 1, fontWeight: 'bold' }} variant="body1">
							You need to login to post a comment!
						</Typography>
						<Box sx={{ display: 'flex', justifyContent: 'center' }}>
							<Button
								href="/login"
								LinkComponent={NextLink}
								color="primary"
								variant="outlined"
								sx={{ width: '20%' }}
							>
								Login
							</Button>
						</Box>
					</CardContent>
				</Card>
			) : (
				<Card sx={{ mb: 1 }}>
					<CardContent>
						<FormControl
							component="form"
							onSubmit={handleSubmit}
							sx={{ width: '100%' }}
						>
							<Box
								sx={{
									display: 'flex',
									flexDirection: 'column',
									gap: 2,
								}}
							>
								<TextField
									name="body"
									label="Add a comment"
									type="text"
									required
									multiline
									rows={4}
									fullWidth
									variant="outlined"
									onChange={handleChange}
									value={formData.body}
								/>
								<CardActions>
									<Box
										sx={{
											width: 1,
											display: 'flex',
											flexDirection: 'column',
											gap: 2,
										}}
									>
										<FileUploadButton
											label="Upload photo"
											imageId={uploadedImageId}
											setImageId={setUploadedImageId}
										/>
										<Box
											sx={{
												padding: 0,
												display: 'flex',
												justifyContent: 'space-between',
											}}
										>
											<Button
												variant="contained"
												startIcon={<PinDropIcon />}
												disabled={isPinAttached}
												onClick={handlePinAttach}
											>
												Attach pin
											</Button>
											<Button variant="contained" type="submit">
												Submit
											</Button>
										</Box>
										{isPinAttached && (
											<Alert severity="success">
												Pin attached. Drag it on the map above to change its
												location. Or{' '}
												<Link component="button" onClick={handlePinDetach}>
													remove the pin
												</Link>
												.
											</Alert>
										)}
									</Box>
								</CardActions>
							</Box>
						</FormControl>
					</CardContent>
				</Card>
			)}
		</>
	);
}
