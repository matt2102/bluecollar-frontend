import {
  Grid,
  FormControl,
  Select,
  MenuItem,
  InputLabel,
  makeStyles,
  Typography } from "@material-ui/core"

const useStyles = makeStyles(theme => ({
  price: {
    color: theme.palette.text.secondary,
    margin: 'auto',
    marginLeft: 0,
    marginBottom: 0,
    marginRight: 40,
    fontSize: 20
  },
  formControl: {
    margin: 'auto',
    marginLeft: 0,
    display: 'grid',
    gridTemplateColumns: "100px 100px",
    height: 50,
  },
  label: {
    gridColumn: 1,
    position: 'relative',
    margin: 0,
    marginTop: "auto",
    padding: 0,
    fontSize: 18
  },
  select: {
    gridColumn: 2,
    margin: 0,
    color: theme.palette.text.secondary,
    '&:before': {
      borderColor: theme.palette.accent.yellow,
      },
      '&:after': {
          borderColor: theme.palette.accent.yellow,
      }
  },
  icon: {
    fill: theme.palette.accent.yellow,
  }
}))


const filterSelectedVariant = (variants, selected) => {
  const v = variants.filter(v => (v.id === selected))
  if(v.length === 1){
    return v[0]
  }
  return false
}

const getVariant = (vs, s, ss) => {
  const v = filterSelectedVariant(vs, s)
  if(v){
    return v
  }
  ss(vs[0].id)
  return vs[0]
}

export const VariantSelector = ({
  variants,
  selected,
  setSelected
}) => {
  const classes = useStyles()
  const variant = getVariant(variants, selected, setSelected)
  return(
    <Grid container direction="column" alignItems="flex-start">
      <Typography className={classes.price}>
        Price: ${variant.pricing.price.net.amount}
      </Typography>
      <FormControl className={classes.formControl}>
        <InputLabel id={"sortLabel"}
          className={classes.label}>
          <Typography variant="h5" color="textSecondary">
          Options:
          </Typography>
        </InputLabel>
      <Select
      className={classes.select}
      onChange = {(e)=>setSelected(e.target.value)}
      value={variant.id}
      inputProps={{
        classes: {
            icon: classes.icon,
            // root: classes.root,
        },
    }}
      >
        {
          variants.map(v => {
            return(
              <MenuItem value={v.id} key={v.id}>{v.name}</MenuItem>
            )

          })
        }
        </Select>
    </FormControl>
    </Grid>
  )
}

export default VariantSelector