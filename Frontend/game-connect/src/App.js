import './App.css';
import Navbar from './components/Navbar/Navbar';
import {FooterContainer} from './containers/footer';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import Home from './components/pages/Home';
import About from './components/pages/About';
import Community from './components/pages/Community';
import Support from './components/pages/Support';
import NotFound from './components/pages/NotFound';
import Login from './components/pages/Login';

function App() {
  return (
    <div className="App">
      <Router>
        <Navbar />

        <Switch>
          <Route path='/' exact component={Home} />
          <Route path='/about' exact component={About} />
          <Route path='/community' exact component={Community} />
          <Route path='/support' exact component={Support} />
          <Route path='/login' exact component={Login} />
          <Route component={NotFound} />
        </Switch>

        <FooterContainer /> 
      </Router>
    </div>
  );
}

export default App;
