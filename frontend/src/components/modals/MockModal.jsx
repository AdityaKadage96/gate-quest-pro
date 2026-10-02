
import { useState } from "react";
import { ChartLine } from "lucide-react";
import ModalShell from "./ModalShell";

function MockModal({
  onSave,
  onClose,
}) {
  const [name, setName] = useState("");
  const [date, setDate] = useState(
    new Date().toISOString().split("T")[0]
  );
  const [marks, setMarks] = useState("");
  const [accuracy, setAccuracy] = useState("");
  const [percentile, setPercentile] =
    useState("");

  const handleSubmit = (event) => {
    event.preventDefault();

    if (!name.trim()) {
      alert("Please enter the test name.");
      return;
    }

    if (!date) {
      alert("Please select the test date.");
      return;
    }

    if (
      marks === "" ||
      Number(marks) < 0 ||
      Number(marks) > 100
    ) {
      alert(
        "Marks must be between 0 and 100."
      );
      return;
    }

    if (
      accuracy === "" ||
      Number(accuracy) < 0 ||
      Number(accuracy) > 100
    ) {
      alert(
        "Accuracy must be between 0 and 100."
      );
      return;
    }

    if (
      percentile !== "" &&
      (Number(percentile) < 0 ||
        Number(percentile) > 100)
    ) {
      alert(
        "Percentile must be between 0 and 100."
      );
      return;
    }

    const newMock = {
      id: `mock-${Date.now()}`,
      date,
      name: name.trim(),
      // marks: Number(marks),
      score: Number(marks),
      accuracy: Number(accuracy),
      percentile:
        percentile === ""
          ? null
          : Number(percentile),
    };

    onSave(newMock);
  };

  return (
    <ModalShell
      title="Add Mock Result"
      description="Record your GATE mock test performance."
      icon={ChartLine}
      onClose={onClose}
    >
      <form
        className="modal-form"
        onSubmit={handleSubmit}
      >

        {/* Test Name */}

        <div className="form-group">
          <label>
            Test Name / Series
          </label>

          <input
            type="text"
            placeholder="e.g. Made Easy Full Mock 3"
            value={name}
            onChange={(event) =>
              setName(event.target.value)
            }
          />
        </div>

        {/* Date */}

        <div className="form-group">
          <label>
            Test Date
          </label>

          <input
            type="date"
            value={date}
            onChange={(event) =>
              setDate(event.target.value)
            }
          />
        </div>

        {/* Marks / Accuracy */}

        <div className="form-grid-2">

          <div className="form-group">
            <label>
              Marks / 100
            </label>

            <input
              type="number"
              min="0"
              max="100"
              step="0.5"
              placeholder="e.g. 67"
              value={marks}
              onChange={(event) =>
                setMarks(event.target.value)
              }
            />
          </div>

          <div className="form-group">
            <label>
              Accuracy %
            </label>

            <input
              type="number"
              min="0"
              max="100"
              step="0.1"
              placeholder="e.g. 82.5"
              value={accuracy}
              onChange={(event) =>
                setAccuracy(
                  event.target.value
                )
              }
            />
          </div>

        </div>

        {/* Percentile */}

        <div className="form-group">
          <label>
            Estimated Percentile %
          </label>

          <input
            type="number"
            min="0"
            max="100"
            step="0.01"
            placeholder="e.g. 98.25"
            value={percentile}
            onChange={(event) =>
              setPercentile(
                event.target.value
              )
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
            Save Result
          </button>

        </div>

      </form>
    </ModalShell>
  );
}

export default MockModal;