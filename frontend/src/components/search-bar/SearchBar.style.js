import styled from "styled-components";

export const SearchContainer = styled.div`
    position: relative;
    display: flex;
    align-items: center;
    width: 100%;

    /* 돋보기 아이콘 */
    &::before {
        content: '';
        position: absolute;
        left: 14px;
        width: 14px;
        height: 14px;
        pointer-events: none;
        background-color: ${({ theme }) => theme.textMuted};
        -webkit-mask: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='black' stroke-width='2.5' stroke-linecap='round'%3E%3Ccircle cx='11' cy='11' r='7'/%3E%3Cpath d='m20 20-3.5-3.5'/%3E%3C/svg%3E") center / contain no-repeat;
        mask: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='black' stroke-width='2.5' stroke-linecap='round'%3E%3Ccircle cx='11' cy='11' r='7'/%3E%3Cpath d='m20 20-3.5-3.5'/%3E%3C/svg%3E") center / contain no-repeat;
    }
`;

export const SearchInput = styled.input`
    width: 100%;
    font-size: 14px;
    padding: 9px 14px 9px 36px;
    border: 1px solid ${({ theme }) => theme.border};
    border-radius: 999px;
    outline: none;
    background-color: ${({ theme }) => theme.surface};
    color: ${({ theme }) => theme.color};
    transition: border-color 0.15s ease, box-shadow 0.15s ease;

    &::placeholder {
        color: ${({ theme }) => theme.textMuted};
    }

    &:focus {
        border-color: ${({ theme }) => theme.accent};
        box-shadow: 0 0 0 3px ${({ theme }) => theme.accentSoft};
    }

    @media (max-width: 768px) {
        font-size: 16px; /* iOS 자동 확대 방지 */
    }
`;
