import React from 'react';
import {
  Sun,
  Moon,
  Laptop,
  Palette,
  Type,
} from 'lucide-react';
import { AppearanceSettings } from '../../../types/settings';

interface AppearanceSectionProps {
  appearance: AppearanceSettings;
  onChange: (updated: Partial<AppearanceSettings>) => void;
  onSave: () => void;
  onToast: (msg: string) => void;
}

export const AppearanceSection: React.FC<AppearanceSectionProps> = ({
  appearance,
  onChange,
  onSave,
  onToast: _onToast,
}) => {
  return (
    <div className="space-y-5">
      {/* 1. Theme Mode Cards */}
      <div className="bg-white rounded-3xl p-6 sm:p-7 border border-slate-100 shadow-[0_2px_14px_rgba(0,0,0,0.03)] space-y-5">
        <div>
          <h3 className="font-sora font-bold text-base sm:text-lg text-slate-900">
            Interface Theme &amp; Color Scheme
          </h3>
          <p className="text-xs text-slate-500 mt-0.5">
            Select your preferred display appearance across day and night clinic shifts
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {[
            {
              id: 'light' as const,
              title: 'Light Theme',
              desc: 'Clean lavender off-white (Default)',
              icon: Sun,
              bg: 'bg-slate-50',
            },
            {
              id: 'dark' as const,
              title: 'Dark Theme (Night Shift)',
              desc: 'Reduced eye fatigue for dim clinic environments',
              icon: Moon,
              bg: 'bg-slate-900 text-white',
            },
            {
              id: 'system' as const,
              title: 'System Automatic',
              desc: 'Syncs with your operating system preference',
              icon: Laptop,
              bg: 'bg-gradient-to-br from-slate-100 to-slate-200',
            },
          ].map((theme) => {
            const isSelected = appearance.theme === theme.id;
            return (
              <div
                key={theme.id}
                onClick={() => onChange({ theme: theme.id })}
                className={`p-5 rounded-2xl border-2 transition-all cursor-pointer flex flex-col justify-between h-40 ${
                  isSelected
                    ? 'border-[#7F47FA] bg-purple-50/40 shadow-sm'
                    : 'border-slate-100 hover:border-purple-200 bg-white'
                }`}
              >
                <div className="flex items-center justify-between">
                  <div className="w-10 h-10 rounded-2xl bg-purple-50 text-[#5C24FF] flex items-center justify-center">
                    <theme.icon className="w-5 h-5" />
                  </div>
                  {isSelected && (
                    <span className="w-6 h-6 rounded-full bg-[#5C24FF] text-white flex items-center justify-center text-xs">
                      ✓
                    </span>
                  )}
                </div>

                <div>
                  <h4 className="font-sora font-bold text-sm text-slate-900">{theme.title}</h4>
                  <p className="text-[11px] text-slate-400 mt-0.5">{theme.desc}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* 2. Brand Accent Color & Font Size Scaling */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {/* Accent Color */}
        <div className="bg-white rounded-3xl p-6 border border-slate-100 shadow-[0_2px_14px_rgba(0,0,0,0.03)] space-y-4 h-full flex flex-col justify-between">
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <Palette className="w-4 h-4 text-[#5C24FF]" />
              <h4 className="font-sora font-bold text-sm text-slate-900">Brand Accent Color</h4>
            </div>
            <p className="text-xs text-slate-500">
              Primary highlight hue applied to buttons, active navigation, and key badges
            </p>

            <div className="grid grid-cols-2 gap-2.5 pt-1">
              {[
                { id: 'purple' as const, label: 'Mednevo Violet', hex: 'bg-[#5C24FF]' },
                { id: 'cyan' as const, label: 'Oceanic Cyan', hex: 'bg-cyan-500' },
                { id: 'indigo' as const, label: 'Royal Indigo', hex: 'bg-indigo-600' },
                { id: 'emerald' as const, label: 'Clinical Emerald', hex: 'bg-emerald-600' },
              ].map((col) => {
                const isSelected = appearance.accentColor === col.id;
                return (
                  <button
                    key={col.id}
                    type="button"
                    onClick={() => onChange({ accentColor: col.id })}
                    className={`p-3 rounded-2xl border flex items-center gap-2.5 text-xs font-semibold transition-all ${
                      isSelected ? 'border-[#5C24FF] bg-purple-50/50 shadow-xs' : 'border-slate-100 hover:bg-slate-50'
                    }`}
                  >
                    <span className={`w-4 h-4 rounded-full ${col.hex} flex-shrink-0 shadow-xs`} />
                    <span className="text-slate-800 truncate">{col.label}</span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Font Size Scaling */}
        <div className="bg-white rounded-3xl p-6 border border-slate-100 shadow-[0_2px_14px_rgba(0,0,0,0.03)] space-y-4 h-full flex flex-col justify-between">
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <Type className="w-4 h-4 text-[#5C24FF]" />
              <h4 className="font-sora font-bold text-sm text-slate-900">Typography Scale</h4>
            </div>
            <p className="text-xs text-slate-500">
              Adjust global dashboard font scaling for optimal readability
            </p>

            {/* Quick Preset Buttons */}
            <div className="grid grid-cols-3 gap-2 pt-1">
              {[
                { id: 'small' as const, scale: 90, label: 'Small (90%)' },
                { id: 'standard' as const, scale: 100, label: 'Standard (100%)' },
                { id: 'large' as const, scale: 110, label: 'Large (110%)' },
              ].map((fs) => {
                const isSelected =
                  appearance.fontScale !== undefined
                    ? Math.abs(appearance.fontScale - fs.scale) <= 3
                    : appearance.fontSize === fs.id;

                return (
                  <button
                    key={fs.id}
                    type="button"
                    onClick={() =>
                      onChange({
                        fontSize: fs.id,
                        fontScale: fs.scale,
                      })
                    }
                    className={`py-2.5 rounded-2xl border text-xs font-bold transition-all text-center ${
                      isSelected
                        ? 'bg-[#5C24FF] text-white border-[#5C24FF] shadow-xs'
                        : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-purple-50/50'
                    }`}
                  >
                    {fs.label}
                  </button>
                );
              })}
            </div>

            {/* Interactive Draggable Range Slider */}
            {(() => {
              const currentScale =
                appearance.fontScale ??
                (appearance.fontSize === 'small' ? 90 : appearance.fontSize === 'large' ? 110 : 100);

              const handleSliderChange = (newVal: number) => {
                let category: 'small' | 'standard' | 'large' = 'standard';
                if (newVal <= 92) category = 'small';
                else if (newVal >= 108) category = 'large';
                else category = 'standard';

                onChange({
                  fontScale: newVal,
                  fontSize: category,
                });
              };

              const fillPercent = Math.min(
                100,
                Math.max(0, ((currentScale - 85) / (120 - 85)) * 100)
              );

              return (
                <div className="pt-3 border-t border-slate-100 space-y-2.5">
                  <div className="flex items-center justify-between">
                    <span className="text-[11px] font-semibold text-slate-500 flex items-center gap-1.5">
                      <span>Drag to scale</span>
                      <span className="px-2 py-0.5 rounded-full bg-purple-50 text-[#5C24FF] font-bold text-[11px] border border-purple-100">
                        {currentScale}%
                      </span>
                    </span>
                    <span className="text-[11px] text-slate-400 font-medium">85% – 120%</span>
                  </div>

                  {/* Range Slider Track */}
                  <div className="relative flex items-center py-0.5">
                    <input
                      type="range"
                      min={85}
                      max={120}
                      step={1}
                      value={currentScale}
                      onChange={(e) => handleSliderChange(Number(e.target.value))}
                      className="w-full h-2 rounded-lg appearance-none cursor-pointer accent-[#5C24FF]"
                      style={{
                        background: `linear-gradient(to right, #5C24FF 0%, #5C24FF ${fillPercent}%, #E2E8F0 ${fillPercent}%, #E2E8F0 100%)`,
                      }}
                    />
                  </div>

                  {/* Scale Markers */}
                  <div className="flex justify-between items-center text-[10px] font-semibold text-slate-400 px-0.5 select-none">
                    <button
                      type="button"
                      onClick={() => handleSliderChange(85)}
                      className={`hover:text-[#5C24FF] transition-colors ${currentScale === 85 ? 'text-[#5C24FF] font-bold' : ''}`}
                    >
                      85%
                    </button>
                    <button
                      type="button"
                      onClick={() => handleSliderChange(90)}
                      className={`hover:text-[#5C24FF] transition-colors ${currentScale === 90 ? 'text-[#5C24FF] font-bold' : ''}`}
                    >
                      90%
                    </button>
                    <button
                      type="button"
                      onClick={() => handleSliderChange(100)}
                      className={`hover:text-[#5C24FF] transition-colors ${currentScale === 100 ? 'text-[#5C24FF] font-bold' : ''}`}
                    >
                      100% (Default)
                    </button>
                    <button
                      type="button"
                      onClick={() => handleSliderChange(110)}
                      className={`hover:text-[#5C24FF] transition-colors ${currentScale === 110 ? 'text-[#5C24FF] font-bold' : ''}`}
                    >
                      110%
                    </button>
                    <button
                      type="button"
                      onClick={() => handleSliderChange(120)}
                      className={`hover:text-[#5C24FF] transition-colors ${currentScale === 120 ? 'text-[#5C24FF] font-bold' : ''}`}
                    >
                      120%
                    </button>
                  </div>
                </div>
              );
            })()}
          </div>
        </div>
      </div>

      {/* 3. Layout Density & Accessibility Switches */}
      <div className="bg-white rounded-3xl p-6 sm:p-7 border border-slate-100 shadow-[0_2px_14px_rgba(0,0,0,0.03)] space-y-5">
        <div>
          <h3 className="font-sora font-bold text-base sm:text-lg text-slate-900">
            Layout Density &amp; Accessibility Preferences
          </h3>
          <p className="text-xs text-slate-500 mt-0.5">
            Compliant with WCAG 2.1 AAA high-contrast and screen reader accessibility guidelines
          </p>
        </div>

        <div className="space-y-3.5 divide-y divide-slate-100">
          {/* Layout Density */}
          <div className="pt-1 flex items-center justify-between gap-4">
            <div>
              <span className="font-sora font-bold text-xs sm:text-sm text-slate-900 block">
                Layout Density
              </span>
              <span className="text-xs text-slate-500">
                Comfortable mode provides spacious padding; Compact displays higher data density per viewport.
              </span>
            </div>

            <div className="flex items-center gap-1.5 p-1 bg-slate-100 rounded-xl text-xs font-semibold">
              <button
                type="button"
                onClick={() => onChange({ layoutDensity: 'comfortable' })}
                className={`px-3 py-1 rounded-lg transition-all ${
                  appearance.layoutDensity === 'comfortable'
                    ? 'bg-white text-[#5C24FF] shadow-xs font-bold'
                    : 'text-slate-600'
                }`}
              >
                Comfortable
              </button>
              <button
                type="button"
                onClick={() => onChange({ layoutDensity: 'compact' })}
                className={`px-3 py-1 rounded-lg transition-all ${
                  appearance.layoutDensity === 'compact'
                    ? 'bg-white text-[#5C24FF] shadow-xs font-bold'
                    : 'text-slate-600'
                }`}
              >
                Compact
              </button>
            </div>
          </div>

          {/* High Contrast */}
          <div className="pt-3.5 flex items-center justify-between gap-4">
            <div>
              <span className="font-sora font-bold text-xs sm:text-sm text-slate-900 block">
                High Contrast Text Mode
              </span>
              <span className="text-xs text-slate-500">
                Enhance contrast ratios on all clinical tables, labels, and badges for low-light or glare settings.
              </span>
            </div>

            <button
              type="button"
              onClick={() => onChange({ highContrast: !appearance.highContrast })}
              className={`w-11 h-6 rounded-full transition-colors relative flex items-center p-0.5 flex-shrink-0 ${
                appearance.highContrast ? 'bg-[#5C24FF]' : 'bg-slate-300'
              }`}
            >
              <div
                className={`w-5 h-5 rounded-full bg-white shadow-sm transition-transform ${
                  appearance.highContrast ? 'translate-x-5' : 'translate-x-0'
                }`}
              />
            </button>
          </div>

          {/* Reduced Motion */}
          <div className="pt-3.5 flex items-center justify-between gap-4">
            <div>
              <span className="font-sora font-bold text-xs sm:text-sm text-slate-900 block">
                Reduced Motion
              </span>
              <span className="text-xs text-slate-500">
                Disables sliding drawer transitions and pulse animations to prevent motion sensitivity.
              </span>
            </div>

            <button
              type="button"
              onClick={() => onChange({ reducedMotion: !appearance.reducedMotion })}
              className={`w-11 h-6 rounded-full transition-colors relative flex items-center p-0.5 flex-shrink-0 ${
                appearance.reducedMotion ? 'bg-[#5C24FF]' : 'bg-slate-300'
              }`}
            >
              <div
                className={`w-5 h-5 rounded-full bg-white shadow-sm transition-transform ${
                  appearance.reducedMotion ? 'translate-x-5' : 'translate-x-0'
                }`}
              />
            </button>
          </div>

          {/* Screen Reader Optimization */}
          <div className="pt-3.5 flex items-center justify-between gap-4">
            <div>
              <span className="font-sora font-bold text-xs sm:text-sm text-slate-900 block">
                Screen Reader ARIA Optimizations
              </span>
              <span className="text-xs text-slate-500">
                Enables verbose telemetry announcements and keyboard navigational landmarks for assistive devices.
              </span>
            </div>

            <button
              type="button"
              onClick={() => onChange({ screenReaderOptimized: !appearance.screenReaderOptimized })}
              className={`w-11 h-6 rounded-full transition-colors relative flex items-center p-0.5 flex-shrink-0 ${
                appearance.screenReaderOptimized ? 'bg-[#5C24FF]' : 'bg-slate-300'
              }`}
            >
              <div
                className={`w-5 h-5 rounded-full bg-white shadow-sm transition-transform ${
                  appearance.screenReaderOptimized ? 'translate-x-5' : 'translate-x-0'
                }`}
              />
            </button>
          </div>
        </div>
      </div>

      {/* Save Button */}
      <div className="pt-2 flex items-center justify-end gap-3">
        <button
          onClick={onSave}
          className="px-6 py-2.5 rounded-2xl bg-gradient-to-r from-[#9A6AFB] to-[#5C24FF] text-white font-sora font-semibold text-xs sm:text-sm shadow-[0_4px_14px_rgba(154,106,251,0.35)] hover:opacity-95 transition-all active:scale-95"
        >
          Save Appearance Settings
        </button>
      </div>
    </div>
  );
};
