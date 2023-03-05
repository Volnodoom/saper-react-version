import styled, { css } from "styled-components";
import saperSprite from "assets/img/saper-sprite.png"
import Button from "components/styled/button/button";

const buttonBase = css`
  width: 16px;
  height: 16px;
  background: url(${saperSprite}) no-repeat;
`;

const InactiveField = styled(Button)`
  ${buttonBase};
  background-position: 0 75%;
`;

const EmptyField = styled(Button)`
  ${buttonBase};
  background-position: 14% 75%;
`;

const FlagField = styled(Button)`
  ${buttonBase};
  background-position: 28% 75%;
`;

const QuestionField = styled(Button)`
  ${buttonBase};
  background-position: 42% 75%;
`;

const QuestionEmptyField = styled(Button)`
  ${buttonBase};
  background-position: 55.5% 75%;
`;

const BombField = styled(Button)`
  ${buttonBase};
  background-position: 69.5% 75%;
`;

const BombExplosionField = styled(Button)`
  ${buttonBase};
  background-position: 83.5% 75%;
`;

const BombMissField = styled(Button)`
  ${buttonBase};
  background-position: 97% 75%;
`;

const FieldOne = styled(Button)`
  ${buttonBase};
  background-position: 0 100%;
`;

const FieldTwo = styled(Button)`
  ${buttonBase};
  background-position: 13.9% 100%;
`;

const FieldThree = styled(Button)`
  ${buttonBase};
  background-position: 27.7% 100%;
`;

const FieldFour = styled(Button)`
  ${buttonBase};
  background-position: 41.6% 100%;
`;

const FieldFive = styled(Button)`
  ${buttonBase};
  background-position: 55.4% 100%;
`;

const FieldSix = styled(Button)`
  ${buttonBase};
  background-position: 69.2% 100%;
`;

const FieldSeven = styled(Button)`
  ${buttonBase};
  background-position: 83% 100%;
`;

const FieldEight = styled(Button)`
  ${buttonBase};
  background-position: 96.8% 100%;
`;

export {
  InactiveField,
  EmptyField,
  FlagField,
  QuestionField,
  QuestionEmptyField,
  BombField,
  BombExplosionField,
  BombMissField,
  FieldOne,
  FieldTwo,
  FieldThree,
  FieldFour,
  FieldFive,
  FieldSix,
  FieldSeven,
  FieldEight,
}
