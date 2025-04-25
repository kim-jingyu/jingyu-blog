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
`;

export const OutletWrapper = styled.div`
  display: flex;
    align-items: center; /* 세로 방향 중앙 정렬 */
    justify-content: center; /* 가로 방향 중앙 정렬 */

  background-color: ${({ theme }) => theme.backgroundColor};
  color: ${({ theme }) => theme.color};
`;