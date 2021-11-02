import { Grid, makeStyles, TextField, Button,Typography } from "@material-ui/core"
import { parse } from "qs"
import React, { useState } from "react"
import { useLocation } from "react-router"
import useMessages from "../../hooks/useMessages"
import useNavigator from "../../hooks/useNavigator"
import useUser from "../../hooks/useUser"
import { accountPath } from "../../views/Account/urls"
import { homePath } from "../../views/Home/urls"

const useStyles = makeStyles(theme => ({
  root: {
    width: "100%",
    maxWidth: 800,
    margin: "auto",
    marginBottom: '80vh'
  },
  form: {
    display: "grid",
    gridTemplateColumns: '1fr',
    rowGap: theme.spacing(2),
    marginTop: theme.spacing(4)
  },
  formSubmit: {
    background: theme.palette.secondary.main,
    color: theme.palette.background.default,
    '&:hover': {
      background: theme.palette.green
    }
  }

}))

export const PasswordReset = () => {
  const location = useLocation()
  const navigator = useNavigator()
  const qs = parse(location.search.substr(1))
  const [disabled, setDisabled] = useState(false)
  const classes = useStyles("")
  const [formData, setFormData] = React.useState({
    confirmPassword: "",
    password: ""
  })
  const {passwordSet} = useUser()
  const {addMessage} = useMessages()

  const checkPassword = () => {
    if(formData.confirmPassword !== formData.password){
      addMessage({
        text:"Passwords do not match",
        messageType: "error"
      })
      return false
    }
    if(formData.password.length < 8){
      addMessage({
        text:"Password must be longer than 8 Characters",
        messageType: "error"
      })
      return false
    }
    const strongRegex = new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})");
    if(!strongRegex.test(formData.password)){
      addMessage({
        text:"Password does not meet complexity requirements",
        messageType: "error"
      })
      return false
    }
    setDisabled(false)
    return true
  }

  const onChange = (prop) => (event) => {
    setFormData({ ...formData, [prop]: event.target.value})
  }
  if(!qs.email || !qs.token){
    navigator(homePath)
  }
  const onSubmit = () => {
    if(checkPassword()){
      passwordSet({
        email: qs.email,
        token: qs.token,
        password: formData.password
      })
      navigator(accountPath)
    }
  }
  return(
  <Grid className={classes.root}>
    <Typography variant="h4" color="secondary">Reset Password</Typography>
    <form onSubmit={onSubmit} className={classes.form}>
      <TextField
          label="Password"
          variant="outlined"
          placeholder="Password"
          autoComplete="password"
          type="password"
          onChange={onChange("password")}
          fullWidth={true}
        />
      <TextField
          label="Confirm Password"
          variant="outlined"
          placeholder="Confirm Password"
          autoComplete="password"
          type="password"
          onChange={onChange("confirmPassword")}
          fullWidth={true}
        />
      <Button
      // className={classes.formSubmit}
      onClick={onSubmit}
      variant="containedPrimary"
      disabled={disabled}
      >Reset Password</Button>
    </form>
  </Grid>
  )
}

export default PasswordReset