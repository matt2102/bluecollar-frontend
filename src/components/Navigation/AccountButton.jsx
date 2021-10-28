import {
  Button,
  Card,
  CardActionArea,
  CardMedia,
  IconButton,
} from "@material-ui/core"

import LogoutIcon from "../../assets/icons/Logout_300x300.webp"
import CartIcon from "../../assets/icons/cart.png"

import { PersonOutlineOutlined } from "@material-ui/icons"


const MobileSignedIn = ({onClick, classes}) => {
  return(
    <IconButton onClick={onClick}>
      <PersonOutlineOutlined className={classes.accountIcon}/>
    </IconButton>
  )
}
const LaptopSignedIn = ({onClick, classes}) => {
  return(
  <Button variant="containedPrimary"
  onClick={onClick}>
    My Account
  </Button>
  )
}

const LaptopGuest = ({onClick, classes}) => {
  return(
  <Button variant="containedPrimary"
    onClick={onClick}>
    Login
  </Button>
  )
}

const MobileGuest = ({onClick, classes}) => {
  return(
    <IconButton onClick={onClick}>
      <PersonOutlineOutlined className={classes.accountIcon}/>
    </IconButton>
  )
}

const CartButton = ({onClick, classes}) => {
  return(
  <Card elevation={0} className={classes.cartCard}>
    <CardActionArea onClick = {onClick}>
      <CardMedia
      component={"img"}
      className={classes.cartIcon}
      src={CartIcon}/>
    </CardActionArea>
  </Card>
  )
}

const LogoutButton = ({onClick, classes}) => {
  return(
  <Card elevation={0} className={classes.logoutCard}>
    <CardActionArea onClick = {onClick}>
      <CardMedia
      component={"img"}
      className={classes.logoutIcon}
      src={LogoutIcon}/>
    </CardActionArea>
  </Card>
  )
}

export const AccountButton = (props) => {
  const {
    isGuest,
    openModal,
    signOut,
    viewCart,
    viewAccount,
    classes,
    onPhone
  } = props

  if(!isGuest && !onPhone){
    return(
    <>
    <LaptopSignedIn
      onClick={viewAccount}
      classes={classes}
    />
    <CartButton
      classes={classes}
      onClick={viewCart}
    />
    <LogoutButton
      onClick={signOut}
      classes={classes}
    />
    </>
    )
  }
  if(!isGuest && onPhone){
    return(
    <>
    <MobileSignedIn
      onClick={viewAccount}
      classes={classes}
    />
    <CartButton
      classes={classes}
      onClick={viewCart}
    />
    <LogoutButton
      onClick={signOut}
      classes={classes}
    />
    </>
    )
  }
  if(isGuest && !onPhone){
    return(
      <>
      <LaptopGuest
        onClick={openModal}
        classes={classes}
      />
      <CartButton
        classes={classes}
        onClick={viewCart}
      />
      </>
    )
  }
  if(isGuest && onPhone){
    return(
      <>
      <MobileGuest
       onClick={openModal}
       classes={classes}/>
       <CartButton
       classes={classes}
       onClick={viewCart}
       />
       </>
       )
  }
}

export default AccountButton