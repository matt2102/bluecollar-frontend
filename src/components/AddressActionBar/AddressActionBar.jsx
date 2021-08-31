import { Button, makeStyles,Typography } from "@material-ui/core"
import AddressDialog from "../AddressDialog/AddressDialog"
import React from "react"

const useStyles = makeStyles(theme => ({
  root: {
    gridColumn: "1 / -1",
    display: "grid",
    gridTemplateColumns: "1fr 150px"
  },
  title: {
    fontSize: 36,
    color: theme.palette.text.main,
    // height: 100
  },
  button: {
    background: theme.palette.secondary.main,
    color: theme.palette.background.default,
    height: 50,
    borderRadius: 25,
    textTransform: "none",
    fontWeight: 600,
    fontSize: 18,
    // marginBottom: 0,
    "&:hover":{
      background: theme.palette.primary.main
    }
  }

}))

export const AddressActionBar = () => {
  const classes = useStyles()
  const [open, setModal] = React.useState(false)
  return(
    <>
    <div className={classes.root}>
      <Typography variant="subtitle1" className={classes.title}>My Addresses</Typography>
      <Button className={classes.button}
      onClick={()=>setModal(true)}
      >Add Address</Button>
    </div>
    <AddressDialog
      title={"Add New Address"}
      open={open}
      onClose={()=>setModal(false)}
      disabled={false}
    />
    </>
  )
}

export default AddressActionBar