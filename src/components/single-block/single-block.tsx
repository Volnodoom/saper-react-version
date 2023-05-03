import { getGameStatus, showHiddenField, setActiveFieldElement, setGameStatus, addFlagToField, removeFlagFromField, addFlagGlobal, removeFlagGlobal } from "store/selector";
import { ElementInfo } from "store/single-field-data";
import { useGameData, usePlaygroundStore } from "store";
import { BasicNumbers, BOMB, GameStatus, HiddenFieldInteraction, RIGHT_CLICK_BUTTON } from "utils/constants";
import * as S from "./single-block.style";
import { MouseEvent, memo, useEffect, useState } from "react";

type SingleBlockType = {
  blockInfo: ElementInfo,
}

const SingleBlock = ({blockInfo}: SingleBlockType) => {
  const {
    id,
    coordinates,
    hasFlag,
    hiddenContent,
    isOpen,
  } = blockInfo;

  const revealField = usePlaygroundStore(showHiddenField);
  const setActiveElement = usePlaygroundStore(setActiveFieldElement);
  const setStatus = useGameData(setGameStatus);
  const currentStatus = useGameData(getGameStatus);
  const addFieldFlag = usePlaygroundStore(addFlagToField);
  const removeFieldFlag = usePlaygroundStore(removeFlagFromField);
  const addGlobalFlag = useGameData(addFlagGlobal);
  const removeGlobalFlag = useGameData(removeFlagGlobal);

  const [counterClick, setCounterClick] = useState(0);
  const [hiddenInteractionValue, setHiddenInteractionValue] = useState(HiddenFieldInteraction.Empty)

  useEffect(() => {
    if(currentStatus === GameStatus.Reset) {
      setCounterClick(0);
      setHiddenInteractionValue(HiddenFieldInteraction.Empty);
    }
  }, [currentStatus])

  const calculateHiddenInteraction = () => {
    if(currentStatus === GameStatus.Fail && hiddenContent === BOMB) {
      if(hasFlag) {
        return HiddenFieldInteraction.BombDeactivation;
      }
      if(isOpen) {
        return HiddenFieldInteraction.BombExplosionField;
      }

      return HiddenFieldInteraction.BombReveal;
    }

    if(currentStatus === GameStatus.Win && hiddenContent === BOMB) {
      return HiddenFieldInteraction.BombDeactivation;
    }

    if(isOpen) {
      if(hiddenContent === BasicNumbers.Zero) {
        return HiddenFieldInteraction.EmptyField;
      } else if(hiddenContent === BasicNumbers.One) {
        return HiddenFieldInteraction.FieldOne;
      } else if(hiddenContent === BasicNumbers.Two) {
        return HiddenFieldInteraction.FieldTwo;
      } else if(hiddenContent === BasicNumbers.Three) {
        return HiddenFieldInteraction.FieldThree;
      } else if(hiddenContent === BasicNumbers.Four) {
        return HiddenFieldInteraction.FieldFour;
      } else if(hiddenContent === BasicNumbers.Five) {
        return HiddenFieldInteraction.FieldFive;
      } else if(hiddenContent === BasicNumbers.Six) {
        return HiddenFieldInteraction.FieldSix;
      } else if(hiddenContent === BasicNumbers.Seven) {
        return HiddenFieldInteraction.FieldSeven;
      } else if(hiddenContent === BasicNumbers.Eight) {
        return HiddenFieldInteraction.FieldEight;
      }
    }

    return hiddenInteractionValue;
  }

  const handleRightClick = () => {
    let updatedClick = counterClick + 1;
    if(currentStatus === GameStatus.Fail || currentStatus === GameStatus.Win) {
      return;
    }

    if(updatedClick === BasicNumbers.One) {
      addFieldFlag(id);
      removeGlobalFlag();
      setHiddenInteractionValue(HiddenFieldInteraction.Flag);
    }

    if(updatedClick === BasicNumbers.Two) {
      removeFieldFlag(id);
      addGlobalFlag();
      setHiddenInteractionValue(HiddenFieldInteraction.Question);
    }

    if(updatedClick > BasicNumbers.Two) {
      setHiddenInteractionValue(HiddenFieldInteraction.Empty);
      setCounterClick(0);
      return;
    }

    setCounterClick(prev => prev + 1);
  }

  const handleOpenClick = (evt: MouseEvent) => {
    if(evt.button === RIGHT_CLICK_BUTTON) {
      handleRightClick();
      return;
    }

    if(currentStatus === GameStatus.Fail || currentStatus === GameStatus.Win) {
      return;
    }

    if(hasFlag || isOpen) {
      return;
    }

    if(hiddenContent === BOMB) {
      setStatus(GameStatus.Fail);
    } else {
      setStatus(GameStatus.Idle)
    }

    revealField(id);
    setActiveElement(coordinates);
  }

  const handleDownClick = (evt: MouseEvent) => {
    if(evt.button === RIGHT_CLICK_BUTTON || hasFlag) {
      return;
    }

    if(currentStatus === GameStatus.Fail || currentStatus === GameStatus.Win) {
      return;
    }

    setStatus(GameStatus.Unsure)
  }

  return(
    <S.InactiveField
      hiddenInteraction={calculateHiddenInteraction()}
      onMouseDown={handleDownClick}
      onMouseUp={handleOpenClick}
    />);
};

export default memo(SingleBlock);
