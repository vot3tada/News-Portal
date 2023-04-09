import React, {useState, useEffect, useRef} from 'react';
import {posts as GetPosts} from "../http/postApi";
import {tags, tags as GetTags} from "../http/tagApi"
import PostCard from "../components/PostCard";
import {Card, Col, Container, Form, Row} from "react-bootstrap";

const Posts = () => {
    const [posts, setPosts] = useState([]);
    const [filteredPosts, setFilteredPosts] = useState([]);
    const [page, setPage] = useState(1);
    const [isLoad, setLoad] = useState(false);
    const lastElement = useRef();
    const observer = useRef();
    const [end, setEnd] = useState(false);
    const [tag, setTag] = useState(-1);
    const [tags, setTags] = useState([]);
    useEffect(() => {
        GetTags().then((res) => {
            setTags(res);
        });
    }, []);
    useEffect(() => {
        GetPosts({page: page}).then((res) => {
            setPosts(prev => [...prev, ...res]);
            if (res.length == 0) setEnd(true);
            setLoad(!isLoad);
        });
    }, [page])

    useEffect(() => {
        if (end) return
        if (observer.current) observer.current.disconnect();
        let callback = function (entries, observer) {
            if (entries[0].isIntersecting) {
                setPage(page + 1);
            }
        };
        observer.current = new IntersectionObserver(callback);
        observer.current.observe(lastElement.current);
    }, [isLoad])
    useEffect(() => {
        setFilteredPosts(posts.filter(post => tag != -1?post.post_tags[0].tagId == tag:post));
    }, [posts, tag])
    return (
        <Container>
            <Container>
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
            {filteredPosts.map(({id, title, content, image, userId, post_tags}) => (
                <PostCard id={id} title={title} content={content} image={image}
                          tag={tags.find(tag => tag.id == post_tags[0].tagId)?.name}/>
            ))}
            {posts &&
                <div style={{height: 20}} ref={lastElement}></div>}
        </Container>
    );
};

export default Posts;


