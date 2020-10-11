import React, {lazy, Suspense} from "react";
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';


const Home = lazy(()=>import(/* webpackChunkName: "Home" */ "../Components/Home"));
const Login = lazy(()=>import(/* webpackChunkName: "Login" */ "../Components/Login/login"));
const PageNotFound = lazy(()=>import(/* webpackChunkName: "PageNotFound" */ "../Components/PageNotFound"));
const ChatBot = lazy(()=>import(/* webpackChunkName: "ChatBot" */ "../Components/Chatbot/chatbox")); 

const routes = [
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
            <Route path="/login" component={Login} />
            <Route path="/chat" component={ChatBot} />
            <Route path="/*" component={PageNotFound} />
          </Switch>
        </Suspense>
      </Router>
    );
  }
}

export default Routing;