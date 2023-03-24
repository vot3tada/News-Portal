import {$authHost, $host} from "./index";


export const posts = async (tagId) => {
    const {data} = await $host.get('post/', {...(tagId ? {tagId: +tagId} : {})});
    return data;
}
export const post = async (id) => {
    const {data} = await $host.get('post/' + id)
    return data
}

