import { makeStyles } from "@material-ui/core"
import React from "react"
const baseStyles = {
  'fill-rule' : 'evenodd',
  'clip-rule': 'evenodd',
  'stroke-linejoin': 'round',
  'stroke-miterlimit': 2
}
const useStyles = makeStyles(
  {
    cls1: {
      'fill': '#cce28f',
      'fill-rule': 'nonzero',
      ...baseStyles
    },
    cls2: {
      'fill': '#a4c954',
      'fill-rule': 'nonzero',
      ...baseStyles
    },
    cls3: {
      'fill': '#a4c954',
      'fill-rule': 'nonzero',
      ...baseStyles
    }
  }
)
export const AccountIcon = () => {
  const classes = useStyles()
  return(
      <svg
      // viewBox="0 0 50 50"
      version="1.1" xmlns="http://www.w3.org/2000/svg"
      >
        <g id="Layer-3">
          <path className={classes.cls1}
          d="M75,37.5c0,20.711 -16.789,37.5 -37.5,37.5c-20.711,0 -37.5,-16.789 -37.5,-37.5c0,-20.711 16.789,-37.5 37.5,-37.5c20.711,0 37.5,16.789 37.5,37.5"/>
          <path className={classes.cls2}
          d="M63.074,64.166c-0,-9.991 -8.1,-18.09 -18.091,-18.09l-16.771,-0c-9.652,-0 -17.537,7.559 -18.062,17.079c6.468,6.893 15.511,11.339 25.594,11.804l3.512,-0c9.19,-0.424 17.517,-4.155 23.818,-10.032l-0,-0.761Z"/>
          <path className={classes.cls3}
          d="M51.039,26.098c-0,7.976 -6.466,14.442 -14.442,14.442c-7.975,0 -14.441,-6.466 -14.441,-14.442c-0,-7.975 6.466,-14.441 14.441,-14.441c7.976,-0 14.442,6.466 14.442,14.441"/>

        </g>
      </svg>
  )
}

export default AccountIcon