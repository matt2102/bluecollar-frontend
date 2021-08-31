import { FormControl, Select,MenuItem, InputLabel, makeStyles } from "@material-ui/core"

const NAME_ASC = "NAME_ASC"
const NAME_DESC = "NAME_DESC"
const GRADE_ASC = "GRADE_ASC"
const GRADE_DESC = "GRADE_DESC"
const useStyles = makeStyles(theme => ({
    formControl: {
      display: 'grid',
      gridTemplateColumns: "8ch 50px",
      // color: theme.palette.text.main
    },
    '.MuiInputLabel-formControl':{
      position: 'relative'
    },
    label: {
      position: 'relative',
      margin: 'auto',
      fontWeight: 700,
      fontSize: 18,
      marginBottom: 5
    },
    select: {
      gridColumn: 2,
      color: theme.palette.text.main
    }
}))

export const ResourcesSort = ({currentValue, handleSortChange, refetch}) => {
  const onChange = (e) => {
    // e.preventDefault()
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
      >Sort By:</InputLabel>
      <Select
      className={classes.select}
      onChange = {(e)=>onChange(e)}
      value={currentValue}
      >

        <MenuItem value={NAME_ASC}>A-Z</MenuItem>
        <MenuItem value={NAME_DESC}>Z-A</MenuItem>
        <MenuItem value={GRADE_ASC}>Grade Low:High</MenuItem>
        <MenuItem value={GRADE_DESC}>Grade High:Low</MenuItem>
      </Select>
    </FormControl>
  )
}

export default ResourcesSort
