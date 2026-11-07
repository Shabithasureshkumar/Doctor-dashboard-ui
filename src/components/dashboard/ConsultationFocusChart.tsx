import React, { useState } from 'react';

export const ConsultationFocusChart: React.FC = () => {
  const [activeArea, setActiveArea] = useState<string | null>(null);

  const categories = [
    { name: 'HYPERTENSION', count: 12, x: 160, y: 52 },
    { name: 'APPENDICITIS', count: 4, x: 250, y: 98 },
    { name: 'THYROID', count: 3, x: 145, y: 175 },
    { name: 'HEMORRHOID', count: 3, x: 85, y: 102 },
  ];

  return (
    <div className="bg-white rounded-3xl p-5 sm:p-6 border border-slate-100 shadow-card flex flex-col justify-between h-full relative overflow-hidden">
      {/* Header & Main Stat */}
      <div>
        <h3 className="font-sora font-bold text-slate-900 text-base sm:text-lg mb-1">
          Consultation Focus
        </h3>
        <div className="flex items-baseline gap-2.5 mb-2">
          <span className="font-sora font-extrabold text-3xl sm:text-4xl text-slate-900 tracking-tight">
            22
          </span>
          <span className="text-xs sm:text-sm text-slate-400 font-normal">
            Total Consulting
          </span>
        </div>
      </div>

      {/* Spider/Radar Chart SVG Container */}
      <div className="relative w-full h-56 sm:h-64 flex items-center justify-center">
        <svg
          viewBox="0 0 340 230"
          className="w-full h-full max-w-[360px] overflow-visible"
        >
          <defs>
            <linearGradient id="consultGradLarge" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#9A6AFB" stopOpacity="0.75" />
              <stop offset="50%" stopColor="#7B43FF" stopOpacity="0.5" />
              <stop offset="100%" stopColor="#5C24FF" stopOpacity="0.25" />
            </linearGradient>
            <linearGradient id="curveFillLarge" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#9A6AFB" stopOpacity="0.95" />
              <stop offset="100%" stopColor="#5C24FF" stopOpacity="0.7" />
            </linearGradient>
          </defs>

          {/* Filled Organic Flow Shape — wavy crest toward Hypertension */}
          <path
            d="M 160 52
               C 178 56, 188 44, 203 56
               C 218 68, 236 72, 248 90
               C 258 106, 243 128, 224 142
               C 205 156, 188 174, 166 176
               C 144 178, 126 166, 118 148
               C 108 128, 82 120, 85 102
               C 88 82, 112 74, 128 66
               C 141 59, 148 50, 160 52 Z"
            fill="url(#consultGradLarge)"
            stroke="#5C24FF"
            strokeWidth="1.5"
            strokeOpacity="0.5"
            className="transition-all duration-300"
          />

          {/* Dark purple inner core */}
          <path
            d="M 160 76
               C 184 82, 208 96, 203 116
               C 198 136, 172 152, 153 147
               C 134 142, 120 124, 123 108
               C 126 92, 142 79, 160 76 Z"
            fill="url(#curveFillLarge)"
            opacity="0.7"
          />

          {/* Concentric Web Polygons — drawn over the fill so the mesh stays visible */}
          {[1.0, 0.75, 0.5, 0.25].map((scale, i) => (
            <polygon
              key={i}
              points={`
                160,${115 - 80 * scale} 
                ${160 + 100 * scale},${115 - 20 * scale} 
                ${160 + 75 * scale},${115 + 70 * scale} 
                ${160 - 45 * scale},${115 + 70 * scale} 
                ${160 - 90 * scale},${115 - 5 * scale}
              `}
              fill="none"
              stroke="#CBD5E1"
              strokeWidth="1"
              strokeOpacity={i === 0 ? 0.35 : 0.5}
              strokeDasharray="2 2"
            />
          ))}

          {/* Radial Grid Lines */}
          <g stroke="#CBD5E1" strokeWidth="1" strokeOpacity="0.45">
            <line x1="160" y1="115" x2="160" y2="35" />
            <line x1="160" y1="115" x2="260" y2="95" />
            <line x1="160" y1="115" x2="235" y2="185" />
            <line x1="160" y1="115" x2="115" y2="185" />
            <line x1="160" y1="115" x2="70" y2="110" />
          </g>

          {/* Axis Category Labels */}
          <text
            x="160"
            y="26"
            textAnchor="middle"
            className="text-[10px] font-bold fill-slate-700 tracking-wider select-none font-sora"
          >
            HYPERTENSION
          </text>
          <text
            x="260"
            y="100"
            textAnchor="start"
            className="text-[10px] font-bold fill-slate-700 tracking-wider select-none font-sora"
          >
            APPENDICITIS
          </text>
          <text
            x="145"
            y="200"
            textAnchor="middle"
            className="text-[10px] font-bold fill-slate-700 tracking-wider select-none font-sora"
          >
            THYROID
          </text>
          <text
            x="62"
            y="105"
            textAnchor="end"
            className="text-[10px] font-bold fill-slate-700 tracking-wider select-none font-sora"
          >
            HEMORRHOID
          </text>

          {/* Interactive Data Points */}
          {categories.map((cat) => (
            <circle
              key={cat.name}
              cx={cat.x}
              cy={cat.y}
              r={activeArea === cat.name ? 5.5 : 4}
              className="fill-[#5C24FF] stroke-white stroke-2 cursor-pointer transition-all hover:scale-125 shadow-xs"
              onMouseEnter={() => setActiveArea(cat.name)}
              onMouseLeave={() => setActiveArea(null)}
            />
          ))}
        </svg>

        {/* Tooltip */}
        {activeArea && (
          <div className="absolute top-2 right-2 bg-slate-900 text-white text-xs px-2.5 py-1 rounded-lg shadow-md pointer-events-none z-10 animate-in fade-in">
            <span className="font-semibold">{activeArea}:</span>{' '}
            {categories.find((c) => c.name === activeArea)?.count} cases
          </div>
        )}
      </div>
    </div>
  );
};
