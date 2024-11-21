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
  }
`;

export const OutletWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;

  background-color: ${({ theme }) => theme.backgroundColor};
  color: ${({ theme }) => theme.color};
`;