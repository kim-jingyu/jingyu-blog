import MDEditor from '@uiw/react-md-editor';
import styled from 'styled-components';

export const PostDetailContainer = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    margin-top: 50px;
    width: 100%;
    padding: 0 20px;
    gap: 24px; /* 사이 간격 추가 */

    @media (max-width: 768px) {
        flex-direction: column; /* 모바일에서 세로 배치 */
        gap: 12px;
        padding: 0 12px;
        width: 100%;
        overflow-x: hidden; /* 가로 스크롤 방지 */
    }

    @media (max-width: 480px) {
        margin-top: 20px; /* 더 작은 화면에서는 여백 최소화 */
        padding: 0 10px; /* 좌우 패딩 추가 */
    }
`;

export const PostContainer = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    padding: 20px;
    margin: 0 auto; /* 중앙 정렬을 유지 */
    width: 100%; /* 기본적으로 화면 크기에 맞춤 */
    max-width: 2000px; /* 최대 폭 제한 */
    border-radius: 8px; /* 모서리 둥글게 */
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.5); /* 박스 그림자 추가 */

    @media (max-width: 768px) {
        width: 100%; /* 모바일 화면에서는 가로 폭을 화면에 꽉 채움 */
        max-width: 100%; /* 100% 제한 */
        min-width: 0; /* 콘텐츠로 인한 강제 확장 방지 */
        margin: 0; /* 좌우 여백 제거 */
        padding: 12px; /* 적절한 내부 패딩 */
        box-sizing: border-box; /* 패딩 포함 폭 계산 */
    }
`;


export const NavContainer = styled.nav`
    position: sticky;
    top: 10px;
    width: 260px;
    max-width: 300px;
    min-width: 220px;
    padding: 16px 12px;
    height: max-content;
    border-radius: 12px;
    background: ${({ theme }) => theme?.backgroundColor === '#292929' ? '#1e1e1e' : '#ffffff'};
    border: 1px solid ${({ theme }) => theme?.backgroundColor === '#292929' ? '#2c2c2c' : 'rgba(0,0,0,0.08)'};
    box-shadow: ${({ theme }) => theme?.backgroundColor === '#292929'
    ? '0 6px 16px rgba(0,0,0,0.35)'
    : '0 8px 24px rgba(0,0,0,0.08)'};

    /* 화면 높이 넘어가면 내부 스크롤 */
    max-height: calc(100vh - 120px);
    overflow: auto;

    /* 스크롤바 미니멀 */
    scrollbar-width: thin;
    scrollbar-color: ${({ theme }) => theme?.backgroundColor === '#292929' ? '#3a3a3a #222' : '#cfcfcf #f5f5f5'};
    &::-webkit-scrollbar {
        width: 6px;
    }
    &::-webkit-scrollbar-thumb {
        background: ${({ theme }) => theme?.backgroundColor === '#292929' ? '#3a3a3a' : '#cfcfcf'};
        border-radius: 20px;
    }
    &::-webkit-scrollbar-track {
        background: ${({ theme }) => theme?.backgroundColor === '#292929' ? '#222' : '#f5f5f5'};
        border-radius: 20px;
    }

    .nav-title {
        font-size: 0.95rem;
        font-weight: 700;
        margin: 4px 8px 10px;
        color: ${({ theme }) => theme?.backgroundColor === '#292929' ? '#eaeaea' : '#222'};
        letter-spacing: .02em;
    }

    ul {
        list-style: none;
        padding: 0 4px;
        margin: 0;
    }

    li {
        margin: 2px 4px;
        padding: 6px 8px;
        border-radius: 8px;
        cursor: pointer;
        color: ${({ theme }) => theme?.backgroundColor === '#292929' ? '#d7d7d7' : '#444'};
        font-size: 0.92rem;
        line-height: 1.35;
        transition: background 0.15s ease, color 0.15s ease, transform 0.05s ease;
        position: relative;
    }

    /* 단계별 들여쓰기 가이드 라인 느낌 */
    li::before {
        content: '';
        position: absolute;
        left: 6px;
        top: 10px;
        width: 4px;
        height: 4px;
        border-radius: 50%;
        background: ${({ theme }) => theme?.backgroundColor === '#292929' ? '#666' : '#c7c7c7'};
        opacity: 0.8;
    }

    li:hover {
        background: ${({ theme }) => theme?.backgroundColor === '#292929' ? 'rgba(255,255,255,0.06)' : 'rgba(0,0,0,0.04)'};
        color: ${({ theme }) => theme?.backgroundColor === '#292929' ? '#fff' : '#111'};
    }

    /* 활성 항목 스타일 */
    li.active {
        background: ${({ theme }) => theme?.backgroundColor === '#292929' ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.06)'};
        color: ${({ theme }) => theme?.backgroundColor === '#292929' ? '#fff' : '#111'};
        font-weight: 600;
    }

    @media (max-width: 768px) {
        /* 모바일 화면에서 NavContainer 숨김 */
        display: none;
    }
`;


export const Title = styled.h1`
    font-size: 24px;
`;

export const StyledMarkdown = styled(MDEditor.Markdown)`
    table {
        width: 100%;
        border-collapse: collapse;
        margin: 1em 0;
        background-color: ${({ theme }) => theme.backgroundColor === '#292929' ? '#232323' : '#fff'};
        border-radius: 8px;
        overflow: hidden;
        box-shadow: 0 2px 8px rgba(0,0,0,0.06);
    }
    th, td {
        border: 1px solid ${({ theme }) => theme.backgroundColor === '#292929' ? '#555' : '#ddd'};
        padding: 0.6em 1em;
        text-align: left;
        color: ${({ theme }) => theme.backgroundColor === '#292929' ? '#fafafa' : '#222'};
        background-color: ${({ theme }) => theme.backgroundColor === '#292929' ? '#292929' : '#fff'};
        font-size: 1em;
        transition: background 0.2s;
    }
    th {
        background-color: ${({ theme }) => theme.backgroundColor === '#292929' ? '#3b3b3b' : '#f7f7f7'};
        font-weight: bold;
        color: ${({ theme }) => theme.backgroundColor === '#292929' ? '#fff' : '#111'};
        letter-spacing: .03em;
    }
    tr {
        background-color: ${({ theme }) => theme.backgroundColor === '#292929' ? '#232323' : '#fff'};
    }
    tr:nth-child(even) {
        background-color: ${({ theme }) => theme.backgroundColor === '#292929' ? '#24272e' : '#fafbfc'};
    }
`;

export const DateInfo = styled.div`
    font-size: 14px;
    color: gray;
    margin-bottom: 10px;
`;

export const HashtagList = styled.div`
    display: flex;
    flex-wrap: wrap;
    margin-top: 20px; /* 본문과 간격 */
    justify-content: flex-start; /* 좌측 정렬 */
`;

export const HashtagItem = styled.span`
    background-color: #f0f0f0;
    border-radius: 20px;
    padding: 5px 10px;
    margin-right: 5px;
    font-size: 14px;
    color: #333;
`;

export const CommentSection = styled.div`
    margin-top: 40px;
    padding: 20px;
    border-top: 1px solid #ddd;
`;

export const CommentList = styled.ul`
    list-style: none;
    padding: 0;
    margin: 0 0 20px;
`;

export const CommentItem = styled.li`
    padding: 10px 0;
    border-bottom: 1px solid #eee;

    p {
        margin: 0 0 5px;
    }

    small {
        color: gray;
        font-size: 0.8rem;
    }
`;

export const AddCommentButton = styled.button`
    display: inline-block;
    padding: 10px 20px;
    border: none;
    background-color: transparent;
    border-radius: 5px;
    font-size: 1rem;
    cursor: pointer;
`;

export const AdminEditButton = styled.button`
    display: inline-block;
    padding: 10px 20px;
    border: none;
    background-color: transparent;
    border-radius: 5px;
    font-size: 1rem;
    cursor: pointer;
`;