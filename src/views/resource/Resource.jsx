import { parse as parseQs } from "qs";
import {useLocation} from "react-router"
import NotFound from "../../components/NotFound/NotFound";
import ResourcePage from "../../components/ResourcePage";
import useNavigator from "../../hooks/useNavigator";
import { resourcesPath } from "../Resources/urls";

export const ResourceView = () => {
  const location = useLocation()
  const qs = parseQs(location.search.substr(1))
  const id = qs.id
  const navigator = useNavigator()
  return(
    <div>

      {!id?
      <NotFound
        title={"Resource Not Found"}
        subtitle={"This may have been removed"}
        onClick={()=>navigator(resourcesPath)}
        buttonText={"Return to Resources"}
        />
        :
        <ResourcePage
          id={id}/>
      }
    </div>
  )
}

export default ResourceView