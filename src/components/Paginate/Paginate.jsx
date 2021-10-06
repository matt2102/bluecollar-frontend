import {Grid, IconButton, makeStyles} from "@material-ui/core"
import {ArrowBack, ArrowForward} from "@material-ui/icons"
const useStyles = makeStyles(theme => ({
  arrow: {
    color: theme.palette.secondary.main,
    height: 40,
    width: 40,
  },
  arrowDisabled: {
    height: 40,
    width: 40,
    color: theme.palette.secondary.light,

  }
}))
export const Paginate = ({loadPreviousPage, loadNextPage, pageInfo}) => {
  const classes = useStyles()
  return (
    <Grid>
      {
        pageInfo.hasPreviousPage ?
        <IconButton
              onClick={loadPreviousPage}
                >
            <ArrowBack className={classes.arrow}/>
        </IconButton>
        :
        <IconButton disabled
                >
            <ArrowBack className={classes.arrowDisabled}/>
        </IconButton>
       }
       {
         pageInfo.hasNextPage ?
         <IconButton
         onClick={loadNextPage}>
           <ArrowForward className={classes.arrow}/>
         </IconButton>
         :
         <IconButton
         disabled>
           <ArrowForward className={classes.arrowDisabled}/>
         </IconButton>
       }
     </Grid>
   )
}

export default Paginate