import GoogleLoginCallback from '../components/login/google/GoogleCallBack';
import KakaoLoginCallback from '../components/login/kakao/KakaoCallBack';
import Post from '../pages/post/Post';
import NotFound from '../pages/error/NotFound';
import Login from '../pages/login/Login';
import MainList from '../pages/main-list/MainList'
import PostDetail from '../pages/post/PostDetail';

const PAGE = {
    MainList,
    Login,
    GoogleLoginCallback,
    KakaoLoginCallback,
    Post,
    PostDetail,
    NotFound
};

export default PAGE;