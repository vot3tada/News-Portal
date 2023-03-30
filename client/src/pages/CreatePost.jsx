import React, {useEffect, useState} from 'react';
import {createPost} from "../http/postApi";
import {linkTagToPost, tags as getTags} from "../http/tagApi";

const CreatePost = () => {
    const [title, setTitle] = useState('')
    const [content, setContent] = useState('')
    const [image, setImage] = useState(null)
    const [tag, setTag] = useState(2)
    const [tags, setTags] = useState([])

    useEffect(() => {
        getTags().then((res) => {
            setTags(res);
            setTag(res[0].id);
        });
    }, [])

    const Create = async () => {
        let formData = new FormData();
        formData.append('title', title);
        formData.append('content', content);
        formData.append('image', image);
        const post = await createPost(formData).catch(err => {
            console.log(err)});
        const data = await linkTagToPost(tag,post.id).catch(err => {
            console.log(err)});
    }

    return (
        <div>
            <input
                type={'input'}
                placeholder={'Название'}
                value={title}
                onChange={e => setTitle(e.target.value)}
            />
            <input
                type={'input'}
                placeholder={'Текст поста'}
                value={content}
                onChange={e => setContent(e.target.value)}
            />
            <input
                type={'file'}
                onChange={e => setImage(e.target.files[0])}
            />
            <select name={'Категории'}  onChange={e => setTag(e.target.value)}>
                {tags.map(({id, name}) => (
                    <option key={id} value={id}>{name}</option>
                ))}
            </select>
            <button onClick={Create}>Добавить новый пост</button>
        </div>
    );
};

export default CreatePost;