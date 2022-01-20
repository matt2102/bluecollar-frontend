import {Typography,Grid, Card, CardMedia, makeStyles, useMediaQuery} from "@material-ui/core"
import { AboutCardContainer } from "../AboutCardContainer/AboutCardContainer"

const useStyles = makeStyles(theme => ({

  link: {
    color: theme.palette.secondary.main,
  },
  grid: {
    margin: 4,
    display: 'grid',
    gridTemplateRows: 'auto',
    marginTop: theme.spacing(5),
    marginBottom: theme.spacing(15),
    gridTemplateColumns: '350px minmax(30ch, 60ch)',
    [theme.breakpoints.down('xs')]:{
      gridTemplateColumns: '1fr',
      margin: 6
    },
  },
  imageCol: {
    gridColumn: 1,
    gridRow: '1 / 5'
  },
  text: {
    textIndent: '4ch',
    gridColumn: 2,
    [theme.breakpoints.down('xs')]:{
      gridColumn: 1,
    },
  },
  card: {
    width: 300,
    margin: 'auto',
    [theme.breakpoints.down('xs')]:{
      width: 250,
      margin: 'auto',
      marginTop: theme.spacing(2),
      marginBottom: theme.spacing(2),
    },
  },
  div: {
    gridColumn: "1 / -1"
  }
}))

export const AboutPage = () => {
  const amazonBookLink = "https://www.amazon.com/Blazing-New-Homeschool-Trails-Developmental/dp/B096LYJCJW"
  const classes = useStyles()
  const phoneView = useMediaQuery((theme) => theme.breakpoints.down('sm'))
  return(
    <Grid className={classes.grid}>
      {!phoneView?
        <Grid container direction="column" justifyItems="flex-end" className={classes.imageCol}>
        <Card elevation={0} key={"profile"} className={classes.card}>
          <CardMedia
            component="img"
            alt="Profile of Cindy LaJoy"
            src={"/assets/images/cindy_profile.webp"}
          />
          <Typography align="center">Cindy LaJoy</Typography>
        </Card>
        <Card elevation={0} key={'family'} className={classes.card}>
          <CardMedia
            component="img"
            alt="LaJoy Family"
            src={"/assets/images/lajoy_family.webp"}
          />
          <Typography align="center">The LaJoy's</Typography>
        </Card>
      </Grid>:null}
      <Typography className={classes.text}>Blue Collar Homeschool was born out of the desire to help families succeed, and to encourage those whose children are bound for post-high school experiences that include trade school, the military, apprenticeships, entrepreneurism, or are immediately entering the workforce.  Not every learner will attend college, and though our society seems to believe otherwise, there are a world of possibilities open to them!  We are here to offer you resources, ideas, encouragement, and concrete programs to help you on your homeschool journey.  So many web sites or online groups focus solely on college preparatory academics and sadly, many of us walking a different path often find we are ridiculed or judged when we ask questions about our kids who are meant for something other than a university.  Our web site and large Facebook group offer a safe place to discuss these challenges, while also providing a community that celebrates non-academic successes.</Typography>
      {phoneView?
      <Card elevation={0} key={"profile"} className={classes.card}>
            <CardMedia
              component="img"
              alt="Profile of Cindy LaJoy"
              src={"/assets/images/cindy_profile.webp"}
            />
            <Typography align="center">Cindy LaJoy</Typography>
      </Card>:null}
      <Typography className={classes.text}>Blue Collar Homeschool was founded in 2017 by Cindy LaJoy.  A veteran homeschooler of a dozen years, she has now graduated all five of her internationally adopted children.  Among her young adults are a private pilot who is a web site designer, a college student pursuing a career in physical therapy, and three entrepreneurs who together run their own pizza and ice cream shop.  Cindy designed this business to accommodate their special needs as well as the learning challenges of others, as Buckaroos Slices and Scoops intentionally hires those with learning disabilities and developmental delays.</Typography>
      {phoneView?
      <Card elevation={0} key={'family'} className={classes.card}>
        <CardMedia
          component="img"
          alt="LaJoy Family"
          src={"/assets/images/lajoy_family.webp"}
        />
        <Typography align="center">The LaJoy's</Typography>
      </Card>:null}
      <Typography className={classes.text}>Through working with her own children as well as others, Cindy has developed a breadth of expertise and worked one-on-one with individuals, both as a homeschooler and as a certified job coach.  She has experience working with those with a wide variety of learning challenges including Fetal Alcohol Spectrum Disorder, Autism, Reactive Attachment Disorder, ADHD, Auditory Processing Disorder, short and long term memory issues, Sensory Integration Disorder, Dysgraphia, Dyscalculia, slow processing speed, and unspecified developmental delay.  She is a highly sought-after speaker who has been featured on numerous podcasts and homeschool, special needs, and adoption panels.  Cindy has also been a contributing author to two homeschooling books, and is co-author with Natalie Vecchione of her own
      book, <a className={classes.link} href={amazonBookLink} rel="noreferrer" target="_blank"> Blazing New Homeschool Trails:  Educating and Launching Teens with Developmental Disabilities.  </a>

       She is a Special Needs Academic Advisor and educator with True North Homeschool Academy.  Cindy is particularly gifted at researching appropriate and unique resources that are tailor-made for specific learners.  She also delights in brainstorming cross-curricular project-based learning opportunities based on an individual’s particular interests.</Typography>
      <Typography className={classes.text}>In her spare time she enjoys singing in church choir, reading until the wee hours of the morning, and is currently pursuing ordination as an interfaith minister.</Typography>
      <div className={classes.div}>
        <AboutCardContainer/>
      </div>
    </Grid>
  )
}

export default AboutPage