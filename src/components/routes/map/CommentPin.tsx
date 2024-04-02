import type { IComment } from '@/models/schemas/Comment';
import Avatar from '@mui/material/Avatar';
import { red } from '@mui/material/colors';
import { AdvancedMarker, Pin } from '@vis.gl/react-google-maps';
import router from 'next/router';

export default function CommentPin({
	comment,
	isHighlighted,
}: {
	comment: IComment;
	isHighlighted: boolean;
}) {
	if (!comment.pin) return <></>;

	return (
		<AdvancedMarker
			key={comment.id}
			position={comment.pin.location}
			onClick={() => router.replace(`#${comment.id}`)}
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
