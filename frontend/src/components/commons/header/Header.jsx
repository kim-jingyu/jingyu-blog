import { ButtonGroup, HeaderContainer, Logo } from "./Header.style";

function Header() {
    return (
        <HeaderContainer>
            <Logo href="/">jingyu's blog</Logo>
            <ButtonGroup>
                <button>Search</button>
                <button>Theme</button>
                <button>Login</button>
            </ButtonGroup>
        </HeaderContainer>
    )
}

export default Header;