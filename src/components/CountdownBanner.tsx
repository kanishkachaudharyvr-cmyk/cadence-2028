import React from 'react';
import { daysBetween } from '../utils/scheduleEngine';
import { Sparkles, Flag, Award, Clock } from 'lucide-react';

interface CountdownBannerProps {
  currentDateStr: string;
}

interface Milestone {
  id: string;
  name: string;
  targetDate: string;
  badge: string;
  color: string;
  accentBg: string;
  isGrandFinale?: boolean;
}

const MILESTONES: Milestone[] = [
  {
    id: 'gate',
    name: 'GATE 2027',
    targetDate: '2027-02-07',
    badge: 'CS & DA',
    color: '#8B5CF6',
    accentBg: 'rgba(139, 92, 246, 0.15)',
  },
  {
    id: 'afcat',
    name: 'AFCAT 2',
    targetDate: '2027-08-28',
    badge: 'IAF Flying/Tech',
    color: '#06B6D4',
    accentBg: 'rgba(6, 182, 212, 0.15)',
  },
  {
    id: 'cat',
    name: 'CAT 2027',
    targetDate: '2027-11-28',
    badge: 'IIMs & FMS',
    color: '#F59E0B',
    accentBg: 'rgba(245, 158, 11, 0.15)',
  },
  {
    id: 'upsc',
    name: 'UPSC CSE 2028',
    targetDate: '2028-05-28',
    badge: 'IAS / IFS Prelims',
    color: '#EA580C',
    accentBg: 'rgba(234, 88, 12, 0.15)',
  },
  {
    id: 'grad',
    name: 'B.E. GRADUATION',
    targetDate: '2028-06-30',
    badge: 'Convocation Day',
    color: '#10B981',
    accentBg: 'rgba(16, 185, 129, 0.2)',
    isGrandFinale: true,
  },
];

export const CountdownBanner: React.FC<CountdownBannerProps> = ({ currentDateStr }) => {
  return (
    <div className="w-full overflow-x-auto pb-2 pt-1 no-scrollbar">
      <div className="flex items-center gap-2.5 min-w-max">
        <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-obsidian-800/80 light:bg-paper-100 border border-white/5 text-xs font-mono text-slate-400">
          <Clock className="w-3.5 h-3.5 text-purple-400" />
          <span className="uppercase tracking-wider">Horizon Timers:</span>
        </div>

        {MILESTONES.map((m) => {
          const daysLeft = daysBetween(currentDateStr, m.targetDate);
          const hasPassed = daysLeft < 0;
          const isToday = daysLeft === 0;

          return (
            <div
              key={m.id}
              className={`flex items-center gap-2 px-3 py-1.5 rounded-lg border text-xs transition-all ${
                m.isGrandFinale 
                  ? 'border-emerald-500/40 bg-emerald-950/20 shadow-[0_0_15px_-3px_rgba(16,185,129,0.2)]' 
                  : 'border-white/10 bg-obsidian-800/60 light:bg-white/80 light:border-paper-300'
              }`}
            >
              <div 
                className="w-2 h-2 rounded-full animate-pulse"
                style={{ backgroundColor: m.color }}
              />
              <span className="font-semibold text-slate-200 light:text-paper-900 tracking-tight">
                {m.name}
              </span>

              <span 
                className="px-1.5 py-0.5 rounded text-[10px] font-mono uppercase"
                style={{ backgroundColor: m.accentBg, color: m.color }}
              >
                {m.badge}
              </span>

              <span className="font-mono font-bold ml-1">
                {hasPassed ? (
                  <span className="text-slate-500 flex items-center gap-1">
                    <Flag className="w-3 h-3 text-emerald-400" /> Completed
                  </span>
                ) : isToday ? (
                  <span className="text-amber-400 font-extrabold animate-bounce flex items-center gap-1">
                    <Sparkles className="w-3 h-3" /> EXAM DAY!
                  </span>
                ) : (
                  <span className="text-white light:text-paper-900">
                    <span style={{ color: m.color }}>{daysLeft}</span>
                    <span className="text-slate-400 text-[10px] ml-0.5">d remaining</span>
                  </span>
                )}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
};
