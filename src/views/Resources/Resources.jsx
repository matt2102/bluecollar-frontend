import { isEmpty } from "../../misc"
import { parse as parseQs } from "qs";
import InfoCard from "../../components/InfoCard"
import { useLocation } from "react-router"
import ResourcesPage from "../../components/ResourcesPage"
import useSort from "../../hooks/useSort"
import useFilter from "../../hooks/useFilter"
import img from "../../assets/media/textbooks.webp"

export const ResourcesView = () => {
  const location = useLocation()
  const qs = parseQs(location.search.substr(1));
  const renderInfoCard = isEmpty(qs)
  const {sortVariables, handleSortChange, currentValue} = useSort(qs, ['GRADE'])
  const {filters, updateFilters, reset, updateSearchFilter, updateGradeFilter} = useFilter(qs, ["publishers", "gradeLevel","search", "featured", "subject"])
  if(isEmpty(qs) && !isEmpty(filters)){
    reset()
  }
  return(
    <>
    {renderInfoCard?
    <InfoCard
      heading1='Resources for every level'
      body="Your Blue Collar Homeschool community recommends a wide variety of resources for the average learner who is not college bound.  Find curriculum links for every subject and every age, all suggested by actual members of our group as being appropriate for Blue Collar learners.  Those marked “Tried and True” were personally used by Cindy LaJoy.  Please note that specific career training programs may be listed under High School Electives, so be sure to check that out!"
      img={img}
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