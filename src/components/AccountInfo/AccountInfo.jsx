import { useMutation } from "@apollo/client"
import useMessages from "../../hooks/useMessages"
import useUser from "../../hooks/useUser"

import {
  Button,
  makeStyles,
  Typography
} from "@material-ui/core"

import { maybe } from "../../misc"

import AccountButton from "../AccountButton/AccountButton"
import Form from "../Form/Form"

import { customerUpdate } from "./mutations"
import { useUserQuery } from "./queries"

const useStyles = makeStyles(theme => ({
  root: {
    margin: 40,
    display: 'grid',
    gridTemplateColumns: '0.5fr minmax(400px, 600px) 1fr',
    gridTemplateRows: 'repeat(3, 125px)'
  },
  title: {
    gridColumn: "1 / span 3",
    fontWeight: 600,
    marginLeft: 0,
    color: theme.palette.text.main,
    fontSize: 28
  },
  submit: {
    gridColumn: "2",
    background: theme.palette.green,
    color: theme.palette.background.default,
    fontSize: 20,
    height: 50,
    borderRadius: 25,
    width: '100%',
    maxWidth: 200,
    textTransform: 'none',
    margin: 'auto',
    marginRight: 0,
    marginTop: 0,
    boxShadow: 'none',
    '&:hover': {
      background: theme.palette.primary.main
    }
  }

}))


export const AccountInfo = () => {
  const classes = useStyles()
  const {data, loading} = useUserQuery({})
  const {user} = useUser()
  const {addMessage} = useMessages()
  const handleComplete = () => {
    addMessage({messageType: "success", text: "Account Information Updated"})
  }
  const [updateCustomer] = useMutation(customerUpdate, {onCompleted: handleComplete})

  const initialData = maybe(() => data.me, {})
  const onSubmit = (submitData) => {
    updateCustomer({
      variables: {
        id: user.id,
        input:{
          firstName: submitData.firstName,
          lastName: submitData.lastName
        }

      }
    })
  }
  if(loading)return null
  return(
    <Form className={classes.root}
      onSubmit={onSubmit}
      initial={initialData}
    >
      {({data, change, submit, hasChanged}) => {
        return(
          <>
          <Typography variant="body1" className={classes.title}>Account Info</Typography>
          <AccountButton label="Email" data={data} name={'email'} onChange={change} disabled={true}/>
          <AccountButton label="First Name" data={data} name={'firstName'} onChange={change}/>
          <AccountButton label="Last Name" data={data} name={'lastName'} onChange={change}/>
          <Button
          variant="contained"
          disabled={!hasChanged}
          onClick={submit}
          className={classes.submit}>Update
          </Button>
          </>
        )
      }}</Form>


  )
}

export default AccountInfo