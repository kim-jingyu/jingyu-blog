import styled, { createGlobalStyle } from 'styled-components';

export const lightTheme = {
    backgroundColor: '#ffffff',
    color: '#000000',
};

export const darkTheme = {
    backgroundColor: '#292929',
    color: '#ffffff',
};

export const GlobalStyle = createGlobalStyle`
    body {
        margin: 0;
        padding: 0;
        font-family: Arial, sans-serif;
        background-color: ${({ theme }) => theme.backgroundColor};
        color: ${({ theme }) => theme.color};

        @media (max-width: 768px) {
            font-size: 14px;
        }

        @media (max-width: 480px) {
            font-size: 12px;
        }
    }

    #root {
        display: flex;
        flex-direction: column;
        width: 100%;
        max-width: 100%; /* max-width 제한을 제거 */
        margin: 0; /* 중앙 정렬을 위한 여백 제거 */
        padding: 0; /* 모바일에서 채우기 위한 여백 제거 */

        @media (max-width: 768px) {
            padding: 0; /* 모바일 기기에서 여백 제거 */
        }

        @media (max-width: 480px) {
            padding: 0; /* 모바일 기기에서 여백 제거 */
        }
    }
    
    .wmde-markdown {
        background-color: ${({ theme }) => theme.backgroundColor};
        color: ${({ theme }) => theme.color};
        padding: 10px;
        border-radius: 5px;
    }

    .wmde-markdown pre {
        border-radius: 6px;
        padding: 10px;
        overflow-x: auto; /* 긴 코드 스크롤 지원 */
        background-color: ${({ theme }) => theme.backgroundColor === '#292929' ? '#333' : '#f5f5f5'};
        color: ${({ theme }) => theme.color};
    }

    .wmde-markdown code {
        font-family: 'Courier New', Courier, monospace;
        font-size: 0.9em;
        padding: 2px 4px;
        background-color: ${({ theme }) => theme.backgroundColor === '#292929' ? '#333' : '#f5f5f5'};
        color: ${({ theme }) => theme.backgroundColor === '#292929' ? '#f5f5f5' : '#333'};
        border-radius: 4px; /* inline code 스타일도 모서리 둥글게 */
    }
`;

export const OutletWrapper = styled.div`
  display: flex;
    align-items: center; /* 세로 방향 중앙 정렬 */
    justify-content: center; /* 가로 방향 중앙 정렬 */

  background-color: ${({ theme }) => theme.backgroundColor};
  color: ${({ theme }) => theme.color};
`;