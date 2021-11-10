import './ProfileTabs.css';
import axios from 'axios';
import {React, useState, useContext, useRef} from 'react';
import {Tab, Tabs, TabList, TabPanel} from 'react-tabs';
import {AuthContext} from '../../../context/AuthContext';
import TabContent from './TabContent/TabContent';
const ProfileTabs = ({username}) => {
    const {user} = useContext(AuthContext);
    const [tabIndex, setTabIndex] = useState(0);
    const [searchInput, setSearchInput] = useState('');
    const inputText = useRef();

    // When enter is pressed
    const pressEnter = (event) => {
        if (event.key === 'Enter') {
            event.preventDefault();
            setSearchInput(inputText.current.value);
        }
    }

    return (
        <div >
            <Tabs selected={tabIndex} onSelect = {index => setTabIndex(index)}>
                <TabList>
                    <Tab>Posts</Tab>
                    <Tab>Comments</Tab>
                    {
                        user === username ? 
                        <>
                            <Tab>Saved Games</Tab>
                            <Tab>Friends</Tab>
                        </> : null
                    }
                    <Tab>Search users</Tab>
                </TabList>

                {/* Posts go here*/}
                <TabPanel>
                    <div className="tab-container">Posts</div>
                </TabPanel>

                {/* Comments go here */}
                <TabPanel>
                    <div className="tab-container">Comment</div>
                </TabPanel>

                {/* Friend list goes here */}
                {
                    user === username ?
                    <>
                    <TabPanel>
                        <div className="tab-container">
                            <TabContent type = 'Games' username={username} URL='/backend/savedGames/'/>
                        </div>
                    </TabPanel>
                    <TabPanel>
                        <div className="tab-container">
                            <TabContent type = 'Friends' username={username} URL='/backend/users/'/>
                        </div>
                    </TabPanel> 
                    </>
                    : null
                }
                <TabPanel>
                    <div className="tab-container">
                        <input ref={inputText} onKeyDown = {pressEnter} className = 'search-input'/>
                    </div>
                </TabPanel>
            </Tabs>
        </div>
    );
}

export default ProfileTabs;
