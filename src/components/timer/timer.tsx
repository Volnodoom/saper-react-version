import { useEffect, useRef, useState } from "react";
import { BasicNumbers, GENERAL_TIME_MS, MINUTE_DECADE_COUNTER, MINUTE_UNIT_COUNTER, ONE_MINUTE_MS, ONE_SEC_MS, SECOND_DECADE_COUNTER, SECOND_HUNDRED_COUNTER, SECOND_UNIT_COUNTER, SIXTY, TimerKind } from "utils/constants";
import TimerNumbers from "./timer-numbers";
import * as S from "./timer.style";

const Timer = (prop: {timerType: TimerKind}) => {
  const timerType = prop.timerType;

  const fixedMinuteTime = useRef<Date | null>(null);
  const fixedSecondTime = useRef<Date | null>(null);

  const [unit, setUnit] = useState<number>(BasicNumbers.Zero);
  const [decade, setDecade] = useState<number>(BasicNumbers.Zero);
  const [hundred, setHundred] = useState<number>(BasicNumbers.Zero);

  useEffect(() => {
    const deadlineDate = new Date();
    fixedSecondTime.current = new Date();
    deadlineDate.setTime(deadlineDate.getTime() + GENERAL_TIME_MS);
    fixedMinuteTime.current = deadlineDate;
  }, [])

  const calculateSecondTime = () => {
    if(!fixedSecondTime.current) {
      setUnit(BasicNumbers.Zero);
      setDecade(BasicNumbers.Zero);
      setHundred(BasicNumbers.Zero);
      return;
    }

    const timeDifference = Date.now() - Date.parse(fixedSecondTime.current.toString());
    const stringTimeDifference = String(timeDifference);
    const stringUnit = stringTimeDifference.at(-SECOND_UNIT_COUNTER);
    const stringDecade = stringTimeDifference.at(-SECOND_DECADE_COUNTER);
    const stringHundred = stringTimeDifference.at(-SECOND_HUNDRED_COUNTER);

    setUnit(Number(stringUnit));

    if(!stringDecade) {
      setDecade(BasicNumbers.Zero);
    }

    if(stringDecade) {
      setDecade(Number(stringDecade));
    }

    if(!stringHundred) {
      setHundred(BasicNumbers.Zero);
    }

    if(stringHundred) {
      setHundred(Number(stringHundred));
    }
  }

  const calculateMinuteTime = () => {
    if(!fixedMinuteTime.current) {
      setUnit(BasicNumbers.Zero);
      setDecade(BasicNumbers.Zero);
      setHundred(BasicNumbers.Zero);
      return;
    }

    const timeDifference = Date.parse(fixedMinuteTime.current.toString()) - Date.now();
    const restOfMinutes = Math.floor(timeDifference/(ONE_MINUTE_MS) % SIXTY).toString();
    const stringUnit = restOfMinutes.at(-MINUTE_UNIT_COUNTER);
    const stringDecade = restOfMinutes.at(-MINUTE_DECADE_COUNTER);

    if(!stringUnit) {
      setUnit(BasicNumbers.Zero);
    }

    if(stringUnit) {
      setUnit(Number(stringUnit));
    }

    if(!stringDecade) {
      setDecade(BasicNumbers.Zero);
    }

    if(stringDecade) {
      setDecade(Number(stringDecade));
    }
  }

  useEffect(() => {
    if(timerType === TimerKind.Seconds) {
      const secondInterval = setInterval(() => calculateSecondTime(), ONE_SEC_MS);

      return () => clearInterval(secondInterval);
    } else {
      const minuteInterval = setInterval(() => calculateMinuteTime(), ONE_SEC_MS);

      return () => clearInterval(minuteInterval);
    }

  }, [timerType])

  return(
    <S.TimeWrapper>
      <TimerNumbers timeValue={hundred}/>
      <TimerNumbers timeValue={decade}/>
      <TimerNumbers timeValue={unit}/>
    </S.TimeWrapper>
  );
};

export default Timer;
