export type TrackId = 
  | 'uni' 
  | 'github' 
  | 'dsa' 
  | 'gate' 
  | 'afcat' 
  | 'cat' 
  | 'ssc' 
  | 'upsc';

export type AcademicMode = 
  | 'exam_crunch'       // University End-Sem Exam Mode (Nov & May)
  | 'vacation_sprint'   // Vacation Sprint Mode (Dec & June)
  | 'regular_semester'  // Regular Semester Mode (Jan-Apr & Jul-Oct)
  | 'light_recovery'    // Recovery / College Fest Day
  | 'custom';           // User-defined manual mode

export type ConfidenceLevel = 'solid' | 'needs_revision';

export interface TrackMeta {
  id: TrackId;
  name: string;
  code: string;
  accentColor: string;
  bgRgba: string;
  borderClass: string;
  icon: string;
  category: string;
  targetExam: string;
  archiveDate?: string; // e.g. '2027-02-21' for GATE
  description: string;
}

export interface StudyEntry {
  trackId: TrackId;
  completed: boolean;
  topic: string;
  contentNotes: string;
  timeSpent?: string; // '30m' | '1h' | '2h' | '3h+'
  confidence?: ConfidenceLevel;
  updatedAt: string;
}

export interface AcademicPhaseInfo {
  id: string;
  name: string;
  mode: AcademicMode;
  semesterName: string;
  badge: string;
  description: string;
  recommendedTracks: TrackId[];
}

export interface DailyRecord {
  date: string; // YYYY-MM-DD
  mode: AcademicMode;
  activeTracks: TrackId[];
  entries: Partial<Record<TrackId, StudyEntry>>;
  isBusyDay?: boolean;
  busyReason?: string;
}

export interface DayOverride {
  mode?: AcademicMode;
  activeTracks?: TrackId[];
  isBusyDay?: boolean;
  busyReason?: string;
}

export interface CadenceStorage {
  version: number;
  theme: 'dark' | 'light';
  records: Record<string, DailyRecord>;
  dayOverrides: Record<string, DayOverride>;
  // Custom weekly rules (Monday through Sunday)
  weeklyRoutineConfig?: Record<number, TrackId[]>;
}
