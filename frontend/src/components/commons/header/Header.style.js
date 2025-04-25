import styled from "styled-components";

export const HeaderContainer = styled.header`
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 20px;
    margin-bottom: 20px;

    @media (min-width: 769px) {
        flex-direction: row;
        justify-content: space-between;
        margin: 20px;
        padding: 20px 30px;
    }
`;

export const LogoWrapper = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 100%;

    @media (min-width: 769px) {
        justify-content: flex-start;
    }
`;

export const Logo = styled.a`
    font-size: 24px;
    font-weight: bold;
    text-decoration: none;
    margin-right: 20px;
    background-color: ${({ themeStyle }) => themeStyle.backgroundColor};
    color: ${({ themeStyle }) => themeStyle.textColor};

    @media (max-width: 768px) {
        font-size: 20px;
    }
`;

export const ButtonGroup = styled.div`
    display: flex;
    align-items: center;

    & > button {
        margin-left: 15px;
        cursor: pointer;
        border: none;
    }

    @media (max-width: 768px) {
        flex-wrap: nowrap;
        & > button {
            margin-left: 10px;
        }
    }
`;

export const SearchBarWrapper = styled.div`
    margin-top: 10px;
    width: 100%; /* SearchBar가 전체 너비를 차지하도록 설정 */

    @media (min-width: 769px) {
        margin-top: 0;
        width: auto; /* 큰 화면에서는 기본 설정으로 복구 */
    }
`;

export const Button = styled.button`
    background-color: ${({ themeStyle }) => themeStyle.backgroundColor};
    color: ${({ themeStyle }) => themeStyle.textColor};
    padding: 10px 15px;
    border-radius: 5px;

    @media (max-width: 768px) {
        padding: 8px 12px;
        font-size: 14px;
    }
`;