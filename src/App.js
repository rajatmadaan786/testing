import React from 'react';
import {
  HashRouter as Router,
  Route
} from "react-router-dom";
import Home from './Components/Home/';

class App extends React.Component {
	render(){
		return (
			<Router>
	          <Route path="/" component={Home}></Route>
	        </Router>
		);
	}
}

export default App;
