import React, {useState} from 'react';


const Post = () => {
    const [post, setPost] = useState([]);
    getPosts().then((res) => {
        setPosts(res.data)
    })
    return (
        <div>
            <h1>{post.title}</h1>
            <p>{post.content}</p>
            {
                post.image?
                    <img src={} />
                    :
                    ''
            }


        </div>
    );
};

export default Post;