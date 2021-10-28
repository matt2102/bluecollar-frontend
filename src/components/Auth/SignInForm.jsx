import React from "react"
import { Button, TextField } from "@material-ui/core"
import useUser from "../../hooks/useUser"
import { makeStyles } from "@material-ui/core";

const useStyles = makeStyles(theme => ({
  root: {
    width: "100%",
    margin: "auto"
  },
  form: {
    display: "grid",
    gridTemplateColumns: '1fr',
    rowGap: '10px'
  },
  formSubmit: {
    background: theme.palette.primary.main,
    color: theme.palette.background.default,
    '&:hover': {
      background: theme.palette.green
    }
  }

}))

export const SignInForm = (props) => {
  const {
    disabled,
    onClose
  } = props
  const {signIn} = useUser()
  const classes = useStyles("")
  const [formData, setFormData] = React.useState({
    email: "",
    password: ""
  })
  const onChange = (prop) => (event) => {
    setFormData({ ...formData, [prop]: event.target.value})
  }
  const onSubmit = () => {
    signIn(formData)
    onClose()

  }
  return(
    <div className={classes.root}>
    <form onSubmit={onSubmit} className={classes.form}>
      <TextField
        className={classes.formField}
        variant="outlined"
        autoComplete="email"
        label="email"
        placeholder="Email"
        type="email"
        onChange={onChange("email")}
        disabled={disabled}
        fullWidth={true}
      />

      <TextField
        label="password"
        variant="outlined"
        placeholder="Password"
        autoComplete="password"
        type="password"
        onChange={onChange("password")}
        disabled={disabled}
        fullWidth={true}
      />
      <Button className={classes.formSubmit} onClick={onSubmit}>Sign In</Button>
    </form>

    </div>
  )
}