import { useState, useEffect } from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import MuiAppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import TextField from '@mui/material/TextField';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import Typography from '@mui/material/Typography';
import SendIcon from '@mui/icons-material/Send';

import { v4 as uuidv4 } from 'uuid';
import { socket } from '@src/socket';
import MessageContainer from '@components/MessagesContainer';
import AppBar from '@components/AppBar';
import Footer from '@components/Footer';
import logo from '@assets/logo.png';

import '@styles/App.css';


function App() {
  const [isConnected, setIsConnected] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const [room, setRoom] = useState("public-room");


  function handleSend(event) {
    console.log('sending...');
    event.preventDefault();
    setIsLoading(true);
    let value = message.trim();
    if (value === "") {
      alert("Enter a valid message! 🤨");
    } else {
      socket.emit('sendMessage', {
        date: Date.now(),
        content: value
      }, room, () => {
        setMessage("");
        console.log('...send succesfull');
        setIsLoading(false);
      });
    }
  }

  function handleCreateRoom(event) {
    //generete a unique id of format xxxxxxxx-xxxx
    //Due to compromise between security and user experience
    let roomId = uuidv4().split('-')[0] + '-' + uuidv4().split('-')[1];
    setRoom(roomId);
    connect(roomId);
  }

  //join a room after connection
  useEffect(() => {
    if (isConnected == true) {
      socket.emit('join_request', room, () => {
        console.log('enter room', room)
      });
    }
  }, [isConnected])

  useEffect(() => {
    function onConnect() {
      setIsConnected(true);
      console.log('connected')
    }

    function onDisconnect() {
      setMessages([]);
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
      <CssBaseline />
      {!isConnected ?
        <Container maxWidth="xxl" component="main" sx={{ textAlign: "center", py: 5 }}>
          <img src={logo} width={150} alt="logo" />
          <Typography variant="h6" component="p" sx={{ mb: 5 }}>
            Rapid Share
          </Typography>
          <Tooltip title="Create a new room with a secure id">
            <Button variant="contained" onClick={handleCreateRoom} sx={{ mb: 5 }}>New room</Button>
          </Tooltip>
          <Box sx={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          }}>
            <TextField label="Room's id"
              variant="outlined"
              value={room}
              onChange={(e) => setRoom(e.target.value)}
              sx={{mr:4}}
            />
            <Tooltip title="Join an room given the id">
              <Button variant="text" onClick={() => connect(room)}>Join room</Button>
            </Tooltip>
          </Box>
          <Footer />
        </Container>
        :
        <>
          <AppBar disconnect={disconnect} roomId={room} />
          <Toolbar />
          <MessageContainer messages={messages} setMessages={setMessages} />
          <Toolbar />
          <MuiAppBar position="fixed" color="background" sx={{ top: 'auto', bottom: 0 }}>
            <Toolbar>
              <TextField label="Message"
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


function connect(roomId) {
  if (roomId.trim() === "") {
    alert("Enter a valid room Id! 🤨");
  } else {
    socket.connect();
  }
}

function disconnect() {
  socket.disconnect();
}