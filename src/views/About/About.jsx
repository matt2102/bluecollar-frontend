import { makeStyles, Grid} from "@material-ui/core"
import AboutPage from "../../components/AboutPage"
import InfoCard from "../../components/InfoCard"
import AboutUsImage from "../../assets/media/about_us.webp"

const useStyles = makeStyles(theme => ({

}))

export const AboutView = () => {
  const classes = useStyles()
  return(
    <>
    <InfoCard
      heading3="About Us"
      heading1="Learn our History!"
      img={AboutUsImage}

   />
    <Grid container justify="center">
      <AboutPage className={classes.text}/>
    </Grid>
    </>
  )
}

export default AboutView