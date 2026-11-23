import styled, { createGlobalStyle } from 'styled-components';

const base = {
    radius: '12px',
    radiusSm: '8px',
    maxWidth: '760px',
    font: `'Pretendard Variable', Pretendard, -apple-system, BlinkMacSystemFont, system-ui, 'Apple SD Gothic Neo', 'Noto Sans KR', 'Malgun Gothic', sans-serif`,
    mono: `'JetBrains Mono', 'Fira Code', Consolas, 'Courier New', monospace`,
};

export const lightTheme = {
    ...base,
    isDark: false,
    backgroundColor: '#ffffff',
    color: '#1b1d22',
    surface: '#f7f8fa',
    surfaceAlt: '#eef0f3',
    border: '#e3e6eb',
    textMuted: '#6b717c',
    accent: '#2f7cf6',
    accentSoft: 'rgba(47, 124, 246, 0.1)',
    danger: '#e5484d',
    codeBg: '#f3f4f6',
    shadow: '0 8px 24px rgba(15, 20, 30, 0.08)',
};

export const darkTheme = {
    ...base,
    isDark: true,
    backgroundColor: '#16181d',
    color: '#e6e8eb',
    surface: '#1e2128',
    surfaceAlt: '#262a32',
    border: '#2d323b',
    textMuted: '#959ba5',
    accent: '#6aaeff',
    accentSoft: 'rgba(106, 174, 255, 0.12)',
    danger: '#ff6b6b',
    codeBg: '#1e2128',
    shadow: '0 12px 32px rgba(0, 0, 0, 0.45)',
};

export const GlobalStyle = createGlobalStyle`
    *, *::before, *::after {
        box-sizing: border-box;
    }

    html {
        -webkit-text-size-adjust: 100%;
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
        color: ${({ theme }) => theme.accent};
    }

    .wmde-markdown blockquote {
        color: ${({ theme }) => theme.textMuted};
        border-left-color: ${({ theme }) => theme.accent};
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
