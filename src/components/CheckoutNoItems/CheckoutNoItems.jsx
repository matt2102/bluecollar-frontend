
import {
  Typography,
  makeStyles,
  Container
} from "@material-ui/core"


const useStyles = makeStyles(theme => ({
  container: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    background: theme.palette.secondary.light,
    margin: 20,
    height: '60vh'
  },
}))

export const CheckoutNoItems = () => {
  const classes = useStyles()
  return(
    <Container className={classes.container}>
      <Typography variant="h1">No Items</Typography>
    </Container>
  )
}

export default CheckoutNoItems