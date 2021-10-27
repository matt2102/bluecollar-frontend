import { useState } from "react";
import useNavigator from "./useNavigator";
import {stringify as stringifyQs} from "qs"
import { useLocation } from "react-router";

const buildFilters = (qs, fields) => {
  let filters = {}
  fields.forEach(field => {
    if(qs.hasOwnProperty(field)){
      const key = field.toLocaleLowerCase()
      const value = qs[field]
      if((typeof value === "string") && (
        (key !== "search") && (key.toLocaleLowerCase() !== "gradelevel"))
        ){
        filters[key] = [value]
      }else{
        if(key.toLocaleLowerCase() === "gradelevel"){
          filters['gradeLevel'] = value
        }
        else{
        // value is already array
        filters[key] = value
      }
      }

    }
  })
  return filters
}

export function useFilter(qs, filterFields){
  /*
  transforms filters in obj to stringified url
  */
  const navigate = useNavigator()
  const location = useLocation()
  const [filters, setFilters] = useState(
    buildFilters(qs, filterFields)
  )
  const refreshFilterState = () => {
    navigate(
      "?" + stringifyQs({
        asc: qs.asc,
        sort: qs.sort,
        ...filters,
      },
      { arrayFormat: 'repeat' }),
      true
    )
    // window.location.reload()
  }

  function updateFilters(filter, value, add=true){
    /*
    updates filter state

    filter: string e.g. categories
    value: string e.g. categoryName
    add: boolean |-> determines if value should be added or removed from filter state

    */
    const key = filter
    let newFilters = filters
    if(!add){
      // remove element from filter
      const items = new Set(filters[filter])
      if(items.has(value)){
        items.delete(value)

        if(items.size === 0){
          delete newFilters[key]
        }
        else {
          newFilters[key] = Array.from(items)
        }
      }
    }
    else {
      let oldValues = filters[filter]
      if(oldValues){
        newFilters[filter] = oldValues.concat(value)
      } else{
        newFilters[filter] = [value]
      }
    }
    setFilters(newFilters)
    refreshFilterState()
  }
  function updateSearchFilter(searchString){
    /*
    Special function to handle search queries
    */
    let newFilters = filters
    newFilters["search"] = searchString
    setFilters(newFilters)
    refreshFilterState()
  }
  function updateGradeFilter(grade){
    let newFilters = filters
    newFilters["gradeLevel"] = grade
    setFilters(newFilters)
    refreshFilterState()
  }

  function reset(){
    setFilters({})
    navigate(
      location.pathname,
      true
    )
  }
  return{
    filters,
    updateFilters,
    updateSearchFilter,
    updateGradeFilter,
    reset,
  }
}

export default useFilter