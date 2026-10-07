"use client";

import React, { useState, useRef, ChangeEvent, DragEvent } from "react";
import { UploadCloud, Camera, Image as ImageIcon, AlertCircle, Sparkles, CheckCircle2 } from "lucide-react";
import { DEMO_SAMPLES } from "@/lib/demo-data";
import { DemoSample } from "@/types/plant";

interface DropzoneProps {
  onAnalyze: (file: File) => void;
  onSelectDemo: (sample: DemoSample) => void;
  isAnalyzing: boolean;
}

const MAX_FILE_SIZE = 10 * 1024 * 1024; // 10MB

export function Dropzone({ onAnalyze, onSelectDemo, isAnalyzing }: DropzoneProps) {
  const [dragActive, setDragActive] = useState(false);
  const [preview, setPreview] = useState<string | null>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const cameraInputRef = useRef<HTMLInputElement>(null);

  const handleValidateAndSetFile = (file: File) => {
    setErrorMessage(null);

    // Validate type
    if (!file.type.startsWith("image/")) {
      setErrorMessage("Please upload an image file (.jpg, .png, .webp, .heic).");
      return;
    }

    // Validate size
    if (file.size > MAX_FILE_SIZE) {
      setErrorMessage("File exceeds 10MB. Please choose a smaller photo.");
      return;
    }

    setSelectedFile(file);
    const reader = new FileReader();
    reader.onload = (e) => {
      setPreview(e.target?.result as string);
    };
    reader.readAsDataURL(file);
  };

  const handleDrag = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleValidateAndSetFile(e.dataTransfer.files[0]);
    }
  };

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      handleValidateAndSetFile(e.target.files[0]);
    }
  };

  const handleStartAnalysis = () => {
    if (selectedFile) {
      onAnalyze(selectedFile);
    }
  };

  const handleReset = () => {
    setSelectedFile(null);
    setPreview(null);
    setErrorMessage(null);
    if (fileInputRef.current) fileInputRef.current.value = "";
    if (cameraInputRef.current) cameraInputRef.current.value = "";
  };

  return (
    <div className="w-full max-w-4xl mx-auto space-y-8">
      {/* Upload Box */}
      <div
        onDragEnter={handleDrag}
        onDragLeave={handleDrag}
        onDragOver={handleDrag}
        onDrop={handleDrop}
        className={`relative border-2 border-dashed rounded-3xl p-6 sm:p-10 transition-all text-center ${
          dragActive
            ? "border-brand-500 bg-brand-50/70 scale-[1.01]"
            : preview
            ? "border-brand-300 bg-white"
            : "border-stone-200 bg-stone-50/60 hover:border-brand-300 hover:bg-stone-50"
        } shadow-soft`}
      >
        <input
          ref={fileInputRef}
          type="file"
          accept="image/jpeg,image/png,image/webp,image/heic,image/heif"
          onChange={handleInputChange}
          className="hidden"
          id="plant-photo-input"
        />
        <input
          ref={cameraInputRef}
          type="file"
          accept="image/*"
          capture="environment"
          onChange={handleInputChange}
          className="hidden"
          id="camera-photo-input"
        />

        {preview ? (
          <div className="space-y-6">
            <div className="relative inline-block max-w-md mx-auto group">
              <img
                src={preview}
                alt="Plant preview"
                className="w-full max-h-80 object-contain rounded-2xl border border-stone-200 shadow-md bg-stone-900/5"
              />
              <span className="absolute top-3 right-3 bg-brand-700/90 text-white text-[11px] font-semibold px-2.5 py-1 rounded-full backdrop-blur-xs flex items-center gap-1 shadow-xs">
                <CheckCircle2 className="w-3.5 h-3.5" /> Ready for Gemma
              </span>
            </div>

            <div className="flex flex-wrap items-center justify-center gap-3">
              <button
                type="button"
                onClick={handleStartAnalysis}
                disabled={isAnalyzing}
                className="px-6 py-3 rounded-xl font-semibold text-white bg-gradient-to-r from-brand-700 to-brand-600 hover:from-brand-800 hover:to-brand-700 shadow-md shadow-brand-700/25 transition disabled:opacity-50 cursor-pointer flex items-center gap-2"
              >
                <Sparkles className="w-4 h-4 text-brand-200" />
                <span>Analyze with Gemma AI</span>
              </button>
              <button
                type="button"
                onClick={handleReset}
                disabled={isAnalyzing}
                className="px-4 py-3 rounded-xl font-medium text-stone-600 hover:text-stone-900 bg-stone-100 hover:bg-stone-200 transition cursor-pointer text-sm"
              >
                Choose Another
              </button>
            </div>
          </div>
        ) : (
          <div className="space-y-5">
            <div className="w-16 h-16 rounded-2xl bg-brand-100 text-brand-700 flex items-center justify-center mx-auto shadow-inner">
              <UploadCloud className="w-8 h-8" />
            </div>

            <div className="space-y-1.5">
              <h3 className="text-xl font-bold text-stone-900 tracking-tight">
                Upload a Photo of Your Plant or Leaf
              </h3>
              <p className="text-stone-500 text-sm max-w-md mx-auto">
                Drag and drop your photo here, take a fresh picture, or test with our sample cases below.
              </p>
            </div>

            <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                className="px-5 py-2.5 rounded-xl font-semibold text-sm text-white bg-brand-700 hover:bg-brand-800 transition shadow-xs flex items-center gap-2 cursor-pointer"
              >
                <ImageIcon className="w-4 h-4" />
                <span>Browse Files</span>
              </button>

              <button
                type="button"
                onClick={() => cameraInputRef.current?.click()}
                className="px-5 py-2.5 rounded-xl font-semibold text-sm text-stone-700 bg-white hover:bg-stone-100 border border-stone-200 transition shadow-xs flex items-center gap-2 cursor-pointer"
              >
                <Camera className="w-4 h-4 text-stone-500" />
                <span>Take Photo</span>
              </button>
            </div>

            <p className="text-[12px] text-stone-400">
              Supports JPEG, PNG, WebP up to 10MB • Private &amp; Ephemeral
            </p>
          </div>
        )}

        {errorMessage && (
          <div className="mt-4 p-3 rounded-xl bg-red-50 border border-red-200 text-red-700 text-xs flex items-center justify-center gap-2">
            <AlertCircle className="w-4 h-4 flex-shrink-0" />
            <span>{errorMessage}</span>
          </div>
        )}
      </div>

      {/* Try Demo Mode Section */}
      <div className="space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-stone-200/60 pb-2">
          <div className="flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-brand-600" />
            <h3 className="text-base font-black text-stone-900 tracking-tight">
              Try Demo
            </h3>
          </div>
          <span className="text-xs text-stone-500 font-medium">
            Test the application instantly without uploading a photo
          </span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3">
          {DEMO_SAMPLES.map((sample) => (
            <button
              key={sample.id}
              type="button"
              onClick={() => onSelectDemo(sample)}
              className="group text-left p-3 rounded-2xl bg-white border border-stone-200 hover:border-brand-400 hover:shadow-card transition flex flex-col justify-between cursor-pointer"
            >
              <div className="aspect-square w-full rounded-xl overflow-hidden mb-2.5 bg-stone-100 relative">
                <img
                  src={sample.imageUrl}
                  alt={sample.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition duration-300"
                />
                <span
                  className={`absolute top-1.5 left-1.5 text-[10px] font-bold px-1.5 py-0.5 rounded-md backdrop-blur-xs ${
                    sample.type === "healthy"
                      ? "bg-emerald-700/80 text-white"
                      : sample.type === "diseased"
                      ? "bg-amber-600/80 text-white"
                      : sample.type === "pest"
                      ? "bg-orange-600/80 text-white"
                      : sample.type === "unclear"
                      ? "bg-stone-700/80 text-white"
                      : "bg-rose-700/80 text-white"
                  }`}
                >
                  {sample.type.toUpperCase()}
                </span>
              </div>
              <div>
                <h5 className="font-semibold text-xs text-stone-900 group-hover:text-brand-700 line-clamp-1">
                  {sample.title}
                </h5>
                <p className="text-[11px] text-stone-500 line-clamp-1 mt-0.5">
                  {sample.subtitle}
                </p>
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
