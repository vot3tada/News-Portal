import {$authHost, $host} from "./index";


export const posts = async ({tagId, page}) => {
    const {data} = await $host.get('post/', {headers: {
        "page" : page,
        "tagId" : tagId,
    }});
    return data;
}
export const post = async (id) => {
    const {data} = await $host.get('post/' + id)
    return data
}

export const createPost = async (formdata) => {
    const {data} = await $host.post('post/', formdata, {headers: { // formdata include title, content, image
            "Content-Type": "multipart/form-data",
        }});
    return data;
}

