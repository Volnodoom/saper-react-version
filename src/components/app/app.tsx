import Dashboard from "components/dashboard/dashboard";
import Playground from "components/playground/playground";
import * as S from "./app.style";

const App = () => {
  return (
    <S.AppWrapper>
      <Dashboard />
      <S.DecorationSplit />
      <Playground />
    </S.AppWrapper>
  );
}

export default App;
