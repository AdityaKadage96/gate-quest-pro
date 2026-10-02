import {
  Check,
  Clock,
  Trash2,
  CalendarDays,
  Circle,
} from "lucide-react";

function Planner({
  tasks,
 // setTasks,
  setModalType,
  studyLogs,
  setStudyLogs,
  onUpdateTask,
  onDeleteTask,
  onSaveStudyLog
}) {

  // -----------------------------------------
  // Calculate total planned hours
  // -----------------------------------------

  const totalHours = tasks.reduce(
    (total, task) =>
      total + Number(task.duration || 0),
    0
  );


  // -----------------------------------------
  // Calculate completed hours
  // -----------------------------------------

  const completedHours = tasks.reduce(
    (total, task) => {

      if (!task.completed) {
        return total;
      }

      return (
        total +
        Number(task.duration || 0)
      );

    },
    0
  );


  // -----------------------------------------
  // Progress percentage
  // -----------------------------------------

  const progress =
    totalHours === 0
      ? 0
      : Math.round(
          (completedHours / totalHours) *
          100
        );


  // -----------------------------------------
  // Add task
  // -----------------------------------------

  // const addTask = () => {

  //   const title =
  //     window.prompt(
  //       "Enter task title:"
  //     );

  //   if (!title) {
  //     return;
  //   }


  //   const start =
  //     window.prompt(
  //       "Enter start time:"
  //     );

  //   if (!start) {
  //     return;
  //   }


  //   const end =
  //     window.prompt(
  //       "Enter end time:"
  //     );

  //   if (!end) {
  //     return;
  //   }


  //   const durationInput =
  //     window.prompt(
  //       "Enter duration in hours:"
  //     );

  //   if (!durationInput) {
  //     return;
  //   }


  //   const duration =
  //     Number(durationInput);

  //   if (
  //     Number.isNaN(duration) ||
  //     duration <= 0
  //   ) {

  //     window.alert(
  //       "Please enter a valid duration."
  //     );

  //     return;
  //   }


  //   const newTask = {

  //     id: Date.now(),

  //     title,

  //     start,

  //     end,

  //     duration,

  //     completed: false,
  //   };


  //   setTasks(
  //     (previousTasks) => [
  //       ...previousTasks,
  //       newTask,
  //     ]
  //   );
  // };


  // -----------------------------------------
  // Toggle task completion
  // -----------------------------------------

  // const toggleTask = (taskId) => {

  //   setTasks(
  //     (previousTasks) =>
  //       previousTasks.map(
  //         (task) => {

  //           if (task.id !== taskId) {
  //             return task;
  //           }

  //           return {
  //             ...task,

  //             completed:
  //               !task.completed,
  //           };
  //         }
  //       )
  //   );
  // };

//   const toggleTask = (taskId) => {
//   const task = tasks.find(
//     (item) => item.id === taskId
//   );

//   if (!task) {
//     return;
//   }

//   const duration =
//     Number(task.duration || 0);

//   // --------------------------------
//   // Complete task
//   // --------------------------------

//   if (!task.completed) {
//     const today =
//       new Date()
//         .toISOString()
//         .split("T")[0];

//     setTasks((previousTasks) =>
//       previousTasks.map((item) =>
//         item.id === taskId
//           ? {
//               ...item,
//               completed: true,
//               completedDate: today,
//             }
//           : item
//       )
//     );

//     setStudyLogs((previousLogs) => ({
//       ...previousLogs,

//       [today]:
//         Number(previousLogs[today] || 0) +
//         duration,
//     }));

//     return;
//   }

//   // --------------------------------
//   // Undo task
//   // --------------------------------

//   const completedDate =
//     task.completedDate;

//   setTasks((previousTasks) =>
//     previousTasks.map((item) =>
//       item.id === taskId
//         ? {
//             ...item,
//             completed: false,
//             completedDate: null,
//           }
//         : item
//     )
//   );

//   // If an older task doesn't have
//   // completedDate, don't modify logs.
//   if (!completedDate) {
//     return;
//   }

//   setStudyLogs((previousLogs) => ({
//     ...previousLogs,

//     [completedDate]: Math.max(
//       0,
//       Number(
//         previousLogs[completedDate] || 0
//       ) - duration
//     ),
//   }));
// };

// const toggleTask = async (taskId) => {
//   const task = tasks.find((item) => item.id === taskId);

//   if (!task) return;

//   const duration = Number(task.duration || 0);

//   try {
//     if (!task.completed) {
//       const today = new Date().toISOString().split("T")[0];

//       await onUpdateTask(taskId, {
//         title: task.title,
//         description: task.description || "",
//         taskDate: task.taskDate || today,
//         startTime: task.start || null,
//         endTime: task.end || null,
//         duration,
//         completed: true,
//         completedDate: today,
//         priority: task.priority || "Medium",
//       });

//       setStudyLogs((previousLogs) => ({
//         ...previousLogs,
//         [today]: Number(previousLogs[today] || 0) + duration,
//       }));

//       await onSaveStudyLog(
//   today,
//   (studyLogs[today] || 0) + hours
// );
//     } else {
//       const completedDate = task.completedDate;

//       await onUpdateTask(taskId, {
//         title: task.title,
//         description: task.description || "",
//         taskDate: task.taskDate,
//         startTime: task.start || null,
//         endTime: task.end || null,
//         duration,
//         completed: false,
//         completedDate: null,
//         priority: task.priority || "Medium",
//       });

//       if (completedDate) {
//         setStudyLogs((previousLogs) => ({
//           ...previousLogs,
//           [completedDate]: Math.max(
//             0,
//             Number(previousLogs[completedDate] || 0) - duration
//           ),
//         }));
//       }
//     }
//   } catch (error) {
//     // onUpdateTask already handles the error.
//   }
// };

const toggleTask = async (taskId) => {
  const task = tasks.find(
    (item) => item.id === taskId
  );

  if (!task) {
    return;
  }

  const duration =
    Number(task.duration || 0);

  try {
    // --------------------------------
    // Complete task
    // --------------------------------

    if (!task.completed) {
      const today =
        new Date()
          .toISOString()
          .split("T")[0];

      const newTotalHours =
        Number(studyLogs[today] || 0) +
        duration;

      await onUpdateTask(taskId, {
        title: task.title,
        description: task.description || "",
        taskDate:
          task.taskDate || today,
        startTime: task.start || null,
        endTime: task.end || null,
        duration,
        completed: true,
        completedDate: today,
        priority:
          task.priority || "Medium",
      });

      setStudyLogs(
        (previousLogs) => ({
          ...previousLogs,
          [today]: newTotalHours,
        })
      );

      await onSaveStudyLog(
        today,
        newTotalHours
      );

      return;
    }

    // --------------------------------
    // Undo task
    // --------------------------------

    const completedDate =
      task.completedDate;

    const newTotalHours =
      Math.max(
        0,
        Number(
          studyLogs[completedDate] || 0
        ) - duration
      );

    await onUpdateTask(taskId, {
      title: task.title,
      description: task.description || "",
      taskDate: task.taskDate,
      startTime: task.start || null,
      endTime: task.end || null,
      duration,
      completed: false,
      completedDate: null,
      priority:
        task.priority || "Medium",
    });

    setStudyLogs(
      (previousLogs) => ({
        ...previousLogs,
        [completedDate]: newTotalHours,
      })
    );

    if (completedDate) {
      await onSaveStudyLog(
        completedDate,
        newTotalHours
      );
    }

  } catch (error) {
    console.error(
      "Failed to toggle task:",
      error
    );
  }
};
  // -----------------------------------------
  // Delete task
  // -----------------------------------------

  // const deleteTask = (taskId) => {

  //   const confirmed =
  //     window.confirm(
  //       "Delete this task?"
  //     );

  //   if (!confirmed) {
  //     return;
  //   }


  //   setTasks(
  //     (previousTasks) =>
  //       previousTasks.filter(
  //         (task) =>
  //           task.id !== taskId
  //       )
  //   );
  // };

//   const deleteTask = (taskId) => {
//   const confirmed = window.confirm(
//     "Are you sure you want to delete this task?"
//   );

//   if (!confirmed) return;

//   setTasks((previousTasks) =>
//     previousTasks.filter((task) => task.id !== taskId)
//   );
// };

  return (
    <section className="planner">

      {/* ================================= */}
      {/* Header */}
      {/* ================================= */}

      <div className="planner-header">

        <div>

          <p className="section-eyebrow">
            GATE QUEST PRO
          </p>

          <h2>
            Daily Planner
          </h2>

          <p>
            Plan your study sessions and
            complete them one by one.
          </p>

        </div>


        {/* <button
          className="primary-btn"
          onClick={addTask}
        >

          <Plus size={17} />

          Add Task

        </button> */}


        <button
  className="primary-action-btn"
  onClick={() =>
    setModalType("task")
  }
>
  + Add Task
</button>

      </div>


      {/* ================================= */}
      {/* Today's Summary */}
      {/* ================================= */}

      <div className="planner-summary">

        <div className="glass-card planner-stat">

          <div className="planner-stat-icon">
            <CalendarDays size={20} />
          </div>

          <div>

            <span>
              Planned Hours
            </span>

            <strong>
              {totalHours.toFixed(1)} hrs
            </strong>

          </div>

        </div>


        <div className="glass-card planner-stat">

          <div className="planner-stat-icon completed">
            <Check size={20} />
          </div>

          <div>

            <span>
              Completed Hours
            </span>

            <strong>
              {completedHours.toFixed(1)} hrs
            </strong>

          </div>

        </div>


        <div className="glass-card planner-stat">

          <div className="planner-stat-icon progress">
            <Clock size={20} />
          </div>

          <div>

            <span>
              Daily Progress
            </span>

            <strong>
              {progress}%
            </strong>

          </div>

        </div>

      </div>


      {/* ================================= */}
      {/* Progress Bar */}
      {/* ================================= */}

      <div className="glass-card planner-progress-card">

        <div className="planner-progress-header">

          <div>

            <h3>
              Today's Study Progress
            </h3>

            <p>
              {completedHours.toFixed(1)}
              {" "}
              of
              {" "}
              {totalHours.toFixed(1)}
              {" "}
              hours completed
            </p>

          </div>

          <strong>
            {progress}%
          </strong>

        </div>


        <div className="progress-track">

          <div
            className="progress-fill"
            style={{
              width: `${progress}%`,
            }}
          />

        </div>

      </div>


      {/* ================================= */}
      {/* Task List */}
      {/* ================================= */}

      <div className="glass-card planner-card">

        <div className="planner-card-header">

          <div>

            <h3>
              Today's Study Plan
            </h3>

            <p>
              Complete each session to
              keep your study day on track.
            </p>

          </div>

          <span className="planner-count">
            {tasks.length} Tasks
          </span>

        </div>


        {/* Empty state */}

        {tasks.length === 0 && (

          <div className="planner-empty">

            <CalendarDays size={40} />

            <h3>
              No tasks planned
            </h3>

            <p>
              Add your first study task
              to start planning your day.
            </p>

          </div>

        )}


        {/* Tasks */}

        <div className="task-list">

          {tasks.map((task) => (

            <div
              key={task.id}
              className={
                `task-item ${
                  task.completed
                    ? "task-completed"
                    : ""
                }`
              }
            >

              {/* Completion button */}

              <button
                className="task-check"
                onClick={() =>
                  toggleTask(task.id)
                }
                title={
                  task.completed
                    ? "Mark incomplete"
                    : "Mark complete"
                }
              >

                {task.completed ? (
                  <Check size={16} />
                ) : (
                  <Circle size={16} />
                )}

              </button>


              {/* Task information */}

              <div className="task-content">

                <h4>
                  {task.title}
                </h4>

                <div className="task-meta">

                  <span>
                    <Clock size={12} />

                    {task.start}
                    {" - "}
                    {task.end}
                  </span>

                  <span>
                    {task.duration} hrs
                  </span>

                </div>

              </div>


              {/* Status */}

              <div className="task-status">

                {task.completed ? (

                  <span className="completed-label">
                    Completed
                  </span>

                ) : (

                  <span className="pending-label">
                    Pending
                  </span>

                )}

              </div>


              {/* Delete */}

              <button
                className="task-delete"
                onClick={() =>
                  onDeleteTask(task.id)
                }
                title="Delete task"
              >

                <Trash2 size={15} />

              </button>

            </div>

          ))}

        </div>

      </div>

    </section>
  );
}

export default Planner;