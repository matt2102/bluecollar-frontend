import { Dialog, DialogContent, DialogTitle, IconButton,Typography,makeStyles } from "@material-ui/core"
import { Close } from "@material-ui/icons"
import AddressForm from "../AddressForm"

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
}),{name:"AddressDialog"})

export const AddressDialog = (props) => {
  const {
    address,
    title,
    open,
    onClose,
    disabled,
    onSubmit
  } = props
  const classes = useStyles()
  return(
    <Dialog
      aria-labelledby="address-modal"
      aria-describedby="create-update-addresses"
      open={open}
      onClose={onClose}
      className={classes.root}
      fullWidth={true}
      maxWidth={"sm"}
    >
      <DialogTitle id="address-modal-title" className={classes.dialogTitle}>
        <Typography className={classes.title}>{title?title:"Create/Update Address"}</Typography>
        <IconButton onClick={onClose} className={classes.closeBtn}>
          <Close/>
        </IconButton>
      </DialogTitle>
      <DialogContent>
        <AddressForm
          disabled={disabled}
          address={address}
          onSubmit={onSubmit}/>
      </DialogContent>
    </Dialog>
  )
}

export default AddressDialog