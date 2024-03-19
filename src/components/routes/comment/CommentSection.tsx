import { useState } from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import type { ICommentFlat } from '@/models/schemas/Comment';
import CommentCard from './CommentCard';
import CommentCreationBox from './CommentCreationBox';

export default function CommentSection({
	routeId,
	initialComments,
}: {
	routeId: string;
	initialComments: ICommentFlat[];
}) {
	const [comments, setComments] = useState(initialComments);

	return (
		<Card>
			<CardContent>
				<Typography sx={{ mb: 1 }} variant="body1">
					Comment section
				</Typography>
				<CommentCreationBox routeId={routeId} setComments={setComments} />
				{comments?.length > 0 && (
					<Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
						{comments.map((comment) => {
							return (
								<CommentCard
									key={comment.id}
									routeId={routeId}
									comment={comment}
									setComments={setComments}
								/>
							);
						})}
					</Box>
				)}
			</CardContent>
		</Card>
	);
}
