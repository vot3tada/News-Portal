import React, {useContext, useEffect, useState} from 'react';
import {Button, Card, Col, Container, Form, Row} from "react-bootstrap";
import {UserContext} from "../AppProviders/UserProvider";
import NotFound from "../components/NotFound";
import {changeRole} from "../http/userAPI";
import {createTag, deleteTag, tags as getTags} from "../http/tagApi";
import {useNavigate} from "react-router-dom";

const Admin = () => {
    const {user, setUser} = useContext(UserContext);
    const [login, setLogin] = useState('');
    const [role, setRole] = useState('USER');
    const [tag, setTag] = useState('');
    const [tags, setTags] = useState([])
    const [selectedTag, setSelectedTag] = useState(0);
    const [result, setResult] = useState('');
    const [reloaderTags, setReloaderTags] = useState(false);

    useEffect(() => {
        getTags().then((res) => {
            setTags(res);
            setSelectedTag(res[0].id)
        }).catch(err => console.log(err));
    }, [reloaderTags])

    const ChangeRole = () => {
        changeRole(login, role).then(() => setResult('Роль изменена успешно')).catch(err => setResult('Такого пользователя нет'));
    }
    const CreateTag = () => {
        createTag(tag).then(() => {
            setResult('Тег добавлен');
            setReloaderTags(!reloaderTags);
        }).catch(err => setResult('Тег не добавлен'));
    }
    const DeleteTag = () => {
        deleteTag(selectedTag).then(() => {
            setResult('Тег удален');
            setReloaderTags(!reloaderTags);
        }).catch(err => setResult('Тег не удален'));
    }
    if (!user || user?.role != 'ADMIN') return <NotFound/>
    return (
        <div className={'centerCreateCard'}>
            <Card style={{width: '35rem'}}>
                <Card.Body className={'Center'} style={{flexDirection: 'column'}}>
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label>Сменить роль пользователя</Form.Label>
                        <div>
                            <Container>
                                <Row>
                                    <Col>
                                        <Form.Control type="input" value={login}
                                                      onChange={e => setLogin(e.target.value)} placeholder="Логин"/>
                                    </Col>
                                    <Col>
                                        <Form.Select name={'Роли'} onChange={e => setRole(e.target.value)}>
                                            <option key={1} value={'USER'}>Читатель</option>
                                            <option key={2} value={'CREATOR'}>Редактор</option>
                                            <option key={3} value={'ADMIN'}>Админ</option>
                                        </Form.Select>
                                    </Col>
                                    <Col>
                                        <Button onClick={ChangeRole}>Назначить</Button>
                                    </Col>
                                </Row>
                            </Container>
                        </div>
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label>Добавить новый тег</Form.Label>
                        <div>
                            <Container>
                                <Row>
                                    <Col>
                                        <Form.Control type="input" placeholder="Название тега" value={tag}
                                                      onChange={e => setTag(e.target.value)}/>
                                    </Col>
                                    <Col>
                                        <Button onClick={CreateTag}>Добавить</Button>
                                    </Col>
                                </Row>
                            </Container>
                        </div>
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label>Удалить тег</Form.Label>
                        <div>
                            <Container>
                                <Row>
                                    <Col>
                                        <Form.Select name={'Роли'} onChange={e => setSelectedTag(e.target.value)}>
                                            {tags.map(({id, name}) => (
                                                <option key={id} value={id}>{name}</option>
                                            ))}
                                        </Form.Select>
                                    </Col>
                                    <Col>
                                        <Button onClick={DeleteTag}>Удалить</Button>
                                    </Col>
                                </Row>
                            </Container>
                        </div>
                    </Form.Group>
                    <Card.Subtitle style={{height: '10px'}}
                                   className={'Center mb-2 text-muted'}>{result}</Card.Subtitle>
                </Card.Body>
            </Card>

        </div>
    );
};

export default Admin;