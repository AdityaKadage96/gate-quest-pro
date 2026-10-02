// ======================================================
// GATE QUEST PRO
// INITIAL APPLICATION DATA
// ======================================================


// ======================================================
// 1. DEFAULT SYLLABUS
// ======================================================

export const DEFAULT_SYLLABUS = {

  CS: [

    {
      id: "cs-1",
      name: "Engineering Mathematics",
      weight: 13,

      topics: [

        {
          id: "math-1",
          name: "Discrete Mathematics & Graph Theory",

          lectures: false,
          pyq: false,
          notes: false,
          rev1: false,
          rev2: false,
        },

        {
          id: "math-2",
          name: "Linear Algebra & Calculus",

          lectures: false,
          pyq: false,
          notes: false,
          rev1: false,
          rev2: false,
        },

        {
          id: "math-3",
          name: "Probability & Statistics",

          lectures: false,
          pyq: false,
          notes: false,
          rev1: false,
          rev2: false,
        },

      ],
    },


    {
      id: "cs-2",
      name: "General Aptitude",
      weight: 15,

      topics: [

        {
          id: "apt-1",
          name: "Verbal & Quantitative Aptitude",

          lectures: false,
          pyq: false,
          notes: false,
          rev1: false,
          rev2: false,
        },

        {
          id: "apt-2",
          name: "Spatial & Analytical Ability",

          lectures: false,
          pyq: false,
          notes: false,
          rev1: false,
          rev2: false,
        },

      ],
    },


    {
      id: "cs-3",
      name: "Data Structures & Algorithms",
      weight: 14,

      topics: [

        {
          id: "dsa-1",
          name: "Arrays, Stacks, Queues & Trees",

          lectures: false,
          pyq: false,
          notes: false,
          rev1: false,
          rev2: false,
        },

        {
          id: "dsa-2",
          name: "Asymptotic Analysis & Dynamic Programming",

          lectures: false,
          pyq: false,
          notes: false,
          rev1: false,
          rev2: false,
        },

        {
          id: "dsa-3",
          name: "Graph Algorithms & Sorting",

          lectures: false,
          pyq: false,
          notes: false,
          rev1: false,
          rev2: false,
        },

      ],
    },


    {
      id: "cs-4",
      name: "Operating Systems",
      weight: 10,

      topics: [

        {
          id: "os-1",
          name: "Processes, Threads & CPU Scheduling",

          lectures: false,
          pyq: false,
          notes: false,
          rev1: false,
          rev2: false,
        },

        {
          id: "os-2",
          name: "Deadlocks & Memory Management",

          lectures: false,
          pyq: false,
          notes: false,
          rev1: false,
          rev2: false,
        },

      ],
    },


    {
      id: "cs-5",
      name: "Computer Networks",
      weight: 10,

      topics: [

        {
          id: "cn-1",
          name: "Data Link & Flow Control",

          lectures: false,
          pyq: false,
          notes: false,
          rev1: false,
          rev2: false,
        },

        {
          id: "cn-2",
          name: "Network Layer & Routing",

          lectures: false,
          pyq: false,
          notes: false,
          rev1: false,
          rev2: false,
        },

        {
          id: "cn-3",
          name: "Transport & Application Layer",

          lectures: false,
          pyq: false,
          notes: false,
          rev1: false,
          rev2: false,
        },

      ],
    },


    {
      id: "cs-6",
      name: "Database Management Systems",
      weight: 8,

      topics: [

        {
          id: "dbms-1",
          name: "ER Model & Relational Model",

          lectures: false,
          pyq: false,
          notes: false,
          rev1: false,
          rev2: false,
        },

        {
          id: "dbms-2",
          name: "SQL & Relational Algebra",

          lectures: false,
          pyq: false,
          notes: false,
          rev1: false,
          rev2: false,
        },

        {
          id: "dbms-3",
          name: "Transactions & Concurrency",

          lectures: false,
          pyq: false,
          notes: false,
          rev1: false,
          rev2: false,
        },

      ],
    },


    {
      id: "cs-7",
      name: "Theory of Computation",
      weight: 9,

      topics: [

        {
          id: "toc-1",
          name: "Finite Automata & Regular Languages",

          lectures: false,
          pyq: false,
          notes: false,
          rev1: false,
          rev2: false,
        },

        {
          id: "toc-2",
          name: "Context-Free Grammars & Pushdown Automata",

          lectures: false,
          pyq: false,
          notes: false,
          rev1: false,
          rev2: false,
        },

      ],
    },


    {
      id: "cs-8",
      name: "Compiler Design",
      weight: 6,

      topics: [

        {
          id: "cd-1",
          name: "Lexical Analysis & Parsing",

          lectures: false,
          pyq: false,
          notes: false,
          rev1: false,
          rev2: false,
        },

        {
          id: "cd-2",
          name: "Syntax Directed Translation",

          lectures: false,
          pyq: false,
          notes: false,
          rev1: false,
          rev2: false,
        },

      ],
    },


    {
      id: "cs-9",
      name: "Computer Organization & Architecture",
      weight: 11,

      topics: [

        {
          id: "coa-1",
          name: "Instruction Pipeline & Hazards",

          lectures: false,
          pyq: false,
          notes: false,
          rev1: false,
          rev2: false,
        },

        {
          id: "coa-2",
          name: "Memory Hierarchy & Cache",

          lectures: false,
          pyq: false,
          notes: false,
          rev1: false,
          rev2: false,
        },

      ],
    },


    {
      id: "cs-10",
      name: "Digital Logic",
      weight: 5,

      topics: [

        {
          id: "dl-1",
          name: "Boolean Algebra & Logic Gates",

          lectures: false,
          pyq: false,
          notes: false,
          rev1: false,
          rev2: false,
        },

        {
          id: "dl-2",
          name: "Combinational & Sequential Circuits",

          lectures: false,
          pyq: false,
          notes: false,
          rev1: false,
          rev2: false,
        },

      ],
    },

  ],


  // ====================================================
  // ECE
  // ====================================================

  ECE: [],


  // ====================================================
  // ELECTRICAL
  // ====================================================

  EE: [],


  // ====================================================
  // MECHANICAL
  // ====================================================

  ME: [],


  // ====================================================
  // CIVIL
  // ====================================================

  CE: [],

};


// ======================================================
// 2. INITIAL FLASHCARDS
// ======================================================

export const INITIAL_FLASHCARDS = [

  {
    id: "fc1",
    subject: "Operating Systems",

    front: "What is Belady's Anomaly?",

    back:
      "In FIFO page replacement, increasing the number of page frames can sometimes increase the number of page faults.",

    mastered: false,
  },

];


// ======================================================
// 3. INITIAL MISTAKES
// ======================================================

export const INITIAL_MISTAKES = [

  {
    id: "m1",

    subject: "Operating Systems",

    topic: "Semaphores & Mutex",

    description:
      "Forgot to increment Signal(S) inside error handler loop, leading to deadlock in calculation.",

    errorType: "Silly Error",

    reviewed: false,
  },


  {
    id: "m2",

    subject: "Theory of Computation",

    topic:
      "Closure Properties of Regular Languages",

    description:
      "Assumed intersection of Context-Free Language and Regular Language is CFL (Correct), but thought intersection of 2 CFLs is always CFL (Wrong, not closed under intersection!).",

    errorType: "Conceptual",

    reviewed: true,
  },

];


// ======================================================
// 4. INITIAL TASKS
// ======================================================

export const INITIAL_TASKS = [

  {
    id: "t1",

    title:
      "Complete Dynamic Programming PYQs (2018-2024)",

    time:
      "09:00 AM - 11:30 AM",

    duration: 2.5,

    completed: true,
  },


  {
    id: "t2",

    title:
      "Revise B+ Tree Node Capacity Formulas",

    time:
      "02:00 PM - 03:30 PM",

    duration: 1.5,

    completed: false,
  },


  {
    id: "t3",

    title:
      "Attempt 30-min Sectional Mock on Computer Networks",

    time:
      "06:00 PM - 07:00 PM",

    duration: 1,

    completed: false,
  },

];


// ======================================================
// 5. INITIAL SPACED REVISION
// ======================================================

// export const INITIAL_REVISIONS = [

//   {
//     id: "r1",

//     topic:
//       "Pipelining & Structural Hazards",

//     subject: "COA",

//     interval: 7,

//     nextDueDate:
//       new Date().toISOString().split("T")[0],

//     completed: false,
//   },


//   {
//     id: "r2",

//     topic:
//       "Context-Free Grammars & Ambiguity",

//     subject: "TOC",

//     interval: 14,

//     nextDueDate: "2026-09-28",

//     completed: false,
//   },

// ];


export const INITIAL_REVISIONS = [
  {
    id: "r1",
    topic: "Pipelining & Structural Hazards",
    subject: "COA",
    interval: 7,
    revisionStage: "rev1",
    nextDueDate:
      new Date().toISOString().split("T")[0],
    completed: false,
    reviewCount: 0,
    reviewHistory: [],
  },

  {
    id: "r2",
    topic: "Context-Free Grammars & Ambiguity",
    subject: "TOC",
    interval: 14,
    revisionStage: "rev2",
    nextDueDate: "2026-09-28",
    completed: false,
    reviewCount: 0,
    reviewHistory: [],
  },
];

// ======================================================
// 6. INITIAL MOCK TESTS
// ======================================================

export const INITIAL_MOCKS = [

  {
    id: "mk1",

    date: "2026-09-10",

    name:
      "Made Easy Full Mock 1",

    score: 58.5,

    maxScore: 100,

    rank: 342,

    totalCandidates: 12500,
  },


  {
    id: "mk2",

    date: "2026-09-18",

    name:
      "Ace Academy Full Mock 2",

    score: 67,

    maxScore: 100,

    rank: 180,

    totalCandidates: 14200,
  },

];