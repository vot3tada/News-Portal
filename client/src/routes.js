import {
    ADMIN_ROUTE,
    POSTS_ROUTE,
    POST_ROUTE,
    LOGIN_ROUTE,
    REGISTRATION_ROUTE,
    CREATE_POST_ROUTE,
    LOGOUT_ROUTE
} from "./utils/consts";
import Admin from "./pages/Admin";
import Posts from "./pages/Posts";
import Post from "./pages/Post";
import Auth from "./pages/Auth";
import CreatePost from "./pages/CreatePost";
import {logout} from "./http/userAPI";
import Logout from "./pages/Logout";

export const authRoutes = [
    {
        path: ADMIN_ROUTE,
        Component: Admin
    },
    {
        path: CREATE_POST_ROUTE,
        Component: CreatePost
    }
]

export const publicRoutes = [
    {
        path: POSTS_ROUTE,
        Component: Posts
    },
    {
        path: POST_ROUTE + '/:id',
        Component: Post
    },
    {
        path: LOGIN_ROUTE,
        Component: Auth
    },
    {
        path: REGISTRATION_ROUTE,
        Component: Auth
    },
    {
        path: LOGOUT_ROUTE,
        Component: Logout
    },
]