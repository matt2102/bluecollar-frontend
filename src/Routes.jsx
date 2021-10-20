
import { Switch } from "react-router"

// Components
import Navigation from "./components/Navigation"
import Messages from "./components/Messages"
import Footer from "./components/Footer"

// Views
import AccountView from "./views/Account"
import HomeView from "./views/Home"
import AboutView from "./views/About"
import ResourceView from "./views/Resource"
import ResourcesView from "./views/Resources"
import ConsultingView from "./views/Consulting"
import BlogView from "./views/Blog"
import CartView from "./views/Cart"
import CoursesView from "./views/Courses/Courses"
import CourseView from "./views/Course/Course"

// Paths
import { blogPath } from "./views/Blog/urls"
import {homePath} from "./views/Home/urls"
import {accountPath} from "./views/Account/urls"
import {aboutPath} from "./views/About/urls"
import {resourcesPath} from "./views/Resources/urls"
import {resourcePath} from "./views/Resource/urls"
import { consultingPath } from "./views/Consulting/urls"
import { cartPath } from "./views/Cart/urls"
import { coursesPath } from "./views/Courses/urls"
import { coursePath } from "./views/Course/urls"
import CheckoutView from "./views/Checkout"
import { checkoutPath } from "./views/Checkout/urls"
import CertificateView from "./views/Certificate"
import { certificatePath } from "./views/Certificate/urls"



export const Routes = () => {
  return(
    <>
    <Messages/>
    <Navigation/>
    <Switch>
      <HomeView exact path={homePath}/>
      <AccountView path={accountPath}/>
      <AboutView path={aboutPath}/>
      <BlogView path = {blogPath}/>
      <ConsultingView path={consultingPath}/>
      <ResourcesView path={resourcesPath}/>
      <ResourceView path={resourcePath}/>
      <CourseView path={coursePath}/>
      <CoursesView path={coursesPath}/>
      <CartView path={cartPath}/>
      <CheckoutView path={checkoutPath}/>
      <CertificateView path={certificatePath}/>
    </Switch>
    <Footer/>
    </>
  )
}

export default Routes