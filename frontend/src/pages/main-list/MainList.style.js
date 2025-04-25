import styled from 'styled-components';

// 전체 컨테이너
export const MainContainer = styled.div`
    width: 90%;
    max-width: 1000px;
    margin: 0 auto;
    padding: 0 15px;

    @media (max-width: 768px) {
        padding: 0 10px;
    }
`;