import { ListChecks } from "lucide-react";
import {
  //useEffect,
  useState,
} from "react";
import ModalShell from "./ModalShell";

function TopicModal({
  subject,
  topic,
  onSave,
  onClose,
}) {
  const [name, setName] =
  useState(topic?.name || "");

 const [description, setDescription] =
  useState(topic?.description || "");


//   useEffect(() => {
//   setName(topic?.name || "");
//   setDescription(topic?.description || "");
// }, [topic]);


  const handleSubmit = (event) => {
    event.preventDefault();

    if (!name.trim()) {
      alert("Topic name is required.");
      return;
    }

    if (!description.trim()) {
      alert("Topic description is required.");
      return;
    }

    onSave({
      // id: `topic-${Date.now()}`,
      id:
  topic?.id ||
  `topic-${Date.now()}`,

      name: name.trim(),
      description: description.trim(),
      lectures: false,
      pyq: false,
      notes: false,
      rev1: false,
      rev2: false,
    });

    onClose();
  };

  return (
    <ModalShell
      title={
  topic
    ? "Edit Topic"
    : "Add Topic"
}
      description={
        subject
          ? `Add a topic inside ${subject.name}.`
          : "Add a topic to the selected subject."
      }
      icon={ListChecks}
      onClose={onClose}
    >
      <form
        className="modal-form"
        onSubmit={handleSubmit}
      >
        <div className="form-group">
          <label>Topic Name</label>

          <input
            type="text"
            value={name}
            placeholder="e.g. TCP/IP, Congestion Control"
            onChange={(event) =>
              setName(event.target.value)
            }
          />
        </div>

        <div className="form-group">
          <label>Topic Description</label>

          <textarea
            value={description}
            placeholder="Describe what this topic covers..."
            rows="4"
            maxLength="1000"
            onChange={(event) =>
              setDescription(event.target.value)
            }
          />

          <small>
            Enter a short description of the topic.
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
           {topic ? "Save Topic" : "Add Topic"}
          </button>
        </div>
      </form>
    </ModalShell>
  );
}

export default TopicModal;