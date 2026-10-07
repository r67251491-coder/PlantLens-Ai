"use client";

import React from "react";
import {
  Cpu,
  Lock,
  Compass,
  Sparkles,
  Footprints,
  ShieldCheck,
  Server,
  Terminal,
  Layers,
  ArrowRight
} from "lucide-react";

export function GemmaExplainer() {
  return (
    <section id="gemma-explainer" className="w-full max-w-4xl mx-auto space-y-12 pt-8 border-t border-stone-200">
      {/* 1. Why Gemma & Open-Weight AI Header */}
      <div className="text-center space-y-3">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-brand-100 text-brand-800 text-xs font-semibold">
          <Cpu className="w-3.5 h-3.5" />
          <span>Technology &amp; Philosophy</span>
        </div>
        <h2 className="text-2xl sm:text-3xl font-extrabold text-stone-900 tracking-tight">
          Why Gemma &amp; Open-Weight AI?
        </h2>
        <p className="text-sm text-stone-600 max-w-2xl mx-auto leading-relaxed">
          Understanding the role of Google DeepMind&apos;s open-weight Gemma multimodal model family in accessible botanical diagnostics.
        </p>
      </div>

      {/* 2. Why Gemma? Precise Role Distinction */}
      <div className="bg-white rounded-3xl border border-stone-200 p-6 sm:p-8 shadow-card space-y-6">
        <div className="flex items-start gap-4">
          <div className="w-12 h-12 rounded-2xl bg-brand-100 text-brand-700 flex items-center justify-center flex-shrink-0">
            <Sparkles className="w-6 h-6" />
          </div>
          <div className="space-y-2">
            <h3 className="text-xl font-bold text-stone-900">
              Why Gemma? Exactly How It Is Used
            </h3>
            <p className="text-sm text-stone-700 leading-relaxed">
              <strong>Gemma</strong> (specifically Gemma 3 multimodal vision architecture) provides the core reasoning engine for PlantLens AI:
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
          <div className="p-4 rounded-2xl bg-brand-50/50 border border-brand-100 space-y-2">
            <h4 className="text-xs uppercase tracking-wider font-bold text-brand-800">
              What Gemma Performs
            </h4>
            <ul className="text-xs text-stone-700 space-y-1.5 list-disc list-inside">
              <li>Visual feature extraction from foliage photographs</li>
              <li>Botanical taxonomy and plant identification</li>
              <li>Visible symptom detection (chlorosis, necrotic spots, wilting)</li>
              <li>Correlating symptoms with possible fungal/bacterial diseases</li>
              <li>Generating practical care advice &amp; Touch Grass task</li>
            </ul>
          </div>

          <div className="p-4 rounded-2xl bg-stone-50 border border-stone-200 space-y-2">
            <h4 className="text-xs uppercase tracking-wider font-bold text-stone-600">
              What Application Infrastructure Performs
            </h4>
            <ul className="text-xs text-stone-700 space-y-1.5 list-disc list-inside">
              <li>Client-side camera capture and ephemeral image preview</li>
              <li>10MB payload size limits and MIME-type validation</li>
              <li>Secure server-side API proxy (keeps API keys off browsers)</li>
              <li>JSON parsing, fallbacks, and error boundary containment</li>
              <li>Interactive Touch Grass completion tracking</li>
            </ul>
          </div>
        </div>
      </div>

      {/* 3. Why Open-Weight AI Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="p-5 rounded-2xl bg-white border border-stone-200 shadow-soft space-y-2.5">
          <div className="w-9 h-9 rounded-xl bg-emerald-100 text-emerald-800 flex items-center justify-center">
            <Layers className="w-5 h-5" />
          </div>
          <h4 className="font-bold text-sm text-stone-900">Developer Control</h4>
          <p className="text-xs text-stone-600 leading-relaxed">
            Full transparency into model behavior, prompt tuning, and deterministic output schema without black-box lock-in.
          </p>
        </div>

        <div className="p-5 rounded-2xl bg-white border border-stone-200 shadow-soft space-y-2.5">
          <div className="w-9 h-9 rounded-xl bg-blue-100 text-blue-800 flex items-center justify-center">
            <Terminal className="w-5 h-5" />
          </div>
          <h4 className="font-bold text-sm text-stone-900">Experimentation</h4>
          <p className="text-xs text-stone-600 leading-relaxed">
            Ability to test between Gemma 3 4B, 12B, and 27B parameter variants based on latency and accuracy requirements.
          </p>
        </div>

        <div className="p-5 rounded-2xl bg-white border border-stone-200 shadow-soft space-y-2.5">
          <div className="w-9 h-9 rounded-xl bg-amber-100 text-amber-800 flex items-center justify-center">
            <Cpu className="w-5 h-5" />
          </div>
          <h4 className="font-bold text-sm text-stone-900">Customization</h4>
          <p className="text-xs text-stone-600 leading-relaxed">
            Potential for domain fine-tuning on regional agricultural datasets, specific farm crops, and localized pests.
          </p>
        </div>

        <div className="p-5 rounded-2xl bg-white border border-stone-200 shadow-soft space-y-2.5">
          <div className="w-9 h-9 rounded-xl bg-purple-100 text-purple-800 flex items-center justify-center">
            <Lock className="w-5 h-5" />
          </div>
          <h4 className="font-bold text-sm text-stone-900">Private / Local Deployment</h4>
          <p className="text-xs text-stone-600 leading-relaxed">
            Can run entirely offline on edge hardware in greenhouses, rural farms, or local Ollama servers without cloud dependencies.
          </p>
        </div>
      </div>

      {/* 4. Touch Grass Philosophy */}
      <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-r from-emerald-900 to-brand-900 text-white shadow-elevated space-y-5">
        <div className="flex items-center gap-2 text-emerald-300 text-xs uppercase tracking-wider font-bold">
          <Footprints className="w-4 h-4" />
          <span>Core Philosophy</span>
        </div>

        <h3 className="text-2xl font-bold tracking-tight">
          Touch Grass: The Screen Should Be the Shortest Part
        </h3>

        <div className="flex flex-wrap items-center gap-2 sm:gap-3 text-xs sm:text-sm font-semibold text-emerald-100">
          <span className="px-3 py-1.5 rounded-xl bg-white/10 backdrop-blur-xs">📷 Photo</span>
          <ArrowRight className="w-4 h-4 text-emerald-400" />
          <span className="px-3 py-1.5 rounded-xl bg-white/10 backdrop-blur-xs">🤖 AI Insight</span>
          <ArrowRight className="w-4 h-4 text-emerald-400" />
          <span className="px-3 py-1.5 rounded-xl bg-white/10 backdrop-blur-xs">👟 Go Outside</span>
          <ArrowRight className="w-4 h-4 text-emerald-400" />
          <span className="px-3 py-1.5 rounded-xl bg-emerald-400 text-emerald-950">🪴 Care for Plant</span>
        </div>

        <p className="text-xs sm:text-sm text-emerald-100 leading-relaxed max-w-2xl">
          Technology often traps us behind glass screens. PlantLens AI reverses this dynamic: use open-weight vision intelligence to diagnose quickly, then close your laptop, step outside, and connect with living nature.
        </p>
      </div>

      {/* 5. Simple Architecture Diagram */}
      <div className="bg-white rounded-3xl border border-stone-200 p-6 sm:p-8 shadow-card space-y-6">
        <div className="flex items-center gap-2">
          <Server className="w-5 h-5 text-brand-700" />
          <h3 className="text-lg font-bold text-stone-900">
            System Architecture
          </h3>
        </div>

        <div className="p-5 rounded-2xl bg-stone-900 text-stone-200 font-mono text-xs overflow-x-auto leading-relaxed border border-stone-800">
          <pre>{`[User Browser / Mobile]
       │
       ▼
 1. Image Capture & Validation (Type, 10MB limit)
       │
       ▼
[Next.js App Server] ── (POST /api/analyze)
       │
       ├── Validate Base64 payload & MIME
       ├── Sanitize Input & enforce JSON Schema prompt
       │
       ▼
[Gemma Multimodal Vision Engine]
 (Google AI Studio Gemma 3 / OpenRouter / Local Ollama)
       │
       ├── Visual Symptom & Pathology Extraction
       ├── Structured Botanical JSON Synthesis
       │
       ▼
[PlantLens AI Report UI]
       ├── Plant ID + Health Status + Possible Disease
       └── 🪴 Touch Grass Task -> "✓ I Did It" Celebration`}</pre>
        </div>
      </div>

      {/* 6. Future Improvements */}
      <div className="bg-stone-50 rounded-3xl border border-stone-200 p-6 sm:p-8 space-y-4">
        <div className="flex items-center gap-2">
          <Compass className="w-5 h-5 text-stone-700" />
          <h3 className="text-lg font-bold text-stone-900">
            Future Improvements Roadmap
          </h3>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 text-xs">
          <div className="p-3 bg-white rounded-xl border border-stone-200 space-y-1">
            <span className="font-bold text-stone-800">• Fully Offline Gemma Inference</span>
            <p className="text-stone-500">Run ONNX / WebGPU Gemma directly in browser cache for zero-network use.</p>
          </div>
          <div className="p-3 bg-white rounded-xl border border-stone-200 space-y-1">
            <span className="font-bold text-stone-800">• Expanded Species &amp; Disease Library</span>
            <p className="text-stone-500">Enhanced coverage for exotic succulents and localized agronomic pests.</p>
          </div>
          <div className="p-3 bg-white rounded-xl border border-stone-200 space-y-1">
            <span className="font-bold text-stone-800">• Plant Growth Journal</span>
            <p className="text-stone-500">Local-first IndexedDB timeline tracking foliage recovery over weeks.</p>
          </div>
          <div className="p-3 bg-white rounded-xl border border-stone-200 space-y-1">
            <span className="font-bold text-stone-800">• Voice Interaction</span>
            <p className="text-stone-500">Hands-free voice consultation while working outside with muddy gardening gloves.</p>
          </div>
          <div className="p-3 bg-white rounded-xl border border-stone-200 space-y-1">
            <span className="font-bold text-stone-800">• Local Edge Inference</span>
            <p className="text-stone-500">Turnkey Raspberry Pi and home greenhouse Docker deployments.</p>
          </div>
          <div className="p-3 bg-white rounded-xl border border-stone-200 space-y-1">
            <span className="font-bold text-stone-800">• Soil Sensor Telemetry</span>
            <p className="text-stone-500">Optional Bluetooth moisture sensor pairing for multi-signal verification.</p>
          </div>
        </div>
      </div>
    </section>
  );
}
