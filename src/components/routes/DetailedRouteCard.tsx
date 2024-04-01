'use client';

import type { SyntheticEvent } from 'react';
import { useState } from 'react';
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
import { MoreVertSharp } from '@mui/icons-material';
import Rating from '@mui/material/Rating';
import Box from '@mui/material/Box';
import type { IRouteFlat } from '@/models/Route';
import { formatDate } from '@/util/formatDate';
import { likeRoute, unlikeRoute } from '@/service/Route';
import { getImageUrl } from '@/util/imageUploadUrl';
import Map from './map/Map';
import CommentSection from './comment/CommentSection';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import AddIcon from '@mui/icons-material/AddSharp';
import ReportIcon from '@mui/icons-material/ReportSharp';
import CheckIcon from '@mui/icons-material/CheckSharp';
import { addActivity, getActivityByRouteId } from '@/service/Activity';

export default function DetailedRouteCard({ route }: { route: IRouteFlat }) {
	const { data: session } = useSession();
	const router = useRouter();
	const searchParams = useSearchParams();
	const [isLiked, setIsLiked] = useState(searchParams.get('liked') === 'true');
	const [anchorEl, setAnchor] = useState(undefined as unknown as Element);
	const [isAdded, setIsAdded] = useState(false);

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

	const handleSettingsClick = (event: SyntheticEvent) => {
		event.preventDefault();
		setAnchor(event.currentTarget);
	};

	const handleSettingsMenuClose = () => setAnchor(undefined!);

	const handleAddToActivity = async (event: SyntheticEvent) => {
		event.preventDefault();

		if (session && session.user) {
			await addActivity({
				name: route.title,
				route: route,
			})
				.then(() => setIsAdded(true))
				.catch(console.error);
		} else redirect('/login');

		handleSettingsMenuClose();
	};

	getActivityByRouteId(route.id).then((exist) => setIsAdded(Boolean(exist)));

	return (
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
						<IconButton onClick={handleSettingsClick} aria-label="settings">
							<MoreVertSharp />
						</IconButton>
					}
					title={route.title}
					subheader={formatDate(route.createdAt)}
				/>
				<Menu
					id="settings-menu"
					anchorEl={anchorEl}
					open={Boolean(anchorEl)}
					onClose={handleSettingsMenuClose}
				>
					{session ? (
						<MenuItem onClick={handleAddToActivity} disabled={isAdded}>
							<ListItemIcon>
								{isAdded ? (
									<CheckIcon fontSize="medium" />
								) : (
									<AddIcon fontSize="medium" />
								)}
							</ListItemIcon>
							<ListItemText>
								{isAdded ? 'Added to Activity List' : 'Add to Activity List'}
							</ListItemText>
						</MenuItem>
					) : (
						<Box></Box>
					)}
					<MenuItem onClick={handleSettingsMenuClose}>
						<ListItemIcon>
							<ReportIcon fontSize="medium" />
						</ListItemIcon>
						<ListItemText>Report Post</ListItemText>
					</MenuItem>
				</Menu>
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
	);
}
