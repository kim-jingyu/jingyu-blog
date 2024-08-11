import styled from "styled-components";

export const HeaderContainer = styled.header`
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 10px 20px;
    background-color: #f8f9fa;
`

export const Logo = styled.a`
    font-size: 24px;
    font-weight: bold;
    color: #333;
    text-decoration: none;
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