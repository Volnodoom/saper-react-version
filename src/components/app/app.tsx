import CentralButton from "components/central-button/central-button";
import SingleBlock from "components/single-block/single-block";
import Timer from "components/timer/timer";
import { TimerKind } from "utils/constants";

const App = () => {
  return (
    <div>
      hello world
      {/* <SingleBlock /> */}
      {/* <CentralButton /> */}
      <Timer timerType={TimerKind.Minutes}/>
    </div>
  );
}

export default App;
