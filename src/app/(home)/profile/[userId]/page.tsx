import AppBar from '@/components/AppBar';
import { Suspense } from 'react';
import DisplayUserFeed from '@/components/profile/DisplayUserFeed';

export default async function ProfilePage({
	params,
}: {
	params: { userId: string };
}) {
	const { userId } = params;
	return (
		<>
			<AppBar />
			<main>
				<Suspense>
					<DisplayUserFeed userId={userId} />
				</Suspense>
			</main>
		</>
	);
}
