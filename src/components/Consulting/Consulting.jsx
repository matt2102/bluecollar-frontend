import {Container, Grid, makeStyles } from "@material-ui/core"
import { useRef } from "react"
import Image from "../../assets/media/consulting.webp"
import BookSessionCard from "../BookSessionCard/BookSessionCard"
import ConsultingDetails from "../ConsultingDetails"
import ConsultingInfoCard from "../ConsultingInfoCard/ConsultingInfoCard"

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
     <ConsultingInfoCard
      image = {Image}
      subtitleText = {"Are you confused about which of the many curricula will be best for you and your kids?"}
      bodyText = {"Let’s take “state management” as an example. Since React is missing a traditional dependency injection system (DI is achieved through component composition), the community had to solve this problem on its own. And it did. Over and over and again. Each new year brought a new set of standards."}
      onClick = {()=>scrollToRef()}
      imageAlt = {"Video Conference"}
      />
      <ConsultingDetails
        subtitleText = {"Get Consulting by the Hour!"}
        bodyText = {"Let’s take “state management” as an example. Since React is missing a traditional dependency injection system (DI is achieved through component composition), the community had to solve this problem on its own. And it did. Over and over and again. Each new year brought a new set of standards."}
      />
      <Container className={classes.container} ref = {ref}>
        <BookSessionCard
          data = {data}
        />
      </Container>
   </Grid>
 )
}

export default Consulting