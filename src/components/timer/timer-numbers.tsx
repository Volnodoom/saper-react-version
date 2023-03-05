import { BasicNumbers } from "utils/constants";
import * as S from "./timer.style";

const TimerNumbers = (props: {timeValue: number}) => {
  const timeValue = props.timeValue;

  switch(timeValue) {
    case BasicNumbers.Zero:
      return <S.TimeZero />
    case BasicNumbers.One:
      return <S.TimeOne />
    case BasicNumbers.Two:
      return <S.TimeTwo />
    case BasicNumbers.Three:
      return <S.TimeTree />
    case BasicNumbers.Four:
      return <S.TimeFour />
    case BasicNumbers.Five:
      return <S.TimeFive />
    case BasicNumbers.Six:
      return <S.TimeSix />
    case BasicNumbers.Seven:
      return <S.TimeSeven />
    case BasicNumbers.Eight:
      return <S.TimeEight />
    case BasicNumbers.Nine:
      return <S.TimeNine />
    default:
      return <S.TimeZero />
  }
};

export default TimerNumbers;
