import React, { useState, useEffect, useRef } from 'react';
import { useTextStore } from '../store/useTextStore';
import { ArrowRight, ArrowLeft, X, Sparkles } from 'lucide-react';

export default function OnboardingTour() {
  const isOnboardingActive = useTextStore((state) => state.isOnboardingActive);
  const onboardingStep = useTextStore((state) => state.onboardingStep);
  const setOnboardingStep = useTextStore((state) => state.setOnboardingStep);
  const completeOnboarding = useTextStore((state) => state.completeOnboarding);
  const isDarkMode = useTextStore((state) => state.isDarkMode);

  const [coords, setCoords] = useState(null);
  const [tooltipStyle, setTooltipStyle] = useState({});

  const tourSteps = [
    {
      id: 'onboarding-editor',
      title: "✍️ Document Input Area",
      description: "Paste or type your document here. You can also hover over the 'Load Sample Data' dropdown below to quickly insert pre-compiled case studies.",
      placement: 'right'
    },
    {
      id: 'onboarding-summary',
      title: "📊 Extractive Summary Card",
      description: "Control the slider to customize summary density (from 1% to 100%). The local TF-IDF model extracts and arranges the sentences in chronological order.",
      placement: 'left'
    },
    {
      id: 'onboarding-keywords',
      title: "🏷️ Statistical Keyword Cloud",
      description: "Lists key root terms sized by their average TF-IDF weight. Click a keyword to trace and highlight all grammatical root variations within the editor text.",
      placement: 'left'
    },
    {
      id: 'onboarding-telemetry',
      title: "⚡ Telemetry Panel Controls",
      description: "Click here to open the Telemetry Matrix drawer to analyze readability indexes (Flesch-Kincaid index), emotional polarity, and save named snapshots to history.",
      placement: 'bottom'
    }
  ];

  const currentStep = tourSteps[onboardingStep];

  const updateCoordinates = () => {
    if (!isOnboardingActive || !currentStep) return;
    const element = document.getElementById(currentStep.id);
    
    if (element) {
      const rect = element.getBoundingClientRect();
      setCoords({
        top: rect.top - 8,
        left: rect.left - 8,
        width: rect.width + 16,
        height: rect.height + 16
      });

      // Compute Tooltip position
      let style = {};
      const isDesktop = window.innerWidth >= 1024;

      if (isDesktop) {
        if (currentStep.placement === 'right') {
          style = {
            position: 'fixed',
            top: `${rect.top}px`,
            left: `${rect.right + 24}px`,
            width: '340px'
          };
        } else if (currentStep.placement === 'left') {
          style = {
            position: 'fixed',
            top: `${rect.top}px`,
            left: `${rect.left - 364}px`,
            width: '340px'
          };
        } else if (currentStep.placement === 'bottom') {
          style = {
            position: 'fixed',
            top: `${rect.bottom + 24}px`,
            left: `${rect.left + rect.width / 2 - 170}px`,
            width: '340px'
          };
        }
      } else {
        // Mobile placement
        style = {
          position: 'fixed',
          bottom: '24px',
          left: '50%',
          transform: 'translateX(-50%)',
          width: 'calc(100vw - 32px)',
          maxWidth: '400px'
        };
      }
      setTooltipStyle(style);
    }
  };

  useEffect(() => {
    updateCoordinates();
    
    window.addEventListener('resize', updateCoordinates);
    return () => {
      window.removeEventListener('resize', updateCoordinates);
    };
  }, [onboardingStep, isOnboardingActive]);

  if (!isOnboardingActive || !coords) return null;

  const handleNext = () => {
    if (onboardingStep < tourSteps.length - 1) {
      setOnboardingStep(onboardingStep + 1);
    } else {
      completeOnboarding();
    }
  };

  const handleBack = () => {
    if (onboardingStep > 0) {
      setOnboardingStep(onboardingStep - 1);
    }
  };

  return (
    <div className={`fixed inset-0 z-40 pointer-events-none ${isDarkMode ? 'dark' : ''}`}>
      {/* Dimmed spotlight overlay using transparent container with massive box shadow */}
      <div 
        className="fixed border-2 border-emerald-500/80 shadow-[0_0_0_9999px_rgba(2,6,23,0.65)] rounded-2xl z-45"
        style={{
          top: `${coords.top}px`,
          left: `${coords.left}px`,
          width: `${coords.width}px`,
          height: `${coords.height}px`,
        }}
      />

      {/* Tooltip Card */}
      <div 
        className="bg-white/95 dark:bg-zinc-950/95 backdrop-blur-md border border-slate-200 dark:border-zinc-800/80 rounded-2xl p-5 shadow-2xl pointer-events-auto z-50 flex flex-col gap-4 animate-fade-in"
        style={tooltipStyle}
      >
        {/* Card Header */}
        <div className="flex items-center justify-between">
          <span className="text-[10px] font-bold text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-100 dark:border-emerald-900/30 px-2 py-1 rounded-md uppercase tracking-wider">
            Step {onboardingStep + 1} of {tourSteps.length}
          </span>
          <button 
            onClick={completeOnboarding}
            className="p-1 hover:bg-slate-100 dark:hover:bg-zinc-900 text-slate-400 dark:text-zinc-500 hover:text-slate-600 dark:hover:text-zinc-300 rounded-lg transition-colors cursor-pointer"
            title="Skip Tour"
          >
            <X size={16} />
          </button>
        </div>

        {/* Card Content */}
        <div>
          <h3 className="text-base font-extrabold text-slate-900 dark:text-zinc-50 flex items-center gap-1.5 mb-1.5">
            {currentStep.title}
          </h3>
          <p className="text-xs font-semibold leading-relaxed text-slate-500 dark:text-zinc-400">
            {currentStep.description}
          </p>
        </div>

        {/* Card Footer controls */}
        <div className="flex items-center justify-between border-t border-slate-100 dark:border-zinc-900 pt-4 mt-1">
          {/* Progress dots */}
          <div className="flex gap-1.5">
            {tourSteps.map((_, index) => (
              <div 
                key={index}
                className={`w-1.5 h-1.5 rounded-full transition-all duration-200 
                  ${index === onboardingStep 
                    ? 'w-4 bg-emerald-600 dark:bg-emerald-500' 
                    : 'bg-slate-200 dark:bg-zinc-800'}`}
              />
            ))}
          </div>

          <div className="flex items-center gap-2">
            {onboardingStep > 0 && (
              <button
                onClick={handleBack}
                className="flex items-center gap-1 px-3 py-1.5 bg-slate-50 hover:bg-slate-100 dark:bg-zinc-900 dark:hover:bg-zinc-850 border border-slate-200 dark:border-zinc-800 rounded-lg text-xs font-bold text-slate-600 dark:text-zinc-400 transition-colors cursor-pointer"
              >
                <ArrowLeft size={12} />
                <span>Back</span>
              </button>
            )}
            
            <button
              onClick={handleNext}
              className="flex items-center gap-1 px-3 py-1.5 bg-emerald-600 hover:bg-emerald-500 text-white rounded-lg text-xs font-bold transition-colors cursor-pointer shadow-sm active:scale-95"
            >
              <span>{onboardingStep === tourSteps.length - 1 ? 'Finish' : 'Next'}</span>
              <ArrowRight size={12} />
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}
