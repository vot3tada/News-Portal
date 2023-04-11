import React, {useState, useEffect, useRef, useMemo} from 'react';
import {posts as GetPosts} from "../http/postApi";
import {tags, tags as GetTags} from "../http/tagApi"
import PostCard from "../components/PostCard";
import {Card, Col, Container, Form, Row} from "react-bootstrap";
import {useTags} from "../hooks/useTags";
import NotFound from "../components/NotFound";
import {usePosts} from "../hooks/usePosts";
import {useObserver} from "../hooks/useObserver";

const Posts = () => {
    const [posts, setPosts] = useState([]);
    // const [filteredPosts, setFilteredPosts] = useState([]);
    const [page, setPage] = useState(1);
    const [isLoad, setLoad] = useState(false);
    const lastElement = useRef();
    const observer = useRef();
    const [end, setEnd] = useState(false);
    const [tag, setTag] = useState(-1);
    const [tags, setTags] = useState([]);
    const [update, setUpdate] = useState(false)
    const filteredPosts = useMemo(() => {
        return posts.filter(post => tag != -1 ? post.post_tags[0].tagId == tag : post)
    }, [posts, tag])

    useTags(setTags);

    usePosts(page, setPosts, setEnd, isLoad, setLoad);

    useObserver(lastElement,end,isLoad,() => setPage(page + 1))

    useEffect(() => {
        setUpdate(!update);
    }, [filteredPosts])
    return (
        <Container>
            <Container style={{paddingTop: '10px'}}>
                <Card>
                    <Card.Body>
                        <Row>
                            <Col className={'alignCenter'}>Категории</Col>
                            <Col>
                                <Form.Select name={'Роли'} onChange={e => setTag(e.target.value)}>
                                    <option key={-1} value={-1}>Все</option>
                                    {tags.map(({id, name}) => (
                                        <option key={id} value={id}>{name}</option>
                                    ))}
                                </Form.Select>
                            </Col>
                        </Row>
                    </Card.Body>
                </Card>
            </Container>
            {filteredPosts?.map(({id, title, content, image, post_tags, createdAt}) => (
                <PostCard key={id} id={id} title={title} content={content} image={image}
                          tag={tags.find(tag => tag.id == post_tags[0].tagId)?.name} update={update}
                          createdAt={createdAt}/>
            ))}
            {posts &&
                <div style={{height: 20}} ref={lastElement}></div>}
        </Container>
    );
};

export default Posts;


