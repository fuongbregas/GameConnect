import './App.css';
import {BrowserRouter as Router, Switch, Route, Redirect} from 'react-router-dom';
import { Navbar, Footer, Signoff } from './components';
import { 
  Home,
  Community,
  About,
  Profile,
  Support,
  ResetPass,
  Signin,
  Signup,
  NotFound
} from './pages';

import { useContext, useState, useEffect } from "react";
import { AuthContext } from "./context/AuthContext";

function App() {
  const { user } = useContext(AuthContext);
  console.log("User: " + user);

  const [scrollPosition, setScrollPosition] = useState(0);
  const [visibility, setVisibility] = useState({
      showNavBar: true,
      showFooter: false
  });
  const handleScroll = () => {
      const position = window.pageYOffset;
      setVisibility({
          showNavBar: (position === 0),
          showFooter: (document.body.getBoundingClientRect().bottom <= window.innerHeight)
      });
      setScrollPosition(position);
      console.log(visibility);
  };

  useEffect(() => {
      window.addEventListener('scroll', handleScroll, { passive: true });

      return () => {
          window.removeEventListener('scroll', handleScroll);
      };
      // eslint-disable-next-line
  }, [scrollPosition]);

  return (
    <div className="App">
      <Router>
        <Navbar visibility={visibility.showNavBar} />

        <Switch>
          <Route exact path='/'><Home /></Route>
          <Route exact path='/about'><About/></Route>
          <Route exact path='/community'><Community/></Route>
          <Route exact path='/profile'><Profile/></Route>
          <Route exact path='/support'><Support/></Route>
          <Route exact path='/resetpass'><ResetPass/></Route>

          <Route exact path='/signin'>
            {user ? <Redirect to = "/"/> : <Signin/>}
          </Route>
          
          <Route exact path='/signup'>
             {user ? <Redirect to = "/"/> : <Signup/>} 
          </Route>

          <Route path="/signoff" exact ><Signoff/></Route>
          <Route component={NotFound} />
        </Switch>

        <Footer visibility={visibility.showFooter} />
      </Router>
    </div>
  );
}

export default App;
