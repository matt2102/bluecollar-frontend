import { makeStyles, IconButton,Grid, Tooltip, Button } from "@material-ui/core"
import { useState } from "react"
import useBanner from "../../hooks/useBanner"
import NewsletterDialog from "../NewsletterDialog/NewsletterDialog"
import {Close} from "@material-ui/icons"
import { useSelector } from "react-redux"

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
  const [open, setModal] = useState(false)
  const item = {
    name: 'newsletterSubscribe',
    text: 'Subscribe to our Newsletter!',
    onClick: ()=>setModal(true)
  }
  const handleClose = () => {
    setModal(false)
    // markSeen(item.name)
  }
  const data = {
    emailOptIn: true
  }
  const items = [item]
  const bannerSet = new Set(banner)
  const toRender = items.filter(i => (
    !bannerSet.has(i.name)
  ))
  if(toRender.length === 0){
    return null
  }
  return(
    <>
    <Grid className={classes.root} justify="center" direction="row" wrap="nowrap" container>
      {toRender.map(i => {
        return(
          <div>
            <Button variant="text" onClick={i.onClick} className={classes.btn}>{i.text}</Button>
            <Tooltip title={"close"}>
              <IconButton onClick={()=>markSeen(i)}>
                <Close className={classes.icon}/>
              </IconButton>
            </Tooltip>
          </div>
        )
      })}


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