import React, {useEffect, useState} from 'react';
import {createPost} from "../http/postApi";
import {linkTagToPost, tags as getTags} from "../http/tagApi";
import {Card, Form, Button} from "react-bootstrap";
import '../styles/createPostCard.css'

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
            console.log(err)
        });
        const data = await linkTagToPost(tag, post.id).catch(err => {
            console.log(err)
        });
    }

    return (
        <div className={'centerCreateCard'}>
            <Card style={{width: '35rem'}}>
                <Card.Body className={'Center'} style={{flexDirection: 'column'}}>
                    <Form.Control className={'marginAll'}
                        type={'input'}
                        placeholder={'Название'}
                        value={title}
                        onChange={e => setTitle(e.target.value)}
                    />
                    <Form.Control className={'marginAll'}
                        as="textarea"
                        placeholder="Текст поста"
                        value={content}
                        style={{height: '400px'}}
                        onChange={e => setContent(e.target.value)}
                    />
                    <Form.Control accept="image/*" className={'marginAll'}
                        type={'file'}
                        onChange={e => setImage(e.target.files[0])}
                    />
                    <Form.Select name={'Категории'} onChange={e => setTag(e.target.value)} className={'marginAll'}>
                        {tags.map(({id, name}) => (
                            <option key={id} value={id}>{name}</option>
                        ))}
                    </Form.Select>
                    <Button className={'marginAll'} onClick={Create}>Добавить новый пост</Button>
                </Card.Body>
            </Card>
        </div>
    );
};

export default CreatePost;