import React from 'react';
import { motion } from 'framer-motion';
import { 
  X, 
  BarChart3, 
  Award, 
  Flame, 
  Timer, 
  CheckCircle2, 
  GraduationCap, 
  TrendingUp,
  Target
} from 'lucide-react';
import { HORIZONS, TRACKS_META, TRACKS_ORDER } from '../data/tracksMeta';
import { ALL_590_DATES, TOTAL_TIMELINE_DAYS } from '../utils/scheduleEngine';
import { TrackId, HorizonId } from '../types/roadmap';

interface AnalyticsModalProps {
  isOpen: boolean;
  onClose: () => void;
  stats: {
    currentStreak: number;
    longestStreak: number;
    completedGoalsCount: number;
    completedSubtasksCount: number;
    totalFocusMinutes: number;
    activeDaysCount: number;
  };
  goalCompletions: Record<string, boolean>;
}

export const AnalyticsModal: React.FC<AnalyticsModalProps> = ({
  isOpen,
  onClose,
  stats,
  goalCompletions,
}) => {
  if (!isOpen) return null;

  // Calculate track completions
  const trackStats: Record<TrackId, { completed: number; total: number; percentage: number }> = {} as any;
  for (const tid of TRACKS_ORDER) {
    let completed = 0;
    for (const d of ALL_590_DATES) {
      if (goalCompletions[`${d}_${tid}`]) completed++;
    }
    trackStats[tid] = {
      completed,
      total: TOTAL_TIMELINE_DAYS,
      percentage: Math.round((completed / TOTAL_TIMELINE_DAYS) * 100),
    };
  }

  // Calculate Horizon completions
  const horizonStats: Record<HorizonId, { completed: number; total: number; percentage: number }> = {} as any;
  for (const h of Object.values(HORIZONS)) {
    let completed = 0;
    let total = h.totalDays * 8; // 8 tracks per day
    for (const d of ALL_590_DATES) {
      if (d >= h.startDate && d <= h.endDate) {
        for (const tid of TRACKS_ORDER) {
          if (goalCompletions[`${d}_${tid}`]) completed++;
        }
      }
    }
    horizonStats[h.id] = {
      completed,
      total,
      percentage: total > 0 ? Math.round((completed / total) * 100) : 0,
    };
  }

  // Compute overall graduation readiness index
  const totalPossibleGoals = TOTAL_TIMELINE_DAYS * 8;
  const overallPercentage = Math.round((stats.completedGoalsCount / totalPossibleGoals) * 100);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-obsidian-950/80 backdrop-blur-md animate-in fade-in">
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        className="glass-panel w-full max-w-3xl max-h-[90vh] flex flex-col rounded-3xl p-6 sm:p-7 border border-white/10 light:border-paper-300 shadow-2xl relative"
      >
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-white/10 light:border-paper-300">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-xl bg-violet-500/10 text-violet-400 border border-violet-500/20">
              <BarChart3 className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-serif text-xl sm:text-2xl text-white light:text-paper-900">
                Graduation Analytics & Horizon Readiness
              </h3>
              <p className="text-xs text-slate-400 light:text-paper-800">
                590-Day Trajectory Metrics for Kanishka Chaudhary
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-full text-slate-400 hover:text-white hover:bg-white/10 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Body */}
        <div className="flex-1 overflow-y-auto space-y-6 py-4 pr-1">
          
          {/* Top KPI Cards */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            <div className="p-4 rounded-2xl bg-obsidian-800/80 light:bg-paper-200 border border-white/5">
              <div className="flex items-center gap-1.5 text-xs text-slate-400 mb-1">
                <Flame className="w-3.5 h-3.5 text-orange-400" />
                <span>Streak</span>
              </div>
              <div className="text-xl sm:text-2xl font-mono font-bold text-white light:text-paper-900">
                {stats.currentStreak} <span className="text-xs text-slate-400">/ max {stats.longestStreak}d</span>
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-obsidian-800/80 light:bg-paper-200 border border-white/5">
              <div className="flex items-center gap-1.5 text-xs text-slate-400 mb-1">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                <span>Goals Cleared</span>
              </div>
              <div className="text-xl sm:text-2xl font-mono font-bold text-white light:text-paper-900">
                {stats.completedGoalsCount}
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-obsidian-800/80 light:bg-paper-200 border border-white/5">
              <div className="flex items-center gap-1.5 text-xs text-slate-400 mb-1">
                <Timer className="w-3.5 h-3.5 text-purple-400" />
                <span>Deep Work</span>
              </div>
              <div className="text-xl sm:text-2xl font-mono font-bold text-white light:text-paper-900">
                {Math.floor(stats.totalFocusMinutes / 60)}h {stats.totalFocusMinutes % 60}m
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-obsidian-800/80 light:bg-paper-200 border border-white/5">
              <div className="flex items-center gap-1.5 text-xs text-slate-400 mb-1">
                <Target className="w-3.5 h-3.5 text-blue-400" />
                <span>Subtasks Done</span>
              </div>
              <div className="text-xl sm:text-2xl font-mono font-bold text-white light:text-paper-900">
                {stats.completedSubtasksCount}
              </div>
            </div>
          </div>

          {/* 4 Academic Horizons Breakdown */}
          <div>
            <h4 className="text-xs font-mono uppercase tracking-wider text-slate-400 light:text-paper-800 mb-3 flex items-center gap-1.5">
              <GraduationCap className="w-4 h-4 text-violet-400" />
              <span>4 Academic & Exam Horizons Progression:</span>
            </h4>

            <div className="space-y-3">
              {Object.values(HORIZONS).map((h) => {
                const hStat = horizonStats[h.id];

                return (
                  <div 
                    key={h.id} 
                    className="p-3.5 rounded-2xl bg-obsidian-800/60 light:bg-paper-200 border border-white/5"
                  >
                    <div className="flex items-center justify-between text-xs font-semibold mb-1">
                      <div className="flex items-center gap-2">
                        <span className="font-mono text-purple-400 font-bold">{h.code}:</span>
                        <span className="text-slate-200 light:text-paper-900">{h.name}</span>
                      </div>
                      <span className="font-mono text-slate-400">{h.period}</span>
                    </div>

                    <p className="text-[11px] text-slate-400 mb-2 leading-relaxed">
                      {h.focusSummary}
                    </p>

                    <div className="flex items-center justify-between text-[11px] font-mono text-slate-400 mb-1">
                      <span>{hStat.completed} / {hStat.total} Goals Cleared</span>
                      <span>{hStat.percentage}%</span>
                    </div>

                    <div className="w-full h-1.5 rounded-full bg-obsidian-900 light:bg-paper-300 overflow-hidden">
                      <div 
                        className="h-full bg-gradient-to-r from-violet-500 to-emerald-400 rounded-full transition-all duration-500"
                        style={{ width: `${Math.max(2, hStat.percentage)}%` }}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* 8 Tracks Readiness Grid */}
          <div>
            <h4 className="text-xs font-mono uppercase tracking-wider text-slate-400 light:text-paper-800 mb-3 flex items-center gap-1.5">
              <Award className="w-4 h-4 text-emerald-400" />
              <span>All 8 Specialization Tracks Velocity:</span>
            </h4>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {TRACKS_ORDER.map((tid) => {
                const meta = TRACKS_META[tid];
                const tStat = trackStats[tid];

                return (
                  <div
                    key={tid}
                    className="p-3.5 rounded-2xl bg-obsidian-800/60 light:bg-paper-200 border border-white/5"
                  >
                    <div className="flex items-center justify-between mb-1.5">
                      <div className="flex items-center gap-2">
                        <div 
                          className="w-2.5 h-2.5 rounded-full"
                          style={{ backgroundColor: meta.accentColor }}
                        />
                        <span className="text-xs font-semibold text-slate-200 light:text-paper-900">
                          {meta.name}
                        </span>
                      </div>
                      <span className="text-xs font-mono font-bold" style={{ color: meta.accentColor }}>
                        {tStat.percentage}%
                      </span>
                    </div>

                    <div className="w-full h-1.5 rounded-full bg-obsidian-900 light:bg-paper-300 overflow-hidden">
                      <div 
                        className="h-full rounded-full transition-all duration-500"
                        style={{ 
                          width: `${Math.max(1, tStat.percentage)}%`,
                          backgroundColor: meta.accentColor 
                        }}
                      />
                    </div>

                    <div className="flex items-center justify-between text-[10px] font-mono text-slate-400 mt-1.5">
                      <span>{meta.targetExam}</span>
                      <span>{tStat.completed} / 590 days</span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

        </div>

        {/* Footer */}
        <div className="pt-4 border-t border-white/10 light:border-paper-300 flex justify-end">
          <button
            onClick={onClose}
            className="px-5 py-2 rounded-xl bg-violet-600 hover:bg-violet-500 text-white text-xs font-semibold shadow-md shadow-violet-500/25"
          >
            Close Analytics
          </button>
        </div>
      </motion.div>
    </div>
  );
};
