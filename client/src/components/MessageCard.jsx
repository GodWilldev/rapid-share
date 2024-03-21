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
    let timeArray = d.toTimeString().split(' ')[0].split(':');

    return timeArray[0]+':'+timeArray[1];
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
    <Card sx={{ maxWidth: {xs:'100%', sm:'80%', lg:800}, minWidth:200, borderRadius:3, my:2, mx:{xs:0, sm:1, md:2}, width:'fit-content' }}>
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
        // title={name}
        subheader={parseDate(date)}
        sx={{m:0,p:1}}
      />
      <CardContent sx={{pt:0}}>
        <Typography variant="body1" color="text.primary" sx={{wordWrap:'break-word'}}>
          {content}
        </Typography>
      </CardContent>
    </Card>
  );
}
