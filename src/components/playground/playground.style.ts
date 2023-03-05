import styled from "styled-components";

const PlaygroundWrapper = styled.div`
  display: grid;
  grid-template-columns: repeat(16, 16px);
  grid-auto-rows: 16px;

  background-color: ${({ theme }) => theme.color.greyCover };
  border: 3px inset ${({theme}) => theme.color.greyBorder};
  border-radius: 2px;
`;

export {
  PlaygroundWrapper,
}
