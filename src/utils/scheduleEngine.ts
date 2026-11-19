import { 
  TrackId, 
  HorizonId, 
  DailyGoal, 
  SubTask, 
  HorizonInfo 
} from '../types/roadmap';
import { HORIZONS, TRACKS_META, TRACKS_ORDER } from '../data/tracksMeta';
import { SYLLABUS_BANK, TopicTemplate } from '../data/syllabusBank';

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

// Calculate days between two dates
export function daysBetween(fromStr: string, toStr: string): number {
  const from = parseDateUTC(fromStr);
  const to = parseDateUTC(toStr);
  const diffTime = to.getTime() - from.getTime();
  return Math.round(diffTime / (1000 * 60 * 60 * 24));
}

// Get Horizon for any given date
export function getHorizonForDate(dateStr: string): HorizonInfo {
  if (dateStr <= HORIZONS.h1.endDate) return HORIZONS.h1;
  if (dateStr <= HORIZONS.h2.endDate) return HORIZONS.h2;
  if (dateStr <= HORIZONS.h3.endDate) return HORIZONS.h3;
  return HORIZONS.h4;
}

// Pre-generate all 590 calendar date strings
export const ALL_590_DATES: string[] = (() => {
  const dates: string[] = [];
  const current = parseDateUTC(START_DATE);
  for (let i = 0; i < TOTAL_TIMELINE_DAYS; i++) {
    dates.push(formatDateUTC(current));
    current.setUTCDate(current.getUTCDate() + 1);
  }
  return dates;
})();

// Get day index (1 to 590)
export function getDayNumber(dateStr: string): number {
  const diff = daysBetween(START_DATE, dateStr);
  return Math.max(1, Math.min(TOTAL_TIMELINE_DAYS, diff + 1));
}

// Curated variation modifiers for daily dynamic variety
const DAILY_FOCUS_MODIFIERS: { [key: number]: { suffix: string; subtaskAddon: string } } = {
  0: { suffix: "Deep Concept & Implementation", subtaskAddon: "Document key learnings & edge cases" },
  1: { suffix: "High-Speed Problem Solving & PYQs", subtaskAddon: "Time-box solving to under 25 minutes" },
  2: { suffix: "Pattern Recognition & Edge Cases", subtaskAddon: "Create visual mind-map / flashcard" },
  3: { suffix: "Mock & Test Evaluation", subtaskAddon: "Conduct error-log analysis and score gap review" },
  4: { suffix: "Synthesis & Cross-Topic Linking", subtaskAddon: "Explain approach aloud without referring to notes" },
  5: { suffix: "Intensive Practice Drills", subtaskAddon: "Attempt 3 challenge problems beyond comfort zone" },
  6: { suffix: "Active Recall & Retrospective", subtaskAddon: "Review past 6 days notes and flag revision areas" },
};

// Generate post-exam maintenance topics dynamically
function getPostExamTopic(trackId: TrackId, horizonId: HorizonId, dayNum: number): TopicTemplate {
  const meta = TRACKS_META[trackId];
  const channel = meta.channels[0]?.name || "";
  
  if (trackId === 'gate') {
    return {
      title: `GATE Post-Exam Core CS & System Retention (Session #${dayNum % 30 + 1})`,
      subtasks: [
        "Review core OS / DBMS / Network fundamentals for PSU technical rounds",
        "Solve 1 advanced algorithmic puzzle to keep problem-solving sharp",
        "Refine architectural concepts for Sem 8 Major Project"
      ],
      channel: "",
      query: "",
      priority: "normal",
      horizonAffiliation: horizonId
    };
  }

  if (trackId === 'afcat') {
    return {
      title: `AFSB Stage 2 & Officer Leadership Development (Module #${dayNum % 20 + 1})`,
      subtasks: [
        "Study current geopolitical defence developments and IAF doctrine",
        "Practice Group Planning Exercise (GPE) solution structuring",
        "Perform 30 minutes physical endurance / fitness conditioning"
      ],
      channel: "",
      query: "",
      priority: "normal",
      horizonAffiliation: horizonId
    };
  }

  if (trackId === 'cat') {
    return {
      title: `Management Strategy, WAT & Case Analysis (Case #${dayNum % 25 + 1})`,
      subtasks: [
        "Analyze a real-world business case study (Harvard / IIM case style)",
        "Write a 300-word Written Ability Test (WAT) essay on contemporary economics",
        "Track macroeconomic trends in The Ken / Mint / The Economist"
      ],
      channel: "",
      query: "",
      priority: "normal",
      horizonAffiliation: horizonId
    };
  }

  if (trackId === 'ssc') {
    return {
      title: `Central Administration Skills & Speed Typing Maintenance`,
      subtasks: [
        "Execute 15 minutes English typing speed test (Target: > 35 WPM @ 98% accuracy)",
        "Revise high-frequency GS static charts (National Parks & Monuments)",
        "Solve 1 quick 25-question reasoning speed blitz"
      ],
      channel: "",
      query: "",
      priority: "normal",
      horizonAffiliation: horizonId
    };
  }

  if (trackId === 'upsc') {
    return {
      title: `UPSC Post-Prelims Mains GS Answer Writing & Ethics (Module #${dayNum % 30 + 1})`,
      subtasks: [
        "Draft 2 structured 15-marker GS Mains answers with diagrams and committee citations",
        "Analyze GS Paper IV (Ethics) case study using ethical frameworks",
        "Review key findings of latest Law Commission / NITI Aayog policy briefs"
      ],
      channel: "",
      query: "",
      priority: "high",
      horizonAffiliation: horizonId
    };
  }

  // Fallback
  return {
    title: `${meta.name} Skill Retention & Synthesis (Day ${dayNum})`,
    subtasks: [
      `Review key notes in ${meta.name}`,
      "Execute targeted practice problems",
      "Consolidate weekly summary in personal scratchpad"
    ],
    channel,
    query: `${meta.name} revision and mastery`,
    priority: "normal",
    horizonAffiliation: horizonId
  };
}

// Generate single DailyGoal for a track on a date
export function generateGoalForTrack(trackId: TrackId, dateStr: string): DailyGoal {
  const dayNum = getDayNumber(dateStr);
  const horizon = getHorizonForDate(dateStr);
  const meta = TRACKS_META[trackId];
  const goalId = `${dateStr}_${trackId}`;

  // Check if target exam has passed
  let isPostExam = false;
  if (meta.examDate && dateStr > meta.examDate) {
    isPostExam = true;
  }

  let template: TopicTemplate;

  if (isPostExam) {
    template = getPostExamTopic(trackId, horizon.id, dayNum);
  } else {
    const trackTemplates = SYLLABUS_BANK[trackId] || [];
    // Filter templates matching current horizon or 'all'
    const matchingTemplates = trackTemplates.filter(
      t => !t.horizonAffiliation || t.horizonAffiliation === 'all' || t.horizonAffiliation === horizon.id
    );

    const pool = matchingTemplates.length > 0 ? matchingTemplates : trackTemplates;
    const templateIndex = (dayNum - 1) % pool.length;
    template = pool[templateIndex];
  }

  // Calculate day-of-week variation
  const dayOfWeekIndex = parseDateUTC(dateStr).getUTCDay();
  const modifier = DAILY_FOCUS_MODIFIERS[dayOfWeekIndex];

  // Compose title
  const title = `${template.title} — ${modifier.suffix}`;

  // Compose 3 distinct subtasks
  const subtasks: SubTask[] = [
    {
      id: `${goalId}_st1`,
      text: template.subtasks[0] || `Master ${template.title} core concepts`,
      completed: false,
    },
    {
      id: `${goalId}_st2`,
      text: template.subtasks[1] || `Solve targeted problems / assignments`,
      completed: false,
    },
    {
      id: `${goalId}_st3`,
      text: `${template.subtasks[2] || 'Review performance'} (${modifier.subtaskAddon})`,
      completed: false,
    },
  ];

  // Determine priority based on Horizon primary tracks
  let priority = template.priority;
  if (horizon.primaryTracks.includes(trackId)) {
    priority = 'critical';
  } else if (isPostExam) {
    priority = 'normal';
  }

  return {
    id: goalId,
    trackId,
    date: dateStr,
    dayNumber: dayNum,
    horizonId: horizon.id,
    title,
    subtasks,
    youtubeChannel: template.channel,
    youtubeSearchQuery: template.query,
    masteryStatus: 'pending',
    priority,
    isPostExamMaintenance: isPostExam,
  };
}

// Generate all 8 goals for a date
export function generateGoalsForDate(dateStr: string): DailyGoal[] {
  return TRACKS_ORDER.map(trackId => generateGoalForTrack(trackId, dateStr));
}

// Group 590 days by month for the Track Deep-Dive View
export interface MonthGroup {
  monthKey: string; // "2026-11"
  displayName: string; // "November 2026"
  horizonId: HorizonId;
  dates: string[];
}

export function getMonthGroups(): MonthGroup[] {
  const groups: Record<string, MonthGroup> = {};

  for (const dateStr of ALL_590_DATES) {
    const monthKey = dateStr.slice(0, 7); // "YYYY-MM"
    if (!groups[monthKey]) {
      const dateObj = parseDateUTC(dateStr);
      const displayName = dateObj.toLocaleDateString('en-US', { 
        month: 'long', 
        year: 'numeric', 
        timeZone: 'UTC' 
      });
      const horizon = getHorizonForDate(dateStr);

      groups[monthKey] = {
        monthKey,
        displayName,
        horizonId: horizon.id,
        dates: [],
      };
    }
    groups[monthKey].dates.push(dateStr);
  }

  return Object.values(groups);
}
