"use client";

import React from "react";
import { Sprout, Compass, ShieldCheck, Sparkles, ExternalLink } from "lucide-react";

interface HeaderProps {
  onOpenDemo: () => void;
  onScrollToExplainer: () => void;
}

export function Header({ onOpenDemo, onScrollToExplainer }: HeaderProps) {
  return (
    <header className="sticky top-0 z-30 bg-white/85 backdrop-blur-md border-b border-brand-100 shadow-sm transition-all">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
        {/* Brand */}
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-brand-700 to-brand-500 flex items-center justify-center text-white shadow-md shadow-brand-500/20">
            <Sprout className="w-6 h-6" />
          </div>
          <div>
            <div className="flex items-center space-x-2">
              <span className="font-bold text-lg text-stone-900 tracking-tight">PlantLens</span>
              <span className="text-xs px-2 py-0.5 rounded-full font-semibold bg-brand-100 text-brand-800 border border-brand-200">
                AI
              </span>
            </div>
            <p className="text-[11px] text-stone-500 font-medium hidden sm:block">
              Powered by Gemma Multimodal Vision
            </p>
          </div>
        </div>

        {/* Action items */}
        <div className="flex items-center space-x-2 sm:space-x-4">
          <button
            onClick={onScrollToExplainer}
            className="hidden md:flex items-center space-x-1.5 text-xs font-medium text-stone-600 hover:text-brand-700 px-3 py-2 rounded-lg hover:bg-brand-50 transition"
          >
            <Compass className="w-4 h-4 text-brand-600" />
            <span>Why Gemma?</span>
          </button>

          <button
            onClick={onOpenDemo}
            className="flex items-center space-x-1.5 text-xs font-semibold text-brand-700 bg-brand-50 hover:bg-brand-100 border border-brand-200 px-3.5 py-2 rounded-lg transition shadow-xs"
          >
            <Sparkles className="w-4 h-4 text-brand-600" />
            <span>Try Demo</span>
          </button>

          <div className="h-4 w-px bg-stone-200 hidden sm:block" />

          <div className="flex items-center space-x-1 text-xs text-stone-500 bg-stone-50 px-2.5 py-1.5 rounded-full border border-stone-200 hidden sm:flex">
            <ShieldCheck className="w-3.5 h-3.5 text-brand-600" />
            <span>Ephemeral • No Photo Stored</span>
          </div>
        </div>
      </div>
    </header>
  );
}
