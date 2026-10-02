import {
  Settings,
  CalendarDays,
} from "lucide-react";
import { useState } from "react";
import ModalShell from "./ModalShell";

function SettingsModal({
  dailyTargetHours,
  setDailyTargetHours,
  onSaveDailyGoal,
  targetExamDate,
  setTargetExamDate,
  onClose,
}) {
  const [hours, setHours] =
    useState(dailyTargetHours);

  const [examDate, setExamDate] =
    useState(targetExamDate);

  const handleSave = async (event) => {
    event.preventDefault();

    const numericHours = Number(hours);

    if (
      Number.isNaN(numericHours) ||
      numericHours <= 0 ||
      numericHours > 16
    ) {
      alert(
        "Daily target must be between 0.5 and 16 hours."
      );
      return;
    }

    if (!examDate) {
      alert("Please select the target exam date.");
      return;
    }

await onSaveDailyGoal(
  numericHours,
  examDate
);

setDailyTargetHours(numericHours);
setTargetExamDate(examDate);

onClose();

  };

  return (
    <ModalShell
      title="Adjust GATE Preparation Plan"
      description="Customize your daily study target and GATE target date."
      icon={Settings}
      onClose={onClose}
    >
      <form
        className="modal-form"
        onSubmit={handleSave}
      >
        <div className="form-group">
          <label>
            Target Exam Date
          </label>

          <div className="input-with-icon">
            <CalendarDays size={16} />

            <input
              type="date"
              value={examDate}
              onChange={(event) =>
                setExamDate(
                  event.target.value
                )
              }
            />
          </div>
        </div>

        <div className="form-group">
          <label>
            Daily Goal Target (Hours)
          </label>

          <input
            type="number"
            min="0.5"
            max="16"
            step="0.5"
            value={hours}
            onChange={(event) =>
              setHours(event.target.value)
            }
          />

          <small>
            Recommended range: 0.5–16 hours.
          </small>
        </div>

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
            Save Plan
          </button>
        </div>
      </form>
    </ModalShell>
  );
}

export default SettingsModal;