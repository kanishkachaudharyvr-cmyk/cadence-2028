import React from 'react';
import { motion } from 'framer-motion';
import { 
  X, 
  SlidersHorizontal, 
  GraduationCap, 
  Rocket, 
  BookOpen, 
  Clock, 
  CheckCircle2, 
  Sparkles,
  ShieldCheck
} from 'lucide-react';
import { TRACKS_INFO, TRACKS_ORDER } from '../data/tracksData';

interface CustomizeRoutineModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const CustomizeRoutineModal: React.FC<CustomizeRoutineModalProps> = ({
  isOpen,
  onClose,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-obsidian-950/80 backdrop-blur-md animate-in fade-in">
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        className="glass-panel w-full max-w-2xl max-h-[85vh] flex flex-col rounded-3xl p-6 border border-white/10 shadow-2xl relative"
      >
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-white/10">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-xl bg-violet-500/10 text-violet-400 border border-violet-500/20">
              <SlidersHorizontal className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-serif text-xl text-white light:text-paper-900">
                Academic Calendar Blueprint & Routine Engine
              </h3>
              <p className="text-xs text-slate-400 light:text-paper-800">
                How CADENCE // 2028 balances your 8 tracks across your B.E. IT degree
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

        {/* Content */}
        <div className="flex-1 overflow-y-auto space-y-4 py-4 pr-1 text-xs text-slate-300 light:text-paper-800 leading-relaxed">
          
          {/* Rule 1 */}
          <div className="p-4 rounded-xl bg-blue-500/10 border border-blue-500/20">
            <div className="flex items-center gap-2 font-semibold text-blue-300 text-sm mb-1">
              <GraduationCap className="w-4 h-4" />
              <span>May & November: University End-Sem Exam Crunch</span>
            </div>
            <p className="text-slate-300 light:text-paper-900 text-xs">
              Automatically pauses competitive tracks so you are never overwhelmed during Mumbai University semester finals. Sets active load to <strong>Core Uni Subjects</strong> + <strong>GitHub Green Streak</strong> (15–20 mins) only.
            </p>
          </div>

          {/* Rule 2 */}
          <div className="p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/20">
            <div className="flex items-center gap-2 font-semibold text-emerald-300 text-sm mb-1">
              <Rocket className="w-4 h-4" />
              <span>June & December: Full Vacation Deep-Sprint Mode</span>
            </div>
            <p className="text-slate-300 light:text-paper-900 text-xs">
              Zero college classes: Unleashes 3 high-intensity focus tracks per day (e.g. Dec 2026 focuses on GATE 2027 + DSA; Jun 2027 focuses on AFCAT 2 + CAT/SSC + DSA; Dec 2027 focuses on UPSC CSE 2028 + Capstone).
            </p>
          </div>

          {/* Rule 3 */}
          <div className="p-4 rounded-xl bg-purple-500/10 border border-purple-500/20">
            <div className="flex items-center gap-2 font-semibold text-purple-300 text-sm mb-1">
              <BookOpen className="w-4 h-4" />
              <span>Jan–Apr & Jul–Oct: Regular Semester A/B Rotation</span>
            </div>
            <p className="text-slate-300 light:text-paper-900 text-xs">
              Balances 2–3 tracks/day so all 8 tracks are never crammed into one day:
              <br />• <strong>Mon / Wed / Fri:</strong> Uni Coursework + DSA + GitHub
              <br />• <strong>Tue / Thu:</strong> Primary Competitive Exam (GATE / AFCAT / CAT / UPSC) + Secondary Exam / SSC + GitHub
              <br />• <strong>Weekends:</strong> Deep-work revision & mock problem sets.
            </p>
          </div>

          {/* Competitive Exam Auto-Retirement */}
          <div className="p-4 rounded-xl bg-obsidian-800/80 light:bg-paper-200 border border-white/5 space-y-2">
            <h4 className="font-semibold text-slate-200 light:text-paper-900 flex items-center gap-1.5">
              <Clock className="w-4 h-4 text-amber-400" />
              <span>Competitive Exam Milestones & Auto-Archiving:</span>
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-[11px] font-mono">
              <div className="p-2 rounded bg-black/20">
                <span className="text-purple-400 font-bold">GATE 2027:</span> Exam Feb 6–21, 2027 (Archives post Feb 21)
              </div>
              <div className="p-2 rounded bg-black/20">
                <span className="text-cyan-400 font-bold">AFCAT 2:</span> Exam late August 2027 (Archives post Aug 31)
              </div>
              <div className="p-2 rounded bg-black/20">
                <span className="text-amber-400 font-bold">CAT 2027:</span> Exam late Nov 2027 (Archives post Nov 30)
              </div>
              <div className="p-2 rounded bg-black/20">
                <span className="text-orange-400 font-bold">UPSC CSE 2028:</span> Prelims May 2028 (Peak Dec 2027–Jun 2028)
              </div>
            </div>
          </div>

          {/* Manual Overrides Note */}
          <div className="p-3 rounded-xl bg-white/5 border border-white/5 text-[11px] text-slate-400">
            <strong className="text-slate-300">Total Freedom Anytime:</strong> You can override any day's mode using the top dropdown, click <code className="text-emerald-400">+ Add Extra Track</code> if you have extra energy, or click the trash/skip icon on any track card if college ran late.
          </div>

        </div>

        {/* Footer */}
        <div className="pt-4 border-t border-white/10 flex justify-end">
          <button
            onClick={onClose}
            className="px-5 py-2 rounded-xl bg-violet-600 hover:bg-violet-500 text-white text-xs font-semibold shadow"
          >
            Got It
          </button>
        </div>
      </motion.div>
    </div>
  );
};
