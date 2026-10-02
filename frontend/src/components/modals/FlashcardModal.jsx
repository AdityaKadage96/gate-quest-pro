// import { Layers } from "lucide-react";
// import { useState } from "react";
// import ModalShell from "./ModalShell";

// function FlashcardModal({
//   onSave,
//   onClose,
// }) {
//   const [subject, setSubject] =
//     useState("");

//   const [title, setTitle] =
//     useState("");

//   const [text, setText] =
//     useState("");

//   const [status, setStatus] =
//     useState("Review Needed");

//   const handleSubmit = (event) => {
//     event.preventDefault();

//     if (
//       !subject.trim() ||
//       !title.trim() ||
//       !text.trim()
//     ) {
//       alert(
//         "Please fill all flashcard fields."
//       );
//       return;
//     }

//     onSave({
//       id: `flashcard-${Date.now()}`,
//       subject: subject.trim(),
//       title: title.trim(),
//       text: text.trim(),
//       status,
//     });

//     onClose();
//   };

//   return (
//     <ModalShell
//       title="Add Flashcard"
//       description="Create a high-yield GATE formula or concept card."
//       icon={Layers}
//       onClose={onClose}
//     >
//       <form
//         className="modal-form"
//         onSubmit={handleSubmit}
//       >
//         <div className="form-group">
//           <label>Subject</label>

//           <input
//             type="text"
//             value={subject}
//             placeholder="e.g. DBMS"
//             onChange={(event) =>
//               setSubject(event.target.value)
//             }
//           />
//         </div>

//         <div className="form-group">
//           <label>Title</label>

//           <input
//             type="text"
//             value={title}
//             placeholder="e.g. B+ Tree Maximum Fanout"
//             onChange={(event) =>
//               setTitle(event.target.value)
//             }
//           />
//         </div>

//         <div className="form-group">
//           <label>
//             Formula / Concept
//           </label>

//           <textarea
//             rows="5"
//             value={text}
//             placeholder="Enter formula, definition, or high-yield concept..."
//             onChange={(event) =>
//               setText(event.target.value)
//             }
//           />
//         </div>

//         <div className="form-group">
//           <label>Status</label>

//           <select
//             value={status}
//             onChange={(event) =>
//               setStatus(event.target.value)
//             }
//           >
//             <option value="Mastered">
//               Mastered
//             </option>

//             <option value="Review Needed">
//               Review Needed
//             </option>
//           </select>
//         </div>

//         <div className="modal-actions">
//           <button
//             type="button"
//             className="modal-secondary-btn"
//             onClick={onClose}
//           >
//             Cancel
//           </button>

//           <button
//             type="submit"
//             className="modal-primary-btn amber"
//           >
//             Save Flashcard
//           </button>
//         </div>
//       </form>
//     </ModalShell>
//   );
// }

// export default FlashcardModal;


import { Layers } from "lucide-react";
import { useState } from "react";
import ModalShell from "./ModalShell";

function FlashcardModal({
  onSave,
  onClose,
  backendTopics = [],
  flashcard = null,
}) {
  const [topicId, setTopicId] = useState(
  flashcard?.topicId
    ? String(flashcard.topicId)
    : ""
);

const [question, setQuestion] = useState(
  flashcard?.question || ""
);

const [answer, setAnswer] = useState(
  flashcard?.answer || ""
);

const [mastered, setMastered] = useState(
  flashcard?.mastered ?? false
);

  const handleSubmit = (event) => {
    event.preventDefault();

    if (!topicId || !question.trim() || !answer.trim()) {
      alert("Please fill all flashcard fields.");
      return;
    }

    onSave({
      question: question.trim(),
      answer: answer.trim(),
      mastered,
      topicId: Number(topicId),
    });

    onClose();
  };

  return (
    <ModalShell
     title={
  flashcard
    ? "Edit Flashcard"
    : "Add Flashcard"
}
      description="Create a high-yield GATE formula or concept card."
      icon={Layers}
      onClose={onClose}
    >
      <form className="modal-form" onSubmit={handleSubmit}>
        {/* Topic */}
        <div className="form-group">
          <label>Topic</label>

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
          <label>Question</label>

          <input
            type="text"
            value={question}
            placeholder="e.g. What is the maximum fanout of a B+ Tree?"
            onChange={(event) =>
              setQuestion(event.target.value)
            }
          />
        </div>

        {/* Answer */}
        <div className="form-group">
          <label>Formula / Answer</label>

          <textarea
            rows="5"
            value={answer}
            placeholder="Enter formula, definition, or high-yield concept..."
            onChange={(event) =>
              setAnswer(event.target.value)
            }
          />
        </div>

        {/* Mastered */}
        <div className="form-group">
          <label>Status</label>

          <select
            value={mastered ? "true" : "false"}
            onChange={(event) =>
              setMastered(event.target.value === "true")
            }
          >
            <option value="false">
              Review Needed
            </option>

            <option value="true">
              Mastered
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
            className="modal-primary-btn amber"
          >
 {flashcard
  ? "Update Flashcard"
  : "Save Flashcard"}
          </button>
        </div>
      </form>
    </ModalShell>
  );
}

export default FlashcardModal;