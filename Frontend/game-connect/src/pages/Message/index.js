import React from 'react';
import { MessengerForm } from '../../components';

export default function Message({user}) {
    return(
        <>
          <MessengerForm loginUser = {user}/>
        </>
    );
}