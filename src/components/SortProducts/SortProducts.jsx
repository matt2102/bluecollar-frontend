import { FormControl, Select,MenuItem, InputLabel, makeStyles, Typography } from "@material-ui/core"

const NAME_ASC = "NAME_ASC"
const NAME_DESC = "NAME_DESC"
const useStyles = makeStyles(theme => ({
    formControl: {
      display: 'grid',
      gridTemplateColumns: "100px 50px",
      height: 50,
      margin: "auto"
    },
    label: {
      position: 'relative',
      margin: "auto",
      marginBottom: 0,
      marginRight: 0,
      padding: 0,
    },
    select: {
      gridColumn: 2,
      color: theme.palette.text.main,
    }
}))

export const SortProducts = ({currentValue, handleSortChange, refetch}) => {
  const onChange = (e) => {
    handleSortChange(e.target.value)
    refetch()
  }
  const classes = useStyles()
  return(
    <FormControl
    className={classes.formControl}
    >
      <InputLabel id={"sortLabel"}
      className={classes.label}
      ><Typography variant="h5">
        Sort:
        </Typography>
        </InputLabel>
      <Select
      className={classes.select}
      onChange = {(e)=>onChange(e)}
      value={currentValue}
      >

        <MenuItem value={NAME_ASC}>A-Z</MenuItem>
        <MenuItem value={NAME_DESC}>Z-A</MenuItem>
      </Select>
    </FormControl>
  )
}

export default SortProducts
