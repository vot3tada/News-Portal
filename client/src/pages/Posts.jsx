import React, {useState, useEffect, useRef} from 'react';
import {post as GetPost, posts as GetPosts} from "../http/postApi";
import {image as GetImage} from "../http/imageApi";
import {$host} from "../http";

const Posts = () => {
    const [posts, setPosts] = useState([]);
    const [page, setPage] = useState(1);
    const [isLoad, setLoad] = useState(false);
    const lastElement = useRef();
    const observer = useRef();
    const [end, setEnd] = useState(false);

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
            {posts.map(({id, title, content, image, userId}) => (
                <div key={id}>
                    <h1>{title}</h1>
                    <p>{content}</p>
                    {
                        image ? <img src={'http://localhost:5000/' + image}/> : ''
                    }

                </div>
            ))}
            {posts &&
                <div style={{height: 20}} ref={lastElement}></div>}
        </div>
    );
};

export default Posts;


