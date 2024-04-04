import type { IComment } from '@/models/schemas/Comment';
import Avatar from '@mui/material/Avatar';
import { red } from '@mui/material/colors';
import { AdvancedMarker, Pin } from '@vis.gl/react-google-maps';
import { useRouter } from 'next/navigation';

export default function CommentPin({
	comment,
	isHighlighted,
	routeId = null,
}: {
	comment: IComment;
	isHighlighted: boolean;
	routeId?: string | null;
}) {
	const router = useRouter();

	if (!comment.pin) return <></>;

	const handleOnClick = () => {
		if (routeId) {
			router.push(`/routes/${routeId}#${comment.id}`);
		} else {
			router.replace(`#${comment.id}`);
		}
	};

	return (
		<AdvancedMarker
			key={comment.id}
			position={comment.pin.location}
			onClick={handleOnClick}
		>
			<Pin background={red[500]}>
				<Avatar
					className={isHighlighted ? 'highlighted' : ''}
					sx={{
						bgcolor: red[500],
						color: 'white',
						transform: 'scale(0.5)',

						'&.highlighted': {
							animation: '0.25s infinite alternate blink',
						},
						'@keyframes blink': {
							from: { bgcolor: red[500] },
							'50%': { bgcolor: red[500] },
							to: { bgcolor: 'black' },
						},
					}}
				/>
			</Pin>
		</AdvancedMarker>
	);
}
