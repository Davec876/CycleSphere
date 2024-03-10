import { useState } from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import FormControl from '@mui/material/FormControl';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import type { ICommentFlat } from '@/models/schemas/Comment';
import FileUploadButton from '../FileUploadButton';
import CommentCard from './CommentCard';
import PinDropIcon from '@mui/icons-material/PinDrop';

export default function CommentSection({
	comments,
}: {
	comments: ICommentFlat[];
}) {
	const mockComments: ICommentFlat[] = [
		{
			id: '32131231',
			author: {
				id: '42323',
				name: 'Coolguy369',
			},
			body: 'I really like this trail',
			likedByUserIds: [],
			replies: [],
			createdAt: new Date(),
			updatedAt: new Date(),
		},
		{
			id: '42131231',
			author: {
				id: '423233',
				name: 'Otherguy369',
			},
			body: 'I also like this trail',
			likedByUserIds: [],
			replies: [],
			createdAt: new Date(),
			updatedAt: new Date(),
		},
	];

	interface CommentForm {
		body: string;
	}

	const [formData, setFormData] = useState({} as CommentForm);
	const [uploadedImageId, setUploadedImageId] = useState('');

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const { name, value } = e.target;
		setFormData((prevState) => ({
			...prevState,
			[name]: value,
		}));
	};

	const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		console.log(formData.body);
	};

	return (
		<Card>
			<CardContent>
				<Typography sx={{ mb: 1 }} variant="body1">
					Comment section
				</Typography>
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
				{mockComments?.length > 0 && (
					<Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
						{mockComments.map((comment) => {
							return <CommentCard key={comment.id} comment={comment} />;
						})}
					</Box>
				)}
			</CardContent>
		</Card>
	);
}
