import { Route, Switch } from "react-router"
import ResourceView from "./Resource"
import { parse as parseQs } from "qs";
import { resourcePath } from "./urls";

const ResourceDetailsView = ({location, match}) => {
  const qs = parseQs(location.search.substr(1))
  return(
      <ResourceView id={decodeURIComponent(match.params.id)} params={qs}/>
  )

}

const ResourceSection = () => {
  return(
    <Switch>
      <Route path={resourcePath} component={ResourceDetailsView}/>
    </Switch>
  )
}

export default ResourceSection