import styled, { css } from "styled-components";

export const HeaderContainer = styled.header`
    position: sticky;
    top: 0;
    z-index: 100;
    width: 100%;
    margin-bottom: 32px;
    background-color: ${({ theme }) => theme.isDark ? 'rgba(22, 24, 29, 0.85)' : 'rgba(255, 255, 255, 0.85)'};
    backdrop-filter: saturate(180%) blur(12px);
    -webkit-backdrop-filter: saturate(180%) blur(12px);
    border-bottom: 1px solid ${({ theme }) => theme.border};
`;

export const HeaderInner = styled.div`
    display: flex;
    flex-direction: column;
    gap: 12px;
    padding: 14px 0;

    @media (min-width: 769px) {
        flex-direction: row;
        align-items: center;
        justify-content: space-between;
        gap: 24px;
        padding: 16px 0;
    }
`;

export const LogoWrapper = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 100%;

    @media (min-width: 769px) {
        width: auto;
        flex: 1;
        gap: 24px;
    }
`;

export const Logo = styled.a`
    font-size: 22px;
    font-weight: 800;
    letter-spacing: -0.02em;
    text-decoration: none;
    color: ${({ theme }) => theme.color};
    white-space: nowrap;
    transition: opacity 0.15s ease;

    span {
        margin-left: 4px;
    }

    &:hover {
        opacity: 0.8;
    }

    @media (max-width: 768px) {
        font-size: 19px;
    }
`;

export const ButtonGroup = styled.div`
    display: flex;
    align-items: center;
    gap: 8px;

    @media (min-width: 769px) {
        order: 2;
        margin-left: auto;
    }
`;

export const SearchBarWrapper = styled.div`
    width: 100%;

    @media (min-width: 769px) {
        width: 280px;
        flex-shrink: 0;
    }
`;

export const Button = styled.button`
    padding: 8px 14px;
    font-size: 14px;
    font-weight: 600;
    border-radius: 999px;
    cursor: pointer;
    white-space: nowrap;
    transition: background-color 0.15s ease, border-color 0.15s ease, color 0.15s ease;
    background-color: transparent;
    color: ${({ theme }) => theme.color};
    border: 1px solid ${({ theme }) => theme.border};

    &:hover {
        background-color: ${({ theme }) => theme.surfaceAlt};
    }

    &:focus-visible {
        outline: 2px solid ${({ theme }) => theme.accent};
        outline-offset: 2px;
    }

    ${({ $primary, theme }) => $primary && css`
        background-color: ${theme.accent};
        border-color: ${theme.accent};
        color: #fff;

        &:hover {
            background-color: ${theme.accent};
            filter: brightness(1.08);
        }
    `}

    @media (max-width: 768px) {
        padding: 7px 12px;
        font-size: 13px;
    }
`;
