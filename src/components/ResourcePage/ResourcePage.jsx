import { Typography, Grid } from "@material-ui/core"
import { getGradeLevel } from "../../utils"
import { maybe } from "../../misc"
import { useResourceQuery } from "../../views/Resource/queries"
import Loading from "../Loading"

export const ResourcePage = (props) => {
  const {
    id
  } = props
  const {data, loading} = useResourceQuery({
    variables: {
      id: id
    }
  })
  if(loading && !data)return(<Loading/>)
  const r = maybe(() => data.resource)
  const g = getGradeLevel(r.gradeLevel)
  return (
    <>
    <p>{JSON.stringify(data)}</p>
    <Grid>
      <Typography>{r.name}</Typography>
      <Typography>{r.subject.name}</Typography>
      <Typography>{r.publisher.name}</Typography>
      <Typography>{r.gradeLevel}</Typography>
      <Typography>{g}</Typography>
    </Grid>
    </>
  )
}

export default ResourcePage