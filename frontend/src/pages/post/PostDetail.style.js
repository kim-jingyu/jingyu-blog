import styled from 'styled-components';

export const PostContainer = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    padding: 20px;
    margin: 0 auto;
    width: 1000px;
    height: 100%;
    background-color: white;
    border-radius: 8px;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
`;

export const Title = styled.h1`
    font-size: 24px;
    margin-bottom: 10px;
`;

export const Content = styled.p`
    font-size: 18px;
    margin-bottom: 20px;
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