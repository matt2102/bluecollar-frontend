import { Button } from "@material-ui/core"
import useUser from "../../../../hooks/useUser"


export const SignIn = () => {
  const {user, signIn, signOut} = useUser()
  console.log(user)


  return(
    <div>
      <Button onClick={()=>{
        signIn(
          {
            email: "matthew.lajoy@gmail.com",
            password: "matt"
          }
        )
      }}>
      Sign In
      </Button>
      <Button onClick={signOut}>
        Sign Out
      </Button>
    </div>
  )
}

export default SignIn