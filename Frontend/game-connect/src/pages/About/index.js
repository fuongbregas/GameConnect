import React from 'react';
import './About.css';

export default function About() {
    return(
      <>
        <div className="about-section">
          <h1>About Us</h1>
          <p>We are guys who enjoy gaming on PC.</p>
          <p>
            Resize the browser window to see that this page is responsive by the way.
          </p>
        </div>
        <div className = 'container'>
          <h1 className='team'>Our team</h1>
        </div>
        
      </>
    );
}