import { makeStyles, IconButton,Grid, Tooltip, Button } from "@material-ui/core"
import { useState } from "react"
import useBanner from "../../hooks/useBanner"
import NewsletterDialog from "../NewsletterDialog/NewsletterDialog"
import {Close} from "@material-ui/icons"
import { useSelector } from "react-redux"
import { useEffect } from "react"

const useStyles = makeStyles(theme => ({
  root: {
    width: '100%',
    height: 50,
    background: theme.palette.green
  },
  btn: {
    color: theme.palette.secondary.main,
    padding: 2,
    margin: 0,
    fontFamily: 'Roboto',
    fontSize: '1.2em',
    textTransform: 'none',
    '&:hover': {
      background: 'none',
      color: theme.palette.secondary.main,
      'text-decoration': 'underline'
    }
  },
  icon: {
    color: theme.palette.secondary.main,
    // '&:hover': {

    // }
  }
})
)

export const Banner= () => {
  const classes = useStyles()
  const {markSeen} = useBanner()
  const banner = useSelector(state => state.banner.banner)
  const seconds = 7
  const [timeLeft, setTimeLeft] = useState(seconds);
  const [open, setModal] = useState(false)
  const items = [
    {
    name: 'newsletterSubscribe',
    text: 'Subscribe to our Newsletter!',
    onClick: ()=>setModal(true)
    },
    {
      name: "facebookJoin",
      text: "Join our Facebook Group!",
      onClick: ()=>window.open("https://www.facebook.com/groups/496763804008415")
    }
  ]
  const handleClose = () => {
    setModal(false)
    // markSeen(item.name)
  }
  const data = {
    emailOptIn: true
  }
  // const items = [item]
  const bannerSet = new Set(banner)
  const toRender = items.filter(i => (
    !bannerSet.has(i.name)
  ))
  const [visible, setVisible] = useState({...toRender[0], index: 0})
  useEffect(() => {
    if (!timeLeft){


      if(visible.index + 1 >= toRender.length){
        // restart loop
        setVisible({...toRender[0], index: 0})
      } else {
        const nextIndex = visible.index + 1
        setVisible({...toRender[nextIndex], index: nextIndex})
      }
      setTimeLeft(seconds)
    };

    // save intervalId to clear the interval when the
    // component re-renders
    const intervalId = setInterval(() => {
      setTimeLeft(timeLeft - 1);
    }, 1000);

    // clear interval on re-render to avoid memory leaks
    return () => clearInterval(intervalId);

  }, [timeLeft, toRender, visible]);

  if(toRender.length === 0){
    return null
  }
  return(
    <>
    <Grid className={classes.root} justify="center" direction="row" wrap="nowrap" container>
          <div>
            <Button variant="text" onClick={visible.onClick} className={classes.btn}>{visible.text}</Button>
            <Tooltip title={"close"}>
              <IconButton onClick={()=>markSeen(visible)}>
                <Close className={classes.icon}/>
              </IconButton>
            </Tooltip>
          </div>
    </Grid>
    <NewsletterDialog
      data = {data}
      title = {"Subscribe"}
      open = {open}
      onClose = {handleClose}
      disabled = {false}
      />
    </>
  )
}

export default Banner