import { Suspense } from 'react';
import { auth } from '../auth/auth';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { getUser } from '@/service/User';
import ListProfileRouteCards from './ListProfileRouteCards';
import { getRoutesByAuthorId } from '@/service/Route';

async function ProfileTitle({
	userId,
	name,
}: {
	userId: string;
	name: string;
}) {
	const session = await auth();

	if (session?.user?.id === userId) {
		return (
			<Typography variant="h4" component="h1" align="center" my={1}>
				Your profile page!
			</Typography>
		);
	}
	return (
		<Typography variant="h4" component="h1" align="center" my={1}>
			{`${name}'s profile`}
		</Typography>
	);
}

async function ProfileSubTitle({
	userId,
	noCreatedRoutesFound,
	name,
}: {
	userId: string;
	noCreatedRoutesFound: boolean;
	name: string;
}) {
	const session = await auth();

	if (noCreatedRoutesFound) {
		return (
			<Typography variant="h6" component="h1" align="center" mb={1}>
				{"User hasn't created any posts."}
			</Typography>
		);
	}
	if (session?.user?.id === userId) {
		return (
			<Typography variant="h6" component="h1" align="center" mb={1}>
				{`See your latest posts!`}
			</Typography>
		);
	}
	return (
		<Typography variant="h6" component="h1" align="center" mb={1}>
			{`See ${name}'s latest posts!`}
		</Typography>
	);
}

export default async function DisplayUserFeed({ userId }: { userId: string }) {
	const selectedUser = await getUser(userId);
	const routes = await getRoutesByAuthorId(userId);
	const noCreatedRoutesFound = routes.length === 0;

	return (
		<Box
			sx={{
				display: 'flex',
				justifyContent: 'center',
			}}
		>
			{selectedUser ? (
				<Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
					<Suspense>
						<ProfileTitle userId={userId} name={selectedUser.name} />
						<ProfileSubTitle
							userId={userId}
							noCreatedRoutesFound={noCreatedRoutesFound}
							name={selectedUser.name}
						/>
						<ListProfileRouteCards userId={userId} routes={routes} />
					</Suspense>
				</Box>
			) : (
				<Typography variant="h4" component="h1" align="center" my={1}>
					404 - No such user!
				</Typography>
			)}
		</Box>
	);
}
