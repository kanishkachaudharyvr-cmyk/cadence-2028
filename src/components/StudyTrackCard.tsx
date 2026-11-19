import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import confetti from 'canvas-confetti';
import { 
  Check, 
  ChevronDown, 
  FileText, 
  Clock, 
  Bookmark, 
  Trash2, 
  GraduationCap, 
  GitFork, 
  Code2, 
  Cpu, 
  ShieldCheck, 
  TrendingUp, 
  Briefcase, 
  Landmark,
  Save,
  CheckCircle2
} from 'lucide-react';
import { TrackId, StudyEntry, ConfidenceLevel } from '../types/study';
import { TRACKS_INFO } from '../data/tracksData';

interface StudyTrackCardProps {
  trackId: TrackId;
  entry: StudyEntry;
  onToggleCompletion: (trackId: TrackId) => void;
  onUpdateTopic: (trackId: TrackId, topic: string) => void;
  onUpdateNotes: (trackId: TrackId, notes: string) => void;
  onUpdateTimeSpent: (trackId: TrackId, timeSpent: string) => void;
  onUpdateConfidence: (trackId: TrackId, confidence: ConfidenceLevel) => void;
  onRemoveTrack: (trackId: TrackId) => void;
}

const ICONS: Record<string, React.FC<{ className?: string }>> = {
  GraduationCap,
  GitFork,
  Code2,
  Cpu,
  ShieldCheck,
  TrendingUp,
  Briefcase,
  Landmark,
};

export const StudyTrackCard: React.FC<StudyTrackCardProps> = ({
  trackId,
  entry,
  onToggleCompletion,
  onUpdateTopic,
  onUpdateNotes,
  onUpdateTimeSpent,
  onUpdateConfidence,
  onRemoveTrack,
}) => {
  const [isExpanded, setIsExpanded] = useState(true);
  const meta = TRACKS_INFO[trackId];
  const IconComponent = ICONS[meta.icon] || Code2;

  const triggerConfetti = () => {
    confetti({
      particleCount: 35,
      spread: 60,
      origin: { y: 0.7 },
      colors: [meta.accentColor, '#ffffff', '#8B5CF6'],
    });
  };

  const handleCheckbox = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!entry.completed) {
      triggerConfetti();
    }
    onToggleCompletion(trackId);
  };

  const timePills = ['30m', '1h', '2h', '3h+'];

  return (
    <motion.div
      layout
      transition={{ layout: { duration: 0.2, ease: 'easeOut' } }}
      className={`glass-panel rounded-2xl overflow-hidden border transition-all duration-300 ${
        entry.completed
          ? 'border-emerald-500/30 bg-emerald-950/10'
          : 'border-white/10 hover:border-white/20'
      }`}
      style={{
        boxShadow: entry.completed ? `0 0 25px -5px ${meta.accentColor}25` : undefined
      }}
    >
      {/* Card Header */}
      <div 
        onClick={() => setIsExpanded(!isExpanded)}
        className="p-4 sm:p-5 cursor-pointer flex items-start justify-between gap-3 select-none"
      >
        <div className="flex items-start gap-3.5 flex-1 min-w-0">
          
          {/* Spring Checkbox */}
          <motion.button
            whileTap={{ scale: 0.8 }}
            onClick={handleCheckbox}
            className={`w-6 h-6 rounded-lg flex items-center justify-center border transition-all mt-0.5 shrink-0 ${
              entry.completed
                ? 'bg-emerald-500 border-emerald-400 text-obsidian-950 shadow-md shadow-emerald-500/30'
                : 'border-white/20 hover:border-white/40 bg-obsidian-800/80 light:bg-paper-200'
            }`}
            title="Mark Track Studied for Today"
          >
            {entry.completed && (
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: 'spring', stiffness: 400, damping: 20 }}
              >
                <Check className="w-4 h-4 stroke-[3]" />
              </motion.div>
            )}
          </motion.button>

          {/* Track Meta & Active Topic */}
          <div className="flex-1 min-w-0">
            <div className="flex items-center flex-wrap gap-2 mb-1">
              <span 
                className="font-mono text-[10px] font-black px-2 py-0.5 rounded tracking-wider flex items-center gap-1"
                style={{ backgroundColor: meta.bgRgba, color: meta.accentColor }}
              >
                <IconComponent className="w-3 h-3" />
                <span>{meta.code}</span>
              </span>

              <span className="text-xs font-bold text-slate-200 light:text-paper-900">
                {meta.name}
              </span>

              <span className="text-[11px] text-slate-400 font-medium truncate hidden sm:inline">
                • {meta.targetExam}
              </span>

              {entry.confidence === 'needs_revision' && (
                <span className="text-[10px] font-mono px-1.5 py-0.2 rounded bg-rose-500/20 text-rose-300 border border-rose-500/30">
                  Needs Revision
                </span>
              )}

              {entry.timeSpent && (
                <span className="text-[10px] font-mono px-1.5 py-0.2 rounded bg-white/5 text-slate-300">
                  ⏱️ {entry.timeSpent}
                </span>
              )}
            </div>

            {/* Topic Preview */}
            <h3 className={`text-sm sm:text-base font-semibold leading-snug truncate transition-colors ${
              entry.completed 
                ? 'line-through text-slate-400 light:text-paper-800' 
                : 'text-white light:text-paper-900'
            }`}>
              {entry.topic || (
                <span className="italic text-slate-500 font-normal text-xs sm:text-sm">
                  Click to log topic studied today...
                </span>
              )}
            </h3>
          </div>

        </div>

        {/* Right Controls: Skip Track + Expand Chevron */}
        <div className="flex items-center gap-2 shrink-0">
          <button
            onClick={(e) => {
              e.stopPropagation();
              onRemoveTrack(trackId);
            }}
            className="p-1.5 rounded-lg text-slate-500 hover:text-rose-400 hover:bg-rose-500/10 transition-colors"
            title="Skip / Remove this track for today"
          >
            <Trash2 className="w-4 h-4" />
          </button>

          <motion.div
            animate={{ rotate: isExpanded ? 180 : 0 }}
            transition={{ duration: 0.2 }}
            className="text-slate-400 p-1"
          >
            <ChevronDown className="w-4 h-4" />
          </motion.div>
        </div>

      </div>

      {/* Accordion Body: User-Input Fields */}
      <AnimatePresence>
        {isExpanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25, ease: 'easeInOut' }}
            className="border-t border-white/5 light:border-paper-200 bg-obsidian-900/60 light:bg-paper-100/60 p-4 sm:p-5 space-y-4"
          >
            
            {/* Field 1: Topic Studied */}
            <div>
              <label className="block text-xs font-mono uppercase tracking-wider text-slate-400 light:text-paper-800 mb-1.5">
                Topic Studied Today:
              </label>
              <input
                type="text"
                value={entry.topic}
                onChange={(e) => onUpdateTopic(trackId, e.target.value)}
                placeholder={`e.g. ${
                  trackId === 'uni' ? 'CNS: Caesar & Playfair Classical Ciphers' :
                  trackId === 'dsa' ? 'Dynamic Programming: 0/1 Knapsack memoization' :
                  trackId === 'gate' ? 'Discrete Math: Propositional Logic truth tables' :
                  trackId === 'afcat' ? 'Speed Numerical: Time, Speed & Distance tricks' :
                  trackId === 'cat' ? 'DILR: 4-variable arrangement matrix' :
                  trackId === 'ssc' ? 'Advance Maths: Circle Tangent-Secant theorem' :
                  trackId === 'upsc' ? 'Polity: Preamble & Basic Structure Doctrine' :
                  'GitHub: Implemented user auth API & Docker container'
                }`}
                className="w-full bg-obsidian-800 light:bg-paper-200 text-white light:text-paper-900 text-sm px-3.5 py-2.5 rounded-xl border border-white/10 light:border-paper-300 focus:outline-none focus:border-violet-500 font-medium placeholder-slate-500 shadow-inner"
              />
            </div>

            {/* Field 2: What I Studied / Key Takeaways & Content Notes */}
            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label className="text-xs font-mono uppercase tracking-wider text-slate-400 light:text-paper-800 flex items-center gap-1.5">
                  <FileText className="w-3.5 h-3.5 text-emerald-400" />
                  <span>Key Takeaways, Formulas, Links & Problem Count:</span>
                </label>
                <span className="text-[10px] font-mono text-emerald-400 flex items-center gap-1">
                  <Save className="w-3 h-3" /> Auto-saved
                </span>
              </div>
              <textarea
                value={entry.contentNotes}
                onChange={(e) => onUpdateNotes(trackId, e.target.value)}
                rows={3}
                placeholder="Log formulas, problem numbers (LeetCode #75), YouTube/lecture link, questions for professors, or summary points..."
                className="w-full bg-obsidian-800 light:bg-paper-200 text-slate-200 light:text-paper-900 text-xs sm:text-sm p-3.5 rounded-xl border border-white/10 light:border-paper-300 focus:outline-none focus:border-violet-500 placeholder-slate-500 leading-relaxed shadow-inner"
              />
            </div>

            {/* Field 3: Time Spent & Confidence Flags */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-1">
              
              {/* Time Spent Pills */}
              <div className="flex items-center gap-2">
                <span className="text-xs font-mono text-slate-400 flex items-center gap-1">
                  <Clock className="w-3.5 h-3.5 text-purple-400" /> Time:
                </span>
                <div className="flex items-center gap-1">
                  {timePills.map((t) => (
                    <button
                      key={t}
                      onClick={() => onUpdateTimeSpent(trackId, entry.timeSpent === t ? '' : t)}
                      className={`px-2.5 py-1 rounded-lg text-xs font-mono transition-all ${
                        entry.timeSpent === t
                          ? 'bg-violet-600 text-white font-bold shadow'
                          : 'bg-obsidian-800 light:bg-paper-200 text-slate-400 hover:text-white'
                      }`}
                    >
                      {t}
                    </button>
                  ))}
                </div>
              </div>

              {/* Confidence Flags */}
              <div className="flex items-center gap-2">
                <button
                  onClick={() => onUpdateConfidence(trackId, 'solid')}
                  className={`px-3 py-1 rounded-lg text-xs font-medium border transition-all ${
                    entry.confidence === 'solid'
                      ? 'bg-emerald-500/20 border-emerald-500/40 text-emerald-300 font-semibold shadow'
                      : 'bg-obsidian-800 light:bg-paper-200 border-white/5 text-slate-400 hover:text-white'
                  }`}
                >
                  Solid Understanding 👍
                </button>

                <button
                  onClick={() => onUpdateConfidence(trackId, 'needs_revision')}
                  className={`px-3 py-1 rounded-lg text-xs font-medium border transition-all ${
                    entry.confidence === 'needs_revision'
                      ? 'bg-rose-500/20 border-rose-500/40 text-rose-300 font-semibold shadow'
                      : 'bg-obsidian-800 light:bg-paper-200 border-white/5 text-slate-400 hover:text-white'
                  }`}
                >
                  Needs Revision ⚠️
                </button>
              </div>

            </div>

          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};
