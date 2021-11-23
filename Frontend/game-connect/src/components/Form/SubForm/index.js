import React, { useState , useEffect, useContext } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { AuthContext } from "../../../context/AuthContext";
import './SubFormElements.css';

export default function SubForm() {
    const history = useHistory();
    const [subName, setSubName] = useState('');

    const { user } = useContext(AuthContext);
    // TEST: comment previous line, uncomment next line
    //const user = "userA";

    const changeHandler = (e) => {
        setSubName(e.target.value);
    }

    const submitHandler = (e) => {
        e.preventDefault();
        if (!subName) {
            alert("subcommunity name cannot be blank");
            return
        }

        // check if subcommunity already exists

        // push new community, redirect to community page
        history.push("/community");
    }

    return(
        <>
            <div className="subForm-container">
                <form className="subForm" onSubmit={submitHandler}>
                    <div className="createSub">Create a new subreadit</div>
                    <input
                        type="text"
                        name="name"
                        value={subName}
                        onChange={changeHandler}
                        placeholder="Enter new subreadit"
                    />
                    {user !== null ?
                        <button className="subForm-button">
                            submit
                        </button> : <div className="err-msg">You need to be <Link to='/login'>logged in</Link> to post</div>
                    }
                </form>
            </div>
        </>
    );
}