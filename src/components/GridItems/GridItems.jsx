import {
  Grid,
  makeStyles,
  Container,
  Typography
} from "@material-ui/core"
import useNavigator from "../../hooks/useNavigator"
import { resourcesPath } from "../../views/Resources/urls"
import GridCard from "../GridCard/GridCard"
import NotFound from "../NotFound/NotFound"
import Paginate from "../Paginate"

const useStyles = makeStyles(theme => ({
  root: {
    margin: "auto",
    marginBottom: theme.spacing(10),
    display: "grid",
    width: "100%",
    maxWidth: "1250px",
    gridTemplateColumns: "repeat(3, 1fr)",
    gridTemplateRows: "auto",
    columnGap: "10px",
    rowGap: "10px",
    [theme.breakpoints.down("lg")]: {
      gridTemplateColumns: "repeat(2, 1fr)",
    },
    [theme.breakpoints.down("xs")]: {
      gridTemplateColumns: "1fr",
    },
    [theme.breakpoints.up("lg")]: {
      gridTemplateColumns: "repeat(3, 1fr)",
    }
  },
  featured: {
    gridColumn: "1/-1",
    gridRow: '1',
    background: theme.palette.secondary.main
  },
  notFound: {
    gridColumn: "1/-1",
    margin: 'auto'
  },
  page: {
    gridColumn: "1/-1",
    gridRowStart: "0",
    display: "flex",
    flexFlow: "row",
    justifyContent: "center",
    marginBottom: 50
  }
}))

export const GridItems = ({
  featured,
  items,
  itemUrl,
  loadPreviousPage,
  loadNextPage,
  pageInfo}) => {
  const navigator = useNavigator()
  const classes = useStyles()
  const empty = items.length === 0
  return(
    <Grid className={classes.root} container>
      {empty?
      <Container className={classes.notFound}>
          <NotFound
          title="Nothing Here"
          subtitle="Try Widening Your Search"
          onClick={()=>navigator(resourcesPath)}
          buttonText = {"reset search"}
          />
      </Container>
        :
      <>
      {featured?
      <Container className={classes.featured}>
        <Typography variant="subtitle2" color="textSecondary" align="center">Featured Resources</Typography>
      </Container>:null}
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
      </>
      }
    </Grid>
  )
}

export default GridItems