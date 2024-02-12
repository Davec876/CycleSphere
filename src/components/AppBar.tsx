'use client';

import { type MouseEvent, useState } from 'react';
import Link from 'next/link';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';

const pages = ['Contact', 'FAQ'];
const settings = ['Profile', 'Logout'];

function ResponsiveAppBar() {
	const { data: session, status: sessionStatus } = useSession();

	const router = useRouter();

	const [anchorElNav, setAnchorElNav] = useState<null | HTMLElement>(null);
	const [anchorElUser, setAnchorElUser] = useState<null | HTMLElement>(null);

	const handleOpenNavMenu = (event: MouseEvent<HTMLElement>) => {
		setAnchorElNav(event.currentTarget);
	};
	const handleOpenUserMenu = (event: MouseEvent<HTMLElement>) => {
		setAnchorElUser(event.currentTarget);
	};

	const handleCloseNavMenu = () => {
		setAnchorElNav(null);
	};

	const handleCloseUserMenu = (setting: string) => {
		switch (setting) {
			case 'Logout':
				router.push('/api/auth/signout?callbackUrl=/');
				break;
			case 'Profile':
				router.push('/profile');
				break;
			default:
				break;
		}
		setAnchorElUser(null);
	};

	function parsePageNameToLink(pageName: string) {
		return pageName.replace(' ', '-').toLowerCase();
	}

	return (
		<AppBar position="static">
			<Container maxWidth="xl">
				<Toolbar disableGutters>
					<Typography
						variant="h6"
						noWrap
						component="div"
						sx={{
							mr: 2,
							display: { xs: 'none', md: 'flex' },
							fontFamily: 'monospace',
							fontWeight: 700,
							letterSpacing: '.3rem',
							color: 'inherit',
							textDecoration: 'none',
						}}
					>
						<Link href="/" style={{ textDecoration: 'none', color: 'inherit' }}>
							CSCI 4177
						</Link>
					</Typography>
					<Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
						<IconButton
							size="large"
							aria-controls="menu-appbar"
							aria-haspopup="true"
							onClick={handleOpenNavMenu}
							color="inherit"
						>
							<MenuIcon />
						</IconButton>
						<Menu
							id="menu-appbar"
							anchorEl={anchorElNav}
							anchorOrigin={{
								vertical: 'bottom',
								horizontal: 'left',
							}}
							keepMounted
							transformOrigin={{
								vertical: 'top',
								horizontal: 'left',
							}}
							open={Boolean(anchorElNav)}
							onClose={handleCloseNavMenu}
							sx={{
								display: { xs: 'block', md: 'none' },
							}}
						>
							{pages.map((pageName) => (
								<Link
									key={pageName}
									href={`/${parsePageNameToLink(pageName)}`}
									style={{ textDecoration: 'none' }}
								>
									<MenuItem
										key={pageName}
										onClick={handleCloseNavMenu}
										sx={{
											color: 'white',
										}}
									>
										<Typography textAlign="center">{pageName}</Typography>
									</MenuItem>
								</Link>
							))}
						</Menu>
					</Box>
					<Typography
						variant="h5"
						noWrap
						component="div"
						sx={{
							mr: 2,
							display: { xs: 'flex', md: 'none' },
							flexGrow: 1,
							fontFamily: 'monospace',
							fontWeight: 700,
							letterSpacing: '.3rem',
							color: 'inherit',
							textDecoration: 'none',
						}}
					>
						<Link href="/" style={{ textDecoration: 'none', color: 'inherit' }}>
							CSCI 4177
						</Link>
					</Typography>
					<Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
						{pages.map((pageName) => (
							<Link
								key={pageName}
								href={`/${parsePageNameToLink(pageName)}`}
								style={{ textDecoration: 'none' }}
							>
								<Button
									key={pageName}
									onClick={handleCloseNavMenu}
									sx={{
										my: 2,
										color: 'white',
										display: 'block',
									}}
								>
									{pageName}
								</Button>
							</Link>
						))}
					</Box>

					<Box sx={{ flexGrow: 0 }}>
						{/* Display nothing if the session is loading, otherwise display menu items for logged in user, or login button for unauthenticated user */}
						{sessionStatus === 'loading' ? null : session?.user ? (
							<Tooltip title="Open settings">
								<IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
									<Avatar alt="Current user" />
								</IconButton>
							</Tooltip>
						) : (
							<Button href="/api/auth/signin" color="inherit">
								Login
							</Button>
						)}
						<Menu
							sx={{ mt: '45px' }}
							id="menu-appbar"
							anchorEl={anchorElUser}
							anchorOrigin={{
								vertical: 'top',
								horizontal: 'right',
							}}
							keepMounted
							transformOrigin={{
								vertical: 'top',
								horizontal: 'right',
							}}
							open={Boolean(anchorElUser)}
							onClose={handleCloseUserMenu}
						>
							{settings.map((setting) =>
								setting === 'Logout' ? (
									<MenuItem
										key={setting}
										onClick={() => handleCloseUserMenu(setting)}
									>
										<Typography color="red" textAlign="center">
											{setting}
										</Typography>
									</MenuItem>
								) : (
									<MenuItem
										key={setting}
										onClick={() => handleCloseUserMenu(setting)}
									>
										<Typography textAlign="center">{setting}</Typography>
									</MenuItem>
								)
							)}
						</Menu>
					</Box>
				</Toolbar>
			</Container>
		</AppBar>
	);
}
export default ResponsiveAppBar;
