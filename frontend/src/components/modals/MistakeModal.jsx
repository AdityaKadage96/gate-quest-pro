import { useState } from "react";
import { BookMarked } from "lucide-react";
import ModalShell from "./ModalShell";

function MistakeModal({
  onSave,
  onClose,
  backendTopics = [],
  mistake = null,
}) {
  const [topicId, setTopicId] = useState(
    mistake?.topicId ? String(mistake.topicId) : ""
  );

  const [question, setQuestion] = useState(
    mistake?.question || ""
  );

  const [correctAnswer, setCorrectAnswer] = useState(
    mistake?.correctAnswer || ""
  );

  const [explanation, setExplanation] = useState(
    mistake?.explanation || ""
  );

  const [resolved, setResolved] = useState(
    mistake?.resolved ?? false
  );

  const handleSubmit = (event) => {
    event.preventDefault();

    if (!topicId) {
      alert("Please select a topic.");
      return;
    }

    if (!question.trim()) {
      alert("Please enter the question.");
      return;
    }

    if (!correctAnswer.trim()) {
      alert("Please enter the correct answer.");
      return;
    }

    if (!explanation.trim()) {
      alert("Please explain what went wrong.");
      return;
    }

    onSave({
      question: question.trim(),
      correctAnswer: correctAnswer.trim(),
      explanation: explanation.trim(),
      resolved,
      topicId: Number(topicId),
    });
  };

  return (
    <ModalShell
      title={mistake ? "Edit Mistake" : "Log Mistake"}
      description="Record a mistake so you can review and avoid it later."
      icon={BookMarked}
      onClose={onClose}
    >
      <form
        className="modal-form"
        onSubmit={handleSubmit}
      >

        {/* Topic */}

        <div className="form-group">
          <label>
            Topic
          </label>

          <select
            value={topicId}
            onChange={(event) =>
              setTopicId(event.target.value)
            }
          >
            <option value="">
              Select Topic
            </option>

            {backendTopics.map((topic) => (
              <option
                key={topic.id}
                value={topic.id}
              >
                {topic.name}
              </option>
            ))}
          </select>
        </div>

        {/* Question */}

        <div className="form-group">
          <label>
            Question
          </label>

          <textarea
            rows="4"
            placeholder="Enter the question you got wrong..."
            value={question}
            onChange={(event) =>
              setQuestion(event.target.value)
            }
          />
        </div>

        {/* Correct Answer */}

        <div className="form-group">
          <label>
            Correct Answer / Method
          </label>

          <textarea
            rows="4"
            placeholder="Enter the correct answer or approach..."
            value={correctAnswer}
            onChange={(event) =>
              setCorrectAnswer(event.target.value)
            }
          />
        </div>

        {/* Explanation */}

        <div className="form-group">
          <label>
            Why It Went Wrong
          </label>

          <textarea
            rows="5"
            placeholder="Explain what you did wrong and what you should remember..."
            value={explanation}
            onChange={(event) =>
              setExplanation(event.target.value)
            }
          />
        </div>

        {/* Status */}

        <div className="form-group">
          <label>
            Status
          </label>

          <select
            value={resolved ? "true" : "false"}
            onChange={(event) =>
              setResolved(event.target.value === "true")
            }
          >
            <option value="false">
              Review Needed
            </option>

            <option value="true">
              Resolved
            </option>
          </select>
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
            {mistake ? "Update Mistake" : "Save Mistake"}
          </button>

        </div>

      </form>
    </ModalShell>
  );
}

export default MistakeModal;