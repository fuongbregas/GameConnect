import {React} from 'react';
import { useHistory } from 'react-router';
import './CommentContent.css';

const PostCommentContent = ({data}) => {
    const history = useHistory();

    const handleClick = (communityID, postID) => {
        history.push(`/community/${communityID}/${postID}`);
    }

    return (
        <>
            {
                data.map((each_data, index) => (
                    <div key = {index} className = 'comment' onClick={() => handleClick(each_data.community_id, each_data.post_id)}>
                        <h2 className = 'post-title'>{each_data.post_title}</h2>
                        <p className = 'comment-content'>{each_data.comment_content}</p>
                    </div>
            ))}
        </>
    );
};

export default PostCommentContent;