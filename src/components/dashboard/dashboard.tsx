import CentralButton from "components/central-button/central-button";
import Timer from "components/timer/timer";
import { TimerKind } from "utils/constants";
import * as S from "./dashboard.style";

const Dashboard = () => {
  return(
    <S.DashboardWrapper>
      <Timer timerType={TimerKind.Minutes} />
      <CentralButton />
      <Timer timerType={TimerKind.Seconds} />
    </S.DashboardWrapper>
  );
};

export default Dashboard;
