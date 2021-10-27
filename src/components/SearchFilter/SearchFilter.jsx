import {
  FormControl,
  Input,
  makeStyles,
  IconButton
} from "@material-ui/core";
import { useState } from "react";
import SearchIcon from '@material-ui/icons/Search';

const useStyles = makeStyles(theme => ({
  formControl: {
    gridColumn: 2,
    display: "grid",
    gridTemplateColumns: "1fr 100px",

    margin: 0,
    padding: 0,
    marginTop: 20,
    [theme.breakpoints.down('xs')]: {
      minWidth: 'none',
      width: '100%',
      gridTemplateColumns: "1fr 50px",
      maxWidth: 250
    },
    [theme.breakpoints.up("md")]: {
      gridTemplateColumns: "1fr 100px",
      maxWidth: 600,
      minWidth: 400,
    }
  },
  formInputLabel: {
    fontSize: 28,
  },
  formInput: {
    width: '100%',
    textIndent: '5ch',
    paddingLeft: '20px',
    height: '50px',
    position: 'relative',
    background: theme.palette.secondary.light,
    borderRadius: 25,
    'label + &': {
      marginTop: theme.spacing(4),
    },
    '&.Mui-focused': {
      borderColor: theme.palette.primary.main,
      border: '2px solid',
    },
  },
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
  const classes = useStyles()
  const [searchState, setSearch]  = useState(initialSearch)
  const submit = () => {
    updateSearchFilter(searchState.search)
    refetch()
  }
  const onChange = e => {
    const {name, value} = e.target
    setSearch(searchState => ({
      ...searchState,
      [name]: value
    }))

  }
  return(
    <form onSubmit={submit}>
    <FormControl className={classes.formControl} key="search">
      <Input
        className={classes.formInput}
        value={searchState.search}
        placeholder={"Search"}
        onChange={e=>onChange(e)}
        name="search"
        fullWidth
      />
        <IconButton onClick={submit}>
          <SearchIcon/>
        </IconButton>
    </FormControl>
    </form>
  )
}