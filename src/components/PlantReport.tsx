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
  Info,
  Bug,
  ThermometerSnowflake,
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
          badgeColor: "bg-emerald-600 text-white",
          ringColor: "ring-emerald-500/20",
          headline: "Healthy & Thriving",
        };
      case "Mostly Healthy":
        return {
          icon: CheckCircle2,
          color: "text-teal-700 bg-teal-50 border-teal-200",
          badgeColor: "bg-teal-600 text-white",
          ringColor: "ring-teal-500/20",
          headline: "Mostly Healthy",
        };
      case "Needs Attention":
        return {
          icon: AlertTriangle,
          color: "text-amber-800 bg-amber-50 border-amber-200",
          badgeColor: "bg-amber-600 text-white",
          ringColor: "ring-amber-500/20",
          headline: "⚠️ Needs Attention",
        };
      case "Unhealthy":
        return {
          icon: AlertOctagon,
          color: "text-rose-800 bg-rose-50 border-rose-200",
          badgeColor: "bg-rose-600 text-white",
          ringColor: "ring-rose-500/20",
          headline: "🚨 Unhealthy / Distressed",
        };
      default:
        return {
          icon: HelpCircle,
          color: "text-stone-800 bg-stone-100 border-stone-200",
          badgeColor: "bg-stone-600 text-white",
          ringColor: "ring-stone-500/20",
          headline: "Unknown / Inconclusive",
        };
    }
  };

  const getConfidenceBadge = (confidence: ConfidenceLevel) => {
    const style =
      confidence === "High"
        ? "bg-emerald-100 text-emerald-800 border-emerald-300"
        : confidence === "Medium"
        ? "bg-amber-100 text-amber-800 border-amber-300"
        : "bg-stone-100 text-stone-700 border-stone-300";
    return (
      <span className={`text-xs px-2.5 py-0.5 rounded-full font-semibold border ${style}`}>
        Confidence: {confidence}
      </span>
    );
  };

  const statusConfig = getStatusConfig(result.health_status);
  const StatusIcon = statusConfig.icon;

  const handleShare = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(
        `PlantLens AI Report for ${result.plant_name}: Status is ${result.health_status}. Analysis by Gemma open-weight AI.`
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
      <div className="bg-white rounded-3xl border border-stone-200 shadow-card overflow-hidden">
        {/* Header Banner */}
        <div className="p-6 sm:p-8 bg-gradient-to-br from-brand-50/70 via-white to-stone-50 border-b border-stone-100">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div className="space-y-2">
              <div className="flex items-center gap-2 flex-wrap">
                <span className="text-xs uppercase tracking-wider font-bold text-brand-700 bg-brand-100/80 px-2.5 py-1 rounded-md">
                  🪴 Your Plant Report
                </span>
                {getConfidenceBadge(result.plant_confidence)}
              </div>

              <h1 className="text-2xl sm:text-3xl font-extrabold text-stone-900 tracking-tight">
                {result.plant_name}
              </h1>

              <p className="text-sm italic text-stone-500 font-medium">
                Scientific name: {result.scientific_name}
              </p>
            </div>

            {imagePreviewUrl && (
              <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-2xl overflow-hidden border-2 border-white shadow-md flex-shrink-0 bg-stone-100">
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
          {/* 1. ❤️ Plant Health Visual Section */}
          <section className="space-y-3">
            <h2 className="text-xs uppercase tracking-wider font-bold text-stone-500 flex items-center gap-1.5">
              <span>❤️ Plant Health Status</span>
            </h2>

            <div className={`p-5 rounded-2xl border ${statusConfig.color} shadow-xs`}>
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-xl bg-white shadow-xs flex items-center justify-center flex-shrink-0">
                  <StatusIcon className="w-7 h-7 text-current" />
                </div>
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <h3 className="text-lg font-bold text-stone-900">
                      {statusConfig.headline}
                    </h3>
                  </div>
                  <p className="text-sm text-stone-700 leading-relaxed font-normal">
                    &ldquo;{result.health_summary}&rdquo;
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* 2. 🦠 POSSIBLE DISEASE SECTION (Crucial Section) */}
          <section className="space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-xs uppercase tracking-wider font-bold text-stone-500 flex items-center gap-1.5">
                <span>🦠 Possible Disease &amp; Pathology Assessment</span>
              </h2>
              <span className="text-xs text-stone-400 font-medium">
                {result.possible_diseases.length} potential issue(s) evaluated
              </span>
            </div>

            {result.possible_diseases.length > 0 ? (
              <div className="space-y-3">
                {result.possible_diseases.map((disease, idx) => (
                  <div
                    key={idx}
                    className="p-5 rounded-2xl bg-amber-50/60 border border-amber-200/80 space-y-2.5 transition hover:shadow-xs"
                  >
                    <div className="flex items-center justify-between flex-wrap gap-2">
                      <div className="flex items-center gap-2">
                        <Bug className="w-5 h-5 text-amber-700" />
                        <h3 className="text-base font-bold text-stone-900">
                          {disease.name}
                        </h3>
                      </div>
                      <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-amber-100 text-amber-800 border border-amber-300">
                        Confidence: <strong>{disease.confidence}</strong>
                      </span>
                    </div>

                    <div className="text-sm text-stone-700 leading-relaxed pl-7">
                      <span className="font-semibold text-stone-900">Visual Reason: </span>
                      &ldquo;{disease.reason}&rdquo;
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="p-5 rounded-2xl bg-emerald-50/60 border border-emerald-200 text-emerald-800 text-sm flex items-center gap-3">
                <CheckCircle2 className="w-5 h-5 flex-shrink-0 text-emerald-600" />
                <span>
                  <strong>No major pathology or disease detected.</strong> Foliage appears clean and free of acute fungal or bacterial lesions.
                </span>
              </div>
            )}

            {/* Crucial Warning Disclaimer */}
            <div className="p-4 rounded-xl bg-stone-50 border border-stone-200 text-stone-600 text-xs flex items-start gap-3">
              <ShieldAlert className="w-4 h-4 text-amber-600 flex-shrink-0 mt-0.5" />
              <p className="leading-relaxed">
                <strong>Disclaimer:</strong> This is an AI-based visual assessment and is not a professional plant disease diagnosis. Soil tests, microscopic pathology, and regional extension advice should be consulted before making extensive agricultural interventions.
              </p>
            </div>
          </section>

          {/* 3. 👁️ VISIBLE SYMPTOMS & POSSIBLE CAUSES */}
          <section className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
            {/* Symptoms */}
            <div className="p-5 rounded-2xl bg-stone-50/80 border border-stone-200 space-y-3">
              <h3 className="text-xs uppercase tracking-wider font-bold text-stone-600 flex items-center gap-1.5">
                <span>👁️ Visible Symptoms</span>
              </h3>
              {result.visible_symptoms && result.visible_symptoms.length > 0 ? (
                <div className="flex flex-wrap gap-2">
                  {result.visible_symptoms.map((symptom, i) => (
                    <span
                      key={i}
                      className="px-3 py-1.5 rounded-lg text-xs font-medium bg-white text-stone-800 border border-stone-200 shadow-2xs"
                    >
                      • {symptom}
                    </span>
                  ))}
                </div>
              ) : (
                <p className="text-xs text-stone-400 italic">No adverse visible symptoms spotted.</p>
              )}
            </div>

            {/* Possible Causes */}
            <div className="p-5 rounded-2xl bg-stone-50/80 border border-stone-200 space-y-3">
              <h3 className="text-xs uppercase tracking-wider font-bold text-stone-600 flex items-center gap-1.5">
                <span>🔍 Possible Causes</span>
              </h3>
              {result.possible_causes && result.possible_causes.length > 0 ? (
                <div className="flex flex-wrap gap-2">
                  {result.possible_causes.map((cause, i) => (
                    <span
                      key={i}
                      className="px-3 py-1.5 rounded-lg text-xs font-medium bg-white text-stone-800 border border-stone-200 shadow-2xs"
                    >
                      • {cause}
                    </span>
                  ))}
                </div>
              ) : (
                <p className="text-xs text-stone-400 italic">No environmental stress factors identified.</p>
              )}
            </div>
          </section>

          {/* 4. 💧 CARE RECOMMENDATIONS (Water, Sun, Soil) */}
          <section className="space-y-4 pt-2">
            <h2 className="text-xs uppercase tracking-wider font-bold text-stone-500">
              💧 Environment &amp; Care Requirements
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {/* Watering */}
              <div className="p-4 rounded-2xl bg-blue-50/60 border border-blue-100 space-y-2">
                <div className="flex items-center gap-2 text-blue-800 font-bold text-sm">
                  <Droplets className="w-4 h-4 text-blue-600" />
                  <span>Watering</span>
                </div>
                <p className="text-xs text-stone-700 leading-relaxed">
                  {result.watering}
                </p>
              </div>

              {/* Sunlight */}
              <div className="p-4 rounded-2xl bg-amber-50/60 border border-amber-100 space-y-2">
                <div className="flex items-center gap-2 text-amber-800 font-bold text-sm">
                  <Sun className="w-4 h-4 text-amber-600" />
                  <span>Sunlight</span>
                </div>
                <p className="text-xs text-stone-700 leading-relaxed">
                  {result.sunlight}
                </p>
              </div>

              {/* Soil */}
              <div className="p-4 rounded-2xl bg-emerald-50/60 border border-emerald-100 space-y-2">
                <div className="flex items-center gap-2 text-emerald-800 font-bold text-sm">
                  <Layers className="w-4 h-4 text-emerald-600" />
                  <span>Soil &amp; Potting</span>
                </div>
                <p className="text-xs text-stone-700 leading-relaxed">
                  {result.soil}
                </p>
              </div>
            </div>
          </section>

          {/* 5. 📋 RECOMMENDED ACTIONS (3-5 Practical Steps) */}
          <section className="space-y-3 pt-2">
            <h2 className="text-xs uppercase tracking-wider font-bold text-stone-500">
              📋 Recommended Practical Actions
            </h2>

            <div className="space-y-2.5">
              {result.recommended_actions.map((action, i) => (
                <div
                  key={i}
                  className="flex items-start gap-3 p-3.5 rounded-xl bg-stone-50/70 border border-stone-200 text-stone-800 text-sm"
                >
                  <span className="w-6 h-6 rounded-full bg-brand-100 text-brand-800 font-bold text-xs flex items-center justify-center flex-shrink-0 mt-0.5">
                    {i + 1}
                  </span>
                  <span className="leading-relaxed">{action}</span>
                </div>
              ))}
            </div>
          </section>

          {/* 6. 🪴 TOUCH GRASS FEATURE (Mandatory Challenge Highlight) */}
          <section className="pt-4">
            <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-brand-900 via-brand-800 to-brand-950 text-white p-6 sm:p-8 shadow-elevated border border-brand-700/50">
              {/* Subtle foliage background effect */}
              <div className="absolute top-0 right-0 -mt-10 -mr-10 w-48 h-48 bg-brand-500/10 rounded-full blur-2xl pointer-events-none" />

              <div className="relative space-y-5">
                <div className="flex items-center gap-2 text-brand-300 text-xs uppercase tracking-wider font-bold">
                  <Footprints className="w-4 h-4 text-brand-400" />
                  <span>Hacktoberfest • Touch Grass Task</span>
                </div>

                <div className="space-y-2">
                  <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-white">
                    🪴 Now Go Take Care of It
                  </h2>
                  <p className="text-brand-200 text-xs sm:text-sm font-medium">
                    The screen should be the shortest part of your plant journey: Photo → AI insight → Go outside → Care for plant.
                  </p>
                </div>

                {/* The single outdoor task */}
                <div className="p-4 sm:p-5 rounded-2xl bg-white/10 backdrop-blur-sm border border-white/15">
                  <p className="text-base sm:text-lg font-medium text-brand-50 italic leading-relaxed">
                    &ldquo;{result.touch_grass_task}&rdquo;
                  </p>
                </div>

                {/* Interactive Action Button */}
                {!didTouchGrass ? (
                  <button
                    type="button"
                    onClick={() => setDidTouchGrass(true)}
                    className="w-full sm:w-auto px-6 py-3.5 rounded-xl font-bold text-sm bg-brand-400 hover:bg-brand-300 text-brand-950 transition-all shadow-md shadow-brand-900/50 flex items-center justify-center gap-2 cursor-pointer hover:scale-[1.02] active:scale-[0.98]"
                  >
                    <Check className="w-4 h-4 stroke-[3]" />
                    <span>✓ I Did It</span>
                  </button>
                ) : (
                  <div className="p-5 rounded-2xl bg-emerald-500/20 border border-emerald-400/40 text-emerald-100 space-y-2 animate-fadeIn">
                    <div className="flex items-center gap-2 text-emerald-300 font-bold text-base">
                      <Sparkles className="w-5 h-5 text-emerald-300 animate-spin" />
                      <span>🪴 Task Completed!</span>
                    </div>
                    <p className="text-sm font-medium text-emerald-50 leading-relaxed">
                      <strong>🪴 Nice! You just spent less time on your screen and more time caring for something real.</strong>
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
