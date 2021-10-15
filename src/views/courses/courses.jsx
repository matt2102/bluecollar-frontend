import { useMemo, useState } from "react"
import usePaginator, { createPaginationState } from "../../hooks/usePaginator"
import useSort from "../../hooks/useSort"
import useFilter from "../../hooks/useFilter"
import { useLocation } from "react-router"

import {
  Grid,
  Button,
  makeStyles
} from "@material-ui/core"

import {maybe } from "../../misc"
import { parse as parseQs } from "qs";

import InfoCard from "../../components/InfoCard"
import Loading from "../../components/Loading";
import { useCategoriesQuery, useProductsQuery } from "./queries"
import SearchFilter from "../../components/SearchFilter/SearchFilter"
import SortResources from "../../components/SortResources"
import PaginateBy from "../../components/PaginateBy"
import GenericFilter from "../../components/GenericFilter/GenericFilter"
import GridItems from "../../components/GridItems"
import { courseUrl } from "../Course/urls"
import SortProducts from "../../components/SortProducts/SortProducts"

const useStyles = makeStyles(theme => ({
  root: {
    display: 'grid',
    gridTemplateColumns: "300px 1fr",
    gridTemplateRows: '100px  minmax(750px, auto)'
  },
  resources: {
    gridColumn: 2,
    gridRow: 2
  },
  filter: {
    gridColumn: 1,
    gridRow: "1  span 2",
  },
  toolbar: {
    gridColumn: 2,
    gridRow: 1,
    display: "grid",
    gridTemplateColumns: "1fr 170px 250px"
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
  const [numProducts, setNumProducts] = useState(1)
  const paginationState = createPaginationState(numProducts, qs)
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
  return(
    <>
      <InfoCard
        heading1="Our Courses and Curricula"
      />
   <Grid className={classes.root}>
      <div className={classes.toolbar}>
        <SearchFilter
        prevSearchString={maybe(()=>filters.search, "")}
        updateSearchFilter={updateSearchFilter}
        refetch={refetch}
        />
        <SortProducts
          handleSortChange ={handleSortChange}
          currentValue={currentValue}
          refetch={refetch}
        />
        <PaginateBy
          paginateBy={numProducts}
          setPaginateBy={setNumProducts}
        />

      </div>
      <div className={classes.resources}>
        <GridItems
        itemUrl={courseUrl}
        pageInfo={pageInfo}
        loadPreviousPage={loadPreviousPage}
        loadNextPage={loadNextPage}
        items={products}/>
      </div>
      <div className={classes.filter}>

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

      </div>
    </Grid>
    </>
  )
}

export default CoursesView