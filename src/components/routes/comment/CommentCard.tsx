import { type Dispatch, type SetStateAction, useMemo } from 'react';
import { useSession } from 'next-auth/react';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Avatar from '@mui/material/Avatar';
import { red } from '@mui/material/colors';
import FavoriteIcon from '@mui/icons-material/Favorite';
import type { ICommentFlat } from '@/models/schemas/Comment';
import { formatDate } from '@/util/formatDate';
import { getImageUrl } from '@/util/imageUploadUrl';
import type { FlattenMaps } from 'mongoose';
import type { IComment } from '@/models/schemas/Comment';
import {
	getCommentsForRoute,
	likeComment,
	unlikeComment,
} from '@/service/Route';

export default function CommentCard({
	routeId,
	comment,
	setComments,
}: {
	routeId: string;
	comment: ICommentFlat;
	setComments: Dispatch<SetStateAction<FlattenMaps<IComment>[]>>;
}) {
	const { data: session } = useSession();
	const isLiked = useMemo(() => {
		return comment.likedByUserIds.includes(session?.user?.id as string);
	}, [comment.likedByUserIds, session?.user?.id]);

	const handleFavoriteClick = async () => {
		if (session && session.user) {
			if (isLiked) {
				await unlikeComment(routeId, comment.id);
				setComments(await getCommentsForRoute(routeId));
				return;
			}
			await likeComment(routeId, comment.id);
			setComments(await getCommentsForRoute(routeId));
		}
	};

	return (
		<Card>
			<CardHeader
				avatar={<Avatar sx={{ bgcolor: red[500], color: 'white' }} />}
				title={`${comment.author.name} commented`}
				subheader={formatDate(comment.createdAt)}
			/>
			<CardContent>
				{comment.imageId && (
					<CardMedia
						sx={{
							maxHeight: 250,
							objectFit: 'contain',
							mb: 2,
						}}
						component="img"
						image={getImageUrl(comment.imageId)}
						alt={`Image of ${comment.author.name}'s comment`}
					/>
				)}
				<Typography variant="body1">{comment.body}</Typography>
				<CardActions disableSpacing sx={{ justifyContent: 'flex-end', p: 0 }}>
					<IconButton
						aria-label="add to favourited comments"
						onClick={handleFavoriteClick}
						sx={{ color: isLiked ? red[500] : 'inherit' }}
					>
						<FavoriteIcon />
					</IconButton>
				</CardActions>
			</CardContent>
		</Card>
	);
}
