'use client';

import { useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useSession } from 'next-auth/react';
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
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import Rating from '@mui/material/Rating';
import Box from '@mui/material/Box';
import type { IRouteFlat } from '@/models/Route';
import { formatDate } from '@/util/formatDate';
import { likeRoute, unlikeRoute } from '@/service/Route';
import { getRouteImageUrl } from '@/util/routeImage';
import Map from './map/Map';

export default function DetailedRouteCard({ route }: { route: IRouteFlat }) {
	const { data: session } = useSession();
	const router = useRouter();
	const searchParams = useSearchParams();
	const [isLiked, setIsLiked] = useState(searchParams.get('liked') === 'true');

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
				<Map location={route.location} selectedPoints={route.selectedPoints} />
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
				<IconButton aria-label="go back to home" onClick={() => router.back()}>
					<ArrowBackIcon />
				</IconButton>
				<IconButton
					aria-label="add to favorites"
					onClick={handleFavoriteClick}
					sx={{ color: isLiked ? red[500] : 'inherit' }}
				>
					<FavoriteIcon />
				</IconButton>
			</CardActions>
		</Card>
	);
}
