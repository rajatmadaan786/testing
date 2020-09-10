import React, {lazy, Suspense} from "react";
import { HashRouter as Router, Route, Switch } from 'react-router-dom';


const Home = lazy(()=>import(/* webpackChunkName: "Home" */ "../Components/Home"));
const AllCharacters = lazy(()=>import(/* webpackChunkName: "AllCharacters" */ "../Components/Characters/all_characters"));
const CharacterDetails = lazy(()=>import(/* webpackChunkName: "CharacterDetails" */ "../Components/Characters/character_details"));
const PageNotFound = lazy(()=>import(/* webpackChunkName: "PageNotFound" */ "../Components/PageNotFound"));

const routes = [
  {
    path: '/characters/all',
    component: AllCharacters
  },  
  {
    path: '/character/:id',
    component: CharacterDetails
  },  
  {
    path: '/*',
    component: PageNotFound
  }
];

class Routing extends React.Component {
  render() {
    return (
      <Router>
        <Suspense fallback={<div className="text-center">Loading...</div>}>
          <Switch>
            <Route exact path="/" component={Home} />
            <Route path="/characters/all" component={AllCharacters} />
            <Route path="/character/:id" component={CharacterDetails} />
            <Route path="*" component={PageNotFound} />
          </Switch>
        </Suspense>
      </Router>
    );
  }
}

export default Routing;