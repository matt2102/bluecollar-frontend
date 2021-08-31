import { makeStyles, Modal,Dialog, DialogTitle, DialogContent,Typography } from "@material-ui/core"
import { IconButton } from "@material-ui/core"
import { SignInForm } from "./signinform"
import {Close} from "@material-ui/icons"
// import Typography from "@material-ui/core/Typography"

const useStyles = makeStyles(theme => ({
  root: {
    width: "100%",
    margin: 'auto',
  },
  closeBtn: {
    width: '50px',
    height: "auto",
    position: 'absolute',
    right: theme.spacing(1),
    top: theme.spacing(1),
  },
  title: {
    color: theme.palette.green
  }
}))

export const SignInModal = (props) => {
  const {
    open,
    disabled,
    onClose
  } = props
  const classes = useStyles()
  return(
    <Dialog
      aria-labelledby="sign-in-modal"
      aria-describedby="sign-in-modal-description"
      open={open}
      onClose={onClose}
      className={classes.root}
      >
      <DialogTitle id="sign-form-dialog-title">
        <Typography variant="h3"  className={classes.title}>Sign In</Typography>
        <IconButton onClick={onClose} className={classes.closeBtn}>
          <Close/>
        </IconButton>
      </DialogTitle>
      <DialogContent>
      <SignInForm
        disabled={disabled}
        onClose={onClose}
        />
      </DialogContent>

    </Dialog>
  )
}