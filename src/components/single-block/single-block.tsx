import { useState } from "react";
import * as S from "./single-block.style";

type SingleBlock = {
  isBomb: boolean;
}

const SingleBlock = ({isBomb}: SingleBlock) => {
  const [isBombExplode, setIsBombExplode] = useState(false);

  const handleLeftClick = () => {
    if(isBomb) {
      setIsBombExplode(true);
    }
  }

  if(isBombExplode) {
    return <S.BombExplosionField />
  }

  return(
    <div>
      <S.InactiveField />

      {/* <S.EmptyField />
      <S.FlagField />
      <S.QuestionField />
      <S.QuestionEmptyField />
      <S.BombField />

      <S.BombMissField />
      <S.FieldOne />
      <S.FieldTwo />
      <S.FieldThree />
      <S.FieldFour />
      <S.FieldFive />
      <S.FieldSix />
      <S.FieldSeven />
      <S.FieldEight /> */}
    </div>

  );
};

export default SingleBlock;
