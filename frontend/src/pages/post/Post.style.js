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
`;

// 입력 필드 스타일
export const InputField = styled.input`
    width: 100%;
    background: transparent;
    color: ${({ theme }) => theme.color};
    padding: 16px 12px;
    margin-bottom: 8px;
    border: none;
    border-bottom: 1px solid ${({ theme }) => theme.border};
    font-size: 1.6rem;
    font-weight: 700;
    outline: none;

    &::placeholder {
        color: ${({ theme }) => theme.textMuted};
    }
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
    width: min(360px, 60%);
    background: transparent;
    color: ${({ theme }) => theme.color};
    padding: 10px;
    margin-top: 10px;
    margin-bottom: 10px;
    margin-left: 10px;
    border-top: none;
    border-left: none;
    border-right: none;
    border-bottom: 1px solid ${({ theme }) => theme.border};

    &::placeholder {
        color: ${({ theme }) => theme.textMuted};
    }

    &:focus {
        border-bottom-color: ${({ theme }) => theme.accent};
    }
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
    background-color: ${({ theme }) => theme.accentSoft};
    border-radius: 999px;
    padding: 4px 12px;
    margin: 5px;
    font-size: 0.85rem;
    color: ${({ theme }) => theme.accent};
    cursor: pointer;
    &:hover {
        text-decoration: line-through;
    }
`;

// 버튼 스타일
export const Button = styled.button`
    padding: 10px 24px;
    background-color: ${({ theme }) => theme.accent};
    border: none;
    border-radius: 999px;
    color: white;
    font-size: 15px;
    font-weight: 700;
    white-space: nowrap;
    cursor: pointer;
    margin-left: 20px;
    &:hover {
        filter: brightness(1.08);
    }
    &:disabled {
        opacity: 0.5;
        cursor: not-allowed;
    }
`;