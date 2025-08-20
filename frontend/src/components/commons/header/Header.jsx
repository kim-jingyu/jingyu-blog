import { useNavigate } from "react-router-dom";
import { Button, ButtonGroup, HeaderContainer, LogoWrapper, Logo, SearchBarWrapper } from "./Header.style";
import { useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";
import { privateApi } from "../../../apis/axiosInstance";
import { useRecoilState } from "recoil";
import { themeState } from "../../../recoils/Theme";
import SearchBar from "../../search-bar/SearchBar";

function Header() {
    const navigate = useNavigate();
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [role, setRole] = useState(null);
    const [theme, setTheme] = useRecoilState(themeState);
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

    const themeStyle = {
        backgroundColor: theme === "dark" ? "#292929" : "#fff",
        textColor: theme === "dark" ? "#fff" : "#000",
    };

    return (
        <HeaderContainer themeStyle={themeStyle}>
            <LogoWrapper>
                <Logo href="/" themeStyle={themeStyle}>
                    진규의 블로그😜
                </Logo>
                <ButtonGroup themeStyle={themeStyle}>
                    {role === "ADMIN" ? (
                        <Button onClick={clickWriteButton} themeStyle={themeStyle}>
                            Write
                        </Button>
                    ) : null}
                    {isLoggedIn ? (
                        <Button onClick={clickLogoutButton} themeStyle={themeStyle}>
                            Logout
                        </Button>
                    ) : (
                        <Button onClick={clickLoginButton} themeStyle={themeStyle}>
                            Login
                        </Button>
                    )}
                </ButtonGroup>
            </LogoWrapper>

            <SearchBarWrapper>
                <SearchBar search={search} onChange={handleSearchChange} />
            </SearchBarWrapper>
        </HeaderContainer>
    );
}

export default Header;