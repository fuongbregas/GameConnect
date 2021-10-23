import './ProfileTabs.css';
//import 'react-tabs/style/react-tabs.css';
import {React, useState} from 'react';
import {Tab, Tabs, TabList, TabPanel} from 'react-tabs';

const ProfileTabs = () => {
    const [tabIndex, setTabIndex] = useState(0);
    return (
        <div>
            <Tabs selected={tabIndex} onSelect = {index => setTabIndex(index)}>
                <TabList>
                    <Tab>Posts</Tab>
                    <Tab>Comments</Tab>
                    <Tab>Saved Games</Tab>

                </TabList>

                {/* Posts go here*/}
                <TabPanel>Post</TabPanel>

                {/* Comments go here */}
                <TabPanel>Comment</TabPanel>

                {/* Saved Games go here */}
                <TabPanel>Game</TabPanel>
            </Tabs>
        </div>
        
        
    );
}

export default ProfileTabs;
