import { useEndpoint } from "../../hooks/useEndpoint"
import {Button, Grid, makeStyles} from "@material-ui/core"
import NewsletterEditForm from "./form"
import AccountButton from "../AccountButton/AccountButton"
import { maybe } from "../../misc"

const useStyles = makeStyles(theme => ({
  grid: {
    display: 'grid',
    gridTemplateColumns: "10px 1fr 10px",
    rowGap: 15
  },
  submitBtn: {
    gridColumn: 2,
    background: theme.palette.primary.main,
    color: theme.palette.background.default,
    fontWeight: 400,
    textTransform: "none",
    maxWidth: '50%',
    marginLeft: '25%',
    '&:hover':{
      background: theme.palette.green
    },
    '&:disabled':{
      background: theme.palette.background.main,
    },
    [theme.breakpoints.down("md")]: {
      height: 40,
      borderRadius: 20,
    },
    [theme.breakpoints.down("sm")]: {
      height: 32,
      fontSize: 18,
      borderRadius: 16,
    },
    [theme.breakpoints.up("lg")]: {
      height: 50,
      borderRadius: 25,
      fontSize: 20,
    }
  }
}))


export const NewsletterForm = (props) => {
  const {
    data,
    disabled,
    onClose
  } = props
  const classes = useStyles()
  const initialData = {
    id: maybe(()=>data.id, ""),
    firstName: maybe(()=>data.firstName, ""),
    lastName: maybe(()=>data.lastName, ""),
    email: maybe(()=>data.email, ""),
    emailOptIn: maybe(()=>data.emailOptIn, true),
  }
  const {subscribeToNewsletter, success} = useEndpoint()
  if(success){
    onClose()
  }

  const newsletterSubscribe = (submitData) => {
    subscribeToNewsletter(submitData)
  }
  return(
    <NewsletterEditForm onSubmit={newsletterSubscribe} initialData={initialData}>
      {({data, change, submit, hasChanged}) => {
        return(
          <Grid className={classes.grid}>
            <AccountButton label="First Name" data={data} name={'firstName'} onChange={change} disabled={disabled}/>
            <AccountButton label="Last Name" data={data} name={'lastName'} onChange={change} disabled={disabled}/>
            <AccountButton label="Email" data={data} name={'email'} onChange={change} disabled={disabled}/>
            <Button
            className={classes.submitBtn}
            onClick={submit}
            disabled={(disabled || !hasChanged)}
            >Subscribe
            </Button>
          </Grid>
        )
      }}
    </NewsletterEditForm>
  )
}

export default NewsletterForm