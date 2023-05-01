import Dashboard from "components/dashboard/dashboard";
import Playground from "components/playground/playground";
import { addFieldSelector, clearEntities } from "store/selector";
import * as S from "./app.style";
import { useEffect } from "react";
import { generateInitialField } from "utils/utils";
import { usePlaygroundStore } from "store";

const App = () => {
  const addNewField = usePlaygroundStore(addFieldSelector);
  const clearFields = usePlaygroundStore(clearEntities);

  useEffect(() => {
    generateInitialField().forEach((line) => addNewField(line.id, line));
    return() => clearFields();
  })

  useEffect(() => {
    const handleContextMenu = (evt: any) => {
      evt.preventDefault()
    }
    document.addEventListener("contextmenu", handleContextMenu)

    return () => document.removeEventListener("contextmenu", handleContextMenu)
  }, []);

  return (
    <S.AppWrapper>
      <Dashboard />
      <S.DecorationSplit />
      <Playground />
    </S.AppWrapper>
  );
}

export default App;
