import { Typography, Card, CardHeader, IconButton, makeStyles, Collapse, styled } from "@material-ui/core"
import DeleteIcon from '@material-ui/icons/Delete';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { maybe } from "../../misc"
import useAddress from "../../hooks/useAddress";
import { useState } from "react";
import AddressDialog from "../AddressDialog/AddressDialog";
import { CardDetails } from "./CardDetails";

const useStyles = makeStyles(theme => ({
  card: {
    background: theme.palette.secondary.light,
    width: '100%',
    height: '100%',
    // maxHeight: 300,
    maxWidth: 400,
    margin: 'auto'
  },
  header: {
    background: theme.palette.secondary.main,
  },
  title: {
    color: theme.palette.text.secondary
  },
  text: {
    fontSize: 18
  },
  expand: {
    margin: 'auto',
    fontSize: 40,
    fill: theme.palette.accent.yellow
  }
}))

const ExpandMore = styled((props) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme, expand }) => ({
  transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
  margin:'auto',
  marginLeft: 'auto',
  transition: theme.transitions.create('transform', {
    duration: theme.transitions.duration.shortest,
  }),
}));

export const AddressCard=(props)=>{
  const {
    address,
    num,
    title,
    onDelete,
    onSubmit,
    isChildOfCheckout
  } = props
  const addr = {
    id: maybe(()=>address.id, ""),
    firstName: maybe(()=>address.firstName, ""),
    lastName: maybe(()=>address.lastName, ""),
    streetAddress1: maybe(()=>address.streetAddress1, ""),
    streetAddress2: maybe(()=>address.streetAddress2, ""),
    city: maybe(()=>address.city, ""),
    countryArea: maybe(()=>address.countryArea, ""),
    postalCode: maybe(()=>address.postalCode, ""),
    isDefaultShippingAddress: maybe(() => address?.isDefaultShippingAddress, false),
    isDefaultBillingAddress: maybe(() => address?.isDefaultBillingAddress, false),
  }
  const classes = useStyles()
  const [open, setModal] = useState(false)
  const isExpanding = isChildOfCheckout
  const [expanded, setExpanded] = useState(false);

  const {setDefaultBilling, setDefaultShipping} = useAddress()
  const isDefaultShipping = address.isDefaultShippingAddress
  const isDefaultBilling = address.isDefaultBillingAddress
  function getTitle(){
    if(num){
      return `Address ${num}`
    }
    if(title){
      return title
    }
    return 'Address'
  }
  const addressTitle = getTitle()
  function submitWrapper(data){
    onSubmit(data)
    setModal(false)
  }
  return(
    <>
    <Card key={addr.id} className={classes.card} elevation={0}>
      <CardHeader
        className={classes.header}
        title={
          <div>
          <Typography variant="subtitle1" color="textSecondary">{addressTitle}</Typography>
          {isDefaultBilling?
            <Typography variant="body1" color="textSecondary">Default Billing Address</Typography>:null
          }
          {isDefaultShipping?
            <Typography variant="body1" color="textSecondary">Default Shipping Address</Typography>:null
          }
          </div>
        }
        action={
          <>
          {isChildOfCheckout?
          <ExpandMore
            expand={expanded}
            onClick={()=>setExpanded(!expanded)}
            aria-expanded={expanded}
            aria-label="show more"
           >
            <ExpandMoreIcon
             className={classes.expand}
            />
          </ExpandMore>
          :
          <IconButton onClick={()=>onDelete(addr.id)}>
            <DeleteIcon/>
          </IconButton>
          }
          </>
        }
      />
      {isExpanding?

      <Collapse in={expanded} timeout="auto" unmountOnExit>
        <CardDetails
            addr={addr}
            isDefaultBilling={isDefaultBilling}
            setDefaultBilling={setDefaultBilling}
            isDefaultShipping={isDefaultShipping}
            setDefaultShipping={setDefaultShipping}
            setModal={setModal}
        />
      </Collapse>
      :
      <CardDetails
        addr={addr}
        isDefaultBilling={isDefaultBilling}
        setDefaultBilling={setDefaultBilling}
        isDefaultShipping={isDefaultShipping}
        setDefaultShipping={setDefaultShipping}
        setModal={setModal}
      />
      }
    </Card>
    <AddressDialog
      address={addr}
      title={`Update ${addressTitle}`}
      open={open}
      onClose={()=>setModal(false)}
      disabled={false}
      onSubmit={submitWrapper}
    />
    </>
  )
}

export default AddressCard