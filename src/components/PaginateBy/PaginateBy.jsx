import {FormControl, InputLabel, Select, MenuItem, Typography, makeStyles} from '@material-ui/core'
const useStyles = makeStyles(theme => ({
  formControl: {
    display: "grid",
    gridTemplateColumns: "150px 50px",
    height: 50,
    margin: "auto"
  },
  label: {
    // width: "100%",
    position: 'relative',
    margin: "auto",
    marginBottom: 0,
    marginRight: 0,
    padding: 0,
  },
  select: {
    gridColumn: 2,
    color: theme.palette.text.main
  }
}))
export function PaginateBy({
  paginateBy,
  setPaginateBy
}){
  const classes = useStyles()
  return(
    <FormControl className={classes.formControl}>
      <InputLabel className={classes.label}>
        <Typography variant="h5">
          Display Amount:
        </Typography>
      </InputLabel>
      <Select
        className={classes.select}
        value={paginateBy}
        label={paginateBy}
        onChange={(e) => setPaginateBy(e.target.value)}
      >
        <MenuItem value={1}>1</MenuItem>
        <MenuItem value={10}>10</MenuItem>
        <MenuItem value={25}>25</MenuItem>
        <MenuItem value={50}>50</MenuItem>
        <MenuItem value={99}>99</MenuItem>

      </Select>
    </FormControl>
  )
}

export default PaginateBy