import React, {useContext} from 'react';
import {NavLink} from "react-router-dom";
import {
    LOGIN_ROUTE,
    LOGOUT_ROUTE,
    POSTS_ROUTE,
    REGISTRATION_ROUTE,
    CREATE_POST_ROUTE,
    SMART_POSTS_ROUTE,
    MY_POSTS_ROUTE
} from "../utils/consts";
import {UserContext} from "../AppProviders/UserProvider";
import {Navbar as NavbarBoot, Container, Nav, NavDropdown, Form, Button} from "react-bootstrap";
import '../styles/Navbar.css'
import CreatePost from "../pages/CreatePost";

const Navbar = () => {
    const {user} = useContext(UserContext);
    return (
        <div>
            <NavbarBoot collapseOnSelect expand="lg" bg="light" variant="light">
                <Container>
                    <NavbarBoot.Brand><NavLink className={'Brand'} to={POSTS_ROUTE}>Новости</NavLink></NavbarBoot.Brand>
                    <NavbarBoot.Toggle aria-controls="responsive-navbar-nav"/>
                    <NavbarBoot.Collapse id="responsive-navbar-nav">
                        <Nav className="me-auto">
                            <Nav.Link>
                                {user &&
                                    <NavLink to={SMART_POSTS_ROUTE} className={'Link'}>
                                        Новости для вас
                                    </NavLink>
                                }
                            </Nav.Link>
                            <Nav.Link>
                                {(user?.role === 'ADMIN' || user?.role === 'CREATOR') &&
                                    <NavLink className={'Link'} to={CREATE_POST_ROUTE}>
                                        Добавить новость
                                    </NavLink>
                                }
                            </Nav.Link>
                            <Nav.Link>
                                {(user?.role === 'ADMIN' || user?.role === 'CREATOR') &&
                                    <NavLink className={'Link'} to={MY_POSTS_ROUTE}>
                                        Мои новости
                                    </NavLink>
                                }
                            </Nav.Link>
                            <Nav.Link>
                                {user?.role === 'ADMIN' &&
                                    <NavLink className={'Link'} to={CREATE_POST_ROUTE}>
                                        Панель администрирования
                                    </NavLink>
                                }
                            </Nav.Link>
                        </Nav>
                        <Nav>
                            {
                                user ?
                                    <Nav.Link>
                                        <NavLink className={'Link'} to={LOGOUT_ROUTE}>
                                            Выйти
                                        </NavLink>
                                    </Nav.Link>
                                    :
                                    <Nav.Link>
                                        <NavLink className={'Link'} to={LOGIN_ROUTE}>
                                            Войти
                                        </NavLink>
                                        <NavLink className={'Link'} to={REGISTRATION_ROUTE}>
                                            Регистрация
                                        </NavLink>
                                    </Nav.Link>
                            }
                        </Nav>
                    </NavbarBoot.Collapse>
                </Container>
            </NavbarBoot>
        </div>
        // <NavbarBoot bg="light" expand="lg">
        //     <Container>
        //         <NavbarBoot.Brand><NavLink className={'Brand'} to={POSTS_ROUTE}>Новости</NavLink></NavbarBoot.Brand>
        //         <NavbarBoot.Toggle aria-controls="basic-navbar-nav"/>
        //         <NavbarBoot id="basic-navbar-nav">
        //             <NavbarBoot.Collapse id="responsive-navbar-nav">
        //             <Nav className="me-auto">
        //                 <Nav.Link>
        //                     {user &&
        //                         <NavLink to={SMART_POSTS_ROUTE} className={'Link'}>
        //                             Новости для вас
        //                         </NavLink>
        //                     }
        //                 </Nav.Link>
        //                 <Nav.Link>
        //                     {(user?.role === 'ADMIN' || user?.role === 'CREATOR') &&
        //                         <NavLink className={'Link'} to={CREATE_POST_ROUTE}>
        //                             Добавить новость
        //                         </NavLink>
        //                     }
        //                 </Nav.Link>
        //                 <Nav.Link>
        //                     {(user?.role === 'ADMIN' || user?.role === 'CREATOR') &&
        //                         <NavLink className={'Link'} to={MY_POSTS_ROUTE}>
        //                             Мои новости
        //                         </NavLink>
        //                     }
        //                 </Nav.Link>
        //                 <Nav.Link>
        //                     {user?.role === 'ADMIN' &&
        //                         <NavLink className={'Link'} to={CREATE_POST_ROUTE}>
        //                             Панель администрирования
        //                         </NavLink>
        //                     }
        //                 </Nav.Link>
        //             </Nav>
        //             <Nav>
        //                 {
        //                     user ?
        //                         <div>
        //                             <Nav.Link className={'buttonLink'} to={LOGOUT_ROUTE}>
        //                                 Выйти
        //                             </Nav.Link>
        //                         </div>
        //                         :
        //                         <div>
        //                             <Nav.Link className={'buttonLink'} to={LOGIN_ROUTE}>
        //                                 Войти
        //                             </Nav.Link>
        //                             <Nav.Link className={'buttonLink'} to={REGISTRATION_ROUTE}>
        //                                 Регистрация
        //                             </Nav.Link>
        //                         </div>
        //                 }
        //             </Nav>
        //             </NavbarBoot.Collapse>
        //         </NavbarBoot>
        //     </Container>
        // </NavbarBoot>
        // <div>
        //     <div className={'Navbar'}>
        //         <div className={'navbarMargin'}>
        //             <NavLink className={'buttonLink'} to={POSTS_ROUTE}>Новости</NavLink>
        //             {user &&
        //                 <NavLink to={SMART_POSTS_ROUTE} className={'buttonLink'}>
        //                     Для вас
        //                 </NavLink>
        //             }
        //             {(user?.role === 'ADMIN' || user?.role === 'CREATOR') &&
        //                 <NavLink className={'Link'} to={CREATE_POST_ROUTE}>
        //                     Добавить новость
        //                 </NavLink>
        //             }
        //             {(user?.role === 'ADMIN' || user?.role === 'CREATOR') &&
        //                 <NavLink className={'Link'} to={MY_POSTS_ROUTE}>
        //                     Мои
        //                 </NavLink>
        //             }
        //             {user?.role === 'ADMIN' &&
        //                 <NavLink className={'Link'} to={CREATE_POST_ROUTE}>
        //                     Админка
        //                 </NavLink>
        //             }
        //         </div>
        //             {
        //                 user ?
        //                     <div className={'navbarMargin'}>
        //                         <NavLink className={'buttonLink'} to={LOGOUT_ROUTE}>
        //                             Выйти
        //                         </NavLink>
        //                     </div>
        //                     :
        //                     <div className={'navbarMargin'}>
        //                         <NavLink className={'buttonLink'} to={LOGIN_ROUTE}>
        //                             Войти
        //                         </NavLink>
        //                         <NavLink className={'buttonLink'} to={REGISTRATION_ROUTE}>
        //                             Регистрация
        //                         </NavLink>
        //                     </div>
        //             }
        //     </div>
        // </div>
    );
};

export default Navbar;

