import styled, { css } from "styled-components";
import Button from "components/styled/button/button";
import saperSprite from "assets/img/saper-sprite.png"

const baseFace = css`
  width: 25px;
  height: 25px;
  background: url(${saperSprite}) no-repeat;
`;

const SmileFace = styled(Button)`
  ${baseFace};
  background-position: 0.5% 43%;
`;

const ResetFace = styled(Button)`
  ${baseFace};
  background-position: 24.5% 43%;
`;

const WonderFace = styled(Button)`
  ${baseFace};
  background-position: 48% 43%;
`;

const CoolFace = styled(Button)`
  ${baseFace};
  background-position: 72% 43%;
`;

const FailFace = styled(Button)`
  ${baseFace};
  background-position: 95% 43%;
`;

export {
  SmileFace,
  ResetFace,
  WonderFace,
  CoolFace,
  FailFace,
}
