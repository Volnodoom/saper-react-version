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

const emptyField = css`
  background-position: 14% 75%;
`;

const bombExplosionField = css`
  background-position: 83.5% 75%;
`;

const fieldOne = css`
  background-position: 0 100%;
`;

const fieldTwo = css`
  background-position: 13.9% 100%;
`;

const fieldThree = css`
  background-position: 27.7% 100%;
`;

const fieldFour = css`
  background-position: 41.6% 100%;
`;

const fieldFive = css`
  background-position: 55.4% 100%;
`;

const fieldSix = css`
  background-position: 69.2% 100%;
`;

const fieldSeven = css`
  background-position: 83% 100%;
`;

const fieldEight = css`
  background-position: 96.8% 100%;
`;

const InactiveField = styled(Button)<InactiveFieldType>`
  ${buttonBase};
  background-position: 0 75%;

  ${({hiddenInteraction}) => hiddenInteraction === HiddenFieldInteraction.Flag && flag}
  ${({hiddenInteraction}) => hiddenInteraction === HiddenFieldInteraction.Question && question}
  ${({hiddenInteraction}) => hiddenInteraction === HiddenFieldInteraction.QuestionEmpty && questionEmpty}
  ${({hiddenInteraction}) => hiddenInteraction === HiddenFieldInteraction.BombReveal && bombReveal}
  ${({hiddenInteraction}) => hiddenInteraction === HiddenFieldInteraction.BombDeactivation && bombDeactivation}
  ${({hiddenInteraction}) => hiddenInteraction === HiddenFieldInteraction.EmptyField && emptyField}
  ${({hiddenInteraction}) => hiddenInteraction === HiddenFieldInteraction.BombExplosionField && bombExplosionField}
  ${({hiddenInteraction}) => hiddenInteraction === HiddenFieldInteraction.FieldOne && fieldOne}
  ${({hiddenInteraction}) => hiddenInteraction === HiddenFieldInteraction.FieldTwo && fieldTwo}
  ${({hiddenInteraction}) => hiddenInteraction === HiddenFieldInteraction.FieldThree && fieldThree}
  ${({hiddenInteraction}) => hiddenInteraction === HiddenFieldInteraction.FieldFour && fieldFour}
  ${({hiddenInteraction}) => hiddenInteraction === HiddenFieldInteraction.FieldFive && fieldFive}
  ${({hiddenInteraction}) => hiddenInteraction === HiddenFieldInteraction.FieldSix && fieldSix}
  ${({hiddenInteraction}) => hiddenInteraction === HiddenFieldInteraction.FieldSeven && fieldSeven}
  ${({hiddenInteraction}) => hiddenInteraction === HiddenFieldInteraction.FieldEight && fieldEight}
`;

export {
  InactiveField,
}
