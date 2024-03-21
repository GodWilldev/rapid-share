import MuiAppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import IconButton from '@mui/material/IconButton';
import useMediaQuery from '@mui/material/useMediaQuery';
import PowerSettingsNewIcon from '@mui/icons-material/PowerSettingsNew';

import { GitHubLink } from '@components/Footer';
import logo from '@assets/logo.png';

export default function AppBar({ disconnect, roomId }) {
	const matcheMd = useMediaQuery('(min-width:500px)');

	return (
		<MuiAppBar position="fixed" sx={{ px: 2 }} color='background'>
			<Toolbar disableGutters>
				<Tooltip title="Rapid Share">
					<img src={logo} width={50} alt="logo" />
				</Tooltip>
				{matcheMd && <Typography variant="h6" component="div">
					Rapid Share
				</Typography>}
				<Box sx={{ flexGrow: 1, textAlign: 'center' }}>
					<Typography variant="body1" component="div" >
						{roomId}
					</Typography>
				</Box>
				{matcheMd ?
					<Button onClick={disconnect}>Disconnect</Button>
					:
					<Tooltip title="Disconnect">
						<IconButton aria-label="disconnect" onClick={disconnect}>
							<PowerSettingsNewIcon color="primary" />
						</IconButton>
					</Tooltip>
				}
				<GitHubLink />
			</Toolbar>
		</MuiAppBar >
	);
}
