import AppBar from '@/components/AppBar';
import Container from '@mui/material/Container';
import FitnessCard from '@/components/fitness/FitnessCard';

export default function FitnessPage() {
	return(
	<>
		<AppBar />
		<main>
			<Container maxWidth='md' sx={{ display: 'flex', justifyContent: 'center', paddingY: '4em' }}>
				<FitnessCard profile={{
					id: '',
					name: 'Kevin',
					picture: ''
				}} />
			</Container>
		</main>
	</>
	);
}
