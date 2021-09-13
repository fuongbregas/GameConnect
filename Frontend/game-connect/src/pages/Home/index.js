import React from 'react';
import './Home.css';

function displayGameData() {
  axios.get('/backend/game_data').then((res) =>{

    let data = res.gameData;
    console.log("Test \n" + JSON.stringify(res));
    this.setState({game : data.name}); 
    console.log(this.state.game);
  })
  .catch((error) => {
    console.log(error);
  });
}


export default function Home() {
    return(
        <div className="home">
          <h1>First</h1>
          <h1>Home Page</h1>
          <h1>Home Page</h1>
          <h1>Home Page</h1>
          <h1>Home Page</h1>
          <h1>Home Page</h1>
          <h1>Home Page</h1>
          <h1>Home Page</h1>
          <h1>Home Page</h1>
          <h1>Home Page</h1>
          <h1>Home Page</h1>
          <h1>Home Page</h1>
          <h1>Home Page</h1>
          <h1>Home Page</h1>
          <h1>Home Page</h1>
          <h1>Home Page</h1>
          <h1>Home Page</h1>
          <h1>Home Page</h1>
          <h1>Home Page</h1>
          <h1>Home Page</h1>
          <h1>Home Page</h1>
          <h1>Home Page</h1>
          <h1>Last</h1>
        </div>
    );
}