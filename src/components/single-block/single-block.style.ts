import styled, { css } from "styled-components";
import saperSprite from "assets/img/saper-sprite.png"
import Button from "components/styled/button/button";
import { HiddenFieldInteraction } from "utils/constants";

type InactiveFieldType = {
  hiddenInteraction? : HiddenFieldInteraction
};

const buttonBase = css`
  width: 16px;
  height: 16px;
  background: url(${saperSprite}) no-repeat;
`;

const flag = css`
  background-position: 28% 75%;
`;

const question = css`
  background-position: 42% 75%;
`;

const questionEmpty = css`
  background-position: 55.5% 75%;
`;

const bombReveal = css`
  background-position: 69.5% 75%;
`;

const bombDeactivation = css`
  background-position: 97% 75%;
`;

const InactiveField = styled(Button)<InactiveFieldType>`
  ${buttonBase};
  background-position: 0 75%;

  ${({hiddenInteraction}) => hiddenInteraction === HiddenFieldInteraction.Flag && flag}
  ${({hiddenInteraction}) => hiddenInteraction === HiddenFieldInteraction.Question && question}
  ${({hiddenInteraction}) => hiddenInteraction === HiddenFieldInteraction.QuestionEmpty && questionEmpty}
  ${({hiddenInteraction}) => hiddenInteraction === HiddenFieldInteraction.BombReveal && bombReveal}
  ${({hiddenInteraction}) => hiddenInteraction === HiddenFieldInteraction.BombDeactivation && bombDeactivation}

`;

const EmptyField = styled(Button)`
  ${buttonBase};
  background-position: 14% 75%;
`;

const BombExplosionField = styled(Button)`
  ${buttonBase};
  background-position: 83.5% 75%;
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
  BombExplosionField,
  FieldOne,
  FieldTwo,
  FieldThree,
  FieldFour,
  FieldFive,
  FieldSix,
  FieldSeven,
  FieldEight,
}
