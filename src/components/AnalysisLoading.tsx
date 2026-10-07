"use client";

import React, { useEffect, useState } from "react";
import { Loader2, Leaf, Eye, ShieldAlert, Footprints } from "lucide-react";

export function AnalysisLoading() {
  const [stepIndex, setStepIndex] = useState(0);

  const steps = [
    { icon: Leaf, label: "Scanning leaf architecture and chlorophyll pigmentation..." },
    { icon: Eye, label: "Evaluating foliage for lesions, spots, and structural stress..." },
    { icon: ShieldAlert, label: "Gemma reasoning: Cross-referencing visual symptoms..." },
    { icon: Footprints, label: "Synthesizing care recommendations and Touch Grass task..." }
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setStepIndex((prev) => (prev < steps.length - 1 ? prev + 1 : prev));
    }, 1200);
    return () => clearInterval(timer);
  }, [steps.length]);

  const CurrentIcon = steps[stepIndex].icon;

  return (
    <div className="w-full max-w-xl mx-auto py-16 px-6 text-center">
      <div className="relative w-24 h-24 mx-auto mb-8">
        {/* Glowing pulse rings */}
        <div className="absolute inset-0 rounded-full bg-brand-400/20 animate-ping" />
        <div className="absolute inset-0 rounded-full bg-brand-500/10 animate-pulse" />
        <div className="relative w-24 h-24 rounded-full bg-gradient-to-tr from-brand-700 to-brand-500 flex items-center justify-center text-white shadow-lg shadow-brand-600/30">
          <CurrentIcon className="w-10 h-10 transition-transform duration-500 scale-110" />
        </div>
      </div>

      <div className="space-y-3">
        <h3 className="text-xl font-bold text-stone-900 tracking-tight flex items-center justify-center gap-2">
          <Loader2 className="w-5 h-5 animate-spin text-brand-600" />
          <span>Gemma is Analyzing Your Plant</span>
        </h3>
        <p className="text-sm font-medium text-brand-700 transition-all duration-300 min-h-[24px]">
          {steps[stepIndex].label}
        </p>
      </div>

      {/* Progress pill steps */}
      <div className="flex items-center justify-center gap-2 mt-8">
        {steps.map((_, index) => (
          <div
            key={index}
            className={`h-1.5 rounded-full transition-all duration-500 ${
              index <= stepIndex ? "w-8 bg-brand-600" : "w-3 bg-stone-200"
            }`}
          />
        ))}
      </div>
    </div>
  );
}
