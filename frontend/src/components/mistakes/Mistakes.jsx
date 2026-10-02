import {
  Plus,
  Trash2,
  CheckCircle2,
  AlertTriangle,
  BookOpen,
  Pencil,
} from "lucide-react";

function Mistakes({
  mistakes,
  setModalType,
  onDeleteMistake,
  onEditMistake,
  onUpdateMistake,
}) {
  const totalMistakes = mistakes.length;

  const reviewedMistakes = mistakes.filter(
    (mistake) => mistake.resolved
  ).length;

  const pendingMistakes =
    totalMistakes - reviewedMistakes;

  return (
    <section className="mistakes">
      <div className="mistakes-header">
        <div>
          <p className="section-eyebrow">
            GATE QUEST PRO
          </p>

          <h2>Mistake Notebook</h2>

          <p>
            Record your mistakes, identify patterns and
            revise them before the exam.
          </p>
        </div>

        <button
          className="primary-action-btn"
          onClick={() => setModalType("mistake")}
        >
          <Plus size={17} />
          Log Error
        </button>
      </div>

      <div className="mistake-stats">
        <div className="glass-card mistake-stat">
          <div className="mistake-stat-icon total">
            <BookOpen size={20} />
          </div>

          <div>
            <span>Total Mistakes</span>
            <strong>{totalMistakes}</strong>
          </div>
        </div>

        <div className="glass-card mistake-stat">
          <div className="mistake-stat-icon pending">
            <AlertTriangle size={20} />
          </div>

          <div>
            <span>Pending Review</span>
            <strong>{pendingMistakes}</strong>
          </div>
        </div>

        <div className="glass-card mistake-stat">
          <div className="mistake-stat-icon reviewed">
            <CheckCircle2 size={20} />
          </div>

          <div>
            <span>Resolved</span>
            <strong>{reviewedMistakes}</strong>
          </div>
        </div>
      </div>

      <div className="glass-card mistake-card">
        <div className="mistake-card-header">
          <div>
            <h3>Your Mistake Log</h3>

            <p>
              Review the questions where you lost marks or
              made errors.
            </p>
          </div>

          <span className="mistake-count">
            {totalMistakes} Entries
          </span>
        </div>

        {mistakes.length === 0 && (
          <div className="mistake-empty">
            <BookOpen size={40} />

            <h3>No mistakes recorded</h3>

            <p>
              Click "Log Error" whenever you make an error
              while practicing.
            </p>
          </div>
        )}

        <div className="mistake-list">
          {mistakes.map((mistake) => (
            <div
              key={mistake.id}
              className={`mistake-item ${
                mistake.resolved
                  ? "mistake-reviewed"
                  : ""
              }`}
            >
              <div className="mistake-main">
                <div className="mistake-icon">
                  {mistake.resolved ? (
                    <CheckCircle2 size={18} />
                  ) : (
                    <AlertTriangle size={18} />
                  )}
                </div>

                <div className="mistake-content">
                  <div className="mistake-title-row">
                    <h4>
                      {mistake.question}
                    </h4>

                    <span
                      className={`mistake-type ${
                        mistake.resolved
                          ? "resolved"
                          : "pending"
                      }`}
                    >
                      {mistake.resolved
                        ? "Resolved"
                        : "Review Needed"}
                    </span>
                  </div>

                  <p className="mistake-subject">
                    {mistake.topicName ||
                      "GATE Topic"}
                  </p>

                  <p className="mistake-description">
                    {mistake.explanation}
                  </p>

                  {mistake.correctAnswer && (
                    <p className="mistake-description">
                      <strong>
                        Correct Method:
                      </strong>{" "}
                      {mistake.correctAnswer}
                    </p>
                  )}
                </div>
              </div>

              <div className="mistake-actions">
                <button
                  className="mistake-review-btn"
                  onClick={() =>
                    onUpdateMistake(mistake)
                  }
                >
                  <CheckCircle2 size={14} />

                  {mistake.resolved
                    ? "Mark Pending"
                    : "Mark Resolved"}
                </button>

                <button
                  className="mistake-edit-btn"
                  onClick={() =>
                    onEditMistake(mistake)
                  }
                  title="Edit mistake"
                >
                  <Pencil size={15} />
                </button>

                <button
                  className="mistake-delete-btn"
                  onClick={() =>
                    onDeleteMistake(mistake.id)
                  }
                  title="Delete mistake"
                >
                  <Trash2 size={15} />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Mistakes;