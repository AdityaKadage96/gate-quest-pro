
import { useState } from "react";
import { ListChecks } from "lucide-react";
import ModalShell from "./ModalShell";

function TaskModal({
  onSave,
  onClose,
}) {
  const [title, setTitle] = useState("");
  const [start, setStart] = useState("");
  const [end, setEnd] = useState("");
  const [duration, setDuration] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();

    if (!title.trim()) {
      alert("Please enter a task title.");
      return;
    }

    if (!start || !end) {
      alert("Please enter start and end time.");
      return;
    }

    if (
      !duration ||
      Number(duration) <= 0
    ) {
      alert("Please enter a valid duration.");
      return;
    }

    const newTask = {
  title: title.trim(),
  start,
  end,
  duration: Number(duration),
  completed: false,
};

onSave(newTask);
  };

  return (
    <ModalShell
      title="Add Study Task"
      description="Add a study activity to your daily planner."
      icon={ListChecks}
      onClose={onClose}
    >
      <form
        className="modal-form"
        onSubmit={handleSubmit}
      >

        {/* Task Title */}

        <div className="form-group">
          <label>
            Task Title
          </label>

          <input
            type="text"
            placeholder="e.g. Solve DBMS PYQs"
            value={title}
            onChange={(event) =>
              setTitle(event.target.value)
            }
          />
        </div>

        {/* Start / End */}

        <div className="form-grid-2">

          <div className="form-group">
            <label>
              Start Time
            </label>

            <input
              type="time"
              value={start}
              onChange={(event) =>
                setStart(event.target.value)
              }
            />
          </div>

          <div className="form-group">
            <label>
              End Time
            </label>

            <input
              type="time"
              value={end}
              onChange={(event) =>
                setEnd(event.target.value)
              }
            />
          </div>

        </div>

        {/* Duration */}

        <div className="form-group">
          <label>
            Duration (hours)
          </label>

          <input
            type="number"
            min="0.5"
            max="24"
            step="0.5"
            placeholder="e.g. 2.5"
            value={duration}
            onChange={(event) =>
              setDuration(event.target.value)
            }
          />
        </div>

        {/* Actions */}

        <div className="modal-actions">

          <button
            type="button"
            className="modal-secondary-btn"
            onClick={onClose}
          >
            Cancel
          </button>

          <button
            type="submit"
            className="modal-primary-btn"
          >
            Add Task
          </button>

        </div>

      </form>
    </ModalShell>
  );
}

export default TaskModal;