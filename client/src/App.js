import React, { useEffect, useContext } from 'react';
import './style.css';
import '../node_modules/izitoast/dist/css/iziToast.css';
import {UserProvider, UserContext} from './reducers/UserContext'

import Navbar from './components/Navbar';
import Signin from './views/Signin';
import Signup from './views/Signup';
import Profile from './views/Profile';
import Home from './views/Home';
import CreatePost from './views/CreatePost';

import {BrowserRouter, Route, useHistory, Switch} from 'react-router-dom';

//Routing component
const Routing = () => {
  const history = useHistory();
  const [user, setUser] = useContext(UserContext);

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user'));
    
    if(user) {
      setUser(user);
    }else{
      history.push('/signin');
    }
    console.log("Loaded");
  }, []);

  return (
    <Switch>
      <Route path="/" exact >
        <Home />
      </Route>

      <Route path="/signin" >
        <Signin />
      </Route>

      <Route path="/signup" >
        <Signup />
      </Route>

      <Route path="/profile" >
        <Profile />
      </Route>

      <Route path="/create-post" >
        <CreatePost />
      </Route>
    </Switch>
  )
}

function App() {
  return (
    <UserProvider>
      <BrowserRouter>
        <Navbar />
        <Routing />

      </BrowserRouter>
    </UserProvider>
  );
}

export default App;
