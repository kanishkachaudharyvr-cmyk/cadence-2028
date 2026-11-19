import { TrackId, HorizonId } from '../types/roadmap';

export interface TopicTemplate {
  title: string;
  subtasks: string[];
  channel: string;
  query: string;
  priority: 'critical' | 'high' | 'normal';
  horizonAffiliation?: HorizonId | 'all';
}

export const SYLLABUS_BANK: Record<TrackId, TopicTemplate[]> = {
  dsa: [
    {
      title: "Step 0 — Language Basics, Data Types & Memory Layout",
      subtasks: [
        "Review primitive data types, memory limits, and type casting",
        "Implement basic I/O speed optimizations in C++/Java/Python",
        "Solve 3 introductory warm-up problems on conditionals and loops"
      ],
      channel: "take U forward (Striver)",
      query: "Striver A-Z Step 1 C++ Java Basics",
      priority: "critical",
      horizonAffiliation: "h1"
    },
    {
      title: "Step 1.1 — Asymptotic Notation & Time/Space Complexity",
      subtasks: [
        "Calculate Big-O, Big-Theta, and Big-Omega for nested loops",
        "Understand constant O(1), logarithmic O(log N), and linear O(N) constraints",
        "Analyze auxiliary space vs input space complexity with examples"
      ],
      channel: "take U forward (Striver)",
      query: "Time complexity analysis Striver A2Z",
      priority: "critical",
      horizonAffiliation: "h1"
    },
    {
      title: "Step 1.2 — Basic Mathematics for Problem Solving",
      subtasks: [
        "Implement Count Digits, Reverse a Number, and Check Palindrome",
        "Derive Euclidean Algorithm for GCD / HCF in O(log(min(a,b)))",
        "Check Armstrong Number and Print all Divisors in O(sqrt(N))"
      ],
      channel: "take U forward (Striver)",
      query: "Basic Maths for DSA Striver A-Z",
      priority: "high",
      horizonAffiliation: "h1"
    },
    {
      title: "Step 1.3 — Basic Recursion & Recursion Tree Foundations",
      subtasks: [
        "Trace Call Stack and Base Conditions for recursive functions",
        "Print 1 to N, N to 1, and compute Factorial using Parameterized vs Functional Recursion",
        "Reverse an array and check String Palindrome using 2-pointer recursion"
      ],
      channel: "take U forward (Striver)",
      query: "Basic Recursion Striver A-Z DSA",
      priority: "critical",
      horizonAffiliation: "h1"
    },
    {
      title: "Step 1.4 — Basic Hashing & Frequency Counting",
      subtasks: [
        "Implement Frequency Array for integer and character counts",
        "Understand Hash Table collisions (Chaining vs Open Addressing)",
        "Find the Highest and Lowest Frequency elements in an array"
      ],
      channel: "take U forward (Striver)",
      query: "Basic Hashing Striver A-Z sheet",
      priority: "high",
      horizonAffiliation: "h1"
    },
    {
      title: "Step 2.1 — Elementary Sorting: Selection, Bubble & Insertion Sort",
      subtasks: [
        "Implement Selection Sort (find min element and swap)",
        "Implement Bubble Sort with early exit optimization for sorted arrays",
        "Implement Insertion Sort and analyze best/worst case runtimes"
      ],
      channel: "Kunal Kushwaha",
      query: "Sorting algorithms Kunal Kushwaha bubble selection insertion",
      priority: "high",
      horizonAffiliation: "h1"
    },
    {
      title: "Step 2.2 — Divide & Conquer Sorting: Merge Sort & Quick Sort",
      subtasks: [
        "Implement Recursive Merge Sort and analyze O(N log N) time & O(N) space",
        "Implement Quick Sort with Lomuto or Hoare Partition scheme",
        "Trace recursion depth and worst-case O(N²) avoidance using randomized pivot"
      ],
      channel: "take U forward (Striver)",
      query: "Merge sort Quick sort Striver A-Z",
      priority: "critical",
      horizonAffiliation: "h1"
    },
    {
      title: "Step 3.1 — Arrays Easy: Fundamentals & Traversal Patterns",
      subtasks: [
        "Find Largest and Second Largest element without full sorting",
        "Check if array is sorted and remove duplicates in-place (LeetCode #26)",
        "Left rotate array by 1 place and by K places (Reversal Algorithm)"
      ],
      channel: "take U forward (Striver)",
      query: "Arrays Easy problems Striver A-Z",
      priority: "critical",
      horizonAffiliation: "h1"
    },
    {
      title: "Step 3.1 — Arrays Easy: In-Place Moves & Linear Search",
      subtasks: [
        "Move all Zeroes to the end while maintaining relative order (LeetCode #283)",
        "Find Union and Intersection of two sorted arrays",
        "Find Missing Number in array (Sum formula vs XOR approach)"
      ],
      channel: "take U forward (Striver)",
      query: "Move zeroes missing number Striver",
      priority: "high",
      horizonAffiliation: "h1"
    },
    {
      title: "Step 3.2 — Arrays Medium: Two Pointers & Dutch National Flag",
      subtasks: [
        "Solve Two Sum problem using Hash Map in O(N) and 2-pointers in O(N log N)",
        "Implement Dutch National Flag 3-pointer algorithm for Sort Colors (#75)",
        "Find Majority Element (> N/2) using Moore's Voting Algorithm (#169)"
      ],
      channel: "take U forward (Striver)",
      query: "Two Sum Sort Colors Moore Voting Striver",
      priority: "critical",
      horizonAffiliation: "h1"
    },
    {
      title: "Step 3.2 — Arrays Medium: Kadane's Algorithm & Subarrays",
      subtasks: [
        "Derive Kadane's Algorithm for Maximum Subarray Sum (LeetCode #53)",
        "Print starting and ending indices of the max subarray",
        "Solve Best Time to Buy and Sell Stock I (LeetCode #121)"
      ],
      channel: "take U forward (Striver)",
      query: "Kadane algorithm Best time buy sell stock Striver",
      priority: "critical",
      horizonAffiliation: "h1"
    },
    {
      title: "Step 4.1 — Binary Search 1D: Lower Bound & Rotated Arrays",
      subtasks: [
        "Implement Lower Bound and Upper Bound without STL functions",
        "Search in Rotated Sorted Array I and II (LeetCode #33, #81)",
        "Find Minimum in Rotated Sorted Array (LeetCode #153)"
      ],
      channel: "take U forward (Striver)",
      query: "Binary search rotated sorted array Striver",
      priority: "critical",
      horizonAffiliation: "h1"
    },
    {
      title: "Step 4.2 — Binary Search on Answers: Min-Max Optimization",
      subtasks: [
        "Identify monotonic search space condition for binary search on answers",
        "Solve Aggressive Cows (Min distance maximized)",
        "Solve Book Allocation and Painter's Partition problem"
      ],
      channel: "take U forward (Striver)",
      query: "Aggressive cows book allocation Striver",
      priority: "critical",
      horizonAffiliation: "h1"
    },
    {
      title: "Step 5 — Linked Lists: Singly & Doubly Linked List Foundations",
      subtasks: [
        "Implement Singly Linked List insertion, deletion, and traversal from scratch",
        "Reverse a Linked List iteratively and recursively (LeetCode #206)",
        "Detect cycle in Linked List using Floyd's Tortoise and Hare (LeetCode #141)"
      ],
      channel: "Apna College",
      query: "Linked list reverse detect cycle Apna College",
      priority: "high",
      horizonAffiliation: "h1"
    },
    {
      title: "Step 6 — Trees: Binary Tree Traversals & Depth Calculation",
      subtasks: [
        "Iterative Preorder, Inorder, and Postorder using explicit stack",
        "Compute Maximum Depth of Binary Tree and Check Balanced Tree (#104, #110)",
        "Calculate Diameter of Binary Tree in O(N) single pass (#543)"
      ],
      channel: "take U forward (Striver)",
      query: "Binary tree traversals diameter Striver",
      priority: "critical",
      horizonAffiliation: "h1"
    },
    {
      title: "Step 7 — Dynamic Programming: 1D DP & Subproblem Memoization",
      subtasks: [
        "Climbing Stairs and Frog Jump with memoization and tabulation",
        "House Robber I & II with circular array consideration",
        "Optimize space complexity from O(N) to O(1) state variables"
      ],
      channel: "take U forward (Striver)",
      query: "Dynamic programming 1D frog jump Striver",
      priority: "critical",
      horizonAffiliation: "h2"
    },
    {
      title: "Step 8 — Graphs: BFS, DFS & Cycle Detection",
      subtasks: [
        "Implement Adjacency List representation of Graphs",
        "Execute BFS and DFS traversals with visited array",
        "Detect cycles in Directed Graph using Kahn's Algorithm (Topological Sort)"
      ],
      channel: "take U forward (Striver)",
      query: "Graph BFS DFS topological sort Striver",
      priority: "critical",
      horizonAffiliation: "h2"
    },
  ],

  github: [
    {
      title: "Step 0 — Terminal & Command Line Navigation Basics",
      subtasks: [
        "Learn core terminal commands: pwd, ls, cd, mkdir, touch, cat, echo",
        "Understand environment variables ($PATH, $HOME) and shell aliases",
        "Set up modern shell prompt (PowerShell / Zsh) with clean directory display"
      ],
      channel: "ThePrimeagen",
      query: "Terminal commands basics for developers",
      priority: "critical",
      horizonAffiliation: "h1"
    },
    {
      title: "Step 1 — Git Installation, SSH Keys & Global Configuration",
      subtasks: [
        "Configure `git config --global user.name` and `user.email`",
        "Generate Ed25519 SSH Key and upload public key to GitHub account",
        "Verify SSH connection to GitHub via `ssh -T git@github.com`"
      ],
      channel: "Web Dev Simplified",
      query: "Git setup SSH keys GitHub Web Dev Simplified",
      priority: "critical",
      horizonAffiliation: "h1"
    },
    {
      title: "Step 2 — Initializing Your First Repository: Init, Add & Commit",
      subtasks: [
        "Initialize new local repo with `git init` and inspect hidden `.git` folder",
        "Understand Working Directory vs Staging Area (Index) vs Commit History",
        "Stage files with `git add` and craft clean descriptive commit messages"
      ],
      channel: "Kunal Kushwaha",
      query: "Git init add commit tutorial Kunal Kushwaha",
      priority: "critical",
      horizonAffiliation: "h1"
    },
    {
      title: "Step 3 — Remote Repositories: Push, Pull & README Markdown",
      subtasks: [
        "Link local repo to GitHub via `git remote add origin <url>`",
        "Rename default branch to `main` and execute initial `git push -u origin main`",
        "Write formatted README.md with headings, code blocks, and project badges"
      ],
      channel: "Web Dev Simplified",
      query: "Git remote push pull README markdown",
      priority: "high",
      horizonAffiliation: "h1"
    },
    {
      title: "Step 4 — Git Status, Diff, Log & Crafting .gitignore",
      subtasks: [
        "Inspect repository states using `git status` and `git diff`",
        "View formatted commit tree using `git log --oneline --graph --decorate`",
        "Author `.gitignore` preventing node_modules, build outputs, and `.env` leaks"
      ],
      channel: "Fireship",
      query: "Git status log gitignore Fireship",
      priority: "high",
      horizonAffiliation: "h1"
    },
    {
      title: "Step 5 — Git Branching, Switching & Fast-Forward Merging",
      subtasks: [
        "Create and switch to feature branches using `git switch -c feature/xyz`",
        "Commit feature changes in isolation from the main branch",
        "Merge feature branch into main with `git merge` and clean branch cleanup"
      ],
      channel: "ThePrimeagen",
      query: "Git branching merging fast forward Primeagen",
      priority: "critical",
      horizonAffiliation: "h1"
    },
    {
      title: "Step 6 — Resolving Merge Conflicts & Undoing Changes",
      subtasks: [
        "Simulate and inspect merge conflict markers `<<<<<<<`, `=======`, `>>>>>>>`",
        "Resolve conflict manually in VS Code / Editor and finalize merge commit",
        "Learn `git restore`, `git stash`, and `git revert` for safe rollbacks"
      ],
      channel: "Web Dev Simplified",
      query: "How to resolve git merge conflicts Web Dev Simplified",
      priority: "critical",
      horizonAffiliation: "h1"
    },
    {
      title: "Step 7 — GitHub Actions: Automated CI Verification",
      subtasks: [
        "Create `.github/workflows/ci.yml` running linter and tests on push",
        "Configure branch protection rules requiring passing CI checks",
        "Verify automated build runs on GitHub Actions tab"
      ],
      channel: "Fireship",
      query: "GitHub Actions CI CD in 100 seconds",
      priority: "high",
      horizonAffiliation: "h2"
    },
  ],

  uni: [
    {
      title: "Sem 5 — Orientation & Course Blueprint (CNS, AI, ADS, Microcontrollers)",
      subtasks: [
        "Review Mumbai University IT Sem 5 syllabus scheme and credit distribution",
        "Download past 5 years question papers from MU exam repository",
        "Set up subject notebooks and practical laboratory folders"
      ],
      channel: "GATE Smashers (Varun Singla)",
      query: "Engineering university exam preparation strategy Gate Smashers",
      priority: "high",
      horizonAffiliation: "h1"
    },
    {
      title: "Sem 5 — Computer Network Security: Security Goals & CIA Triad",
      subtasks: [
        "Define Confidentiality, Integrity, Availability (CIA Triad) with IT examples",
        "Differentiate Passive vs Active Attacks (Eavesdropping, Masquerade, Replay, DoS)",
        "Analyze OSI Security Architecture (X.800 services and mechanisms)"
      ],
      channel: "GATE Smashers (Varun Singla)",
      query: "Network security CIA triad active passive attacks Gate Smashers",
      priority: "critical",
      horizonAffiliation: "h1"
    },
    {
      title: "Sem 5 — CNS: Classical Ciphers & Cryptanalysis Basics",
      subtasks: [
        "Solve Substitution Ciphers: Caesar Cipher, Monoalphabetic & Playfair Cipher (5x5 matrix)",
        "Implement Polyalphabetic Vigenere Cipher and Transposition Rail Fence Cipher",
        "Explain frequency analysis cryptanalysis on classical ciphers"
      ],
      channel: "Knowledge Gate",
      query: "Classical encryption techniques Playfair Hill cipher Knowledge Gate",
      priority: "critical",
      horizonAffiliation: "h1"
    },
    {
      title: "Sem 5 — Artificial Intelligence: Introduction & Intelligent Agents",
      subtasks: [
        "Explore AI definitions, Turing Test, and cognitive modeling approaches",
        "Analyze PEAS framework (Performance, Environment, Actuators, Sensors) for smart systems",
        "Classify Environment Types: Fully vs Partially Observable, Deterministic vs Stochastic"
      ],
      channel: "Knowledge Gate",
      query: "AI PEAS framework environment types Knowledge Gate",
      priority: "high",
      horizonAffiliation: "h1"
    },
    {
      title: "Sem 5 — Advanced Data Structures: Recurrences & Asymptotic Analysis",
      subtasks: [
        "Solve recurrence relations using Master Theorem (all 3 cases)",
        "Apply Substitution Method and Recursion Tree Method to algorithm runtimes",
        "Compare Amortized Cost analysis (Accounting method vs Potential method)"
      ],
      channel: "Neso Academy",
      query: "Master theorem recurrence relations Neso Academy",
      priority: "high",
      horizonAffiliation: "h1"
    },
    {
      title: "Sem 5 — CNS: Modern Block Ciphers & DES Architecture",
      subtasks: [
        "Understand Feistel Cipher design principles and round transformations",
        "Trace Data Encryption Standard (DES) 16-round architecture and 56-bit key issue",
        "Explain Triple DES (3DES) and why Double DES is vulnerable to Meet-in-the-Middle"
      ],
      channel: "GATE Smashers (Varun Singla)",
      query: "DES algorithm Feistel cipher Gate Smashers",
      priority: "critical",
      horizonAffiliation: "h1"
    },
    {
      title: "Sem 5 — AI: Uninformed Search Strategies (BFS, DFS, UCS)",
      subtasks: [
        "Compare Breadth-First Search (BFS) and Depth-First Search (DFS) completeness and optimality",
        "Implement Uniform Cost Search (Dijkstra variant for AI search spaces)",
        "Solve Mumbai Univ 10-marker numerical problems on Water Jug / 8-Puzzle"
      ],
      channel: "Knowledge Gate",
      query: "Uninformed search BFS DFS UCS Knowledge Gate",
      priority: "high",
      horizonAffiliation: "h1"
    },
  ],

  gate: [
    {
      title: "GATE Level 0 — Exam Architecture, Virtual Calculator & Marking Matrix",
      subtasks: [
        "Deconstruct GATE CS & DA syllabus weightages and qualifying cutoff trends",
        "Practice using the official GATE Virtual Calculator for trigonometric and logarithmic keys",
        "Analyze marking penalty rules (+1/-0.33, +2/-0.66, and zero penalty on MSQ/NAT)"
      ],
      channel: "",
      query: "",
      priority: "critical",
      horizonAffiliation: "h1"
    },
    {
      title: "Discrete Math 1.1 — Propositional Logic Syntax & Connectives",
      subtasks: [
        "Define Atomic and Compound propositions with truth value assignments",
        "Master logical connectives: Negation (¬), Conjunction (∧), Disjunction (∨)",
        "Analyze Conditional (p → q) and Biconditional (p ↔ q) truth conditions"
      ],
      channel: "",
      query: "",
      priority: "critical",
      horizonAffiliation: "h1"
    },
    {
      title: "Discrete Math 1.2 — Truth Tables, Tautology & Equivalence",
      subtasks: [
        "Construct truth tables to verify Tautology, Contradiction, and Contingency",
        "Apply De Morgan's laws, Distributive laws, and Absorption laws",
        "Differentiate Converse, Inverse, and Contrapositive of implications"
      ],
      channel: "",
      query: "",
      priority: "critical",
      horizonAffiliation: "h1"
    },
    {
      title: "Discrete Math 1.3 — Predicate Logic & Quantifiers",
      subtasks: [
        "Translate natural English sentences into First-Order Predicate Logic",
        "Apply Universal Quantifier (∀) and Existential Quantifier (∃)",
        "Solve 8 GATE PYQs on quantifier negations and scope rules"
      ],
      channel: "",
      query: "",
      priority: "critical",
      horizonAffiliation: "h1"
    },
    {
      title: "Engg Math 2.1 — Set Theory: Operations, Cartesian Products & Cardinality",
      subtasks: [
        "Review Union, Intersection, Difference, and Symmetric Difference of sets",
        "Calculate Cartesian Products and subsets of Power Sets P(S)",
        "Apply Principle of Inclusion-Exclusion (PIE) for 2 and 3 sets"
      ],
      channel: "",
      query: "",
      priority: "high",
      horizonAffiliation: "h1"
    },
    {
      title: "Linear Algebra 1.1 — Matrices, Determinants & Elementary Row Operations",
      subtasks: [
        "Compute determinants of 2x2 and 3x3 matrices using cofactor expansion",
        "Apply Elementary Row Operations (Gaussian Elimination) to reach Row Echelon Form",
        "Determine the Rank of a Matrix from non-zero rows in echelon form"
      ],
      channel: "",
      query: "",
      priority: "critical",
      horizonAffiliation: "h1"
    },
    {
      title: "Probability 1.1 — Sample Space, Axioms & Conditional Probability",
      subtasks: [
        "Define Sample Space, Mutually Exclusive events, and Independent events",
        "Understand Kolmogorov's Probability Axioms and Addition theorem",
        "Apply Conditional Probability formula P(A|B) = P(A ∩ B) / P(B)"
      ],
      channel: "",
      query: "",
      priority: "critical",
      horizonAffiliation: "h1"
    },
    {
      title: "Theory of Computation 1.1 — Alphabets, Strings & Formal Languages",
      subtasks: [
        "Define Alphabet (Σ), String length, Empty string (ε), and Substrings",
        "Understand String Concatenation and Kleene Star (Σ*) vs Positive Closure (Σ+)",
        "Formalize the definition of Language as a subset of Σ*"
      ],
      channel: "",
      query: "",
      priority: "critical",
      horizonAffiliation: "h1"
    },
  ],

  afcat: [
    {
      title: "AFCAT Level 0 — Exam Pattern, Marking Scheme & IAF Branch Eligibility",
      subtasks: [
        "Review AFCAT 300-mark format (100 questions in 120 mins: +3 for correct, -1 for wrong)",
        "Verify Flying Branch, Technical Ground Duty, and Non-Technical Ground Duty cutoffs",
        "Audit syllabus segments: Verbal Ability (30), GA (25), Numerical (20), Reasoning (25)"
      ],
      channel: "",
      query: "",
      priority: "critical",
      horizonAffiliation: "h1"
    },
    {
      title: "AFCAT GA 1.1 — Indian Air Force Commands, Motto & Organization",
      subtasks: [
        "Memorize IAF Motto ('Touch the sky with Glory' from Gita Chapter 11)",
        "Map 7 IAF Commands and their HQ locations (Western, Eastern, Central, SW, Southern, Training, Maintenance)",
        "Learn hierarchy of Commissioned Officer Ranks from Flying Officer to Air Chief Marshal"
      ],
      channel: "",
      query: "",
      priority: "high",
      horizonAffiliation: "h1"
    },
    {
      title: "AFCAT Math 1.1 — Calculation Speed, Squares, Cubes & Fraction Tables",
      subtasks: [
        "Memorize squares from 1 to 50 and cubes from 1 to 30 for rapid mental calculation",
        "Learn fraction-to-percentage conversions (1/1 to 1/20) for instant arithmetic calculations",
        "Practice 20 mental calculation problems on multiplication by 11, 25, and 125"
      ],
      channel: "",
      query: "",
      priority: "critical",
      horizonAffiliation: "h1"
    },
    {
      title: "AFCAT English 1.1 — Parts of Speech & Subject-Verb Agreement Fundamentals",
      subtasks: [
        "Review core grammar: Singular vs Plural subjects, Collective nouns, and Compound subjects",
        "Analyze rules for 'Neither...nor', 'Either...or', 'Not only...but also'",
        "Solve 25 spotting-the-error questions from previous AFCAT papers"
      ],
      channel: "",
      query: "",
      priority: "high",
      horizonAffiliation: "h1"
    },
    {
      title: "AFCAT Reasoning 1.1 — Verbal Analogy & Classification",
      subtasks: [
        "Master Word Analogy types (Synonym/Antonym, Worker-Tool, Cause-Effect, Unit-Quantity)",
        "Solve 30 Odd-One-Out classification questions",
        "Identify high-frequency vocabulary words commonly tested in AFCAT analogy sets"
      ],
      channel: "",
      query: "",
      priority: "high",
      horizonAffiliation: "h1"
    },
    {
      title: "AFCAT GA 1.2 — Historical Milestones of Indian Armed Forces",
      subtasks: [
        "Study major operations: Operation Vijay (1961 & 1999), Operation Meghdoot (1984), Operation Safed Sagar (1999)",
        "Learn gallantry awards hierarchy: Param Vir Chakra, Maha Vir Chakra, Vir Chakra",
        "Note the role and organizational structure of the Chief of Defence Staff (CDS)"
      ],
      channel: "",
      query: "",
      priority: "high",
      horizonAffiliation: "h1"
    },
    {
      title: "AFCAT Reasoning 1.2 — Non-Verbal Series & Rotation Patterns",
      subtasks: [
        "Master figure series element movement (Clockwise vs Anticlockwise 45°, 90°, 180°)",
        "Analyze addition and deletion of elements across 5-figure problem sets",
        "Solve 25 AFCAT non-verbal figure series questions within 15 minutes"
      ],
      channel: "",
      query: "",
      priority: "critical",
      horizonAffiliation: "h1"
    },
  ],

  cat: [
    {
      title: "CAT Level 0 — Exam Structure, Sectional Timers & IIM Percentile Blueprint",
      subtasks: [
        "Understand CAT 3-section structure: VARC (40m), DILR (40m), QA (40m) with zero cross-section navigation",
        "Analyze IIM percentile conversion curves (99%ile vs raw scores of 75-80 marks)",
        "Set up an error logging journal to document every practice mistake"
      ],
      channel: "",
      query: "",
      priority: "critical",
      horizonAffiliation: "h1"
    },
    {
      title: "CAT QA 1.1 — Speed Math, Multipliers & Reciprocal Tables",
      subtasks: [
        "Commit reciprocal table to memory: 1/1 to 1/25 with decimal and percentage values",
        "Master percentage multiplier technique (e.g. 23% increase = x 1.23, 15% decrease = x 0.85)",
        "Solve 25 split-and-merge arithmetic speed drills in under 15 minutes"
      ],
      channel: "",
      query: "",
      priority: "critical",
      horizonAffiliation: "h1"
    },
    {
      title: "CAT QA 1.2 — Number Systems: Classification & Divisibility Rules",
      subtasks: [
        "Classify Real, Rational, Irrational, Integers, Whole, and Natural numbers",
        "Master divisibility tests for 2, 3, 4, 5, 7, 8, 9, 11, 13, and composite co-prime factors",
        "Solve 10 foundational CAT questions on finding unit digits and remaining divisors"
      ],
      channel: "",
      query: "",
      priority: "high",
      horizonAffiliation: "h1"
    },
    {
      title: "CAT VARC 1.1 — Editorial Habit Cultivation & Active Reading",
      subtasks: [
        "Read 1 long-form essay from Aeon / The Economist / Project Syndicate",
        "Summarize the author's primary argument in exactly 2 sentences",
        "Highlight unfamiliar vocabulary and analyze meaning from surrounding context"
      ],
      channel: "",
      query: "",
      priority: "critical",
      horizonAffiliation: "h1"
    },
    {
      title: "CAT DILR 1.1 — Constraint Matrix Setup & Tabular Modeling",
      subtasks: [
        "Learn to construct clean 2x2 and 3x3 attribute matching grids",
        "Convert vague textual clues into precise algebraic inequalities and cross marks",
        "Solve 2 introductory 4-variable arrangement sets without looking at explanations"
      ],
      channel: "",
      query: "",
      priority: "critical",
      horizonAffiliation: "h1"
    },
    {
      title: "CAT QA 1.3 — Percentages, Base Changes & Successive Calculations",
      subtasks: [
        "Master percentage base change rules (If A is x% more than B, how much is B less than A?)",
        "Formulate Price x Consumption = Total Expenditure problems",
        "Solve 15 CAT Level 1 percentage problems from past original papers"
      ],
      channel: "",
      query: "",
      priority: "critical",
      horizonAffiliation: "h1"
    },
    {
      title: "CAT VARC 1.2 — Dissecting Main Idea vs Supporting Premises",
      subtasks: [
        "Differentiate central thesis from illustrative anecdotes and empirical citations",
        "Identify shift indicators: 'However', 'Nevertheless', 'On the contrary'",
        "Practice 2 CAT Reading Comprehension passages answering 'Primary Purpose' questions"
      ],
      channel: "",
      query: "",
      priority: "high",
      horizonAffiliation: "h1"
    },
  ],

  ssc: [
    {
      title: "SSC CGL Level 0 — Tier 1 & Tier 2 Scheme, Syllabi & Post Profiles",
      subtasks: [
        "Examine Tier 1 qualifying format (100 Qs, 200 Marks, 60 mins) and Tier 2 merit ranking",
        "Audit job profiles: Assistant Section Officer (ASO in MEA/CSS), GST Inspector, Preventive Officer",
        "Map key subject splits: Quant (25), Reasoning (25), English (25), General Studies (25)"
      ],
      channel: "",
      query: "",
      priority: "critical",
      horizonAffiliation: "h1"
    },
    {
      title: "SSC English 1.1 — Subject-Verb Agreement Rules 1 to 10",
      subtasks: [
        "Master Rule 1: Singular subject requires singular verb; plural requires plural verb",
        "Analyze collective nouns: when used as single body (singular) vs individual members (plural)",
        "Solve 30 spotting error questions based on agreement rules from recent TCS papers"
      ],
      channel: "",
      query: "",
      priority: "critical",
      horizonAffiliation: "h1"
    },
    {
      title: "SSC Quant 1.1 — Number Systems, Unit Digits & Cyclicity",
      subtasks: [
        "Master cyclicity of unit digits for powers of 2, 3, 7, 8 (cycle of 4) and 4, 9 (cycle of 2)",
        "Calculate unit digits of complex exponential expressions",
        "Solve 20 SSC Tier 1 PYQs on unit digit and remainder theorems"
      ],
      channel: "",
      query: "",
      priority: "critical",
      horizonAffiliation: "h1"
    },
    {
      title: "SSC GS 1.1 — Indian Polity: Historical Background & Regulating Acts",
      subtasks: [
        "Study British Crown & Company rule: Regulating Act 1773, Pitt's India Act 1784, Charter Acts",
        "Analyze Government of India Acts 1858, 1909 (Morley-Minto), 1919 (Montagu-Chelmsford), 1935",
        "Note the composition, timeline, and key members of the Constituent Assembly"
      ],
      channel: "",
      query: "",
      priority: "high",
      horizonAffiliation: "h1"
    },
    {
      title: "SSC Reasoning 1.1 — Alphabet Coding-Decoding & Positional Values",
      subtasks: [
        "Memorize forward alphabetical positions (A=1 to Z=26) and reverse positions using EJOTY",
        "Learn opposite letter pairs mnemonic (A-Z, B-Y, C-X, D-W, E-V, F-U, G-T)",
        "Solve 30 coding-decoding questions on letter shifting and cross-pattern matching"
      ],
      channel: "",
      query: "",
      priority: "high",
      horizonAffiliation: "h1"
    },
    {
      title: "SSC Quant 1.2 — Profit, Loss & Basic Discount Formulas",
      subtasks: [
        "Define Cost Price (CP), Selling Price (SP), Marked Price (MP), and Profit/Loss margins",
        "Calculate single equivalent discount for successive discounts d1 and d2: d1 + d2 - (d1*d2)/100",
        "Solve 20 SSC questions on markup percentage and dishonest shopkeeper weight cheats"
      ],
      channel: "",
      query: "",
      priority: "critical",
      horizonAffiliation: "h1"
    },
    {
      title: "SSC GS 1.2 — Preamble, 12 Schedules & Parts of the Constitution",
      subtasks: [
        "Memorize 12 Schedules using the classic mnemonic 'TEARS OF OLD PM'",
        "Learn the 4 core components of the Preamble (Source, Nature, Objectives, Date of Adoption)",
        "Note key Parts of the Constitution (Part I: Union, Part II: Citizenship, Part III: Fundamental Rights)"
      ],
      channel: "",
      query: "",
      priority: "high",
      horizonAffiliation: "h1"
    },
  ],

  upsc: [
    {
      title: "UPSC Level 0 — Exam Cycle, 3-Stage Architecture & Syllabus Mastery",
      subtasks: [
        "Analyze 3 Stages: Prelims (GS 1 + CSAT), Mains (9 Written Papers: 1750 marks), Personality Test (275 marks)",
        "Deconstruct the official UPSC notification syllabus word-for-word for GS Papers 1 to 4",
        "Establish daily study ritual: 3-hour foundational block, 1-hour newspaper analysis, 30m revision"
      ],
      channel: "",
      query: "",
      priority: "critical",
      horizonAffiliation: "h1"
    },
    {
      title: "UPSC Polity 1.1 — What is a Constitution & Constitutionalism?",
      subtasks: [
        "Read NCERT Class 11 'Constitution at Work' Chapter 1: Meaning and functions of a constitution",
        "Understand Constitutionalism: Rule of Law, Limited Government, and Separation of Powers",
        "Write concise notes contrasting a rigid vs flexible constitution"
      ],
      channel: "",
      query: "",
      priority: "critical",
      horizonAffiliation: "h1"
    },
    {
      title: "UPSC Modern History 1.1 — 18th Century India & Decline of the Mughals",
      subtasks: [
        "Read NCERT / Spectrum Chapter 1: Factors leading to the decline of the Mughal Empire",
        "Map regional successor states: Hyderabad (Nizam-ul-Mulk), Bengal (Murshid Quli Khan), Awadh (Saadat Khan)",
        "Note the rise of autonomous kingdoms: The Marathas, Mysore (Hyder Ali), and Punjab (Ranjit Singh)"
      ],
      channel: "",
      query: "",
      priority: "high",
      horizonAffiliation: "h1"
    },
    {
      title: "UPSC Geography 1.1 — Earth in the Solar System, Latitudes & Longitudes",
      subtasks: [
        "Read NCERT Class 6 Geography Chapters 1 & 2: Motions of the Earth (Rotation vs Revolution)",
        "Understand Latitudes, Longitudes, Prime Meridian, and International Date Line",
        "Calculate local time differences from Indian Standard Time (IST) 82.5°E longitude"
      ],
      channel: "",
      query: "",
      priority: "high",
      horizonAffiliation: "h1"
    },
    {
      title: "UPSC Economy 1.1 — Introduction to Macroeconomics & National Income",
      subtasks: [
        "Read NCERT Class 12 Macroeconomics Chapter 1: Basic concepts of Macroeconomics",
        "Define Gross Domestic Product (GDP), GNP, NNP, and Factor Cost vs Market Price",
        "Understand Nominal GDP vs Real GDP and the GDP Deflator metric"
      ],
      channel: "",
      query: "",
      priority: "critical",
      horizonAffiliation: "h1"
    },
    {
      title: "UPSC Polity 1.2 — Making of the Constitution & Constituent Assembly",
      subtasks: [
        "Study the demand for Constituent Assembly (M.N. Roy 1934 to Cabinet Mission Plan 1946)",
        "Analyze the Objectives Resolution moved by Jawaharlal Nehru on 13 December 1946",
        "Note the composition of the Drafting Committee under Dr. B.R. Ambedkar and adoption on 26 Nov 1949"
      ],
      channel: "",
      query: "",
      priority: "critical",
      horizonAffiliation: "h1"
    },
    {
      title: "UPSC Current Affairs 1.1 — How to Read The Hindu / Indian Express for CSE",
      subtasks: [
        "Learn to filter political speeches and crime reports out of national policy news",
        "Extract Supreme Court judgments, government schemes, and international treaties",
        "Map daily news articles to specific syllabus headers (e.g. GS2: Federalism, GS3: Inflation)"
      ],
      channel: "",
      query: "",
      priority: "high",
      horizonAffiliation: "h1"
    },
  ],
};
