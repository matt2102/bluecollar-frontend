import { useMemo, useState } from "react"
import GridItems from "../GridItems"
import usePaginator, { createPaginationState } from "../../hooks/usePaginator"
import { isEmpty, maybe } from "../../misc"
import { usePublishersQuery, useResourcesQuery, useSubjectsQuery } from "../../views/Resources/queries"
import { parse as parseQs } from "qs";
import useSort from "../../hooks/useSort"
import useFilter from "../../hooks/useFilter"
import GenericFilter from "../GenericFilter/GenericFilter"
import {Grid, Button, makeStyles, Container} from "@material-ui/core"
import Loading from "../Loading"
import SearchFilter from "../SearchFilter/SearchFilter"
import { useLocation } from "react-router"
import PaginateBy from "../PaginateBy"
import SortResources from "../SortResources/SortResources"
import { resourceUrl } from "../../views/Resource/urls"
import GradeFilter from "../GradeFilter/GradeFilter"

const useStyles = makeStyles(theme => ({
  root: {
    display: 'grid',
    gridTemplateColumns: "300px 1fr",
    gridTemplateRows: '250px  minmax(750px, auto)'
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
    gridTemplateColumns: "1fr 170px 250px",
    rowGap: theme.spacing(2),
    marginLeft: 200,
    maxHeight: 180
  },
  resetBtn: {
    height: 50,
    margin: "auto",
    marginTop: 0
  }
}))


export const ResourcesPage = (props) => {
  const {
    showFeatured:featured,
    qs,
    sortVariables,
    handleSortChange,
    currentValue,
    filters,
    updateFilters,
    reset,
    updateSearchFilter,
    updateGradeFilter,
  } = props
  const [numProducts, setNumProducts] = useState(25)
  const paginate = usePaginator()
  const classes = useStyles()
  const paginationState = createPaginationState(numProducts, qs)
  const queryVariables = useMemo(() => ({
        ...paginationState,
        filter: {
          featured: featured,
          ...filters},
        sort: sortVariables
      }),
    [sortVariables, filters, paginationState, qs]
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
    <Grid className={classes.root}>
      <div className={classes.toolbar}>
        <Container>
        <SearchFilter
        prevSearchString={maybe(()=>filters.search, "")}
        updateSearchFilter={updateSearchFilter}
        refetch={refetch}
        />
        </Container>
        <SortResources
          handleSortChange ={handleSortChange}
          currentValue={currentValue}
          refetch={refetch}
        />
        <PaginateBy
          paginateBy={numProducts}
          setPaginateBy={setNumProducts}
        />
        <GradeFilter
          filters={filters}
          updateGradeFilter={updateGradeFilter}
          refetch={refetch}
        />
      </div>
      <div className={classes.resources}>
        <GridItems
        featured={featured}
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
  )
}

export default ResourcesPage