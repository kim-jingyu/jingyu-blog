import styled from "styled-components";

// 입력란·버튼 공통 높이
const CONTROL_HEIGHT = '48px';

export const LoginWrapper = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    min-height: 100vh;
    padding: 24px 16px;
    background-color: ${({ theme }) => theme.backgroundColor};
    color: ${({ theme }) => theme.color};
`

export const LoginContainer = styled.div`
    width: 100%;
    max-width: 360px;
`

export const BrandLink = styled.a`
    display: inline-block;
    margin-bottom: 12px;
    font-size: 0.85rem;
    color: ${({ theme }) => theme.textMuted};
    text-decoration: none;
    transition: color 0.15s ease;

    &:hover {
        color: ${({ theme }) => theme.color};
    }
`

export const Title = styled.h1`
    margin: 0 0 8px;
    font-size: 1.75rem;
    font-weight: 700;
    letter-spacing: -0.02em;
`

export const Subtitle = styled.p`
    margin: 0 0 36px;
    font-size: 0.92rem;
    color: ${({ theme }) => theme.textMuted};
`

export const LoginForm = styled.form`
    display: flex;
    flex-direction: column;
`

export const Field = styled.div`
    display: flex;
    flex-direction: column;
    gap: 8px;
    margin-bottom: 16px;
`

export const Label = styled.label`
    font-size: 0.82rem;
    font-weight: 500;
    color: ${({ theme }) => theme.textMuted};
`

export const InputField = styled.input`
    height: ${CONTROL_HEIGHT};
    padding: 0 14px;
    font-size: 15px;
    border: 1px solid ${({ theme }) => theme.border};
    border-radius: ${({ theme }) => theme.radiusSm};
    background-color: ${({ theme }) => theme.surface};
    color: ${({ theme }) => theme.color};
    outline: none;
    transition: border-color 0.15s ease, background-color 0.15s ease;

    &::placeholder {
        color: ${({ theme }) => theme.textMuted};
        opacity: 0.7;
    }

    &:hover {
        border-color: ${({ theme }) => theme.textMuted};
    }

    &:focus {
        border-color: ${({ theme }) => theme.color};
        background-color: ${({ theme }) => theme.backgroundColor};
    }

    /* 브라우저 자동완성 배경(흰색/노란색) 제거 */
    &:-webkit-autofill,
    &:-webkit-autofill:hover,
    &:-webkit-autofill:focus {
        -webkit-text-fill-color: ${({ theme }) => theme.color};
        -webkit-box-shadow: 0 0 0 1000px ${({ theme }) => theme.surface} inset;
        caret-color: ${({ theme }) => theme.color};
        transition: background-color 9999s ease-out;
    }

    @media (max-width: 768px) {
        font-size: 16px; /* iOS 자동 확대 방지 */
    }
`

export const LoginButton = styled.button`
    height: ${CONTROL_HEIGHT};
    margin-top: 8px;
    font-size: 15px;
    font-weight: 600;
    color: ${({ theme }) => theme.backgroundColor};
    background-color: ${({ theme }) => theme.color};
    border: none;
    border-radius: ${({ theme }) => theme.radiusSm};
    cursor: pointer;
    transition: opacity 0.15s ease;

    &:hover {
        opacity: 0.88;
    }

    &:active {
        opacity: 0.75;
    }

    &:disabled {
        opacity: 0.35;
        cursor: not-allowed;
    }

    &:focus-visible {
        outline: 2px solid ${({ theme }) => theme.color};
        outline-offset: 2px;
    }
`

export const Divider = styled.div`
    display: flex;
    align-items: center;
    gap: 12px;
    margin: 32px 0 20px;
    font-size: 12px;
    color: ${({ theme }) => theme.textMuted};

    &::before,
    &::after {
        content: '';
        flex: 1;
        height: 1px;
        background-color: ${({ theme }) => theme.border};
    }
`

export const SocialLogin = styled.div`
    display: flex;
    flex-direction: column;
    gap: 10px;

    /* 구글·카카오 버튼 공통 규격 */
    && > a {
        height: ${CONTROL_HEIGHT};
        padding: 0 16px;
        margin: 0;
        border-radius: ${({ theme }) => theme.radiusSm};
        font-size: 15px;
        font-weight: 500;
    }
`
