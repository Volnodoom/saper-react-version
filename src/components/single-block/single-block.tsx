import * as S from "./single-block.style";

const SingleBlock = () => {
  return(
    <div style={{display: 'flex'}}>
      <S.InactiveField />
      <S.EmptyField />
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
      <S.FieldEight />
    </div>

  );
};

export default SingleBlock;
