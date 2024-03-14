import { useState, useEffect } from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import MuiAppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import TextField from '@mui/material/TextField';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import Typography from '@mui/material/Typography';
import SendIcon from '@mui/icons-material/Send';

import { socket } from '@src/socket';
import MessageContainer from '@components/MessagesContainer';
import AppBar from '@components/AppBar';
import logo from '@assets/logo.png';

import '@styles/App.css';


function App() {
  const [isConnected, setIsConnected] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([])


  function handleSend(event) {
    console.log('sending...');
    event.preventDefault();
    setIsLoading(true);

    socket.emit('sendMessage', {
      date: Date.now(),
      content: message.trim()
    });
    setMessage("");
    console.log('...send succesfull');
    setIsLoading(false);
  }

  useEffect(() => {
    function onConnect() {
      setIsConnected(true);
      console.log('connected')
    }

    function onDisconnect() {
      setIsConnected(false);
      console.log('disconnected')
    }

    function onReceiveMessage(value) {
      setMessages(previous => [...previous, value]);
    }

    socket.on('connect', onConnect);
    socket.on('disconnect', onDisconnect);
    socket.on('receiveMessage', onReceiveMessage)
    socket.onAny((eventName, ...args) => {
      console.log("---", eventName, "fired with arguments", args, "by user", socket.id);
    });

    return () => {
      socket.off('connect', onConnect);
      socket.off('disconnect', onDisconnect);
      socket.off('receiveMessage', onReceiveMessage);
    };
  }, []);

  return (
    <>
      <CssBaseline/>
      {!isConnected ?
        <Container maxWidth="xxl" sx={{ textAlign: "center", py: 5 }}>
          <img src={logo} width={150} alt="logo" />
          <Typography variant="h6" component="div" sx={{ mb: 5 }}>
            Rapid Share
          </Typography>
          <Button onClick={connect}>Connect</Button>
        </Container>
        :
        <>
          <AppBar disconnect={disconnect} />
          <Toolbar/>
          <MessageContainer messages={messages} setMessages={setMessages} />
          <Toolbar/>
          <MuiAppBar position="fixed" color="background" sx={{ top: 'auto', bottom: 0 }}>
            <Toolbar>
              <TextField label="message"
                variant="outlined"
                fullWidth multiline maxRows={5}
                value={message}
                onChange={(e) => setMessage(e.target.value)}
              />
              <Tooltip title="Send">
                <IconButton aria-label="send" disabled={isLoading} onClick={handleSend}>
                  <SendIcon />
                </IconButton>
              </Tooltip>
            </Toolbar>
          </MuiAppBar>
        </>
      }
    </>
  )
}

export default App


function connect() {
  socket.connect();
}

function disconnect() {
  socket.disconnect();
}