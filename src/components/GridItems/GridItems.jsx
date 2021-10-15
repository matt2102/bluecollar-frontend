import {
  Grid,
  makeStyles,
  Container
} from "@material-ui/core"
import GridCard from "../GridCard/GridCard"
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

export const GridItems = ({
  items,
  itemUrl,
  loadPreviousPage,
  loadNextPage,
  pageInfo}) => {
  const classes = useStyles()
  if(items.length === 0)return<p>Nothing Found</p>
  return(
    <Grid className={classes.root}>
      {items.map(item => {
        return(
        <GridCard
          itemUrl={itemUrl}
          item={item}
          key={`GridItems-${item.id}`}/>
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

export default GridItems