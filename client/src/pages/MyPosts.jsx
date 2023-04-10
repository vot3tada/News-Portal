import React, {useState, useEffect, useRef} from 'react';
import {myPosts as GetPosts} from "../http/postApi";
import PostCard from "../components/PostCard";
import {tags as GetTags} from "../http/tagApi";
import {Button, Card, Col, Container, Row} from "react-bootstrap";

const MyPosts = () => {
    const [posts, setPosts] = useState([]);
    const [page, setPage] = useState(1);
    const [isLoad, setLoad] = useState(false);
    const lastElement = useRef();
    const observer = useRef();
    const [end, setEnd] = useState(false);
    const [tags, setTags] = useState([]);
    useEffect(() => {
        GetTags().then((res) => {
            setTags(res);
        });
    }, []);

    useEffect(() => {
        GetPosts({page: page}).then((res) => {
            setPosts(prev => [...prev, ...res]);
            if (res.length == 0) setEnd(true);
            setLoad(!isLoad);
        });
    }, [page])

    useEffect( () => {
        if (end) return
        if (observer.current) observer.current.disconnect();
        let callback = function (entries, observer) {
            if(entries[0].isIntersecting) {
                setPage(page + 1);
            }
        };
        observer.current = new IntersectionObserver(callback);
        observer.current.observe(lastElement.current);
    }, [isLoad])
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