import { NextRequest, NextResponse } from "next/server";
import { analyzePlantImage } from "@/lib/gemma";
import { DEMO_SAMPLES } from "@/lib/demo-data";

// Maximum upload payload size: 10MB (base64 string length ~13.5MB)
const MAX_BASE64_LENGTH = 14 * 1024 * 1024;
const ALLOWED_MIME_TYPES = [
  "image/jpeg",
  "image/png",
  "image/webp",
  "image/heic",
  "image/heif"
];

export async function POST(request: NextRequest) {
  try {
    const body = await request.json().catch(() => null);

    if (!body) {
      return NextResponse.json(
        { error: "Invalid JSON body provided." },
        { status: 400 }
      );
    }

    // 1. Check if user is requesting a demo preset
    if (body.demoId) {
      const demoSample = DEMO_SAMPLES.find((d) => d.id === body.demoId);
      if (!demoSample) {
        return NextResponse.json(
          { error: `Demo sample '${body.demoId}' not found.` },
          { status: 404 }
        );
      }
      return NextResponse.json({
        result: demoSample.analysis,
        source: "demo",
        sample: demoSample
      });
    }

    // 2. Validate Image Upload
    const { imageBase64, mimeType } = body;

    if (!imageBase64 || typeof imageBase64 !== "string") {
      return NextResponse.json(
        { error: "No image provided. Please upload a clear photo of a plant or leaf." },
        { status: 400 }
      );
    }

    // Validate size limit
    if (imageBase64.length > MAX_BASE64_LENGTH) {
      return NextResponse.json(
        { error: "Image file is too large. Maximum supported image upload is 10MB." },
        { status: 413 }
      );
    }

    // Validate MIME type
    const normalizedMime = (mimeType || "").toLowerCase().trim();
    if (!normalizedMime || !ALLOWED_MIME_TYPES.includes(normalizedMime)) {
      return NextResponse.json(
        {
          error: `Unsupported image format (${mimeType || "unknown"}). Please upload a JPEG, PNG, or WebP photo.`
        },
        { status: 400 }
      );
    }

    // 3. Execute Server-Side Gemma Visual Analysis
    const analysis = await analyzePlantImage(imageBase64, normalizedMime);

    return NextResponse.json({
      result: analysis,
      source: "gemma"
    });
  } catch (error: any) {
    console.error("Plant analysis API error:", error);

    const errorMessage = error?.message || "Failed to analyze plant photo.";

    // Detect missing API key
    if (errorMessage.includes("GEMMA_API_KEY is not configured")) {
      return NextResponse.json(
        {
          error: errorMessage,
          code: "MISSING_API_KEY"
        },
        { status: 503 }
      );
    }

    return NextResponse.json(
      {
        error: errorMessage,
        code: "ANALYSIS_ERROR"
      },
      { status: 502 }
    );
  }
}
