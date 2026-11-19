import React from 'react';
import { 
  Sparkles, 
  Calendar, 
  Flame, 
  Award, 
  TrendingUp, 
  BookOpen, 
  Code2, 
  GraduationCap 
} from 'lucide-react';
import { TrackId, CadenceStorage } from '../types/study';
import { TRACKS_INFO, TRACKS_ORDER } from '../data/tracksData';
import { START_DATE, parseDateUTC, formatDateUTC, TOTAL_TIMELINE_DAYS } from '../utils/academicCalendarEngine';

interface ConsistencyHeatmapViewProps {
  storage: CadenceStorage;
  onJumpToDate: (dateStr: string) => void;
  stats: {
    totalCompletedTracks: number;
    totalTopicsLogged: number;
    currentStreak: number;
    longestStreak: number;
    trackCompletions: Record<TrackId, number>;
  };
}

// Generate all 590 dates
const ALL_590_DATES: string[] = (() => {
  const dates: string[] = [];
  const current = parseDateUTC(START_DATE);
  for (let i = 0; i < 590; i++) {
    dates.push(formatDateUTC(current));
    current.setUTCDate(current.getUTCDate() + 1);
  }
  return dates;
})();

export const ConsistencyHeatmapView: React.FC<ConsistencyHeatmapViewProps> = ({
  storage,
  onJumpToDate,
  stats,
}) => {
  // Count completions per day
  const getCompletedCountForDate = (dateStr: string) => {
    const record = storage.records[dateStr];
    if (!record || !record.entries) return 0;
    return Object.values(record.entries).filter(e => e?.completed).length;
  };

  return (
    <div className="space-y-6">
      
      {/* Top Metrics Banner */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <div className="glass-panel p-4 rounded-2xl border border-white/10">
          <div className="flex items-center gap-1.5 text-xs text-slate-400 mb-1">
            <Flame className="w-3.5 h-3.5 text-orange-400" />
            <span>Consistency Streak</span>
          </div>
          <div className="text-2xl font-mono font-bold text-white light:text-paper-900">
            {stats.currentStreak} <span className="text-xs text-slate-400 font-normal">/ max {stats.longestStreak}d</span>
          </div>
        </div>

        <div className="glass-panel p-4 rounded-2xl border border-white/10">
          <div className="flex items-center gap-1.5 text-xs text-slate-400 mb-1">
            <Award className="w-3.5 h-3.5 text-emerald-400" />
            <span>Tracks Studied</span>
          </div>
          <div className="text-2xl font-mono font-bold text-white light:text-paper-900">
            {stats.totalCompletedTracks}
          </div>
        </div>

        <div className="glass-panel p-4 rounded-2xl border border-white/10">
          <div className="flex items-center gap-1.5 text-xs text-slate-400 mb-1">
            <BookOpen className="w-3.5 h-3.5 text-blue-400" />
            <span>Topics Documented</span>
          </div>
          <div className="text-2xl font-mono font-bold text-white light:text-paper-900">
            {stats.totalTopicsLogged}
          </div>
        </div>

        <div className="glass-panel p-4 rounded-2xl border border-white/10">
          <div className="flex items-center gap-1.5 text-xs text-slate-400 mb-1">
            <TrendingUp className="w-3.5 h-3.5 text-purple-400" />
            <span>Graduation Timeline</span>
          </div>
          <div className="text-2xl font-mono font-bold text-white light:text-paper-900">
            590 <span className="text-xs text-slate-400 font-normal">Days Total</span>
          </div>
        </div>
      </div>

      {/* GitHub-Style 590-Day Contribution Heatmap */}
      <div className="glass-panel p-5 rounded-2xl border border-white/10 space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-base sm:text-lg font-serif text-white light:text-paper-900 flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-emerald-400" />
              <span>590-Day Learning Consistency Grid (Nov 19, 2026 → Jun 30, 2028)</span>
            </h3>
            <p className="text-xs text-slate-400 light:text-paper-800 mt-0.5">
              Every day shows your study intensity based on how many tracks you completed.
            </p>
          </div>

          {/* Legend */}
          <div className="flex items-center gap-1.5 text-[10px] font-mono text-slate-400">
            <span>0</span>
            <div className="w-3 h-3 rounded-[3px] bg-obsidian-800 light:bg-paper-300 border border-white/5" />
            <div className="w-3 h-3 rounded-[3px] bg-emerald-900/60 border border-emerald-500/20" />
            <div className="w-3 h-3 rounded-[3px] bg-emerald-600 shadow-sm" />
            <div className="w-3 h-3 rounded-[3px] bg-emerald-400 shadow-sm" />
            <span>3+</span>
          </div>
        </div>

        {/* Heatmap Grid (7 rows for days of week, columns for weeks) */}
        <div className="w-full overflow-x-auto pb-3 pt-1 no-scrollbar">
          <div className="grid grid-flow-col grid-rows-7 gap-1 min-w-max">
            {ALL_590_DATES.map((dateStr, idx) => {
              const count = getCompletedCountForDate(dateStr);
              const dayNum = idx + 1;

              let bgClass = 'bg-obsidian-800/80 light:bg-paper-200 border border-white/5 hover:border-white/30';
              if (count === 1) bgClass = 'bg-emerald-800 border border-emerald-600/40';
              if (count === 2) bgClass = 'bg-emerald-600 border border-emerald-400/50 shadow-sm';
              if (count >= 3) bgClass = 'bg-emerald-400 border border-emerald-300 shadow-md shadow-emerald-500/30';

              return (
                <button
                  key={dateStr}
                  onClick={() => onJumpToDate(dateStr)}
                  className={`w-3.5 h-3.5 rounded-[3px] transition-all hover:scale-125 hover:z-20 ${bgClass}`}
                  title={`Day ${dayNum} (${dateStr}): ${count} tracks completed`}
                />
              );
            })}
          </div>
        </div>
      </div>

      {/* Individual Track Breakdown */}
      <div>
        <h3 className="text-xs font-mono uppercase tracking-wider text-slate-400 light:text-paper-800 mb-3">
          Consistency Breakdown Across All 8 Tracks:
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
          {TRACKS_ORDER.map((tid) => {
            const meta = TRACKS_INFO[tid];
            const completedCount = stats.trackCompletions[tid] || 0;

            return (
              <div 
                key={tid}
                className="glass-panel p-4 rounded-xl border border-white/5"
              >
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <div 
                      className="w-2.5 h-2.5 rounded-full"
                      style={{ backgroundColor: meta.accentColor }}
                    />
                    <span className="text-xs font-bold text-slate-200 light:text-paper-900">
                      {meta.name}
                    </span>
                  </div>
                  <span className="font-mono text-xs font-bold text-white light:text-paper-900">
                    {completedCount}
                  </span>
                </div>

                <p className="text-[11px] text-slate-400 truncate mb-2">
                  {meta.targetExam}
                </p>

                <div className="w-full h-1.5 rounded-full bg-obsidian-800 light:bg-paper-300 overflow-hidden">
                  <div 
                    className="h-full rounded-full transition-all duration-500"
                    style={{ 
                      width: `${Math.min(100, Math.max(3, (completedCount / 50) * 100))}%`,
                      backgroundColor: meta.accentColor 
                    }}
                  />
                </div>
              </div>
            );
          })}
        </div>
      </div>

    </div>
  );
};
