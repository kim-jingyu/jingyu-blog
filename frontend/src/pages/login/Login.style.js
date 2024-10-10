import styled from "styled-components";

export const LoginWrapper = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
`

export const LoginContainer = styled.div`
    width: 100%;
    max-width: 400px;
    padding: 20px;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    border-radius: 10px;
    text-align: center;
    position: relative;
` 

export const Title = styled.h1`
    font-size: 24px;
    margin-bottom: 20px;
`
 
export const LoginForm = styled.form`
    display: flex;
    flex-direction: column;
`

export const InputField = styled.input`
    margin-bottom: 10px;
    padding: 10px;
    font-size: 16px;
    border: 1px solid #ccc;
    border-radius: 5px;

    ::placeholder {
        color: #C4C4C4;
        font-size: 10px;
    }
`

export const LoginButton = styled.button`
    padding: 10px;
    font-size: 18px;
    color: white;
    background-color: #000;
    border: none;
    border-radius: 5px;
    cursor: pointer;
`

export const Options = styled.div`
    margin-top: 10px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-size: 14px;
`

export const Links = styled.div`
    margin: 0 0 0 10px;
    a {
        color: #999;
        font-size: 10px;
        text-decoration: none;
        margin: 0 1px;
    }
`

export const SocialLogin = styled.div`
    margin-top: 20px;
`

export const SocialButton = styled.button`
    width: 100%;
    padding: 10px;
    font-size: 16px;
    border: none;
    border-radius: 5px;
    margin-bottom: 10px;
    display: flex;
    align-items: center;
    justify-content: center;

    &.google-login {
        background-color: white;
        color: #555;
        border: 1px solid #ccc;
    }

    &.kakao-login {
        background-color: #ffeb00;
        color: #3c1e1e;
    }

    img {
        width: 20px;
        margin-right: 10px;
    }
`