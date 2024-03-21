import MuiAppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import Typography from '@mui/material/Typography';
import Link from '@mui/material/Link';
import Divider from '@mui/material/Divider';

import GitHubIcon from '@mui/icons-material/GitHub';

const githubLink = "https://github.com/GodWilldev";

export default function Footer() {
    return (
        <MuiAppBar position="fixed" elevation={0} color="transparent" sx={{ top: 'auto', bottom: 0 }} component="div">
            <Divider />
            <Toolbar sx={{ m: 'auto' }}>
                <Typography variant="caption" color="text.secondary" align="center" >
                    &copy; {'By '}
                    <Link href={githubLink}>
                        GodWilldev
                    </Link>
                </Typography>
                <GitHubLink />
            </Toolbar>
        </MuiAppBar>

    );
}

export function GitHubLink() {
    return (
        <Tooltip title="Source Code">
            <IconButton aria-label="github" onClick={() => {
                window.open(githubLink+"/rapid-share", "_blank")
            }}>
                <GitHubIcon />
            </IconButton>
        </Tooltip>
    )
}