import styled from "styled-components";

export const PostContainer = styled.article`
    padding: 22px 20px;
    margin: 0 -20px;
    border-radius: ${({ theme }) => theme.radius};
    cursor: pointer;
    transition: background-color 0.15s ease;

    & + & {
        border-top: 1px solid ${({ theme }) => theme.border};
    }

    &:hover,
    &:focus-visible {
        background-color: ${({ theme }) => theme.surface};
        outline: none;
    }

    &:hover + &,
    &:focus-visible + & {
        border-top-color: transparent;
    }

    &:hover h2 {
        color: ${({ theme }) => theme.accent};
    }

    @media (max-width: 768px) {
        padding: 18px 12px;
        margin: 0 -12px;
    }
`

export const Title = styled.h2`
    font-size: 1.25rem;
    font-weight: 700;
    line-height: 1.4;
    letter-spacing: -0.01em;
    margin: 0;
    color: ${({ theme }) => theme.color};
    transition: color 0.15s ease;
    word-break: keep-all;
    overflow-wrap: anywhere;
`

export const Excerpt = styled.p`
    margin: 8px 0 0;
    font-size: 0.95rem;
    line-height: 1.6;
    color: ${({ theme }) => theme.textMuted};
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
`

export const Date = styled.p`
    margin: 10px 0 0;
    color: ${({ theme }) => theme.textMuted};
    font-size: 0.82rem;
    font-variant-numeric: tabular-nums;
`

export const Content = styled.p`
    font-size: 16px;
    line-height: 1.6;
`
