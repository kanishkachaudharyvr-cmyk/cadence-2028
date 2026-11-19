export type TrackId = 
  | 'dsa' 
  | 'github' 
  | 'uni' 
  | 'gate' 
  | 'afcat' 
  | 'cat' 
  | 'ssc' 
  | 'upsc';

export type HorizonId = 'h1' | 'h2' | 'h3' | 'h4';

export type MasteryStatus = 'pending' | 'in_progress' | 'needs_revision' | 'completed';

export interface SubTask {
  id: string;
  text: string;
  completed: boolean;
}

export interface CuratedChannel {
  name: string;
  handle?: string;
  url: string;
  recommendation: string;
}

export interface TrackMeta {
  id: TrackId;
  name: string;
  code: string;
  accentColor: string;
  bgRgba: string;
  glowClass: string;
  borderClass: string;
  icon: string;
  category: string;
  targetExam: string;
  examDate?: string;
  channels: CuratedChannel[];
  description: string;
  weightH1: number; // 1-10 priority scale for horizon
  weightH2: number;
  weightH3: number;
  weightH4: number;
  horizonFocus: Record<HorizonId, string>;
}

export interface HorizonInfo {
  id: HorizonId;
  code: string;
  name: string;
  period: string;
  startDate: string;
  endDate: string;
  totalDays: number;
  focusSummary: string;
  primaryTracks: TrackId[];
}

export interface DailyGoal {
  id: string; // e.g. "2026-11-19_dsa"
  trackId: TrackId;
  date: string; // YYYY-MM-DD
  dayNumber: number; // 1 to 590
  horizonId: HorizonId;
  title: string;
  subtasks: SubTask[];
  youtubeChannel: string;
  youtubeSearchQuery: string;
  masteryStatus: MasteryStatus;
  notes?: string;
  customYoutubeLink?: string;
  priority: 'critical' | 'high' | 'normal';
  isPostExamMaintenance?: boolean;
}

export interface RolledOverTask {
  id: string;
  originalDate: string;
  targetDate: string;
  trackId: TrackId;
  title: string;
  subtasks: SubTask[];
  completed: boolean;
}

export interface PomodoroSession {
  id: string;
  timestamp: string;
  date: string;
  trackId: TrackId;
  taskTitle: string;
  durationMinutes: number;
}

export interface UserStorageState {
  version: number;
  theme: 'dark' | 'light';
  goalCompletions: Record<string, boolean>; // goalId -> boolean
  subtaskCompletions: Record<string, boolean>; // subtaskId -> boolean
  notes: Record<string, string>; // goalId -> string
  customTitles: Record<string, string>; // goalId -> customTitle
  customYoutubeLinks: Record<string, string>; // goalId -> customUrl
  masteryStatuses: Record<string, MasteryStatus>; // goalId -> status
  rolledOverTasks: RolledOverTask[];
  pomodoroSessions: PomodoroSession[];
  activeTrackFilter: TrackId | 'all';
}
