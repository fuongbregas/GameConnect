import './App.css';
import {React, useRef} from 'react';
import { io } from 'socket.io-client';
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
  NotFound,
  Message,
  Game,
  GenreDisplay
} from './pages';

import { useContext } from "react";
import { AuthContext } from "./context/AuthContext";

function App() {
  const { user } = useContext(AuthContext);

  // Socket reference
  const socket = useRef();
  const ip = process.env.REACT_APP_IP;
  const link = 'ws://' + ip + ':6969';
  socket.current = io(link);

  return (
    <div className="App">
      <Router>
        <Navbar />

        <Switch>
          <Route exact path='/'><Home /></Route>
          <Route exact path='/about'><About/></Route>
          <Route path='/profile/:username'>
            <Profile/> 
          </Route>
          <Route path='/profile/'>
            {user ? <Redirect to = {"/profile/" + user}/> : <Redirect to = "/"/> }
          </Route>
          <Route exact path='/support'><Support/></Route>
          <Route exact path='/resetpass'><ResetPass/></Route>

          <Route exact path='/signin'>
            {user ? <Redirect to = "/"/> : <Signin/>}
          </Route>
          
          <Route exact path='/signup'>
            {user ? <Redirect to = "/"/> : <Signup/>} 
          </Route>

          <Route exact path='/message'>
            {user ? <Message socket = {socket}/> : <Redirect to = "/"/> }
          </Route>
          <Route exact path='/community'><Community/></Route>
          <Route path="/signoff" exact ><Signoff/></Route>
          <Route exact path='/post/:id'><Post/></Route>

          <Route exact path='/community/:id'><SubCommunity/></Route>

          <Route exact path='/postform/:id'><CreatePost/></Route>
          <Route path='/game/:gameID'><Game/></Route>

          <Route path='/genre/:genreID/:genreName'><GenreDisplay/></Route>

          <Route component={NotFound}/>
        </Switch>

        <Footer /> 
      </Router>
    </div>
  );
}

export default App;
