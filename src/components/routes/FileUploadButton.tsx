import { useState, type Dispatch, type SetStateAction } from 'react';
import { styled } from '@mui/material/styles';
import Button from '@mui/material/Button';
import Chip from '@mui/material/Chip';
import CancelIcon from '@mui/icons-material/Cancel';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import AddPhotoAlternateIcon from '@mui/icons-material/AddPhotoAlternate';
import Box from '@mui/material/Box';
import { getPresignedImageUploadUrl } from '@/util/imageUploadUrl';
import { FetchAPIError } from '@/util/errors/FetchAPIError';
import type { Theme } from '@emotion/react';
import type { SxProps } from '@mui/system';

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
	label,
	imageId,
	setImageId,
	sx,
}: {
	label: string;
	imageId: string;
	setImageId: Dispatch<SetStateAction<string>>;
	sx?: SxProps<Theme> | undefined;
}) {
	const [uploadError, setUploadError] = useState(false);

	const handleFileChange = async (
		event: React.ChangeEvent<HTMLInputElement>
	) => {
		if (!event.target.files) return;
		const file = event.target.files[0];
		try {
			setImageId('');
			setUploadError(false);
			const { imageId, uploadUrl } = await getPresignedImageUploadUrl();

			// upload to presigned upload url
			const response = await fetch(uploadUrl, {
				method: 'PUT',
				body: file,
			});

			if (response.ok) {
				setImageId(imageId);
			}
		} catch (e) {
			if (e instanceof FetchAPIError) {
				setUploadError(true);
				console.error(e.message);
				return;
			}
			throw e;
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
				sx={sx}
				component="label"
				variant="contained"
				startIcon={<AddPhotoAlternateIcon />}
			>
				{label}
				<VisuallyHiddenInput
					type="file"
					onChange={handleFileChange}
					accept="image/*"
				/>
			</Button>
			{uploadError ? (
				<Chip icon={<CancelIcon />} label="Upload failed" color="error" />
			) : (
				imageId && (
					<Chip icon={<CheckCircleIcon />} label="Uploaded" color="success" />
				)
			)}
		</Box>
	);
}
