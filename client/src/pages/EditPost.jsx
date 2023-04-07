import React, {useEffect, useState} from 'react';
import {createPost, editPost} from "../http/postApi";
import {post as GetPost} from "../http/postApi";
import {linkTagToPost, tags as getTags} from "../http/tagApi";
import {Card, Form, Button} from "react-bootstrap";
import '../styles/createPostCard.css'
import {useNavigate, useParams} from "react-router-dom";
import NotFound from "../components/NotFound";
import {MY_POSTS_ROUTE, POSTS_ROUTE} from "../utils/consts";

const EditPost = () => {
    const {id} = useParams();
    const [title, setTitle] = useState('')
    const [content, setContent] = useState('')
    const [image, setImage] = useState(null)
    const [result, setResult] = useState('')
    const [post, setPost] = useState(true)
    const navigate = useNavigate()

    useEffect(() => {
        GetPost(id).then((res) => {
            setTitle(res.title)
            setContent(res.content)
        }).catch(e => {
            setPost(false);
        })
    }, [])


    const Edit = async () => {
        let formData = new FormData();
        formData.append('title', title);
        formData.append('content', content);
        formData.append('image', image);
        const post = await editPost(formData, id).then(e => {
            setResult('Отредактировано успешно')
            navigate(MY_POSTS_ROUTE)
        }).catch(err => {
            setResult(err)
            console.log(err)
        });
    }

    if (!post) return <NotFound/>
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
                    <Button className={'marginAll'} onClick={Edit}>Отредактировать</Button>
                    <div style={{height: '20px'}} className={'Center'}>{result}</div>
                </Card.Body>
            </Card>
        </div>
    );
};

export default EditPost;