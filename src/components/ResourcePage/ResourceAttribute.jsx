import { Typography, makeStyles, Button, Grid, useMediaQuery } from "@material-ui/core"

const useStyles = makeStyles(theme => ({
  root: {
    margin: 0,
    width: 'auto',
    display: 'grid',
    gridTemplateColumns: '80px 175px',
    gridTemplateRows: '40px 80px',
    [theme.breakpoints.down('xs')]: {
      gridTemplateColumns: '1fr',
      gridTemplateRows: '60px'
    }
  },
  attr: {
    margin: 'auto',
    marginBottom: 0
  },
  name: {
    margin: 'auto',
    marginLeft: 0,
    marginBottom: 0
  },
  btn: {
    gridRow: 2,
    gridColumn: '1 / -1',
    background: theme.palette.secondary.main,
    '&&:hover':{
      background: theme.palette.accent.yellow,
      color: theme.palette.secondary.main
    },
    [theme.breakpoints.down('xs')]: {
      gridRow: 1,
      gridColumn: 1,
    }
  }
}))

export const ResourceAttribute = (props) => {
  const {
    attribute,
    name,
    id,
    onClick
  } = props
  const classes = useStyles()
  const isPhone = useMediaQuery((theme)=>theme.breakpoints.down('xs'))
  return(
    <Grid container key={id} className={classes.root}>
      {!isPhone?
      <>
      <Typography className={classes.attr}>{attribute}</Typography>
      <Typography className={classes.name}>{name}</Typography></>:null}
      <Button onClick={()=>onClick(id)}
      variant="containedPrimary"
      className={classes.btn}
      >Search {attribute}</Button>
    </Grid>
  )
}