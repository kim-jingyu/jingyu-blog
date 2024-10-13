import { jwtDecode } from 'jwt-decode';
import React, { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

const GoogleLoginCallback = () => {
  const location = useLocation();
  const navigate = useNavigate();

  // Google 로그인 성공 시 리다이렉트되는 페이지
  // 마운트 되면 자동으로 서버에 로그인 요청을 보냄
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const code = params.get('code');

    if (code) {
      fetch('http://localhost:8080/login/google', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ code }),
        credentials: 'include'
      })
        .then((response) => response.json())
        .then((data) => {
          const accessToken = data.accessToken;
          localStorage.setItem('accessToken', accessToken);
          const payloadObj = jwtDecode(accessToken);
          const memberId = payloadObj.sub;
          localStorage.setItem('memberId', memberId);
          navigate('/');
        })
        .catch((error) => {
          console.error('Error:', error);
        });
    }
  }, [location, navigate]);
  return <div>Google 로그인 중...</div>;
};

export default GoogleLoginCallback;