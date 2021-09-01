
import { Switch } from "react-router"
import Navigation from "./components/navigation"
import AccountView from "./views/account"
import HomeView from "./views/home"


import AboutView from "./views/about"
import ResourceView from "./views/resource"
import ResourcesView from "./views/resources"
import CoursesView from "./views/courses"
import CourseView from "./views/course"
import ConsultingView from "./views/consulting"



import {homePath} from "./views/home/urls"
import {accountPath} from "./views/account/urls"
import {aboutPath} from "./views/about/urls"
import {resourcesPath} from "./views/resources/urls"
import {resourcePath} from "./views/resource/urls"
import { coursesPath } from "./views/courses/urls"
import { coursePath } from "./views/course/urls"
import { consultingPath } from "./views/consulting/urls"
import Baseline from "./Baseline"
import Messages from "./components/messages"
import Footer from "./components/Footer"



export const Routes = () => {
  return(
    <>
    {/* <Baseline/> */}
    <Messages/>
    <Navigation/>
    <Switch>
      <HomeView exact path={homePath}/>
      <AccountView path={accountPath}/>
      <AboutView path={aboutPath}/>
      <ConsultingView path={consultingPath}/>
      <ResourcesView path={resourcesPath}/>
      <ResourceView path={resourcePath}/>
      <CoursesView path={coursesPath}/>
      <CourseView path={coursePath}/>
    </Switch>
    <Footer/>
    </>
  )
}

export default Routes