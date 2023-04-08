import {$authHost, $host} from "./index";


export const posts = async ({tagId, page}) => {
    const {data} = await $host.get('post/', {
        headers: {
            "page": page,
            "tagId": tagId,
        }
    });
    return data;
}

export const smartPosts = async ({page}) => {
    const {data} = await $host.get('post/smart/', {
        headers: {
            "page": page,
        }
    });
    return data
}

export const myPosts = async ({page}) => {
    const {data} = await $host.get('post/my/', {
        headers: {
            "page": page,
        }
    });
    return data
}

export const post = async (id) => {
    const {data} = await $host.get('post/' + id)
    return data
}

export const createPost = async (formdata) => {
    const {data} = await $host.post('post/', formdata, {
        headers: { // formdata include title, content, image
            "Content-Type": "multipart/form-data",
        }
    });
    return data;
}

export const editPost = async (formdata, id) => {
    const {data} = await $host.put('post/' + id, formdata, {
        headers: { // formdata include title, content, image
            "Content-Type": "multipart/form-data",
        }
    });
    return data;
}

export const deletePost = async (id) => {
    const {data} = await $host.delete('post/' + id)
    return data
}

export const setLike = async (id) => {
    const {data} = await $host.post('post/like/'+id)
    return data
}
export const getLike = async (id) => {
    const {data} = await $host.get('post/like/'+id)
    return data
}

