import styled, { css } from "styled-components";

export const HeaderContainer = styled.header`
    width: 100%;
    margin-bottom: 56px;
    border-bottom: 1px solid ${({ theme }) => theme.border};

    @media (max-width: 768px) {
        margin-bottom: 36px;
    }
`;

export const HeaderInner = styled.div`
    display: flex;
    flex-direction: column;
    gap: 8px;
    padding: 28px 0 16px;

    @media (min-width: 769px) {
        flex-direction: row;
        align-items: center;
        gap: 24px;
        padding: 40px 0 20px;
    }
`;

export const LogoWrapper = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 100%;

    @media (min-width: 769px) {
        display: contents; /* 데스크톱: 로고 | 검색 | 버튼 한 줄 배치 */
    }
`;

export const Logo = styled.a`
    font-size: 20px;
    font-weight: 700;
    letter-spacing: -0.02em;
    text-decoration: none;
    color: ${({ theme }) => theme.color};
    white-space: nowrap;

    span {
        margin-left: 4px;
    }

    @media (min-width: 769px) {
        margin-right: auto;
    }
`;

export const ButtonGroup = styled.div`
    display: flex;
    align-items: center;
    gap: 16px;

    @media (min-width: 769px) {
        order: 3;
    }
`;

export const SearchBarWrapper = styled.div`
    width: 100%;

    @media (min-width: 769px) {
        order: 2;
        width: 180px;
        flex-shrink: 0;
    }
`;

export const Button = styled.button`
    padding: 0;
    border: none;
    background: none;
    font-size: 14px;
    cursor: pointer;
    white-space: nowrap;
    color: ${({ theme }) => theme.textMuted};
    transition: color 0.15s ease;

    &:hover {
        color: ${({ theme }) => theme.color};
    }

    &:focus-visible {
        outline: 1px solid ${({ theme }) => theme.color};
        outline-offset: 4px;
    }

    ${({ $primary, theme }) => $primary && css`
        color: ${theme.color};
        font-weight: 600;
    `}
`;
