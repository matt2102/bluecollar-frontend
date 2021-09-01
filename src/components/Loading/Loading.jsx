import { makeStyles } from "@material-ui/core"

const useStyles = makeStyles({
  loading: {
    minHeight: '1200px',
    height: '100vh'
  }
})


export default function Loading(){
  const classes = useStyles()
  return(
    <div className={classes.loading}>

    </div>
  )
}