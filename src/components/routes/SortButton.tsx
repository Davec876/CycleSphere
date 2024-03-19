'use client';

import {
	type ChangeEvent,
	useState,
	type Dispatch,
	type SetStateAction,
} from 'react';
import IconButton from '@mui/material/IconButton';
import SortIcon from '@mui/icons-material/Sort';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';

export default function SortButton({
	checked,
	setChecked,
}: {
	checked: string;
	setChecked: Dispatch<SetStateAction<string>>;
}) {
	const [open, setOpen] = useState(false);

	const handleClickOpen = () => {
		setOpen(true);
	};

	const handleClose = () => {
		setOpen(false);
	};

	const handleCheckboxChange = (event: ChangeEvent<HTMLInputElement>) => {
		setChecked(event.target.name);
	};

	return (
		<>
			<IconButton
				onClick={handleClickOpen}
				color="primary"
				sx={{ width: '7%' }}
			>
				<SortIcon />
			</IconButton>
			<Dialog
				open={open}
				onClose={handleClose}
				PaperProps={{
					component: 'form',
				}}
			>
				<DialogTitle>Sort by</DialogTitle>
				<DialogContent>
					<Box display="flex" flexDirection="row" flexWrap="wrap">
						<Box flex="1" minWidth="50%">
							<FormGroup>
								<FormControlLabel
									control={
										<Checkbox
											checked={checked === 'oldest'}
											onChange={handleCheckboxChange}
											name="oldest"
										/>
									}
									label="Oldest"
								/>
								<FormControlLabel
									control={
										<Checkbox
											checked={checked === 'recentlyAdded'}
											onChange={handleCheckboxChange}
											name="recentlyAdded"
										/>
									}
									label="Recently added"
								/>
							</FormGroup>
						</Box>
						<Box flex="1" minWidth="50%">
							<FormGroup>
								<FormControlLabel
									control={
										<Checkbox
											checked={checked === 'difficulty'}
											onChange={handleCheckboxChange}
											name="difficulty"
										/>
									}
									label="Difficulty"
								/>
								<FormControlLabel
									control={
										<Checkbox
											checked={checked === 'liked'}
											onChange={handleCheckboxChange}
											name="liked"
										/>
									}
									label="Liked"
								/>
								<FormControlLabel
									disabled
									control={
										<Checkbox
											checked={checked === 'popularity'}
											onChange={handleCheckboxChange}
											name="popularity"
										/>
									}
									label="Popularity"
								/>
							</FormGroup>
						</Box>
					</Box>
				</DialogContent>
				<DialogActions>
					<Button onClick={handleClose}>Finish</Button>
				</DialogActions>
			</Dialog>
		</>
	);
}
