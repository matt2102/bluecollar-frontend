import { useMutation } from "@apollo/client"
import { Grid, makeStyles } from "@material-ui/core"
import CertificateForm from "../../components/CertificateForm/CertificateForm"
import useMessages from "../../hooks/useMessages"
import useNavigator from "../../hooks/useNavigator"
import useUser from "../../hooks/useUser"
import { certificateCreateMutation } from "../../mutations/certificate"
import {programsPath} from "../Programs/urls"

const useStyles = makeStyles(theme => ({
  grid: {
    maxWidth: 600,
    margin: 'auto',
    // background: theme.palette.primary.light,
    // paddingTop: theme.spacing(4),
    // paddingBottom: theme.spacing(4),
    // [theme.breakpoints.down('sm')]:{
    //   background: theme.palette.text.secondary
    // },
  }
}))



export const CertificateView = () => {
  const classes = useStyles()
  const {user} = useUser()
  const {addMessage} = useMessages()
  const navigate = useNavigator()

  function handleSuccess(){
    addMessage({text: "Certificate Request Sent!"})
    navigate(programsPath)
  }
  function handleApolloError(){
    addMessage({
      messageType: "error",
      text: "Server error.  Please try again later"
    })
}

  const [
    certificateCreate, {
    loading
  }] = useMutation(
      certificateCreateMutation, {
      onCompleted: handleSuccess,
      onError: handleApolloError
    })

  const onSubmit = (formData) => {
    certificateCreate({
      variables: {
        input: {
          presentedFor: formData.presentedFor,
          presentedTo: formData.presentedTo,
          presentedOn: formData.presentedOn,
          presentedBy: formData.presentedBy,
          streetAddress1: formData.streetAddress1,
          streetAddress2: formData.streetAddress2,
          postalCode: formData.postalCode,
          city: formData.city,
          state: formData.state,
          country: formData.country,
          generated: formData.generated,
          email: formData.email,
          digitalOnly: formData.digitalOnly,
          pronouns: formData.pronouns
      }
      }
    })
  }


  const initialData = {
    presentedFor: "",
    presentedTo:  "",
    presentedOn:  "",
    presentedBy:  "",
    streetAddress1: "",
    streetAddress2: "",
    postalCode: "",
    city:  "",
    state: "",
    country: "",
    email: user.isGuest ? "" : user.email,
    generated: false,
    digitalOnly: true,
    pronouns: "MALE"
  }
  // const testData = {
  //   presentedFor: "HomeSchool Highschool",
  //   presentedTo:  "My Deer Friend",
  //   presentedOn:  "2022-02-03",
  //   presentedBy:  "Your Mom",

  //   streetAddress1: "1518 E Main St",
  //   streetAddress2: "",
  //   postalCode: "81401",
  //   city:  "Montrose",
  //   state: "Colorado",
  //   country: "USA",
  //   email: user.isGuest ? "" : user.email,
  //   generated: false
  // }
  return(
    <div>
      <Grid className={classes.grid}>
        <CertificateForm
          onSubmit={onSubmit}
          disabled={loading}
          certificate={initialData}
        />
      </Grid>
    </div>
  )
}

export default CertificateView