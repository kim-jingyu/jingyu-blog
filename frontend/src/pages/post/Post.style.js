import styled from 'styled-components';

// 전체 컨테이너
export const PostContainer = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    max-width: 600px;
    margin: 0 auto;
    padding: 20px;
    background-color: #fafafa;
    border-radius: 8px;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
`;

// 입력 필드 스타일
export const InputField = styled.input`
    width: 100%;
    padding: 10px;
    margin-bottom: 10px;
    border: 1px solid #dbdbdb;
    border-radius: 4px;
    font-size: 16px;
    background-color: #fff;
    outline: none;
    &:focus {
        border-color: #0095f6;
    }
`;

// 텍스트 영역 스타일 (내용 작성 필드)
export const TextArea = styled.textarea`
    width: 100%;
    height: 150px;
    padding: 10px;
    margin-bottom: 10px;
    border: 1px solid #dbdbdb;
    border-radius: 4px;
    font-size: 16px;
    background-color: #fff;
    outline: none;
    resize: none;
    &:focus {
        border-color: #0095f6;
    }
`;

// 해시태그 입력 필드
export const HashtagInput = styled.input`
    width: 100%;
    padding: 10px;
    margin-bottom: 10px;
    border: 1px solid #dbdbdb;
    border-radius: 4px;
    font-size: 16px;
    background-color: #fff;
    outline: none;
    &:focus {
        border-color: #0095f6;
    }
`;

// 해시태그 목록
export const HashtagList = styled.div`
    display: flex;
    flex-wrap: wrap;
    margin-bottom: 10px;
`;

// 해시태그 항목
export const HashtagItem = styled.span`
    display: inline-block;
    background-color: #f0f0f0;
    border-radius: 20px;
    padding: 5px 10px;
    margin: 5px;
    font-size: 14px;
    color: #333;
    cursor: pointer;
    &:hover {
        background-color: #e0e0e0;
    }
`;

// 버튼 스타일
export const Button = styled.button`
    width: 100%;
    padding: 12px;
    background-color: #0095f6;
    border: none;
    border-radius: 4px;
    color: white;
    font-size: 16px;
    cursor: pointer;
    &:hover {
        background-color: #007bbf;
    }
    &:disabled {
        background-color: #b2dffc;
    }
`;