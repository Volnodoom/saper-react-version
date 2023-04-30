import { useEffect, useState } from "react";
import { BOMBS_NUMBER, BasicNumbers, FLAGS_DIGITS_NUMBER, GameStatus, LOCALIZATION } from "utils/constants";
import NumberDigits from "../numbers";
import * as S from "../numbers.style";
import { useGameData } from "store";
import { getFlagGlobal, getGameStatus, setFlagGlobalNumber } from "store/selector";

const FlagsCounter = () => {
  const globalFlagsNumber = useGameData(getFlagGlobal);
  const setGlobalFlagsNumber = useGameData(setFlagGlobalNumber);
  const currentStatus = useGameData(getGameStatus);

  const [unit, setUnit] = useState<number>(BasicNumbers.Zero);
  const [decade, setDecade] = useState<number>(BasicNumbers.Zero);
  const [hundred, setHundred] = useState<number>(BasicNumbers.Zero);
  const [isNegative, setIsNegative] = useState(false);

  const isReset = currentStatus === GameStatus.Reset;

  useEffect(() => {
    let flagsNumber = globalFlagsNumber;

    if(globalFlagsNumber < 0) {
      setIsNegative(true);
      flagsNumber = Math.abs(flagsNumber);
    }

    if(globalFlagsNumber >= 0) {
      setIsNegative(false);
    }

    const formatter = new Intl.NumberFormat(LOCALIZATION, {minimumIntegerDigits: FLAGS_DIGITS_NUMBER});
    const [firstDigit, secondDigit, thirdDigit] = formatter
    .format(flagsNumber)
    .replace(/(\d{1})?(\d{1})?(\d{1})?(\d{1,})?/, '$1 $2 $3')
    .split(' ')
    .reverse();

    setUnit(+firstDigit);
    setDecade(+secondDigit);
    setHundred(+thirdDigit);
  }, [globalFlagsNumber])

  useEffect(() => {
    if(isReset) {
      setGlobalFlagsNumber(BOMBS_NUMBER);
      setIsNegative(false);
    }

  }, [isReset, setGlobalFlagsNumber])

  return(
    <S.NumbersWrapper>
      <>
      {
        isNegative ? <S.NumbersSpan> — </S.NumbersSpan> : <></>
      }
      <NumberDigits value={hundred}/>

      </>
      <NumberDigits value={decade}/>
      <NumberDigits value={unit}/>
    </S.NumbersWrapper>
  );
};

export default FlagsCounter;
