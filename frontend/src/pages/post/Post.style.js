import MDEditor from '@uiw/react-md-editor';
import styled from 'styled-components';

// 전체 컨테이너
export const PostContainer = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    height: 1200px;
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

export const StyledMDEditor = styled(MDEditor)`
  width: 100%;
  min-height: 900px;
  max-height: 900px;
  margin: 0 auto;

  .w-md-editor {
    min-height: 900px;
    max-height: 900px;
  }

  .w-md-editor-content {
    min-height: 800px;
    max-height: 900px;
    overflow-y: auto;
  }

  /* 툴바 스타일 */
  .w-md-editor-toolbar {
    background: #0095f6;
    border-bottom: 2px solid #0095f6;
    border-radius: 8px 8px 0 0;
  }

  .w-md-editor-toolbar button {
    background: white;
    color: #4caf50;
    border: 1px solid #0095f6;
    border-radius: 5px;
    margin: 5px;
    padding: 5px 10px;
    cursor: pointer;
  }

  .w-md-editor-toolbar button:hover {
    background: #4caf50;
    color: white;
  }

  /* 텍스트 입력 영역 스타일 */
  .w-md-editor-content {
    font-family: "Arial, sans-serif";
    font-size: 16px;
    line-height: 1.6;
    padding: 15px;
    background-color: #fff;
    border-radius: 0 0 8px 8px;
  }

  .w-md-editor-content:focus {
    outline: none;
    border: 2px solid #4caf50;
  }
`;

// 해시태그 입력 필드
export const HashtagInput = styled.input`
    width: 100%;
    padding: 10px;
    margin-top: 10px;
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
