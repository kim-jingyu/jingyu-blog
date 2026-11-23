import styled from 'styled-components';

// 전체 컨테이너
export const MainContainer = styled.div`
    width: 100%;
    max-width: ${({ theme }) => theme.maxWidth};
    margin: 0 auto;
    padding: 0 20px 80px;

    @media (max-width: 768px) {
        padding: 0 16px 60px;
    }
`;

export const StatusText = styled.p`
    text-align: center;
    padding: 32px 0;
    color: ${({ theme }) => theme.textMuted};
    font-size: 0.9rem;
`;
