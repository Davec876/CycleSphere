import type { IRouteFlat } from '@/models/Route';
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
import { useRef, useState } from 'react';

export default function VisitRouteButton({ route }: { route: IRouteFlat }) {
	const [popperOpen, setPopperOpen] = useState(false);
	const popperAnchor = useRef(null);

	return (
		<>
			<ButtonGroup variant="contained" ref={popperAnchor}>
				<Button startIcon={<DirectionsBikeRounded />}>
					I just visited here
				</Button>
				<Button
					id="timepicker-dropdown-toggle"
					size="small"
					aria-controls={popperOpen ? 'timepicker-dropdown-menu' : undefined}
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
				<Paper elevation={5}>
					<ClickAwayListener onClickAway={() => setPopperOpen(false)}>
						<Paper sx={{ p: 2, textAlign: 'center' }}>
							<Typography>I visited here at...</Typography>
							<DateTimePicker sx={{ display: 'block', mb: 1 }} />
							<Button>Add to my route history</Button>
						</Paper>
					</ClickAwayListener>
				</Paper>
			</Popper>
		</>
	);
}
