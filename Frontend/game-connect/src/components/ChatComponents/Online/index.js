import './OnlineElements.css';

const Online = () => {
    return(
        <div className="online">
            
            <div className="onlineFriend">
                <div className="onlineImageContainer">
                    <img className="onlineImage"
                        src = 'https://www.jellykey.com/wp-content/uploads/jellykey-retro-tv-35-1536x1536.jpg' 
                        alt = ''/>
                    <div className = "onlineIndicator"/>
                </div>
                <span className="onlineUsername">Poker</span>
            </div>
        </div>
    );
}

export default Online;