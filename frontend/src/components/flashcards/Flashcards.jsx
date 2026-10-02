import {
  ChevronLeft,
  ChevronRight,
  RotateCcw,
  Eye,
  Layers,
  Trash2,
   Pencil,
} from "lucide-react";

import {  useState } from "react";
function Flashcards({
  flashcards,
  setModalType,
  onDeleteFlashcard,
   onEditFlashcard,
}) {

  // -----------------------------------------
  // Current card
  // -----------------------------------------

  const [currentIndex, setCurrentIndex] =
    useState(0);


  // -----------------------------------------
  // Show answer
  // -----------------------------------------

  const [showAnswer, setShowAnswer] =
    useState(false);


    const safeCurrentIndex =
  flashcards.length === 0
    ? 0
    : Math.min(currentIndex, flashcards.length - 1);

// useEffect(() => {
//   if (flashcards.length === 0) {
//     setCurrentIndex(0);
//     setShowAnswer(false);
//     return;
//   }

//   if (currentIndex >= flashcards.length) {
//     setCurrentIndex(flashcards.length - 1);
//     setShowAnswer(false);
//   }
// }, [flashcards.length, currentIndex]);

  // -----------------------------------------
  // Empty state
  // -----------------------------------------

  if (!flashcards || flashcards.length === 0) {

  return (
    <section className="flashcards">

      <div className="glass-card flashcards-empty">

        <Layers size={42} />

        <h2>
          Formula Deck
        </h2>

        <p>
          No flashcards available yet.
        </p>

        <button
          className="primary-action-btn"
          onClick={() =>
            setModalType("flashcard")
          }
        >
          <Layers size={16} />
          Add Flashcard
        </button>

      </div>

    </section>
  );
}

  // -----------------------------------------
  // Current flashcard
  // -----------------------------------------
const currentCard =
  flashcards[safeCurrentIndex];


  // -----------------------------------------
  // Next card
  // -----------------------------------------

  const nextCard = () => {

    setShowAnswer(false);

    setCurrentIndex(
      (previousIndex) =>
        (previousIndex + 1) %
        flashcards.length
    );
  };


  // -----------------------------------------
  // Previous card
  // -----------------------------------------

  const previousCard = () => {

    setShowAnswer(false);

    setCurrentIndex(
      (previousIndex) =>
        (previousIndex - 1 +
          flashcards.length) %
        flashcards.length
    );
  };


  // -----------------------------------------
  // Reset deck
  // -----------------------------------------

  const resetDeck = () => {

    setCurrentIndex(0);

    setShowAnswer(false);
  };


  return (
    <section className="flashcards">

      {/* ================================= */}
      {/* Header */}
      {/* ================================= */}

      <div className="flashcards-header">

        <div>

          <p className="section-eyebrow">
            GATE QUEST PRO
          </p>

          <h2>
            Formula Deck
          </h2>

          <p>
            Quickly revise formulas,
            concepts and important
            GATE facts.
          </p>


        </div>
         
         <button
  className="primary-action-btn"
  onClick={() =>
    setModalType("flashcard")
  }
>
  <Layers size={16} />
  Add Flashcard
</button>
        <div className="flashcards-total">

          <Layers size={16} />

          {flashcards.length} Cards

        </div>

      </div>


      {/* ================================= */}
      {/* Progress */}
      {/* ================================= */}

      <div className="flashcard-progress">

        <div className="flashcard-progress-info">

          <span>
          Card {safeCurrentIndex + 1}
            {" "}
            / {flashcards.length}
          </span>

          <span>
            {Math.round(
             ((safeCurrentIndex + 1) /
               flashcards.length) *
               100
            )}%
          </span>

        </div>

        <div className="progress-track">

          <div
            className="progress-fill"
            style={{
              width:
                `${((currentIndex + 1) /
                  flashcards.length) *
                  100}%`,
            }}
          />

        </div>

      </div>


      {/* ================================= */}
      {/* Flashcard */}
      {/* ================================= */}

      <div className="flashcard-wrapper">

        <div
          className={
            `flashcard ${
              showAnswer
                ? "flashcard-answer"
                : ""
            }`
          }
        >

          {/* Subject */}

<button
  type="button"
  className="flashcard-edit-btn"
  onClick={() =>
    onEditFlashcard(currentCard)
  }
  title="Edit flashcard"
>
  <Pencil size={16} />
</button>


<div className="flashcard-subject">
  {currentCard.topicName || "GATE"}
</div>
<button
  type="button"
  className="flashcard-delete-btn"
  onClick={() =>
    onDeleteFlashcard(currentCard.id)
  }
  title="Delete flashcard"
>
  <Trash2 size={16} />
</button>



          {/* Card content */}

          <div className="flashcard-content">

            {!showAnswer ? (

              <>
                <span className="flashcard-label">
                  QUESTION
                </span>

               <h3>{currentCard.question}</h3>
              </>

            ) : (

              <>
                <span className="flashcard-label">
                  ANSWER
                </span>
                   <h3 className="answer-text">
                        {currentCard.answer}
                    </h3>
              </>

            )}

          </div>


          {/* Reveal */}

          {!showAnswer && (

            <button
              className="reveal-btn"
              onClick={() =>
                setShowAnswer(true)
              }
            >

              <Eye size={17} />

              Reveal Answer

            </button>

          )}

        </div>

      </div>


      {/* ================================= */}
      {/* Controls */}
      {/* ================================= */}

      <div className="flashcard-controls">

        <button
          className="flashcard-nav-btn"
          onClick={previousCard}
        >

          <ChevronLeft size={18} />

          Previous

        </button>


        <button
          className="flashcard-reset-btn"
          onClick={resetDeck}
        >

          <RotateCcw size={15} />

          Reset

        </button>


        <button
          className="flashcard-nav-btn primary"
          onClick={nextCard}
        >

          Next

          <ChevronRight size={18} />

        </button>

      </div>

    </section>
  );
}

export default Flashcards;