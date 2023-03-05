import styled, { css } from "styled-components";
import Button from "components/styled/button/button";
import saperSprite from "assets/img/saper-sprite.png"

const baseTimer = css`
  width: 13px;
  height: 23px;
  background: url(${saperSprite}) no-repeat;
`;

const TimeZero = styled(Button)`
  ${baseTimer};
  background-position: 100% 0%;
`;

const TimeOne = styled(Button)`
  ${baseTimer};
  background-position: 0% 0%;
`;

const TimeTwo = styled(Button)`
  ${baseTimer};
  background-position: 11% 0%;
`;

const TimeTree = styled(Button)`
  ${baseTimer};
  background-position: 22.5% 0%;
`;

const TimeFour = styled(Button)`
  ${baseTimer};
  background-position: 33.4% 0%;
`;

const TimeFive = styled(Button)`
  ${baseTimer};
  background-position: 44.5% 0%;
`;

const TimeSix = styled(Button)`
  ${baseTimer};
  background-position: 55.5% 0%;
`;

const TimeSeven = styled(Button)`
  ${baseTimer};
  background-position: 66.8% 0%;
`;

const TimeEight = styled(Button)`
  ${baseTimer};
  background-position: 77.5% 0%;
`;

const TimeNine = styled(Button)`
  ${baseTimer};
  background-position: 88.5% 0%;
`;

const TimeWrapper = styled.div`
  display: flex;
  margin: 20px;
`

export {
  TimeZero,
  TimeOne,
  TimeTwo,
  TimeTree,
  TimeFour,
  TimeFive,
  TimeSix,
  TimeSeven,
  TimeEight,
  TimeNine,
  TimeWrapper,
}
