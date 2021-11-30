import React from 'react';
import { MessengerForm } from '../../components';

export default function Message({socket}) {
    return(
        <>
          <MessengerForm socket={socket}/>
        </>
    );
}