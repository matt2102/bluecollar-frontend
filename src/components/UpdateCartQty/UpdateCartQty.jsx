import { FormControl, Input, InputLabel } from "@material-ui/core"
import { makeStyles } from "@material-ui/styles"
import useCheckout from "../../hooks/useCheckout"
import useMessages from "../../hooks/useMessages"

const useStyles = makeStyles(theme => ({
  input: {
    width: 40,
    fill: theme.palette.primary.main,
    border: `2px solid ${theme.palette.text.main}`,
    borderRadius: 5,
    padding: 5,
    // display: 'flex',
    // justifyContent: "center"
  },
  icon: {
    fill: theme.palette.primary.main
  }
}))

export const UpdateCartQty = ({variantId, qty}) => {
  const {updateItemQty} = useCheckout()
  const {addMessage} = useMessages()
  const classes = useStyles()
  const onChange = (e) => {
    const q = parseInt(e.target.value)
    if(0 < q && q <= 15){
      updateItemQty(variantId, q)
    }
    if(0 === q){
      addMessage({text: "Cannot have Zero Quantity"})
    }
    if(0 > q){
      addMessage({text: "Cannot have Negative Quantity"})
    }
    if(q > 15){
      addMessage({text: "Max Quantity per item is 15"})
    }
  }
  return(
  <FormControl>
    <InputLabel>
      Qty
    </InputLabel>
    <Input
      className={classes.input}
      value={qty}
      onChange={e=>onChange(e)}
      type="number"
      inputProps={{
        classes: {
          root: classes.input,
          icon: classes.icon,
        }
      }}
    >
    </Input>
  </FormControl>
  )
}


export default UpdateCartQty