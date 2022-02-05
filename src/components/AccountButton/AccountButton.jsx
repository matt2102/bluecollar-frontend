import { FormControl,Input, InputLabel,makeStyles } from "@material-ui/core"

const useStyles = makeStyles(theme => ({
  formControl: {
    width: '100%',
    gridColumn: 2,
  },
  formInputLabel: {
    fontSize: 28,
    [theme.breakpoints.down("md")]: {
      fontSize: 20,
    },
    [theme.breakpoints.down("sm")]: {
      fontSize: 18,
    },
    [theme.breakpoints.up("lg")]: {
      fontSize: 28,
    }
  },
  formInput: {
    width: '100%',
    background: theme.palette.secondary.light,
    position: 'relative',
    textDecoration: 'none',
    'label + &': {
      marginTop: theme.spacing(4),
    },
    '&.Mui-focused': {
      borderColor: theme.palette.primary.main,
      // border: '2px solid',
    },
    '&.MuiInput-underline:after':{
      border: 0,
      borderBottom: 'none'
    },
    [theme.breakpoints.down("md")]: {
      height: 40,
      borderRadius: 20,
      paddingLeft: 4,
    },
    [theme.breakpoints.down("sm")]: {
      height: 32,
      borderRadius: 0,
      paddingLeft: 4,
    },
    [theme.breakpoints.up("lg")]: {
      height: 50,
      borderRadius: 25,
      paddingLeft: 20,
      textIndent: '5ch',
    }
  },
}))

export const AccountButton = (props) => {
  const {
    label,
    data,
    name,
    onChange,
    disabled,
    placeholder
  } = props
  const classes = useStyles()
  return(
    <FormControl className={classes.formControl} key={name}>
    <InputLabel shrink className={classes.formInputLabel}>{label}</InputLabel>
    <Input
      placeholder={placeholder?placeholder:""}
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