# PlantLens AI 🌿

> **Simple, AI-powered plant health assistant powered by Gemma open-weight vision models.**  
> Spot leaf diseases early, get actionable organic care steps, and spend less time on screens caring for real plants.

[![Next.js](https://img.shields.io/badge/Next.js-15-black?style=flat&logo=next.js)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-blue?style=flat&logo=typescript)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3.4-38bdf8?style=flat&logo=tailwind-css)](https://tailwindcss.com/)
[![Gemma](https://img.shields.io/badge/Model-Gemma--3--27B--IT-008080?style=flat&logo=google)](https://ai.google.dev/gemma)
[![Hacktoberfest](https://img.shields.io/badge/Hacktoberfest-Touch_Grass-green?style=flat)](https://hacktoberfest.com/)

---

## 📖 Table of Contents
- [Problem](#-problem)
- [Solution](#-solution)
- [Why Gemma?](#-why-gemma)
- [Why Open-Weight AI?](#-why-open-weight-ai)
- [🪴 Touch Grass Philosophy](#-touch-grass-philosophy)
- [📐 Architecture](#-architecture)
- [🔒 Security & Privacy](#-security--privacy)
- [⚙️ Setup & Installation](#️-setup--installation)
- [🧪 Testing & Verification](#-testing--verification)
- [🚀 Future Improvements](#-future-improvements)

---

## 🥀 Problem
Home gardeners, urban plant parents, and allotment growers often notice unhealthy foliage—wilting stems, powdery mildew, yellow chlorosis, or necrotic spots—but do not know:
1. What the symptoms indicate.
2. Whether the issue is fungal, pest-driven, or environmental.
3. What concrete outdoor action to take next to save the plant.

Most existing garden apps lock users behind paywalls, aggressive paywalls, or endless screen interactions that disconnect them from their garden.

## 🪴 Solution
**PlantLens AI** provides instant botanical triage:
1. A user uploads a photo of a plant or leaf (or snaps one with their mobile camera).
2. **Gemma** analyzes the image and returns structured botanical intelligence:
   - Plant identification & scientific taxonomy
   - Health assessment badge (`Healthy`, `Mostly Healthy`, `Needs Attention`, `Unhealthy`, `Unknown`)
   - Possible disease evaluation with explicit visual reasoning & pathology disclaimers
   - Observed visible symptoms separated from potential environmental causes
   - Practical environment metrics (watering, sunlight, soil)
   - 3 to 5 practical recommended outdoor actions
   - A single **Touch Grass** task motivating the user to step away from the screen and tend to their plant.

---

## 🧠 Why Gemma?
**Gemma** is Google DeepMind's open-weight family of models built from the same research and technology used for Gemini models. Specifically, **Gemma 3 multimodal models** (`gemma-3-27b-it`, `gemma-3-12b-it`) feature native high-resolution vision encoding and instruction-tuned reasoning.

### Exactly How Gemma is Used (and What It Does Not Do):
To maintain complete scientific honesty and architectural transparency:

- **What Gemma actually performs:**
  - Ingests the encoded image pixels via its multimodal vision encoder.
  - Recognizes plant foliage characteristics (leaf venation, leaf margin serration, petiole structures).
  - Detects visual pathologies: concentric target-spot lesions, powdery fungal mycelium, sap-sucking pest stippling, chlorotic margins.
  - Correlates observed visual markers with known agricultural diseases.
  - Formulates structured JSON output containing the health rating, care regimen, and physical Touch Grass task.

- **What other components perform (NOT Gemma):**
  - **Browser/Client:** Image selection, local camera access, image preview rendering, and responsive state transitions.
  - **Next.js Server API (`/api/analyze`):** Payload size verification (10MB limit), MIME type validation (`image/jpeg`, `image/png`, `image/webp`), credential isolation (keeping API keys server-side), JSON sanitization, and fallback error handling.

---

## 🔓 Why Open-Weight AI?
Using open-weight models like Gemma offers distinct advantages over closed commercial APIs:

1. **Developer Control & Transparency:** Full inspection of prompt behavior, system instructions, and deterministic temperature/sampling configurations without sudden black-box model drift.
2. **Experimentation:** Developers can easily switch between model sizes (`gemma-3-4b-it` for lightweight low-latency deployments, `gemma-3-12b-it` for balanced throughput, or `gemma-3-27b-it` for maximum diagnostic depth).
3. **Domain Customization & Fine-Tuning:** The model weights can be specialized using LoRA or full parameter fine-tuning on regional agronomy datasets (e.g., specific grape mildew datasets or localized agricultural university records).
4. **Local / Private / Edge Deployment:** Gemma can be executed entirely on-premise or offline using tools like **Ollama** or **vLLM** on edge hardware (greenhouse automation controllers, rural agricultural sensors with intermittent internet connectivity).

---

## 🪴 Touch Grass Philosophy
> **Photo → AI insight → Go outside → Care for plant**

In modern software, apps strive to maximize screen time. **PlantLens AI is intentionally engineered to minimize screen time.**

The user experience flow:
```
[ Upload Photo ]
       ↓
[ Gemma Analyzes It ]
       ↓
[ Read Concise Diagnosis (30 seconds) ]
       ↓
[ Touch Grass Task ]
       ↓
[ Go Outside & Tend to Real Living Foliage 🪴 ]
```

Every analysis ends with:
`# 🪴 Now Go Take Care of It`

When the user steps outside, completes the physical action (such as wiping dust off leaves, inspecting undersides for aphids, or bottom-watering the root ball), they press:
`### ✓ I Did It`

PlantLens AI rewards them with:
> **🪴 Nice! You just spent less time on your screen and more time caring for something real.**

---

## 📐 Architecture

```
                    ┌────────────────────────────────────────┐
                    │            Client Browser              │
                    │   Next.js 15 UI / Tailwind CSS 3.4     │
                    └───────────────────┬────────────────────┘
                                        │
                         1. User Photo / Camera Capture
                         2. Ephemeral Base64 Preview
                                        │
                                        ▼
                    ┌────────────────────────────────────────┐
                    │      Next.js Route: /api/analyze       │
                    │  • Max size check (10MB gate)          │
                    │  • MIME validation (jpeg, png, webp)   │
                    │  • Server-side credentials (.env.local)│
                    │  • Structured schema enforcement       │
                    └───────────────────┬────────────────────┘
                                        │
                         HTTPS POST / GenerateContent
                         (Key stays server-side)
                                        │
                                        ▼
┌────────────────────────────────────────────────────────────────────────┐
│                   Gemma Multimodal Vision Engine                       │
│                                                                        │
│   • Model: gemma-3-27b-it (Google AI Studio / OpenRouter / Ollama)    │
│   • Vision Encoder: Foliage morphology & lesion spot identification    │
│   • Language Decoder: Synthesizes structured botanical JSON            │
└───────────────────────────────────┬────────────────────────────────────┘
                                    │
                         Structured JSON Response
                                    │
                                    ▼
┌────────────────────────────────────────────────────────────────────────┐
│                        🪴 PlantLens AI Report                          │
│                                                                        │
│   • Plant Identification (Common & Scientific Name, Confidence)       │
│   • Health Status Badge (Healthy / Needs Attention / etc.)             │
│   • Possible Disease Assessment + Pathology Disclaimer                 │
│   • Visible Symptoms & Possible Environmental Causes                   │
│   • Watering, Sunlight (e.g. 6-8 hrs), Soil Advice                     │
│   • 3-5 Practical Recommended Actions                                  │
│   • Touch Grass Outdoor Task + Interactive "✓ I Did It" Button         │
└────────────────────────────────────────────────────────────────────────┘
```

---

## 🔒 Security & Privacy

- **Zero Hard-Coded Credentials:** All model tokens are loaded through `process.env.GEMMA_API_KEY`. No secret is ever included in client-side bundles.
- **`.env` Protected:** `.gitignore` strictly excludes `.env`, `.env.local`, `.env.*.local`, and related keys from Git commits.
- **`.env.example` Included:** Clear template provided for immediate setup.
- **Server-Side Model Calls:** The frontend communicates solely with `/api/analyze`; the browser never contacts external AI endpoints directly.
- **Upload Validation & Size Limits:** Payload size is strictly validated and capped at 10MB; unsupported MIME types are rejected with HTTP 400.
- **Input Sanitization:** User inputs and base64 strings are scrubbed before inference.
- **Ephemeral Processing & User Privacy:** Plant photographs are processed in-memory and are never stored or logged to persistent databases by default.

---

## ⚙️ Setup & Installation

### Step 1: Clone the Repository & Install Dependencies
```bash
git clone https://github.com/r67251491-coder/PlantLens-Ai.git
cd PlantLens-Ai
npm install
```

### Step 2: Create Environment Configuration
Copy `.env.example` to `.env.local`:
```bash
cp .env.example .env.local
```

### Step 3: Obtain Gemma Access / API Key
1. Go to [Google AI Studio](https://aistudio.google.com/app/apikey).
2. Sign in with your Google account.
3. Click **"Create API key"** and copy your key.

*(Optional Alternative: If using OpenRouter or local Ollama, see instructions in `.env.example`)*

### Step 4: Add Environment Variables
Open `.env.local` and configure:
```env
# Google AI Studio API Key
GEMMA_API_KEY=AIzaSyYourGeneratedApiKeyHere

# Gemma Multimodal Model
GEMMA_MODEL=gemma-3-27b-it

# Enable built-in demo cases (true by default)
NEXT_PUBLIC_ENABLE_DEMO_MODE=true
```

### Step 5: Start the Development Server
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## 🧪 Testing & Verification

PlantLens AI comes with an automated end-to-end verification test suite covering all 7 critical edge cases:

```bash
node scripts/test-app.mjs
```

### Test Scenarios Validated:
1. **Healthy Plant (`healthy-monstera`):** Confirms rich pigmentation, status `Healthy`, zero acute disease lesions.
2. **Diseased Plant (`diseased-tomato`):** Identifies concentric ring lesions, flags *Early Blight*, sets status `Needs Attention`, displays pathology warning disclaimer.
3. **Pest-Damaged Plant (`pest-basil`):** Identifies stippling and leaf margin curling, correlates with piercing-sucking insect feeding.
4. **Unclear / Blurry Photo (`unclear-photo`):** Detects insufficient focus, returns `Unable to determine reliably from this image.`, sets confidence `Low`, and provides safe baseline sunlight advice (`6-8 hours of sunlight`) without fabricating precision.
5. **Non-Plant Photo (`non-plant-object`):** Detects lack of botanical tissue (`is_plant: false`), sets status `Unknown`, and gently directs user outdoors to find real foliage.
6. **Invalid File Upload:** Verifies rejection of non-image MIME types (e.g. `application/pdf`) with HTTP 400.
7. **API / Upstream Failure:** Verifies graceful error boundaries with user-friendly recovery instructions and one-click switch to Demo mode.

---

## 🚀 Future Improvements
*(Planned post-MVP roadmap)*

- [ ] **Fully Offline Gemma Inference:** In-browser ONNX / WebGPU execution for remote zero-connectivity field diagnostics.
- [ ] **Expanded Species & Pathology Taxonomies:** Specialized recognition for rare desert succulents, tropical aroids, and localized vineyard pathogens.
- [ ] **Plant Growth Journal:** Local-first encrypted timeline tracking leaf recovery over weeks.
- [ ] **Voice Interaction:** Hands-free voice querying for hands covered in garden soil.
- [ ] **Turnkey Edge Inference:** Pre-built Docker container for local Raspberry Pi and greenhouse environmental controllers.
- [ ] **Soil Sensor Telemetry:** Bluetooth pairing with soil moisture and EC probes to validate visual moisture symptoms against physical sensor data.

---

## 📜 License
Distributed under the MIT License. See `LICENSE` for details.
