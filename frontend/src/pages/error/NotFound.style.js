import styled from 'styled-components';

export const NotFoundContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 12px;
  width: 100%;
  min-height: 100vh;
  padding: 24px;
  text-align: center;
`;

export const Code = styled.h1`
  margin: 0;
  font-size: 5rem;
  font-weight: 800;
  line-height: 1;
  letter-spacing: -0.04em;
  color: ${({ theme }) => theme.accent};
`;

export const Message = styled.p`
  margin: 0;
  font-size: 1.05rem;
  color: ${({ theme }) => theme.textMuted};
`;

export const HomeLink = styled.a`
  margin-top: 16px;
  padding: 10px 20px;
  border-radius: 999px;
  border: 1px solid ${({ theme }) => theme.border};
  font-size: 0.92rem;
  font-weight: 600;
  text-decoration: none;
  color: ${({ theme }) => theme.color};
  transition: background-color 0.15s ease;

  &:hover {
    background-color: ${({ theme }) => theme.surfaceAlt};
  }
`;
