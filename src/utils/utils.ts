import { ElementInfo } from "store/single-field-data";
import { BOMB, LINE_LENGTH } from "./constants";

type RevealFieldsType = (
  coordinatesStore: [number, number][],
  [xCoordinate, yCoordinate]: number [],
  copyOfAllFields: ElementInfo[]
  ) => void;

type GeneralFieldType = {
  id: string,
  coordinates: [number, number],
  showOffContent: string | null,
  isOpen: boolean,
  hiddenContent: number,
}

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

export const generateInitialField = () => {
  let xLine = 0;
  let yLine = 0;

  const calculateBombArea = (xCoordinate: number, yCoordinate: number) => {
    if(xCoordinate >= 0 && xCoordinate < LINE_LENGTH && yCoordinate >= 0 && yCoordinate < LINE_LENGTH) {
      const currentElement = generalField[yCoordinate * LINE_LENGTH + xCoordinate];
      if(generalField[yCoordinate * LINE_LENGTH + xCoordinate].hiddenContent === BOMB) {
        return;
      }

      generalField[yCoordinate * LINE_LENGTH + xCoordinate].hiddenContent = currentElement.hiddenContent + 1;
    }
  }

  const generalField: GeneralFieldType[] = Array.from({length: LINE_LENGTH*LINE_LENGTH}, (item, index) => {
    if(++index % LINE_LENGTH === 0) {
      const coordinates: [number, number] = [xLine++, yLine];
      xLine = 0;
      yLine++;

      return ({
        id: `${coordinates[0]}@${coordinates[1]}`,
        coordinates,
        isOpen: false,
        hiddenContent: 0,
        showOffContent: null,
      })
    }

    return ({
      id: `${xLine}@${yLine}`,
      coordinates: [xLine++, yLine],
      isOpen: false,
      hiddenContent: 0,
      showOffContent: null,
    })
  })

  for(let i = 0; i < LINE_LENGTH;) {
    const coordinateX = Math.floor(Math.random() * LINE_LENGTH);
    const coordinateY = Math.floor(Math.random() * LINE_LENGTH);

    if(generalField[coordinateY * LINE_LENGTH + coordinateX].hiddenContent === BOMB) {
      continue;
    }

    generalField[coordinateY * LINE_LENGTH + coordinateX].hiddenContent = BOMB;
    calculateBombArea(coordinateX, coordinateY - 1);
    calculateBombArea(coordinateX, coordinateY + 1);
    calculateBombArea(coordinateX - 1, coordinateY);
    calculateBombArea(coordinateX + 1, coordinateY);
    calculateBombArea(coordinateX + 1, coordinateY + 1);
    calculateBombArea(coordinateX - 1, coordinateY - 1);
    calculateBombArea(coordinateX + 1, coordinateY - 1);
    calculateBombArea(coordinateX - 1, coordinateY + 1);
    i++;
  }
  return generalField;
}
