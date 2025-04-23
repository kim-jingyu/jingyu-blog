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
        max-width: 1200px;
        margin: 0 auto;

        @media (max-width: 768px) {
            padding: 0 16px;
        }

        @media (max-width: 480px) {
            padding: 0 8px;
        }
    }
`;

export const OutletWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;

  background-color: ${({ theme }) => theme.backgroundColor};
  color: ${({ theme }) => theme.color};
`;