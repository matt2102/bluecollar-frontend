import { useMemo, useState } from "react"
import GridItems from "../GridItems"
import usePaginator, { createPaginationState } from "../../hooks/usePaginator"
import { maybe } from "../../misc"
import { usePublishersQuery, useResourcesQuery, useSubjectsQuery } from "../../views/Resources/queries"
import GenericFilter from "../GenericFilter/GenericFilter"
import {Grid, Button, makeStyles, Container, useMediaQuery} from "@material-ui/core"
import Loading from "../Loading"
import SearchFilter from "../SearchFilter/SearchFilter"
import PaginateBy from "../PaginateBy"
import SortResources from "../SortResources/SortResources"
import { resourceUrl } from "../../views/Resource/urls"
import GradeFilter from "../GradeFilter/GradeFilter"

const useStyles = makeStyles(theme => ({
  root: {
    display: 'grid',
    gridTemplateColumns: "350px 1fr",
    gridTemplateRows: 'minmax(200px, 300px) minmax(750px, auto)',
    [theme.breakpoints.down("lg")]: {
      gridTemplateColumns: "250px 1fr",
    },
    [theme.breakpoints.down("sm")]: {
      gridTemplateColumns: "1fr",
      gridTemplateRows: '275px minmax(750px, auto)',
      rowGap: theme.spacing(8)
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
      gridTemplateRows: '100px 50px 175px',
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
      gridRow: 1
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
  grade: {
    [theme.breakpoints.down("md")]: {
      gridColumn: '1 / -1',
      gridRow: 3,
      marginTop: 25
    },
    [theme.breakpoints.up("lg")]: {
      gridColumn: '1 / -1',
      gridRow: 0
    },
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
  const isTablet = useMediaQuery((theme) => theme.breakpoints.up('md'))
  const paginationState = createPaginationState(numProducts, qs)
  const queryVariables = useMemo(() => ({
        ...paginationState,
        filter: {
          featured: featured,
          ...filters},
        sort: sortVariables
      }),
    [sortVariables, filters, paginationState, featured]
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
  const {loadNextPage, loadPreviousPage, pageInfo} = paginate(
    maybe(() => data.resources.pageInfo),
    paginationState,
    qs
  )

  return(
    <Grid className={classes.root}>
      <div className={classes.toolbar}>
        <Container className={classes.search}>
        <SearchFilter
        prevSearchString={maybe(()=>filters.search, "")}
        updateSearchFilter={updateSearchFilter}
        refetch={refetch}
        />
        </Container>
        <Container className={classes.sort}>
        <SortResources
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
        <Container
        className={classes.grade}
        >
        <GradeFilter
          filters={filters}
          updateGradeFilter={updateGradeFilter}
          refetch={refetch}
        />
        </Container>
      </div>
      <Container className={classes.resources}>
        <GridItems
        featured={featured}
        itemUrl={resourceUrl}
        pageInfo={pageInfo}
        loadPreviousPage={loadPreviousPage}
        loadNextPage={loadNextPage}
        items={resources}/>

      </Container>
      {isTablet?
      <Container className={classes.filter}>
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
      </Container>:null}
    </Grid>
  )
}

export default ResourcesPage