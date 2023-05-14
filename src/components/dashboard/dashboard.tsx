import CentralButton from "components/central-button/central-button";
import Timer from "components/digital-numbers/timer/timer";
import * as S from "./dashboard.style";
import FlagsCounter from "components/digital-numbers/flags-counter/flags-counter";

const Dashboard = () => {
  return(
    <S.DashboardWrapper>
      <FlagsCounter />
      <CentralButton />
      <Timer />
    </S.DashboardWrapper>
  );
};

export default Dashboard;
