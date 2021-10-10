import './MessageElements.css';
import {format} from 'timeago.js';
import {avatar} from './avatar.png'

const Message = ({message, own}) => {


    return (
        
        <div className = {own ? 'message own' : 'message'}>
            <div className = 'messageTop'>
                <img className = 'messageImage'
                    src = 'https://www.jellykey.com/wp-content/uploads/jellykey-retro-tv-35-1536x1536.jpg'
                    alt = ''
                />
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