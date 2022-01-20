import { Card, ListItemText, Typography,List, ListItem, Button, Grid } from "@material-ui/core"

export const ConsultingCard = (props) => {
  const {
    time,
    name,
    benefitsArray,
    price,
    link,
    onClick,
    classes
  } = props
  return(
    <Card className={classes.root}>
      <Typography variant="h1" className={classes.title} align="center">{time}</Typography>
      <Typography variant="subtitle1" className={classes.title}>{name}</Typography>
      <List>
      {benefitsArray.map(b => {
        return(
          <ListItem>
            <ListItemText>
              <Typography className={classes.text}>{b}</Typography>
              </ListItemText>
          </ListItem>
        )
      })}
      </List>
      <Grid container>
      {price ?
      <Button
      variant="containedPrimary"
      className={classes.btn}
      onClick={onClick}
      >Book {price}</Button>
      :
      <Button
      variant="containedPrimary"
      className={classes.btn}
      onClick={()=>window.open(link)}
      >Book</Button>
      }

      </Grid>
    </Card>
  )
}