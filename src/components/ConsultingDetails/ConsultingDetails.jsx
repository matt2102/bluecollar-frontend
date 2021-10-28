import { Container, Grid, makeStyles, Typography } from "@material-ui/core"
import IconCard from "../IconCard"

import { ConsultingCard } from "./ConsultingCard"
import { consulting30Min, consulting60Min, consultingMonthlySupportPlan } from "../../content"

const useStyles = makeStyles(theme => ({
  grid: {
    display: "grid",

    gridTemplateRows: 'auto',
    [theme.breakpoints.down('lg')]:{
      gridTemplateColumns: '1fr 1fr',
      rowGap: theme.spacing(10),
    },
    [theme.breakpoints.down('sm')]:{
      gridTemplateColumns: '1fr',
      rowGap: theme.spacing(10),
    },
    [theme.breakpoints.up('lg')]:{
      gridTemplateColumns: '1fr 1fr 1fr 1fr 1fr',
      rowGap: theme.spacing(10),
    }
  },
  container: {
    display: "flex",
    flexFlow: "column",
    alignContent: "center",
    margin: "auto",
    maxWidth: 600,
    gridRow: 1,
    gridColumn: '1 /-1'
  },
  root1: {
    background: theme.palette.secondary.light
  },
  title1: {
    color: theme.palette.secondary.main
  },
  text1: {
    color: theme.palette.text.main
  },
  btn1: {
    margin: 'auto',
    marginBottom: theme.spacing(2)
  },
  root2: {
    background: theme.palette.secondary.main
  },
  title2: {
    color: theme.palette.green
  },
  text2: {
    color: theme.palette.text.secondary
  },

  root3: {
    background: theme.palette.primary.main
  },
  title3: {
    color: theme.palette.accent.yellow
  },
  text3: {
    color: theme.palette.text.secondary
  },
  btn3: {
    background: theme.palette.secondary.main,
    margin: 'auto',
    marginBottom: theme.spacing(2)
  },

  card1: {
    maxWidth: 400,
    [theme.breakpoints.down('lg')]:{
      gridColumn: 1
    },

    [theme.breakpoints.up('lg')]:{
      gridColumn: 2
    },

  },
  card2: {
    maxWidth: 400,
    [theme.breakpoints.down('lg')]:{
      gridColumn: 2
    },
    [theme.breakpoints.down('sm')]:{
      gridColumn: 1
    },
    [theme.breakpoints.up('lg')]:{
      gridColumn: 3
    }
  },
  card3: {
    maxWidth: 400,
    [theme.breakpoints.down('lg')]:{
      gridColumn: '1 / -1',
      gridRow: 0,
    },
    [theme.breakpoints.down('sm')]:{
      gridColumn: 1,
      gridRow: 0,
    },
    [theme.breakpoints.up('lg')]:{
      gridColumn: 4
    }
  }
}))

export const ConsultingDetails = (props) => {
  const {
    subtitleText,
    bodyText
  } = props
  const icons = false
  const classes = useStyles()
  return(
    <>
    <Grid className={classes.grid}>
      <Container className={classes.container}>
        <Typography variant="subtitle2" color="secondary" align="center">{subtitleText}</Typography>
        <Typography variant="body1" align="center">{bodyText}</Typography>
      </Container>
      <Container className={classes.card1}>
        <ConsultingCard
          time={consulting30Min.time}
          name={consulting30Min.name}
          benefitsArray={consulting30Min.benefits}
          onClick={()=>{}}
          classes={{
            root: classes.root1,
            title: classes.title1,
            text: classes.text1,
            btn: classes.btn1
          }}
        />
      </Container>
      <Container  className={classes.card2}>
      <ConsultingCard
          time={consulting60Min.time}
          name={consulting60Min.name}
          benefitsArray={consulting60Min.benefits}
          onClick={()=>{}}
          classes={{
            root: classes.root2,
            title: classes.title2,
            text: classes.text2,
            btn: classes.btn1
          }}
        />
        </Container>
        <Container  className={classes.card3}>
        <ConsultingCard
          time={consultingMonthlySupportPlan.time}
          name={consultingMonthlySupportPlan.name}
          benefitsArray={consultingMonthlySupportPlan.benefits}
          onClick={()=>{}}
          classes={{
            root: classes.root3,
            title: classes.title3,
            text: classes.text3,
            btn: classes.btn3
          }}
        />
        </Container>
    </Grid>
    {icons?
    <Grid className={classes.grid}>
      <Container className={classes.container}>
        <Typography variant="subtitle2" color="secondary" align="center">{subtitleText}</Typography>
        <Typography variant="body1" align="center">{bodyText}</Typography>
      </Container>
      <Container className={classes.card1}>
        <IconCard
            subtitleText={"Collaboration"}
            bodyText={"Cindy can be your personal homeschool partner so you are no longer alone!"}
        />
      </Container>
      <Container  className={classes.card2}>
        <IconCard
              subtitleText={"Customized Recommendations"}
              bodyText={"Cindy listens deeply and brings her years of experience to help you choose curriculum, classes, or projects best suited to your child's strengths, weaknesses, and interests."}
          />
        </Container>
        <Container  className={classes.card3}>
          <IconCard
              subtitleText={"Coaching"}
              bodyText={"Cindy is the quintessential parent educator who can guide you to become the teacher your child needs."}
          />
        </Container>
    </Grid>    :null}
    </>
  )
}

export default ConsultingDetails