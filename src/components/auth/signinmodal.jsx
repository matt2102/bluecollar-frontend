import {
  makeStyles,
  Dialog,
  DialogTitle,
  DialogContent,
  IconButton,
  Button} from "@material-ui/core"
import { SignInForm } from "./SignInForm"
import {Close} from "@material-ui/icons"
import { useState } from "react"
import { ForgotPasswordForm } from "./ForgotPasswordForm"

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

const SIGN_IN = "SIGN_IN"
const FORGOT_PASSWORD = "FORGOT_PASSWORD"
const CREATE_ACCOUNT = "CREATE_ACCOUNT"

export const SignInModal = (props) => {
  const {
    open,
    disabled,
    onClose
  } = props
  const classes = useStyles()
  const [view, setView] = useState(SIGN_IN)
  const btns = [
    {
      view: SIGN_IN,
      text: "Sign In",
    },
    {
      view: FORGOT_PASSWORD,
      text: "Forgot Password",
    },
    {
      view: CREATE_ACCOUNT,
      text: "Create Account",
    },
  ]
  const activeButton = btns.filter(b => (b.view === view))[0]
  return(
    <Dialog
      aria-labelledby="sign-in-modal"
      aria-describedby="sign-in-modal-description"
      open={open}
      onClose={onClose}
      className={classes.root}
      >
      <DialogTitle id="sign-form-dialog-title" className={classes.title}>
      {activeButton.text}
        <IconButton onClick={onClose} className={classes.closeBtn}>
          <Close/>
        </IconButton>
      </DialogTitle>
      <DialogContent>
        {view === SIGN_IN?
        <SignInForm
          disabled={disabled}
          onClose={onClose}
        />:null}
        {view === FORGOT_PASSWORD?
        <ForgotPasswordForm
          disabled={disabled}
          onClose={onClose}
        />
        :null}
        {btns.map(b => {
          if(b.view === view){
            return null
          }
          return(
            <Button key={b.view} onClick={()=>setView(b.view)}>{b.text}</Button>
          )
        })}
      </DialogContent>

    </Dialog>
  )
}