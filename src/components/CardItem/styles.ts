import styled from 'styled-components';

type ContainerProps = {
  selected: boolean;
};

export const Container = styled.div<ContainerProps>`
  box-shadow: 1px 1px #00000022;
  width: 4.5rem;
  border-radius: 5px;
  height: 5.5rem;
  z-index: 10;
  ${(props) =>
    props.selected &&
    `box-shadow: 1px 1px 5px #3282fa;
  `}

  & img {
    width: 100%;
    height: 100%;
  }
`;

export const ContainerInvisible = styled.div`
  width: 4.5rem;
  border-radius: 5px;
  height: 5.5rem;
`;
