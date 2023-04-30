import SingleBlock from "components/single-block/single-block";
import { useEffect } from "react";
import { clearActiveField, getActiveField, getEntities, updateFieldsSelector } from "store/selector";
import { ElementInfo } from "store/single-field-data";
import { usePlaygroundStore } from "store";
import { BOMB, LINE_LENGTH } from "utils/constants";
import * as S from "./playground.style";
import { getHiddenValue, revealEmptyFieldsInArea } from "utils/utils";

const Playground = () => {
  const getAllFields = usePlaygroundStore(getEntities);
  const activeFieldCoordinates = usePlaygroundStore(getActiveField);
  const updateFields = usePlaygroundStore(updateFieldsSelector);
  const clearActiveElement = usePlaygroundStore(clearActiveField);

  useEffect(() => {
    const surroundedFields: [number, number] [] = [];
    const allFieldsCopy = getAllFields.slice();

    if(activeFieldCoordinates.length) {
      const hiddenContent = getHiddenValue(allFieldsCopy, activeFieldCoordinates);
      const isElementNearBomb = Boolean(hiddenContent) || (hiddenContent && hiddenContent < 0);

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
