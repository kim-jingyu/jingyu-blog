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
  font-size: 3rem;
  font-weight: 700;
  line-height: 1;
  letter-spacing: -0.03em;
  color: ${({ theme }) => theme.color};
`;

export const Message = styled.p`
  margin: 0;
  font-size: 1.05rem;
  color: ${({ theme }) => theme.textMuted};
`;

export const HomeLink = styled.a`
  margin-top: 16px;
  font-size: 0.9rem;
  color: ${({ theme }) => theme.textMuted};
  text-underline-offset: 4px;
  transition: color 0.15s ease;

  &:hover {
    color: ${({ theme }) => theme.color};
  }
`;
