import { useNavigate } from "react-router-dom";
import { ButtonGroup, HeaderContainer, Logo } from "./Header.style";

function Header() {
    const navigate = useNavigate();

    const clickLoginButton = () => {
        navigate('/login');
    }

    return (
        <HeaderContainer>
            <Logo href="/">jingyu's blog</Logo>
            <ButtonGroup>
                <button>Search</button>
                <button>Theme</button>
                <button onClick={clickLoginButton}>Login</button>
            </ButtonGroup>
        </HeaderContainer>
    )
}

export default Header;