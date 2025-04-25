import styled from "styled-components";

export const SearchContainer = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 8px;
    background-color: #f9f9f9;
    border-radius: 30px;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    max-width: 600px;
    width: 100%; /* 기본적으로 화면 너비에 맞춤 */
    margin: 0 auto;

    @media (max-width: 768px) {
        padding: 6px;
        border-radius: 20px;
    }
`;

export const SearchInput = styled.input`
    flex: 1;
    padding: 8px;
    font-size: 16px;
    border: 2px solid #ddd;
    border-radius: 20px;
    outline: none;
    transition: border-color 0.3s;

    &::placeholder {
        color: #aaa;
    }

    &:focus {
        border-color: #3498db;
    }

    @media (max-width: 768px) {
        padding: 6px;
        font-size: 14px;
    }
`;

export const SearchButton = styled.button`
    padding: 8px 14px;
    font-size: 16px;
    border: none;
    background-color: transparent;
    cursor: pointer;

    @media (max-width: 768px) {
        padding: 6px 10px;
        font-size: 14px;
    }
`;