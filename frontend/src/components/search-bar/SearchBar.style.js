import styled from "styled-components";

export const SearchContainer = styled.div`
    display: flex;
    justify-content: center;
    width: 100%;
    max-width: 800px;
    margin: 20px auto;
    padding: 0;
`;

export const SearchInput = styled.input`
    width: 100%;
    font-size: 18px;
    padding: 10px 5px;
    border: none;
    border-bottom: 2px solid #ddd;
    outline: none;
    background-color: transparent;
    transition: border-color 0.3s;
    color: deepskyblue;

    &::placeholder {
        color: #aaa;
        font-size: 16px;
    }

    &:focus {
        border-bottom: 2px solid #3498db;
    }

    @media (max-width: 768px) {
        font-size: 16px;
        padding: 8px 4px;

        &::placeholder {
            font-size: 14px;
        }
    }
`;