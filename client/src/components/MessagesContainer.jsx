import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import RefreshIcon from '@mui/icons-material/Refresh';
import MessageCard from '@components/MessageCard';
import Tooltip from '@mui/material/Tooltip';
import Grid from '@mui/material/Grid';



export default function MessageContainer({ messages, setMessages }) {

  function msgIsFromMe(msg) {
    return (msg.name === 'Me');
  }

  return (
    <Container id="messages-container" maxWidth='xl' component="main" sx={{
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'space-between',
      alignItems: 'flex-start',
      position: 'relative',
      pt: 4,
      height: '100%',
      mb: 0
    }}>
      <Box sx={{ position: 'absolute', top: 0, right: 0 }}>
        <Tooltip title="Clear">
          <IconButton aria-label="refresh" onClick={() => setMessages([])}>
            <RefreshIcon />
          </IconButton>
        </Tooltip>
      </Box>
      <Grid container direction="column" wrap="nowrap">
        {messages.map((msg, idx) => (
          <Grid item key={msg.name + idx} xs={12} container justifyContent={(msgIsFromMe(msg)) ? 'end' : 'start'} >
            <MessageCard name={msg.name} date={msg.date} content={msg.content} userId={msg.userId} />
          </Grid>
        ))}
      </Grid>
    </Container>
  )
}
