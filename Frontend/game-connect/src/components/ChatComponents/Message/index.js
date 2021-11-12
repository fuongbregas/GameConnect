import './MessageElements.css';
import {format} from 'timeago.js';

const Message = ({message, own, sender}) => {
    return (
        
        <div className = {own ? 'message own' : 'message'}>
            <div className = 'messageTop'>
                <p className = 'messageText'>
                    {message.message_content}
                </p>
            </div>

            <div className = 'messageBottom'>
                {format(message.createdAt)}
            </div>
        </div>
        
    );
}

export default Message;