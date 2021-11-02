import { parse } from "qs"
import { useState, useEffect } from "react"
import { useLocation } from "react-router"
import useNavigator from "../../hooks/useNavigator"
import useUser from "../../hooks/useUser"
import { homePath } from "../../views/Home/urls"
import InfoCard from "../InfoCard"
import Loading from "../Loading"

export const AccountConfirm = () => {
  const location = useLocation()
  const qs = parse(location.search.substr(1))
  const [hasSubmitted, setSubmitted] = useState(false)
  const [loading, setLoading] = useState(true)
  const {confirm} = useUser()

  const [counter, setCounter] = useState(7);
  const navigator = useNavigator()

  useEffect(() => {
      let isMounted = true;
      if(isMounted ){
          if(counter > 0){
          setTimeout(() => setCounter(counter - 1), 1000);
          } else{
            navigator(homePath)
          }
      } else{
          return null
      }
      return ()=>{ isMounted = false}
    }, [counter, navigator]);


  if((qs.email && qs.token) && !hasSubmitted){
    const {confirmLoading} = confirm({
      email: qs.email,
      token: qs.token
    })
    setSubmitted(true)
    console.log("Loading: ", confirmLoading)
    if(confirmLoading !== loading){
      setLoading(confirmLoading)
    }
  }
  if(loading){
    return<Loading
      title={"Confirming Account"}
    />
  }
  return(
    <InfoCard
      heading1={"Your Account Has been created!"}
      heading3={`You will be automatically redirected home in : ${counter}`}
    />
  )

}

export default AccountConfirm