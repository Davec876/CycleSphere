import { useSession } from 'next-auth/react';
import { type Dispatch, type SetStateAction, useState } from 'react';
import Link from 'next/link';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import FormControl from '@mui/material/FormControl';
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

	const { data: session } = useSession();
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

	const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		await addCommentToRoute({
			id: routeId,
			body: formData.body,
			imageId: uploadedImageId,
			// TODO: Pipe in the selectedPinLocation from a dropped pin on detailed route map
			// selectedPinLocation: selectedPinLocation,
		});
		await refreshComments();
	};

	return (
		<>
			{!session?.user ? (
				<Card sx={{ mb: 1 }}>
					<CardContent>
						<Typography sx={{ mb: 1 }} variant="body1">
							You need to login to post a comment!
						</Typography>
						<Button
							fullWidth
							href="/login"
							LinkComponent={Link}
							color="primary"
							variant="outlined"
						>
							Login
						</Button>
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
											<Button variant="contained" startIcon={<PinDropIcon />}>
												Attach pin
											</Button>
											<Button variant="contained" type="submit">
												Submit
											</Button>
										</Box>
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
