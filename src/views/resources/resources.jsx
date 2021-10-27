import { isEmpty } from "../../misc"
import { parse as parseQs } from "qs";
import InfoCard from "../../components/InfoCard"
import { useLocation } from "react-router"
import ResourcesPage from "../../components/ResourcesPage"
import useSort from "../../hooks/useSort"
import useFilter from "../../hooks/useFilter"


export const ResourcesView = () => {
  const location = useLocation()
  const qs = parseQs(location.search.substr(1));
  const renderInfoCard = isEmpty(qs)
  const {sortVariables, handleSortChange, currentValue} = useSort(qs, ['GRADE'])
  const {filters, updateFilters, reset, updateSearchFilter, updateGradeFilter} = useFilter(qs, ["publishers", "gradeLevel","search", "featured", "subject"])
  console.log(filters)
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