import { Container,
  makeStyles,
  TextField } from "@material-ui/core";
import { useState } from "react";


const useStyles = makeStyles(theme => ({
  container: {

  }
}))

export default function SearchFilter(props){
  const {
    updateSearchFilter,
    refetch,
    prevSearchString
    // reset
  } = props
  const initialSearch = {
    search: prevSearchString
  }
  // console.log('pState', prevSearchString[0])
  const onSubmit = (searchString) => {
    updateSearchFilter(searchString)
    refetch()
  }
  const [searchState, setSearch]  = useState(initialSearch)
  const onChange = e => {
    const {name, value} = e.target
    setSearch(searchState => ({
      ...searchState,
      [name]: value
    }))
  }
  return(
    <Container>
      <form onSubmit={()=>onSubmit(searchState.search)}>
      <TextField
        label="Search"
        variant="filled"
        onChange={e=>onChange(e)}
        name="search"
        value={searchState.search}
        ></TextField>
      </form>
    </Container>
  )
}