import styled from "styled-components";

export const SearchContainer = styled.div`
    display: flex;
    width: 100%;
`;

export const SearchInput = styled.input`
    width: 100%;
    padding: 6px 0;
    font-size: 14px;
    border: none;
    border-bottom: 1px solid transparent;
    outline: none;
    background: transparent;
    color: ${({ theme }) => theme.color};
    transition: border-color 0.15s ease;

    &::placeholder {
        color: ${({ theme }) => theme.textMuted};
    }

    &:hover,
    &:focus {
        border-bottom-color: ${({ theme }) => theme.textMuted};
    }

    @media (max-width: 768px) {
        font-size: 16px; /* iOS 자동 확대 방지 */
        border-bottom-color: ${({ theme }) => theme.border};
    }
`;
