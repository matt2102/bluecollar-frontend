import { Dialog,DialogContent,DialogTitle,makeStyles, Typography,IconButton } from "@material-ui/core"
// import { IconButton } from "material-ui"
import { Close } from "@material-ui/icons"
import NewsletterForm from "../NewsletterForm/NewsletterForm"

const useStyles = makeStyles(theme => ({
  root: {
    margin: 'auto'
  },
  dialogTitle: {
    height: 100,
  },
  title: {
    fontSize: 30,
    color: theme.palette.text.main,
    margin: 'auto',
    marginBottom: 0
  },
  closeBtn: {
    width: '50px',
    height: "auto",
    position: 'absolute',
    right: theme.spacing(1),
    top: theme.spacing(1),
  }
}),{name:"NewsletterDialog"})


export const NewsletterDialog = (props) => {
  const {
    data,
    title,
    open,
    onClose,
    disabled
  } = props
  const classes = useStyles()
  return(
    <Dialog
    aria-labelledby="newsletter-modal"
    aria-describedby="create-update-newsletter-settings"
    open={open}
    onClose={onClose}
    className={classes.root}
    fullWidth={true}
    maxWidth={"sm"}
    >
      <DialogTitle id="newsletter-modal-title" className={classes.dialogTitle}>
        <Typography className={classes.title}>{title?title:"Newsletter Sign Up"}</Typography>
        <IconButton onClick={onClose} className={classes.closeBtn}>
          <Close/>
        </IconButton>
      </DialogTitle>
      <DialogContent>
        <NewsletterForm
          disabled={disabled}
          data={data}
          onClose={onClose}
          />
      </DialogContent>
    </Dialog>
  )
}

export default NewsletterDialog