import React from "react"
import CloseIcon from '@material-ui/icons/Close';
import IconButton from '@material-ui/core/IconButton';
import { CardContent, makeStyles } from "@material-ui/core";
import Typography from '@material-ui/core/Typography';
// import {}
// import { Icon } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
    root: {
      width: '200px',
      backgroundColor: "rgba(213, 227, 227, 0.8)"
    },
    messageHeader: {
      display: 'flex',
      flexFlow: "row nowrap",
      width: 180,
      justifyContent: "space-between",
      margin: "auto",
      borderBottom: "1px solid gray"
    },
    closeIcon: {
      marginRight: '0',
      marginTop: '0',
      fontSize: '16px',
      padding: '0'
    },
    title: {
      width: "100%",
      margin: 'auto',
      marginLeft: "0",
      marginBottom: "0",
      fontSize: '18px'
    }
  }),
  {name: "Message"}
)

export const Message = (props) => {
  const {
    message,
    onClick
  } = props
  const classes = useStyles()
  const [seconds, setSeconds] = React.useState(3600)
  React.useEffect(() => {
    const date = new Date()
    if(date.getTime() >= message.expires){
      onClick(message.id)
      clearTimeout()
    }
    if(seconds > 0){
      setTimeout(() => setSeconds(seconds - 1), 1000);
    } else {
      onClick(message.id)
      clearTimeout()
    }
  })
  return(
    <div key={message.id} className={classes.root}>
      <div className={classes.messageHeader}>
      <Typography
      variant="subtitle2"
      color="textPrimary"
      component="p"
      className={classes.title}
      >{message.messageType}</Typography>
      <IconButton onClick={()=>onClick(message.id)} >
          <CloseIcon className={classes.closeIcon}/>
      </IconButton>
      </div>
      <CardContent>
        <Typography variant="body2" color="textSecondary" component="p">
          {message.text}
        </Typography>
      </CardContent>
    </div>
  )
}
