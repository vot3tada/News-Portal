import React, {useEffect, useState} from 'react';
import axios from "axios";
import {server} from '../env'
import {POSTS_ROUTE} from "../utils/consts";

const Posts = () => {
    const [posts, setPosts] = useState([]);

    useEffect(() => {
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
    }, []);

    return (posts.map(({title, content}) => (
        <div>
            <h1>{title}</h1>
            <p>{content}</p>
        </div>

    )));
};

export default Posts;