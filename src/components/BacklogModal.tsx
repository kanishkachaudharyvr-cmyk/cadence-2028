import React from 'react';
import { motion } from 'framer-motion';
import { 
  RotateCcw, 
  X, 
  Check, 
  Trash2, 
  Calendar, 
  AlertCircle,
  Sparkles,
  ArrowRight
} from 'lucide-react';
import { RolledOverTask, TrackId } from '../types/roadmap';
import { TRACKS_META } from '../data/tracksMeta';

interface BacklogModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentDateStr: string;
  rolledOverTasks: RolledOverTask[];
  onRollOverToToday: (targetDateStr: string) => void;
  onToggleTask: (taskId: string) => void;
  onDismissTask: (taskId: string) => void;
}

export const BacklogModal: React.FC<BacklogModalProps> = ({
  isOpen,
  onClose,
  currentDateStr,
  rolledOverTasks,
  onRollOverToToday,
  onToggleTask,
  onDismissTask,
}) => {
  if (!isOpen) return null;

  // Filter tasks targeted for current inspected date
  const tasksForDate = rolledOverTasks.filter(t => t.targetDate === currentDateStr);
  const completedCount = tasksForDate.filter(t => t.completed).length;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-obsidian-950/80 backdrop-blur-md animate-in fade-in">
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        className="glass-panel w-full max-w-2xl max-h-[85vh] flex flex-col rounded-3xl p-6 border border-white/10 light:border-paper-300 shadow-2xl relative"
      >
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-white/10 light:border-paper-300">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-xl bg-amber-500/10 text-amber-400 border border-amber-500/20">
              <RotateCcw className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-serif text-xl text-white light:text-paper-900">
                Smart Carry-Forward & Backlog Engine
              </h3>
              <p className="text-xs text-slate-400 light:text-paper-800">
                Recover missed tasks from RGIT exams, fests or hackathons into {currentDateStr}
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

        {/* Action Banner */}
        <div className="py-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-amber-500/5 border border-amber-500/15 rounded-2xl p-4 my-4">
          <div className="flex items-start gap-2.5">
            <AlertCircle className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
            <div>
              <h4 className="text-xs font-semibold text-amber-200">
                Scan Past Uncompleted Tasks (Last 14 Days)
              </h4>
              <p className="text-[11px] text-amber-300/70">
                Merge pending syllabus topics into today's schedule without losing past streak integrity.
              </p>
            </div>
          </div>

          <button
            onClick={() => onRollOverToToday(currentDateStr)}
            className="flex items-center justify-center gap-1.5 px-4 py-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-obsidian-950 font-bold text-xs transition-colors shrink-0 shadow-lg shadow-amber-500/20"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Roll Over Missed Tasks to Today</span>
          </button>
        </div>

        {/* Rolled Over Tasks List */}
        <div className="flex-1 overflow-y-auto space-y-3 pr-1">
          <div className="flex items-center justify-between text-xs font-mono text-slate-400 mb-2">
            <span>ACTIVE ROLLED-OVER ITEMS FOR {currentDateStr}:</span>
            <span>{completedCount} / {tasksForDate.length} COMPLETED</span>
          </div>

          {tasksForDate.length === 0 ? (
            <div className="p-8 text-center rounded-2xl border border-dashed border-white/10 text-slate-400">
              <Sparkles className="w-8 h-8 mx-auto text-emerald-400 mb-2 opacity-60" />
              <p className="text-sm font-medium text-slate-300">No pending backlog for this date!</p>
              <p className="text-xs text-slate-500 mt-1">
                Your syllabus velocity is on track. Click "Roll Over Missed Tasks" above if you recently missed days.
              </p>
            </div>
          ) : (
            tasksForDate.map((task) => {
              const meta = TRACKS_META[task.trackId];

              return (
                <div
                  key={task.id}
                  className={`p-3.5 rounded-2xl border transition-all ${
                    task.completed
                      ? 'bg-emerald-950/10 border-emerald-500/20 opacity-75'
                      : 'bg-obsidian-800/80 light:bg-paper-100 border-white/5'
                  }`}
                >
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex items-start gap-2.5 flex-1">
                      <button
                        onClick={() => onToggleTask(task.id)}
                        className={`w-5 h-5 rounded-md mt-0.5 flex items-center justify-center border transition-all shrink-0 ${
                          task.completed
                            ? 'bg-emerald-500 border-emerald-400 text-obsidian-950'
                            : 'border-white/20 bg-obsidian-900'
                        }`}
                      >
                        {task.completed && <Check className="w-3.5 h-3.5 stroke-[3]" />}
                      </button>

                      <div>
                        <div className="flex items-center gap-2 mb-1">
                          <span 
                            className="font-mono text-[10px] font-bold px-1.5 py-0.2 rounded"
                            style={{ backgroundColor: meta.bgRgba, color: meta.accentColor }}
                          >
                            {meta.code}
                          </span>
                          <span className="text-[11px] font-mono text-slate-400 flex items-center gap-1">
                            <Calendar className="w-3 h-3" /> Originated: {task.originalDate}
                          </span>
                        </div>

                        <h5 className={`text-xs sm:text-sm font-semibold ${
                          task.completed ? 'line-through text-slate-400' : 'text-slate-100 light:text-paper-900'
                        }`}>
                          {task.title}
                        </h5>

                        <div className="mt-2 space-y-1">
                          {task.subtasks.map((st, i) => (
                            <div key={st.id || i} className="text-[11px] text-slate-400 flex items-start gap-1.5">
                              <span className="font-mono text-[10px] text-slate-500">•</span>
                              <span>{st.text}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>

                    <button
                      onClick={() => onDismissTask(task.id)}
                      className="p-1.5 rounded-lg text-slate-500 hover:text-rose-400 hover:bg-rose-500/10 transition-colors"
                      title="Dismiss from backlog"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              );
            })
          )}
        </div>

        {/* Footer */}
        <div className="pt-4 border-t border-white/10 light:border-paper-300 mt-4 flex justify-end">
          <button
            onClick={onClose}
            className="px-5 py-2 rounded-xl bg-obsidian-800 hover:bg-obsidian-700 light:bg-paper-200 text-slate-200 light:text-paper-900 text-xs font-semibold"
          >
            Done
          </button>
        </div>
      </motion.div>
    </div>
  );
};
