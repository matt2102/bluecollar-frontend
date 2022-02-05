import { Route } from "react-router"

import ProgramsPage from "../../components/ProgramsPage"
import CertificateView from "../Certificate/Certificate"
import { certificatePath, programsPath } from "./urls"



export const ProgramsView = () => {
  return(
    <>
      <Route exact path={programsPath} component={ProgramsPage}/>
      <Route path={certificatePath} component={CertificateView}/>
    </>
  )
}

export default ProgramsView