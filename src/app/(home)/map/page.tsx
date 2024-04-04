import AppBar from '@/components/AppBar';
import CommunityMap from '@/components/routes/map/CommunityMap';
import { getRoutes } from '@/service/Route';

async function LoadCommunityMap() {
	const routeLikedCountLimit = 1;
	const commentLikedCountLimit = 1;
	const routes = await getRoutes();
	const contributedRoutes = routes.filter(
		(route) =>
			route.likedByUserIds?.length >= routeLikedCountLimit &&
			route.selectedPoints?.length > 0
	);
	contributedRoutes.forEach((route) => {
		route.comments = route.comments?.filter(
			(comment) =>
				comment.pin && comment.likedByUserIds?.length >= commentLikedCountLimit
		);
	});
	return <CommunityMap filteredRoutes={contributedRoutes} />;
}

export default function MapPage() {
	return (
		<>
			<AppBar />
			<main>
				<LoadCommunityMap />
			</main>
		</>
	);
}
