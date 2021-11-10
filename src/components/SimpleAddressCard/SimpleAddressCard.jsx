import { Typography } from "@material-ui/core"
import { maybe } from "../../misc"

export const SimpleAddressCard=({address})=>{
  const addr = {
    firstName: maybe(()=>address.firstName, ""),
    lastName: maybe(()=>address.lastName, ""),
    streetAddress1: maybe(()=>address.streetAddress1, ""),
    streetAddress2: maybe(()=>address.streetAddress2, ""),
    city: maybe(()=>address.city, ""),
    countryArea: maybe(()=>address.countryArea, ""),
    postalCode: maybe(()=>address.postalCode, ""),
  }
  return(
    <div>
      <Typography variant="body1">
        {addr.firstName + " " + addr.lastName}<br></br>
        {addr.streetAddress1}
        {addr.streetAddress2?<><br></br>{addr.streetAddress2}</>:null}<br></br>
        {addr.city}, {addr.countryArea} {addr.postalCode}
        </Typography>
    </div>
  )
}

export default SimpleAddressCard