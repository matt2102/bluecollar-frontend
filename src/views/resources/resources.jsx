import { useMemo, useState } from "react"
import Resources from "../../components/Resources"
import usePaginator, { createPaginationState } from "../../hooks/usePaginator"
import { isEmpty, maybe } from "../../misc"
import { usePublishersQuery, useResourcesQuery, useSubjectsQuery } from "./queries"
import { parse as parseQs } from "qs";
import ResourcesSort from "../../components/resourcessort/resourcessort"
import useSort from "../../hooks/useSort"
import useFilter from "../../hooks/useFilter"
import GenericFilter from "../../components/GenericFilter/GenericFilter"
import {Grid, makeStyles} from "@material-ui/core"
import Loading from "../../components/Loading"
import InfoCard from "../../components/InfoCard"
import SearchFilter from "../../components/SearchFilter/SearchFilter"

const useStyles = makeStyles(theme => ({
  root: {
    display: 'grid',
    gridTemplateColumns: "300px 1fr",
    gridTemplateRows: '50px  auto'
  },
  resources: {
    gridColumn: 2,
    gridRow: 2
  },
  sort: {
    gridColumn: 2,
    gridRow: 1,
  },
  filter: {
    gridColumn: 1,
    gridRow: "1  span 2"
  }
}))

const gradeLevel = [
  {id: 0, name: "Elementary School"},
  {id: 1, name: "Middle School"},
  {id: 2, name: "High School"},
  {id: 3, name: "Post High School"},
]


export const ResourcesView = ({location}) => {
  const qs = parseQs(location.search.substr(1));
  const paginate = usePaginator()
  const classes = useStyles()
  const {sortVariables, handleSortChange, currentValue} = useSort(qs, ['GRADE'])
  const {filters, updateFilters, reset, updateSearchFilter} = useFilter(qs, ["publishers", "gradeLevel","search"])
  const [numProducts, setNumProducts] = useState(50)
  const paginationState = createPaginationState(numProducts, qs)
  const queryVariables = useMemo(() => ({
        ...paginationState,
        filter: filters,
        sort: sortVariables
      }),
    [filters, paginationState, sortVariables]
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
  return(
    <>
    {renderInfoCard?
    <InfoCard
      heading1='Resources for every level'
      />:null}
    <Grid className={classes.root}>
      <SearchFilter
      prevSearchString={maybe(()=>filters.search, "")}
      updateSearchFilter={updateSearchFilter}
      refetch={refetch}
      />
      <div className={classes.sort}>
      <ResourcesSort
        handleSortChange ={handleSortChange}
        currentValue={currentValue}
        refetch={refetch}

      />
      </div>
      <div className={classes.resources}>
        <Resources
        resources={resources}/>
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
      </div>
    </Grid>
    </>
  )
}

export default ResourcesView