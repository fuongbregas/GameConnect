import './App.css';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import {BrowserRouter as Router, Switch, Route, Redirect} from 'react-router-dom';

// import Home from './pages/Home';
// import About from './pages/About';
// import Community from './pages/Community';
// import Support from './pages/Support';
// import Signin from './pages/Signin';
// import TeamMembers from './pages/TeamMembers';
// import Privacy from './pages/Privacy';
// import Terms from './pages/Terms';
// import Forgot from './pages/Forgot';
// import Signup from './pages/Signup';
// import NotFound from './pages/NotFound';

import { useContext } from "react";
import { AuthContext } from "./context/AuthContext";

function App() {
  const { user } = useContext(AuthContext);
  console.log("User: " + user);

  return (
    <div className="App">
      <Router>
        <Navbar />

        {/* <Switch>
          <Route exact path='/'>
            {user ? <Home/> : <Signup/>}
          </Route>

          <Route path='/about'> <About/> </Route>
          <Route path='/community'> <Community/> </Route>
          <Route path='/support'> <Support/> </Route>

          <Route path='/signin'>
            {user ? <Redirect to = "/"/> : <Signin/>}
          </Route>
          
          <Route path='/team'> <TeamMembers/> </Route>

          <Route path='/privacy'> <Privacy/> </Route>
          <Route path='/terms'> <Terms/> </Route>
          <Route path='/forgot'> <Forgot/> </Route>
          <Route path='/signup'>
             {user ? <Redirect to = "/"/> : <Signup/>} 
          </Route>
          <Route component={NotFound} />
        </Switch> */}

        <Footer />
      </Router>
    </div>
  );
}

export default App;
