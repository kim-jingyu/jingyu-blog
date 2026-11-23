import styled from "styled-components";

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
    max-width: 380px;
    padding: 0;
    text-align: left;

`

export const BrandLink = styled.a`
    display: inline-block;
    margin-bottom: 8px;
    font-size: 0.85rem;
    font-weight: 400;
    color: ${({ theme }) => theme.textMuted};
    text-decoration: none;

    &:hover {
        color: ${({ theme }) => theme.color};
    }
`

export const Title = styled.h1`
    margin: 0 0 32px;
    font-size: 1.75rem;
    font-weight: 700;
    letter-spacing: -0.02em;
`

export const LoginForm = styled.form`
    display: flex;
    flex-direction: column;
    gap: 10px;
`

export const InputField = styled.input`
    padding: 12px 0;
    font-size: 15px;
    border: none;
    border-bottom: 1px solid ${({ theme }) => theme.border};
    border-radius: 0;
    background-color: transparent;
    color: ${({ theme }) => theme.color};
    outline: none;
    transition: border-color 0.15s ease, box-shadow 0.15s ease;

    &::placeholder {
        color: ${({ theme }) => theme.textMuted};
    }

    &:focus {
        border-bottom-color: ${({ theme }) => theme.color};
    }

    @media (max-width: 768px) {
        font-size: 16px; /* iOS 자동 확대 방지 */
    }
`

export const LoginButton = styled.button`
    margin-top: 20px;
    padding: 12px;
    font-size: 15px;
    font-weight: 600;
    color: ${({ theme }) => theme.backgroundColor};
    background-color: ${({ theme }) => theme.accent};
    border: none;
    border-radius: ${({ theme }) => theme.radiusSm};
    cursor: pointer;
    transition: opacity 0.15s ease;

    &:hover {
        opacity: 0.85;
    }

    &:focus-visible {
        outline: 2px solid ${({ theme }) => theme.accent};
        outline-offset: 2px;
    }
`

export const Options = styled.div`
    margin-top: 14px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-size: 13px;
    color: ${({ theme }) => theme.textMuted};

    label {
        display: inline-flex;
        align-items: center;
        gap: 6px;
        cursor: pointer;
    }

    input[type="checkbox"] {
        margin: 0;
        accent-color: ${({ theme }) => theme.accent};
    }
`

export const Links = styled.div`
    a {
        color: ${({ theme }) => theme.textMuted};
        font-size: 12px;
        text-decoration: none;
        margin: 0 2px;

        &:hover {
            color: ${({ theme }) => theme.color};
        }
    }
`

export const Divider = styled.div`
    display: flex;
    align-items: center;
    gap: 12px;
    margin: 24px 0 16px;
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
`
