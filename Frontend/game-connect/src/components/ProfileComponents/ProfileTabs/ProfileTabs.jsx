import './ProfileTabs.css';
import axios from 'axios';
import {React, useState, useContext, useEffect} from 'react';
import {Tab, Tabs, TabList, TabPanel} from 'react-tabs';
import {AuthContext} from '../../../context/AuthContext';
const ProfileTabs = ({username}) => {
    const {user} = useContext(AuthContext);
    const [tabIndex, setTabIndex] = useState(0);
    const [friendList, setFriendList] = useState([]);
    const [friendCount, setFriendCount] = useState(0);

    const getFriendList = async (currentPage) => {
        const data = {
            username : user,
            pagination: 8,
            pageNumber: currentPage,
        }
        try {
            const res = await axios.post('/backend/users/friends/friends_page', data);
            setFriendList(res.data);
        }
        catch (error) {
            console.error(error);
        }
    }

    const getFriendCount = async () => {
        try {
            const res = await axios.get('/backend/users/total_friends/' + user);
            console.log(res.data);
            setFriendCount(res.data);
            await getFriendList(friendCount);
        }
        catch (error) {
            console.error(error);
        }
    }

    useEffect (() => {
        getFriendCount();
    }, []);
    console.log('Friends', friendList);
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
                {
                    user === username ? <TabPanel>Friends</TabPanel> : null
                }
            </Tabs>
        </div>
        
        
    );
}

export default ProfileTabs;
