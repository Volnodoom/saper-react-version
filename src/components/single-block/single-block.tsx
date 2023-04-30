import { useState } from "react";
import { setActiveFieldElement, updateIsOpenFieldSelector } from "store/selector";
import { ElementInfo, usePlaygroundStore } from "store/store";
import { BasicNumbers, BOMB } from "utils/constants";
import * as S from "./single-block.style";

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


  // const [isBombExplode, setIsBombExplode] = useState(false);

  const handleLeftClick = () => {
    // console.log(`click-${id}`)
    updateIsOpenField(id, true);
    setActiveElement(coordinates);
  }

  // if(isBombExplode) {
  //   return <S.BombExplosionField />
  // }


  if(isOpen) {
    if(hiddenContent === BOMB) {
      // window.alert('gameOver');
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
      onClick={handleLeftClick}
    />);
};

      // eslint-disable-next-line no-lone-blocks
      {/*
      <S.FlagField />
      <S.QuestionField />
      <S.QuestionEmptyField />

      <S.BombMissField />

       */}

export default SingleBlock;
