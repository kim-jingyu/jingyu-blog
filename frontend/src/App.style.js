import styled, { createGlobalStyle } from 'styled-components';

const base = {
    radius: '12px',
    radiusSm: '8px',
    maxWidth: '720px',
    font: `'Pretendard Variable', Pretendard, -apple-system, BlinkMacSystemFont, system-ui, 'Apple SD Gothic Neo', 'Noto Sans KR', 'Malgun Gothic', sans-serif`,
    mono: `'JetBrains Mono', 'Fira Code', Consolas, 'Courier New', monospace`,
};

export const lightTheme = {
    ...base,
    isDark: false,
    backgroundColor: '#ffffff',
    color: '#111111',
    surface: '#f6f6f6',
    surfaceAlt: '#ededed',
    border: '#e6e6e6',
    textMuted: '#777777',
    accent: '#111111',
    accentSoft: 'rgba(0, 0, 0, 0.06)',
    danger: '#d93636',
    codeBg: '#f6f6f6',
    shadow: '0 8px 24px rgba(0, 0, 0, 0.08)',
};

// 흑백 위주 미니멀 다크
export const darkTheme = {
    ...base,
    isDark: true,
    backgroundColor: '#121212',
    color: '#ececec',
    surface: '#1a1a1a',
    surfaceAlt: '#232323',
    border: '#2a2a2a',
    textMuted: '#8c8c8c',
    accent: '#ffffff',
    accentSoft: 'rgba(255, 255, 255, 0.1)',
    danger: '#ff6b6b',
    codeBg: '#1a1a1a',
    shadow: '0 12px 32px rgba(0, 0, 0, 0.5)',
};

export const GlobalStyle = createGlobalStyle`
    *, *::before, *::after {
        box-sizing: border-box;
    }

    html {
        -webkit-text-size-adjust: 100%;
    }

    html, body {
        overflow-x: clip; /* hidden과 달리 sticky 헤더를 깨지 않음 */
    }

    body {
        margin: 0;
        padding: 0;
        font-family: ${({ theme }) => theme.font};
        font-size: 16px;
        line-height: 1.6;
        background-color: ${({ theme }) => theme.backgroundColor};
        color: ${({ theme }) => theme.color};
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;

        @media (max-width: 480px) {
            font-size: 15px;
        }
    }

    ::selection {
        background: ${({ theme }) => theme.accentSoft};
    }

    a {
        color: inherit;
    }

    button {
        font-family: inherit;
    }

    #root {
        display: flex;
        flex-direction: column;
        width: 100%;
        min-height: 100vh;
    }

    .wmde-markdown {
        background-color: transparent;
        color: ${({ theme }) => theme.color};
        font-family: ${({ theme }) => theme.font};
        font-size: 1.05rem;
        line-height: 1.8;
        padding: 0;
    }

    .wmde-markdown h1,
    .wmde-markdown h2 {
        border-bottom-color: ${({ theme }) => theme.border};
    }

    .wmde-markdown a {
        color: ${({ theme }) => theme.color};
        text-decoration: underline;
        text-underline-offset: 3px;
        text-decoration-color: ${({ theme }) => theme.textMuted};
    }

    .wmde-markdown blockquote {
        color: ${({ theme }) => theme.textMuted};
        border-left-color: ${({ theme }) => theme.border};
    }

    .wmde-markdown img {
        border-radius: ${({ theme }) => theme.radiusSm};
    }

    .wmde-markdown pre {
        border-radius: ${({ theme }) => theme.radiusSm};
        border: 1px solid ${({ theme }) => theme.border};
        padding: 14px 16px;
        overflow-x: auto;
        background-color: ${({ theme }) => theme.codeBg};
        color: ${({ theme }) => theme.color};
    }

    .wmde-markdown code {
        font-family: ${({ theme }) => theme.mono};
        font-size: 0.88em;
        padding: 2px 6px;
        background-color: ${({ theme }) => theme.surfaceAlt};
        color: ${({ theme }) => theme.color};
        border-radius: 4px;
    }

    .wmde-markdown pre code {
        padding: 0;
        background-color: transparent;
    }
`;

export const OutletWrapper = styled.div`
    display: flex;
    justify-content: center;
    width: 100%;
    flex: 1;
    background-color: ${({ theme }) => theme.backgroundColor};
    color: ${({ theme }) => theme.color};
`;
