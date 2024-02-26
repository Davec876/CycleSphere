'use client';

import { type Dispatch, type SetStateAction, useMemo } from 'react';
import { useSession } from 'next-auth/react';
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
import Rating from '@mui/material/Rating';
import Box from '@mui/material/Box';
import type { IRouteFlat } from '@/models/Route';
import { formatDate } from '@/util/formatDate';
import { getRoutes, likeRoute, unlikeRoute } from '@/service/Route';
import { getRouteImageUrl } from '@/util/routeImage';

export default function RouteCard({
	route,
	setRoutes,
}: {
	route: IRouteFlat;
	setRoutes: Dispatch<SetStateAction<IRouteFlat[]>>;
}) {
	const { data: session } = useSession();

	const isLiked = useMemo(() => {
		return route.likedByUserIds.includes(session?.user?.id as string);
	}, [route.likedByUserIds, session?.user?.id]);

	const handleFavoriteClick = async () => {
		if (session && session.user) {
			if (isLiked) {
				await unlikeRoute(route.id);
				setRoutes(await getRoutes());
				return;
			}
			await likeRoute(route.id);
			setRoutes(await getRoutes());
		}
	};

	return (
		<Card sx={{ width: [350, 425, 500] }}>
			<CardHeader
				avatar={<Avatar sx={{ bgcolor: red[500], color: 'white' }} />}
				title={route.title}
				subheader={formatDate(route.createdAt)}
			/>
			{route.imageId && (
				<CardMedia
					component="img"
					image={getRouteImageUrl(route.imageId)}
					alt={`Image of ${route.title}`}
					sx={{ padding: 1 }}
				/>
			)}
			<CardContent>
				<Typography variant="body2" color="text.secondary">
					{route.body}
				</Typography>
				<Box sx={{ display: 'flex', alignItems: 'center', mt: 2 }}>
					<Typography variant="subtitle2" sx={{ mr: 1 }}>
						Difficulty:
					</Typography>
					<Rating
						name="difficulty-rating"
						value={route.difficulty}
						precision={0.5}
						readOnly
					/>
				</Box>
			</CardContent>
			<CardActions disableSpacing sx={{ justifyContent: 'space-between' }}>
				<IconButton
					aria-label="add to favorites"
					onClick={handleFavoriteClick}
					sx={{ color: isLiked ? red[500] : 'inherit' }}
				>
					<FavoriteIcon />
				</IconButton>
				<IconButton
					href={`/routes/${route.id}?liked=${isLiked}`}
					LinkComponent={Link}
					aria-label="go to route"
				>
					<ArrowForwardIcon />
				</IconButton>
			</CardActions>
		</Card>
	);
}
