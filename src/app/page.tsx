"use client";

import React, { useState } from "react";
import { Header } from "@/components/Header";
import { Dropzone } from "@/components/Dropzone";
import { AnalysisLoading } from "@/components/AnalysisLoading";
import { PlantReport } from "@/components/PlantReport";
import { GemmaExplainer } from "@/components/GemmaExplainer";
import { DemoModal } from "@/components/DemoModal";
import { PlantAnalysisResult, DemoSample } from "@/types/plant";
import { AlertCircle, RefreshCw, Sparkles, Heart } from "lucide-react";

export default function Home() {
  const [result, setResult] = useState<PlantAnalysisResult | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [isDemoModalOpen, setIsDemoModalOpen] = useState(false);

  // Analyze uploaded user photo
  const handleAnalyzeFile = async (file: File) => {
    setIsAnalyzing(true);
    setErrorMessage(null);

    // Create local object URL for preview
    const previewUrl = URL.createObjectURL(file);
    setImagePreview(previewUrl);

    try {
      // Convert file to base64
      const reader = new FileReader();
      const base64Promise = new Promise<string>((resolve, reject) => {
        reader.onload = () => resolve(reader.result as string);
        reader.onerror = (err) => reject(err);
      });
      reader.readAsDataURL(file);
      const base64Data = await base64Promise;

      const response = await fetch("/api/analyze", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          imageBase64: base64Data,
          mimeType: file.type || "image/jpeg"
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        if (data.code === "MISSING_API_KEY") {
          throw new Error(
            "Gemma API key is not configured on the server yet. You can test immediately using 'Try Demo' mode, or configure GEMMA_API_KEY in your .env.local file."
          );
        }
        throw new Error(data.error || "Analysis failed.");
      }

      setResult(data.result);
      // Smooth scroll to top of report
      window.scrollTo({ top: 0, behavior: "smooth" });
    } catch (err: any) {
      console.error("Analysis failure:", err);
      setErrorMessage(err.message || "Failed to analyze plant photo. Please try again.");
    } finally {
      setIsAnalyzing(false);
    }
  };

  // Select a preset Demo Sample
  const handleSelectDemo = async (sample: DemoSample) => {
    setIsAnalyzing(true);
    setErrorMessage(null);
    setImagePreview(sample.imageUrl);

    try {
      const response = await fetch("/api/analyze", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ demoId: sample.id }),
      });
      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.error || "Failed to load demo sample.");
      }
      setResult(data.result);
      window.scrollTo({ top: 0, behavior: "smooth" });
    } catch {
      // Direct client fallback to ensure offline demo resilience
      setResult(sample.analysis);
      window.scrollTo({ top: 0, behavior: "smooth" });
    } finally {
      setIsAnalyzing(false);
    }
  };

  // Simulate edge cases / errors
  const handleSimulateError = (type: "api_failure" | "invalid_file") => {
    setIsAnalyzing(false);
    setResult(null);
    if (type === "api_failure") {
      setErrorMessage(
        "Gemma API simulated failure (502 Bad Gateway / Model Overloaded). PlantCare AI cleanly caught this upstream error without crashing."
      );
    } else {
      setErrorMessage(
        "Corrupted file payload rejected. PlantCare AI validated image headers and prevented malformed data from reaching the AI model."
      );
    }
  };

  const handleReset = () => {
    setResult(null);
    setImagePreview(null);
    setErrorMessage(null);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const scrollToExplainer = () => {
    const el = document.getElementById("gemma-explainer");
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <>
      <Header
        onOpenDemo={() => setIsDemoModalOpen(true)}
        onScrollToExplainer={scrollToExplainer}
      />

      <main className="flex-1 max-w-6xl w-full mx-auto px-4 sm:px-6 py-8 sm:py-12 space-y-12">
        {/* Error Banner */}
        {errorMessage && (
          <div className="w-full max-w-3xl mx-auto p-4 sm:p-5 rounded-2xl bg-rose-50 border border-rose-200 text-rose-800 flex items-start gap-3 shadow-xs animate-fadeIn">
            <AlertCircle className="w-5 h-5 flex-shrink-0 text-rose-600 mt-0.5" />
            <div className="flex-1 space-y-1 text-xs sm:text-sm">
              <p className="font-bold">Error Encountered</p>
              <p className="text-rose-700 leading-relaxed">{errorMessage}</p>
              <div className="pt-2 flex items-center gap-2">
                <button
                  onClick={() => setIsDemoModalOpen(true)}
                  className="px-3 py-1 rounded-lg bg-rose-700 text-white font-semibold text-xs hover:bg-rose-800 transition cursor-pointer flex items-center gap-1.5"
                >
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>Switch to Demo Mode</span>
                </button>
                <button
                  onClick={() => setErrorMessage(null)}
                  className="px-3 py-1 rounded-lg bg-rose-100 text-rose-800 font-semibold text-xs hover:bg-rose-200 transition cursor-pointer"
                >
                  Dismiss
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Hero Section (Only shown if no report active) */}
        {!result && !isAnalyzing && (
          <div className="text-center space-y-4 max-w-2xl mx-auto">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-100 text-brand-800 text-xs font-semibold border border-brand-200">
              <span className="w-2 h-2 rounded-full bg-brand-600 animate-ping" />
              <span>Gemma Multimodal Vision Assistant</span>
            </div>

            <h1 className="text-3xl sm:text-5xl font-black text-stone-900 tracking-tight leading-tight">
              Simple AI-Powered <br className="hidden sm:inline" />
              <span className="text-brand-700">Plant Health Care</span>
            </h1>

            <p className="text-stone-600 text-sm sm:text-base leading-relaxed">
              Upload a photo of your plant or leaf. Gemma inspects visual symptoms, evaluates possible fungal or pest issues, and gives you one outdoor task to go care for it.
            </p>
          </div>
        )}

        {/* Content State Switcher */}
        {isAnalyzing ? (
          <AnalysisLoading />
        ) : result ? (
          <PlantReport
            result={result}
            imagePreviewUrl={imagePreview}
            onReset={handleReset}
          />
        ) : (
          <Dropzone
            onAnalyze={handleAnalyzeFile}
            onSelectDemo={handleSelectDemo}
            isAnalyzing={isAnalyzing}
          />
        )}

        {/* Technology, Architecture & Touch Grass Explainer */}
        <GemmaExplainer />
      </main>

      {/* Footer */}
      <footer className="border-t border-stone-200 bg-white/80 py-8 px-4 sm:px-6 text-center text-xs text-stone-500 space-y-2 mt-12">
        <div className="flex items-center justify-center gap-1">
          <span>Crafted for Hacktoberfest &amp; Open-Weight AI with</span>
          <Heart className="w-3.5 h-3.5 text-rose-500 fill-rose-500 inline" />
          <span>• Powered by Gemma</span>
        </div>
        <p className="text-[11px] text-stone-400">
          Disclaimer: PlantCare AI visual assessments are educational tools and do not constitute certified agricultural or pathology diagnostic guarantees.
        </p>
      </footer>

      {/* Interactive Demo Modal */}
      <DemoModal
        isOpen={isDemoModalOpen}
        onClose={() => setIsDemoModalOpen(false)}
        onSelectSample={handleSelectDemo}
        onSimulateError={handleSimulateError}
      />
    </>
  );
}
