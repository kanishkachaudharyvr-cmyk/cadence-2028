import React, { useState, useRef } from 'react';
import { 
  Flame, 
  Sun, 
  Moon, 
  Download, 
  Upload, 
  FileSpreadsheet, 
  Bookmark, 
  BookOpen, 
  SlidersHorizontal,
  ChevronDown,
  Sparkles,
  Clock,
  Flag
} from 'lucide-react';
import { getMilestoneTimers, MilestoneTimer } from '../utils/academicCalendarEngine';

interface HeaderProps {
  currentDateStr: string;
  theme: 'dark' | 'light';
  onToggleTheme: () => void;
  stats: {
    totalCompletedTracks: number;
    totalTopicsLogged: number;
    needsRevisionCount: number;
    currentStreak: number;
    longestStreak: number;
  };
  onOpenRoutineModal: () => void;
  onExportJSON: () => void;
  onImportJSON: (jsonStr: string) => void;
  onExportCSV: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  currentDateStr,
  theme,
  onToggleTheme,
  stats,
  onOpenRoutineModal,
  onExportJSON,
  onImportJSON,
  onExportCSV,
}) => {
  const [showExportMenu, setShowExportMenu] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const milestoneTimers = getMilestoneTimers(currentDateStr);

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        const text = event.target?.result as string;
        onImportJSON(text);
      };
      reader.readAsText(file);
    }
  };

  return (
    <header className="w-full border-b border-white/10 light:border-paper-300 bg-obsidian-950/80 light:bg-paper-50/90 backdrop-blur-md sticky top-0 z-40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3.5">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-3">
          
          {/* Identity & Title */}
          <div className="flex items-center gap-3.5">
            <div className="relative flex items-center justify-center w-11 h-11 rounded-xl bg-gradient-to-br from-indigo-500 via-purple-600 to-rose-500 p-[1px] shadow-lg shadow-purple-500/20">
              <div className="w-full h-full bg-obsidian-900 light:bg-paper-100 rounded-[11px] flex items-center justify-center font-mono font-black text-sm tracking-tighter text-white light:text-paper-900">
                CD
              </div>
            </div>

            <div>
              <div className="flex items-center gap-2.5">
                <h1 className="text-xl sm:text-2xl font-serif tracking-tight text-white light:text-paper-900 flex items-center gap-2">
                  <span>CADENCE</span>
                  <span className="font-mono text-xs font-semibold px-2 py-0.5 rounded bg-violet-500/20 text-violet-300 border border-violet-500/30">
                    // 2028
                  </span>
                </h1>
                <span className="text-[11px] font-mono text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-2 py-0.5 rounded-full font-semibold">
                  ADAPTIVE PLANNER
                </span>
              </div>

              <p className="text-xs text-slate-400 light:text-paper-800 flex items-center gap-1.5 mt-0.5">
                <span className="font-medium text-slate-300 light:text-paper-900">Kanishka Chaudhary</span>
                <span>•</span>
                <span>B.E. Information Technology, Univ. of Mumbai (Class of 2028)</span>
              </p>
            </div>
          </div>

          {/* Quick Metrics & Controls */}
          <div className="flex items-center flex-wrap gap-2.5">
            {/* Streak Counter */}
            <div 
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-orange-500/10 border border-orange-500/20 text-orange-400 text-xs font-mono font-bold cursor-default"
              title={`Current Streak: ${stats.currentStreak} days | Longest: ${stats.longestStreak} days`}
            >
              <Flame className="w-4 h-4 fill-orange-500 text-orange-500 animate-pulse" />
              <span>{stats.currentStreak}</span>
              <span className="text-[10px] text-orange-300/70 font-normal">STREAK</span>
            </div>

            {/* Total Logged Topics */}
            <div 
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-blue-500/10 border border-blue-500/20 text-blue-300 text-xs font-mono"
              title="Total Topics Studied & Logged"
            >
              <BookOpen className="w-3.5 h-3.5 text-blue-400" />
              <span>{stats.totalTopicsLogged}</span>
              <span className="text-[10px] text-blue-300/70 font-normal hidden sm:inline">TOPICS</span>
            </div>

            {/* Needs Revision Pill */}
            {stats.needsRevisionCount > 0 && (
              <div 
                className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg bg-rose-500/10 border border-rose-500/25 text-rose-300 text-xs font-mono"
                title={`${stats.needsRevisionCount} topics flagged for revision`}
              >
                <Bookmark className="w-3.5 h-3.5 text-rose-400" />
                <span>{stats.needsRevisionCount}</span>
                <span className="text-[10px] text-rose-300/70 font-normal hidden sm:inline">TO REVISE</span>
              </div>
            )}

            {/* Customize Routine Blueprint */}
            <button
              onClick={onOpenRoutineModal}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-obsidian-800 hover:bg-obsidian-700 light:bg-paper-200 light:hover:bg-paper-300 border border-white/10 light:border-paper-300 text-slate-300 light:text-paper-900 text-xs transition-colors"
              title="Customize Weekly Routine & Academic Blueprint"
            >
              <SlidersHorizontal className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Routine</span>
            </button>

            {/* Export / Backup Dropdown */}
            <div className="relative">
              <button
                onClick={() => setShowExportMenu(!showExportMenu)}
                className="flex items-center gap-1 px-2.5 py-2 rounded-lg bg-obsidian-800 hover:bg-obsidian-700 light:bg-paper-200 light:hover:bg-paper-300 border border-white/10 light:border-paper-300 text-slate-300 light:text-paper-900 text-xs transition-colors"
                title="Backup & Export Options"
              >
                <Download className="w-3.5 h-3.5" />
                <ChevronDown className="w-3 h-3 text-slate-400" />
              </button>

              {showExportMenu && (
                <div className="absolute right-0 mt-2 w-52 rounded-xl bg-obsidian-900 light:bg-paper-100 border border-white/10 light:border-paper-300 shadow-2xl p-1.5 z-50 animate-in fade-in zoom-in-95">
                  <button
                    onClick={() => { onExportJSON(); setShowExportMenu(false); }}
                    className="w-full flex items-center gap-2 px-3 py-2 rounded-lg text-xs text-slate-200 light:text-paper-900 hover:bg-white/5 light:hover:bg-paper-200 text-left transition-colors"
                  >
                    <Download className="w-3.5 h-3.5 text-emerald-400" />
                    <span>Export Full Journal (.json)</span>
                  </button>

                  <button
                    onClick={() => { fileInputRef.current?.click(); setShowExportMenu(false); }}
                    className="w-full flex items-center gap-2 px-3 py-2 rounded-lg text-xs text-slate-200 light:text-paper-900 hover:bg-white/5 light:hover:bg-paper-200 text-left transition-colors"
                  >
                    <Upload className="w-3.5 h-3.5 text-purple-400" />
                    <span>Restore Journal (.json)</span>
                  </button>

                  <button
                    onClick={() => { onExportCSV(); setShowExportMenu(false); }}
                    className="w-full flex items-center gap-2 px-3 py-2 rounded-lg text-xs text-slate-200 light:text-paper-900 hover:bg-white/5 light:hover:bg-paper-200 text-left transition-colors border-t border-white/5 light:border-paper-200 mt-1 pt-2"
                  >
                    <FileSpreadsheet className="w-3.5 h-3.5 text-blue-400" />
                    <span>Export Topic Log (.csv)</span>
                  </button>
                </div>
              )}
              <input 
                type="file" 
                ref={fileInputRef} 
                onChange={handleFileUpload} 
                accept=".json" 
                className="hidden" 
              />
            </div>

            {/* Theme Toggle */}
            <button
              onClick={onToggleTheme}
              className="p-2 rounded-lg bg-obsidian-800 hover:bg-obsidian-700 light:bg-paper-200 light:hover:bg-paper-300 border border-white/10 light:border-paper-300 text-amber-400 light:text-paper-900 transition-colors"
              title={`Switch to ${theme === 'dark' ? 'Paper Light' : 'Obsidian Dark'} Mode`}
            >
              {theme === 'dark' ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
            </button>
          </div>

        </div>

        {/* Live Milestone Countdown Ribbon */}
        <div className="mt-3 pt-2.5 border-t border-white/5 light:border-paper-200 overflow-x-auto no-scrollbar">
          <div className="flex items-center gap-2 min-w-max">
            <div className="flex items-center gap-1.5 px-3 py-1 rounded-lg bg-obsidian-800/80 light:bg-paper-100 border border-white/5 text-[11px] font-mono text-slate-400">
              <Clock className="w-3 h-3 text-purple-400" />
              <span>EXAM TIMERS:</span>
            </div>

            {milestoneTimers.map((m) => (
              <div
                key={m.id}
                className="flex items-center gap-2 px-3 py-1 rounded-lg border border-white/10 bg-obsidian-800/60 light:bg-white/80 light:border-paper-300 text-xs"
              >
                <div 
                  className="w-2 h-2 rounded-full"
                  style={{ backgroundColor: m.color }}
                />
                <span className="font-semibold text-slate-200 light:text-paper-900">
                  {m.name}
                </span>
                <span className="px-1.5 py-0.2 rounded text-[10px] font-mono uppercase bg-white/5 text-slate-400">
                  {m.badge}
                </span>
                <span className="font-mono font-bold ml-1 text-slate-100 light:text-paper-900">
                  {m.isPassed ? (
                    <span className="text-slate-500 flex items-center gap-1 text-[11px]">
                      <Flag className="w-3 h-3 text-emerald-400" /> Done
                    </span>
                  ) : m.daysRemaining === 0 ? (
                    <span className="text-amber-400 font-extrabold animate-bounce">
                      TODAY!
                    </span>
                  ) : (
                    <span>
                      <span style={{ color: m.color }}>{m.daysRemaining}</span>
                      <span className="text-slate-400 text-[10px] ml-0.5">d</span>
                    </span>
                  )}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </header>
  );
};
