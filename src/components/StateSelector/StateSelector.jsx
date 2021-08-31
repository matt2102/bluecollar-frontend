import { FormControl, Input, InputLabel, makeStyles, MenuItem, Select, TextField } from "@material-ui/core"
import {states} from "./data"

const useStyles = makeStyles(theme => ({
  formControl: {
    gridColumn: 2,
  },
  formInputLabel: {
    fontSize: 28,
  },
  formSelect: {
    width: '100%',
    // textIndent: '5ch',
    paddingLeft: '20px',
    background: theme.palette.secondary.light,
    height: '50px',
    borderRadius: 25,
    position: 'relative',
    'label + &': {
      marginTop: theme.spacing(4),
    },
    '&.Mui-focused': {
      borderColor: theme.palette.primary.main,
      border: '2px solid',
    },
  },
}))

export const StateSelector = (props) => {
  const {
    selected,
    onChange,
    disabled,
    name
  } = props
  let value = selected
  const classes = useStyles()
  if(selected === undefined || selected === null){
    value = "AL"
  }
  return(
    <FormControl
      id="us-state-selector"
      key="address-state"
      name={name?name:"countryArea"}
      disabled={disabled}
      className={classes.formControl}
      >
      <InputLabel shrink className={classes.formInputLabel}>State</InputLabel>
      <Select className={classes.formSelect} value={value} onChange={onChange}>
        {states.map((state) => (
          <MenuItem key={state.value} value={state.value}>
            {state.label}
          </MenuItem>
        ))}
        </Select>

    </FormControl>
  )

}

export default StateSelector