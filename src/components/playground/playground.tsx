import SingleBlock from "components/single-block/single-block";
import { useEffect } from "react";
import { addFieldSelector, updateIsOpenFieldSelector, updateShowOffFieldSelector } from "store/selector";
import { usePlaygroundStore } from "store/store";
import { BasicNumbers, NUMBER_OF_ELEMENTS, ZERO } from "utils/constants";
import * as S from "./playground.style";

const getKeyNameForFieldContent = (checkNumber: number): string  => {
  const reversObject: {[x: string]: string} = {}
  for(const [key, value] of Object.entries(BasicNumbers)) {
    Object.assign(reversObject, {[value]: key})
  }

  return reversObject[String(checkNumber)]
};

type CurrentElementType = {
  coordinates: number[],
  showOffContent: string | null,
}

const Playground = () => {
  const LINE_LENGTH = 5;
  const addNewField = usePlaygroundStore(addFieldSelector);
  const updateShowOffField = usePlaygroundStore(updateShowOffFieldSelector);
  const updateIsOpenField = usePlaygroundStore(updateIsOpenFieldSelector);

  let xLine = 1;
  let yLine = 1;

  const squareFragments = Array.from({length: NUMBER_OF_ELEMENTS}, (item, index) => {
    if(index === 7) {
      xLine++;
      return {
        id: '3@2',
        coordinates: [3, 2],
        isBomb: true,
        isOpen: false,
        showOffContent: null,
      }
    }

    if(index === 0) {
      xLine++;
      return ({
        id: '1@1',
        coordinates: [1, 1],
        isBomb: false,
        isOpen: false,
        showOffContent: null,
      })
    }

    if(++index % LINE_LENGTH === 0) {
      const coordinates = [xLine++, yLine];
      xLine = 1;
      yLine++;

      return ({
        id: `${coordinates[0]}@${coordinates[1]}`,
        coordinates,
        isBomb: false,
        isOpen: false,
        showOffContent: null,
      })
    }

    return ({
      id: `${xLine++}@${yLine}`,
      coordinates: [xLine++, yLine],
      isBomb: false,
      isOpen: false,
      showOffContent: null,
    })
  });

  useEffect(() => {
    squareFragments.forEach((line) => addNewField(line.id, line));
  }, [addNewField, squareFragments])

  const checkAroundField = (fieldId: string, coordinates: [number, number]) => {
    let adjustField: [number, number][] = [];

    for(let currentY = coordinates[1] - 1; currentY <= coordinates[1] + 1; currentY++) {
      for(let currentX = coordinates[0] - 1; currentX <= coordinates[0] + 1; currentX++) {
        if(currentX > 0 && currentX <= LINE_LENGTH && currentY > 0 && currentY <= LINE_LENGTH) {
          adjustField.push([currentX, currentY]);
        }
      }
    }

    const bombsCount = adjustField.reduce((accumulate, matchedCoordinates) => {
      let bombsNumber: number;

      const findMatches = squareFragments.find((line) => {
        if(line.coordinates[0] === matchedCoordinates[0] && line.coordinates[1] === matchedCoordinates[1]) {
          return true;
        } else {
          return false;
        }
      });

      if(findMatches) {
        bombsNumber = findMatches.isBomb ? 1 : 0;
      } else {
        bombsNumber = 0;
      }
      return accumulate += bombsNumber;
    }, 0)

    if(bombsCount > 0) {
      updateShowOffField(fieldId, getKeyNameForFieldContent(bombsCount));
    } else {
      updateIsOpenField(fieldId, true);
      updateShowOffField(fieldId, ZERO);

      // for(const [coordinateX, coordinateY] of adjustField) {
      //   if()
      // }
    }
  }

  return(
    <S.PlaygroundWrapper>
      {
        squareFragments.map((item, index) => <SingleBlock isBomb={item.isBomb} key={`uniq-key-${index}`}/>)
      }
    </S.PlaygroundWrapper>
  );
};

export default Playground;
