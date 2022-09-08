import styled from 'styled-components';

export const Container = styled.main`
  background-color: ${({ theme }) => theme.background.secondary};
  min-height: 90vh;
  margin: 2rem auto 7rem auto;
  max-width: 110rem;
  display: flex;

  @media (max-width: 1040px) {
    margin-right: 1.5rem;
    margin-left: 1.5rem;
  }

  @media (max-width: 768px) {
    flex-direction: column-reverse;
  }
`;

export const Tweets = styled.section`
  flex: 2;
`;

export const Aside = styled.aside`
  flex: 1;
  margin-left: 2rem;

  @media (max-width: 768px) {
    margin-left: 0;
    margin-top: 2rem;
  }
`;
