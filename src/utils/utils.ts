import { ElementInfo } from "store/store";
import { BOMB, LINE_LENGTH } from "./constants";

type RevealFieldsType = (
  coordinatesStore: [number, number][],
  [xCoordinate, yCoordinate]: number [],
  copyOfAllFields: ElementInfo[]
  ) => void;


const isCurrentElementLimit = (copyOfAllFields: ElementInfo[], [dotX, dotY]: number [],) => {
  const element = copyOfAllFields[dotY * LINE_LENGTH + dotX];
  return element.hiddenContent === BOMB || Boolean(element.hiddenContent)
}

export const revealEmptyFieldsInArea: RevealFieldsType = (coordinatesStore, [xCoordinate, yCoordinate], copyOfAllFields) => {
  for(let currentY = yCoordinate - 1; currentY <= yCoordinate + 1; currentY++) {
    if(currentY < 0 || currentY >= LINE_LENGTH) {
      continue;
    }

    if(isCurrentElementLimit(copyOfAllFields, [xCoordinate, currentY])) {
      // this condition to prevent revealing field on diagonal for Y
      continue;
    }

    for(let currentX = xCoordinate - 1; currentX <= xCoordinate + 1; currentX++) {
      if(currentX < 0 || (currentX >= LINE_LENGTH)) {
        continue;
      }

      if(isCurrentElementLimit(copyOfAllFields, [currentX, yCoordinate])) {
        // this condition to prevent revealing field on diagonal for X
        continue;
      }

      if(isCurrentElementLimit(copyOfAllFields, [currentX, currentY])) {
        continue;
      }

      const hasValue = (valueX: number, valueY: number) => coordinatesStore
        .some(([itemX, itemY]) => valueX === itemX && valueY === itemY);


      if(!hasValue(currentX, currentY)) {
        coordinatesStore.push([currentX, currentY]);
      }
    }
  }
};

export const getHiddenValue = (dataField: ElementInfo[], [coordinateX, coordinateY]: number []) => dataField[coordinateY * LINE_LENGTH + coordinateX].hiddenContent;
