import { useEffect, useState } from "react";

import {
  Brain,
  Check,
  Clock,
  RotateCcw,
   History,
} from "lucide-react";

import {
  createRevision,
  updateRevision,
} from "../../api/revisionApi";

import {
  getAllRevisionHistory,
  createRevisionHistory,
} from "../../api/revisionHistoryApi";

function Revision({
  revisions,
  setRevisions,
 // syllabusData,
  //setSyllabusData,
  //branch,
  backendRevisions,
  setBackendRevisions,
  backendTopics,
}) {



  const [expandedHistory, setExpandedHistory] =
  useState(null);
  const [backendRevisionHistory, setBackendRevisionHistory] =
  useState([]);


  useEffect(() => {
  const loadRevisionHistory = async () => {
    try {
      const history = await getAllRevisionHistory();

      setBackendRevisionHistory(history);
    } catch (error) {
      console.error(
        "Failed to load revision history:",
        error
      );
    }
  };

  loadRevisionHistory();
}, []);

  // -----------------------------------------
  // Today's date
  // -----------------------------------------

  const today = new Date();

  today.setHours(0, 0, 0, 0);


  // -----------------------------------------
  // Format date
  // -----------------------------------------

  const formatDate = (dateString) => {

    const date = new Date(dateString);

    return date.toLocaleDateString(
      "en-IN",
      {
        day: "2-digit",
        month: "short",
        year: "numeric",
      }
    );
  };


  // -----------------------------------------
  // Check whether revision is due
  // -----------------------------------------

  // const isDue = (dueDate) => {

  //   const date = new Date(dueDate);

  const isDue = (nextDueDate) => {
  const date = new Date(nextDueDate);

    date.setHours(0, 0, 0, 0);

    return date <= today;
  };


  // -----------------------------------------
  // Calculate days difference
  // -----------------------------------------

  // const getDaysDifference = (dueDate) => {

  //   const date = new Date(dueDate);

  const getDaysDifference = (nextDueDate) => {
  const date = new Date(nextDueDate);

    date.setHours(0, 0, 0, 0);

    const difference =
      date.getTime() -
      today.getTime();

    return Math.ceil(
      difference /
      (1000 * 60 * 60 * 24)
    );
  };


  // -----------------------------------------
  // Complete revision
  // -----------------------------------------

  // const completeRevision = (revisionId) => {

  //   setRevisions((previousRevisions) => {

  //     return previousRevisions.map(
  //       (revision) => {

  //         if (revision.id !== revisionId) {
  //           return revision;
  //         }

  //         const currentDueDate =
  //           new Date(revision.dueDate);

  //         currentDueDate.setHours(
  //           0,
  //           0,
  //           0,
  //           0
  //         );

  //         const nextDate =
  //           new Date(currentDueDate);

  //         nextDate.setDate(
  //           nextDate.getDate() +
  //           revision.interval
  //         );

  //         return {
  //           ...revision,

  //           dueDate:
  //             nextDate
  //               .toISOString()
  //               .split("T")[0],
  //         };

  //       }
  //     );

  //   });
  // };


const completeRevision = async (revisionId) => {
  const revision = revisions.find(
    (item) => item.id === revisionId
  );

  if (!revision) {
    return;
  }

  const today = new Date().toISOString().split("T")[0];

  const nextDueDate = new Date();
  nextDueDate.setDate(
    nextDueDate.getDate() + Number(revision.interval || 1)
  );

  const formattedNextDueDate =
    nextDueDate.toISOString().split("T")[0];

  /*
   * ----------------------------------------------------
   * 1. Update backend revision
   * ----------------------------------------------------
   */

const revisionTopicName =
  revision.topic || revision.topicName;

const backendTopic = backendTopics.find(
  (topic) =>
    topic.name === revisionTopicName
);

const resolvedTopicId =
  revision.sourceTopicId ||
  revision.topicId ||
  backendTopic?.id;

 console.log("REVISION DEBUG:", {
  revisionTopic: revisionTopicName,
  sourceTopicId:
    revision.sourceTopicId || revision.topicId,
  backendTopic: backendTopic,
  resolvedTopicId: resolvedTopicId,
});

console.log(
  "BACKEND TOPICS FULL:",
  JSON.stringify(backendTopics, null, 2)
);

const backendRevision = backendRevisions.find(
  (item) =>
    item.topicId === resolvedTopicId
);

  

  if (backendRevision) {
  try {
    const updatedRevision = await updateRevision(
      backendRevision.id,
      {
        revisionStage: revision.revisionStage,
        revisionDate:
          revision.revisionDate || today,
        reviewCount:
          Number(revision.reviewCount || 0) + 1,
        interval: Number(revision.interval || 1),
        nextDueDate: formattedNextDueDate,
        completed: true,
        lastReviewedDate: today,
        topicId: backendRevision.topicId,
      }
    );

    setBackendRevisions((previous) =>
      previous.map((item) =>
        item.id === updatedRevision.id
          ? updatedRevision
          : item
      )
    );

   // Create revision history entry
const createdHistory = await createRevisionHistory({
  revisionStage: revision.revisionStage,
  completedDate: today,
  revisionId: updatedRevision.id,
});

setBackendRevisionHistory((previous) => [
  ...previous,
  createdHistory,
]);

  } catch (error) {
    console.error(
      "Failed to update backend revision:",
      error
    );
    return;
  }
} else {
  try {
    const createdRevision = await createRevision({
      revisionStage: revision.revisionStage,
      revisionDate:
        revision.revisionDate || today,
      reviewCount:
        Number(revision.reviewCount || 0) + 1,
      interval: Number(revision.interval || 1),
      nextDueDate: formattedNextDueDate,
      completed: true,
      lastReviewedDate: today,
      topicId: resolvedTopicId,
    });

    setBackendRevisions((previous) => [
      ...previous,
      createdRevision,
    ]);

    // Create revision history entry
    await createRevisionHistory({
      revisionStage: revision.revisionStage,
      completedDate: today,
      revisionId: createdRevision.id,
    });

  } catch (error) {
    console.error(
      "Failed to create backend revision:",
      error
    );
    return;
  }
}
  /*
   * ----------------------------------------------------
   * 2. Update local syllabus Last Revision
   * ----------------------------------------------------
   */

  // if (revision.source === "syllabus") {
  //   setSyllabusData((previous) => {
  //     const branchData = previous?.[branch] || [];

  //     const updatedBranch = branchData.map((subject) => ({
  //       ...subject,
  //       topics: subject.topics.map((topic) => {
  //         if (topic.id !== revision.sourceTopicId) {
  //           return topic;
  //         }

  //         return {
  //           ...topic,
  //           lastRevisionDate: today,
  //         };
  //       }),
  //     }));

  //     return {
  //       ...previous,
  //       [branch]: updatedBranch,
  //     };
  //   });
  // }

  /*
   * ----------------------------------------------------
   * 3. Update local revision state
   * ----------------------------------------------------
   */

  setRevisions((previous) =>
    previous.map((item) => {
      if (item.id !== revisionId) {
        return item;
      }

      return {
        ...item,
        completed: true,
        lastReviewedDate: today,
        reviewCount:
          Number(item.reviewCount || 0) + 1,
        reviewHistory: [
          ...(item.reviewHistory || []),
          today,
        ],
        nextDueDate: formattedNextDueDate,
      };
    })
  );
};

const resetRevision = async (revisionId) => {
  const today = new Date()
    .toISOString()
    .split("T")[0];

  const revision = revisions.find(
    (item) => item.id === revisionId
  );

  if (!revision) {
    return;
  }

  try {
    const updatedRevision = await updateRevision(
      revisionId,
      {
        revisionStage: revision.revisionStage,
        revisionDate:
          revision.revisionDate || today,
        reviewCount:
          Number(revision.reviewCount || 0),
        interval:
          Number(revision.interval || 1),
        nextDueDate: today,
        completed: false,
        lastReviewedDate:
          revision.lastReviewedDate || null,
        topicId:
          revision.topicId,
      }
    );

    setBackendRevisions((previousRevisions) =>
      previousRevisions.map((item) =>
        item.id === updatedRevision.id
          ? updatedRevision
          : item
      )
    );

    setRevisions((previousRevisions) =>
      previousRevisions.map((item) =>
        item.id === revisionId
          ? {
              ...item,
              completed: false,
              nextDueDate: today,
            }
          : item
      )
    );

    console.log(
      "Revision reset successfully:",
      updatedRevision
    );
  } catch (error) {
    console.error(
      "Failed to reset revision:",
      error
    );

    alert(
      error.response?.data?.message ||
        "Failed to reset revision. Please try again."
    );
  }
};
  // -----------------------------------------
  // Statistics
  // -----------------------------------------

  const dueCount =
    revisions.filter(
      (revision) =>
        isDue(revision.nextDueDate)
    ).length;


  const upcomingCount =
    revisions.length -
    dueCount;


  return (
    <section className="revision">

      {/* ================================= */}
      {/* Header */}
      {/* ================================= */}

      <div className="revision-header">

        <div>

          <p className="section-eyebrow">
            GATE QUEST PRO
          </p>

          <h2>
            Spaced Revision
          </h2>

          <p>
            Review important topics at
            planned intervals so they stay
            fresh in your memory.
          </p>

        </div>

      </div>


      {/* ================================= */}
      {/* Statistics */}
      {/* ================================= */}

      <div className="revision-stats">

        <div className="glass-card revision-stat">

          <div className="revision-stat-icon due">
            <Brain size={21} />
          </div>

          <div>

            <span>
              Due Today
            </span>

            <strong>
              {dueCount}
            </strong>

          </div>

        </div>


        <div className="glass-card revision-stat">

          <div className="revision-stat-icon upcoming">
            <Clock size={21} />
          </div>

          <div>

            <span>
              Upcoming
            </span>

            <strong>
              {upcomingCount}
            </strong>

          </div>

        </div>


        <div className="glass-card revision-stat">

          <div className="revision-stat-icon total">
            <RotateCcw size={21} />
          </div>

          <div>

            <span>
              Total Revisions
            </span>

            <strong>
              {revisions.length}
            </strong>

          </div>

        </div>

      </div>


      {/* ================================= */}
      {/* Revision Queue */}
      {/* ================================= */}

      <div className="glass-card revision-card">

        <div className="revision-card-header">

          <div>

            <h3>
              Revision Queue
            </h3>

            <p>
              Topics scheduled for spaced
              repetition.
            </p>

          </div>

          <span className="revision-count">
            {revisions.length} Topics
          </span>

        </div>


        {/* Empty State */}

        {revisions.length === 0 && (

          <div className="revision-empty">

            <Brain size={40} />

            <h3>
              No revision topics
            </h3>

            <p>
              Add topics to your revision
              schedule.
            </p>

          </div>

        )}


        {/* Revision Items */}

        <div className="revision-list">

          {revisions.map((revision) => {

            const due =
              isDue(revision.nextDueDate);

            const days =
              getDaysDifference(
                revision.nextDueDate
              );

//  const backendRevision = backendRevisions.find(
//   (item) => {
//     const topicId =
//       revision.sourceTopicId ||
//       backendTopics.find(
//         (topic) => topic.name === revision.topic
//       )?.id;

//     return item.topicId === topicId;
//   }
// );

const revisionTopicName =
  revision.topic || revision.topicName;

const topicId =
  revision.sourceTopicId ||
  revision.topicId ||
  backendTopics.find(
    (topic) => topic.name === revisionTopicName
  )?.id;

const backendRevision = backendRevisions.find(
  (item) => item.topicId === topicId
);

const historyEntries =
  backendRevisionHistory.filter(
    (history) =>
      history.revisionId === backendRevision?.id
  );

            return (
              <div
                key={revision.id}
                className={
                  `revision-item ${
                    due
                      ? "revision-due"
                      : ""
                  }`
                }
              >

                {/* Topic */}

                <div className="revision-topic">

                  <div className="revision-topic-icon">
                    <Brain size={17} />
                  </div>

                  <div>
 <h4>
  {revision.topic || revision.topicName}
</h4>

<p>
  {revision.subject || "GATE Preparation"}
</p>

                    {revision.revisionStage && (
                       <span className="revision-stage">
                           {revision.revisionStage === "rev1" ? "REV 1" : "REV 2"}
                        </span>
                     )}

                  </div>

                </div>


                {/* Schedule */}

                <div className="revision-schedule">

                  <span className="revision-label">
                    Interval
                  </span>

                  <strong>
                    {revision.interval} days
                  </strong>

                </div>


                {/* Due Date */}

                <div className="revision-date">

                  <span className="revision-label">
                    Due
                  </span>

                  <strong>
                    {formatDate(
                      revision.nextDueDate
                    )}
                  </strong>

                  {due ? (

                    <span className="due-text">
                      Due now
                    </span>

                  ) : (

                    <span className="upcoming-text">

                      {days} day
                      {days !== 1
                        ? "s"
                        : ""}{" "}
                      remaining

                    </span>

                  )}

                </div>
{revision.lastReviewedDate && (
  <div className="revision-date">
    <span className="revision-label">
      Last Reviewed
    </span>

    <strong>
      {formatDate(revision.lastReviewedDate)}
    </strong>
  </div>
)}


{revision.reviewCount > 0 && (
  <div className="revision-date">
    <span className="revision-label">
      Reviews
    </span>

    <strong>
      {revision.reviewCount}
    </strong>
  </div>
)}


{historyEntries.length > 0&& (
  <button
    className="revision-history-btn"
    onClick={() =>
      setExpandedHistory(
        expandedHistory === revision.id
          ? null
          : revision.id
      )
    }
  >
    <History size={14} />

    {expandedHistory === revision.id
      ? "Hide History"
      : "View History"}
  </button>
)}


{expandedHistory === revision.id &&
  historyEntries.length > 0 && (
    <div className="revision-history">
      <span className="revision-label">
        Revision History
      </span>

      <div className="revision-history-list">
{historyEntries
  .slice()
  .reverse()
  .map((history) => (
    <div
      key={history.id}
      className="revision-history-item"
    >
      <span>
        {formatDate(history.completedDate)}
      </span>
    </div>
  ))}
      </div>
    </div>
  )}
                {/* Action */}

                <div className="revision-actions">

                  {due ? (

                    <button
                      className="revision-complete-btn"
                      onClick={() =>
                        completeRevision(
                          revision.id
                        )
                      }
                    >

                      <Check size={15} />

                      Mark Revised

                    </button>

                  ) : (

                    <button
                      className="revision-reset-btn"
                      onClick={() =>
                        resetRevision(
                          revision.id
                        )
                      }
                    >

                      <RotateCcw size={14} />

                      Revise Now

                    </button>

                  )}

                </div>

              </div>
            );

          })}

        </div>

      </div>

    </section>
  );
}

export default Revision;