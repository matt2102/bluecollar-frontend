
export const getGradeLevel = (string) => {
  const n = parseInt(string)
  if(n === 0){
    return "ELEMENTARY"
  }
  if(n === 1){
    return "MIDDLE"
  }
  if(n === 2){
    return "HIGH SCHOOL"
  }
  if(n === 3){
    return "POST HIGH SCHOOL"
  }
  return "ELEMENTARY"
}

export const isEmpty = obj => {
  return Object.keys(obj).length === 0
}