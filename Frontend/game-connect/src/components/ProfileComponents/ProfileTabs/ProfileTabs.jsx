import './ProfileTabs.css';
//import 'react-tabs/style/react-tabs.css';
import {React, useState, useContext} from 'react';
import {Tab, Tabs, TabList, TabPanel} from 'react-tabs';
import {AuthContext} from '../../../context/AuthContext';
const ProfileTabs = ({username}) => {
    const {user} = useContext(AuthContext);

    const [tabIndex, setTabIndex] = useState(0);
    return (
        <div>
            <Tabs selected={tabIndex} onSelect = {index => setTabIndex(index)}>
                <TabList>
                    <Tab>Posts</Tab>
                    <Tab>Comments</Tab>
                    <Tab>Saved Games</Tab>
                    {
                        user === username ? <Tab>Friends</Tab> : null
                    }
                </TabList>

                {/* Posts go here*/}
                <TabPanel>Post</TabPanel>

                {/* Comments go here */}
                <TabPanel>Comment</TabPanel>

                {/* Saved Games go here */}
                <TabPanel>Game</TabPanel>

                {/* Friend list goes here */}
                <TabPanel>Friends</TabPanel>
            </Tabs>
        </div>
        
        
    );
}

export default ProfileTabs;
