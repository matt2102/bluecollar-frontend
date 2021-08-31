import { FormControl,Input, InputLabel,makeStyles } from "@material-ui/core"

const useStyles = makeStyles(theme => ({
  formControl: {
    gridColumn: 2,
  },
  formInputLabel: {
    fontSize: 28,
  },
  formInput: {
    width: '100%',
    textIndent: '5ch',
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

export const AccountButton = (props) => {
  const {
    label,
    data,
    name,
    onChange,
    disabled
  } = props
  const classes = useStyles()
  return(
    <FormControl className={classes.formControl} key={name}>
    <InputLabel shrink className={classes.formInputLabel}>{label}</InputLabel>
    <Input
      name={name}
      className={classes.formInput}
      value={data[name] || ""}
      onChange={onChange}
      fullWidth
      disabled={disabled}
    />
    </FormControl>
  )
}

export default AccountButton