import { Container, Grid, makeStyles, Typography } from "@material-ui/core"
import { homePath } from "../../views/Home/urls"
import IconCard from "../IconCard"

import resourceIcon from "../../assets/media/resources_icon.webp"
import consultingIcon from "../../assets/media/consulting_icon.webp"
import coursesIcon from "../../assets/media/courses_icon.webp"

const useStyles = makeStyles(theme => ({
  grid: {
    display: "grid",
    gridTemplateColumns: '1fr 1fr 1fr 1fr 1fr',
    gridTemplateRows: 'auto',
    rowGap: theme.spacing(10),

  },
  container: {
    display: "flex",
    flexFlow: "column",
    alignContent: "center",
    margin: "auto",
    maxWidth: 600,
    gridRow: 1,
    gridColumn: '1 /-1'
  }
}))

export const ConsultingDetails = (props) => {
  const {
    subtitleText,
    bodyText
  } = props
  const classes = useStyles()
  return(
    <Grid className={classes.grid}>
      <Container className={classes.container}>
        <Typography variant="subtitle2" color="secondary" align="center">{subtitleText}</Typography>
        <Typography variant="body1" align="center">{bodyText}</Typography>
      </Container>
      <IconCard
          gridColumn={2}
          image={consultingIcon}
          subtitleText={'Consulting'}
          bodyText={'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Mollitia nostrum veritatis ab, minus esse, quas in, a cumque ratione quasi commodi voluptatibus officia sed.'}
          onClick={()=>navigator(homePath)}
          displayButton={false}
        />
      <IconCard
          gridColumn={3}
          image={resourceIcon}
          subtitleText={'Resources'}
          bodyText={' Lorem ipsum dolor sit amet, consectetur adipisicing elit. Mollitia nostrum veritatis ab, minus esse, quas in, a cumque ratione quasi commodi voluptatibus officia sed.'}
          onClick={()=>navigator(homePath)}
          displayButton={false}
        />
        <IconCard
          gridColumn={4}
          image={coursesIcon}
          subtitleText={'Courses and Curricula'}
          bodyText={' Lorem ipsum dolor sit amet, consectetur adipisicing elit. Mollitia nostrum veritatis ab, minus esse, quas in, a cumque ratione quasi commodi voluptatibus officia sed.'}
          onClick={()=>navigator(homePath)}
          displayButton={false}
        />
    </Grid>
  )
}

export default ConsultingDetails