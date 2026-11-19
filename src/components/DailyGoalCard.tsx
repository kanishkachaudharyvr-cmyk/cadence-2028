import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import confetti from 'canvas-confetti';
import { 
  DailyGoal, 
  TrackMeta, 
  MasteryStatus 
} from '../types/roadmap';
import { 
  Check, 
  ChevronDown, 
  Edit3, 
  Save, 
  ExternalLink, 
  FileText, 
  Timer, 
  Sparkles,
  BookOpen,
  Code2,
  GitFork,
  GraduationCap,
  Cpu,
  ShieldCheck,
  TrendingUp,
  Briefcase,
  Landmark
} from 'lucide-react';

interface DailyGoalCardProps {
  goal: DailyGoal;
  trackMeta: TrackMeta;
  isCompleted: boolean;
  subtaskCompletions: Record<string, boolean>;
  notes: string;
  customTitle?: string;
  customYoutubeLink?: string;
  masteryStatus: MasteryStatus;
  onToggleGoal: (goalId: string) => void;
  onToggleSubtask: (goalId: string, subtaskId: string) => void;
  onUpdateNotes: (goalId: string, notes: string) => void;
  onUpdateCustomTitle: (goalId: string, title: string) => void;
  onUpdateCustomYoutubeLink: (goalId: string, link: string) => void;
  onUpdateMasteryStatus: (goalId: string, status: MasteryStatus) => void;
  onStartPomodoro: (trackId: string, taskTitle: string) => void;
}

// Map Lucide icons
const YoutubeIcon: React.FC<{ className?: string }> = ({ className = "w-4 h-4" }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
  </svg>
);

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

export const DailyGoalCard: React.FC<DailyGoalCardProps> = ({
  goal,
  trackMeta,
  isCompleted,
  subtaskCompletions,
  notes,
  customTitle,
  customYoutubeLink,
  masteryStatus,
  onToggleGoal,
  onToggleSubtask,
  onUpdateNotes,
  onUpdateCustomTitle,
  onUpdateCustomYoutubeLink,
  onUpdateMasteryStatus,
  onStartPomodoro,
}) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [isEditingTitle, setIsEditingTitle] = useState(false);
  const [titleInput, setTitleInput] = useState(customTitle || goal.title);
  const [noteInput, setNoteInput] = useState(notes || '');
  const [customLinkInput, setCustomLinkInput] = useState(customYoutubeLink || '');

  const displayTitle = customTitle || goal.title;
  const IconComponent = ICONS[trackMeta.icon] || Code2;

  // Calculate completed subtasks count
  const completedSubtasksCount = goal.subtasks.filter(
    st => subtaskCompletions[st.id]
  ).length;

  const triggerConfetti = () => {
    confetti({
      particleCount: 40,
      spread: 60,
      origin: { y: 0.7 },
      colors: [trackMeta.accentColor, '#ffffff', '#8B5CF6'],
    });
  };

  const handleGoalCheck = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!isCompleted) {
      triggerConfetti();
    }
    onToggleGoal(goal.id);
  };

  const handleSaveTitle = (e: React.MouseEvent) => {
    e.stopPropagation();
    onUpdateCustomTitle(goal.id, titleInput);
    setIsEditingTitle(false);
  };

  const handleSaveNotes = () => {
    onUpdateNotes(goal.id, noteInput);
  };

  const handleSaveLink = () => {
    onUpdateCustomYoutubeLink(goal.id, customLinkInput);
  };

  const isCompetitiveExam = ['gate', 'afcat', 'cat', 'ssc', 'upsc'].includes(goal.trackId);

  // Determine YouTube URL to navigate to if curated channel exists
  const hasCuratedChannel = !isCompetitiveExam && Boolean(goal.youtubeChannel);
  const youtubeSearchUrl = customYoutubeLink || 
    (trackMeta.channels[0]?.url ? trackMeta.channels[0].url : `https://www.youtube.com/results?search_query=${encodeURIComponent(goal.youtubeSearchQuery)}`);

  const masteryStatusLabels: Record<MasteryStatus, { label: string; colorClass: string }> = {
    pending: { label: 'Pending', colorClass: 'bg-slate-500/10 text-slate-400 border-slate-500/20' },
    in_progress: { label: 'In Progress', colorClass: 'bg-amber-500/10 text-amber-400 border-amber-500/20' },
    needs_revision: { label: 'Needs Revision', colorClass: 'bg-rose-500/10 text-rose-400 border-rose-500/20' },
    completed: { label: 'Completed', colorClass: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20' },
  };

  return (
    <motion.div
      layout
      transition={{ layout: { duration: 0.25, ease: 'easeOut' } }}
      className={`glass-panel rounded-2xl overflow-hidden border transition-all duration-300 ${
        isCompleted
          ? 'border-emerald-500/30 bg-emerald-950/10'
          : 'border-white/10 hover:border-white/20'
      }`}
      style={{
        boxShadow: isCompleted 
          ? `0 0 25px -5px ${trackMeta.accentColor}25` 
          : undefined
      }}
    >
      {/* Card Header (Always Visible & Collapsible Trigger) */}
      <div
        onClick={() => setIsExpanded(!isExpanded)}
        className="p-4 sm:p-5 cursor-pointer flex items-start justify-between gap-3 select-none"
      >
        <div className="flex items-start gap-3.5 flex-1 min-w-0">
          
          {/* Spring Checkbox */}
          <motion.button
            whileTap={{ scale: 0.8 }}
            onClick={handleGoalCheck}
            className={`w-6 h-6 rounded-lg flex items-center justify-center border transition-all mt-0.5 shrink-0 ${
              isCompleted
                ? 'bg-emerald-500 border-emerald-400 text-obsidian-950 shadow-md shadow-emerald-500/30'
                : 'border-white/20 hover:border-white/40 bg-obsidian-800/80 light:bg-paper-200'
            }`}
            title="Mark Goal Completed"
          >
            {isCompleted && (
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: 'spring', stiffness: 400, damping: 20 }}
              >
                <Check className="w-4 h-4 stroke-[3]" />
              </motion.div>
            )}
          </motion.button>

          {/* Track Info & Topic Title */}
          <div className="flex-1 min-w-0">
            <div className="flex items-center flex-wrap gap-2 mb-1">
              {/* Track Badge */}
              <span 
                className="font-mono text-[10px] font-black px-2 py-0.5 rounded tracking-wider flex items-center gap-1"
                style={{ backgroundColor: trackMeta.bgRgba, color: trackMeta.accentColor }}
              >
                <IconComponent className="w-3 h-3" />
                <span>{trackMeta.code}</span>
              </span>

              {/* Target Exam or Milestone */}
              <span className="text-[11px] text-slate-400 light:text-paper-800 font-medium truncate">
                {trackMeta.targetExam}
              </span>

              {/* Priority or Post-Exam Indicator */}
              {goal.isPostExamMaintenance ? (
                <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-blue-500/10 text-blue-400 border border-blue-500/20">
                  Skill Maintenance
                </span>
              ) : goal.priority === 'critical' ? (
                <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-rose-500/10 text-rose-400 border border-rose-500/20">
                  Core Horizon Sprint
                </span>
              ) : null}
            </div>

            {/* Editable Title */}
            {isEditingTitle ? (
              <div 
                className="flex items-center gap-2 mt-1" 
                onClick={(e) => e.stopPropagation()}
              >
                <input
                  type="text"
                  value={titleInput}
                  onChange={(e) => setTitleInput(e.target.value)}
                  className="flex-1 bg-obsidian-800 light:bg-paper-200 text-white light:text-paper-900 text-sm px-2.5 py-1 rounded-lg border border-violet-500/50 focus:outline-none"
                  autoFocus
                />
                <button
                  onClick={handleSaveTitle}
                  className="p-1.5 rounded-lg bg-violet-600 hover:bg-violet-500 text-white text-xs"
                >
                  <Save className="w-3.5 h-3.5" />
                </button>
              </div>
            ) : (
              <div className="flex items-center gap-2 group">
                <h3 className={`text-sm sm:text-base font-semibold leading-snug transition-colors ${
                  isCompleted 
                    ? 'line-through text-slate-400 light:text-paper-800' 
                    : 'text-white light:text-paper-900 group-hover:text-violet-300'
                }`}>
                  {displayTitle}
                </h3>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setIsEditingTitle(true);
                  }}
                  className="opacity-0 group-hover:opacity-100 p-1 text-slate-400 hover:text-white transition-opacity"
                  title="Customize Topic Title"
                >
                  <Edit3 className="w-3.5 h-3.5" />
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Right side: Subtask Pill + Expand Chevron */}
        <div className="flex items-center gap-2.5 shrink-0">
          <span className={`font-mono text-xs px-2 py-0.5 rounded-md font-semibold border ${
            completedSubtasksCount === 3
              ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20'
              : 'bg-white/5 text-slate-400 border-white/10'
          }`}>
            {completedSubtasksCount}/3
          </span>

          <motion.div
            animate={{ rotate: isExpanded ? 180 : 0 }}
            transition={{ duration: 0.2 }}
            className="text-slate-400 p-1"
          >
            <ChevronDown className="w-4 h-4" />
          </motion.div>
        </div>
      </div>

      {/* Accordion Drawer */}
      <AnimatePresence>
        {isExpanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25, ease: 'easeInOut' }}
            className="border-t border-white/5 light:border-paper-200 bg-obsidian-900/60 light:bg-paper-100/60 p-4 sm:p-5"
          >
            {/* 3 Concrete Actionable Subtasks */}
            <div className="mb-4">
              <h4 className="text-xs font-mono uppercase tracking-wider text-slate-400 light:text-paper-800 mb-2.5 flex items-center gap-1.5">
                <BookOpen className="w-3.5 h-3.5 text-violet-400" />
                <span>Actionable Milestone Subtasks:</span>
              </h4>

              <div className="space-y-2">
                {goal.subtasks.map((subtask, idx) => {
                  const isSubtaskDone = Boolean(subtaskCompletions[subtask.id]);

                  return (
                    <div
                      key={subtask.id}
                      onClick={() => onToggleSubtask(goal.id, subtask.id)}
                      className={`flex items-start gap-2.5 p-2.5 rounded-xl border text-xs sm:text-sm cursor-pointer transition-all ${
                        isSubtaskDone
                          ? 'bg-emerald-500/5 border-emerald-500/20 text-slate-300 light:text-paper-800 line-through'
                          : 'bg-obsidian-800/80 light:bg-paper-200 border-white/5 hover:border-white/15 text-slate-200 light:text-paper-900'
                      }`}
                    >
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          onToggleSubtask(goal.id, subtask.id);
                        }}
                        className={`w-4 h-4 rounded mt-0.5 flex items-center justify-center border transition-all ${
                          isSubtaskDone
                            ? 'bg-emerald-500 border-emerald-400 text-obsidian-950'
                            : 'border-white/30 bg-transparent'
                        }`}
                      >
                        {isSubtaskDone && <Check className="w-3 h-3 stroke-[3]" />}
                      </button>

                      <span className="flex-1 leading-relaxed">
                        <span className="font-mono text-[10px] text-slate-400 mr-1.5">
                          #{idx + 1}
                        </span>
                        {subtask.text}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Study Resource / Lecture Section */}
            {hasCuratedChannel ? (
              <div className="mb-4 flex flex-col sm:flex-row sm:items-center justify-between gap-2.5 p-3 rounded-xl bg-obsidian-800/70 light:bg-paper-200 border border-white/5">
                <div className="flex items-center gap-2">
                  <div className="p-1.5 rounded-lg bg-red-500/10 text-red-400">
                    <YoutubeIcon className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="text-xs font-semibold text-slate-200 light:text-paper-900 flex items-center gap-1.5">
                      <span>Curated Channel: {goal.youtubeChannel}</span>
                    </div>
                    <div className="text-[11px] text-slate-400 light:text-paper-800">
                      Query: <span className="font-mono text-slate-300 light:text-paper-900">{goal.youtubeSearchQuery}</span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <a
                    href={youtubeSearchUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-red-600 hover:bg-red-500 text-white text-xs font-medium transition-colors shrink-0"
                  >
                    <span>Open Video</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>

                  <button
                    onClick={() => onStartPomodoro(goal.trackId, displayTitle)}
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-purple-600 hover:bg-purple-500 text-white text-xs font-medium transition-colors shrink-0"
                    title="Launch Pomodoro Focus Timer on this task"
                  >
                    <Timer className="w-3 h-3" />
                    <span>Pomodoro</span>
                  </button>
                </div>
              </div>
            ) : (
              <div className="mb-4 flex flex-col sm:flex-row sm:items-center justify-between gap-2.5 p-3 rounded-xl bg-obsidian-800/50 light:bg-paper-200 border border-white/5">
                <div className="flex-1 min-w-0">
                  <div className="text-xs font-semibold text-slate-300 light:text-paper-900 flex items-center gap-1.5">
                    <BookOpen className="w-3.5 h-3.5 text-amber-400" />
                    <span>Self-Study & Custom Source Notes (No Predefined Videos)</span>
                  </div>
                  <div className="flex items-center gap-2 mt-1.5">
                    <input
                      type="url"
                      value={customLinkInput}
                      onChange={(e) => setCustomLinkInput(e.target.value)}
                      onBlur={handleSaveLink}
                      placeholder="Paste your own coaching lecture / book PDF / drive link..."
                      className="flex-1 bg-obsidian-900/80 light:bg-paper-100 text-white light:text-paper-900 text-xs px-2.5 py-1 rounded-lg border border-white/10 focus:outline-none focus:border-violet-500"
                    />
                    {customLinkInput && (
                      <a
                        href={customLinkInput}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-1.5 rounded-lg bg-violet-600 hover:bg-violet-500 text-white text-xs transition-colors"
                        title="Open your custom study link"
                      >
                        <ExternalLink className="w-3.5 h-3.5" />
                      </a>
                    )}
                  </div>
                </div>

                <div className="flex items-center justify-end shrink-0 sm:self-end">
                  <button
                    onClick={() => onStartPomodoro(goal.trackId, displayTitle)}
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-purple-600 hover:bg-purple-500 text-white text-xs font-medium transition-colors shrink-0"
                    title="Launch Pomodoro Focus Timer on this task"
                  >
                    <Timer className="w-3 h-3" />
                    <span>Pomodoro</span>
                  </button>
                </div>
              </div>
            )}

            {/* Mastery Tag Selector */}
            <div className="mb-4">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-mono uppercase tracking-wider text-slate-400 light:text-paper-800">
                  Mastery Stage:
                </span>
                <span className={`text-[11px] font-mono px-2 py-0.5 rounded border ${masteryStatusLabels[masteryStatus].colorClass}`}>
                  {masteryStatusLabels[masteryStatus].label}
                </span>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                {(['pending', 'in_progress', 'needs_revision', 'completed'] as MasteryStatus[]).map((st) => (
                  <button
                    key={st}
                    onClick={() => onUpdateMasteryStatus(goal.id, st)}
                    className={`py-1.5 px-2 rounded-lg text-xs font-medium border text-center transition-all ${
                      masteryStatus === st
                        ? 'bg-violet-600 text-white border-violet-400 shadow-md shadow-violet-500/20'
                        : 'bg-obsidian-800 light:bg-paper-200 border-white/5 text-slate-400 hover:text-white light:text-paper-800'
                    }`}
                  >
                    {masteryStatusLabels[st].label}
                  </button>
                ))}
              </div>
            </div>

            {/* Personal Notes & Scratchpad */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="text-xs font-mono uppercase tracking-wider text-slate-400 light:text-paper-800 flex items-center gap-1.5">
                  <FileText className="w-3.5 h-3.5 text-emerald-400" />
                  <span>Personal Scratchpad & Study Notes:</span>
                </label>
                <button
                  onClick={handleSaveNotes}
                  className="text-[11px] font-mono text-emerald-400 hover:underline flex items-center gap-1"
                >
                  <Save className="w-3 h-3" /> Auto-saved
                </button>
              </div>

              <textarea
                value={noteInput}
                onChange={(e) => {
                  setNoteInput(e.target.value);
                  onUpdateNotes(goal.id, e.target.value);
                }}
                placeholder="Log problem codes, solved LeetCode numbers, lecture timestamps, formulas or questions for faculty..."
                rows={3}
                className="w-full bg-obsidian-800 light:bg-paper-200 text-slate-200 light:text-paper-900 text-xs sm:text-sm p-3 rounded-xl border border-white/10 light:border-paper-300 focus:outline-none focus:border-violet-500 placeholder-slate-500"
              />
            </div>

          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};
