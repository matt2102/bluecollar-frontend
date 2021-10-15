import { useMemo, useState } from "react"
import GridItems from "../../components/GridItems"
import usePaginator, { createPaginationState } from "../../hooks/usePaginator"
import { isEmpty, maybe } from "../../misc"
import { usePublishersQuery, useResourcesQuery, useSubjectsQuery } from "./queries"
import { parse as parseQs } from "qs";
import useSort from "../../hooks/useSort"
import useFilter from "../../hooks/useFilter"
import GenericFilter from "../../components/GenericFilter/GenericFilter"
import {Grid, Button, makeStyles} from "@material-ui/core"
import Loading from "../../components/Loading"
import InfoCard from "../../components/InfoCard"
import SearchFilter from "../../components/SearchFilter/SearchFilter"
import { useLocation } from "react-router"
import PaginateBy from "../../components/PaginateBy"
import SortResources from "../../components/SortResources"
import { resourceUrl } from "../Resource/urls"

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


export const ResourcesView = () => {
  const location = useLocation()
  const qs = parseQs(location.search.substr(1));
  const paginate = usePaginator()
  const classes = useStyles()
  const {sortVariables, handleSortChange, currentValue} = useSort(qs, ['GRADE'])
  const {filters, updateFilters, reset, updateSearchFilter} = useFilter(qs, ["publishers", "gradeLevel","search"])
  const [numProducts, setNumProducts] = useState(1)
  const paginationState = createPaginationState(numProducts, qs)
  const queryVariables = useMemo(() => ({
        ...paginationState,
        filter: filters,
        sort: sortVariables
      }),
    [sortVariables, filters, paginationState]
  )
  const {data, loading, refetch} = useResourcesQuery({
    variables: queryVariables
  })
  const {data:publishersData} = usePublishersQuery({
    variables: {first:99}
  })
  const {data:subjectData} = useSubjectsQuery({
    variables: {first:99}
  })
  if(loading)return(<Loading/>)

  const resources = maybe(()=>
    data.resources.edges.map(edge => edge.node), [])
  const publishers = maybe(()=>
    publishersData.publishers.edges.map(edge => edge.node), [])
  const subjects = maybe(()=>
    subjectData.subjects.edges.map(edge => edge.node), [])
  const renderInfoCard = isEmpty(qs)
  const {loadNextPage, loadPreviousPage, pageInfo} = paginate(
    maybe(() => data.resources.pageInfo),
    paginationState,
    qs
  )

  return(
    <>
    {renderInfoCard?
    <InfoCard
      heading1='Resources for every level'
      />:null}
    <Grid className={classes.root}>
      <div className={classes.toolbar}>
        <SearchFilter
        prevSearchString={maybe(()=>filters.search, "")}
        updateSearchFilter={updateSearchFilter}
        refetch={refetch}
        />
        <SortResources
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
        itemUrl={resourceUrl}
        pageInfo={pageInfo}
        loadPreviousPage={loadPreviousPage}
        loadNextPage={loadNextPage}
        items={resources}/>
      </div>
      <div className={classes.filter}>
        <GenericFilter
          filterItems={publishers}
          filters={filters}
          filterName={"publishers"}
          updateFilters={updateFilters}
          reset={reset}
          refetch={refetch}
          title={'Filter by Publisher'}
        />
      <GenericFilter
          key={'subject'}
          filterItems={subjects}
          filters={filters}
          filterName={"subject"}
          updateFilters={updateFilters}
          reset={reset}
          refetch={refetch}
          title={'Filter by Subject'}
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

export default ResourcesView