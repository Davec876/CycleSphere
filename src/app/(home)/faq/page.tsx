import AppBar from '@/components/AppBar';
import ListFAQCards from '@/components/faq/ListFAQCards';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';

export default function FAQPage() {
	const FAQS = [
		{
			title: 'How do I share my routes?',
			body: 'Simply go to our homepage, login or create an account and click the plus icon in the bottom right to add a route.',
		},
		{
			title: 'How do I search for specific bike routes?',
			body: 'Use the search function in our route catalog. You can also filter by date added, difficulty, rating, and other criteria to find your perfect ride.',
		},
		{
			title: 'How do I like a bike route?',
			body: "Login, and hit the heart icon that's associated with the route.",
		},
		{
			title: 'How do I view detailed route information?',
			body: "Hit the forward arrow on the route that you're interested in from the route catalog.",
		},
		{
			title: "How do I switch to Dark Mode?",
			body: "Navigate to 'Settings' on your profile page, where you'll find the option to switch to Dark Mode."
		},
		{
			title: "Can I download maps for offline use?",
			body: "Yes, select the trail or map you're interested in and look for the 'Download' option. This allows you to access the map even when you're not connected to the internet."
		},
		{
			title: "How do I report a temporary event or obstruction on a route?",
			body: "Go to the 'Map' page, select 'Report an Event', and fill in the details about the obstruction. Your report helps the community stay informed about current route conditions."
		},
		{
			title: "How do I edit an existing bike route?",
			body: "On the 'Map' page, use the 'Route Editing' feature to select and make changes to a route. Your edits will be reviewed by the community before going live."
		},
		{
			title: "How do I find a new bike route for my next ride?",
			body: "Explore the 'Nearby Biking Routes List' or use the 'Search / Filter' option in our Route Catalog to discover new and exciting rides."
		},
		{
			title: "How can I track my fitness progress?",
			body: "Use the 'Fitness Tracking' feature to view your dashboard, which displays distance, speed, calorie burns, and more. You can also view your activity history and personal achievements."
		},
		{
			title: "How do I save a route for later?",
			body: "When viewing a route's details, click the 'Save' or 'Heart' icon to add it to your list of favorite content, accessible through your user account."
		},
		{
			title: "How do I use the Personalized Routing System (PRS)?",
			body: "The PRS feature recommends routes based on your past rides and preferences. Access it through the 'PRS' option on the 'Map & Routes' page."
		},
		{
			title: "How do I share my biking experiences with the community?",
			body: "After your ride, use the 'Route Note' feature to add comments, photos, or videos to the route. Your insights help enrich the community's knowledge of the trail."
		},
		{
			title: "How do I manage my route contributions and edits?",
			body: "Go to your 'User Account' and select 'Map/Route Contribution Management' to view and manage your submitted routes and edits."
		},
	];

	return (
		<>
			<AppBar />
			<main>
				<Card>
					<CardContent>
						<Typography variant="h3" component="div">
							Frequently Asked Questions
						</Typography>
						<Box
							sx={{
								display: 'flex',
								flexDirection: 'column',
								gap: 1,
								mt: 1,
							}}
						>
							<ListFAQCards FAQS={FAQS} />
						</Box>
					</CardContent>
				</Card>
			</main>
		</>
	);
}
