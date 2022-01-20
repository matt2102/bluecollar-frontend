import { Grid, Typography } from "@material-ui/core"
import { makeStyles } from "@material-ui/styles"
const useStyles = makeStyles(theme => ({
  grid: {
    marginTop: theme.spacing(5),
    marginBottom: theme.spacing(15),
  },
  title: {
    margin: theme.spacing(2)
  },
  noPrograms: {
    height: '80vh',
    width: '80%',
    margin: 'auto',
    background: theme.palette.secondary.main,
    borderRadius: 10
  }
})
)
export const ProgramsPage = () => {
  const classes = useStyles()
  return(
    <Grid className={classes.grid}>
      <Typography variant="h3" className={classes.title}>Current Programs</Typography>
      <Grid container justify="center" alignItems="center"
      className={classes.noPrograms}>
        <Typography color="textSecondary">No Programs Open</Typography>
      </Grid>
    </Grid>
  )
}

export default ProgramsPage
