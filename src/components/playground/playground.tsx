import SingleBlock from "components/single-block/single-block";
import { NUMBER_OF_ELEMENTS } from "utils/constants";
import * as S from "./playground.style";

const Playground = () => {
  const SquareFragments = Array.from({length: NUMBER_OF_ELEMENTS});

  return(
    <S.PlaygroundWrapper>
      {
        SquareFragments.map((item, index) => <SingleBlock key={`uniq-key-${index}`}/>)
      }
    </S.PlaygroundWrapper>
  );
};

export default Playground;
