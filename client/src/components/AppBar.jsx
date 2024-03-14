import MuiAppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';

import logo from '@assets/logo.png';

export default function AppBar({ disconnect }) {
	return (
		<Box sx={{ flexGrow: 1 }}>
			<MuiAppBar position="fixed" sx={{px:2}} color='background'>
				<Toolbar disableGutters>
					<img src={logo} width={50} alt="logo"/>
					<Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
						Rapid Share
					</Typography>
					<Button onClick={disconnect}>Disconnect</Button>
				</Toolbar>
			</MuiAppBar>
		</Box>
	);
}
