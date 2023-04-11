import React, {useState, useEffect, useRef} from 'react';
import {myPosts as GetPosts} from "../http/postApi";
import PostCard from "../components/PostCard";
import {tags as GetTags} from "../http/tagApi";
import {Button, Card, Col, Container, Row} from "react-bootstrap";
import {useTags} from "../hooks/useTags";
import {usePosts} from "../hooks/usePosts";
import {useObserver} from "../hooks/useObserver";

const MyPosts = () => {
    const [posts, setPosts] = useState([]);
    const [page, setPage] = useState(1);
    const [isLoad, setLoad] = useState(false);
    const lastElement = useRef();
    const observer = useRef();
    const [end, setEnd] = useState(false);
    const [tags, setTags] = useState([]);

    useTags(setTags);

    usePosts(page, setPosts, setEnd, isLoad, setLoad);

    useObserver(lastElement,end,isLoad,() => setPage(page + 1))

    return (
        <div>
            {posts.map(({id, title, content, image, userId, post_tags, createdAt}) => (
                <PostCard id={id} title={title} content={content} image={image}
                          tag={tags.find(tag => tag?.id == post_tags[0]?.tagId)?.name} createdAt={createdAt}/>
            ))}
            {posts &&
                <div style={{height: 20}} ref={lastElement}></div>}
        </div>
    );
};

export default MyPosts;