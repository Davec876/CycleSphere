'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import { red } from '@mui/material/colors';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import type { IRouteFlat } from '@/models/Route';
import { formatDate } from '@/util/formatDate';
import { useSession } from 'next-auth/react';
import { likeRoute, unlikeRoute } from '@/service/Route';

export default function RouteCard({ route }: { route: IRouteFlat }) {
	const { data: session } = useSession();
	const [isLiked, setIsLiked] = useState(false);

	useEffect(() => {
		setIsLiked(route.likedByUserIds.includes(session?.user?.id as string));
	}, [route.likedByUserIds, session?.user?.id]);

	const handleFavoriteClick = async () => {
		if (session && session.user) {
			setIsLiked((prev) => !prev);
			if (isLiked) {
				await unlikeRoute(route.id);
				return;
			}
			await likeRoute(route.id);
		}
	};

	return (
		<Card sx={{ width: [350, 425, 500] }}>
			<CardHeader
				avatar={<Avatar sx={{ bgcolor: red[500], color: 'white' }} />}
				title={route.title}
				subheader={formatDate(route.createdAt)}
			/>
			{route.imagePath !== '/' && (
				<CardMedia
					component="img"
					image={route.imagePath}
					alt={`Image of ${route.title}`}
					sx={{ padding: 1 }}
				/>
			)}
			<CardContent>
				<Typography variant="body2" color="text.secondary">
					{route.body}
				</Typography>
			</CardContent>
			<CardActions disableSpacing sx={{ justifyContent: 'space-between' }}>
				<IconButton
					aria-label="add to favorites"
					onClick={handleFavoriteClick}
					sx={{ color: isLiked ? red[500] : 'inherit' }}
				>
					<FavoriteIcon />
				</IconButton>
				<Link href={`/routes/${route.id}?liked=${isLiked}`} passHref>
					<IconButton aria-label="go to route">
						<ArrowForwardIcon />
					</IconButton>
				</Link>
			</CardActions>
		</Card>
	);
}
