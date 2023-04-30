import Dashboard from "components/dashboard/dashboard";
import Playground from "components/playground/playground";
import { addFieldSelector, clearEntities, getEntities } from "store/selector";
import { usePlaygroundStore } from "store/store";
import { BOMB, LINE_LENGTH, TimerKind } from "utils/constants";
import * as S from "./app.style";
import { useEffect } from "react";

type GeneralFieldType = {
  id: string,
  coordinates: [number, number],
  showOffContent: string | null,
  isOpen: boolean,
  hiddenContent: number,
}

const generateInitialField = () => {
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

const App = () => {
  const addNewField = usePlaygroundStore(addFieldSelector);
  const clearFields = usePlaygroundStore(clearEntities);

  useEffect(() => {
    const x = generateInitialField();
    x.forEach((line) => addNewField(line.id, line));
    console.log(x);

    return() => clearFields();
  })

  return (
    <S.AppWrapper>
      <Dashboard />
      <S.DecorationSplit />
      <Playground />
    </S.AppWrapper>
  );
}

export default App;
