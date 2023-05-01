import { BasicNumbers } from "utils/constants";
import * as S from "./numbers.style";

const NumberDigits = (props: {value: number}) => {
  const value = props.value;

  switch(value) {
    case BasicNumbers.Zero:
      return <S.NumbersZero />
    case BasicNumbers.One:
      return <S.NumbersOne />
    case BasicNumbers.Two:
      return <S.NumbersTwo />
    case BasicNumbers.Three:
      return <S.NumbersTree />
    case BasicNumbers.Four:
      return <S.NumbersFour />
    case BasicNumbers.Five:
      return <S.NumbersFive />
    case BasicNumbers.Six:
      return <S.NumbersSix />
    case BasicNumbers.Seven:
      return <S.NumbersSeven />
    case BasicNumbers.Eight:
      return <S.NumbersEight />
    case BasicNumbers.Nine:
      return <S.NumbersNine />
    default:
      return <S.NumbersZero />
  }
};

export default NumberDigits;
