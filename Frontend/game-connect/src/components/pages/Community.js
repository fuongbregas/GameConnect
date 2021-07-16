import React, { Component } from 'react';

class Community extends Component {
  constructor (props) {
    super(props);
    this.state = {

    }
  }

  componentDidMount() {
    axios.get('/community').then((res) =>{

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