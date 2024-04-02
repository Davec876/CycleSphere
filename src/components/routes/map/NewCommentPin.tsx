import { usePin } from '@/components/context/PinProvider';
import type { ICommentFlat, IPin } from '@/models/schemas/Comment';
import Avatar from '@mui/material/Avatar';
import { useTheme } from '@mui/material/styles';
import { AdvancedMarker, Pin } from '@vis.gl/react-google-maps';
import { useEffect } from 'react';

export default function NewCommentPin({
	defaultLocation,
}: {
	defaultLocation: IPin['location'];
}) {
	const theme = useTheme();
	const { isPinAttached, pinLocation, setPinLocation } = usePin();

	useEffect(() => {
		if (isPinAttached && !pinLocation) {
			setPinLocation({ location: defaultLocation });
		}
	}, [isPinAttached, pinLocation, setPinLocation, defaultLocation]);

	const handlePinDrag = (e: google.maps.MapMouseEvent) => {
		if (!e.latLng) return;

		const newPinLocation: ICommentFlat['pin'] = {
			location: {
				lat: e.latLng.lat(),
				lng: e.latLng.lng(),
			},
		};
		setPinLocation(newPinLocation);
	};

	if (!isPinAttached) return <></>;

	return (
		<AdvancedMarker
			position={pinLocation?.location || defaultLocation}
			draggable
			onDragEnd={handlePinDrag}
		>
			<Pin
				scale={1.5}
				background={theme.palette.primary.main}
				borderColor={theme.palette.primary.contrastText}
			>
				<Avatar
					sx={(theme) => ({
						bgcolor: theme.palette.primary.main,
						color: theme.palette.primary.contrastText,
						transform: 'scale(0.5)',

						animation: '1s infinite alternate grow',
						'@keyframes grow': {
							from: { transform: 'scale(0.5)' },
							to: { transform: 'scale(0.7)' },
						},
					})}
				/>
			</Pin>
		</AdvancedMarker>
	);
}
