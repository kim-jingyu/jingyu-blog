import { useNavigate } from 'react-router-dom';
import { Modal } from 'antd';

import './Login.style';
import {
  LoginWrapper,
  InputField,
  Links,
  LoginButton,
  LoginContainer,
  LoginForm,
  Options,
  SocialLogin,
  Title,
} from './Login.style';
import { useState } from 'react';
import GoogleButton from '/src/components/login/google/GoogleButton';
import KakaoButton from '/src/components/login/kakao/KakaoButton';

function Login() {
  const navigate = useNavigate();
  const login = (event) => {
    event.preventDefault();
    setOpen(true);
    return;
  };
  const [open, setOpen] = useState(false);
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
          <Title>로그인</Title>
          <LoginForm>
            <InputField placeholder="아이디" />
            <InputField type="password" placeholder="비밀번호" />
            <LoginButton onClick={login}>로그인</LoginButton>
          </LoginForm>
          <Options>
            <label>
              <input type="checkbox" />
              자동 로그인
            </label>
            <Links>
              <a href="#">아이디 찾기</a> | <a href="#">비밀번호 찾기</a>
            </Links>
          </Options>
          <SocialLogin>
            <GoogleButton>구글 로그인</GoogleButton>
            <KakaoButton>카카오 로그인</KakaoButton>
            <br /> <br />
            <LoginButton style={{ width: '100%' }} onClick={() => navigate('/signup')}>
              회원가입 하러 가기
            </LoginButton>
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
