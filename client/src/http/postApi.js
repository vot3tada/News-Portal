import {$authHost, $host} from "./index";


export const posts = async ({tagId, page}) => {
    const {data} = await $host.get('post/', {...(tagId ? {tagId: +tagId} : {}), page});
    return data;
}
export const post = async (id) => {
    const {data} = await $host.get('post/' + id)
    return data
}

