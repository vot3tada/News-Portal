import React, {useState, useEffect, useRef} from 'react';
import {smartPosts as GetSmartPosts} from "../http/postApi";
import PostCard from "../components/PostCard";
import {tags as GetTags} from "../http/tagApi";
import NotFound from "../components/NotFound";
import {usePosts} from "../hooks/usePosts";
import {useObserver} from "../hooks/useObserver";

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

    useObserver(lastElement,end,isLoad,() => setPage(page + 1))
    
    return (
        <div>
            {posts?.map(({id, title, content, image, userId, tags, createdAt}) => (
                <PostCard id={id} title={title} content={content} image={image}
                          tag={tags[0].name} createdAt={createdAt}/>
            ))}
            {posts &&
                <div style={{height: 20}} ref={lastElement}></div>}
        </div>
    );
};

export default SmartPosts;