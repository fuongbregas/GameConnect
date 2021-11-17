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
  Post,
  SubCommunity,
  CreatePost,
  CreateSub,
  NotFound,
  Message,
  ProfileImage,
  Game,
} from './pages';

import { useContext } from "react";
import { AuthContext } from "./context/AuthContext";

function App() {
  const { user } = useContext(AuthContext);

  return (
    <div className="App">
      <Router>
        <Navbar />

        <Switch>
          <Route exact path='/'><Home /></Route>
          <Route exact path='/about'><About/></Route>
          <Route exact path='/community'><Community/></Route>
          <Route path='/profile/:username'>
            <Profile/> 
          </Route>
          <Route exact path='/support'><Support/></Route>
          <Route exact path='/resetpass'><ResetPass/></Route>

          <Route exact path='/signin'>
            {user ? <Redirect to = "/"/> : <Signin/>}
          </Route>
          
          <Route exact path='/signup'>
            {user ? <Redirect to = "/"/> : <Signup/>} 
          </Route>

          <Route path="/signoff" exact ><Signoff/></Route>

          <Route exact path='/message'>
            {user ? <Message/> : <Redirect to = "/"/> }
          </Route>

          <Route exact path='/post/:id'><Post/></Route>

          <Route exact path='/sub/:id'><SubCommunity/></Route>

          <Route exact path='/postform'><CreatePost/></Route>

          <Route exact path='/subform'><CreateSub/></Route>
          
          <Route path = '/profile_image'>
            {user ?  <ProfileImage/> : <Redirect to = "/"/>} 
          </Route>
          
          <Route path='/game/:gameID'><Game/></Route>

          <Route component={NotFound}/>
        </Switch>

        <Footer /> 
      </Router>
    </div>
  );
}

export default App;
