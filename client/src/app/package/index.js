import React from 'react' 
import { 
  Switch,
  Route, 
  useParams,
  useRouteMatch
} from "react-router-dom"; 

const Package = () => {

  let { path, url } = useRouteMatch();
  let { name } = useParams();

  return (
    <Switch>
      <Route path={`${path}/create`}>
        <h3>This is the package create</h3>
      </Route>
      <Route path={`${path}/:name`}>
        <h3>This is the package item of {name}</h3>
      </Route>
      <Route exact path={path}>
        <h3>This is the package list</h3>
      </Route>
    </Switch>
  )
}

export default Package;