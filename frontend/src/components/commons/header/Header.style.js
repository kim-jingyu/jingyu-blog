import styled from "styled-components";

export const HeaderContainer = styled.header`
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 10px 20px;
    margin: 20px;
`

export const Logo = styled.a`
    font-size: 24px;
    font-weight: bold;
    text-decoration: none;
    background-color: ${({ themeStyle }) => themeStyle.backgroundColor};
    color: ${({ themeStyle }) => themeStyle.textColor};
`

export const ButtonGroup = styled.div`
    display: flex;
    align-items: center;

    & > button {
        margin-left: 15px;
        cursor: pointer;
        border: none;
    }
`

export const Button = styled.button`
    background-color: ${({ themeStyle }) => themeStyle.backgroundColor};
    color: ${({ themeStyle }) => themeStyle.textColor};
`