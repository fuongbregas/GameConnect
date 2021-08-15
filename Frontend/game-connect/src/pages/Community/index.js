import React, { useState, useEffect } from 'react';
import axios from 'axios';

export default function Community() {
  const [game, setGame] = useState('');
  const initial = true;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('/backend/game_data');
        let data = response.gameData;
        console.log("Test \n" + JSON.stringify(response));
        setGame(data.name); 
        console.log(game);
      }
      catch (err) {
        console.log(err);
      }
    };
    fetchData();
    // eslint-disable-next-line 
  }, [initial]);

  return (
    <>
      <h1 className='community'>Community Page</h1>
    </>
  );
}