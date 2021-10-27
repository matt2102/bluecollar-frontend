import { useMemo, useState } from "react"
import usePaginator, { createPaginationState } from "../../hooks/usePaginator"
import useSort from "../../hooks/useSort"
import useFilter from "../../hooks/useFilter"
import { useLocation } from "react-router"

import {
  Grid,
  Button,
  makeStyles,
  Container,
  useMediaQuery
} from "@material-ui/core"

import {maybe } from "../../misc"
import { parse as parseQs } from "qs";

import InfoCard from "../../components/InfoCard"
import Loading from "../../components/Loading";
import { useCategoriesQuery, useProductsQuery } from "./queries"
import SearchFilter from "../../components/SearchFilter/SearchFilter"
import PaginateBy from "../../components/PaginateBy"
import GenericFilter from "../../components/GenericFilter/GenericFilter"
import GridItems from "../../components/GridItems"
import { courseUrl } from "../Course/urls"
import SortProducts from "../../components/SortProducts/SortProducts"

const useStyles = makeStyles(theme => ({
  root: {
    display: 'grid',
    gridTemplateColumns: "300px 1fr",
    gridTemplateRows: '100px  minmax(750px, auto)',
    [theme.breakpoints.down("lg")]: {
      gridTemplateColumns: "250px 1fr",
    },
    [theme.breakpoints.down("sm")]: {
      gridTemplateColumns: "1fr",
      gridTemplateRows: '100px  minmax(750px, auto)',
      rowGap: theme.spacing(4)
    },
    [theme.breakpoints.up("lg")]: {
      gridTemplateColumns: "300px 1fr",
    }
  },
  resources: {
    gridRow: 2,
    [theme.breakpoints.down("md")]: {
      gridColumn: 1,
    },
    [theme.breakpoints.up("md")]: {
      gridColumn: 2,
    },
  },
  filter: {
    gridColumn: 1,
    gridRow: "1  span 2",
  },
  toolbar: {
    gridRow: 1,
    display: "grid",
    [theme.breakpoints.down("lg")]: {
      gridTemplateColumns: "1fr 150px 250px"
    },
    [theme.breakpoints.down("md")]: {
      gridColumn: 1,
      gridTemplateColumns: "1fr 1fr",
      gridTemplateRows: '50px 50px',
      maxWidth: 700,
      margin: 'auto'
    },
    [theme.breakpoints.up("md")]: {
      gridColumn: 2,
    },
    [theme.breakpoints.up("lg")]: {
      gridTemplateColumns: "1fr 170px 250px"
    }
  },
  search: {
    [theme.breakpoints.down("md")]: {
      gridColumn: '1 / -1',
    },
    [theme.breakpoints.up("lg")]: {
      gridColumn: 1,
    },
  },
  sort: {
    [theme.breakpoints.down("md")]: {
      gridColumn: 1,
      gridRow: 2,
      display: "flex",
      flexFlow: 'row nowrap',
      justifyContent: "center"
    },
    [theme.breakpoints.up("lg")]: {
      gridColumn: 2,
    },
  },
  pageAmount: {
    [theme.breakpoints.down("xs")]: {
      display: 'none'
    },
    [theme.breakpoints.down("md")]: {
      gridColumn: 2,
      gridRow: 2,
    },
    [theme.breakpoints.up("lg")]: {
      gridColumn: 3,
    },
  },
  resetBtn: {
    height: 50,
    margin: "auto",
    marginTop: 0
  }
}))

export const CoursesView = () => {
  const location = useLocation()
  const qs = parseQs(location.search.substr(1));
  const paginate = usePaginator()
  const classes = useStyles()
  const {sortVariables, handleSortChange, currentValue} = useSort(qs)
  const {filters, updateFilters, reset, updateSearchFilter} = useFilter(qs, ["category","search"])
  const [numProducts, setNumProducts] = useState(25)
  const paginationState = createPaginationState(numProducts, qs)
  const isTablet = useMediaQuery((theme) => theme.breakpoints.up('md'))
  const queryVariables = useMemo(() => ({
    ...paginationState,
    filter: filters,
    sort: sortVariables
    }),
  [sortVariables, filters, paginationState]
  )
  const {data, loading, refetch} = useProductsQuery({
    variables: queryVariables
  })
  const {data:categoryData} = useCategoriesQuery({
    variables: {first:99}
  })

  if(loading) return (<Loading/>)

  const products = maybe(()=>
    data.products.edges.map(edge => edge.node), [])
  const categories = maybe(()=>
    categoryData.categories.edges.map(edge => edge.node), [])
    const {loadNextPage, loadPreviousPage, pageInfo} = paginate(
      maybe(() => data.products.pageInfo),
      paginationState,
      qs
    )
  const filtered = products.filter(p => p.name.indexOf("Consulting") === -1)
  return(
    <>
      <InfoCard
        heading1="Our Courses and Curricula"
      />
   <Grid className={classes.root} container>
      <div className={classes.toolbar}>
        <Container className={classes.search}>
        <SearchFilter
        prevSearchString={maybe(()=>filters.search, "")}
        updateSearchFilter={updateSearchFilter}
        refetch={refetch}
        /></Container>
        <Container className={classes.sort}>
        <SortProducts
          handleSortChange ={handleSortChange}
          currentValue={currentValue}
          refetch={refetch}
        />
        </Container>
        <Container
        className={classes.pageAmount}>
        <PaginateBy
          paginateBy={numProducts}
          setPaginateBy={setNumProducts}
        />
        </Container>

      </div>
      <Container className={classes.resources}>
        <GridItems
        itemUrl={courseUrl}
        pageInfo={pageInfo}
        loadPreviousPage={loadPreviousPage}
        loadNextPage={loadNextPage}
        items={filtered}/>
      </Container>
      {isTablet?
      <Container className={classes.filter}>

      <GenericFilter
          key={'category'}
          filterItems={categories}
          filters={filters}
          filterName={"category"}
          updateFilters={updateFilters}
          reset={reset}
          refetch={refetch}
          title={'Filter by Category'}
        />
        <Grid container>
        <Button
        className={classes.resetBtn}
        >Reset</Button>
        </Grid>

      </Container>:null}
    </Grid>
    </>
  )
}

export default CoursesView