import { Card, Button, makeStyles, Typography,CardHeader, Container, CardActionArea } from "@material-ui/core"
import VariantSelector from "../VariantSelector/VariantSelector"
import { maybe } from "../../misc"
import useCheckout from "../../hooks/useCheckout"
import {useState} from "react"
const useStyles = makeStyles(theme => ({
  card: {
    background: theme.palette.secondary.main,
    width: theme.spacing(60),
  },
  vSelectorContainer: {
    margin: 'auto'
  },
  actionArea:{
    display: 'flex',
    marginTop: theme.spacing(4),
    marginBottom: theme.spacing(2),
  },
  button: {
    borderRadius: 0,
    margin: 'auto',
    width: theme.spacing(50),
    height: theme.spacing(15)
  },
  disclaimer: {
    fontStyle: 'italic',
    marginBottom: theme.spacing(2),
  }
}))

export const BookSessionCard = (props) => {
  const {
    data
  } = props
  const classes = useStyles()
  const variants = maybe(()=> data.variants, [{id: null}])
  const [selected, setSelected] = useState(variants[0].id)
  const {addItem} = useCheckout()
  if(selected === null){return null}
  return(
    <Card elevation={0} className={classes.card}>
      <CardHeader
        title={data.name}
        titleTypographyProps={{
          variant: 'subtitle1',
          color: 'textSecondary'
        }}
        />
      <Container className={classes.vSelectorContainer}>
        <VariantSelector
          variants = {variants}
          selected = {selected}
          setSelected = {setSelected}
        />
      </Container>
      <CardActionArea className={classes.actionArea}>
        <Button
        onClick={()=> addItem(selected, 1)}
        variant="containedPrimary"
        className = {classes.button}
        >Book a Session
        </Button>
      </CardActionArea>
      <Typography variant="body2" align="center"  color='textSecondary' className={classes.disclaimer}>
        Disclaimer: A consulting session will be done through video conferencing software of Blue Collar's Choice.  Refunds accepted up to 24hrs before scheduled appointment.
      </Typography>
    </Card>
  )
}

export default BookSessionCard