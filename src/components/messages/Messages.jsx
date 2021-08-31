import { Grid, makeStyles } from "@material-ui/core"
import React from "react"
import { useSelector } from "react-redux"
import useMessages from "../../hooks/useMessages"
import useWindowDimensions from "../../hooks/useWindowDimesions"
import {Message} from "./Message"

let screenWidth = 0;

const useStyles = makeStyles(theme => ({
  root: {
    display: 'grid',
    gridTemplateColumns: '200px',
    rowGap: '10px',
    position: 'fixed',
    top: 10,
    left: screenWidth - 210,
    zIndex: 50

  }
}),
{name: "Messages"})

const Messages = () => {
  const messages = useSelector(state => state?.messages?.messages)
  const {width} = useWindowDimensions()
  screenWidth = width
  const {deleteMessage} = useMessages()
  const classes = useStyles("")
  if(messages.length > 0){
    return(
      <Grid className={classes.root}>
        {messages.map(
          message => {
            return <Message message={message} onClick={deleteMessage}/>
          }
        )}
      </Grid>
    )
  }
  return null
}

export default Messages