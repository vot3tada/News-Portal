import {$authHost, $host} from "./index";

export const tags = async () => {
    const {data} = await $host.get('tag/');
    return data;
}

export const linkTagToPost = async (tagId,postId) => {
    const {data} = await $host.post('tag/link/', {tagId,postId});
    return data;
}

export const createTag = async (name) => {
    const {data} = await $host.post('tag/', {name})
    return data
}
export const deleteTag = async (id) => {
    const {data} = await $host.delete('tag/'+id)
    return data
}