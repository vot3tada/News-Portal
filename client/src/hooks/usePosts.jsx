import {useEffect} from "react";
import {posts as GetPosts, smartPosts as GetSmartPosts} from "../http/postApi";

export const usePosts = (page, setPosts, setEnd, isLoad, setLoad) => {
    useEffect(() => {
        GetPosts({page: page}).then((res) => {
            setPosts(prev => [...prev, ...res]);
            if (res.length == 0) setEnd(true);
            setLoad(!isLoad);
        });
    }, [page])
}