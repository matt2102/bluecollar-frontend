import { Grid, Button, Typography } from "@material-ui/core"
import { maybe } from "../../misc"

const grades = [
  {
    name: "Elementary",
    value: "0"
  },
  {
    name: "Middle",
    value: "1"
  },
  {
    name: "High School",
    value: "2"
  },
  {
    name: "Post High School",
    value: "3"
  },

]

export const GradeFilter = (props) => {
  const {
    filters,
    updateGradeFilter,
  } = props
  const selected = maybe(() => filters.gradelevel, null)
  return(
    <Grid>
      <Typography variant="body2">Select Grade Level</Typography>
      {grades.map(g => {
        if(selected === g.value){
          return(
            <Button value={g.value} key={g.name} variant="containedPrimary"
            disabled
            >{g.name}</Button>
          )
        }
        return(
          <Button value={g.value} key={g.name} variant="containedPrimary"
          onClick={()=>updateGradeFilter(g.value)}
          >{g.name}</Button>
        )
      })}

    </Grid>
  )
}

export default GradeFilter