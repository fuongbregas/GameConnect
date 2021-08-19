import React from 'react';

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
        <>
          <h1 className='home'>Home Page</h1>
        </>
    );
}