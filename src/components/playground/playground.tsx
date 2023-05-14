import { useEffect } from "react";
import { clearActiveField, getActiveField, getEntities, setGameStatus, updateFieldsSelector } from "store/selector";
import { ElementInfo } from "store/single-field-data";
import { useGameData, usePlaygroundStore } from "store";
import { BOMB, BOMBS_NUMBER, GameStatus, LINE_LENGTH } from "utils/constants";
import * as S from "./playground.style";
import { getHiddenValue, revealEmptyFieldsInArea } from "utils/utils";
import SingleBlock from "components/single-block/single-block";

const Playground = () => {
  const getAllFields = usePlaygroundStore(getEntities);
  const activeFieldCoordinates = usePlaygroundStore(getActiveField);
  const updateFields = usePlaygroundStore(updateFieldsSelector);
  const clearActiveElement = usePlaygroundStore(clearActiveField);
  const setStatus = useGameData(setGameStatus);

  //logic for revealing fields
  useEffect(() => {
    const surroundedFields: [number, number] [] = [];
    const allFieldsCopy = getAllFields.map((value) => Object.assign({}, value));

    if(activeFieldCoordinates.length) {
      const hiddenContent = getHiddenValue(allFieldsCopy, activeFieldCoordinates);
      const isElementNearBomb = Boolean(hiddenContent);

      if(isElementNearBomb) {
        return;
      }

      revealEmptyFieldsInArea(surroundedFields, activeFieldCoordinates, allFieldsCopy);

      for (const line of surroundedFields) {
        const [xDot, yDot] = line;
        const hiddenValue = getHiddenValue(allFieldsCopy, [xDot, yDot]);
        const isOpen = allFieldsCopy[yDot * LINE_LENGTH + xDot].isOpen;

        if(hiddenValue !== null && hiddenValue === BOMB && isOpen) {
          continue;
        }

        const currentElement = allFieldsCopy.find((line) => line.id === `${xDot}@${yDot}`);
        if(currentElement && !isOpen) {
          (currentElement as ElementInfo).isOpen = true;
        }

        revealEmptyFieldsInArea(surroundedFields, line, allFieldsCopy);
      }

      updateFields(allFieldsCopy);
      clearActiveElement();
    }
  },[activeFieldCoordinates, clearActiveElement, getAllFields, updateFields])

  //logic for win condition
  useEffect(() => {
    const hiddenFieldsNumber = getAllFields.filter((fieldInfo) => fieldInfo.isOpen === false);
    const isHiddenFieldsLimited = hiddenFieldsNumber.length === BOMBS_NUMBER;

    const flagFields = hiddenFieldsNumber.filter((fieldInfo) => fieldInfo.hasFlag === true);
    const isFlagsLimited = flagFields.length === BOMBS_NUMBER;

    const isFlagsOnBombs = flagFields.filter((fieldInfo) => fieldInfo.hiddenContent === BOMB)
      .length === BOMBS_NUMBER

    if(isHiddenFieldsLimited && isFlagsLimited && isFlagsOnBombs) {
      setStatus(GameStatus.Win);
    }

  }, [getAllFields, setStatus]);

  return(
    <S.PlaygroundWrapper>
      {
        getAllFields.map((item, index) => (
          <SingleBlock
            blockInfo={item}
            key={`uniq-key-${index}`}
          />
        ))
      }
    </S.PlaygroundWrapper>
  );
};

export default Playground;
