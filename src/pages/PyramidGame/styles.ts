import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  flex: 1;
  height: 100vh;
  padding: 1rem;
  background-color: #eee;
  align-items: center;
  justify-content: center;
  overflow: hidden;
`;

export const PyramidRow = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
`;

export const Pyramid = styled.div`
  display: flex;
  flex-direction: column;

  & ${PyramidRow}:not(:first-child) {
    margin-top: -30px;
  }
`;

export const ExtraCardsBox = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;

  & button {
    border: none;
    background-color: rgb(179, 192, 248);
    margin: 0 10px;
    width: 50px;
    height: 50px;
    border-radius: 5px;
  }

  & button:hover {
    filter: brightness(90%);
    cursor: pointer;
  }

  & button:active {
    filter: brightness(70%);
  }

  & button:active {
    outline: none;
  }
`;

export const CardPlaceholder = styled.div`
  border: 1px rgb(0, 0, 0) solid;
  width: 4.5rem;
  border-radius: 5px;
  height: 5.5rem;
`;
