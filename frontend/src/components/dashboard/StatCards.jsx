import {
  Hourglass,
  Flame,
  ChartPie,
  Award,
} from "lucide-react";

function StatCards({
  daysLeft,
  todayLoggedHours,
  dailyTargetHours,
  targetExamDate,
  overallProgress,
}) {
  return (
    <div className="dashboard-stat-grid">

      {/* Days to GATE */}
      <div className="glass-card stat-card">

        <div className="stat-icon stat-icon-indigo">
          <Hourglass size={24} />
        </div>

        <div>
          <p className="stat-label">
            Days to GATE
          </p>

          <p className="stat-value">
            {daysLeft}
          </p>

          <p className="stat-description">
             Target Date: {targetExamDate}
          </p>
        </div>
      </div>


      {/* Daily Goal */}
      <div className="glass-card stat-card">
        <div className="stat-icon stat-icon-amber">
          <Flame
            size={24}
            className="pulse-icon"
          />
        </div>

        <div>
          <p className="stat-label">
            Daily Goal Progress
          </p>

          <p className="stat-value">
            {todayLoggedHours} / {dailyTargetHours} hrs
          </p>

          <p className="stat-success">
            Heatmap active
          </p>
        </div>
      </div>


      {/* Syllabus Completion */}
      <div className="glass-card stat-card">
        <div className="stat-icon stat-icon-emerald">
          <ChartPie size={24} />
        </div>

        <div>
          <p className="stat-label">
            Syllabus Completion
          </p>

          <p className="stat-value stat-green">
            {overallProgress}%
          </p>

          <p className="stat-description">
            Weighted by Marks
          </p>
        </div>
      </div>


      {/* AIR Goal */}
      <div className="glass-card stat-card">
        <div className="stat-icon stat-icon-cyan">
          <Award size={24} />
        </div>

        <div>
          <p className="stat-label">
            Target AIR Goal
          </p>

          <p className="stat-value stat-cyan">
            AIR &lt; 100
          </p>

          <p className="stat-description">
            70+ Marks Target
          </p>
        </div>
      </div>

    </div>
  );
}

export default StatCards;