import AppBar from '@/components/AppBar';
import FAQCard from '@/components/faq/FAQCard';
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
							{FAQS.map((faq, index) => (
								<FAQCard key={index} title={faq.title} body={faq.body} />
							))}
						</Box>
					</CardContent>
				</Card>
			</main>
		</>
	);
}
