import React, {useState, useEffect, useRef} from 'react';
import {smartPosts as GetSmartPosts} from "../http/postApi";
import PostCard from "../components/PostCard";

const SmartPosts = () => {
    const [posts, setPosts] = useState([]);
    const [page, setPage] = useState(1);
    const [isLoad, setLoad] = useState(false);
    const lastElement = useRef();
    const observer = useRef();
    const [end, setEnd] = useState(false);
    useEffect(() => {
        GetSmartPosts({page: page}).then((res) => {
            setPosts(prev => [...prev, ...res]);
            if (res.length == 0) setEnd(true);
            setLoad(!isLoad);
        });
    }, [page])

    useEffect(() => {
        if (end) return
        if (observer.current) observer.current.disconnect();
        let callback = function (entries, observer) {
            if (entries[0].isIntersecting) {
                setPage(page + 1);
            }
        };
        observer.current = new IntersectionObserver(callback);
        observer.current.observe(lastElement.current);
    }, [isLoad])
    return (
        <div>
            {posts.map(({id, title, content, image, userId}) => (
                <PostCard id={id} title={title} content={content} image={image}/>
            ))}
            {posts &&
                <div style={{height: 20}} ref={lastElement}></div>}
        </div>
    );
};

export default SmartPosts;