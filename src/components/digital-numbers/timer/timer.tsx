import { useEffect, useRef, useState } from "react";
import { BasicNumbers, GameStatus, ONE_SEC_MS, SECOND_DECADE_COUNTER, SECOND_HUNDRED_COUNTER, SECOND_UNIT_COUNTER, TIME_FAIL_CONDITION } from "utils/constants";
import * as S from "../numbers.style";
import NumberDigits from "../number-digits";
import { useGameData } from "store";
import { getGameStatus, setGameStatus } from "store/selector";

const Timer = () => {
  const intervalId = useRef<NodeJS.Timer | null>(null);
  const setStatus = useGameData(setGameStatus);

  const [startTime, setStartTime] = useState<number | null>(null);
  const [now, setNow] = useState<number | null>(null);
  const [secondsPassed, setSecondsPassed] = useState(0);

  const [unit, setUnit] = useState<number>(BasicNumbers.Zero);
  const [decade, setDecade] = useState<number>(BasicNumbers.Zero);
  const [hundred, setHundred] = useState<number>(BasicNumbers.Zero);

  const isReset = useGameData(getGameStatus) === GameStatus.Reset;
  const isFail = useGameData(getGameStatus) === GameStatus.Fail;

  useEffect(() => {
    clearInterval(intervalId.current as NodeJS.Timer);
  }, [isFail])

  useEffect(() => {
    setStartTime(Date.now());
    setNow(Date.now());

    intervalId.current = setInterval(() => setNow(Date.now()), ONE_SEC_MS);

    return () => clearInterval(intervalId.current as NodeJS.Timer);
  }, [isReset])

  useEffect(() => {
    if(secondsPassed >= TIME_FAIL_CONDITION) {
      setStatus(GameStatus.Fail);
    }

    if (startTime != null && now != null) {
      setSecondsPassed((now - startTime) / ONE_SEC_MS);
    }

    const stringTimeDifference = '00' + secondsPassed.toFixed(0);
    const stringUnit = stringTimeDifference.at(-SECOND_UNIT_COUNTER);
    const stringDecade = stringTimeDifference.at(-SECOND_DECADE_COUNTER);
    const stringHundred = stringTimeDifference.at(-SECOND_HUNDRED_COUNTER);

    setUnit(Number(stringUnit));
    setDecade(Number(stringDecade));
    setHundred(Number(stringHundred));
  }, [now, secondsPassed, setStatus, startTime])

  return(
    <S.NumbersWrapper>
      <NumberDigits value={hundred}/>
      <NumberDigits value={decade}/>
      <NumberDigits value={unit}/>
    </S.NumbersWrapper>
  );
};

export default Timer;
