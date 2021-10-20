import { isEmpty } from "../../misc"
import { parse as parseQs } from "qs";
import { makeStyles} from "@material-ui/core"
import InfoCard from "../../components/InfoCard"
import { useLocation } from "react-router"
import ResourcesPage from "../../components/ResourcesPage"
import useSort from "../../hooks/useSort"
import useFilter from "../../hooks/useFilter"

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
  const renderInfoCard = isEmpty(qs)
  const {sortVariables, handleSortChange, currentValue} = useSort(qs, ['GRADE'])
  const {filters, updateFilters, reset, updateSearchFilter, updateGradeFilter} = useFilter(qs, ["publishers", "gradeLevel","search", "featured"])
  if(isEmpty(qs) && !isEmpty(filters)){
    reset()
  }
  return(
    <>
    {renderInfoCard?
    <InfoCard
      heading1='Resources for every level'
      />:null}
    <ResourcesPage
      showFeatured={renderInfoCard}
      qs = {qs}
      sortVariables={sortVariables}
      handleSortChange={handleSortChange}
      currentValue={currentValue}
      filters={filters}
      updateFilters={updateFilters}
      reset={reset}
      updateSearchFilter={updateSearchFilter}
      updateGradeFilter={updateGradeFilter}
    />
    </>
  )
}

export default ResourcesView