import { type Dispatch, type SetStateAction } from 'react';
import { styled } from '@mui/material/styles';
import Button from '@mui/material/Button';
import Chip from '@mui/material/Chip';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import AddPhotoAlternateIcon from '@mui/icons-material/AddPhotoAlternate';
import Box from '@mui/material/Box';
import { getPresignedRouteImageUploadUrl } from '@/util/routeImage';

const VisuallyHiddenInput = styled('input')({
	clip: 'rect(0 0 0 0)',
	clipPath: 'inset(50%)',
	height: 1,
	overflow: 'hidden',
	position: 'absolute',
	bottom: 0,
	left: 0,
	whiteSpace: 'nowrap',
	width: 1,
});

export default function FileUploadButton({
	imageId,
	setImageId,
}: {
	imageId: string;
	setImageId: Dispatch<SetStateAction<string>>;
}) {
	const handleFileChange = async (
		event: React.ChangeEvent<HTMLInputElement>
	) => {
		if (!event.target.files) return;
		const file = event.target.files[0];
		try {
			setImageId('');
			const { imageId, uploadUrl } = await getPresignedRouteImageUploadUrl();

			// upload to presigned upload url
			const response = await fetch(uploadUrl, {
				method: 'PUT',
				body: file,
			});

			if (response.ok) {
				setImageId(imageId);
			}
		} catch (e) {
			console.error('Error uploading file:', e);
		}
	};

	return (
		<Box
			sx={{
				display: 'flex',
				alignItems: 'center',
				justifyContent: 'space-between',
			}}
		>
			<Button
				sx={{ my: 1 }}
				component="label"
				variant="contained"
				startIcon={<AddPhotoAlternateIcon />}
			>
				Upload route photo
				<VisuallyHiddenInput
					type="file"
					onChange={handleFileChange}
					accept="image/*"
				/>
			</Button>
			{imageId && (
				<Chip icon={<CheckCircleIcon />} label="Uploaded" color="success" />
			)}
		</Box>
	);
}
