import { Grid, Button, Typography, makeStyles, useMediaQuery,Container } from "@material-ui/core"
import { maybe } from "../../misc"
// import { useStyles } from "../Navigation/Navigation"

const grades = [
  {
    name: {
      full: "Elementary",
      short: "Elementary",
      abbr: "0-5",
    },
    value: "0"
  },
  {
    name: {
      full: "Middle",
      short: "Middle",
      abbr: "6-9",
    },
    value: "1"
  },
  {
    name: {
      full: "High School",
      short: "High School",
      abbr: "9-12",
    },
    value: "2"
  },
  {
    name: {
      full: "Post High School",
      short: "Post HS",
      abbr: "12+",
    },
    value: "3"
  },
]

const useStyles = makeStyles(theme => ({
  btn: {
    [theme.breakpoints.down('md')]: {
      width: 140
    },
    [theme.breakpoints.down('sm')]: {
      width: 120
    },
    [theme.breakpoints.down('xs')]: {
      width: 80
    }
  }
}))

export const GradeFilter = (props) => {
  const {
    filters,
    updateGradeFilter,
  } = props
  const classes = useStyles()
  const selected = maybe(() => filters.gradeLevel, null)
  const shortName = useMediaQuery(theme => theme.breakpoints.down('md'))
  const abbreviatedName = useMediaQuery(theme => theme.breakpoints.down('xs'))
  return(
    <Grid container>
      <Typography variant="body2">Select Grade Level</Typography>
    <Grid container justify="flex-start" alignItems="flex-start">

      {grades.map(g => {
        let name = g.name.full
        if(shortName){
          name = g.name.short
        }
        if(abbreviatedName){
          name = g.name.abbr
        }
        if(selected === g.value){
          return(
            <Button value={g.value} key={g.name} variant="containedPrimary"
            disabled className={classes.btn}
            >{name}</Button>
          )
        }
        return(
          <Button value={g.value} key={g.name} variant="containedPrimary"
          onClick={()=>updateGradeFilter(g.value)}  className={classes.btn}
          >{name}</Button>
        )
      })}

    </Grid>
    </Grid>
  )
}

export default GradeFilter