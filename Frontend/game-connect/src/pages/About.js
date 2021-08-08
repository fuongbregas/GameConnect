import React from 'react';
import { useContext } from "react";
import {AuthContext} from '../context/AuthContext';
export default function About() {
  const user = useContext(AuthContext);
  console.log(user);
    return(
        <>
          <h1 className='about'>About Page</h1>
          
        </>
    );
}