import styled, { css } from "styled-components";
import Button from "components/styled/button/button";
import saperSprite from "assets/img/saper-sprite.png"

const solidBase = css`
  width: 13px;
  height: 23px;
  background: url(${saperSprite}) no-repeat;
`;

const NumbersZero = styled(Button)`
  ${solidBase};
  background-position: 100% 0%;
`;

const NumbersOne = styled(Button)`
  ${solidBase};
  background-position: 0% 0%;
`;

const NumbersTwo = styled(Button)`
  ${solidBase};
  background-position: 11% 0%;
`;

const NumbersTree = styled(Button)`
  ${solidBase};
  background-position: 22.5% 0%;
`;

const NumbersFour = styled(Button)`
  ${solidBase};
  background-position: 33.4% 0%;
`;

const NumbersFive = styled(Button)`
  ${solidBase};
  background-position: 44.5% 0%;
`;

const NumbersSix = styled(Button)`
  ${solidBase};
  background-position: 55.5% 0%;
`;

const NumbersSeven = styled(Button)`
  ${solidBase};
  background-position: 66.8% 0%;
`;

const NumbersEight = styled(Button)`
  ${solidBase};
  background-position: 77.5% 0%;
`;

const NumbersNine = styled(Button)`
  ${solidBase};
  background-position: 88.5% 0%;
`;

const NumbersWrapper = styled.div`
  display: flex;
`;

const NumbersSpan = styled.span`
  margin-right: 0.5em;
  font-size: 0.6rem;
  font-weight: 600;

`;

export {
  NumbersZero,
  NumbersOne,
  NumbersTwo,
  NumbersTree,
  NumbersFour,
  NumbersFive,
  NumbersSix,
  NumbersSeven,
  NumbersEight,
  NumbersNine,
  NumbersWrapper,
  NumbersSpan
}
