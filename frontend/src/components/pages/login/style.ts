import styled from "styled-components";

const backgroundColor = '#031129';

interface ContainerProps {
  bgColor?: string;
  backgroundImage?: string;
}

export const Container = styled.div<ContainerProps>`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  width: 100vw;
  position: relative;
  overflow: hidden;
  background-color: ${({ bgColor }) => bgColor || backgroundColor};
  z-index: 0;

  &::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-image: ${({ backgroundImage }) => 
      backgroundImage ? `url(${backgroundImage})` : 'none'};
    background-size: cover;
    background-position: center;
    opacity: 0.2;
    filter: blur(8px) grayscale(60%);
    z-index: -1;
    transform: scale(1.05);
  }
`;