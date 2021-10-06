import {
  Grid,
  makeStyles,
  Container
} from "@material-ui/core"
import ResourceCard from "../ResourceCard/ResourceCard"
import Paginate from "../Paginate"

const useStyles = makeStyles({
  root: {
    marginTop: 50,
    display: "grid",
    width: "100%",
    maxWidth: "1200px",
    gridTemplateColumns: "repeat(2, 1fr)",
    gridTemplateRows: "auto",
    columnGap: "10px",
    rowGap: "10px"
  },
  page: {
    gridColumn: "1/-1",
    gridRowStart: "0",
    display: "flex",
    flexFlow: "row",
    justifyContent: "center",
    marginBottom: 50
  }
})

export const Resources = ({resources, loadPreviousPage, loadNextPage, pageInfo}) => {
  const classes = useStyles()
  if(resources.length === 0)return<p>No Resources</p>
  return(
    <Grid className={classes.root}>
      {resources.map(resource => {
        return(
        <ResourceCard resource={resource}/>
        )
      })}
      <Container className={classes.page}>
        <Paginate
        pageInfo={pageInfo}
        loadPreviousPage={loadPreviousPage}
        loadNextPage={loadNextPage}/>
      </Container>
    </Grid>
  )
}

export default Resources