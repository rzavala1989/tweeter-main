import styled from 'styled-components';

export const Container = styled.main`
  background-color: ${({ theme }) => theme.background.secondary};
  min-height: 90vh;
`;

export const Tweets = styled.section`
  margin: 5rem auto;
  max-width: 1000px;
  display: flex;
  
  ul {
    flex .7;
  }

  div {
    flex: 2;
  }

  @media (max-width: 1068px) {
    margin-right: 1.5rem;
    margin-left: 1.5rem;
  }

  @media (max-width: 768px) {
    flex-direction: column;
  }
  `;
