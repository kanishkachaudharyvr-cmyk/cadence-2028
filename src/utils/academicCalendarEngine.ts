import { TrackId, AcademicMode, AcademicPhaseInfo } from '../types/study';
import { TRACKS_INFO } from '../data/tracksData';

export const START_DATE = '2026-11-19';
export const GRADUATION_DATE = '2028-06-30';
export const TOTAL_TIMELINE_DAYS = 590;

// Helper: Parse YYYY-MM-DD in UTC to prevent timezone skew
export function parseDateUTC(dateStr: string): Date {
  const [y, m, d] = dateStr.split('-').map(Number);
  return new Date(Date.UTC(y, m - 1, d, 0, 0, 0));
}

// Helper: Format Date to YYYY-MM-DD
export function formatDateUTC(date: Date): string {
  const y = date.getUTCFullYear();
  const m = String(date.getUTCMonth() + 1).padStart(2, '0');
  const d = String(date.getUTCDate()).padStart(2, '0');
  return `${y}-${m}-${d}`;
}

export function daysBetween(fromStr: string, toStr: string): number {
  const from = parseDateUTC(fromStr);
  const to = parseDateUTC(toStr);
  const diffTime = to.getTime() - from.getTime();
  return Math.round(diffTime / (1000 * 60 * 60 * 24));
}

// Determine Academic Phase dynamically from date
export function getAcademicPhase(dateStr: string): AcademicPhaseInfo {
  const date = parseDateUTC(dateStr);
  const month = date.getUTCMonth() + 1; // 1-12
  const year = date.getUTCFullYear();

  // 1. November 2026 — Winter Exam Crunch (Sem 5 Finals)
  if (year === 2026 && month === 11) {
    return {
      id: 'sem5_exams',
      name: 'Winter Exam Mode — Mumbai Univ Sem 5 Finals',
      mode: 'exam_crunch',
      semesterName: 'Semester 5 (Finals)',
      badge: '🎓 Uni Exam Crunch',
      description: 'End-Sem Finals Priority: Intensive revision on Core Uni Subjects + Lightweight GitHub Green habit only.',
      recommendedTracks: ['uni', 'github'],
    };
  }

  // 2. December 2026 — Winter Vacation Sprint (Pre-GATE 2027)
  if (year === 2026 && month === 12) {
    return {
      id: 'winter_vacation_2026',
      name: 'Winter Vacation Sprint — Pre-GATE Blitz',
      mode: 'vacation_sprint',
      semesterName: 'Winter Break',
      badge: '🚀 Vacation Sprint',
      description: 'Zero college classes: High-yield GATE 2027 problem solving, Striver DSA blocks, and daily commits.',
      recommendedTracks: ['gate', 'dsa', 'github'],
    };
  }

  // 3. Jan 1 - Feb 21, 2027 — GATE 2027 Peak Sprint & Sem 6 Kickoff
  if (year === 2027 && (month === 1 || (month === 2 && date.getUTCDate() <= 21))) {
    return {
      id: 'gate_peak_sprint',
      name: 'GATE 2027 Peak Sprint (Exam: Feb 6–21)',
      mode: 'regular_semester',
      semesterName: 'Semester 6 Kickoff',
      badge: '⚡ Exam Milestone Sprint',
      description: 'High-stake GATE CS & DA testing window. Full focus on GATE mocks + foundational Sem 6 IT.',
      recommendedTracks: ['gate', 'uni', 'github'],
    };
  }

  // 4. Late Feb - April 2027 — Sem 6 Regular Semester & AFCAT/CAT Ramp-Up
  if (year === 2027 && ((month === 2 && date.getUTCDate() > 21) || month === 3 || month === 4)) {
    return {
      id: 'sem6_regular',
      name: 'Regular Semester 6 — Internships & AFCAT Ramp-Up',
      mode: 'regular_semester',
      semesterName: 'Semester 6',
      badge: '📚 Regular Semester',
      description: 'Balanced college routine: Sem 6 IT coursework, SDE internship DSA, and AFCAT 2 / CAT Quant foundations.',
      recommendedTracks: ['uni', 'dsa', 'afcat'],
    };
  }

  // 5. May 2027 — University End-Sem Exam Mode (Sem 6 Finals)
  if (year === 2027 && month === 5) {
    return {
      id: 'sem6_exams',
      name: 'Summer Exam Mode — Mumbai Univ Sem 6 Finals',
      mode: 'exam_crunch',
      semesterName: 'Semester 6 (Finals)',
      badge: '🎓 Uni Exam Crunch',
      description: 'Sem 6 Finals Priority: Focus on University exams + GitHub Green streak.',
      recommendedTracks: ['uni', 'github'],
    };
  }

  // 6. June 2027 — Summer Vacation Deep-Sprint (AFCAT 2 & CAT Focus)
  if (year === 2027 && month === 6) {
    return {
      id: 'summer_vacation_2027',
      name: 'Summer Vacation Sprint — AFCAT 2 & CAT 2027',
      mode: 'vacation_sprint',
      semesterName: 'Summer Break',
      badge: '🚀 Vacation Sprint',
      description: 'Zero college classes: Heavy AFCAT 2 speed drills, CAT 2027 DILR/QA sets, and DSA.',
      recommendedTracks: ['afcat', 'cat', 'dsa'],
    };
  }

  // 7. July - October 2027 — Sem 7 Regular Semester & Campus Placements / CAT Sprint
  if (year === 2027 && (month >= 7 && month <= 10)) {
    const isAfcatPhase = month <= 8;
    return {
      id: 'sem7_regular',
      name: isAfcatPhase ? 'Sem 7 — Placements & AFCAT 2 Sprint' : 'Sem 7 — Campus Placements & CAT 2027 Peak',
      mode: 'regular_semester',
      semesterName: 'Semester 7',
      badge: '📚 Placement & Exam Phase',
      description: isAfcatPhase 
        ? 'AFCAT 2 exam month + Sem 7 coursework + Campus Placement coding.' 
        : 'CAT 2027 / SSC CGL peak season + Placement interviews + Sem 7 coursework.',
      recommendedTracks: isAfcatPhase ? ['afcat', 'dsa', 'uni'] : ['cat', 'ssc', 'dsa'],
    };
  }

  // 8. November 2027 — Winter Exam Mode (Sem 7 Finals) & CAT 2027
  if (year === 2027 && month === 11) {
    return {
      id: 'sem7_exams',
      name: 'Winter Exam Mode — Sem 7 Finals & CAT 2027 (Nov 28)',
      mode: 'exam_crunch',
      semesterName: 'Semester 7 (Finals)',
      badge: '🎓 Dual Critical Sprint',
      description: 'High-stakes window: Sem 7 University examinations and CAT 2027 final sprint.',
      recommendedTracks: ['uni', 'cat', 'github'],
    };
  }

  // 9. December 2027 — Winter Vacation Sprint (UPSC 2028 Launch & Sem 8 Project)
  if (year === 2027 && month === 12) {
    return {
      id: 'winter_vacation_2027',
      name: 'Winter Vacation Sprint — UPSC CSE 2028 Launch',
      mode: 'vacation_sprint',
      semesterName: 'Winter Break',
      badge: '🚀 Vacation Sprint',
      description: 'Zero college classes: Daily GS & CSAT foundation for UPSC 2028, Final Year Project architecture, and DSA.',
      recommendedTracks: ['upsc', 'github', 'dsa'],
    };
  }

  // 10. Jan - April 2028 — Sem 8 Regular Semester & UPSC 2028 Ramp-Up
  if (year === 2028 && (month >= 1 && month <= 4)) {
    return {
      id: 'sem8_regular',
      name: 'Semester 8 — Final Year Capstone & UPSC CSE 2028',
      mode: 'regular_semester',
      semesterName: 'Semester 8 (Final Year)',
      badge: '📚 Capstone & Civil Services',
      description: 'Final semester: B.E. Major Project implementation, Sem 8 papers, and high-intensity UPSC Prelims preparation.',
      recommendedTracks: ['upsc', 'uni', 'github'],
    };
  }

  // 11. May - June 2028 — UPSC Prelims, Final Convocation & Graduation
  if (year === 2028 && (month === 5 || month === 6)) {
    return {
      id: 'graduation_upsc',
      name: 'UPSC CSE 2028 Prelims & Graduation (June 30, 2028)',
      mode: 'vacation_sprint',
      semesterName: 'Graduation Horizon',
      badge: '👑 The Grand Finale',
      description: 'UPSC CSE 2028 Prelims examination, Degree defense, and B.E. Information Technology Convocation on June 30, 2028.',
      recommendedTracks: ['upsc', 'uni', 'github'],
    };
  }

  // Fallback
  return {
    id: 'default_semester',
    name: 'Academic Study Mode',
    mode: 'regular_semester',
    semesterName: 'B.E. IT Curriculum',
    badge: '📚 Standard Phase',
    description: 'Balanced daily academic rotation.',
    recommendedTracks: ['uni', 'dsa', 'github'],
  };
}

// Generate smart recommended tracks for any day considering weekday rotation & academic mode
export function getRecommendedTracksForDate(dateStr: string, activeMode?: AcademicMode): TrackId[] {
  const phase = getAcademicPhase(dateStr);
  const mode = activeMode || phase.mode;
  const date = parseDateUTC(dateStr);
  const dayOfWeek = date.getUTCDay(); // 0 = Sun, 1 = Mon, ..., 6 = Sat

  // Check which competitive exams have already passed
  const isGateArchived = dateStr > '2027-02-21';
  const isAfcatArchived = dateStr > '2027-08-31';
  const isCatArchived = dateStr > '2027-11-30';
  const isSscArchived = dateStr > '2027-10-31';

  // 1. Exam Crunch Mode (e.g. May/Nov finals) -> Core Uni + GitHub ONLY
  if (mode === 'exam_crunch') {
    return ['uni', 'github'];
  }

  // 2. Light Recovery Day -> GitHub only or 1 light track
  if (mode === 'light_recovery') {
    return ['github', 'dsa'];
  }

  // 3. Full Vacation Sprint -> 3 high-intensity focus tracks
  if (mode === 'vacation_sprint') {
    if (!isGateArchived && dateStr <= '2027-02-21') {
      return ['gate', 'dsa', 'github'];
    }
    if (!isAfcatArchived && dateStr <= '2027-08-31') {
      return ['afcat', 'cat', 'dsa'];
    }
    return ['upsc', 'dsa', 'github'];
  }

  // 4. Regular Semester Mode -> 2-3 tracks using smart weekday/weekend rotation
  // Mon, Wed, Fri: Academic focus + DSA + GitHub
  if (dayOfWeek === 1 || dayOfWeek === 3 || dayOfWeek === 5) {
    return ['uni', 'dsa', 'github'];
  }

  // Tue, Thu: Competitive Exam focus + Secondary Exam + GitHub
  if (dayOfWeek === 2 || dayOfWeek === 4) {
    if (!isGateArchived) {
      return ['gate', 'uni', 'github'];
    }
    if (!isAfcatArchived) {
      return ['afcat', 'uni', 'github'];
    }
    if (!isCatArchived) {
      return ['cat', 'ssc', 'github'];
    }
    return ['upsc', 'uni', 'github'];
  }

  // Weekends (Sat, Sun): Deep-dive focus
  if (!isGateArchived) {
    return ['gate', 'dsa', 'cat'];
  }
  if (!isAfcatArchived) {
    return ['afcat', 'cat', 'dsa'];
  }
  if (!isCatArchived) {
    return ['cat', 'ssc', 'upsc'];
  }
  return ['upsc', 'dsa', 'github'];
}

// Milestone countdowns
export interface MilestoneTimer {
  id: string;
  name: string;
  targetDate: string;
  badge: string;
  color: string;
  isPassed: boolean;
  daysRemaining: number;
}

export function getMilestoneTimers(currentDateStr: string): MilestoneTimer[] {
  const milestones = [
    {
      id: 'gate',
      name: 'GATE 2027',
      targetDate: '2027-02-06',
      badge: 'CS & DA',
      color: '#8B5CF6',
    },
    {
      id: 'afcat',
      name: 'AFCAT 2',
      targetDate: '2027-08-28',
      badge: 'IAF Tech/Flying',
      color: '#06B6D4',
    },
    {
      id: 'cat',
      name: 'CAT 2027',
      targetDate: '2027-11-28',
      badge: 'IIMs & FMS',
      color: '#F59E0B',
    },
    {
      id: 'upsc',
      name: 'UPSC CSE 2028',
      targetDate: '2028-05-28',
      badge: 'IAS / IFS Prelims',
      color: '#EA580C',
    },
    {
      id: 'grad',
      name: 'B.E. GRADUATION',
      targetDate: '2028-06-30',
      badge: 'Convocation Day',
      color: '#10B981',
    },
  ];

  return milestones.map(m => {
    const days = daysBetween(currentDateStr, m.targetDate);
    return {
      ...m,
      isPassed: days < 0,
      daysRemaining: days,
    };
  });
}
