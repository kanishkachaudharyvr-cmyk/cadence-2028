import React from 'react';
import { 
  ChevronLeft, 
  ChevronRight, 
  Calendar, 
  Sparkles, 
  AlertCircle, 
  GraduationCap, 
  Rocket, 
  Coffee, 
  BookOpen, 
  Sliders, 
  ListTodo, 
  Archive, 
  Grid3X3,
  CheckCircle2
} from 'lucide-react';
import { AcademicMode, AcademicPhaseInfo } from '../types/study';
import { 
  START_DATE, 
  GRADUATION_DATE, 
  parseDateUTC, 
  formatDateUTC, 
  daysBetween 
} from '../utils/academicCalendarEngine';

interface ContextModeBarProps {
  currentDateStr: string;
  onSelectDate: (dateStr: string) => void;
  phaseInfo: AcademicPhaseInfo;
  activeMode: AcademicMode;
  onChangeMode: (mode: AcademicMode) => void;
  activeTracksCount: number;
  completedTracksCount: number;
  isBusyDay: boolean;
  busyReason?: string;
  onToggleBusyDay: (isBusy: boolean, reason?: string) => void;
  currentView: 'workspace' | 'archive' | 'heatmap';
  onChangeView: (view: 'workspace' | 'archive' | 'heatmap') => void;
  totalLoggedCount: number;
}

export const ContextModeBar: React.FC<ContextModeBarProps> = ({
  currentDateStr,
  onSelectDate,
  phaseInfo,
  activeMode,
  onChangeMode,
  activeTracksCount,
  completedTracksCount,
  isBusyDay,
  busyReason,
  onToggleBusyDay,
  currentView,
  onChangeView,
  totalLoggedCount,
}) => {
  const dateObj = parseDateUTC(currentDateStr);
  const formattedDate = dateObj.toLocaleDateString('en-US', {
    weekday: 'long',
    month: 'short',
    day: 'numeric',
    year: 'numeric',
    timeZone: 'UTC',
  });

  const dayIndex = daysBetween(START_DATE, currentDateStr) + 1;

  const handlePrevDay = () => {
    if (currentDateStr > START_DATE) {
      const prev = parseDateUTC(currentDateStr);
      prev.setUTCDate(prev.getUTCDate() - 1);
      onSelectDate(formatDateUTC(prev));
    }
  };

  const handleNextDay = () => {
    if (currentDateStr < GRADUATION_DATE) {
      const next = parseDateUTC(currentDateStr);
      next.setUTCDate(next.getUTCDate() + 1);
      onSelectDate(formatDateUTC(next));
    }
  };

  const modeOptions: Array<{ mode: AcademicMode; label: string; icon: React.ReactNode }> = [
    { mode: 'exam_crunch', label: '🎓 Uni Exam Crunch Mode', icon: <GraduationCap className="w-3.5 h-3.5 text-blue-400" /> },
    { mode: 'vacation_sprint', label: '🚀 Full Vacation Sprint', icon: <Rocket className="w-3.5 h-3.5 text-emerald-400" /> },
    { mode: 'regular_semester', label: '📚 Regular Semester Mode', icon: <BookOpen className="w-3.5 h-3.5 text-violet-400" /> },
    { mode: 'light_recovery', label: '☕ Light Recovery Day', icon: <Coffee className="w-3.5 h-3.5 text-amber-400" /> },
  ];

  const progressPercent = activeTracksCount > 0 ? Math.round((completedTracksCount / activeTracksCount) * 100) : 0;

  return (
    <div className="w-full glass-panel rounded-2xl p-4 sm:p-5 mb-6 shadow-xl space-y-4">
      
      {/* Top Row: View Tabs + Date Time-Travel */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
        
        {/* Navigation View Tabs */}
        <div className="flex items-center flex-wrap gap-2">
          <button
            onClick={() => onChangeView('workspace')}
            className={`flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-semibold transition-all ${
              currentView === 'workspace'
                ? 'bg-gradient-to-r from-violet-600 to-indigo-600 text-white shadow-md shadow-violet-500/25'
                : 'bg-obsidian-800 light:bg-paper-200 text-slate-400 hover:text-white light:text-paper-800'
            }`}
          >
            <ListTodo className="w-4 h-4" />
            <span>Today's Focus Log</span>
            <span className="ml-1 text-[10px] font-mono px-1.5 py-0.2 rounded bg-black/20 text-white">
              {completedTracksCount}/{activeTracksCount}
            </span>
          </button>

          <button
            onClick={() => onChangeView('archive')}
            className={`flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-semibold transition-all ${
              currentView === 'archive'
                ? 'bg-gradient-to-r from-blue-600 to-cyan-600 text-white shadow-md shadow-blue-500/25'
                : 'bg-obsidian-800 light:bg-paper-200 text-slate-400 hover:text-white light:text-paper-800'
            }`}
          >
            <Archive className="w-4 h-4" />
            <span>Study Archive & Revision</span>
            <span className="ml-1 text-[10px] font-mono px-1.5 py-0.2 rounded bg-black/20 text-white">
              {totalLoggedCount}
            </span>
          </button>

          <button
            onClick={() => onChangeView('heatmap')}
            className={`flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-semibold transition-all ${
              currentView === 'heatmap'
                ? 'bg-gradient-to-r from-emerald-600 to-teal-600 text-white shadow-md shadow-emerald-500/25'
                : 'bg-obsidian-800 light:bg-paper-200 text-slate-400 hover:text-white light:text-paper-800'
            }`}
          >
            <Grid3X3 className="w-4 h-4" />
            <span>Consistency Grid</span>
          </button>
        </div>

        {/* Date Time-Travel Controls */}
        <div className="flex items-center gap-2">
          <button
            onClick={handlePrevDay}
            disabled={currentDateStr <= START_DATE}
            className="p-2 rounded-xl bg-obsidian-800 hover:bg-obsidian-700 light:bg-paper-200 light:hover:bg-paper-300 disabled:opacity-40 border border-white/10 text-white light:text-paper-900 transition-colors"
            title="Previous Day"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>

          <div className="flex items-center gap-2">
            <input
              type="date"
              min={START_DATE}
              max={GRADUATION_DATE}
              value={currentDateStr}
              onChange={(e) => e.target.value && onSelectDate(e.target.value)}
              className="bg-obsidian-800 light:bg-paper-200 text-white light:text-paper-900 font-mono text-xs px-3 py-2 rounded-xl border border-white/10 focus:outline-none focus:border-violet-500 cursor-pointer"
            />
          </div>

          <button
            onClick={handleNextDay}
            disabled={currentDateStr >= GRADUATION_DATE}
            className="p-2 rounded-xl bg-obsidian-800 hover:bg-obsidian-700 light:bg-paper-200 light:hover:bg-paper-300 disabled:opacity-40 border border-white/10 text-white light:text-paper-900 transition-colors"
            title="Next Day"
          >
            <ChevronRight className="w-4 h-4" />
          </button>

          <button
            onClick={() => onSelectDate(START_DATE)}
            className="px-2.5 py-2 rounded-xl bg-obsidian-800 hover:bg-obsidian-700 light:bg-paper-200 text-xs font-mono text-purple-300 border border-purple-500/30 transition-colors"
            title="Reset to Timeline Start"
          >
            Start Day
          </button>
        </div>

      </div>

      {/* Middle Context Banner: Academic Phase & Mode Override */}
      <div className="p-4 rounded-xl bg-obsidian-800/60 light:bg-paper-100 border border-white/5 flex flex-col md:flex-row md:items-center justify-between gap-4">
        
        {/* Phase Details */}
        <div>
          <div className="flex items-center flex-wrap gap-2 mb-1">
            <span className="font-mono text-xs font-bold px-2 py-0.5 rounded bg-violet-500/20 text-violet-300 border border-violet-500/30">
              {phaseInfo.badge}
            </span>
            <span className="font-mono text-[11px] text-slate-400">
              DAY {String(dayIndex).padStart(3, '0')} OF 590
            </span>
            <span className="text-xs text-slate-400 font-medium">
              • {phaseInfo.semesterName}
            </span>
          </div>

          <h2 className="text-lg sm:text-xl font-serif text-white light:text-paper-900">
            {phaseInfo.name}
          </h2>

          <p className="text-xs text-slate-400 light:text-paper-800 mt-0.5 max-w-2xl leading-relaxed">
            {phaseInfo.description}
          </p>
        </div>

        {/* 1-Click Study Mode Switcher Dropdown */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2 shrink-0">
          <div className="flex flex-col">
            <label className="text-[10px] font-mono text-slate-400 uppercase tracking-wider mb-1">
              Active Mode Override:
            </label>
            <select
              value={activeMode}
              onChange={(e) => onChangeMode(e.target.value as AcademicMode)}
              className="bg-obsidian-900 light:bg-paper-200 text-slate-200 light:text-paper-900 text-xs font-semibold px-3 py-2 rounded-xl border border-white/10 focus:outline-none focus:border-violet-500 cursor-pointer shadow-sm"
            >
              {modeOptions.map((opt) => (
                <option key={opt.mode} value={opt.mode}>
                  {opt.label}
                </option>
              ))}
            </select>
          </div>

          {/* Busy Day / Event Toggle */}
          <button
            onClick={() => {
              if (isBusyDay) {
                onToggleBusyDay(false);
              } else {
                const reason = prompt('Specify event / reason for busy day (e.g. RGIT Hackathon, Fest, Travel):') || 'College Event / Rest';
                onToggleBusyDay(true, reason);
              }
            }}
            className={`px-3 py-2 rounded-xl text-xs font-medium border transition-all mt-4 sm:mt-0 ${
              isBusyDay
                ? 'bg-amber-500/20 border-amber-500/40 text-amber-300'
                : 'bg-obsidian-800 light:bg-paper-200 border-white/5 text-slate-400 hover:text-white'
            }`}
            title="Mark as College Fest, Hackathon, or Sick Day"
          >
            {isBusyDay ? `🎉 Busy Day (${busyReason})` : 'Mark Busy Day'}
          </button>
        </div>

      </div>

      {/* Daily Progress Bar */}
      <div>
        <div className="flex items-center justify-between text-xs mb-1">
          <span className="text-slate-400 light:text-paper-800 font-medium flex items-center gap-1.5">
            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
            <span>Today's Track Completion</span>
          </span>
          <span className="font-mono text-slate-200 light:text-paper-900 font-bold">
            {completedTracksCount} / {activeTracksCount} Tracks Studied ({progressPercent}%)
          </span>
        </div>
        <div className="w-full h-2 rounded-full bg-obsidian-800 light:bg-paper-300 overflow-hidden">
          <div 
            className="h-full bg-gradient-to-r from-violet-500 via-indigo-500 to-emerald-400 transition-all duration-500 rounded-full"
            style={{ width: `${progressPercent}%` }}
          />
        </div>
      </div>

    </div>
  );
};
