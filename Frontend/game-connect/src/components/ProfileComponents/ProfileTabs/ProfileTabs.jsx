import './ProfileTabs.css';
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
            inputText.current.value = '';
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
                            <Tab>Recommended users</Tab>
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
                            <TabContent type = 'Users' username={username} URL='/backend/users/'/>
                        </div>
                    </TabPanel>
                    <TabPanel>
                        <div className="tab-container">
                            {
                            <TabContent type = 'Users' username={username} URL='/backend/users/recommend/'/>
                             }
                        </div>
                    </TabPanel> 
                    </>
                    : null
                }
                {/* Search users goes here */}
                <TabPanel>
                    <div className="tab-container">
                        <input ref={inputText} onKeyDown = {pressEnter} className = 'search-input'/>
                        <TabContent type = 'Users' username={searchInput} URL='/backend/users/search/'/>
                    </div>
                </TabPanel>
            </Tabs>
        </div>
    );
}

export default ProfileTabs;
