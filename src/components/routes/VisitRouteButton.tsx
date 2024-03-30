import { visitRoute } from '@/service/User';
import {
	ArrowDropDownRounded,
	DirectionsBikeRounded,
} from '@mui/icons-material';
import {
	Button,
	ButtonGroup,
	ClickAwayListener,
	Paper,
	Popper,
	Typography,
} from '@mui/material';
import { DateTimePicker } from '@mui/x-date-pickers';
import type { DateTime } from 'luxon';
import { useRef, useState } from 'react';

export default function VisitRouteButton({ routeId }: { routeId: string }) {
	const [visitDate, setVisitDate] = useState<DateTime | null>(null);
	const [popperOpen, setPopperOpen] = useState(false);
	const popperAnchor = useRef(null);

	const handleVisit = async () => {
		setPopperOpen(false);
		await visitRoute(routeId, visitDate?.toISO());
	};

	return (
		<>
			<ButtonGroup variant="contained" ref={popperAnchor}>
				<Button startIcon={<DirectionsBikeRounded />} onClick={handleVisit}>
					Just visited
				</Button>
				<Button
					id="timepicker-dropdown-toggle"
					size="small"
					aria-controls={popperOpen ? 'timepicker-dropdown' : undefined}
					aria-haspopup="true"
					aria-expanded={popperOpen ? true : undefined}
					onClick={() => setPopperOpen(true)}
				>
					<ArrowDropDownRounded />
				</Button>
			</ButtonGroup>
			<Popper
				open={popperOpen}
				anchorEl={popperAnchor.current}
				placement="bottom-end"
			>
				<Paper>
					<ClickAwayListener onClickAway={() => setPopperOpen(false)}>
						<Paper
							id="timepicker-dropdown"
							elevation={3}
							sx={{ p: 2, textAlign: 'center' }}
						>
							<Typography>I visited here at...</Typography>
							<DateTimePicker
								sx={{ display: 'block', mb: 1 }}
								onChange={(date) => setVisitDate(date)}
							/>
							<Button onClick={handleVisit}>Add to my route history</Button>
						</Paper>
					</ClickAwayListener>
				</Paper>
			</Popper>
		</>
	);
}
