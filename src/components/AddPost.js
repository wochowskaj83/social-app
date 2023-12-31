import { useState } from 'react';
import './AddPost.css';
import axios from 'axios';
import { logDOM } from '@testing-library/react';

const AddPost = (props) => {

    const [postContent, setPostContent] = useState("");

    const addPost = (e) => {
        e.preventDefault();

        if (!postContent) {
            return;
        }

        axios.post("https://akademia108.pl/api/social-app/post/add", {
            content: postContent
        })
            .then((res) => {
                props.getPrevPosts()
                setPostContent('');

            })
            .catch((error) => {
                console.error(error);
            });
    }

    return (
        <form className="addPostForm" onSubmit={addPost}>
            <textarea placeholder="Add post..." onChangeCapture={(e) => setPostContent(e.target.value)} value={postContent}
            ></textarea>
            <button className="btn">Add</button>
        </form>
    );
};

export default AddPost;