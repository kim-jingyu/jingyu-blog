import MDEditor from '@uiw/react-md-editor';
import styled, { css } from 'styled-components';

export const PostDetailContainer = styled.div`
    display: flex;
    justify-content: center;
    width: 100%;
    padding: 48px 20px 96px;

    @media (max-width: 768px) {
        padding: 24px 16px 64px;
        overflow-x: hidden;
    }
`;

export const PostContainer = styled.article`
    display: flex;
    flex-direction: column;
    width: 100%;
    max-width: ${({ theme }) => theme.maxWidth};
    min-width: 0;
`;

export const StatusText = styled.p`
    width: 100%;
    text-align: center;
    padding: 120px 20px;
    color: ${({ theme }) => theme.textMuted};
`;

export const BackLink = styled.a`
    align-self: flex-start;
    margin-bottom: 48px;
    font-size: 0.85rem;
    color: ${({ theme }) => theme.textMuted};
    text-decoration: none;
    transition: color 0.15s ease;

    &:hover {
        color: ${({ theme }) => theme.color};
    }
`;

export const PostHeader = styled.header`
    margin-bottom: 48px;
`;

export const Title = styled.h1`
    margin: 0;
    font-size: 2rem;
    font-weight: 700;
    line-height: 1.35;
    letter-spacing: -0.025em;
    word-break: keep-all;
    overflow-wrap: anywhere;

    @media (max-width: 768px) {
        font-size: 1.6rem;
    }
`;

export const MetaRow = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 12px;
    margin-bottom: 10px;
`;

export const DateInfo = styled.time`
    font-size: 0.85rem;
    font-variant-numeric: tabular-nums;
    letter-spacing: 0.02em;
    color: ${({ theme }) => theme.textMuted};
`;

export const AdminActions = styled.div`
    display: flex;
    gap: 14px;
`;

const ghostButton = css`
    padding: 0;
    border: none;
    background: none;
    font-size: 0.85rem;
    cursor: pointer;
    color: ${({ theme }) => theme.textMuted};
    transition: color 0.15s ease;

    &:hover {
        color: ${({ theme }) => theme.color};
    }

    &:focus-visible {
        outline: 2px solid ${({ theme }) => theme.accent};
        outline-offset: 2px;
    }
`;

export const AdminEditButton = styled.button`
    ${ghostButton}

    ${({ $danger, theme }) => $danger && css`
        &:hover {
            color: ${theme.danger};
        }
    `}
`;

export const HashtagList = styled.div`
    display: flex;
    flex-wrap: wrap;
    gap: 4px 12px;
    margin-top: 14px;
`;

export const HashtagItem = styled.span`
    font-size: 0.88rem;
    color: ${({ theme }) => theme.textMuted};
`;

export const TocBox = styled.nav`
    margin-bottom: 48px;
    padding: 2px 0 2px 18px;
    border-left: 1px solid ${({ theme }) => theme.border};

    ul {
        list-style: none;
        padding: 0;
        margin: 0;
    }
`;

export const TocTitle = styled.div`
    margin-bottom: 8px;
    font-size: 0.8rem;
    font-weight: 600;
    color: ${({ theme }) => theme.color};
`;

export const TocItem = styled.li`
    padding: 3px 0 3px ${({ $level }) => ($level - 1) * 14}px;
    font-size: 0.88rem;
    line-height: 1.5;
    cursor: pointer;
    color: ${({ theme }) => theme.textMuted};
    transition: color 0.15s ease;

    &:hover {
        color: ${({ theme }) => theme.color};
    }
`;

export const StyledMarkdown = styled(MDEditor.Markdown)`
    h1, h2, h3, h4, h5, h6 {
        scroll-margin-top: 80px;
        letter-spacing: -0.015em;
    }

    table {
        display: table;
        width: 100%;
        border-collapse: collapse;
        margin: 1.2em 0;
        border-radius: ${({ theme }) => theme.radiusSm};
        overflow: hidden;
    }
    th, td {
        border: 1px solid ${({ theme }) => theme.border};
        padding: 0.6em 1em;
        text-align: left;
        color: ${({ theme }) => theme.color};
        background-color: transparent;
    }
    th {
        background-color: ${({ theme }) => theme.surfaceAlt};
        font-weight: 700;
    }
    tr {
        background-color: transparent;
        border-top: none;
    }
    tr:nth-child(even) {
        background-color: ${({ theme }) => theme.surface};
    }
`;

export const CommentSection = styled.section`
    margin-top: 80px;
    padding-top: 40px;
    border-top: 1px solid ${({ theme }) => theme.border};
`;

export const CommentHeader = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 16px;

    h3 {
        margin: 0;
        font-size: 1rem;
        font-weight: 600;
    }
`;

export const CommentCount = styled.span`
    margin-left: 4px;
    font-weight: 400;
    color: ${({ theme }) => theme.textMuted};
`;

export const AddCommentButton = styled.button`
    padding: 0;
    border: none;
    background: none;
    font-size: 0.88rem;
    cursor: pointer;
    color: ${({ theme }) => theme.textMuted};
    text-decoration: underline;
    text-underline-offset: 4px;
    transition: color 0.15s ease;

    &:hover {
        color: ${({ theme }) => theme.color};
    }

    &:focus-visible {
        outline: 1px solid ${({ theme }) => theme.color};
        outline-offset: 4px;
    }
`;

export const EmptyComment = styled.p`
    margin: 0;
    padding: 16px 0;
    font-size: 0.92rem;
    color: ${({ theme }) => theme.textMuted};
`;

export const CommentList = styled.ul`
    list-style: none;
    padding: 0;
    margin: 0;
`;

export const CommentItem = styled.li`
    padding: 18px 0;

    & + & {
        border-top: 1px solid ${({ theme }) => theme.border};
    }
`;

export const CommentMeta = styled.div`
    display: flex;
    align-items: baseline;
    gap: 10px;

    strong {
        font-size: 0.95rem;
        font-weight: 700;
    }

    small {
        font-size: 0.8rem;
        color: ${({ theme }) => theme.textMuted};
    }
`;

export const CommentBody = styled.p`
    margin: 8px 0 0;
    font-size: 0.97rem;
    line-height: 1.7;
    white-space: pre-wrap;
    overflow-wrap: anywhere;
`;

export const CommentDeleteButton = styled.button`
    margin-left: auto;
    padding: 2px 6px;
    border: none;
    background: none;
    font-size: 0.8rem;
    cursor: pointer;
    color: ${({ theme }) => theme.textMuted};
    border-radius: 4px;

    &:hover {
        color: ${({ theme }) => theme.danger};
    }
`;
