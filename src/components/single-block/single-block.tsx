import * as S from "./single-block.style";

type SingleBlock = {
  isBomb: boolean;
}

const SingleBlock = () => {

  const handleLeftClick = () => {

  }

  return(
    <div>
      <S.InactiveField />
      {/* <S.EmptyField />
      <S.FlagField />
      <S.QuestionField />
      <S.QuestionEmptyField />
      <S.BombField />
      <S.BombExplosionField />
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
