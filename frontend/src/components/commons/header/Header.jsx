import { useNavigate } from "react-router-dom";
import { Button, ButtonGroup, HeaderContainer, HeaderInner, LogoWrapper, Logo, SearchBarWrapper } from "./Header.style";
import { useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";
import { privateApi } from "../../../apis/axiosInstance";
import SearchBar from "../../search-bar/SearchBar";

function Header() {
    const navigate = useNavigate();
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [role, setRole] = useState(null);
    const [search, setSearch] = useState("");

    useEffect(() => {
        const token = localStorage.getItem("accessToken");
        if (token) {
            try {
                const decodedToken = jwtDecode(token);
                setIsLoggedIn(true);
                setRole(decodedToken.role);
            } catch (error) {
                console.error("토큰 디코딩 에러:", error);
            }
        }
    }, []);

    const clickLoginButton = () => {
        navigate("/login");
    };

    const clickWriteButton = () => {
        navigate("/post/write");
    };

    const clickLogoutButton = async () => {
        const apiEndpoint = role === "ADMIN" ? "/admin/logout" : "/logout";
        try {
            await privateApi.post(apiEndpoint)
        } catch (error) {
            console.error("로그아웃 에러: ", error);
        } finally {
            localStorage.removeItem("accessToken");
            setIsLoggedIn(false);
            setRole(null);
            navigate("/");
        }
    };

    const handleSearchChange = (e) => {
        setSearch(e.target.value);
    };

    return (
        <HeaderContainer>
            <HeaderInner>
                <LogoWrapper>
                    <Logo href="/">
                        진규의 블로그<span aria-hidden="true">😜</span>
                    </Logo>
                    <ButtonGroup>
                        {role === "ADMIN" ? (
                            <Button $primary onClick={clickWriteButton}>
                                글쓰기
                            </Button>
                        ) : null}
                        {isLoggedIn ? (
                            <Button onClick={clickLogoutButton}>
                                로그아웃
                            </Button>
                        ) : (
                            <Button onClick={clickLoginButton}>
                                로그인
                            </Button>
                        )}
                    </ButtonGroup>
                </LogoWrapper>

                <SearchBarWrapper>
                    <SearchBar search={search} onChange={handleSearchChange} />
                </SearchBarWrapper>
            </HeaderInner>
        </HeaderContainer>
    );
}

export default Header;