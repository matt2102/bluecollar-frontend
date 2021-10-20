import useMessages from "../../hooks/useMessages"
import { SignIn } from "../Auth/views/SignIn/SignIn"
import InfoCard from "../InfoCard"
import {
  Grid,
  makeStyles,
} from "@material-ui/core"

import resourceIcon from "../../assets/media/resources_icon.webp"
import consultingIcon from "../../assets/media/consulting_icon.webp"
import coursesIcon from "../../assets/media/courses_icon.webp"

import image from "../../assets/media/home.webp"

import useNavigator from "../../hooks/useNavigator"
import { resourcesPath } from "../../views/Resources/urls"
import { coursesPath } from "../../views/Courses/urls"
import { consultingPath } from "../../views/Consulting/urls"
import FullPageInfoCard from "../FullPageInfoCard/FullPageInfoCard"
import IconCard from "../IconCard"

const useStyles = makeStyles({
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
})

const Home = () => {
  const {addMessage} = useMessages()
  const classes = useStyles()
  const navigator = useNavigator()
  return(
    <div>
      <InfoCard
        heading1='Homeschooling Excellence'
        heading3='A Different Kind of'
      />
      <SignIn/>
      <button onClick={()=>addMessage({
        messageType: "success",
        text: "test"
      })}>add message</button>
      <Grid className={classes.grid}>
        <IconCard
          gridColumn={2}
          image={resourceIcon}
          subtitleText={'Resources'}
          bodyText={' Lorem ipsum dolor sit amet, consectetur adipisicing elit. Mollitia nostrum veritatis ab, minus esse, quas in, a cumque ratione quasi commodi voluptatibus officia sed.'}
          onClick={()=>navigator(resourcesPath)}
          displayButton={true}
        />
        <IconCard
          gridColumn={3}
          image={coursesIcon}
          subtitleText={'Courses and Curricula'}
          bodyText={' Lorem ipsum dolor sit amet, consectetur adipisicing elit. Mollitia nostrum veritatis ab, minus esse, quas in, a cumque ratione quasi commodi voluptatibus officia sed.'}
          onClick={()=>navigator(coursesPath)}
          displayButton={true}
        />
        <IconCard
          gridColumn={4}
          image={consultingIcon}
          subtitleText={'Consulting'}
          bodyText={'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Mollitia nostrum veritatis ab, minus esse, quas in, a cumque ratione quasi commodi voluptatibus officia sed.'}
          onClick={()=>navigator(consultingPath)}
          displayButton={true}
        />
        <FullPageInfoCard
          image={image}
          subtitleText="Are you a homeschooling parent who is frustrated as you search for curriculum?"
          bodyText="Lorem ipsum dolor sit amet, consectetur adipisicing elit. Mollitia nostrum veritatis ab, minus esse, quas in, a cumque ratione quasi commodi voluptatibus officia sed."
          onClick={()=>navigator(consultingPath)}
          displayButton={true}
        />
      </Grid>
    </div>
  )
}

export default Home