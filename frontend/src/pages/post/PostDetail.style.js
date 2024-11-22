import MDEditor from '@uiw/react-md-editor';
import styled from 'styled-components';

export const PostContainer = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    padding: 20px;
    margin-left: 20vh;
    width: 1000px;
    border-radius: 8px;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
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