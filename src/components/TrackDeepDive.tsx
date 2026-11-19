import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { TrackId, HorizonId } from '../types/roadmap';
import { TRACKS_META, TRACKS_ORDER, HORIZONS } from '../data/tracksMeta';
import { 
  ALL_590_DATES, 
  generateGoalForTrack, 
  getMonthGroups, 
  MonthGroup,
  parseDateUTC,
  daysBetween,
  START_DATE
} from '../utils/scheduleEngine';
import { 
  Check, 
  ChevronDown, 
  Calendar, 
  Filter, 
  ExternalLink, 
  Layers,
  Sparkles,
  Code2,
  GitFork,
  GraduationCap,
  Cpu,
  ShieldCheck,
  TrendingUp,
  Briefcase,
  Landmark
} from 'lucide-react';

interface TrackDeepDiveProps {
  activeTrack: TrackId;
  onSelectTrack: (trackId: TrackId) => void;
  goalCompletions: Record<string, boolean>;
  onToggleGoal: (goalId: string) => void;
  onJumpToDate: (dateStr: string) => void;
}

const ICONS: Record<string, React.FC<{ className?: string }>> = {
  Code2,
  GitFork,
  GraduationCap,
  Cpu,
  ShieldCheck,
  TrendingUp,
  Briefcase,
  Landmark,
};

export const TrackDeepDive: React.FC<TrackDeepDiveProps> = ({
  activeTrack,
  onSelectTrack,
  goalCompletions,
  onToggleGoal,
  onJumpToDate,
}) => {
  const meta = TRACKS_META[activeTrack];
  const IconComponent = ICONS[meta.icon] || Code2;
  const monthGroups = useMemo(() => getMonthGroups(), []);

  const [selectedHorizonFilter, setSelectedHorizonFilter] = useState<HorizonId | 'all'>('all');
  const [openMonthKey, setOpenMonthKey] = useState<string>(monthGroups[0]?.monthKey || '2026-11');

  // Filtered month groups based on horizon
  const filteredMonths = useMemo(() => {
    if (selectedHorizonFilter === 'all') return monthGroups;
    return monthGroups.filter(m => m.horizonId === selectedHorizonFilter);
  }, [monthGroups, selectedHorizonFilter]);

  // Track completion count
  const completedInTrack = useMemo(() => {
    let count = 0;
    for (const dateStr of ALL_590_DATES) {
      if (goalCompletions[`${dateStr}_${activeTrack}`]) {
        count++;
      }
    }
    return count;
  }, [goalCompletions, activeTrack]);

  const trackPercent = Math.round((completedInTrack / ALL_590_DATES.length) * 100);

  return (
    <div className="space-y-6">
      
      {/* 8 Track Selector Ribbon */}
      <div className="w-full overflow-x-auto pb-2 no-scrollbar">
        <div className="flex items-center gap-2 min-w-max">
          {TRACKS_ORDER.map((tid) => {
            const tMeta = TRACKS_META[tid];
            const TIcon = ICONS[tMeta.icon] || Code2;
            const isSelected = activeTrack === tid;

            return (
              <button
                key={tid}
                onClick={() => onSelectTrack(tid)}
                className={`flex items-center gap-2 px-3.5 py-2.5 rounded-xl border text-xs font-semibold transition-all ${
                  isSelected
                    ? 'border-white/30 text-white shadow-lg'
                    : 'border-white/5 bg-obsidian-800/80 light:bg-paper-200 text-slate-400 hover:text-white light:text-paper-800'
                }`}
                style={{
                  backgroundColor: isSelected ? tMeta.bgRgba : undefined,
                  borderColor: isSelected ? tMeta.accentColor : undefined,
                  boxShadow: isSelected ? `0 0 20px -3px ${tMeta.accentColor}30` : undefined,
                }}
              >
                <div 
                  className="w-2 h-2 rounded-full"
                  style={{ backgroundColor: tMeta.accentColor }}
                />
                <TIcon className="w-4 h-4" />
                <span>{tMeta.name}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Track Spotlight Header & Summary */}
      <div 
        className="glass-panel rounded-2xl p-5 border"
        style={{ borderColor: `${meta.accentColor}40` }}
      >
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2.5 mb-1.5">
              <span 
                className="font-mono text-xs font-black px-2.5 py-1 rounded tracking-wider flex items-center gap-1.5"
                style={{ backgroundColor: meta.bgRgba, color: meta.accentColor }}
              >
                <IconComponent className="w-4 h-4" />
                <span>{meta.code}</span>
              </span>
              <h2 className="text-xl sm:text-2xl font-serif text-white light:text-paper-900 tracking-tight">
                {meta.name}
              </h2>
            </div>
            <p className="text-xs sm:text-sm text-slate-300 light:text-paper-800 max-w-2xl leading-relaxed">
              {meta.description}
            </p>
          </div>

          <div className="flex items-center gap-4 shrink-0">
            <div className="text-right">
              <div className="text-2xl font-mono font-bold text-white light:text-paper-900">
                {completedInTrack} <span className="text-sm text-slate-400">/ 590</span>
              </div>
              <div className="text-xs text-slate-400 font-mono">
                {trackPercent}% Timeline Complete
              </div>
            </div>

            <div 
              className="w-14 h-14 rounded-2xl flex items-center justify-center border font-mono font-bold text-lg"
              style={{ 
                backgroundColor: meta.bgRgba, 
                borderColor: meta.accentColor,
                color: meta.accentColor 
              }}
            >
              {trackPercent}%
            </div>
          </div>
        </div>

        {/* 590-Day GitHub-Style Activity Heatmap */}
        <div className="mt-6 pt-5 border-t border-white/10 light:border-paper-300">
          <div className="flex items-center justify-between text-xs mb-3">
            <span className="font-mono uppercase tracking-wider text-slate-400 light:text-paper-800 flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5" style={{ color: meta.accentColor }} />
              <span>Full 590-Day Trajectory Heatmap (Nov 19, 2026 → Jun 30, 2028):</span>
            </span>
            <div className="flex items-center gap-2 text-[10px] font-mono text-slate-400">
              <span>Pending</span>
              <div className="w-2.5 h-2.5 rounded-sm bg-obsidian-800 light:bg-paper-300 border border-white/10" />
              <div className="w-2.5 h-2.5 rounded-sm" style={{ backgroundColor: meta.accentColor }} />
              <span>Completed</span>
            </div>
          </div>

          <div className="w-full overflow-x-auto pb-2 no-scrollbar">
            <div className="grid grid-flow-col grid-rows-7 gap-1 min-w-max">
              {ALL_590_DATES.map((dateStr, idx) => {
                const goalId = `${dateStr}_${activeTrack}`;
                const isDone = Boolean(goalCompletions[goalId]);
                const dayNum = idx + 1;

                return (
                  <button
                    key={dateStr}
                    onClick={() => onJumpToDate(dateStr)}
                    className={`w-3 h-3 rounded-[3px] transition-all hover:scale-125 hover:z-20 ${
                      isDone
                        ? 'shadow-sm'
                        : 'bg-obsidian-800/80 light:bg-paper-300 border border-white/5 hover:border-white/30'
                    }`}
                    style={{
                      backgroundColor: isDone ? meta.accentColor : undefined,
                    }}
                    title={`Day ${dayNum} (${dateStr}): ${isDone ? 'Completed' : 'Pending'}`}
                  />
                );
              })}
            </div>
          </div>
        </div>
      </div>

      {/* Horizon Filter Tabs */}
      <div className="flex items-center flex-wrap gap-2">
        <span className="text-xs font-mono text-slate-400 mr-2 flex items-center gap-1">
          <Filter className="w-3 h-3" /> Filter Horizon:
        </span>
        <button
          onClick={() => setSelectedHorizonFilter('all')}
          className={`px-3 py-1.5 rounded-lg text-xs font-mono transition-all ${
            selectedHorizonFilter === 'all'
              ? 'bg-violet-600 text-white font-bold'
              : 'bg-obsidian-800 light:bg-paper-200 text-slate-400 hover:text-white'
          }`}
        >
          All 4 Horizons (590 Days)
        </button>

        {Object.values(HORIZONS).map(h => (
          <button
            key={h.id}
            onClick={() => setSelectedHorizonFilter(h.id)}
            className={`px-3 py-1.5 rounded-lg text-xs font-mono transition-all ${
              selectedHorizonFilter === h.id
                ? 'bg-violet-600 text-white font-bold'
                : 'bg-obsidian-800 light:bg-paper-200 text-slate-400 hover:text-white'
            }`}
          >
            {h.code}
          </button>
        ))}
      </div>

      {/* Collapsible Month Accordions */}
      <div className="space-y-3">
        {filteredMonths.map((mGroup) => {
          const isOpen = openMonthKey === mGroup.monthKey;
          const monthCompletedCount = mGroup.dates.filter(
            d => goalCompletions[`${d}_${activeTrack}`]
          ).length;

          return (
            <div 
              key={mGroup.monthKey}
              className="glass-panel rounded-2xl border border-white/10 light:border-paper-300 overflow-hidden"
            >
              {/* Month Header Trigger */}
              <div
                onClick={() => setOpenMonthKey(isOpen ? '' : mGroup.monthKey)}
                className="p-4 cursor-pointer flex items-center justify-between hover:bg-white/[0.02] light:hover:bg-paper-200/50 select-none transition-colors"
              >
                <div className="flex items-center gap-3">
                  <Calendar className="w-4 h-4 text-violet-400" />
                  <h3 className="font-serif text-lg text-white light:text-paper-900">
                    {mGroup.displayName}
                  </h3>
                  <span className="font-mono text-xs text-slate-400 light:text-paper-800">
                    ({mGroup.dates.length} Days)
                  </span>
                </div>

                <div className="flex items-center gap-3">
                  <span className="font-mono text-xs px-2.5 py-1 rounded-md bg-obsidian-800 light:bg-paper-200 border border-white/10 text-slate-300 light:text-paper-900">
                    {monthCompletedCount} / {mGroup.dates.length} Done
                  </span>

                  <motion.div
                    animate={{ rotate: isOpen ? 180 : 0 }}
                    transition={{ duration: 0.2 }}
                    className="text-slate-400"
                  >
                    <ChevronDown className="w-4 h-4" />
                  </motion.div>
                </div>
              </div>

              {/* Month Daily Cards Drawer */}
              <AnimatePresence>
                {isOpen && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.25 }}
                    className="border-t border-white/5 light:border-paper-200 p-4 divide-y divide-white/5 light:divide-paper-200"
                  >
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pt-1">
                      {mGroup.dates.map((dateStr) => {
                        const goal = generateGoalForTrack(activeTrack, dateStr);
                        const isDone = Boolean(goalCompletions[goal.id]);
                        const dayNum = daysBetween(START_DATE, dateStr) + 1;

                        return (
                          <div
                            key={dateStr}
                            className={`p-3.5 rounded-xl border transition-all ${
                              isDone
                                ? 'bg-emerald-950/15 border-emerald-500/20'
                                : 'bg-obsidian-800/60 light:bg-paper-100 border-white/5 hover:border-white/15'
                            }`}
                          >
                            <div className="flex items-start justify-between gap-2.5 mb-2">
                              <div className="flex items-center gap-2">
                                <button
                                  onClick={() => onToggleGoal(goal.id)}
                                  className={`w-5 h-5 rounded-md flex items-center justify-center border transition-all ${
                                    isDone
                                      ? 'bg-emerald-500 border-emerald-400 text-obsidian-950'
                                      : 'border-white/20 bg-obsidian-900'
                                  }`}
                                >
                                  {isDone && <Check className="w-3.5 h-3.5 stroke-[3]" />}
                                </button>

                                <span className="font-mono text-xs font-bold text-slate-300 light:text-paper-900">
                                  {dateStr}
                                </span>
                                <span className="font-mono text-[10px] text-slate-500">
                                  DAY {dayNum}
                                </span>
                              </div>

                              <button
                                onClick={() => onJumpToDate(dateStr)}
                                className="text-[11px] font-mono text-violet-400 hover:underline"
                              >
                                Jump to Today View
                              </button>
                            </div>

                            <h4 className={`text-xs font-semibold leading-relaxed mb-2 ${
                              isDone ? 'line-through text-slate-500' : 'text-slate-200 light:text-paper-900'
                            }`}>
                              {goal.title}
                            </h4>

                            <div className="space-y-1">
                              {goal.subtasks.map((st, i) => (
                                <div key={st.id} className="text-[11px] text-slate-400 light:text-paper-800 flex items-start gap-1.5">
                                  <span className="font-mono text-[10px] text-slate-500">#{i + 1}</span>
                                  <span>{st.text}</span>
                                </div>
                              ))}
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          );
        })}
      </div>

    </div>
  );
};
