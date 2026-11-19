import React from 'react';
import { 
  ChevronLeft, 
  ChevronRight, 
  Calendar as CalendarIcon, 
  Compass, 
  Layers, 
  Sparkles,
  CheckCircle2
} from 'lucide-react';
import { 
  START_DATE, 
  GRADUATION_DATE, 
  parseDateUTC, 
  formatDateUTC, 
  getHorizonForDate,
  daysBetween 
} from '../utils/scheduleEngine';
import { HorizonInfo } from '../types/roadmap';

interface DateNavigatorProps {
  selectedDate: string;
  onSelectDate: (dateStr: string) => void;
  completedGoalsToday: number;
  totalGoalsToday: number;
  viewMode: 'today' | 'deepdive';
  onToggleViewMode: (mode: 'today' | 'deepdive') => void;
}

export const DateNavigator: React.FC<DateNavigatorProps> = ({
  selectedDate,
  onSelectDate,
  completedGoalsToday,
  totalGoalsToday,
  viewMode,
  onToggleViewMode,
}) => {
  const dateObj = parseDateUTC(selectedDate);
  const formattedDay = dateObj.toLocaleDateString('en-US', { 
    weekday: 'long', 
    month: 'short', 
    day: 'numeric', 
    year: 'numeric',
    timeZone: 'UTC' 
  });

  const horizon: HorizonInfo = getHorizonForDate(selectedDate);
  const dayIndex = daysBetween(START_DATE, selectedDate) + 1;
  const progressPercent = totalGoalsToday > 0 ? Math.round((completedGoalsToday / totalGoalsToday) * 100) : 0;

  const handlePrevDay = () => {
    if (selectedDate > START_DATE) {
      const prev = parseDateUTC(selectedDate);
      prev.setUTCDate(prev.getUTCDate() - 1);
      onSelectDate(formatDateUTC(prev));
    }
  };

  const handleNextDay = () => {
    if (selectedDate < GRADUATION_DATE) {
      const next = parseDateUTC(selectedDate);
      next.setUTCDate(next.getUTCDate() + 1);
      onSelectDate(formatDateUTC(next));
    }
  };

  const milestoneShortcuts = [
    { label: 'Nov 19, 2026 (Kickoff)', date: '2026-11-19' },
    { label: 'GATE (Feb 2027)', date: '2027-02-07' },
    { label: 'AFCAT (Aug 2027)', date: '2027-08-28' },
    { label: 'CAT (Nov 2027)', date: '2027-11-28' },
    { label: 'UPSC (May 2028)', date: '2028-05-28' },
    { label: 'Graduation (Jun 30, 2028)', date: '2028-06-30' },
  ];

  return (
    <div className="w-full glass-panel rounded-2xl p-4 sm:p-5 mb-6 shadow-xl">
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
        
        {/* Left: View Mode Pills + Date Details */}
        <div>
          {/* View Mode Toggle */}
          <div className="flex items-center gap-2 mb-3">
            <button
              onClick={() => onToggleViewMode('today')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold transition-all ${
                viewMode === 'today'
                  ? 'bg-gradient-to-r from-violet-600 to-indigo-600 text-white shadow-md shadow-violet-500/25'
                  : 'bg-obsidian-800 light:bg-paper-200 text-slate-400 hover:text-white light:text-paper-800'
              }`}
            >
              <Compass className="w-3.5 h-3.5" />
              <span>Today's Command Center</span>
            </button>

            <button
              onClick={() => onToggleViewMode('deepdive')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold transition-all ${
                viewMode === 'deepdive'
                  ? 'bg-gradient-to-r from-emerald-600 to-teal-600 text-white shadow-md shadow-emerald-500/25'
                  : 'bg-obsidian-800 light:bg-paper-200 text-slate-400 hover:text-white light:text-paper-800'
              }`}
            >
              <Layers className="w-3.5 h-3.5" />
              <span>Track Deep-Dive (All 590 Days)</span>
            </button>
          </div>

          {/* Current Date Display */}
          <div className="flex flex-wrap items-baseline gap-2.5">
            <h2 className="text-2xl sm:text-3xl font-serif text-white light:text-paper-900 tracking-tight">
              {formattedDay}
            </h2>
            <span className="font-mono text-xs px-2 py-0.5 rounded-md bg-white/10 text-slate-300 light:text-paper-800 font-semibold">
              DAY {String(dayIndex).padStart(3, '0')} OF 590
            </span>
          </div>

          {/* Horizon Badge & Summary */}
          <div className="flex items-center flex-wrap gap-2 mt-2">
            <span className="font-mono text-[11px] font-bold px-2 py-0.5 rounded bg-violet-500/20 text-violet-300 border border-violet-500/30 uppercase tracking-wider">
              {horizon.code}: {horizon.name}
            </span>
            <span className="text-xs text-slate-400 light:text-paper-800">
              ({horizon.period})
            </span>
          </div>
        </div>

        {/* Right: Date Controls & Quick Time-Travel */}
        <div className="flex flex-col items-start lg:items-end gap-3">
          
          {/* Navigation Controls */}
          <div className="flex items-center gap-2">
            <button
              onClick={handlePrevDay}
              disabled={selectedDate <= START_DATE}
              className="p-2 rounded-xl bg-obsidian-800 hover:bg-obsidian-700 light:bg-paper-200 light:hover:bg-paper-300 disabled:opacity-40 disabled:cursor-not-allowed border border-white/10 light:border-paper-300 text-white light:text-paper-900 transition-colors"
              title="Previous Day"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>

            {/* Native Datepicker for Time-Travel */}
            <div className="relative flex items-center">
              <input
                type="date"
                min={START_DATE}
                max={GRADUATION_DATE}
                value={selectedDate}
                onChange={(e) => e.target.value && onSelectDate(e.target.value)}
                className="bg-obsidian-800 light:bg-paper-200 text-white light:text-paper-900 font-mono text-xs px-3 py-2 rounded-xl border border-white/10 light:border-paper-300 focus:outline-none focus:border-violet-500 cursor-pointer"
              />
            </div>

            <button
              onClick={handleNextDay}
              disabled={selectedDate >= GRADUATION_DATE}
              className="p-2 rounded-xl bg-obsidian-800 hover:bg-obsidian-700 light:bg-paper-200 light:hover:bg-paper-300 disabled:opacity-40 disabled:cursor-not-allowed border border-white/10 light:border-paper-300 text-white light:text-paper-900 transition-colors"
              title="Next Day"
            >
              <ChevronRight className="w-4 h-4" />
            </button>

            <button
              onClick={() => onSelectDate(START_DATE)}
              className="px-2.5 py-2 rounded-xl bg-obsidian-800 hover:bg-obsidian-700 light:bg-paper-200 light:hover:bg-paper-300 text-xs font-mono text-purple-300 border border-purple-500/30 transition-colors"
              title="Reset to Timeline Start"
            >
              Timeline Day 1
            </button>
          </div>

          {/* Quick Preset Chips */}
          <div className="flex items-center flex-wrap gap-1.5 max-w-md justify-start lg:justify-end">
            {milestoneShortcuts.map((ms) => (
              <button
                key={ms.date}
                onClick={() => onSelectDate(ms.date)}
                className={`text-[10px] font-mono px-2 py-0.5 rounded-lg border transition-all ${
                  selectedDate === ms.date
                    ? 'border-violet-400 bg-violet-500/20 text-violet-200 font-bold'
                    : 'border-white/5 bg-obsidian-800/80 light:bg-paper-200 text-slate-400 light:text-paper-800 hover:border-white/20'
                }`}
              >
                {ms.label}
              </button>
            ))}
          </div>
        </div>

      </div>

      {/* Selected Day Progress Bar */}
      <div className="mt-4 pt-3 border-t border-white/5 light:border-paper-200">
        <div className="flex items-center justify-between text-xs mb-1.5">
          <span className="text-slate-400 light:text-paper-800 font-medium flex items-center gap-1.5">
            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
            <span>Daily Trajectory Completion</span>
          </span>
          <span className="font-mono font-bold text-slate-200 light:text-paper-900">
            {completedGoalsToday} / {totalGoalsToday} Tracks Completed ({progressPercent}%)
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
