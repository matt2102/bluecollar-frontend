import {
  Checkbox,
  Container,
  FormControlLabel,
  FormGroup,
  makeStyles,
  Typography
} from "@material-ui/core"

const useStyles = makeStyles(theme => ({
  root: {
    margin: 10,
    marginBottom: 50,
  },
  title: {
    fontWeight: 400,
    fontSize: 18
  },
  label: {
    fontSize: 16,
    fontWeight: 300
  },
  container: {
    overflowY: "scroll",
    maxHeight: 400,
  },
  checkbox: {
    color: theme.palette.text.main
  }
}))

export const GenericFilter = (props) => {
  const {
    filterItems,
    filters,
    filterName,
    updateFilters,
    refetch,
    title
    } = props
  const checkedItems = new Set(filters[filterName] || [])
  const onClick = (filterName, id, isChecked) => {
    updateFilters(filterName, id, isChecked)
    refetch()
  }
  const classes = useStyles()
  return(
    <div className={classes.root}>
    <Typography variant="subtitle1"
    className={classes.title}
    >{title?title:"Filter"}</Typography>
    <Container className={classes.container}>
    <FormGroup>

      {
      filterItems.map(item => {
        const isChecked = checkedItems.has(item.id)
        return(
        <FormControlLabel
          className={classes.label}
          key={item.id}
          control={
          <Checkbox
            className={classes.checkbox}
            onClick={()=>onClick(filterName, item.id, !isChecked)}
            name={item.name}
            checked={isChecked}
            />}
          label={item.name}
          labelPlacement="end"
        />
        )
        })}


    </FormGroup>
     </Container>
    </div>
  )
}

export default GenericFilter