import { Container,Card, CardHeader,Typography, CardContent, Grid, makeStyles } from "@material-ui/core"
import { CardMedia } from "material-ui"
import { formatMoney, getDate, getImage } from "../../misc"
import DefaultImage from "../DefaultImage"

const useStyles = makeStyles(theme => ({
  card: {
    marginTop: theme.spacing(10)
  },
  cardHeader: {
    background: theme.palette.secondary.main
  }
})
)

export const OrderCard = (props) => {
  const {
    order
  } = props
  const date = getDate(order.created)
  const amount = formatMoney(order.total.gross.amount)
  const classes = useStyles()
  return(
    <Card>
      <CardHeader
        title={
          <Grid container direction="row" justify="space-between"
          >
            <Typography color="textSecondary">Order Placed: {date}</Typography>
            <Typography color="textSecondary">Total: ${amount}</Typography>
            <Typography color="textSecondary">Order # {order.number}</Typography>
          </Grid>
        }
        className={classes.cardHeader}
      />
      <CardContent>
        <Grid>
          {order.lines.map(l => {
            const image = getImage(l.thumbnail)

            return(
              <Container>
                {image?
                  <CardMedia
                    component="img"
                    // className={classes.cardMedia}
                    image={image}
                  />
                  :
                  <DefaultImage item={l}/>
                }

              </Container>
            )
          })}
        </Grid>
      </CardContent>
    </Card>
  )
}

export default OrderCard