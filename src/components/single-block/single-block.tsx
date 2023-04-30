import { getGameStatus, showHiddenField, setActiveFieldElement, setGameStatus, addFlagToField, removeFlagFromField, addFlagGlobal, removeFlagGlobal } from "store/selector";
import { ElementInfo } from "store/single-field-data";
import { useGameData, usePlaygroundStore } from "store";
import { BasicNumbers, BOMB, GameStatus, HiddenFieldInteraction, RIGHT_CLICK_BUTTON } from "utils/constants";
import * as S from "./single-block.style";
import { MouseEvent, useEffect, useState } from "react";

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

  // right click logic
  useEffect(() => {
    if(counterClick === BasicNumbers.One) {
      addFieldFlag(id);
      removeGlobalFlag();
      setHiddenInteractionValue(HiddenFieldInteraction.Flag);
    }
    if(counterClick === BasicNumbers.Two) {
      removeFieldFlag(id);
      addGlobalFlag();
      setHiddenInteractionValue(HiddenFieldInteraction.Question);
    }
    if(counterClick === BasicNumbers.Zero) {
      setHiddenInteractionValue(HiddenFieldInteraction.Empty);
    }
    if(counterClick > BasicNumbers.Two) {
      setHiddenInteractionValue(HiddenFieldInteraction.Empty);
      setCounterClick(0);
    }
  }, [addFieldFlag, addGlobalFlag, counterClick, id, removeFieldFlag, removeGlobalFlag])

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
      return HiddenFieldInteraction.BombReveal;
    }

    if(currentStatus === GameStatus.Win && hiddenContent === BOMB) {
      return HiddenFieldInteraction.BombDeactivation;
    }


    return hiddenInteractionValue
  }

  const handleRightClick = () => {
    if(currentStatus === GameStatus.Fail || currentStatus === GameStatus.Win) {
      return
    }
    setCounterClick(prev => prev + 1);
  }

  const handleOpenClick = (evt: MouseEvent) => {
    if(evt.button === RIGHT_CLICK_BUTTON) {
      handleRightClick();
      return;
    }

    if(currentStatus === GameStatus.Fail || currentStatus === GameStatus.Win) {
      return
    }

    if(hasFlag) {
      return
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
      return
    }

    setStatus(GameStatus.Unsure)
  }

  if(isOpen) {
    if(hiddenContent === BOMB) {
      return <S.BombExplosionField />
    } else if(hiddenContent === null || hiddenContent === BasicNumbers.Zero) {
      return <S.EmptyField />;
    } else if(hiddenContent === BasicNumbers.One) {
      return <S.FieldOne />;
    } else if(hiddenContent === BasicNumbers.Two) {
      return <S.FieldTwo />;
    } else if(hiddenContent === BasicNumbers.Three) {
      return <S.FieldThree />;
    } else if(hiddenContent === BasicNumbers.Four) {
      return <S.FieldFour />;
    } else if(hiddenContent === BasicNumbers.Five) {
      return <S.FieldFive />;
    } else if(hiddenContent === BasicNumbers.Six) {
      return <S.FieldSix />;
    } else if(hiddenContent === BasicNumbers.Seven) {
      return <S.FieldSeven />;
    } else if(hiddenContent === BasicNumbers.Eight) {
      return <S.FieldEight />;
    }
  }

  return(
    <S.InactiveField
      hiddenInteraction={calculateHiddenInteraction()}
      onMouseDown={handleDownClick}
      onMouseUp={handleOpenClick}
    />);
};

export default SingleBlock;
