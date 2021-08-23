import './MessageElements.css'

const Message = ({own}) => {


    return (
        
        <div className = {own ? 'message own' : 'message'}>
            <div className = 'messageTop'>
                <img className = 'messageImage'
                    src = 'https://www.jellykey.com/wp-content/uploads/jellykey-retro-tv-35-1536x1536.jpg'
                    alt = ''
                />
                <p className = 'messageText'>Yo, boi</p>
            </div>

            <div className = 'messageBottom'>
                1 second ago
            </div>
        </div>
        
    );
}

export default Message;