"use client";

import React from "react";
import { X, Sparkles, Check, AlertTriangle, Bug, ImageOff, Coffee } from "lucide-react";
import { DEMO_SAMPLES } from "@/lib/demo-data";
import { DemoSample } from "@/types/plant";

interface DemoModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectSample: (sample: DemoSample) => void;
  onSimulateError: (type: "api_failure" | "invalid_file") => void;
}

export function DemoModal({
  isOpen,
  onClose,
  onSelectSample,
  onSimulateError,
}: DemoModalProps) {
  if (!isOpen) return null;

  const getTypeIcon = (type: string) => {
    switch (type) {
      case "healthy":
        return <Check className="w-4 h-4 text-emerald-600" />;
      case "diseased":
        return <AlertTriangle className="w-4 h-4 text-amber-600" />;
      case "pest":
        return <Bug className="w-4 h-4 text-orange-600" />;
      case "unclear":
        return <ImageOff className="w-4 h-4 text-stone-600" />;
      case "non-plant":
        return <Coffee className="w-4 h-4 text-rose-600" />;
      default:
        return <Sparkles className="w-4 h-4 text-brand-600" />;
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-900/60 backdrop-blur-xs animate-fadeIn">
      <div className="bg-white rounded-3xl max-w-2xl w-full border border-stone-200 shadow-2xl overflow-hidden max-h-[90vh] flex flex-col">
        {/* Header */}
        <div className="p-5 sm:p-6 border-b border-stone-100 flex items-center justify-between bg-stone-50/70">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-xl bg-brand-100 text-brand-700 flex items-center justify-center">
              <Sparkles className="w-4 h-4" />
            </div>
            <div>
              <h3 className="font-bold text-base text-stone-900">
                PlantCare AI Interactive Demo
              </h3>
              <p className="text-xs text-stone-500">
                Explore real test cases without needing an API key
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full hover:bg-stone-200 flex items-center justify-center text-stone-500 transition cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content list */}
        <div className="p-5 sm:p-6 space-y-4 overflow-y-auto">
          <div className="space-y-2">
            <h4 className="text-xs uppercase tracking-wider font-bold text-stone-500">
              Select a Test Scenario
            </h4>
            <div className="space-y-2">
              {DEMO_SAMPLES.map((sample) => (
                <button
                  key={sample.id}
                  onClick={() => {
                    onSelectSample(sample);
                    onClose();
                  }}
                  className="w-full text-left p-3.5 rounded-2xl border border-stone-200 hover:border-brand-500 hover:bg-brand-50/40 transition flex items-center gap-4 group cursor-pointer"
                >
                  <img
                    src={sample.imageUrl}
                    alt={sample.title}
                    className="w-14 h-14 rounded-xl object-cover border border-stone-200 flex-shrink-0"
                  />
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-sm text-stone-900 group-hover:text-brand-800">
                        {sample.title}
                      </span>
                      <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-stone-100 text-stone-600 border border-stone-200 flex items-center gap-1">
                        {getTypeIcon(sample.type)}
                        {sample.type.toUpperCase()}
                      </span>
                    </div>
                    <p className="text-xs text-stone-500 truncate mt-0.5">
                      {sample.subtitle}
                    </p>
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Error and Edge Case Testing */}
          <div className="pt-2 border-t border-stone-100 space-y-2">
            <h4 className="text-xs uppercase tracking-wider font-bold text-stone-500">
              Simulate Error Boundaries &amp; Failures
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              <button
                onClick={() => {
                  onSimulateError("api_failure");
                  onClose();
                }}
                className="p-3 rounded-xl border border-rose-200 bg-rose-50/60 hover:bg-rose-100/60 text-left transition cursor-pointer text-xs"
              >
                <span className="font-bold text-rose-800 block">Simulate API / Gemma Failure</span>
                <span className="text-rose-600 text-[11px]">Tests 500 error handling &amp; recovery UI</span>
              </button>

              <button
                onClick={() => {
                  onSimulateError("invalid_file");
                  onClose();
                }}
                className="p-3 rounded-xl border border-amber-200 bg-amber-50/60 hover:bg-amber-100/60 text-left transition cursor-pointer text-xs"
              >
                <span className="font-bold text-amber-800 block">Simulate Corrupted File Upload</span>
                <span className="text-amber-600 text-[11px]">Tests client &amp; server size/format gate</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
