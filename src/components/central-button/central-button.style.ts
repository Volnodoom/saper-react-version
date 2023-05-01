import styled, { css } from "styled-components";
import Button from "components/styled/button/button";
import saperSprite from "assets/img/saper-sprite.png"
import { GameStatus } from "utils/constants";

type CentralButtonType = {
  faceType?: GameStatus,
}

const smile = css`
  background-position: 0.5% 43%;
`;

const reset = css`
  background-position: 24.5% 43%;
`;

const unsure = css`
  background-position: 48% 43%;
`;

const win = css`
  background-position: 72% 43%;
`;

const fail = css`
  background-position: 95% 43%;
`;

const CentralButton = styled(Button)<CentralButtonType>`
  width: 25px;
  height: 25px;
  background: url(${saperSprite}) no-repeat;
  ${smile};

  ${({faceType}) => faceType === GameStatus.Unsure && unsure}
  ${({faceType}) => faceType === GameStatus.Reset && reset}
  ${({faceType}) => faceType === GameStatus.Win && win}
  ${({faceType}) => faceType === GameStatus.Fail && fail}
`;

export {
  CentralButton,
}
