import React, {useState, useEffect, useRef} from 'react';
import {post as GetPost, posts as GetPosts} from "../http/postApi";
import {image as GetImage} from "../http/imageApi";
import {$host} from "../http";

const Posts = () => {
    const [posts, setPosts] = useState([]);
    const lastElement = useRef()

    useEffect(() => {
        GetPosts({page: 200}).then((res) => {
            setPosts([...posts, ...res])
        });
    }, [])
    return (
        <div>
            {posts.map(({id, title, content, image, userId}) => (
                <div key={id}>
                    <h1>{title}</h1>
                    <p>{content}</p>
                    {
                        image ? <img src={'http://localhost:5000/' + image}/> : ''
                    }

                </div>
            ))}
            <div ref={lastElement}></div>
        </div>
    );
};

export default Posts;


