'use client';

import type { SyntheticEvent } from 'react';
import { useEffect, useState } from 'react';
import { redirect, useRouter, useSearchParams } from 'next/navigation';
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
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import Rating from '@mui/material/Rating';
import Box from '@mui/material/Box';
import type { IRouteFlat } from '@/models/Route';
import { formatDate } from '@/util/formatDate';
import { likeRoute, unlikeRoute } from '@/service/Route';
import { getImageUrl } from '@/util/imageUploadUrl';
import Map from './map/Map';
import CommentSection from './comment/CommentSection';
import AddIcon from '@mui/icons-material/AddSharp';
import CheckIcon from '@mui/icons-material/CheckSharp';
import Button from '@mui/material/Button';
import { addActivity, getActivityByRouteId } from '@/service/Activity';
import type { ICommentFlat } from '@/models/schemas/Comment';
import { PinProvider } from '../context/PinProvider';

export default function DetailedRouteCard({ route }: { route: IRouteFlat }) {
	const { data: session } = useSession();
	const router = useRouter();
	const searchParams = useSearchParams();
	const [isLiked, setIsLiked] = useState(searchParams.get('liked') === 'true');
	const [isAdded, setIsAdded] = useState(false);
	const [comments, setComments] = useState<ICommentFlat[]>(route.comments);

	useEffect(() => {
		getActivityByRouteId(route.id).then((exist) => setIsAdded(Boolean(exist)));
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

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

	const handleAddToActivity = async (event: SyntheticEvent) => {
		event.preventDefault();

		if (session && session.user) {
			await addActivity({
				name: route.title,
				routeId: route.id,
			})
				.then(() => setIsAdded(true))
				.catch((error) => console.log(error));
		} else redirect('/login');
	};

	return (
		<PinProvider>
			<Box
				sx={{
					display: 'flex',
					flexDirection: 'column',
					width: ['100%', '75%', '50%'],
					gap: 1,
				}}
			>
				<Card>
					<CardHeader
						avatar={
							<IconButton
								href={`/profile/${route.author.id}`}
								LinkComponent={Link}
								aria-label="go to author's profile"
							>
								<Avatar sx={{ bgcolor: red[500], color: 'white' }} />
							</IconButton>
						}
						action={
							session ? (
								<Button
									variant="outlined"
									disabled={isAdded}
									onClick={handleAddToActivity}
									endIcon={isAdded ? <CheckIcon /> : <AddIcon />}
									sx={{ marginTop: '1em', marginRight: '1em' }}
								>
									{isAdded ? 'Added' : 'Add to Activity List'}
								</Button>
							) : (
								<Box></Box>
							)
						}
						title={route.title}
						subheader={formatDate(route.createdAt)}
					/>
					<CardContent>
						<Typography sx={{ mb: 2 }} variant="body1">
							{route.body}
						</Typography>
						{route.imageId && (
							<CardMedia
								component="img"
								image={getImageUrl(route.imageId)}
								alt={`Image of ${route.title}`}
							/>
						)}
						<Map
							location={route.location}
							selectedPoints={route.selectedPoints}
							distance={route.distance}
						/>
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
							aria-label="go back to home"
							onClick={() => router.back()}
						>
							<ArrowBackIcon />
						</IconButton>
						<Box sx={{ display: 'flex', alignItems: 'center' }}>
							{route.likedByUserIds.length > 0 && (
								<Typography variant="body1">
									{route.likedByUserIds.length}
								</Typography>
							)}
							<IconButton
								aria-label="add to favorites"
								onClick={handleFavoriteClick}
								sx={{ color: isLiked ? red[500] : 'inherit' }}
							>
								<FavoriteIcon />
							</IconButton>
						</Box>
					</CardActions>
				</Card>
				<CommentSection routeId={route.id} initialComments={route.comments} />
			</Box>
		</PinProvider>
	);
}
