import {Container, Grid, makeStyles } from "@material-ui/core"
import { useRef } from "react"
import Image from "../../assets/media/consulting.webp"
import { consultingDetails } from "../../content"
import BookSessionCard from "../BookSessionCard/BookSessionCard"
import ConsultingDetails from "../ConsultingDetails"
import FullPageInfoCard from "../FullPageInfoCard/FullPageInfoCard"

const useStyles = makeStyles(theme => ({
  grid: {
    display: 'grid',
    marginTop: theme.spacing(15),
    marginBottom: theme.spacing(15),
    rowGap: theme.spacing(15)
  },
  container: {
    gridRow: 0,
    gridColumn: '1 / -1',
    width: 'auto',
    maxWidth: theme.spacing(60),
    margin: 'auto'
  }
}))


export const Consulting = (props) => {
  const {
    data
  } = props
  const ref = useRef(null)
  const classes = useStyles()
  const scrollToRef = () => ref.current.scrollIntoView()
  return (
   <Grid className={classes.grid}>
     <FullPageInfoCard
      image = {Image}
      subtitleText = {consultingDetails.subtitle}
      bodyText = {consultingDetails.body}
      onClick = {()=>scrollToRef()}
      imageAlt = {"Video Conference"}
      buttonText= {"Purchase a Session"}
      />
      <div ref = {ref}>
      <ConsultingDetails
      key="details"
      />
      </div>
   </Grid>
 )
}

export default Consulting