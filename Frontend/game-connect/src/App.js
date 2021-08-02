import './App.css';
import Navbar from './components/Navbar/Navbar';
import {FooterContainer} from './containers/footer';
import {BrowserRouter as Router, Switch, Route, Redirect} from 'react-router-dom';
import Home from './pages/Home';
import About from './pages/About';
import Community from './pages/Community';
import Support from './pages/Support';
import Signin from './pages/Signin';
import TeamMembers from './pages/TeamMembers';
import Privacy from './pages/Privacy';
import Terms from './pages/Terms';
import Forgot from './pages/Forgot';
import Signup from './pages/Signup';
import NotFound from './pages/NotFound';

import { useContext } from "react";
import { AuthContext } from "./context/AuthContext";

function App() {
  const { user } = useContext(AuthContext);

  return (
    <div className="App">
      <Router>
        <Navbar />

        <Switch>
          <Route exact path='/'>
            {user ? <Home/> : <Signup/>}
          </Route>

          <Route path='/about' exact component={About} />
          <Route path='/community' exact component={Community} />
          <Route path='/support' exact component={Support} />

          <Route exact path='/signin'>
            {user ? <Redirect to = "/" /> : <Signin/>}
          </Route>
          
          <Route path='/team' exact component={TeamMembers} />
          <Route path='/privacy' exact component={Privacy} />
          <Route path='/terms' exact component={Terms} />
          <Route path='/forgot' exact component={Forgot} />
          <Route path='/signup' exact component={Signup} />
          <Route component={NotFound} />
        </Switch>

        <FooterContainer /> 
      </Router>
    </div>
  );
}

export default App;
