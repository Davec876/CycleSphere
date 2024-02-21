import AppBar from '@/components/AppBar';
import Box from '@mui/material/Box';
import ContactCard from '@/components/contact/ContactCard';
import Typography from '@mui/material/Typography';

export default function ContactPage() {
	const Contacts = [
		{
			name: 'Ahmed Galal',
			email: 'a.galal@dal.ca'
		},
		{
			name: 'Dave Chuck',
			email: 'dchuck@dal.ca'
		},
		{
			name: 'Erxiao Tang',
			email: 'erxiao.tang@dal.ca'
		},
		{
			name: 'Kevin Orenday',
			email: 'kevin.orenday@dal.ca'
		},
		{
			name: 'Maximo Guk',
			email: 'maximo@dal.ca'
		},
		{
			name: 'Saahir Monowar',
			email: 'saahir.monowar@dal.ca'
		},
	];
	return (
		<>
			<AppBar />
			<main>
				<Box
					sx={{
						display: 'flex',
						flexDirection: 'column',
						justifyContent: 'center',
						alignItems: 'center',
						gap: 2,
					}}
				>
					<Typography variant="h3" component="div" sx={{marginTop: 2}}>
							Contact us!
						</Typography>
					{Contacts.map((contact, index) => (
                        <ContactCard key={index} contact={contact} />
                    ))}
				</Box>
			</main>
		</>
	);
}
