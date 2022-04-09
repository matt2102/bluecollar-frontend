import { maybe } from "./misc"

const grades = [
  {
    name: {
      full: "Elementary",
      short: "Elementary",
      abbr: "0-5",
    },
    value: "0"
  },
  {
    name: {
      full: "Middle",
      short: "Middle",
      abbr: "6-9",
    },
    value: "1"
  },
  {
    name: {
      full: "High School",
      short: "High School",
      abbr: "9-12",
    },
    value: "2"
  },
  {
    name: {
      full: "Post High School",
      short: "Post HS",
      abbr: "12+",
    },
    value: "3"
  },
]

export const getGradeLevel = (string) => {
  const n = parseInt(string)
  return maybe(()=> grades[n], grades[0])
}

export const isEmpty = obj => {
  return Object.keys(obj).length === 0
}

export function PronounToIntStr(input) {
  const pro = input.toUpperCase()
  if(pro === "MALE"){
      return "0"
  }
  if(pro === "FEMALE"){
      return "1"
  }
  return "1"
}