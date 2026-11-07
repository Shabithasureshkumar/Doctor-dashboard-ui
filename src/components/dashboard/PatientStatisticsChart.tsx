import React, { useState } from 'react';

interface DayData {
  day: string;
  isPeak?: boolean;
  columnHeight: number;
  purpleHeight: number;
  oldVal: number;
  newVal: number;
}

export const PatientStatisticsChart: React.FC = () => {
  const [hoveredDay, setHoveredDay] = useState<string | null>(null);

  const chartData: DayData[] = [
    { day: 'Sun', columnHeight: 76, purpleHeight: 22, oldVal: 20, newVal: 10 },
    { day: 'Mon', columnHeight: 88, purpleHeight: 26, oldVal: 28, newVal: 12 },
    { day: 'Tue', columnHeight: 82, purpleHeight: 24, oldVal: 24, newVal: 11 },
    { day: 'Wed', isPeak: true, columnHeight: 94, purpleHeight: 70, oldVal: 18, newVal: 32 },
    { day: 'Thu', columnHeight: 86, purpleHeight: 25, oldVal: 26, newVal: 12 },
    { day: 'Fri', columnHeight: 80, purpleHeight: 23, oldVal: 22, newVal: 10 },
    { day: 'Sat', columnHeight: 75, purpleHeight: 20, oldVal: 19, newVal: 9 },
  ];

  return (
    <div className="bg-white rounded-3xl p-5 sm:p-6 border border-slate-100 shadow-card flex flex-col justify-between h-full">
      {/* Header & Legend */}
      <div className="flex items-center justify-between mb-3">
        <h3 className="font-sora font-bold text-slate-900 text-base sm:text-lg">
          Patients Statistics
        </h3>
        <div className="flex items-center gap-3.5 text-xs sm:text-sm">
          <span className="flex items-center gap-1.5 text-slate-700 font-medium">
            <span className="w-2.5 h-2.5 rounded-full bg-gradient-to-r from-[#9A6AFB] to-[#5C24FF]" />
            <span>New</span>
          </span>
          <span className="flex items-center gap-1.5 text-slate-500">
            <span className="w-2.5 h-2.5 rounded-full bg-[#EFEBFC]" />
            <span>Old</span>
          </span>
        </div>
      </div>

      {/* Bar Chart Area */}
      <div className="flex items-end gap-3 sm:gap-4 h-56 sm:h-64 pt-3 relative">
        {/* Y Axis Guide Numbers */}
        <div className="flex flex-col justify-between h-full pb-8 text-xs text-slate-400 font-medium select-none pr-1">
          <span>50</span>
          <span>40</span>
          <span>30</span>
          <span>20</span>
          <span>10</span>
        </div>

        {/* Day Columns */}
        <div className="flex-1 grid grid-cols-7 gap-2 sm:gap-3 h-full items-end">
          {chartData.map((item) => {
            const isHovered = hoveredDay === item.day;
            return (
              <div
                key={item.day}
                className="flex flex-col items-center h-full justify-end group relative cursor-pointer"
                onMouseEnter={() => setHoveredDay(item.day)}
                onMouseLeave={() => setHoveredDay(null)}
              >
                {/* Tooltip on hover */}
                {isHovered && (
                  <div className="absolute -top-10 left-1/2 -translate-x-1/2 bg-slate-900 text-white text-xs px-2.5 py-1 rounded-lg shadow-md pointer-events-none z-20 whitespace-nowrap animate-in fade-in duration-150">
                    <span className="font-semibold">{item.day}:</span> New {item.newVal}, Old{' '}
                    {item.oldVal}
                  </div>
                )}

                {/* Vertical Bar Capsule */}
                <div
                  style={{ height: `${item.columnHeight}%` }}
                  className="w-full max-w-[34px] sm:max-w-[42px] bg-[#F2EDFD] rounded-2xl flex flex-col justify-end overflow-hidden p-1 transition-all"
                >
                  {/* Purple Portion */}
                  <div
                    style={{ height: `${item.purpleHeight}%` }}
                    className={`w-full rounded-xl transition-all ${
                      item.isPeak
                        ? 'bg-gradient-to-t from-[#5C24FF] to-[#9A6AFB] shadow-[0_4px_12px_rgba(154,106,251,0.45)]'
                        : 'bg-gradient-to-t from-[#5C24FF]/60 to-[#9A6AFB]/60'
                    }`}
                  />
                </div>

                {/* Day Label */}
                <span
                  className={`text-xs sm:text-sm mt-2.5 transition-colors ${
                    item.isPeak
                      ? 'font-bold text-[#5C24FF]'
                      : 'text-slate-500 font-medium group-hover:text-slate-800'
                  }`}
                >
                  {item.day}
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
