// function Heatmap({ studyLogs }) {
//   const todayStr = new Date()
//     .toISOString()
//     .split("T")[0];

//   const getHoursForCell = (index) => {
//     /*
//       For now we reproduce the original
//       visual behavior of the source application.
//     */

//     if (index % 7 === 0) {
//       return studyLogs[todayStr] || 0;
//     }

//     return Math.min(6, (index * 3) % 7);
//   };

//   const getHeatClass = (hours) => {
//     if (hours <= 0) {
//       return "heat-0";
//     }

//     if (hours <= 2) {
//       return "heat-1";
//     }

//     if (hours <= 4) {
//       return "heat-2";
//     }

//     if (hours <= 6) {
//       return "heat-3";
//     }

//     return "heat-4";
//   };

//   return (
//     <div className="glass-card heatmap-card">

//       {/* Header */}
//       <div className="heatmap-header">

//         <div>
//           <h2 className="heatmap-title">
//             <span className="heatmap-title-icon">
//               🔥
//             </span>

//             365-Day Study Log Grid
//           </h2>

//           <p className="heatmap-description">
//             Your daily hours spent reading,
//             solving PYQs, or attending focus
//             timer sessions.
//           </p>
//         </div>


//         {/* Legend */}
//         <div className="heatmap-legend">

//           <span>Less</span>

//           <div className="legend-box heat-0" />
//           <div className="legend-box heat-1" />
//           <div className="legend-box heat-2" />
//           <div className="legend-box heat-3" />
//           <div className="legend-box heat-4" />

//           <span>More (6+ hrs)</span>

//         </div>

//       </div>


//       {/* Heatmap */}
//       <div className="heatmap-scroll">

//         <div className="heatmap-grid">

//           {Array.from({ length: 140 }).map(
//             (_, index) => {

//               const hours =
//                 getHoursForCell(index);

//               const heatClass =
//                 getHeatClass(hours);

//               return (
//                 <div
//                   key={index}
//                   className={`heat-cell ${heatClass}`}
//                   title={`Activity level: ${hours.toFixed(
//                     1
//                   )} hrs`}
//                 />
//               );
//             }
//           )}

//         </div>

//       </div>

//     </div>
//   );
// }

// export default Heatmap;


//-----------------------------------

function Heatmap({ studyLogs }) {

  // --------------------------------
  // Generate last 365 days
  // --------------------------------

  const days = [];

  const today = new Date();

  for (let i = 364; i >= 0; i--) {
    const date = new Date(today);

    date.setDate(
      today.getDate() - i
    );

    const dateString =
      date.toISOString().split("T")[0];

    days.push({
      date: dateString,
      hours:
        Number(
          studyLogs?.[dateString] || 0
        ),
    });
  }

  // --------------------------------
  // Heat level
  // --------------------------------

  const getHeatClass = (hours) => {

    if (hours <= 0) {
      return "heat-0";
    }

    if (hours <= 2) {
      return "heat-1";
    }

    if (hours <= 4) {
      return "heat-2";
    }

    if (hours <= 6) {
      return "heat-3";
    }

    return "heat-4";
  };

  // --------------------------------
  // Format date
  // --------------------------------

  const formatDate = (dateString) => {

    const date =
      new Date(dateString);

    return date.toLocaleDateString(
      "en-IN",
      {
        day: "2-digit",
        month: "short",
        year: "numeric",
      }
    );
  };

  return (
    <div className="glass-card heatmap-card">

      {/* Header */}

      <div className="heatmap-header">

        <div>

          <h2 className="heatmap-title">
            <span className="heatmap-title-icon">
              🔥
            </span>

            365-Day Study Log Grid
          </h2>

          <p className="heatmap-description">
            Your daily hours spent reading,
            solving PYQs, or attending focus
            timer sessions.
          </p>

        </div>

        {/* Legend */}

        <div className="heatmap-legend">

          <span>
            Less
          </span>

          <div className="legend-box heat-0" />

          <div className="legend-box heat-1" />

          <div className="legend-box heat-2" />

          <div className="legend-box heat-3" />

          <div className="legend-box heat-4" />

          <span>
            More (6+ hrs)
          </span>

        </div>

      </div>

      {/* Heatmap */}

      <div className="heatmap-scroll">

        <div className="heatmap-grid">

          {days.map((day) => {

            const heatClass =
              getHeatClass(day.hours);

            return (
              <div
                key={day.date}
                className={`heat-cell ${heatClass}`}
                title={`${formatDate(
                  day.date
                )}: ${day.hours.toFixed(
                  1
                )} hrs`}
              />
            );

          })}

        </div>

      </div>

    </div>
  );
}

export default Heatmap;