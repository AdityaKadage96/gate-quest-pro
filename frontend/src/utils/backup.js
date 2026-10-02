// // const STORAGE_KEYS = {
// //   flashcards: "gq_flashcards",
// //   mistakes: "gq_mistakes",
// //   tasks: "gq_tasks",
// //   revisions: "gq_revisions",
// //   mocks: "gq_mocks",
// //   dailyTarget: "gq_daily_target",
// //   logs: "gq_logs",
// // };

// // export const exportBackup = () => {
// //   const backupData = {};

// //   Object.entries(STORAGE_KEYS).forEach(
// //     ([name, key]) => {
// //       const value =
// //         localStorage.getItem(key);

// //       if (value !== null) {
// //         try {
// //           backupData[name] =
// //             JSON.parse(value);
// //         } catch {
// //           backupData[name] = value;
// //         }
// //       }
// //     }
// //   );

// //   const backup = {
// //     app: "GATE Quest Pro",
// //     version: "3.0",
// //     exportedAt:
// //       new Date().toISOString(),
// //     data: backupData,
// //   };

// //   const json = JSON.stringify(
// //     backup,
// //     null,
// //     2
// //   );

// //   const blob = new Blob(
// //     [json],
// //     {
// //       type: "application/json",
// //     }
// //   );

// //   const url =
// //     URL.createObjectURL(blob);

// //   const link =
// //     document.createElement("a");

// //   link.href = url;

// //   link.download =
// //     `gate-quest-pro-backup-${new Date()
// //       .toISOString()
// //       .split("T")[0]}.json`;

// //   document.body.appendChild(link);

// //   link.click();

// //   document.body.removeChild(link);

// //   URL.revokeObjectURL(url);
// // };


// // export const importBackup = (
// //   file
// // ) => {
// //   return new Promise(
// //     (resolve, reject) => {

// //       if (!file) {
// //         reject(
// //           new Error(
// //             "No backup file selected."
// //           )
// //         );

// //         return;
// //       }

// //       const reader =
// //         new FileReader();

// //       reader.onload = (event) => {

// //         try {

// //           const backup =
// //             JSON.parse(
// //               event.target.result
// //             );

// //           if (
// //             !backup ||
// //             backup.app !==
// //               "GATE Quest Pro"
// //           ) {
// //             throw new Error(
// //               "Invalid GATE Quest Pro backup file."
// //             );
// //           }

// //           if (
// //             !backup.data ||
// //             typeof backup.data !==
// //               "object"
// //           ) {
// //             throw new Error(
// //               "Backup data is missing."
// //             );
// //           }

// //           Object.entries(
// //             backup.data
// //           ).forEach(
// //             ([name, value]) => {

// //               const key =
// //                 STORAGE_KEYS[name];

// //               if (!key) {
// //                 return;
// //               }

// //               localStorage.setItem(
// //                 key,
// //                 JSON.stringify(value)
// //               );
// //             }
// //           );

// //           resolve(backup);

// //         } catch (error) {

// //           reject(error);

// //         }
// //       };

// //       reader.onerror = () => {
// //         reject(
// //           new Error(
// //             "Unable to read backup file."
// //           )
// //         );
// //       };

// //       reader.readAsText(file);
// //     }
// //   );
// // };


// // export const hardReset = () => {

// //   Object.values(
// //     STORAGE_KEYS
// //   ).forEach((key) => {
// //     localStorage.removeItem(key);
// //   });

// //   window.location.reload();
// // };


// //----------------------------------------------------------------

// import { getAllSubjects } from "../api/subjectApi";
// import { getAllTopics } from "../api/topicApi";
// import { getAllRevisions } from "../api/revisionApi";
// import {
//   getAllRevisionHistory,
// } from "../api/revisionHistoryApi";
// import {
//   getAllFlashcards,
// } from "../api/flashcardApi";
// import {
//   getAllMistakes,
// } from "../api/mistakeApi";
// import {
//   getAllTasks,
// } from "../api/taskApi";
// import {
//   getAllMocks,
// } from "../api/mockApi";
// import {
//   getAllStudyLogs,
// } from "../api/studyLogApi";
// import {
//   getAllGoals,
// } from "../api/goalApi";



export const exportBackup = async () => {
  throw new Error(
    "Backup export is temporarily unavailable while backend user ownership is being migrated."
  );
};

export const importBackup = async () => {
  throw new Error(
    "Backup import is temporarily unavailable while backend user ownership is being migrated."
  );
};

export const hardReset = async () => {
  throw new Error(
    "Hard reset is temporarily unavailable while backend user ownership is being migrated."
  );
};