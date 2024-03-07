import { useState } from 'react';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import FormControl from '@mui/material/FormControl';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import Avatar from '@mui/material/Avatar';
import { red } from '@mui/material/colors';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import type { ICommentFlat } from '@/models/schemas/Comment';
import { formatDate } from '@/util/formatDate';
import { getImageUrl } from '@/util/routeImage';

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
									gap: 1,
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
									<Button fullWidth variant="contained" type="submit">
										Submit
									</Button>
								</CardActions>
							</Box>
						</FormControl>
					</CardContent>
				</Card>
				{mockComments?.length > 0 && (
					<Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
						{mockComments.map((comment) => {
							return (
								<Card key={comment.id}>
									<CardHeader
										avatar={
											<Avatar sx={{ bgcolor: red[500], color: 'white' }} />
										}
										title={`${comment.author.name} commented`}
										subheader={formatDate(comment.createdAt)}
									/>
									<CardContent>
										{comment.imageId && (
											<CardMedia
												component="img"
												image={getImageUrl(comment.imageId)}
												alt={`Image of ${comment.author.name}'s comment`}
											/>
										)}
										<Typography variant="body1">{comment.body}</Typography>
									</CardContent>
								</Card>
							);
						})}
					</Box>
				)}
			</CardContent>
		</Card>
	);
}
