import React, {useState, useEffect} from 'react';
import {posts as GetPosts} from "../http/postApi";
import {image as GetImage} from "../http/imageApi";
import {$host} from "../http";

const Posts = () => {
    const [posts, setPosts] = useState([]);
    GetPosts().then((res) => {
        setPosts(res)});





    /*    useEffect(() => {
        axios
            .get(server + POSTS_ROUTE, {
                headers: {
                    Authorization: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MiwibG9naW4iOiJ1c2VyIiwicm9sZSI6IlVTRVIiLCJpYXQiOjE2Nzk0MTc2NDgsImV4cCI6MTY3OTUwNDA0OH0.rkrMJUqZnxck1pxHeDNjywGhDn_RDMV0ob_WeX2wiEM'
                }
            })
            .then((res) => {
                setPosts(res.data)
            })
            .catch((err) => {
                console.log(err)
            });
    }, []);*/

    return (posts.map(({id, title, content,image, userId}) => (
        <div key = {id}>
            <h1>{title}</h1>
            <p>{content}</p>
            {
                image? <img src={'http://localhost:5000/'+image}/> :''
            }

        </div>

    )));
};

export default Posts;


