import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import EmailIcon from '@mui/icons-material/Email';
import Link from 'next/link';

export default function ContactCard({
	contact,
}: {
	contact: {
		name: string;
		email: string;
	};
}) {
	const getInitials = (name: string) => {
		return name
			.split(' ')
			.map((n) => n[0])
			.join('');
	};

	return (
		<Card sx={{ width: 350 }}>
			<CardHeader
				avatar={
					<Avatar sx={{ bgcolor: '#FFD400' }}>
						{getInitials(contact.name)}
					</Avatar>
				}
				action={
					<IconButton
						href={`mailto:${contact.email}`}
						LinkComponent={Link}
						aria-label="email them"
					>
						<EmailIcon />
					</IconButton>
				}
				title={contact.name}
				subheader={contact.email}
			/>
		</Card>
	);
}
