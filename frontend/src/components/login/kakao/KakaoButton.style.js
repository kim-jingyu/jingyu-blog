import styled from 'styled-components';

// 카카오 로그인 디자인 가이드 색상 (#FEE500 배경 필수)
export const SocialButton = styled.button`
  box-sizing: border-box;
  width: 100%;
  padding: 11px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 15px;
  font-weight: 500;
  text-decoration: none;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  background-color: #fee500;
  color: rgba(0, 0, 0, 0.85);
  transition: filter 0.15s ease;

  &:hover {
    filter: brightness(0.95);
  }

  img {
    width: 18px;
    margin-right: 10px;
  }
`;
