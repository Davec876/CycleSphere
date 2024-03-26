import AppBar from '@/components/AppBar';
import Container from '@mui/material/Container';
import FitnessCard from '@/components/fitness/FitnessCard';
import { IProfile } from '@/models/Profile';

const profile : IProfile = {
	id: '',
	name: 'Kevin Orenday',
	picture: ''
}

export default function FitnessPage() {
	return(
	<>
		<AppBar />
		<main>
			<Container maxWidth='md' sx={{ display: 'flex', justifyContent: 'center', paddingY: '4em' }}>
				<FitnessCard profile={profile} />
			</Container>
		</main>
	</>
	);
}
