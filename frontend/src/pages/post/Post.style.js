import MDEditor from '@uiw/react-md-editor';
import styled from 'styled-components';

// 전체 컨테이너
export const PostContainer = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 100dvw;
    padding-top: 10px;
    padding-bottom: 10px;
    border-radius: 8px;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
`;

// 입력 필드 스타일
export const InputField = styled.input`
    width: 70%;
    background: transparent;
    color: gray;
    padding: 10px;
    margin-bottom: 10px;
    border: none;
    font-size: 16px;
    outline: none;
`;

export const StyledMDEditor = styled(MDEditor)`
  width: 100dvw;  
  min-height: 80dvh;
  margin: 0 auto;

  /* 툴바 스타일 */
  .w-md-editor-toolbar {
    border-radius: 8px 8px 0 0;
  }

  .w-md-editor-toolbar button {
    border-radius: 5px;
    margin: 5px;
    padding: 5px 10px;
    cursor: pointer;
  }

  /* 텍스트 입력 영역 스타일 */
  .w-md-editor-content {
    font-family: "Arial, sans-serif";
    font-size: 16px;
    line-height: 1.6;
    padding: 15px;
    border-radius: 0 0 8px 8px;
  }

  .w-md-editor-content:focus {
    outline: none;
  }
`;

// 해시태그 입력 필드
export const HashtagInput = styled.input`
    width: 20%;
    background: transparent;
    color: gray;
    padding: 10px;
    margin-top: 10px;
    margin-bottom: 10px;
    margin-left: 10px;
    border-top: none;
    border-left: none;
    border-right: none;
    border-bottom: 1px solid gray;
    font-size: 16px;
    outline: none;
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
    width: 5%;
    padding: 12px;
    background-color: #0095f6;
    border: none;
    border-radius: 4px;
    color: white;
    font-size: 16px;
    cursor: pointer;
    margin-left: 20px;
    &:hover {
        background-color: #007bbf;
    }
    &:disabled {
        background-color: #b2dffc;
    }
`;