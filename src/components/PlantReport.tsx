"use client";

import React, { useState } from "react";
import {
  PlantAnalysisResult,
  HealthStatus,
  ConfidenceLevel,
} from "@/types/plant";
import {
  CheckCircle2,
  AlertTriangle,
  AlertOctagon,
  HelpCircle,
  Droplets,
  Sun,
  Layers,
  Sparkles,
  ArrowLeft,
  Check,
  ShieldAlert,
  Footprints,
  Bug,
  Share2
} from "lucide-react";

interface PlantReportProps {
  result: PlantAnalysisResult;
  imagePreviewUrl?: string | null;
  onReset: () => void;
}

export function PlantReport({ result, imagePreviewUrl, onReset }: PlantReportProps) {
  const [didTouchGrass, setDidTouchGrass] = useState(false);
  const [copied, setCopied] = useState(false);

  // Status visual configurations
  const getStatusConfig = (status: HealthStatus) => {
    switch (status) {
      case "Healthy":
        return {
          icon: CheckCircle2,
          color: "text-emerald-700 bg-emerald-50 border-emerald-200",
          headline: "🌿 Healthy",
        };
      case "Mostly Healthy":
        return {
          icon: CheckCircle2,
          color: "text-teal-700 bg-teal-50 border-teal-200",
          headline: "🌱 Mostly Healthy",
        };
      case "Needs Attention":
        return {
          icon: AlertTriangle,
          color: "text-amber-800 bg-amber-50 border-amber-200",
          headline: "⚠️ Needs Attention",
        };
      case "Unhealthy":
        return {
          icon: AlertOctagon,
          color: "text-rose-800 bg-rose-50 border-rose-200",
          headline: "🚨 Unhealthy",
        };
      default:
        return {
          icon: HelpCircle,
          color: "text-stone-800 bg-stone-100 border-stone-200",
          headline: "❓ Unknown",
        };
    }
  };

  const statusConfig = getStatusConfig(result.health_status);
  const StatusIcon = statusConfig.icon;

  const handleShare = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(
        `PlantLens AI Report for ${result.plant_name}:\nPlant: ${result.plant_name}\nHealth: ${result.health_status}\nConfidence: ${result.plant_confidence}`
      );
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div className="w-full max-w-4xl mx-auto space-y-8 animate-fadeIn pb-12">
      {/* Top action bar */}
      <div className="flex items-center justify-between">
        <button
          onClick={onReset}
          className="flex items-center gap-1.5 text-xs sm:text-sm font-semibold text-stone-600 hover:text-stone-900 bg-white hover:bg-stone-100 border border-stone-200 px-3.5 py-2 rounded-xl transition shadow-xs cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Analyze Another Plant</span>
        </button>

        <div className="flex items-center gap-2">
          {result.model_used && (
            <span className="text-[11px] font-mono px-2.5 py-1 rounded-md bg-stone-100 text-stone-600 border border-stone-200 hidden sm:inline-block">
              Model: {result.model_used}
            </span>
          )}
          <button
            onClick={handleShare}
            className="flex items-center gap-1.5 text-xs font-semibold text-stone-700 bg-white hover:bg-stone-100 border border-stone-200 px-3 py-2 rounded-xl transition cursor-pointer"
          >
            {copied ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Share2 className="w-3.5 h-3.5" />}
            <span>{copied ? "Copied!" : "Share Report"}</span>
          </button>
        </div>
      </div>

      {/* Main Report Card */}
      <div className="bg-white/90 backdrop-blur-md rounded-3xl border border-stone-200/80 shadow-card overflow-hidden">
        {/* Header Banner - Matches ## 🪴 Your Plant Report */}
        <div className="p-6 sm:p-8 bg-gradient-to-br from-brand-50/70 via-white to-stone-50 border-b border-stone-100">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div className="space-y-3">
              <h2 className="text-2xl sm:text-3xl font-black text-stone-900 tracking-tight flex items-center gap-2">
                <span>🪴 Your Plant Report</span>
              </h2>

              {/* Exact format: **Plant:** ... **Health:** ... **Confidence:** ... */}
              <div className="p-4 rounded-2xl bg-white/90 border border-stone-200/90 shadow-2xs space-y-1.5 font-mono text-sm sm:text-base">
                <div className="flex flex-wrap items-baseline gap-2">
                  <span className="font-bold text-stone-900">Plant:</span>
                  <span className="font-semibold text-brand-800">{result.plant_name}</span>
                  {result.scientific_name && result.scientific_name !== "Unable to determine reliably from this image." && (
                    <span className="text-xs text-stone-500 italic">({result.scientific_name})</span>
                  )}
                </div>

                <div className="flex flex-wrap items-baseline gap-2">
                  <span className="font-bold text-stone-900">Health:</span>
                  <span className={`font-semibold px-2 py-0.5 rounded-md text-xs sm:text-sm ${
                    result.health_status === "Healthy"
                      ? "bg-emerald-100 text-emerald-800"
                      : result.health_status === "Needs Attention"
                      ? "bg-amber-100 text-amber-800"
                      : "bg-stone-100 text-stone-800"
                  }`}>
                    {result.health_status}
                  </span>
                </div>

                <div className="flex flex-wrap items-baseline gap-2">
                  <span className="font-bold text-stone-900">Confidence:</span>
                  <span className="font-semibold text-stone-700">{result.plant_confidence}</span>
                </div>
              </div>
            </div>

            {imagePreviewUrl && (
              <div className="w-28 h-28 sm:w-32 sm:h-32 rounded-2xl overflow-hidden border-2 border-white shadow-md flex-shrink-0 bg-stone-100">
                <img
                  src={imagePreviewUrl}
                  alt={result.plant_name}
                  className="w-full h-full object-cover"
                />
              </div>
            )}
          </div>
        </div>

        {/* Report Content Body */}
        <div className="p-6 sm:p-8 space-y-8">
          {/* 1. ❤️ Plant Health Section */}
          <section className="space-y-3">
            <h3 className="text-sm uppercase tracking-wider font-extrabold text-stone-700 flex items-center gap-1.5">
              <span>❤️ Plant Health</span>
            </h3>

            <div className={`p-5 rounded-2xl border ${statusConfig.color} shadow-xs space-y-2`}>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-white shadow-xs flex items-center justify-center flex-shrink-0">
                  <StatusIcon className="w-6 h-6 text-current" />
                </div>
                <h3 className="text-xl font-black text-stone-900">
                  {statusConfig.headline}
                </h3>
              </div>
              <p className="text-sm text-stone-800 leading-relaxed font-medium italic pl-1">
                &ldquo;{result.health_summary}&rdquo;
              </p>
            </div>
          </section>

          {/* 2. 🦠 POSSIBLE DISEASE SECTION (Crucial Section) */}
          <section className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-sm uppercase tracking-wider font-extrabold text-stone-700 flex items-center gap-1.5">
                <span>🦠 Possible Disease</span>
              </h3>
              <span className="text-xs text-stone-500 font-medium">
                {result.possible_diseases.length} condition(s) evaluated
              </span>
            </div>

            {result.possible_diseases.length > 0 ? (
              <div className="space-y-3">
                {result.possible_diseases.map((disease, idx) => (
                  <div
                    key={idx}
                    className="p-5 rounded-2xl bg-amber-50/70 border border-amber-200/90 space-y-2.5 transition hover:shadow-xs"
                  >
                    <div className="flex items-center justify-between flex-wrap gap-2">
                      <div className="flex items-center gap-2">
                        <Bug className="w-5 h-5 text-amber-700" />
                        <h4 className="text-base font-bold text-stone-900">
                          {disease.name}
                        </h4>
                      </div>
                      <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-amber-100 text-amber-800 border border-amber-300">
                        Confidence: <strong>{disease.confidence}</strong>
                      </span>
                    </div>

                    <div className="text-sm text-stone-700 leading-relaxed pl-7">
                      <span className="font-semibold text-stone-900">Reason: </span>
                      &ldquo;{disease.reason}&rdquo;
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="p-5 rounded-2xl bg-emerald-50/60 border border-emerald-200 text-emerald-800 text-sm flex items-center gap-3">
                <CheckCircle2 className="w-5 h-5 flex-shrink-0 text-emerald-600" />
                <span>
                  <strong>No acute disease identified.</strong> Foliage appears clean and free of obvious fungal or bacterial spotting.
                </span>
              </div>
            )}

            {/* Crucial Warning Disclaimer */}
            <div className="p-4 rounded-xl bg-amber-50/60 border border-amber-200 text-amber-900 text-xs flex items-start gap-3">
              <ShieldAlert className="w-4 h-4 text-amber-700 flex-shrink-0 mt-0.5" />
              <p className="leading-relaxed">
                <strong>⚠️ Warning:</strong> This is an AI-based visual assessment and is not a professional plant disease diagnosis.
              </p>
            </div>
          </section>

          {/* 3. 👁️ VISIBLE SYMPTOMS & POSSIBLE CAUSES */}
          <section className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
            {/* Symptoms */}
            <div className="p-5 rounded-2xl bg-stone-50/80 border border-stone-200 space-y-3">
              <h3 className="text-xs uppercase tracking-wider font-extrabold text-stone-700 flex items-center gap-1.5">
                <span>👁️ Visible Symptoms</span>
              </h3>
              {result.visible_symptoms && result.visible_symptoms.length > 0 ? (
                <ul className="space-y-1.5 text-xs text-stone-800 font-medium">
                  {result.visible_symptoms.map((symptom, i) => (
                    <li key={i} className="flex items-start gap-2 bg-white p-2 rounded-lg border border-stone-200">
                      <span className="w-1.5 h-1.5 rounded-full bg-amber-500 mt-1.5 flex-shrink-0" />
                      <span>{symptom}</span>
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="text-xs text-stone-400 italic">No adverse visible symptoms spotted.</p>
              )}
            </div>

            {/* Possible Causes */}
            <div className="p-5 rounded-2xl bg-stone-50/80 border border-stone-200 space-y-3">
              <h3 className="text-xs uppercase tracking-wider font-extrabold text-stone-700 flex items-center gap-1.5">
                <span>🔍 Possible Causes</span>
              </h3>
              {result.possible_causes && result.possible_causes.length > 0 ? (
                <ul className="space-y-1.5 text-xs text-stone-800 font-medium">
                  {result.possible_causes.map((cause, i) => (
                    <li key={i} className="flex items-start gap-2 bg-white p-2 rounded-lg border border-stone-200">
                      <span className="w-1.5 h-1.5 rounded-full bg-stone-500 mt-1.5 flex-shrink-0" />
                      <span>{cause}</span>
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="text-xs text-stone-400 italic">No environmental stress factors identified.</p>
              )}
            </div>
          </section>

          {/* 4. 💧 WATERING & SUNLIGHT */}
          <section className="space-y-4 pt-2">
            <h3 className="text-xs uppercase tracking-wider font-extrabold text-stone-700 flex items-center gap-1.5">
              <span>💧 Watering &amp; Environment</span>
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {/* Watering */}
              <div className="p-4 rounded-2xl bg-blue-50/60 border border-blue-100 space-y-2">
                <div className="flex items-center gap-2 text-blue-800 font-bold text-sm">
                  <Droplets className="w-4 h-4 text-blue-600" />
                  <span>Watering</span>
                </div>
                <p className="text-xs text-stone-700 leading-relaxed font-semibold">
                  {result.watering}
                </p>
              </div>

              {/* Sunlight */}
              <div className="p-4 rounded-2xl bg-amber-50/60 border border-amber-100 space-y-2">
                <div className="flex items-center gap-2 text-amber-800 font-bold text-sm">
                  <Sun className="w-4 h-4 text-amber-600" />
                  <span>Sunlight</span>
                </div>
                <p className="text-xs text-stone-700 leading-relaxed font-semibold">
                  {result.sunlight}
                </p>
              </div>

              {/* Soil */}
              <div className="p-4 rounded-2xl bg-emerald-50/60 border border-emerald-100 space-y-2">
                <div className="flex items-center gap-2 text-emerald-800 font-bold text-sm">
                  <Layers className="w-4 h-4 text-emerald-600" />
                  <span>Soil</span>
                </div>
                <p className="text-xs text-stone-700 leading-relaxed font-semibold">
                  {result.soil}
                </p>
              </div>
            </div>
          </section>

          {/* 5. RECOMMENDED ACTIONS */}
          <section className="space-y-3 pt-2">
            <h3 className="text-xs uppercase tracking-wider font-extrabold text-stone-700">
              📋 Recommended Actions
            </h3>

            <div className="space-y-2.5">
              {result.recommended_actions.map((action, i) => (
                <div
                  key={i}
                  className="flex items-start gap-3 p-3.5 rounded-xl bg-stone-50/70 border border-stone-200 text-stone-800 text-sm"
                >
                  <span className="w-6 h-6 rounded-full bg-brand-100 text-brand-800 font-bold text-xs flex items-center justify-center flex-shrink-0 mt-0.5">
                    {i + 1}
                  </span>
                  <span className="leading-relaxed font-medium">{action}</span>
                </div>
              ))}
            </div>
          </section>

          {/* 6. 🪴 TOUCH GRASS FEATURE (Hacktoberfest Theme) */}
          <section className="pt-4">
            <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-brand-900 via-brand-800 to-brand-950 text-white p-6 sm:p-8 shadow-elevated border border-brand-700/50">
              <div className="absolute top-0 right-0 -mt-10 -mr-10 w-48 h-48 bg-brand-500/10 rounded-full blur-2xl pointer-events-none" />

              <div className="relative space-y-5">
                <div className="flex items-center gap-2 text-brand-300 text-xs uppercase tracking-wider font-bold">
                  <Footprints className="w-4 h-4 text-brand-400" />
                  <span>Hacktoberfest 2024 • Touch Grass Challenge</span>
                </div>

                <div className="space-y-2">
                  <h1 className="text-2xl sm:text-3xl font-black tracking-tight text-white">
                    🪴 Now Go Take Care of It
                  </h1>
                  <p className="text-brand-200 text-xs sm:text-sm font-medium">
                    Photo → AI insight → Go outside → Care for plant. The screen should be the shortest part of the experience.
                  </p>
                </div>

                {/* The single outdoor action */}
                <div className="p-4 sm:p-5 rounded-2xl bg-white/10 backdrop-blur-sm border border-white/15">
                  <p className="text-base sm:text-lg font-bold text-brand-50 italic leading-relaxed">
                    ***{result.touch_grass_task}***
                  </p>
                </div>

                {/* Interactive Action Button: ### ✓ I Did It */}
                {!didTouchGrass ? (
                  <button
                    type="button"
                    onClick={() => setDidTouchGrass(true)}
                    className="w-full sm:w-auto px-7 py-3.5 rounded-xl font-black text-sm bg-brand-400 hover:bg-brand-300 text-brand-950 transition-all shadow-md shadow-brand-900/50 flex items-center justify-center gap-2 cursor-pointer hover:scale-[1.02] active:scale-[0.98]"
                  >
                    <Check className="w-4 h-4 stroke-[3]" />
                    <span>✓ I Did It</span>
                  </button>
                ) : (
                  <div className="p-5 rounded-2xl bg-emerald-500/20 border border-emerald-400/40 text-emerald-100 space-y-2 animate-fadeIn">
                    <div className="flex items-center gap-2 text-emerald-300 font-bold text-base">
                      <Sparkles className="w-5 h-5 text-emerald-300 animate-spin" />
                      <span>🪴 Mission Complete!</span>
                    </div>
                    <p className="text-sm sm:text-base font-bold text-emerald-50 leading-relaxed">
                      🪴 Nice! You just spent less time on your screen and more time caring for something real.
                    </p>
                  </div>
                )}
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
