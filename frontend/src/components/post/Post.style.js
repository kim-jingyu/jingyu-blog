import styled from "styled-components";

export const PostContainer = styled.article`
    min-width: 0;
    padding: 0;
    margin-bottom: 48px;
    cursor: pointer;
    overflow-wrap: anywhere;

    &:hover h2,
    &:focus-visible h2 {
        text-decoration: underline;
        text-decoration-thickness: 1px;
        text-underline-offset: 5px;
    }

    &:focus-visible {
        outline: none;
    }

    @media (max-width: 768px) {
        margin-bottom: 36px;
    }
`

export const Date = styled.p`
    margin: 0 0 6px;
    color: ${({ theme }) => theme.textMuted};
    font-size: 0.82rem;
    font-variant-numeric: tabular-nums;
    letter-spacing: 0.02em;
`

export const Title = styled.h2`
    margin: 0;
    font-size: 1.4rem;
    font-weight: 700;
    line-height: 1.4;
    letter-spacing: -0.02em;
    color: ${({ theme }) => theme.color};
    word-break: keep-all;
    overflow-wrap: anywhere;

    @media (max-width: 768px) {
        font-size: 1.2rem;
    }
`

export const Excerpt = styled.p`
    margin: 8px 0 0;
    font-size: 0.95rem;
    line-height: 1.7;
    color: ${({ theme }) => theme.textMuted};
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
`

export const Content = styled.p`
    font-size: 16px;
    line-height: 1.6;
`
