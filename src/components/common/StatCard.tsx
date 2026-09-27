import React from 'react';
import { LucideIcon } from 'lucide-react';

interface StatCardProps {
  title: string;
  value: string | number;
  subtitle?: string;
  icon: LucideIcon;
  color?: 'blue' | 'teal' | 'rose' | 'amber' | 'indigo' | 'emerald';
  trend?: {
    value: string;
    positive: boolean;
  };
  onClick?: () => void;
}

export const StatCard: React.FC<StatCardProps> = ({
  title,
  value,
  subtitle,
  icon: Icon,
  color = 'blue',
  trend,
  onClick,
}) => {
  const colorMap = {
    blue: {
      bg: 'bg-sky-50 text-sky-600',
      border: 'hover:border-sky-300',
      pill: 'bg-sky-100 text-sky-700',
    },
    teal: {
      bg: 'bg-teal-50 text-teal-600',
      border: 'hover:border-teal-300',
      pill: 'bg-teal-100 text-teal-700',
    },
    rose: {
      bg: 'bg-rose-50 text-rose-600',
      border: 'hover:border-rose-300',
      pill: 'bg-rose-100 text-rose-700',
    },
    amber: {
      bg: 'bg-amber-50 text-amber-600',
      border: 'hover:border-amber-300',
      pill: 'bg-amber-100 text-amber-700',
    },
    indigo: {
      bg: 'bg-indigo-50 text-indigo-600',
      border: 'hover:border-indigo-300',
      pill: 'bg-indigo-100 text-indigo-700',
    },
    emerald: {
      bg: 'bg-emerald-50 text-emerald-600',
      border: 'hover:border-emerald-300',
      pill: 'bg-emerald-100 text-emerald-700',
    },
  }[color];

  return (
    <div
      onClick={onClick}
      className={`bg-white rounded-xl border border-slate-200/80 p-5 shadow-xs transition-all duration-200 ${
        onClick ? 'cursor-pointer hover:shadow-md ' + colorMap.border : ''
      }`}
    >
      <div className="flex items-start justify-between">
        <div className="space-y-1">
          <p className="text-xs font-semibold tracking-wider text-slate-500 uppercase">
            {title}
          </p>
          <div className="flex items-baseline gap-2">
            <h3 className="text-2xl sm:text-3xl font-bold text-slate-800 tracking-tight">
              {value}
            </h3>
            {trend && (
              <span
                className={`text-xs font-medium px-1.5 py-0.5 rounded ${
                  trend.positive ? 'bg-emerald-50 text-emerald-700' : 'bg-rose-50 text-rose-700'
                }`}
              >
                {trend.value}
              </span>
            )}
          </div>
          {subtitle && <p className="text-xs text-slate-500 pt-0.5">{subtitle}</p>}
        </div>

        <div className={`p-3 rounded-xl ${colorMap.bg} shrink-0`}>
          <Icon className="w-5 h-5 sm:w-6 sm:h-6" />
        </div>
      </div>
    </div>
  );
};
