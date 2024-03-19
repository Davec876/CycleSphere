import { memo } from 'react';
import Card from '@mui/material/Card';

function DistanceOverlay({ distance }: { distance?: number }) {
	return (
		<>
			{distance && (
				<Card
					sx={{
						position: 'absolute',
						bgcolor: 'rgba(0, 0, 0, 0.5)',
						top: 0,
						left: 0,
					}}
				>{`${distance.toFixed(1)}km`}</Card>
			)}
		</>
	);
}

export default memo(DistanceOverlay);
