import styled from 'styled-components';

// Google 브랜드 가이드의 다크 테마 버튼 색상
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
  border-radius: 8px;
  cursor: pointer;
  background-color: #131314;
  color: #e3e3e3;
  border: 1px solid #8e918f;
  transition: background-color 0.15s ease;

  &:hover {
    background-color: #1f1f20;
  }

  img {
    width: 18px;
    margin-right: 10px;
  }
`;
