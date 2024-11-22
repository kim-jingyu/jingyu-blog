import styled from "styled-components";

export const SearchContainer = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 10px;
    background-color: #f9f9f9;
    border-radius: 30px;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    max-width: 600px;
    margin: 0 auto;
`;

export const SearchInput = styled.input`
    flex: 1;
    padding: 10px;
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
`;

export const SearchButton = styled.button`
    padding: 10px 20px;
    font-size: 16px;
    border: transparent;
    background-color: transparent;
    cursor: pointer;
`;