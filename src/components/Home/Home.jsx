import InfoCard from "../InfoCard"
import {
  Grid,
  makeStyles,
} from "@material-ui/core"

import image from "../../assets/media/home.webp"

import FullPageInfoCard from "../FullPageInfoCard/FullPageInfoCard"
import ThreeCardDisplay from "../ThreeCardDisplay/ThreeCardDisplay"
import {homeFullPageInfo, homeInfoCard} from "../../content"
import img from "../../assets/media/home-girl-transparent.webp"

const useStyles = makeStyles(theme => ({
  grid: {
    paddingTop: 200,
    paddingBottom: 200,
    display: 'grid',
    gridTemplateColumns: "1fr",
    rowGap: 150,
  },
  media: {
    minHeight: 100,
    maxHeight: 400,
    width: 200,
  }
}))

const Home = () => {
  const classes = useStyles()
  return(
    <div>
      <InfoCard
        heading1={homeInfoCard.heading1}
        heading3={homeInfoCard.heading3}
        body={homeInfoCard.body}
        img={img}
      />
      <Grid container className={classes.grid}>
        <ThreeCardDisplay/>
        <FullPageInfoCard
          image={image}
          subtitleText={homeFullPageInfo.subtitle}
          bodyText={homeFullPageInfo.body}
          onClick={()=>window.open("https://www.facebook.com/groups/496763804008415")}
          displayButton={true}
          buttonText={"Join us on Facebook"}
        />
      </Grid>
    </div>
  )
}

export default Home