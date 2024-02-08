'use client';

import * as React from 'react';
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
import type { Route } from '@/app/page';
import Link from 'next/link';

export default function RouteCard({ route }: { route: Route }) {
	const [isFavorited, setIsFavorited] = React.useState(false);

	const handleFavoriteClick = () => {
		setIsFavorited(!isFavorited);
	};

	return (
		<Card sx={{ maxWidth: 345 }}>
			<CardHeader
				avatar={<Avatar sx={{ bgcolor: red[500], color: 'white' }} />}
				title={route.title}
				subheader={route.createdOn}
			/>
			<CardMedia
				component="img"
				image={route.imagePath}
				alt={`Image of ${route.title}`}
				sx={{ padding: 1 }}
			/>
			<CardContent>
				<Typography variant="body2" color="text.secondary">
					{route.body}
				</Typography>
			</CardContent>
			<CardActions disableSpacing sx={{ justifyContent: 'space-between' }}>
				<IconButton
					aria-label="add to favorites"
					onClick={handleFavoriteClick}
					sx={{ color: isFavorited ? red[500] : 'inherit' }}
				>
					<FavoriteIcon />
				</IconButton>
				<Link href={`/routes/${route.id}`} passHref>
					<IconButton aria-label="go to route">
						<ArrowForwardIcon />
					</IconButton>
				</Link>
			</CardActions>
		</Card>
	);
}
