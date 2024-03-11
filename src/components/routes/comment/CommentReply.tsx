import { type Dispatch, type SetStateAction, useMemo } from 'react';
import { useSession } from 'next-auth/react';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Avatar from '@mui/material/Avatar';
import { red } from '@mui/material/colors';
import FavoriteIcon from '@mui/icons-material/Favorite';
import type {
	ICommentReply,
	ICommentReplyFlat,
} from '@/models/schemas/CommentReply';
import { formatDate } from '@/util/formatDate';
import type { FlattenMaps } from 'mongoose';
import type { ICommentFlat } from '@/models/schemas/Comment';
import {
	getCommentReplies,
	likeCommentReply,
	unlikeCommentReply,
} from '@/service/Route';

export default function CommentCard({
	routeId,
	comment,
	commentReply,
	setCommentReplies,
}: {
	routeId: string;
	comment: ICommentFlat;
	commentReply: ICommentReplyFlat;
	setCommentReplies: Dispatch<SetStateAction<FlattenMaps<ICommentReply>[]>>;
}) {
	const { data: session } = useSession();
	const isLiked = useMemo(() => {
		return commentReply.likedByUserIds.includes(session?.user?.id as string);
	}, [commentReply.likedByUserIds, session?.user?.id]);

	const handleFavoriteClick = async () => {
		if (session && session.user) {
			if (isLiked) {
				await unlikeCommentReply(routeId, comment.id, commentReply.id);
				setCommentReplies(await getCommentReplies(routeId, comment.id));
				return;
			}
			await likeCommentReply(routeId, comment.id, commentReply.id);
			setCommentReplies(await getCommentReplies(routeId, comment.id));
		}
	};

	return (
		<Card>
			<CardHeader
				avatar={<Avatar sx={{ bgcolor: red[500], color: 'white' }} />}
				title={`${comment.author.name} commented -> ${commentReply.author.name} replied`}
				subheader={formatDate(commentReply.createdAt)}
			/>
			<CardContent>
				<Box sx={{ display: 'flex' }}>
					<Typography
						sx={{
							width: '93%',
							overflow: 'hidden',
							whiteSpace: 'nowrap',
							textOverflow: 'ellipsis',
						}}
						variant="body1"
					>
						{commentReply.body}
					</Typography>
					<CardActions
						disableSpacing
						sx={{ width: '7%', justifyContent: 'flex-end', p: 0 }}
					>
						<Box sx={{ display: 'flex', alignItems: 'center' }}>
							{commentReply.likedByUserIds.length > 0 && (
								<Typography variant="body1">
									{commentReply.likedByUserIds.length}
								</Typography>
							)}
							<IconButton
								aria-label="add to favourited replies"
								onClick={handleFavoriteClick}
								sx={{ color: isLiked ? red[500] : 'inherit' }}
							>
								<FavoriteIcon />
							</IconButton>
						</Box>
					</CardActions>
				</Box>
			</CardContent>
		</Card>
	);
}
