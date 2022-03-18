import { Grid, makeStyles } from "@material-ui/core"
import FullPageInfoCard from "../../components/FullPageInfoCard/FullPageInfoCard"
import CertificateImage from "../../assets/media/certificate.webp"
import MicroLoanImage from  "../../assets/media/microloan.webp"
import ContactInfo from "../../components/ContactInfo"
import InfoCard from "../InfoCard"
import useNavigator from "../../hooks/useNavigator"
import { certificatePath } from "../../views/Programs/urls"

const bodyText = "Would you like to reward your child for an accomplishment not easily recognized by an outside source? We can help! Thanks to the generosity of our group members, we offer FREE Certificates of Achievement as well as FREE Certificates of Recognition of Graduation (this is NOT a diploma) which are customized, laminated and mailed to you from us. The Certificate of Achievement will be awarded for anything you would like to recognize. Prior recipients have received them for accomplishments such as mastering reading, building a barn, being kind to a neighbor, rebuilding a car engine, and starting a small business. The choice is yours! We are so happy to be able to support you in your homeschooling journey, and hope that this little offering of ours is a blessing to you and your learner. Please allow up to two weeks for delivery. "
const microLoanText = "Is your child a budding entrepreneur?  Do they have a small business they would like to start or are growing?  Blue Collar Homeschool is now offering micro-loans to help give your learner's business a boost!  Loans are offered at ZERO interest for up to $200, and repaid monthly over 12 months.  Your student will complete an application, and will have the opportunity to practice being interviewed by our team where they will be encouraged and coached.  If selected, they will receive a payment booklet to help them begin practicing responsible loan repayment.  Applications are accepted at anytime throughout the year.  If interested, please email us at:  Cindy@bluecollarhomeschool.com to receive an application."

const useStyles = makeStyles(theme => ({
  div: {
    // background: theme.palette.primary.light,
    paddingTop: theme.spacing(4),
    paddingBottom: theme.spacing(4),
    [theme.breakpoints.down('sm')]:{
      background: theme.palette.text.secondary
    },
  }
}))

export const ProgramsPage = () => {
  const classes = useStyles()
  const navigate = useNavigator()
  return(
    <div>
      <InfoCard
      heading3="Curious what we do?"
      heading1="Our Programs"
      />
    <Grid>
      <div className={classes.div}>
        <FullPageInfoCard
            image={CertificateImage}
            subtitleText="Recognize their achievements!"
            bodyText={bodyText}
            onClick={()=>{navigate(certificatePath)}}
            displayButton={true}
            buttonText={"Request a Certificate"}
          />
      </div>
      <div>
        <FullPageInfoCard
          image={MicroLoanImage}
          subtitleText="Microloan Program"
          bodyText={microLoanText}
          displayButton={true}
          buttonText={"Email"}
          onClick={()=>{window.open('mailto:cindy@bluecollarhomeschool.com?subject=Microloan%20Application')}}
        />
      </div>
      <ContactInfo/>
    </Grid>
    </div>
  )
}

export default ProgramsPage