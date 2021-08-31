import { useState } from "react";
import useNavigator from "./useNavigator";
import {stringify as stringifyQs} from "qs"

const buildFilters = (qs, fields) => {
  let filters = new Object()
  fields.forEach(field => {
    if(qs.hasOwnProperty(field)){
      const key = field.toLocaleLowerCase()
      const value = qs[field]
      if(typeof value === "string"){
        filters[key] = [value]
      }else{
        // value is already array
        filters[key] = value
      }

    }
  })
  return filters
}

export function useFilter(qs, filterFields){
  const navigate = useNavigator()
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
  function reset(){
    let newQs = qs

    filterFields.forEach(field => {
      if(newQs.hasOwnProperty(field)){
        delete newQs[field]
      }
    })
    setFilters({})
    navigate(
      "?" + stringifyQs(newQs),
      true
    )
  }
  return{
    filters,
    updateFilters,
    reset
  }
}

export default useFilter