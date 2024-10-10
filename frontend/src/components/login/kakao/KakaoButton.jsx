import React from 'react';
import PropTypes from 'prop-types';
import { SocialButton } from './KakaoButton.style';

const KAKAO_CLIENT_ID = import.meta.env.VITE_APP_KAKAO_CLIENT_ID;
const REDIRECT_URI = 'http://localhost:5173/kakao/callback'; // 클라이언트의 콜백 URI 설정

const KakaoButton = ({ children, ...attributes }) => {
  const kakaoAuthUrl = `https://kauth.kakao.com/oauth/authorize?client_id=${KAKAO_CLIENT_ID}&redirect_uri=${REDIRECT_URI}&response_type=code`;

  // 클릭 시 kakaoAuthUrl로 get 요청
  return (
    <SocialButton as="a" href={kakaoAuthUrl} {...attributes}>
      <img src="https://img.icons8.com/?size=100&id=2951&format=png&color=000000" alt="Kakao Icon" />
      {children}
    </SocialButton>
  );
};

KakaoButton.propTypes = {
  children: PropTypes.node.isRequired,
};

export default KakaoButton;