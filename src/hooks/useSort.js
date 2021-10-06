import { useEffect, useState } from "react";
import useNavigator from "./useNavigator";
import {stringify as stringifyQs} from "qs"
// Sort Directions
const ASC = "ASC"
const DESC = "DESC"

// Global Sort Fields
const NAME = "NAME"


function getSortDirection(qs){
  if(qs.asc && qs.asc.toLocaleUpperCase() === "FALSE"){
    return DESC
  }
  return ASC
}

function getSortField(qs, sortFields){
  if(qs.sort !== undefined){
    const sortField = sortFields.filter(field => (
      field.toLocaleUpperCase() === qs.sort.toLocaleUpperCase())
    );
    if(sortField.length > 0){
      return sortField[0]
    }
    // default return value if none are found above
    return NAME

  }
  return NAME
}


export function useSort(qs, extraSortFields = []){
  const navigate = useNavigator()
  const [fields,] = useState([NAME].concat(extraSortFields))
  const [sortVariables, setSortVariables] = useState({
    direction: getSortDirection(qs),
    field: getSortField(qs, fields)
  })
  const [currentValue, setCurrentValue] = useState(
    `${sortVariables.field}_${sortVariables.direction}`
  )
  const splitSortString = (sortString) => {
    const [field, dir] = sortString.split("_")
    const fieldsSet = new Set(fields)
    const directionSet = new Set([ASC, DESC])
    if(fieldsSet.has(field) && directionSet.has(dir)){
      // validate new sort fields can be queried on
      return {
        direction: dir,
        field: field
      }
    }
    // returns previous variables if new ones dont pass validation
    return sortVariables
  }

  function handleSortChange(sortString){
    /*
    given sortString, changes sort field state and then replaces
    url to reflect sort field changes

    sortString = SORTFIELD_SORTDIRECTION
    e.g.: NAME_ASC, NAME_DESC
    */
    const newSortState = splitSortString(sortString)
    navigate(
      "?" + stringifyQs({
        ...qs,
        asc: newSortState.direction === ASC ? true : false,
        sort: newSortState.field.toLocaleLowerCase(),
      }),
      true
    )
    setSortVariables(newSortState)
  }
  useEffect(()=>{
    setCurrentValue(`${sortVariables.field}_${sortVariables.direction}`)
  },[sortVariables])
  return{
    sortVariables,
    handleSortChange,
    currentValue
  }
}

export default useSort