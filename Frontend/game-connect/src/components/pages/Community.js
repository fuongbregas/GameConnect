import React, { Component } from 'react';
import axios from 'axios';

class Community extends Component {
  constructor (props) {
    super(props);
    this.state = {
      game : {},
    };
  }
  
  componentDidMount() {
    axios.get('http://localhost:3001/backend/game_data').then((res) =>{

      let data = res.gameData;
      console.log("Test \n" + JSON.stringify(res));
      this.setState({game : data.name}); 
      console.log(this.state.game);
    })
    .catch((error) => {
      console.log(error);
    });
  }
  

  render() {
    return(
      <>
        <h1 className='community'>Community Page</h1>
      </>
    );
  }
    
}

export default Community;