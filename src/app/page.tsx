import AppBar from '@/components/AppBar';
import ListRouteCards from '@/components/routes/ListRouteCards';
import Box from '@mui/material/Box';
import { Suspense } from 'react';

export interface Route {
	id: string;
	title: string;
	body: string;
	imagePath: string;
	difficulty: number;
	createdOn: string;
}

export function getRoutes(): Route[] {
	return [
		{
			id: '1',
			title: 'Shubenacadie Grand Lake',
			// Sourced from https://www.shubenacadiecanal.ca/grand-lake
			body: 'Shubenacadie Grand Lake is the last of the seven lakes along the waterway and the only one not wholly contained within Halifax Regional Municipality. It is located near the present location of Halifax Stanfield International Airport.',
			// Sourced from https://www.fishnovascotia.ca/sites/default/files/styles/th/public/2020-09/ShubenacadieGrandLake_GalleryImage1.jpg?itok=bwnSMVGg
			imagePath: 'Shubenacadie-Grand-Lake.jpg',
			difficulty: 5,
			createdOn: 'January 22nd, 2024',
		},
		{
			id: '2',
			title: 'Shubie Park',
			// https://www.novascotia.com/see-do/trails/shubie-park-trails/6092
			body: 'Shubie Park, a beautiful 16-hectare urban park in Dartmouth, contains over 9 kilometres of wooded walking trails, including part of the Trans Canada Trail. Some of the trails of the park follow a portion of the abandoned Shubenacadie Canal, which passes through the park.',
			// Sourced from https://images.squarespace-cdn.com/content/v1/57d6e71d8419c24ffcec7d6d/1566418149228-S5LV4AHKQPQ0ZSYKDV9L/IMG_3312+small.JPG?format=1500w
			imagePath: 'Shubie-Park.jpeg',
			difficulty: 1,
			createdOn: 'January 30th, 2024',
		},
		{
			id: '3',
			title: 'Salt Marsh Trail',
			// https://www.novascotia.com/see-do/trails/salt-marsh-and-shearwater-flyer-trails-trans-canada-trail/6141
			body: 'The Salt Marsh Trail is 6.5 km long (13 km return) with a 3.2 km section over a causeway through the Cole Harbour salt marsh which offers wonderful views, interpretive signage, and abundant wildlife. Salt marshes are a graceful intermingling of land, freshwater and a twice-daily flood of salt water.',
			// Sourced from https://live.staticflickr.com/65535/50266005421_62819ef1d6_b.jpg
			imagePath: 'Salt-Marsh-Trail.jpg',
			difficulty: 1,
			createdOn: 'Feburary 2nd, 2024',
		},
	];
}

async function LoadRouteCards() {
	// This will be a async database call once implemented
	const routes = getRoutes();
	return <ListRouteCards routes={routes} />;
}

export default function Home() {
	return (
		<>
			<AppBar />
			<main>
				<Box
					sx={{
						display: 'flex',
						justifyContent: 'center',
						alignItems: 'center',
					}}
				>
					<Box
						marginTop={1}
						sx={{
							display: 'flex',
							flexDirection: 'column',
							gap: 1,
						}}
					>
						<Suspense>
							<LoadRouteCards />
						</Suspense>
					</Box>
				</Box>
			</main>
		</>
	);
}
