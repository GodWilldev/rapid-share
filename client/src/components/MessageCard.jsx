import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import Typography from '@mui/material/Typography';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';


export default function MessageCard({name, date, content, userId}) {

  function handleCopy(){
    try {
      navigator.clipboard.writeText(content);
      alert('Copy successful 👌!');
    } catch(err) {
        alert('An error occurs when trying to copy 😐!');
        console.log('err', err)
    }
  }

  function parseDate(date){
    const d = new Date(date)
    // return d.getHours()+':'+d.getMinutes()+' '+d.getDay()+' '+d.getMonth()+' '+d.getFullYear();
    let timeArray = d.toTimeString().split(' ')[0].split(':');
    return timeArray[0]+':'+timeArray[0];
  }

  function stringToColor(string) {
    let hash = 0;
    let i;
  
    /* eslint-disable no-bitwise */
    for (i = 0; i < string.length; i += 1) {
      hash = string.charCodeAt(i) + ((hash << 5) - hash);
    }
  
    let color = '#';
  
    for (i = 0; i < 3; i += 1) {
      const value = (hash >> (i * 8)) & 0xff;
      color += `00${value.toString(16)}`.slice(-2);
    }
    /* eslint-enable no-bitwise */
  
    return color;
  }
  

  return (
    <Card sx={{ maxWidth: 545, borderRadius:3, margin:2 }}>
      <CardHeader
        avatar={
          <Avatar sx={{bgcolor:stringToColor(userId)}}>
          </Avatar>
        }
        action={
          <Tooltip title="Copy">
            <IconButton aria-label="copy" onClick={handleCopy}>
              <ContentCopyIcon />
            </IconButton>
          </Tooltip>
        }
        title={name}
        subheader={parseDate(date)}
      />
      <CardContent>
        <Typography variant="body1" color="text.primary">
          {content}
        </Typography>
      </CardContent>
    </Card>
  );
}
