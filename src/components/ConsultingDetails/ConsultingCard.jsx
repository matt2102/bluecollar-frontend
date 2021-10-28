import { Card, ListItemText, Typography,List, ListItem, Button, Grid } from "@material-ui/core"

export const ConsultingCard = (props) => {
  const {
    time,
    name,
    benefitsArray,
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
      <Button
      variant="containedPrimary"
      className={classes.btn}
      onClick={onClick}
      >Book</Button>
      </Grid>
    </Card>
  )
}