
import {
  ChartLine,
  Plus,
  TrendingUp,
  Trophy,
  Target,
  Trash2,
} from "lucide-react";

function Mocks({ mocks,setModalType,onDeleteMock, }) {
  const sortedMocks = [...mocks].sort(
    (a, b) => new Date(a.date) - new Date(b.date)
  );

  const totalMocks = mocks.length;

  const averageScore =
    totalMocks === 0
      ? 0
      : (
          mocks.reduce(
            (total, mock) =>
              total + Number(mock.score || 0),
            0
          ) / totalMocks
        ).toFixed(1);

  const bestScore =
    totalMocks === 0
      ? 0
      : Math.max(
          ...mocks.map((mock) =>
            Number(mock.score || 0)
          )
        );

  const latestMock =
    sortedMocks.length > 0
      ? sortedMocks[sortedMocks.length - 1]
      : null;

  // const addMock = () => {
  //   const name = window.prompt(
  //     "Enter mock test name:"
  //   );

  //   if (!name || !name.trim()) return;

  //   const date = window.prompt(
  //     "Enter date (YYYY-MM-DD):",
  //     new Date().toISOString().split("T")[0]
  //   );

  //   if (!date) return;

  //   const scoreInput = window.prompt(
  //     "Enter marks obtained:",
  //     "0"
  //   );

  //   const score = Number(scoreInput);

  //   if (
  //     Number.isNaN(score) ||
  //     score < 0 ||
  //     score > 100
  //   ) {
  //     alert(
  //       "Please enter a valid score between 0 and 100."
  //     );
  //     return;
  //   }

  //   const rankInput = window.prompt(
  //     "Enter rank:",
  //     "1"
  //   );

  //   const rank = Number(rankInput);

  //   if (
  //     Number.isNaN(rank) ||
  //     rank <= 0
  //   ) {
  //     alert("Please enter a valid rank.");
  //     return;
  //   }

  //   const candidatesInput = window.prompt(
  //     "Enter total candidates:",
  //     "10000"
  //   );

  //   const totalCandidates =
  //     Number(candidatesInput);

  //   if (
  //     Number.isNaN(totalCandidates) ||
  //     totalCandidates <= 0
  //   ) {
  //     alert(
  //       "Please enter a valid candidate count."
  //     );
  //     return;
  //   }

  //   const newMock = {
  //     id: Date.now(),
  //     date,
  //     name: name.trim(),
  //     score,
  //     maxScore: 100,
  //     rank,
  //     totalCandidates,
  //   };

  //   setMocks((previousMocks) => [
  //     ...previousMocks,
  //     newMock,
  //   ]);
  // };

  // const deleteMock = (mockId) => {
  //   const confirmed = window.confirm(
  //     "Are you sure you want to delete this mock result?"
  //   );

  //   if (!confirmed) return;

  //   setMocks((previousMocks) =>
  //     previousMocks.filter(
  //       (mock) => mock.id !== mockId
  //     )
  //   );
  // };

  const getScorePercentage = (mock) => {
    const maxScore = Number(
      mock.maxScore || 100
    );

    if (maxScore === 0) return 0;

    return Math.min(
      100,
      Math.max(
        0,
        (Number(mock.score || 0) / maxScore) * 100
      )
    );
  };

  return (
    <section className="mocks-page">

      {/* Header */}
      <div className="glass-card mocks-header-card">
        <div>
          <h2 className="mocks-title">
            <ChartLine size={21} />
            Mock Test Score Tracker & Percentiles
          </h2>

          <p className="mocks-description">
            Record test scores, track score progress
            curves, and estimate percentile performance
            over time.
          </p>
        </div>

        {/* <button
          className="primary-action-btn mock-add-btn"
          onClick={addMock}
        >
          <Plus size={16} />
          Add Mock Result
        </button> */}

        <button
  className="primary-action-btn mock-add-btn"
  onClick={() =>
    setModalType("mock")
  }
>
  <Plus size={16} />
  Add Mock Result
</button>
      </div>

      {/* Statistics */}
      <div className="mock-stat-grid">

        <div className="glass-card mock-stat-card">
          <div className="mock-stat-icon mock-stat-indigo">
            <ChartLine size={21} />
          </div>

          <div>
            <p className="mock-stat-label">
              Total Mocks
            </p>

            <p className="mock-stat-value">
              {totalMocks}
            </p>
          </div>
        </div>

        <div className="glass-card mock-stat-card">
          <div className="mock-stat-icon mock-stat-emerald">
            <Target size={21} />
          </div>

          <div>
            <p className="mock-stat-label">
              Average Score
            </p>

            <p className="mock-stat-value">
              {averageScore}
            </p>

            <span className="mock-stat-subtext">
              / 100
            </span>
          </div>
        </div>

        <div className="glass-card mock-stat-card">
          <div className="mock-stat-icon mock-stat-amber">
            <Trophy size={21} />
          </div>

          <div>
            <p className="mock-stat-label">
              Best Score
            </p>

            <p className="mock-stat-value">
              {bestScore}
            </p>

            <span className="mock-stat-subtext">
              / 100
            </span>
          </div>
        </div>

        <div className="glass-card mock-stat-card">
          <div className="mock-stat-icon mock-stat-cyan">
            <TrendingUp size={21} />
          </div>

          <div>
            <p className="mock-stat-label">
              Latest Score
            </p>

            <p className="mock-stat-value">
              {latestMock
                ? latestMock.score
                : 0}
            </p>

            <span className="mock-stat-subtext">
              / 100
            </span>
          </div>
        </div>

      </div>

      {/* Score Progress */}
      <div className="glass-card mock-chart-card">

        <div className="mock-section-header">
          <div>
            <h3>Score Progress Curve</h3>

            <p>
              Marks obtained across your mock tests.
            </p>
          </div>

          <span className="mock-chart-limit">
            0 — 100
          </span>
        </div>

        {sortedMocks.length === 0 ? (
          <div className="mock-empty-chart">
            <ChartLine size={32} />

            <p>
              Add your first mock result to see
              your score progress.
            </p>
          </div>
        ) : (
          <div className="mock-chart">

            <div className="chart-y-axis">
              <span>100</span>
              <span>75</span>
              <span>50</span>
              <span>25</span>
              <span>0</span>
            </div>

            <div className="chart-area">

              <div className="chart-grid-line line-100" />
              <div className="chart-grid-line line-75" />
              <div className="chart-grid-line line-50" />
              <div className="chart-grid-line line-25" />
              <div className="chart-grid-line line-0" />

              <div className="chart-bars">

                {sortedMocks.map((mock) => {
                  const percentage =
                    getScorePercentage(mock);

                  return (
                    <div
                      className="chart-column"
                      key={mock.id}
                    >
                      <div className="chart-score">
                        {mock.score}
                      </div>

                      <div className="chart-bar-wrapper">
                        <div
                          className="chart-bar"
                          style={{
                            height: `${percentage}%`,
                          }}
                        />
                      </div>

                      <div className="chart-date">
                        {mock.date}
                      </div>

                      <div className="chart-name">
                        {mock.name}
                      </div>
                    </div>
                  );
                })}

              </div>
            </div>

          </div>
        )}
      </div>

      {/* History */}
      <div className="glass-card mock-history-card">

        <div className="mock-section-header">
          <div>
            <h3>Mock Test History Log</h3>

            <p>
              Complete record of your mock test
              performance.
            </p>
          </div>
        </div>

        {sortedMocks.length === 0 ? (
          <div className="mock-empty-state">
            <ChartLine size={34} />

            <h3>No mock results yet</h3>

            <p>
              Add a mock result to start tracking
              your performance.
            </p>
          </div>
        ) : (
          <div className="mock-table-wrapper">

            <table className="mock-table">

              <thead>
                <tr>
                  <th>Date</th>
                  <th>Test Name / Series</th>
                  <th>Marks</th>
                  <th>Accuracy</th>
                  <th>Percentile</th>
                  <th>Performance</th>
                  <th>Action</th>
                </tr>
              </thead>

              <tbody>
                {sortedMocks.map((mock) => {
                  const percentage =
                    getScorePercentage(mock);

                  return (
                    <tr key={mock.id}>

                      <td className="mock-date">
                        {mock.date}
                      </td>

                      <td>
                        <span className="mock-name">
                          {mock.name}
                        </span>
                      </td>

                      <td>
                        <span className="mock-score">
                          {mock.score}
                        </span>

                        <span className="mock-max-score">
                          / 100
                        </span>

                        <span className="mock-max-score">
                          / {mock.maxScore || 100}
                        </span>
                      </td>
 <td>
  {mock.accuracy != null
    ? `${mock.accuracy}%`
    : "—"}
</td>

<td>
  {mock.percentile != null
    ? `${mock.percentile}%`
    : "—"}
</td>

                      <td>
                        <div className="mock-performance">

                          <div className="performance-track">
                            <div
                              className="performance-fill"
                              style={{
                                width: `${percentage}%`,
                              }}
                            />
                          </div>

                          <span>
                            {percentage.toFixed(1)}%
                          </span>

                        </div>
                      </td>

                      <td>
                        <button
                          className="mock-delete-btn"
                          onClick={() =>
                           onDeleteMock(mock.id)
                          }
                        >
                          <Trash2 size={16} />
                        </button>
                      </td>

                    </tr>
                  );
                })}
              </tbody>

            </table>
          </div>
        )}

      </div>

    </section>
  );
}

export default Mocks;