import { useGameData, usePlaygroundStore } from "store";
import * as S from "./central-button.style";
import { addFieldSelector, clearActiveField, clearEntities, getGameStatus, setGameStatus } from "store/selector";
import { GameStatus } from "utils/constants";
import { generateInitialField } from "utils/utils";

const CentralButton = () => {
  const currentButtonStatus = useGameData(getGameStatus);
  const setButtonStatus = useGameData(setGameStatus);
  const addNewField = usePlaygroundStore(addFieldSelector);
  const clearFields = usePlaygroundStore(clearEntities);
  const clearActiveElement = usePlaygroundStore(clearActiveField);

  const handleDownPress = () => {
    setButtonStatus(GameStatus.Reset);
  }

  const handleUpPress = () => {
    clearFields();
    clearActiveElement();
    generateInitialField().forEach((line) => addNewField(line.id, line));
    setButtonStatus(GameStatus.Idle);
  }

  return <S.CentralButton
    faceType={currentButtonStatus}
    onMouseDown={handleDownPress}
    onMouseUp={handleUpPress}
  />;
};

export default CentralButton;
