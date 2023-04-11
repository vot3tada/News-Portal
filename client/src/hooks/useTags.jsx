import {useEffect} from "react";
import {tags as GetTags} from "../http/tagApi";

export const useTags = (setTags) => {
    useEffect(() => {
        GetTags().then((res) => {
            setTags(res);
        });
    }, []);
}