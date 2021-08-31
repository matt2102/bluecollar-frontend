import { Button, FormControlLabel, FormGroup, makeStyles, Typography } from "@material-ui/core"
import Checkbox from "@material-ui/core/Checkbox"

const useStyles = makeStyles(theme => ({
  root: {
    margin: 10,
    borderBottom: `4px solid ${theme.palette.primary.main}`
  },
  title: {
    fontWeight: 400,
    fontSize: 18
  },
  label: {
    fontSize: 16,
    fontWeight: 300
  }
}))

export const GenericFilter = (props) => {
  const {
    filterItems,
    filters,
    filterName,
    updateFilters,
    refetch,
    reset,
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
            onClick={()=>onClick(filterName, item.id, !isChecked)}
            name={item.name}
            checked={isChecked}
            />}
          label={item.name}
          labelPlacement="end"
        />
        )
        })}
      <Button onClick={reset}>Reset</Button>
    </FormGroup>
    </div>
  )
}

export default GenericFilter