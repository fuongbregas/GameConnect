import {React} from 'react';
import { useHistory } from 'react-router';
import './CommentContent.css';

const CommentContent = ({data}) => {
    const history = useHistory();

    const handleClick = (postID) => {
        history.push(`/post/${postID}`);
    }

    return (
        <>
            {
                data.map((each_data, index) => (
                    <div key = {index} className = 'comment' onClick={() => handleClick(each_data.post_id)}>
                        <h2 className = 'post-title'>{each_data.post_title}</h2>
                        <p className = 'comment-content'>{each_data.comment_content}</p>
                    </div>
            ))}
        </>
    );
};

export default CommentContent;
