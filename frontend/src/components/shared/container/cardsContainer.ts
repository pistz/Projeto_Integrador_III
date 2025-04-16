import styled from 'styled-components';
interface CardsContainerProps {
  $minHeight?: string;
}
export const CardsContainer = styled.div<CardsContainerProps>`
  display: flex;
  flex-wrap: wrap;
  flex-direction: row;
  justify-content: center;
  gap: 2rem;
  align-items: start;
  margin: 0 auto;
  min-height: ${({ $minHeight }) => $minHeight || '64.2vh'};

  @media (max-width: 768px) {
    align-items: first baseline;
    justify-content: center;
  }
`;
