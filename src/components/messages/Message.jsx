import React from "react"
import CloseIcon from '@material-ui/icons/Close';
import IconButton from '@material-ui/core/IconButton';
import { Grid, makeStyles } from "@material-ui/core";
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles(theme => ({
    root: {
      width: '100%',
      backgroundColor: theme.palette.primary.main,
      display: 'grid',
      height: '100%',
      minHeight: 80,
      gridTemplateColumns: '1fr 30px',
      gridTemplateRows: "30px auto",
      borderLeft: `8px solid ${theme.palette.green}`,
      borderRadius: 8,
    },
    iconButton: {
      gridColumn: 2,
      gridRow: 1,
    },
    closeIcon: {
      marginRight: '0',
      marginTop: '0',
      fontSize: '16px',
      padding: '0'
    },
    message: {
      gridColumn: '1 / -1',
      gridRow: 2,
      marginTop: 0,
      paddingTop: 0,
      marginLeft: 10,
      paddingBottom: 10,
      fontSize: 16,
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
    <Grid key={message.id} className={classes.root}>
      <IconButton onClick={()=>onClick(message.id)} className={classes.iconButton}>
          <CloseIcon className={classes.closeIcon}/>
      </IconButton>
        <Typography variant="body2" color="textSecondary" component="p"
        className={classes.message}>
          {message.text}
        </Typography>
    </Grid>
  )
}
