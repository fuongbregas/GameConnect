import React from 'react';
import './About.css';

export default function About() {
  const handleClick = (link) => {
    window.open(link, '_blank');
  }

  return (
    <>
      <div className="about-section">
        <h1>About Us</h1>
        <p>We are guys who enjoy gaming on PC.</p>
        <p>And cringe memes</p>
      </div>
      <div className='team-container'>
        <h1 className='team'>Our team</h1>
        <div className='people-container'>

          <div className='individual'>
            <div className='individual-container'>
              <img className='individual-profilePic' src='/profile1.png' alt='' />
              <h1 className='individual-name'>Phuong Tran</h1>
              <h2 className='individual-role'>CEO (Chief Emotional Offender)</h2>
              <span className='individual-detais'>Handles external APIs, backend routes, Socket.IO, and multiple frontend components.</span>
              <button className='contact-button' onClick={() => handleClick('https://www.linkedin.com/in/fuongbregas/')}>Contact Me</button>
            </div>
          </div>

          <div className='individual'>
            <div className='individual-container'>
              <img className='individual-profilePic' src='/avatar.png' alt='' />
              <h1 className='individual-name'>Summa Cum Laude</h1>
              <h2 className='individual-role'>lul</h2>
              <span className='individual-detais'>huh</span>
              <button className='contact-button' onClick={() => handleClick('https://www.linkedin.com/in/fuongbregas/')}>Contact Me</button>
            </div>
          </div>

          <div className='individual'>
            <div className='individual-container'>
              <img className='individual-profilePic' src='/avatar.png' alt='' />
              <h1 className='individual-name'>Ligma</h1>
              <h2 className='individual-role'>Mental Support</h2>
              <span className='individual-detais'>Yikes.</span>
              <button className='contact-button' onClick={() => handleClick('https://www.linkedin.com/in/fuongbregas/')}>Contact Me</button>
            </div>
          </div>

          <div className='individual'>
            <div className='individual-container'>
              <img className='individual-profilePic' src='/avatar.png' alt='' />
              <h1 className='individual-name'>Deez</h1>
              <h2 className='individual-role'>Nutz</h2>
              <span className='individual-detais'>Lmao.</span>
              <button className='contact-button' onClick={() => handleClick('https://www.linkedin.com/in/fuongbregas/')}>Contact Me</button>
            </div>
          </div>
        </div>
      </div>

    </>
  );
}