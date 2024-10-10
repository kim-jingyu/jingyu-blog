import React from 'react';
import PropTypes from 'prop-types';
import { SocialButton } from './GoogleButton.style';

const GOOGLE_CLIENT_ID = import.meta.env.VITE_APP_GOOGLE_CLIENT_ID;
const REDIRECT_URI = 'http://localhost:5173/google/callback'; // 클라이언트의 콜백 URI 설정
const SCOPE = 'https%3A//www.googleapis.com/auth/userinfo.profile';

const GoogleButton = ({ children, ...attributes }) => {
  const googleAuthUrl = `https://accounts.google.com/o/oauth2/v2/auth?client_id=${GOOGLE_CLIENT_ID}&response_type=code&redirect_uri=${REDIRECT_URI}&scope=${SCOPE}`;

  // 클릭 시 googleAuthUrl로 get 요청
  return (
    <SocialButton as="a" href={googleAuthUrl} {...attributes}>
      <img src="https://img.icons8.com/?size=100&id=17949&format=png&color=000000" alt="Google Icon" />
      {children}
    </SocialButton>
  );
};

GoogleButton.propTypes = {
  children: PropTypes.node.isRequired,
};

export default GoogleButton;
