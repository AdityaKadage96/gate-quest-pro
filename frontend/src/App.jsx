
import { useState, useEffect } from "react";

//import useLocalStorage from "./hooks/useLocalStorage";

import Header from "./components/layout/Header";
import Navigation from "./components/layout/Navigation";
import Footer from "./components/layout/Footer";

import Dashboard from "./components/dashboard/Dashboard";
import Syllabus from "./components/syllabus/Syllabus";
import Revision from "./components/revision/Revision";
import Flashcards from "./components/flashcards/Flashcards";
import Mistakes from "./components/mistakes/Mistakes";
import Planner from "./components/planner/Planner";
import Mocks from "./components/mocks/Mocks";
import FocusRoom from "./components/focus/FocusRoom";

import SettingsModal from "./components/modals/SettingsModal";
import SubjectModal from "./components/modals/SubjectModal";
import TopicModal from "./components/modals/TopicModal";
import FlashcardModal from "./components/modals/FlashcardModal";
import MistakeModal from "./components/modals/MistakeModal";
import TaskModal from "./components/modals/TaskModal";
import MockModal from "./components/modals/MockModal";

import { useAuth } from "./context/AuthContext";
//import { useAuth } from "./context/useAuth";
import Login from "./components/auth/Login";
//import Register from "./components/auth/Register";

// import {
  
//   INITIAL_REVISIONS,
// } from "./data/initialData";


import {
  calculateOverallSyllabusProgress,
} from "./utils/calculations";

import {
  getAllSubjects,
  createSubject,
  updateSubject,
  deleteSubject,
} from "./api/subjectApi";

import {
  getAllTopics,
  createTopic,
  updateTopic,
  deleteTopic,
} from "./api/topicApi";

import { getAllRevisions } from "./api/revisionApi";

import {
  getAllFlashcards,
  createFlashcard,
  updateFlashcard,
  deleteFlashcard,
 
} from "./api/flashcardApi";

import {
  getAllMistakes,
  createMistake,
  updateMistake,
  deleteMistake,
} from "./api/mistakeApi";

import {
  getAllTasks,
  createTask,
  updateTask,
  deleteTask,
} from "./api/taskApi";


import {
  getAllMocks,
  createMock,
  deleteMock,
} from "./api/mockApi";

import {
  getAllStudyLogs,
  createStudyLog,
  updateStudyLog,
} from "./api/studyLogApi";

import {
  getAllGoals,
  createGoal,
  updateGoal,
} from "./api/goalApi";

import {
  updateUser,
} from "./api/userApi";

function App() {

  // const { isAuthenticated } = useAuth();
  const {
  isAuthenticated,
  user,
  updateAuthenticatedUser,
} = useAuth();

  const [backendSubjects, setBackendSubjects] =
  useState([]);

  const [backendTopics, setBackendTopics] =
  useState([]);

  const [backendRevisions, setBackendRevisions] = useState([]);

const [revisions, setRevisions] = useState([]);

// const [syllabusData, setSyllabusData] =
//   useLocalStorage(
//     "gq_syllabus",
//     DEFAULT_SYLLABUS
//   );

  // --------------------------------
  // Modal State
  // --------------------------------

  const [modalType, setModalType] = useState(null);

  const [editingItem, setEditingItem] = useState(null);

  // --------------------------------
  // Navigation
  // --------------------------------

  const [activeTab, setActiveTab] = useState("dashboard");

  // --------------------------------
  // Branch
  // --------------------------------

  const [branch, setBranch] = useState(
  user?.branch || "CS"
);

//   const [branch, setBranch] = useState("CS");
//   useEffect(() => {
//   if (user?.branch) {
//     setBranch(user.branch);
//   }
// }, [user]);


const handleBranchChange = async (newBranch) => {
  if (!user?.id) {
    console.error(
      "Cannot update branch: user ID is missing."
    );
    return;
  }

  try {
    const updatedUser = await updateUser(
      user.id,
      {
        name: user.name,
        email: user.email,
        branch: newBranch,
      }
    );

    setBranch(updatedUser.branch);

    updateAuthenticatedUser(updatedUser);

    console.log(
      "Branch updated successfully:",
      updatedUser.branch
    );
  } catch (error) {
    console.error(
      "Failed to update branch:",
      error
    );

    alert(
      error.response?.data?.message ||
        "Failed to update branch. Please try again."
    );
  }
};

  // --------------------------------
  // Main Application Data
  // --------------------------------

  // const [syllabusData, setSyllabusData] =
  //   useLocalStorage(
  //     "gq_syllabus",
  //     DEFAULT_SYLLABUS
  //   );



  
 useEffect(() => {
  if (!isAuthenticated) {
    return;
  }

  const loadSyllabusData = async () => {
    try {
      const [subjects, topics, revisionsFromBackend] =
  await Promise.all([
    getAllSubjects(),
    getAllTopics(),
    getAllRevisions(),
  ]);

      setBackendTopics(topics);
      setBackendRevisions(revisionsFromBackend);
      setRevisions(revisionsFromBackend);

      const branchSubjects =
  subjects.filter(
    (subject) => subject.branch === branch
  );

const transformedSubjects =
  branchSubjects.map((subject) => ({
    id: subject.id,
    name: subject.name,
    weight: subject.weight,

    topics: topics
      .filter(
        (topic) =>
          topic.subjectId === subject.id
      )
      .map((topic) => ({
        id: topic.id,
        name: topic.name,
        description: topic.description,

        lectures: Boolean(topic.lectures),
        pyq: Boolean(topic.pyq),
        notes: Boolean(topic.notes),
        rev1: Boolean(topic.rev1),
        rev2: Boolean(topic.rev2),

        lastRevisionDate:
          topic.lastRevisionDate || null,
      })),
  }));

      setBackendSubjects(
        transformedSubjects
      );
    } catch (error) {
      console.error(
        "Failed to load syllabus data:",
        error
      );
    }
  };

  loadSyllabusData();
}, [
  isAuthenticated,
  branch,
]);

  const [flashcards, setFlashcards] =
  useState([]);

    useEffect(() => {
  const loadFlashcards = async () => {
    try {
      const backendFlashcards =
        await getAllFlashcards();

      setFlashcards(backendFlashcards);
    } catch (error) {
      console.error(
        "Failed to load flashcards:",
        error
      );
    }
  };

  if (isAuthenticated) {
    loadFlashcards();
  }
}, [isAuthenticated, setFlashcards]);

 const [mistakes, setMistakes] = useState([]);


 useEffect(() => {
  const loadMistakes = async () => {
    try {
      const backendMistakes = await getAllMistakes();
      setMistakes(backendMistakes);
    } catch (error) {
      console.error("Failed to load mistakes:", error);
    }
  };

  if (isAuthenticated) {
    loadMistakes();
  }
}, [isAuthenticated]);

  const [tasks, setTasks] = useState([]);

  useEffect(() => {
  const loadTasks = async () => {
    try {
      const backendTasks = await getAllTasks();

      const formattedTasks = backendTasks.map((task) => ({
        ...task,
        start: task.startTime
          ? String(task.startTime).slice(0, 5)
          : "",
        end: task.endTime
          ? String(task.endTime).slice(0, 5)
          : "",
      }));

      setTasks(formattedTasks);
    } catch (error) {
      console.error("Failed to load tasks:", error);
    }
  };

  if (isAuthenticated) {
    loadTasks();
  }
}, [isAuthenticated]);



 

  // -----------------------------------------
// Legacy Revision Data Migration
// -----------------------------------------

// useEffect(() => {
//   setRevisions((previousRevisions) => {

//     let changed = false;

//     const migratedRevisions =
//       previousRevisions.map((revision) => {

//         const updatedRevision = {
//           ...revision,
//         };

//         // Add revision stage to older records.
//         if (!updatedRevision.revisionStage) {

//           if (Number(updatedRevision.interval) === 7) {
//             updatedRevision.revisionStage = "rev1";
//             changed = true;
//           }

//           if (Number(updatedRevision.interval) === 14) {
//             updatedRevision.revisionStage = "rev2";
//             changed = true;
//           }
//         }

//         // Add review count to older records.
//         if (
//           updatedRevision.reviewCount === undefined
//         ) {
//           updatedRevision.reviewCount = 0;
//           changed = true;
//         }

//         // Add review history to older records.
//         if (!Array.isArray(updatedRevision.reviewHistory)) {
//           updatedRevision.reviewHistory = [];
//           changed = true;
//          }

//         return updatedRevision;
//       });

//     return changed
//       ? migratedRevisions
//       : previousRevisions;
//   });
// }, [setRevisions]);



  const [mocks, setMocks] = useState([]);

  useEffect(() => {
  const loadMocks = async () => {
    try {
      const backendMocks = await getAllMocks();

      const formattedMocks = backendMocks.map((mock) => ({
        ...mock,
        date: mock.testDate,
        maxScore: 100,
      }));

      setMocks(formattedMocks);
    } catch (error) {
      console.error("Failed to load mock tests:", error);
    }
  };

  if (isAuthenticated) {
    loadMocks();
  }
}, [isAuthenticated]);
  // --------------------------------
  // Study Settings
  // --------------------------------

  const [
  dailyTargetHours,
  setDailyTargetHours,
] = useState(6);

useEffect(() => {
  const loadGoal = async () => {
    try {
      const goals = await getAllGoals();

      const activeGoal = goals.find(
        (goal) => goal.active === true
      );

      if (activeGoal) {
        setDailyTargetHours(
          Number(activeGoal.targetMinutes || 0) / 60
        );

        if (activeGoal.targetExamDate) {
          setTargetExamDate(
            activeGoal.targetExamDate
          );
        }
      }
    } catch (error) {
      console.error(
        "Failed to load daily goal:",
        error
      );
    }
  };

  if (isAuthenticated) {
    loadGoal();
  }
}, [isAuthenticated]);


// const saveDailyGoal = async (hours,examDate) => {
//   try {
//     const goals = await getAllGoals();

//     const activeGoal = goals.find(
//       (goal) => goal.active === true
//     );

//     const targetMinutes = Math.round(
//       Number(hours) * 60
//     );

//     // if (activeGoal) {
//     //   await updateGoal(
//     //     activeGoal.id,
//     //     {
//     //       name: "Daily Study Goal",
//     //       targetMinutes,
//     //       active: true,
//     //     }
//     //   );
//     // }
//     if (activeGoal) {
//   setDailyTargetHours(
//     Number(activeGoal.targetMinutes || 0) / 60
//   );

//   if (activeGoal.targetExamDate) {
//     setTargetExamDate(
//       activeGoal.targetExamDate
//     );
//   }
// } else {
//       await createGoal({
//         name: "Daily Study Goal",
//         targetMinutes,
//         active: true,
//       });
//     }

//     //setDailyTarget(Number(hours));
//     setDailyTargetHours(Number(hours));
//   } catch (error) {
//     console.error(
//       "Failed to save daily goal:",
//       error
//     );
//   }
// };


const saveDailyGoal = async (
  hours,
  examDate
) => {
  try {
    const goals = await getAllGoals();

    const activeGoal = goals.find(
      (goal) => goal.active === true
    );

    const targetMinutes = Math.round(
      Number(hours) * 60
    );

    if (activeGoal) {
      await updateGoal(
        activeGoal.id,
        {
          name: "Daily Study Goal",
          targetMinutes,
          active: true,
          targetExamDate: examDate,
        }
      );
    } else {
      await createGoal({
        name: "Daily Study Goal",
        targetMinutes,
        active: true,
        targetExamDate: examDate,
      });
    }

    setDailyTargetHours(
      Number(hours)
    );
  } catch (error) {
    console.error(
      "Failed to save daily goal:",
      error
    );
  }
};


  const [
  targetExamDate,
  setTargetExamDate,
] = useState("2027-02-06");
  // --------------------------------
  // Study Logs
  // --------------------------------

  const [studyLogs, setStudyLogs] = useState({});

  useEffect(() => {
  const loadStudyLogs = async () => {
    try {
      const backendStudyLogs = await getAllStudyLogs();

      const formattedStudyLogs = backendStudyLogs.reduce(
  (logs, studyLog) => {
    logs[studyLog.logDate] =
      Number(studyLog.minutes || 0) / 60;

    return logs;
  },
  {}
);

      setStudyLogs(formattedStudyLogs);
    } catch (error) {
      console.error(
        "Failed to load study logs:",
        error
      );
    }
  };

  if (isAuthenticated) {
    loadStudyLogs();
  }
}, [isAuthenticated]);


const saveStudyLog = async (date, hours) => {
  try {
    const minutes = Math.round(Number(hours) * 60);

    const existingStudyLogs = await getAllStudyLogs();

    const existingLog = existingStudyLogs.find(
      (studyLog) => studyLog.logDate === date
    );

    let savedStudyLog;

    if (existingLog) {
      savedStudyLog = await updateStudyLog(
        existingLog.id,
        {
          logDate: date,
          minutes,
        }
      );
    } else {
      savedStudyLog = await createStudyLog({
        logDate: date,
        minutes,
      });
    }

    setStudyLogs((previousLogs) => ({
      ...previousLogs,
      [date]: Number(savedStudyLog.minutes || 0) / 60,
    }));

    return savedStudyLog;
  } catch (error) {
    console.error(
      "Failed to save study log:",
      error
    );

    throw error;
  }
};
  // --------------------------------
  // Temporary Overall Progress
  // --------------------------------

  //const overallProgress = 0;

 const overallProgress =
  calculateOverallSyllabusProgress(
    backendSubjects
  );

  // --------------------------------
  // Revision Count
  // --------------------------------

  const todayDate = new Date();

  todayDate.setHours(
    0,
    0,
    0,
    0
  );

  const revisionCount =
    revisions.filter((revision) => {

      if (!revision.nextDueDate) {
        return false;
      }
      const dueDate =
        new Date(revision.nextDueDate);

      dueDate.setHours(
        0,
        0,
        0,
        0
      );

      return dueDate <= todayDate;
    }).length;

  // --------------------------------
  // Save Subject
  // --------------------------------

  // const saveSubject = (subject) => {
  //   setSyllabusData((previousData) => {
  //     const currentSubjects =
  //       previousData[branch] || [];

  //     const exists = currentSubjects.some(
  //       (item) => item.id === subject.id
  //     );

  //     const updatedSubjects = exists
  //       ? currentSubjects.map((item) =>
  //           item.id === subject.id
  //             ? subject
  //             : item
  //         )
  //       : [
  //           ...currentSubjects,
  //           subject,
  //         ];

  //     return {
  //       ...previousData,
  //       [branch]: updatedSubjects,
  //     };
  //   });

  //   setModalType(null);
  //   setEditingItem(null);
  // };

  const saveSubject = async (subject) => {
  try {
    const isExistingSubject = backendSubjects.some(
      (item) => item.id === subject.id
    );

    if (isExistingSubject) {
      const updatedSubject = await updateSubject(
        subject.id,
        {
          name: subject.name,
          branch: branch,
          weight: subject.weight,
        }
      );

      setBackendSubjects((previousSubjects) =>
        previousSubjects.map((item) =>
          item.id === updatedSubject.id
            ? {
                ...item,
                ...updatedSubject,
                topics: item.topics || [],
              }
            : item
        )
      );
    } else {
      const createdSubject = await createSubject({
        name: subject.name,
        branch: branch,
        weight: subject.weight,
      });

      setBackendSubjects((previousSubjects) => [
        ...previousSubjects,
        {
          ...createdSubject,
          topics: [],
        },
      ]);
    }

    setModalType(null);
    setEditingItem(null);
  } catch (error) {
    console.error(
      "Failed to save subject:",
      error
    );
  }
};


const handleDeleteSubject = async (subjectId) => {
  try {
    await deleteSubject(subjectId);

    setBackendSubjects((previousSubjects) =>
      previousSubjects.filter(
        (subject) => subject.id !== subjectId
      )
    );
  } catch (error) {
    console.error(
      "Failed to delete subject:",
      error
    );

    alert(
      "Failed to delete subject. Please try again."
    );
  }
};

const handleDeleteTopic = async (
  topicId,
  subjectId
) => {
  try {
    await deleteTopic(topicId);

    setBackendSubjects(
      (previousSubjects) =>
        previousSubjects.map((subject) =>
          subject.id === subjectId
            ? {
                ...subject,
                topics: (
                  subject.topics || []
                ).filter(
                  (topic) =>
                    topic.id !== topicId
                ),
              }
            : subject
        )
    );

    setBackendTopics(
      (previousTopics) =>
        previousTopics.filter(
          (topic) =>
            topic.id !== topicId
        )
    );
  } catch (error) {
    console.error(
      "Failed to delete topic:",
      error
    );

    alert(
      error.response?.data?.message ||
        "Failed to delete topic. Please try again."
    );
  }
};
  // --------------------------------
  // Save Topic
  // --------------------------------


  const saveTopic = async (topic) => {
  if (!editingItem) {
    return;
  }

  const isEditingTopic =
    Boolean(editingItem.subjectId);

  const subjectId = isEditingTopic
    ? editingItem.subjectId
    : editingItem.id;

  try {
    if (isEditingTopic) {
      const updatedTopic =
        await updateTopic(
          editingItem.id,
          {
            name: topic.name,
            description:
              topic.description || "",
            subjectId: subjectId,

            lectures: Boolean(topic.lectures),
            pyq: Boolean(topic.pyq),
            notes: Boolean(topic.notes),
            rev1: Boolean(topic.rev1),
            rev2: Boolean(topic.rev2),
            lastRevisionDate:
              topic.lastRevisionDate || null,
          }
        );

      setBackendSubjects(
        (previousSubjects) =>
          previousSubjects.map(
            (subject) =>
              subject.id === subjectId
                ? {
                    ...subject,
                    topics: (
                      subject.topics || []
                    ).map(
                      (currentTopic) =>
                        currentTopic.id ===
                        updatedTopic.id
                          ? updatedTopic
                          : currentTopic
                    ),
                  }
                : subject
          )
      );

      setBackendTopics(
        (previousTopics) =>
          previousTopics.map(
            (currentTopic) =>
              currentTopic.id ===
              updatedTopic.id
                ? updatedTopic
                : currentTopic
          )
      );
    } else {
      const createdTopic =
        await createTopic({
          name: topic.name,
          description:
            topic.description || "",
          subjectId: subjectId,

          lectures: false,
          pyq: false,
          notes: false,
          rev1: false,
          rev2: false,
          lastRevisionDate: null,
        });

      const transformedTopic = {
        id: createdTopic.id,
        name: createdTopic.name,
        description:
          createdTopic.description || "",

       lectures:
  Boolean(topic.lectures),

pyq:
  Boolean(topic.pyq),

notes:
  Boolean(topic.notes),

rev1:
  Boolean(topic.rev1),

rev2:
  Boolean(topic.rev2),

lastRevisionDate:
  topic.lastRevisionDate || null,
      };

      setBackendSubjects(
        (previousSubjects) =>
          previousSubjects.map(
            (subject) =>
              subject.id === subjectId
                ? {
                    ...subject,
                    topics: [
                      ...(subject.topics || []),
                      transformedTopic,
                    ],
                  }
                : subject
          )
      );

      setBackendTopics(
        (previousTopics) => [
          ...previousTopics,
          createdTopic,
        ]
      );
    }

    setModalType(null);
    setEditingItem(null);
  } catch (error) {
    console.error(
      "Failed to save topic:",
      error
    );

    alert(
      error.response?.data?.message ||
        "Failed to save topic. Please try again."
    );
  }
};

// const saveTopic = async (topic) => {
//   if (!editingItem) {
//     return;
//   }

//   const isEditingTopic =
//     Boolean(editingItem.subjectId);

//   const subjectId = isEditingTopic
//     ? editingItem.subjectId
//     : editingItem.id;

//   try {
//     if (isEditingTopic) {
//       const updatedTopic =
//         await updateTopic(
//           editingItem.id,
//           {
//             name: topic.name,
//             description:
//               topic.description || "",
//             subjectId: subjectId,
//           }
//         );

//       setBackendSubjects(
//         (previousSubjects) =>
//           previousSubjects.map(
//             (subject) =>
//               subject.id === subjectId
//                 ? {
//                     ...subject,
//                     topics: (
//                       subject.topics || []
//                     ).map(
//                       (currentTopic) =>
//                         currentTopic.id ===
//                         updatedTopic.id
//                           ? {
//                               ...currentTopic,
//                               name:
//                                 updatedTopic.name,
//                               description:
//                                 updatedTopic.description,
//                             }
//                           : currentTopic
//                     ),
//                   }
//                 : subject
//           )
//       );

//       setBackendTopics(
//         (previousTopics) =>
//           previousTopics.map(
//             (currentTopic) =>
//               currentTopic.id ===
//               updatedTopic.id
//                 ? updatedTopic
//                 : currentTopic
//           )
//       );
//     } else {
//       const createdTopic =
//         await createTopic({
//           name: topic.name,
//           description:
//             topic.description || "",
//           subjectId: subjectId,
//         });

//       const transformedTopic = {
//         id: createdTopic.id,
//         name: createdTopic.name,
//         description:
//           createdTopic.description || "",

//         lectures: false,
//         pyq: false,
//         notes: false,
//         rev1: false,
//         rev2: false,
//         lastRevisionDate: null,
//       };

//       setBackendSubjects(
//         (previousSubjects) =>
//           previousSubjects.map(
//             (subject) =>
//               subject.id === subjectId
//                 ? {
//                     ...subject,
//                     topics: [
//                       ...(subject.topics || []),
//                       transformedTopic,
//                     ],
//                   }
//                 : subject
//           )
//       );

//       setBackendTopics(
//         (previousTopics) => [
//           ...previousTopics,
//           createdTopic,
//         ]
//       );
//     }

//     setModalType(null);
//     setEditingItem(null);
//   } catch (error) {
//     console.error(
//       "Failed to save topic:",
//       error
//     );

//     alert(
//       error.response?.data?.message ||
//         "Failed to save topic. Please try again."
//     );
//   }
// };
  // --------------------------------
  // Save Flashcard
  // --------------------------------
const saveFlashcard = async (flashcard) => {
  try {
    if (editingItem) {
      const updatedFlashcard =
        await updateFlashcard(
          editingItem.id,
          flashcard
        );

      setFlashcards((previousCards) =>
        previousCards.map((card) =>
          card.id === updatedFlashcard.id
            ? updatedFlashcard
            : card
        )
      );
    } else {
      const createdFlashcard =
        await createFlashcard(flashcard);

      setFlashcards((previousCards) => [
        ...previousCards,
        createdFlashcard,
      ]);
    }

    setModalType(null);
    setEditingItem(null);
  } catch (error) {
    console.error(
      "Failed to save flashcard:",
      error
    );

    alert(
      error.response?.data?.message ||
        "Failed to save flashcard. Please try again."
    );
  }
};



const handleDeleteFlashcard = async (flashcardId) => {
  const confirmed = window.confirm(
    "Are you sure you want to delete this flashcard?"
  );

  if (!confirmed) {
    return;
  }

  try {
    await deleteFlashcard(flashcardId);

    setFlashcards((previousCards) =>
      previousCards.filter(
        (card) => card.id !== flashcardId
      )
    );
  } catch (error) {
    console.error(
      "Failed to delete flashcard:",
      error
    );

    alert(
      error.response?.data?.message ||
        "Failed to delete flashcard. Please try again."
    );
  }
};

  // --------------------------------
  // Save Mistake
  // --------------------------------

  // const saveMistake = (mistake) => {
  //   setMistakes((previousMistakes) => [
  //     ...previousMistakes,
  //     mistake,
  //   ]);

  //   setModalType(null);
  // };

  const saveMistake = async (mistake) => {
  try {
    if (editingItem) {
      const updatedMistake = await updateMistake(
        editingItem.id,
        mistake
      );

      setMistakes((previousMistakes) =>
        previousMistakes.map((item) =>
          item.id === updatedMistake.id
            ? updatedMistake
            : item
        )
      );
    } else {
      const createdMistake = await createMistake(mistake);

      setMistakes((previousMistakes) => [
        ...previousMistakes,
        createdMistake,
      ]);
    }

    setModalType(null);
    setEditingItem(null);
  } catch (error) {
    console.error("Failed to save mistake:", error);

    alert(
      error.response?.data?.message ||
        "Failed to save mistake. Please try again."
    );
  }
};


const handleDeleteMistake = async (mistakeId) => {
  const confirmed = window.confirm(
    "Are you sure you want to delete this mistake?"
  );

  if (!confirmed) return;

  try {
    await deleteMistake(mistakeId);

    setMistakes((previousMistakes) =>
      previousMistakes.filter(
        (mistake) => mistake.id !== mistakeId
      )
    );
  } catch (error) {
    console.error("Failed to delete mistake:", error);

    alert(
      error.response?.data?.message ||
        "Failed to delete mistake. Please try again."
    );
  }
};


const handleEditMistake = (mistake) => {
  setEditingItem(mistake);
  setModalType("mistake");
};


const handleUpdateMistakeStatus = async (mistake) => {
  try {
    const updatedMistake = await updateMistake(
      mistake.id,
      {
        question: mistake.question,
        correctAnswer: mistake.correctAnswer,
        explanation: mistake.explanation,
        resolved: !mistake.resolved,
        topicId: mistake.topicId,
      }
    );

    setMistakes((previousMistakes) =>
      previousMistakes.map((item) =>
        item.id === updatedMistake.id
          ? updatedMistake
          : item
      )
    );
  } catch (error) {
    console.error(
      "Failed to update mistake status:",
      error
    );

    alert(
      error.response?.data?.message ||
        "Failed to update mistake status. Please try again."
    );
  }
};
  // --------------------------------
  // Save Task
  // --------------------------------

  // const saveTask = (task) => {
  //   setTasks((previousTasks) => [
  //     ...previousTasks,
  //     task,
  //   ]);

  //   setModalType(null);
  // };


  const saveTask = async (task) => {
  try {
    const taskData = {
      title: task.title,
      description: task.description || "",
      taskDate: task.taskDate || new Date().toISOString().split("T")[0],
      startTime: task.start || null,
      endTime: task.end || null,
      duration: Number(task.duration),
      completed: Boolean(task.completed),
      completedDate: task.completedDate || null,
      priority: task.priority || "Medium",
    };

    const createdTask = await createTask(taskData);

    const formattedTask = {
      ...createdTask,
      start: createdTask.startTime
        ? String(createdTask.startTime).slice(0, 5)
        : "",
      end: createdTask.endTime
        ? String(createdTask.endTime).slice(0, 5)
        : "",
    };

    setTasks((previousTasks) => [
      ...previousTasks,
      formattedTask,
    ]);

    setModalType(null);
    setEditingItem(null);
  } catch (error) {
    console.error("Failed to save task:", error);

    alert(
      error.response?.data?.message ||
      "Failed to save task. Please try again."
    );
  }
};

const handleUpdateTask = async (taskId, taskData) => {
  try {
    const updatedTask = await updateTask(taskId, taskData);

    const formattedTask = {
      ...updatedTask,
      start: updatedTask.startTime
        ? String(updatedTask.startTime).slice(0, 5)
        : "",
      end: updatedTask.endTime
        ? String(updatedTask.endTime).slice(0, 5)
        : "",
    };

    setTasks((previousTasks) =>
      previousTasks.map((task) =>
        task.id === updatedTask.id
          ? formattedTask
          : task
      )
    );

    return formattedTask;
  } catch (error) {
    console.error("Failed to update task:", error);

    alert(
      error.response?.data?.message ||
      "Failed to update task. Please try again."
    );

    throw error;
  }
};


const handleDeleteTask = async (taskId) => {
  const confirmed = window.confirm(
    "Are you sure you want to delete this task?"
  );

  if (!confirmed) return;

  try {
    await deleteTask(taskId);

    setTasks((previousTasks) =>
      previousTasks.filter((task) => task.id !== taskId)
    );
  } catch (error) {
    console.error("Failed to delete task:", error);

    alert(
      error.response?.data?.message ||
      "Failed to delete task. Please try again."
    );
  }
};
  // --------------------------------
  // Save Mock
  // --------------------------------

  // const saveMock = (mock) => {
  //   setMocks((previousMocks) => [
  //     ...previousMocks,
  //     mock,
  //   ]);

  //   setModalType(null);
  // };

  const saveMock = async (mock) => {
  try {
    const mockData = {
      name: mock.name,
      testDate: mock.date,
      score: Number(mock.score),
      accuracy: Number(mock.accuracy),
      percentile:
        mock.percentile === null ||
        mock.percentile === ""
          ? null
          : Number(mock.percentile),
    };

    const createdMock = await createMock(mockData);

    const formattedMock = {
      ...createdMock,
      date: createdMock.testDate,
      maxScore: 100,
    };

    setMocks((previousMocks) => [
      ...previousMocks,
      formattedMock,
    ]);

    setModalType(null);
    setEditingItem(null);
  } catch (error) {
    console.error("Failed to save mock:", error);

    alert(
      error.response?.data?.message ||
      "Failed to save mock result. Please try again."
    );
  }
};


const handleDeleteMock = async (mockId) => {
  const confirmed = window.confirm(
    "Are you sure you want to delete this mock result?"
  );

  if (!confirmed) return;

  try {
    await deleteMock(mockId);

    setMocks((previousMocks) =>
      previousMocks.filter((mock) => mock.id !== mockId)
    );
  } catch (error) {
    console.error("Failed to delete mock:", error);

    alert(
      error.response?.data?.message ||
      "Failed to delete mock result. Please try again."
    );
  }
};
  // --------------------------------
  // Render
  // --------------------------------

  if (!isAuthenticated) {
  return <Login />;
}

  return (
    <div className="app">

      {/* ================================
          HEADER
          ================================= */}

      <Header
       user={user}
        branch={branch}
        setBranch={handleBranchChange}
        setModalType={setModalType}
      />

      {/* ================================
          NAVIGATION
          ================================= */}

      <Navigation
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        revisionCount={revisionCount}
      />

      {/* ================================
          MAIN CONTENT
          ================================= */}

      <main className="main-content">

        {/* Dashboard */}

        {activeTab === "dashboard" && (
          <Dashboard
            studyLogs={studyLogs}
            dailyTargetHours={dailyTargetHours}
            targetExamDate={targetExamDate}
            overallProgress={overallProgress}
          />
        )}

        {/* Custom Syllabus */}

        {activeTab === "syllabus" && (
          <Syllabus
            branch={branch}
            //syllabusData={syllabusData}
           // setSyllabusData={setSyllabusData}
            backendSubjects={backendSubjects}
            backendTopics={backendTopics}
            setBackendSubjects={setBackendSubjects}
            backendRevisions={backendRevisions}
            setBackendRevisions={setBackendRevisions}
            onDeleteSubject={handleDeleteSubject}
            onDeleteTopic={handleDeleteTopic}
            setModalType={setModalType}
            revisions={revisions}
           setRevisions={setRevisions}
            setEditingItem={setEditingItem}
          />
        )}

        {/* Spaced Revision */}

        {activeTab === "revision" && (
          <Revision
            revisions={revisions}
            setRevisions={setRevisions}
           // syllabusData={syllabusData}
            //setSyllabusData={setSyllabusData}
            branch={branch}
            backendRevisions={backendRevisions}
            setBackendRevisions={setBackendRevisions}
            backendTopics={backendTopics}
          />
        )}

        {/* Formula Deck */}

        {activeTab === "flashcards" && (
          <Flashcards
            flashcards={flashcards}
           // setFlashcards={setFlashcards}
            setModalType={setModalType}
            onDeleteFlashcard={handleDeleteFlashcard}
            onEditFlashcard={(flashcard) => {
                    setEditingItem(flashcard);
                    setModalType("flashcard");
              }}
          />
        )}

        {/* Mistake Notebook */}

 {activeTab === "mistakes" && (
          // <Mistakes
          //   mistakes={mistakes}
          //   setMistakes={setMistakes}
          //   setModalType={setModalType}
          // />

<Mistakes
  mistakes={mistakes}
  setModalType={setModalType}
  onDeleteMistake={handleDeleteMistake}
  onEditMistake={handleEditMistake}
  onUpdateMistake={handleUpdateMistakeStatus}
/>
        )}

        {/* Daily Planner */}

        {activeTab === "planner" && (
          <Planner
            tasks={tasks}
            setTasks={setTasks}
            setModalType={setModalType}
            studyLogs={studyLogs}
            setStudyLogs={setStudyLogs}
            onUpdateTask={handleUpdateTask}
            onDeleteTask={handleDeleteTask}
            onSaveStudyLog={saveStudyLog}
          />
        )}

        {/* Mock Test Analytics */}

        {activeTab === "mocks" && (
          <Mocks
            mocks={mocks}
            setMocks={setMocks}
            setModalType={setModalType}
            onDeleteMock={handleDeleteMock}
          />
        )}

        {/* Focus Sound Room */}

        {activeTab === "focus" && (
  <FocusRoom
    onStudyComplete={async (hours) => {
      const today =
        new Date()
          .toISOString()
          .split("T")[0];

      const newTotalHours =
        (studyLogs[today] || 0) + hours;

      setStudyLogs((previousLogs) => ({
        ...previousLogs,
        [today]: newTotalHours,
      }));

      try {
        await saveStudyLog(
          today,
          newTotalHours
        );
      } catch (error) {
        console.error(
          "Failed to save Focus Room study log:",
          error
        );
      }
    }}
  />
)}



      </main>
     <Footer />
      {/* ================================
          MODALS
          ================================= */}

      {modalType === "settings" && (
        <SettingsModal
          dailyTargetHours={dailyTargetHours}
          setDailyTargetHours={
            setDailyTargetHours
          }
          onSaveDailyGoal={saveDailyGoal}
          targetExamDate={targetExamDate}
          setTargetExamDate={
            setTargetExamDate
          }
          onClose={() =>
            setModalType(null)
          }
        />
      )}

      {modalType === "subject" && (
        <SubjectModal
          subject={editingItem}
          onSave={saveSubject}
          onClose={() => {
            setModalType(null);
            setEditingItem(null);
          }}
        />
      )}

     {modalType === "topic" && (
  <TopicModal
    subject={
      editingItem?.subjectId
        ? backendSubjects.find(
            (subject) =>
              subject.id ===
              editingItem.subjectId
          )
        : editingItem
    }
    topic={
      editingItem?.subjectId
        ? editingItem
        : null
    }
    onSave={saveTopic}
    onClose={() => {
      setModalType(null);
      setEditingItem(null);
    }}
  />
)}
{modalType === "flashcard" && (
  <FlashcardModal
    flashcard={editingItem}
    onSave={saveFlashcard}
    onClose={() => {
      setModalType(null);
      setEditingItem(null);
    }}
    backendTopics={backendTopics}
  />
)}

{modalType === "mistake" && (
  <MistakeModal
    mistake={editingItem}
    backendTopics={backendTopics}
    onSave={saveMistake}
    onClose={() => {
      setModalType(null);
      setEditingItem(null);
    }}
  />
)}

      {modalType === "task" && (
        <TaskModal
          onSave={saveTask}
          onClose={() =>
            setModalType(null)
          }
        />
      )}

      {modalType === "mock" && (
        <MockModal
  onSave={saveMock}
  onClose={() => {
    setModalType(null);
    setEditingItem(null);
  }}
/>
      )}

    </div>
  );
}

export default App;