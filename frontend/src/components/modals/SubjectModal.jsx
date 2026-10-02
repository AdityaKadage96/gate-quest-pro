import { BookOpen } from "lucide-react";
import { useState } from "react";
import ModalShell from "./ModalShell";

function SubjectModal({
  subject,
  onSave,
  onClose,
}) {
  const [name, setName] =
    useState(subject?.name || "");

  const [weight, setWeight] =
    useState(subject?.weight || "");

  const handleSubmit = (event) => {
    event.preventDefault();

    if (!name.trim()) {
      alert("Subject name is required.");
      return;
    }

    const numericWeight = Number(weight);

    if (
      Number.isNaN(numericWeight) ||
      numericWeight <= 0 ||
      numericWeight > 100
    ) {
      alert(
        "Marks weight must be between 1 and 100."
      );
      return;
    }

    onSave({
      ...subject,
      id:
        subject?.id ||
        `subject-${Date.now()}`,
      name: name.trim(),
      weight: numericWeight,
      topics: subject?.topics || [],
    });

    onClose();
  };

  return (
    <ModalShell
      title={
        subject
          ? "Edit Subject"
          : "Add Subject"
      }
      description="Add a GATE subject and assign its marks weightage."
      icon={BookOpen}
      onClose={onClose}
    >
      <form
        className="modal-form"
        onSubmit={handleSubmit}
      >
        <div className="form-group">
          <label>Subject Name</label>

          <input
            type="text"
            value={name}
            placeholder="e.g. Computer Networks"
            onChange={(event) =>
              setName(event.target.value)
            }
          />
        </div>

        <div className="form-group">
          <label>
            Mark Weightage
          </label>

          <input
            type="number"
            min="1"
            max="100"
            value={weight}
            placeholder="10"
            onChange={(event) =>
              setWeight(event.target.value)
            }
          />

          <small>
            Enter the approximate GATE marks weightage.
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
            Save Subject
          </button>
        </div>
      </form>
    </ModalShell>
  );
}

export default SubjectModal;