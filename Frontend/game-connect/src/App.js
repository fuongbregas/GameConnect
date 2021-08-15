import './App.css';
import {BrowserRouter as Router, Switch, Route, Redirect} from 'react-router-dom';
import { Navbar, Footer } from './components';
import { 
  Home,
  About,
  Support,
  ResetPass,
  Community,
  Signin,
  Signup,
  NotFound
} from './pages';

import { useContext } from "react";
import { AuthContext } from "./context/AuthContext";

function App() {
  const { user } = useContext(AuthContext);
  console.log("User: " + user);

  return (
    <div className="App">
      <Router>
        <Navbar />

        <Switch>
          <Route exact path='/'><Home /></Route>
          <Route exact path='/about'><About/></Route>
          <Route exact path='/community'><Community/></Route>
          <Route exact path='/support'><Support/></Route>
          <Route exact path='/resetpass'><ResetPass/></Route>

          <Route exact path='/signin'>
            {user ? <Redirect to = "/"/> : <Signin/>}
          </Route>
          
          <Route exact path='/signup'>
             {user ? <Redirect to = "/"/> : <Signup/>} 
          </Route>

          <Route component={NotFound} />
        </Switch>

        <Footer />
      </Router>
    </div>
  );
}

export default App;
