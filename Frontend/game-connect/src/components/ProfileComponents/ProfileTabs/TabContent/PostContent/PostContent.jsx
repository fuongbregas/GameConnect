import {React} from 'react';
import { useHistory } from 'react-router';
import './PostContent.css';

const PostContent = ({data}) => {
    const history = useHistory();

    const handleClick = (communityID, postID) => {
        history.push(`/community/${communityID}/${postID}`);
    }

    return (
        <>
            {
                data.map((each_data, index) => (
                    <div key = {index} className = 'post' onClick={() => handleClick(each_data.community_id, each_data._id)}>
                        <p className = 'title-paragraph'>
                            <span className = 'post-karma'>{each_data.karma}</span>
                            <span className = 'postTitle'>{each_data.title}</span>
                        </p>
                        <p className = 'post-content'>{each_data.post_content}</p>
                    </div>
            ))}
        </>
    );
}

export default PostContent;