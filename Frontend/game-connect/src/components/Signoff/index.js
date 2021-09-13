import React, { useEffect, useContext } from 'react';
import { Redirect } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';
import { ResetState } from '../../context/AuthActions';

export default function Signoff() {
    const {user, dispatch} = useContext(AuthContext);

    const Logoff = () => {
      if(user !== null) dispatch(ResetState());
      if(localStorage.getItem('user') !== null) localStorage.removeItem("user");
    }

    useEffect(() => {
      Logoff();
    });
    
    return (
      <Redirect to="/" />
    );
}