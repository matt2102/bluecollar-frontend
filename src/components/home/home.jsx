import useUser from "../../hooks/useUser"
import useMessages from "../../hooks/useMessages"
import { SignIn } from "../auth/views/signin"
import InfoCard from "../InfoCard"
import {
  Container,
  Grid,
  makeStyles,
} from "@material-ui/core"

import resourceIcon from "../../assets/media/resources_icon.webp"
import consultingIcon from "../../assets/media/consulting_icon.webp"
import coursesIcon from "../../assets/media/courses_icon.webp"

import image from "../../assets/media/home_2000x1151px.webp"

import HomeCard from "../HomeCard/homecard"
import useNavigator from "../../hooks/useNavigator"
import { resourcesPath } from "../../views/resources/urls"
import { coursesPath } from "../../views/courses/urls"
import { consultingPath } from "../../views/consulting/urls"
import FullPageInfoCard from "../FullPageInfoCard/FullPageInfoCard"

const useStyles = makeStyles(theme =>({
  grid: {
    paddingTop: 200,
    paddingBottom: 200,
    display: 'grid',
    gridTemplateColumns: "0.25fr 1fr 1fr 1fr 0.25fr",
    rowGap: 150
  },
  media: {
    minHeight: 100,
    maxHeight: 400,
    width: 200,
  }
}))

const Home = () => {
  const user = useUser()
  const {addMessage} = useMessages()
  const classes = useStyles()
  const navigator = useNavigator()
  return(
    <div>
      <InfoCard
        heading1='Homeschooling Experience'
        heading3='A Different Kind of'
      />
      <SignIn/>
      <button onClick={()=>addMessage({
        messageType: "success",
        text: "test"
      })}>add message</button>
      <Grid className={classes.grid}>
        <HomeCard
          gridColumn={2}
          image={resourceIcon}
          subtitleText={'Resources'}
          bodyText={' Lorem ipsum dolor sit amet, consectetur adipisicing elit. Mollitia nostrum veritatis ab, minus esse, quas in, a cumque ratione quasi commodi voluptatibus officia sed.'}
          onClick={()=>navigator(resourcesPath)}
        />
        <HomeCard
          gridColumn={3}
          image={coursesIcon}
          subtitleText={'Courses and Curricula'}
          bodyText={' Lorem ipsum dolor sit amet, consectetur adipisicing elit. Mollitia nostrum veritatis ab, minus esse, quas in, a cumque ratione quasi commodi voluptatibus officia sed.'}
          onClick={()=>navigator(coursesPath)}
        />
        <HomeCard
          gridColumn={4}
          image={consultingIcon}
          subtitleText={'Consulting'}
          bodyText={'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Mollitia nostrum veritatis ab, minus esse, quas in, a cumque ratione quasi commodi voluptatibus officia sed.'}
          onClick={()=>navigator(consultingPath)}
        />
        <FullPageInfoCard
          image={image}
          subtitleText="Are you a homeschooling parent who is frustrated as you search for curriculum?"
          bodyText="Lorem ipsum dolor sit amet, consectetur adipisicing elit. Mollitia nostrum veritatis ab, minus esse, quas in, a cumque ratione quasi commodi voluptatibus officia sed."
          onClick={()=>navigator(consultingPath)}
        />
      </Grid>
    </div>
  )
}

export default Home