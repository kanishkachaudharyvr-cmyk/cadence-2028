import { TrackId, TrackMeta } from '../types/study';

export const TRACKS_ORDER: TrackId[] = [
  'uni',
  'github',
  'dsa',
  'gate',
  'afcat',
  'cat',
  'ssc',
  'upsc',
];

export const TRACKS_INFO: Record<TrackId, TrackMeta> = {
  uni: {
    id: 'uni',
    name: 'Core Uni Subjects',
    code: 'MU-IT',
    accentColor: '#3B82F6', // Cobalt Blue
    bgRgba: 'rgba(59, 130, 246, 0.14)',
    borderClass: 'border-blue-500/30',
    icon: 'GraduationCap',
    category: 'Academics & Degree',
    targetExam: 'Mumbai Univ B.E. IT (Sem 5–8)',
    description: 'B.E. Information Technology coursework, internal assessments, labs, and semester end-term papers.',
  },
  github: {
    id: 'github',
    name: 'GitHub Green Contribution',
    code: 'GIT',
    accentColor: '#84CC16', // Matrix Lime
    bgRgba: 'rgba(132, 204, 22, 0.14)',
    borderClass: 'border-lime-500/30',
    icon: 'GitFork',
    category: 'Proof of Work & Habit',
    targetExam: 'Daily Commit Streak & Open Source PRs',
    description: '15–20 mins daily lightweight coding habit: micro-features, bug fixes, script utilities, and open source PRs.',
  },
  dsa: {
    id: 'dsa',
    name: 'DSA & Coding Mastery',
    code: 'DSA',
    accentColor: '#10B981', // Electric Emerald
    bgRgba: 'rgba(16, 185, 129, 0.14)',
    borderClass: 'border-emerald-500/30',
    icon: 'Code2',
    category: 'Software Engineering',
    targetExam: 'SDE Placements & LeetCode Contests',
    description: 'Algorithmic problem solving across Striver A-Z, LeetCode, and weekly contest rounds.',
  },
  gate: {
    id: 'gate',
    name: 'GATE 2027 (CS & DA)',
    code: 'GATE',
    accentColor: '#8B5CF6', // Violet Pulse
    bgRgba: 'rgba(139, 92, 246, 0.14)',
    borderClass: 'border-violet-500/30',
    icon: 'Cpu',
    category: 'National Competitive Exam',
    targetExam: 'GATE CS & DA (Exam: Feb 6–21, 2027)',
    archiveDate: '2027-02-21',
    description: 'Discrete Math, Linear Algebra, Probability, Core CS subjects, and Data Science / AI overlap.',
  },
  afcat: {
    id: 'afcat',
    name: 'AFCAT 2 (Flying & Tech)',
    code: 'AFCAT',
    accentColor: '#06B6D4', // Sky Cyan
    bgRgba: 'rgba(6, 182, 212, 0.14)',
    borderClass: 'border-cyan-500/30',
    icon: 'ShieldCheck',
    category: 'Defence Commission',
    targetExam: 'AFCAT 2 (Exam: August 2027)',
    archiveDate: '2027-08-31',
    description: 'Military Aptitude, Speed Numerical Ability, English Verbal, and Defence GK for Indian Air Force commission.',
  },
  cat: {
    id: 'cat',
    name: 'CAT 2027 (IIMs & FMS)',
    code: 'CAT',
    accentColor: '#F59E0B', // Amber Gold
    bgRgba: 'rgba(245, 158, 11, 0.14)',
    borderClass: 'border-amber-500/30',
    icon: 'TrendingUp',
    category: 'Management & Strategy',
    targetExam: 'CAT 2027 (Exam: Late Nov 2027)',
    archiveDate: '2027-11-30',
    description: 'Quantitative Aptitude, Data Interpretation & Logical Reasoning (DILR), and VARC critical reading.',
  },
  ssc: {
    id: 'ssc',
    name: 'SSC CGL 2027 (Officer Grade)',
    code: 'SSC',
    accentColor: '#F43F5E', // Coral Rose
    bgRgba: 'rgba(244, 63, 94, 0.14)',
    borderClass: 'border-rose-500/30',
    icon: 'Briefcase',
    category: 'Central Civil Services',
    targetExam: 'SSC CGL Tier 1 & Tier 2',
    archiveDate: '2027-10-31',
    description: 'High-speed Advanced Maths (Trigonometry/Geometry), English Grammar rules, and General Studies.',
  },
  upsc: {
    id: 'upsc',
    name: 'UPSC CSE 2028 (IAS / IFS / IPS)',
    code: 'UPSC',
    accentColor: '#EA580C', // Terracotta Orange
    bgRgba: 'rgba(234, 88, 12, 0.14)',
    borderClass: 'border-orange-500/30',
    icon: 'Landmark',
    category: 'Premier Civil Services',
    targetExam: 'UPSC CSE Prelims (May/June 2028)',
    description: 'Indian Polity, Modern History, Economy, Physical/Indian Geography, Environment, and CSAT.',
  },
};
