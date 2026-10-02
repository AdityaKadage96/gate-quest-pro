import StatCards from "./StatCards";
import Heatmap from "./Heatmap";

function Dashboard({
  studyLogs,
  dailyTargetHours,
  targetExamDate,
  overallProgress,
}) {
  const todayStr = new Date()
    .toISOString()
    .split("T")[0];

  const todayLoggedHours = (
    studyLogs[todayStr] || 0
  ).toFixed(1);


  const calculateDaysLeft = () => {
    const today = new Date();

    const examDate = new Date(
      targetExamDate
    );

    const difference =
      examDate.getTime() -
      today.getTime();

    return Math.max(
      0,
      Math.ceil(
        difference /
          (1000 * 60 * 60 * 24)
      )
    );
  };


  return (
    <section className="dashboard">

      <StatCards
        daysLeft={calculateDaysLeft()}
        todayLoggedHours={todayLoggedHours}
        dailyTargetHours={dailyTargetHours}
        targetExamDate={targetExamDate}
        overallProgress={overallProgress}
      />

      <Heatmap
        studyLogs={studyLogs}
      />

    </section>
  );
}

export default Dashboard;