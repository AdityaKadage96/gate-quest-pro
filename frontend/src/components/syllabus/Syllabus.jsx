

// import { Check, BookOpen ,Pencil,Trash2,} from "lucide-react";
// import {
//   createRevision,
//   updateRevision,
//   deleteRevision,
// } from "../../api/revisionApi";

import { Check, BookOpen, Pencil, Trash2 } from "lucide-react";

import {
  createRevision,
  updateRevision,
  deleteRevision,
} from "../../api/revisionApi";

import {
  updateTopic,
} from "../../api/topicApi";



const milestones = [
  {
    key: "lectures",
    label: "Lectures",
  },
  {
    key: "pyq",
    label: "PYQs",
  },
  {
    key: "notes",
    label: "Notes",
  },
  {
    key: "rev1",
    label: "Rev 1",
  },
  {
    key: "rev2",
    label: "Rev 2",
  },
];

function Syllabus({
  branch,
  //syllabusData,
  //setSyllabusData,
  backendSubjects,
 // backendTopics,
  setBackendSubjects,
  backendRevisions,
  setBackendRevisions,
  onDeleteSubject,
  onDeleteTopic,
  setModalType,
  setEditingItem,
  //revisions,
  setRevisions,
}) {
  // -----------------------------------------
  // Get syllabus of currently selected branch
  // -----------------------------------------

  //const subjects = syllabusData?.[branch] || [];
  const subjects = backendSubjects || [];

  // -----------------------------------------
  // Toggle milestone
  // -----------------------------------------

  // const toggleMilestone = (
  //   subjectId,
  //   topicId,
  //   milestoneKey
  // ) => {
  //   setSyllabusData((previousData) => {
  //     const branchSubjects =
  //       previousData?.[branch] || [];

  //     const updatedSubjects =
  //       branchSubjects.map((subject) => {
  //         // Different subject
  //         if (subject.id !== subjectId) {
  //           return subject;
  //         }

  //         return {
  //           ...subject,

  //           topics: (subject.topics || []).map(
  //             (topic) => {
  //               // Different topic
  //               if (topic.id !== topicId) {
  //                 return topic;
  //               }

  //               // Toggle milestone
  //               return {
  //                 ...topic,

  //                 [milestoneKey]:
  //                   !topic[milestoneKey],
  //               };
  //             }
  //           ),
  //         };
  //       });

  //     return {
  //       ...previousData,
  //       [branch]: updatedSubjects,
  //     };
  //   });
  // };

  // // -----------------------------------------
  // // Calculate topic progress
  // // -----------------------------------------

  // const calculateTopicProgress = (topic) => {
  //   const completed =
  //     milestones.filter(
  //       (milestone) =>
  //         topic[milestone.key]
  //     ).length;

  //   return (
  //     (completed / milestones.length) * 100
  //   );
  // };




  const toggleMilestone = async (
  subjectId,
  topicId,
  milestoneKey
) => {

  // -----------------------------------------
  // Get subject/topic from backend data
  // -----------------------------------------

  const subject = subjects.find(
    (item) => item.id === subjectId
  );

  if (!subject) {
    return;
  }

  const topic = (subject.topics || []).find(
    (item) => item.id === topicId
  );

  if (!topic) {
    return;
  }

  const wasCompleted =
    Boolean(topic[milestoneKey]);

  const willBeCompleted =
    !wasCompleted;


    try {
  const updatedTopic = await updateTopic(
    topicId,
    {
      name: topic.name,
      description: topic.description || "",
      subjectId: subjectId,

      lectures:
        milestoneKey === "lectures"
          ? willBeCompleted
          : Boolean(topic.lectures),

      pyq:
        milestoneKey === "pyq"
          ? willBeCompleted
          : Boolean(topic.pyq),

      notes:
        milestoneKey === "notes"
          ? willBeCompleted
          : Boolean(topic.notes),

      rev1:
        milestoneKey === "rev1"
          ? willBeCompleted
          : Boolean(topic.rev1),

      rev2:
        milestoneKey === "rev2"
          ? willBeCompleted
          : Boolean(topic.rev2),

      lastRevisionDate:
        topic.lastRevisionDate || null,
    }
  );

  setBackendSubjects((previousSubjects) =>
  previousSubjects.map((subject) =>
    subject.id === subjectId
      ? {
          ...subject,
          topics: (subject.topics || []).map(
            (currentTopic) =>
              currentTopic.id === updatedTopic.id
                ? updatedTopic
                : currentTopic
          ),
        }
      : subject
  )
);

  console.log(
    "Topic milestone updated successfully:",
    updatedTopic
  );
} catch (error) {
  console.error(
    "Failed to update topic milestone:",
    error
  );

  alert(
    error.response?.data?.message ||
      "Failed to update syllabus milestone. Please try again."
  );

  return;
}


  // -----------------------------------------
  // Update localStorage milestone data
  // -----------------------------------------

  // setSyllabusData((previousData) => {

  //   const branchSubjects =
  //     previousData[branch] || [];

  //   const subjectExists =
  //     branchSubjects.some(
  //       (item) => item.id === subjectId
  //     );

  //   // -----------------------------------------
  //   // Subject already exists locally
  //   // -----------------------------------------

  //   if (subjectExists) {

  //     const updatedSubjects =
  //       branchSubjects.map(
  //         (currentSubject) => {

  //           if (
  //             currentSubject.id !==
  //             subjectId
  //           ) {
  //             return currentSubject;
  //           }

  //           const currentTopics =
  //             currentSubject.topics || [];

  //           const topicExists =
  //             currentTopics.some(
  //               (currentTopic) =>
  //                 currentTopic.id ===
  //                 topicId
  //             );

  //           // ---------------------------------
  //           // Topic already exists locally
  //           // ---------------------------------

  //           if (topicExists) {

  //             return {
  //               ...currentSubject,

  //               topics:
  //                 currentTopics.map(
  //                   (currentTopic) => {

  //                     if (
  //                       currentTopic.id !==
  //                       topicId
  //                     ) {
  //                       return currentTopic;
  //                     }

  //                     return {
  //                       ...currentTopic,

  //                       [milestoneKey]:
  //                         !currentTopic[
  //                           milestoneKey
  //                         ],
  //                     };
  //                   }
  //                 ),
  //             };
  //           }

  //           // ---------------------------------
  //           // Topic does not exist locally
  //           // Create local milestone record
  //           // ---------------------------------

  //           return {
  //             ...currentSubject,

  //             topics: [
  //               ...currentTopics,

  //               {
  //                 id: topic.id,
  //                 name: topic.name,
  //                 description:
  //                   topic.description || "",

  //                 lectures: false,
  //                 pyq: false,
  //                 notes: false,
  //                 rev1: false,
  //                 rev2: false,

  //                 lastRevisionDate:
  //                   null,

  //                 [milestoneKey]:
  //                   willBeCompleted,
  //               },
  //             ],
  //           };
  //         }
  //       );

  //     return {
  //       ...previousData,
  //       [branch]: updatedSubjects,
  //     };
  //   }

  //   // -----------------------------------------
  //   // Subject does not exist locally
  //   // Create subject + topic milestone record
  //   // -----------------------------------------

  //   return {
  //     ...previousData,

  //     [branch]: [
  //       ...branchSubjects,

  //       {
  //         id: subject.id,
  //         name: subject.name,
  //         weight: subject.weight,

  //         topics: [
  //           {
  //             id: topic.id,
  //             name: topic.name,
  //             description:
  //               topic.description || "",

  //             lectures: false,
  //             pyq: false,
  //             notes: false,
  //             rev1: false,
  //             rev2: false,

  //             lastRevisionDate:
  //               null,

  //             [milestoneKey]:
  //               willBeCompleted,
  //           },
  //         ],
  //       },
  //     ],
  //   };
  // });


  // -----------------------------------------
  // Connect Rev 1 / Rev 2
  // with Spaced Revision
  // -----------------------------------------

  if (
    milestoneKey !== "rev1" &&
    milestoneKey !== "rev2"
  ) {
    return;
  }


  const interval =
    milestoneKey === "rev1"
      ? 7
      : 14;


  const revisionId =
    `syllabus-${branch}-${subjectId}-${topicId}`;


  // -----------------------------------------
  // If milestone is completed
  // create/update revision
  // -----------------------------------------

  if (willBeCompleted) {

  const today = new Date();

  const todayString =
    today.toISOString().split("T")[0];

  const nextDueDate = new Date(today);

  nextDueDate.setDate(
    nextDueDate.getDate() + interval
  );

  const nextDueDateString =
    nextDueDate.toISOString().split("T")[0];

  // -----------------------------------------
  // Create revision in backend
  // -----------------------------------------

  const existingBackendRevision =
  backendRevisions.find(
    (revision) => revision.topicId === topicId
  );

if (existingBackendRevision) {
  updateRevision(existingBackendRevision.id, {
    revisionStage: milestoneKey,
    revisionDate: existingBackendRevision.revisionDate,
    reviewCount: existingBackendRevision.reviewCount,
    interval: interval,
    nextDueDate: nextDueDateString,
    completed: false,
    lastReviewedDate:
      existingBackendRevision.lastReviewedDate,
    topicId: topicId,
  })
    .then((updatedBackendRevision) => {
      setBackendRevisions((previousRevisions) =>
        previousRevisions.map((revision) =>
          revision.id === updatedBackendRevision.id
            ? updatedBackendRevision
            : revision
        )
      );
    })
    .catch((error) => {
      console.error(
        "Failed to update backend revision:",
        error
      );
    });
} else {
  createRevision({
    revisionStage: milestoneKey,
    revisionDate: todayString,
    reviewCount: 0,
    interval: interval,
    nextDueDate: nextDueDateString,
    completed: false,
    lastReviewedDate: null,
    topicId: topicId,
  })
    .then((backendRevision) => {
      setBackendRevisions((previousRevisions) => [
        ...previousRevisions,
        backendRevision,
      ]);
    })
    .catch((error) => {
      console.error(
        "Failed to create backend revision:",
        error
      );
    });
}
  // -----------------------------------------
  // Existing local revision system
  // -----------------------------------------

    setRevisions(
      (previousRevisions) => {

        // Remove old revision entries
        // created by previous ID system.

        const cleanedRevisions =
          previousRevisions.filter(
            (revision) =>
              revision.id !==
                `syllabus-${branch}-${subjectId}-${topicId}-rev1` &&
              revision.id !==
                `syllabus-${branch}-${subjectId}-${topicId}-rev2`
          );


        const alreadyExists =
          cleanedRevisions.some(
            (revision) =>
              revision.id ===
              revisionId
          );


        // -------------------------------------
        // Update existing revision
        // -------------------------------------

        if (alreadyExists) {

          return cleanedRevisions.map(
            (revision) => {

              if (
                revision.id !==
                revisionId
              ) {
                return revision;
              }

              return {
                ...revision,

                topic: topic.name,
                subject: subject.name,

                interval,

                revisionStage:
                  milestoneKey,

                nextDueDate:
                  nextDueDate
                    .toISOString()
                    .split("T")[0],

                completed: false,

                source: "syllabus",

                sourceMilestone:
                  milestoneKey,

                sourceTopicId:
                  topicId,

                sourceSubjectId:
                  subjectId,
              };
            }
          );
        }


        // -------------------------------------
        // Create new revision
        // -------------------------------------

        return [
          ...cleanedRevisions,

          {
            id: revisionId,

            topic: topic.name,

            subject: subject.name,

            interval,

            revisionStage:
              milestoneKey,

            nextDueDate:
              nextDueDate
                .toISOString()
                .split("T")[0],

            completed: false,

            source: "syllabus",

            sourceMilestone:
              milestoneKey,

            sourceTopicId:
              topicId,

            sourceSubjectId:
              subjectId,
          },
        ];
      }
    );

    return;
  }


  // -----------------------------------------
  // If Rev 2 is unchecked but Rev 1 remains
  // downgrade revision back to Rev 1
  // -----------------------------------------

  if (
  milestoneKey === "rev2" &&
  !willBeCompleted &&
  topic.rev1
) {
  const today = new Date();

  

  const nextDueDate =
    new Date(today);

  nextDueDate.setDate(
    nextDueDate.getDate() + 7
  );

  const nextDueDateString =
    nextDueDate.toISOString().split("T")[0];

  // -----------------------------------------
  // Update backend revision from Rev2 → Rev1
  // -----------------------------------------

  const existingBackendRevision =
    backendRevisions.find(
      (revision) => revision.topicId === topicId
    );

  if (existingBackendRevision) {
    updateRevision(existingBackendRevision.id, {
      revisionStage: "rev1",
      revisionDate:
        existingBackendRevision.revisionDate,
      reviewCount:
        existingBackendRevision.reviewCount,
      interval: 7,
      nextDueDate: nextDueDateString,
      completed: false,
      lastReviewedDate:
        existingBackendRevision.lastReviewedDate,
      topicId: topicId,
    })
      .then((updatedBackendRevision) => {
        setBackendRevisions(
          (previousRevisions) =>
            previousRevisions.map((revision) =>
              revision.id ===
              updatedBackendRevision.id
                ? updatedBackendRevision
                : revision
            )
        );
      })
      .catch((error) => {
        console.error(
          "Failed to downgrade backend revision:",
          error
        );
      });
  }

  // -----------------------------------------
  // Update existing local revision
  // -----------------------------------------

  setRevisions(
    (previousRevisions) =>
      previousRevisions.map(
        (revision) => {
          if (
            revision.id !== revisionId
          ) {
            return revision;
          }

          return {
            ...revision,

            interval: 7,

            revisionStage: "rev1",

            nextDueDate:
              nextDueDateString,

            completed: false,

            sourceMilestone: "rev1",
          };
        }
      )
  );

  return;
}
  // -----------------------------------------
  // If Rev 1 is unchecked while Rev 2 remains
  // keep Rev 2 active
  // -----------------------------------------

  if (
    milestoneKey === "rev1" &&
    !willBeCompleted &&
    topic.rev2
  ) {
    return;
  }


  // -----------------------------------------
  // If neither Rev 1 nor Rev 2 remains
  // remove revision
  // -----------------------------------------

  // -----------------------------------------
// Delete backend revision
// -----------------------------------------

const existingBackendRevision =
  backendRevisions.find(
    (revision) => revision.topicId === topicId
  );

if (existingBackendRevision) {
  deleteRevision(existingBackendRevision.id)
    .then(() => {
      setBackendRevisions(
        (previousRevisions) =>
          previousRevisions.filter(
            (revision) =>
              revision.id !==
              existingBackendRevision.id
          )
      );
    })
    .catch((error) => {
      console.error(
        "Failed to delete backend revision:",
        error
      );
    });
}

// -----------------------------------------
// Remove local revision
// -----------------------------------------

setRevisions(
  (previousRevisions) =>
    previousRevisions.filter(
      (revision) =>
        revision.id !== revisionId
    )
);

};
// -----------------------------------------
// Calculate topic progress
// -----------------------------------------

const calculateTopicProgress = (topic) => {
  const completed =
    milestones.filter(
      (milestone) =>
        topic[milestone.key]
    ).length;

  return (
    (completed / milestones.length) * 100
  );
};
  // -----------------------------------------
  // Calculate subject progress
  // -----------------------------------------

  const calculateSubjectProgress = (subject) => {
    const topics = subject.topics || [];

    if (topics.length === 0) {
      return 0;
    }

    let totalProgress = 0;

    topics.forEach((topic) => {
      totalProgress +=
        calculateTopicProgress(topic);
    });

    return Math.round(
      totalProgress / topics.length
    );
  };

  // -----------------------------------------
  // Empty branch
  // -----------------------------------------

  if (subjects.length === 0) {
    return (
      <section className="syllabus">
        <div className="glass-card syllabus-empty">
          <BookOpen size={40} />

          <h2>
            {branch === "CS"
              ? "CSE / IT"
              : branch}{" "}
            Syllabus
          </h2>

          <p>
            Syllabus data for this branch
            will be added soon.
          </p>

          <button
            className="primary-action-btn"
            onClick={() => {
              setEditingItem(null);
              setModalType("subject");
            }}
          >
            Add Subject
          </button>
        </div>
      </section>
    );
  }

  // -----------------------------------------
  // Main UI
  // -----------------------------------------

  return (
    <section className="syllabus">

      {/* Header */}

      <div className="syllabus-header">
        <div>
          <p className="section-eyebrow">
            GATE QUEST PRO
          </p>

          <h2>
            {branch === "CS"
              ? "CSE / IT"
              : branch}{" "}
            Custom Syllabus Matrix
          </h2>

          <p>
            Track lectures, PYQs, notes
            and revision milestones
            topic by topic.
          </p>
        </div>

        <button
          className="primary-action-btn"
          onClick={() => {
            setEditingItem(null);
            setModalType("subject");
          }}
        >
          Add Subject
        </button>
      </div>

      {/* Subjects */}

      <div className="syllabus-subjects">

        {subjects.map((subject) => {

          // IMPORTANT:
          // Make sure topics always exists.
          const topics =
            subject.topics || [];

          const subjectProgress =
            calculateSubjectProgress(
              subject
            );

          return (
            <div
              key={subject.id}
              className="glass-card subject-card"
            >

              {/* Subject Header */}

              <div className="subject-header">

                <div>
                  <h3>
                    {subject.name}
                  </h3>

                  <p>
                    {subject.weight || 0} Marks
                  </p>
                </div>

                {/* Subject Progress */}

                <div className="subject-progress">

                  <span>
                    {subjectProgress}%
                  </span>

                  <div className="progress-track">
                    <div
                      className="progress-fill"
                      style={{
                        width:
                          `${subjectProgress}%`,
                      }}
                    />
                  </div>

                </div>

                {/* Add Topic */}

                {/* <button
                  onClick={() => {
                    // FIX:
                    // `sub` was undefined.
                    // We need to pass the current subject.
                    setEditingItem(subject);
                    setModalType("topic");
                  }}
                  className="add-topic-btn"
                >
                  + Add Topic
                </button> */}


                {/* Subject Actions */}

<div className="subject-actions">

  <button
    onClick={() => {
      setEditingItem(subject);
      setModalType("subject");
    }}
    className="add-topic-btn"
  >
    <Pencil size={14} />
    Edit Subject
  </button>


  


  <button
  onClick={() => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this subject?"
    );

    if (!confirmed) {
      return;
    }

    onDeleteSubject(subject.id);
  }}
  className="add-topic-btn"
>
  <Trash2 size={14} />
  Delete Subject
</button>


  <button
    onClick={() => {
      setEditingItem(subject);
      setModalType("topic");
    }}
    className="add-topic-btn"
  >
    + Add Topic
  </button>

</div>

              </div>

              {/* Topics */}

              <div className="topic-list">

                {topics.length === 0 ? (
                  <div className="empty-topic-message">
                    No topics added yet.
                    Click "+ Add Topic" to
                    create one.
                  </div>
                ) : (
                  topics.map((topic) => {

                    const topicProgress =
                      calculateTopicProgress(
                        topic
                      );

                    return (
                      <div
                        key={topic.id}
                        className="topic-row"
                      >

                        {/* Topic Name */}

                        <div className="topic-info">

                          <span className="topic-name">
                            {topic.name}
                          </span>

                          <span className="topic-progress-text">
                            {Math.round(
                              topicProgress
                            )}%
                          </span>

                        </div>



<button
  onClick={() => {
    setEditingItem({
      ...topic,
      subjectId: subject.id,
    });

    setModalType("topic");
  }}
  className="add-topic-btn"
>
  Edit Topic
</button>


<button
  onClick={() => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this topic?"
    );

    if (!confirmed) {
      return;
    }

    onDeleteTopic(
      topic.id,
      subject.id
    );
  }}
  className="add-topic-btn"
>
  <Trash2 size={14} />
  Delete Topic
</button>

                        {/* Milestones */}

                        <div className="milestone-list">

                          {milestones.map(
                            (milestone) => {

                              const completed =
                                Boolean(
                                  topic[
                                    milestone.key
                                  ]
                                );

                              return (
                                <button
                                  key={
                                    milestone.key
                                  }
                                  className={
                                    `milestone-btn ${
                                      completed
                                        ? "completed"
                                        : ""
                                    }`
                                  }
                                  onClick={() =>
                                    toggleMilestone(
                                      subject.id,
                                      topic.id,
                                      milestone.key
                                    )
                                  }
                                >
                                  {completed ? (
                                    <Check
                                      size={14}
                                    />
                                  ) : (
                                    milestone.label
                                  )}
                                </button>
                              );
                            }
                          )}

                        </div>

                        {topic.lastRevisionDate && (
  <div className="topic-last-revision">
    Last Revision:{" "}
    {new Date(
      topic.lastRevisionDate
    ).toLocaleDateString("en-IN", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    })}
  </div>
)}

                      </div>
                    );
                  })
                )}

              </div>

            </div>
          );
        })}

      </div>

    </section>
  );
}

export default Syllabus;