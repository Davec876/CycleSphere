import { type Dispatch, type SetStateAction, useState } from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import FormControl from '@mui/material/FormControl';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import { addReplyToComment, getCommentReplies } from '@/service/Route';
import type { FlattenMaps } from 'mongoose';
import type { ICommentReply } from '@/models/schemas/CommentReply';

export default function CommentReplyCreationBox({
	routeId,
	commentId,
	setCommentReplies,
}: {
	routeId: string;
	commentId: string;
	setCommentReplies: Dispatch<SetStateAction<FlattenMaps<ICommentReply>[]>>;
}) {
	interface CommentForm {
		body: string;
	}

	const [formData, setFormData] = useState({} as CommentForm);

	const refreshReplies = async () => {
		// fetch updated replies via server action and update state
		const replies = await getCommentReplies(routeId, commentId);
		setCommentReplies(replies);
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
		await addReplyToComment({
			routeId,
			commentId,
			body: formData.body,
		});
		await refreshReplies();
	};

	return (
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
							gap: 2,
						}}
					>
						<TextField
							name="body"
							label="Add a reply"
							type="text"
							required
							fullWidth
							variant="outlined"
							onChange={handleChange}
							value={formData.body}
						/>
						<CardActions>
							<Button variant="contained" type="submit">
								Reply
							</Button>
						</CardActions>
					</Box>
				</FormControl>
			</CardContent>
		</Card>
	);
}
