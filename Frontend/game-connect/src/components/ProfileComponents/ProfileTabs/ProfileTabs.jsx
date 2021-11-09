import './ProfileTabs.css';
import axios from 'axios';
import {React, useState, useContext, useEffect} from 'react';
import {Tab, Tabs, TabList, TabPanel} from 'react-tabs';
import {AuthContext} from '../../../context/AuthContext';
import TabContent from './TabContent/TabContent';
const ProfileTabs = ({username}) => {
    const {user} = useContext(AuthContext);
    const [tabIndex, setTabIndex] = useState(0);

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
                        <div className="tab-container">Games</div>
                    </TabPanel>
                    <TabPanel>
                        <div className="tab-container">
                            <TabContent type = 'Friends' username={username} URL='/backend/users/'/>
                        </div>
                    </TabPanel> 
                    </>
                    : null
                }
            </Tabs>
        </div>
    );
}

export default ProfileTabs;
