import { useEffect, useState } from "react";
import { BOMBS_NUMBER, BasicNumbers, FLAGS_DIGITS_NUMBER, GameStatus, LOCALIZATION } from "utils/constants";
import NumberDigits from "../number-digits";
import * as S from "../numbers.style";
import { useGameData } from "store";
import { getFlagGlobal, getGameStatus, setFlagGlobalNumber } from "store/selector";

const FlagsCounter = () => {
  const globalFlagsNumber = useGameData(getFlagGlobal);
  const setGlobalFlagsNumber = useGameData(setFlagGlobalNumber);
  const isReset = useGameData(getGameStatus) === GameStatus.Reset;

  const [unit, setUnit] = useState<number>(BasicNumbers.Zero);
  const [decade, setDecade] = useState<number>(BasicNumbers.Zero);
  const [hundred, setHundred] = useState<number>(BasicNumbers.Zero);
  const [isNegative, setIsNegative] = useState(false);

  useEffect(() => {
    let flagsNumber = globalFlagsNumber;

    if(globalFlagsNumber < 0) {
      setIsNegative(true);
      flagsNumber = Math.abs(flagsNumber);
    }

    if(globalFlagsNumber >= 0 && isNegative) {
      setIsNegative(false);
    }

    const formatter = new Intl.NumberFormat(LOCALIZATION, {minimumIntegerDigits: FLAGS_DIGITS_NUMBER});
    const [firstDigit, secondDigit, thirdDigit] = formatter
      .format(flagsNumber)
      .replace(/(\d{1})?(\d{1})?(\d{1})?(\d{1,})?/, '$1 $2 $3')
      .split(' ')
      .reverse();

    if(unit !== +firstDigit) {
      setUnit(+firstDigit);
    }

    if(decade !== +secondDigit) {
      setDecade(+secondDigit);
    }

    if(hundred !== +thirdDigit) {
      setHundred(+thirdDigit);
    }

  }, [decade, globalFlagsNumber, hundred, isNegative, unit])

  //place logic to reset button
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
        <NumberDigits key={`${hundred}-hundred`} value={hundred}/>
      </>

      <NumberDigits key={`${decade}-decade`} value={decade}/>
      <NumberDigits key={`${unit}-unit`} value={unit}/>
    </S.NumbersWrapper>
  );
};

export default FlagsCounter;
