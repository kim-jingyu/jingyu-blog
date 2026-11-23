import { useNavigate } from 'react-router-dom';
import { Modal } from 'antd';

import {
  LoginWrapper,
  BrandLink,
  Divider,
  Field,
  InputField,
  Label,
  LoginButton,
  LoginContainer,
  LoginForm,
  SocialLogin,
  Subtitle,
  Title,
} from './Login.style';
import { useState } from 'react';
import GoogleButton from '/src/components/login/google/GoogleButton';
import KakaoButton from '/src/components/login/kakao/KakaoButton';
import { adminLogin } from '../../apis/loginApi';

function Login() {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const [loginId, setLoginId] = useState('');
  const [password, setPassword] = useState('');

  const login = async (event) => {
    event.preventDefault();
    try {
      const response = await adminLogin({ loginId, password });
      console.log(response);
      navigate('/');
    } catch (error) {
      console.error('로그인 실패:',error);
      setOpen(true);
    }
    return;
  };

  // 모달 취소 클릭
  const handleOk = (event) => {
    event.preventDefault();
    setOpen(false);
  };
  const handleCancel = (event) => {
    event.preventDefault();
    setOpen(false);
  };

  return (
    <>
      <LoginWrapper>
        <LoginContainer>
          <BrandLink href="/">진규의 블로그</BrandLink>
          <Title>로그인</Title>
          <Subtitle>소셜 계정 또는 관리자 계정으로 로그인하세요.</Subtitle>
          <LoginForm onSubmit={login}>
            <Field>
              <Label htmlFor="loginId">아이디</Label>
              <InputField
                id="loginId"
                autoComplete="username"
                placeholder="아이디를 입력하세요"
                value={loginId}
                onChange={(e) => setLoginId(e.target.value)}
              />
            </Field>
            <Field>
              <Label htmlFor="password">비밀번호</Label>
              <InputField
                id="password"
                type="password"
                autoComplete="current-password"
                placeholder="비밀번호를 입력하세요"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </Field>
            <LoginButton type="submit" disabled={!loginId.trim() || !password}>
              로그인
            </LoginButton>
          </LoginForm>
          <Divider>또는</Divider>
          <SocialLogin>
            <GoogleButton>Google로 계속하기</GoogleButton>
            <KakaoButton>카카오로 계속하기</KakaoButton>
          </SocialLogin>
        </LoginContainer>
      </LoginWrapper>

      <Modal open={open} onOk={handleOk} onCancel={handleCancel} footer={null}>
        <strong>아이디 혹은 비밀번호가 일치하지 않습니다.</strong>
      </Modal>
    </>
  );
}

export default Login;
