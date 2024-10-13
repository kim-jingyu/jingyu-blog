import { useNavigate } from "react-router-dom";
import { ButtonGroup, HeaderContainer, Logo } from "./Header.style";
import { useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";
import { privateApi } from "../../../apis/axiosInstance";

function Header() {
    const navigate = useNavigate();
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [role, setRole] = useState(null);

    useEffect(() => {
        const token = localStorage.getItem('accessToken');
        if (token) {
            try {
                const decodedToken = jwtDecode(token);
                setIsLoggedIn(true);
                setRole(decodedToken.role);
            } catch (error) {
                console.error("토큰 디코딩 에러:", error);
            }
        }
    })

    const clickLoginButton = () => {
        navigate('/login');
    }

    const clickWriteButton = () => {
        navigate('/post/write');
    }

    const clickLogoutButton = () => {
        const apiEndpoint = role === 'ADMIN' ? '/admin/logout' : '/logout';
        privateApi.post(apiEndpoint)
            .then(() => {
                localStorage.removeItem('accessToken');
                setIsLoggedIn(false);
                setRole(null);
                navigate('/');
            })
            .catch(error => {
                console.error("로그아웃 에러: ", error);
            });
    }

    return (
        <HeaderContainer>
            <Logo href="/">jingyu's blog</Logo>
            <ButtonGroup>
                <button>Search</button>
                <button>Theme</button>
                {role === 'ADMIN' ? <button onClick={clickWriteButton}>Write</button> : null}
                {isLoggedIn ? (
                    <button onClick={clickLogoutButton}>
                        Logout
                    </button>
                ) : (
                    <button onClick={clickLoginButton}>
                        Login
                    </button>
                )}
            </ButtonGroup>
        </HeaderContainer>
    )
}

export default Header;