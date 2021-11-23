import React from 'react';
import './Support.css';
export default function Support() {
  const handelClick = () => {
    window.open('https://youtu.be/dQw4w9WgXcQ', '_blank');
  }

  return (
    <div className='support-bg'>
      <span className='support-message'>Contact us if you need assisstance via email</span>
      <span className='support-link' onClick = {handelClick}>Email link</span>
    </div>
  );
}