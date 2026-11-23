import styled from 'styled-components';

export const SocialButton = styled.button`
  box-sizing: border-box;
  width: 100%;
  padding: 11px;
  font-size: 15px;
  font-weight: 600;
  text-decoration: none;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  transition: filter 0.15s ease;

  &:hover {
    filter: brightness(0.96);
  }
  display: flex;
  align-items: center;
  justify-content: center;

  background-color: #fee500;
  color: rgba(0, 0, 0, 0.85);

  img {
    width: 18px;
    margin-right: 10px;
  }
`;