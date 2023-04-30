import { getGameStatus, setActiveFieldElement, setGameStatus, updateIsOpenFieldSelector } from "store/selector";
import { ElementInfo } from "store/single-field-data";
import { useGameData, usePlaygroundStore } from "store";
import { BasicNumbers, BOMB, GameStatus, HiddenFieldInteraction, RIGHT_CLICK_BUTTON } from "utils/constants";
import * as S from "./single-block.style";
import { MouseEvent, useEffect, useState } from "react";

type SingleBlock = {
  blockInfo: ElementInfo,
}

const SingleBlock = ({blockInfo}: SingleBlock) => {
  const {
    id,
    coordinates,
    showOffContent,
    hiddenContent,
    isOpen,
  } = blockInfo;

  const updateIsOpenField = usePlaygroundStore(updateIsOpenFieldSelector);
  const setActiveElement = usePlaygroundStore(setActiveFieldElement);
  const setStatus = useGameData(setGameStatus);
  const currentStatus = useGameData(getGameStatus);

  const [counterClick, setCounterClick] = useState(0);
  const [hiddenInteractionValue, setHiddenInteractionValue] = useState(HiddenFieldInteraction.Empty)

  useEffect(() => {
    if(counterClick === BasicNumbers.One) {
      setHiddenInteractionValue(HiddenFieldInteraction.Flag);
    }
    if(counterClick === BasicNumbers.Two) {
      setHiddenInteractionValue(HiddenFieldInteraction.Question);
    }
    if(counterClick === BasicNumbers.Zero) {
      setHiddenInteractionValue(HiddenFieldInteraction.Empty);
    }
    if(counterClick > BasicNumbers.Two) {
      setHiddenInteractionValue(HiddenFieldInteraction.Empty);
      setCounterClick(0);
    }
  }, [counterClick])

  useEffect(() => {
    if(currentStatus === GameStatus.Reset) {
      setCounterClick(0);
      setHiddenInteractionValue(HiddenFieldInteraction.Empty);
    }
  }, [currentStatus])


  const calculateHiddenInteraction = () => {
    if(currentStatus === GameStatus.Fail && hiddenContent === BOMB) {
      return HiddenFieldInteraction.BombReveal
    }


    return hiddenInteractionValue
  }

  const handleRightClick = () => {
    setCounterClick(prev => prev + 1);
  }

  const handleOpenClick = (evt: MouseEvent) => {
    if(evt.button === RIGHT_CLICK_BUTTON) {
      handleRightClick();
      return;
    }

    if(currentStatus === GameStatus.Fail) {
      return
    }

    if(hiddenContent === BOMB) {
      setStatus(GameStatus.Fail);
    } else {
      setStatus(GameStatus.Idle)
    }

    updateIsOpenField(id, true);
    setActiveElement(coordinates);
  }

  const handleDownClick = (evt: MouseEvent) => {
    if(evt.button === RIGHT_CLICK_BUTTON) {
      return;
    }

    if(currentStatus === GameStatus.Fail) {
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
