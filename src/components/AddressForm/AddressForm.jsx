import {Button, Grid, makeStyles} from "@material-ui/core"
import { maybe } from "../../misc"
import React from "react"
import AccountButton from "../AccountButton/AccountButton"
import StateSelector from "../StateSelector/StateSelector"
import AddressEditForm from "./form"


const UPDATE = "UPDATE"
const CREATE = "CREATE"

const getMode = (initialData) => {
  switch(initialData.id){
    case "":
      return CREATE
    default:
      return UPDATE
  }
}

const useStyles = makeStyles(theme => ({
  grid: {
    display: 'grid',
    gridTemplateColumns: "10px 1fr 10px",
    rowGap: 15
  },
  stateSelector: {
    gridColumn: 2
  },
  submitBtn: {
    gridColumn: 2,
    background: theme.palette.primary.main,
    height: 50,
    color: theme.palette.background.default,
    fontWeight: 400,
    fontSize: 20,
    textTransform: "none",
    borderRadius: 25,
    maxWidth: '50%',
    // margin: 'auto'
    marginLeft: '25%',
    '&:hover':{
      background: theme.palette.green
    },
    '&:disabled':{
      background: theme.palette.primary.dark,
      // cursor: 'not-allowed'
    }
  }
}))

export const AddressForm = (props) => {
  const {
    address,
    disabled,
    onSubmit
  } = props
  const initialData = {
    id: maybe(()=>address.id, ""),
    firstName: maybe(()=>address.firstName, ""),
    lastName: maybe(()=>address.lastName, ""),
    streetAddress1: maybe(()=>address.streetAddress1, ""),
    streetAddress2: maybe(()=>address.streetAddress2, ""),
    city: maybe(()=>address.city, ""),
    countryArea: maybe(()=>address.countryArea, ""),
    postalCode: maybe(()=>address.postalCode, ""),
  }
  const mode = getMode(initialData)

  const classes = useStyles()
  return(
    <AddressEditForm onSubmit={onSubmit} initialData={initialData}>
      {({data, change, submit, hasChanged, handlers}) => {
        return(
          <Grid className={classes.grid}>
            <AccountButton label="First Name" data={data} name={'firstName'} onChange={change} disabled={disabled}/>
            <AccountButton label="Last Name" data={data} name={'lastName'} onChange={change} disabled={disabled}/>
            <AccountButton label="Street Address 1" data={data} name={'streetAddress1'} onChange={change} disabled={disabled}/>
            <AccountButton label="Street Address 2" data={data} name={'streetAddress2'} onChange={change} disabled={disabled}/>
            <AccountButton label="City" data={data} name={'city'} onChange={change} disabled={disabled}/>
            <AccountButton label="Zipcode / Postal Code" data={data} name={'postalCode'} onChange={change} disabled={disabled}/>
            <StateSelector
              selected={data.countryArea}
              name={'countryArea'}
              onChange={handlers.selectState}
              disabled={disabled}
              className={classes.stateSelector}
              />
            <Button
            className={classes.submitBtn}
            onClick={submit}
            disabled={(disabled || !hasChanged)}
            >{mode===UPDATE?"Update Address":"Create New Address"}
            </Button>
          </Grid>
        )
      }}
    </AddressEditForm>
  )
}

export default AddressForm