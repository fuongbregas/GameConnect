import React from 'react';
import './About.css';

export default function About() {
    return(
      <>
        <div className="about-section">
          <h1>About Us</h1>
          <p>We are guys who enjoy gaming on PC.</p>
          <p>
            
          </p>
        </div>
        <div className = 'team-container'>
          <h1 className='team'>Our team</h1>
          <div className='people-container'>
            
            <div className = 'individual'>
              <div className='individual-container'>
                Phuong
              </div>
            </div>

            <div className = 'individual'>
              <div className='individual-container'>
                Vig
              </div>
            </div>

            <div className = 'individual'>
              <div className='individual-container'>
                Vu
              </div>
            </div>

            <div className = 'individual'>
              <div className='individual-container'>
                Ed
              </div>
            </div>
          </div>
        </div>
        
      </>
    );
}