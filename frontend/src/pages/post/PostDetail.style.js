import MDEditor from '@uiw/react-md-editor';
import styled from 'styled-components';

export const PostContainer = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    padding: 20px;
    margin: 0 auto; /* 중앙 정렬을 유지 */
    width: 2000px; /* 가로 크기 고정 */
    max-width: 90%; /* 화면 크기에 따라 최대 너비 조정 */
    border-radius: 8px; /* 모서리 둥글게 */
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.5); /* 박스 그림자 추가 */

    @media (max-width: 768px) {
        width: 100%; /* 모바일 화면에서는 가로 폭을 화면에 꽉 채움 */
        min-width: 350px;
        max-width: 100%; /* 100% 제한 */
        padding: 10px; /* 적절한 내부 패딩 */
    }
`;

export const NavContainer = styled.nav`
    position: sticky;
    top: 50px;
    width: 10%;
    max-width: 300px;
    min-width: 200px;
    margin-left: 50px;
    padding: 10px;
    height: max-content;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.5); /* 박스 그림자 추가 */

    ul {
        list-style: none;
        padding: 0;
    }

    li {
        margin-bottom: 10px;
        cursor: pointer;
    }

    @media (max-width: 768px) {
        /* 모바일 화면에서 NavContainer 숨김 */
        display: none;
    }
`;


export const Title = styled.h1`
    font-size: 24px;
    margin-bottom: 10px;
`;

export const StyledMarkdown = styled(MDEditor.Markdown)`
    background-color: ${({ backgroundColor }) => backgroundColor};
    color: ${({ textColor }) => textColor};
    padding: 20px;
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