import { PlantAnalysisResult } from "@/types/plant";

const SYSTEM_PROMPT = `You are PlantCare AI, an expert botanical and plant health visual assistant powered by Gemma.
Analyze the user-provided image of a plant or leaf with utmost care, visual precision, and scientific honesty.

CRITICAL INSTRUCTIONS:
1. NON-PLANT IMAGES: If the image does not show a plant, tree, leaf, crop, flower, or succulent, return:
   - "is_plant": false
   - "plant_name": "Not a Plant Detected"
   - "scientific_name": "Non-biological object"
   - "plant_confidence": "Low"
   - "health_status": "Unknown"
   - "health_summary": "No botanical foliage or plant tissue detected in this photograph."
   - "touch_grass_task": "Step outside into the garden or visit a nearby park to find and photograph a real plant!"
   - "sunlight": "6-8 hours of sunlight recommended for living green plants."

2. UNCLEAR OR BLURRY IMAGES:
   - If the photo is too blurry, dark, or out of focus to identify reliably, state:
     "Unable to determine reliably from this image."
   - Set "plant_confidence": "Low" and "health_status": "Unknown".
   - Do NOT invent precise requirements if the plant cannot be identified confidently.
   - Provide practical baseline sunlight recommendations: "6-8 hours of sunlight".

3. SCIENTIFIC HONESTY & DISCLAIMERS:
   - A photograph alone CANNOT provide a definitive pathology diagnosis.
   - Never claim a disease is definitively diagnosed.
   - Use language like "Possible disease", "Possible issue", "Visual symptoms suggest".
   - Clearly distinguish between visible symptoms (e.g. brown spots, yellowing chlorosis, leaf curling, holes, white powder) and possible causes (e.g. excess moisture, poor airflow, fungal infection, nutrient stress, pest damage).

4. RECOMMENDED ACTIONS:
   - Provide 3 to 5 clear, practical, numbered actions.

5. TOUCH GRASS TASK:
   - Generate ONE simple, immediate outdoor action based on your analysis.
   - The user should spend minimal time on screen and go outside to care for the plant.
   - Example: "Look closely at the underside of the newest leaves for additional symptoms or tiny webbing."

6. FORMAT:
   Return strictly valid raw JSON without any markdown formatting, backticks, or comments.
   Follow this exact JSON structure:
   {
     "is_plant": true,
     "plant_name": "Common name",
     "scientific_name": "Scientific name if identifiable, or 'Unable to determine reliably from this image.'",
     "plant_confidence": "High" | "Medium" | "Low",
     "health_status": "Healthy" | "Mostly Healthy" | "Needs Attention" | "Unhealthy" | "Unknown",
     "health_summary": "Concise 1-2 sentence overall visual assessment",
     "possible_diseases": [
       {
         "name": "Possible disease name",
         "confidence": "High" | "Medium" | "Low",
         "reason": "Detailed visual reason explaining why the symptoms match, noting photo diagnosis limitations"
       }
     ],
     "visible_symptoms": ["Symptom 1", "Symptom 2"],
     "possible_causes": ["Cause 1", "Cause 2"],
     "watering": "Practical advice (e.g., 'Moderate watering. Allow top 2 inches of soil to dry out.')",
     "sunlight": "Practical advice (e.g., '6-8 hours of sunlight' or 'Bright indirect light.')",
     "soil": "Practical soil and drainage advice",
     "recommended_actions": [
       "Action 1",
       "Action 2",
       "Action 3"
     ],
     "care_tips": [
       "Tip 1",
       "Tip 2"
     ],
     "touch_grass_task": "One specific outdoor physical action"
   }`;

/**
 * Extracts and safely parses JSON from model output, handling markdown fences and reasoning traces
 */
function cleanAndParseJSON(rawText: string): PlantAnalysisResult {
  let cleaned = rawText.trim();

  // Strip thinking blocks if present e.g. <thought>...</thought> or Thinking Process: ...
  if (cleaned.includes("<thought>") && cleaned.includes("</thought>")) {
    cleaned = cleaned.replace(/<thought>[\s\S]*?<\/thought>/gi, "").trim();
  }

  // Strip markdown code fences if present
  if (cleaned.startsWith("```")) {
    const lines = cleaned.split("\n");
    if (lines[0].startsWith("```")) {
      lines.shift();
    }
    if (lines.length > 0 && lines[lines.length - 1].startsWith("```")) {
      lines.pop();
    }
    cleaned = lines.join("\n").trim();
  }

  // Find first { and last }
  const firstBrace = cleaned.indexOf("{");
  const lastBrace = cleaned.lastIndexOf("}");

  if (firstBrace !== -1 && lastBrace !== -1 && lastBrace > firstBrace) {
    cleaned = cleaned.substring(firstBrace, lastBrace + 1);
  }

  const parsed = JSON.parse(cleaned);

  // Validate critical fields and set sensible fallbacks
  return {
    is_plant: typeof parsed.is_plant === "boolean" ? parsed.is_plant : true,
    plant_name: parsed.plant_name || "Unidentified Plant",
    scientific_name: parsed.scientific_name || "Unable to determine reliably from this image.",
    plant_confidence: ["High", "Medium", "Low"].includes(parsed.plant_confidence)
      ? parsed.plant_confidence
      : "Medium",
    health_status: ["Healthy", "Mostly Healthy", "Needs Attention", "Unhealthy", "Unknown"].includes(parsed.health_status)
      ? parsed.health_status
      : "Needs Attention",
    health_summary: parsed.health_summary || "Visual analysis completed.",
    possible_diseases: Array.isArray(parsed.possible_diseases)
      ? parsed.possible_diseases.map((d: any) => ({
          name: d.name || "Possible plant condition",
          confidence: ["High", "Medium", "Low"].includes(d.confidence) ? d.confidence : "Medium",
          reason: d.reason || "Visual symptoms observed in photograph."
        }))
      : [],
    visible_symptoms: Array.isArray(parsed.visible_symptoms) ? parsed.visible_symptoms : [],
    possible_causes: Array.isArray(parsed.possible_causes) ? parsed.possible_causes : [],
    watering: parsed.watering || "Moderate watering. Allow top 2 inches of soil to dry out between waterings.",
    sunlight: parsed.sunlight || "6-8 hours of sunlight.",
    soil: parsed.soil || "Well-draining potting soil mix.",
    recommended_actions: Array.isArray(parsed.recommended_actions) && parsed.recommended_actions.length > 0
      ? parsed.recommended_actions
      : [
          "Check the soil moisture level with your finger.",
          "Improve airflow around the plant canopy.",
          "Avoid wetting the leaves while watering.",
          "Monitor new growth closely for emerging symptoms."
        ],
    care_tips: Array.isArray(parsed.care_tips) ? parsed.care_tips : [],
    touch_grass_task: parsed.touch_grass_task || "Step outside and inspect the soil moisture and leaf undersides of your plant."
  };
}

async function callGoogleApi(model: string, apiKey: string, cleanBase64: string, mimeType: string) {
  const apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${apiKey}`;

  const requestBody = {
    contents: [
      {
        role: "user",
        parts: [
          { text: SYSTEM_PROMPT },
          {
            inline_data: {
              mime_type: mimeType,
              data: cleanBase64
            }
          },
          {
            text: "Analyze this image and return the structured JSON plant health assessment according to instructions."
          }
        ]
      }
    ],
    generationConfig: {
      temperature: 0.2,
      topK: 32,
      topP: 0.95,
      maxOutputTokens: 2048
    }
  };

  const response = await fetch(apiUrl, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(requestBody)
  });

  if (!response.ok) {
    const errorBody = await response.text();
    let userMsg = `Gemma API request failed with status ${response.status}`;
    try {
      const parsedErr = JSON.parse(errorBody);
      if (parsedErr.error?.message) {
        userMsg = `${parsedErr.error.message}`;
      }
    } catch {
      // fallback
    }
    throw new Error(userMsg);
  }

  const resultData = await response.json();
  const textOutput = resultData.candidates?.[0]?.content?.parts?.[0]?.text;

  if (!textOutput) {
    throw new Error(`Model ${model} did not return any textual response for this image.`);
  }

  return cleanAndParseJSON(textOutput);
}

export async function analyzePlantImage(
  imageBase64: string,
  mimeType: string
): Promise<PlantAnalysisResult> {
  const apiKey = process.env.GEMMA_API_KEY;
  const primaryModel = process.env.GEMMA_MODEL || "gemma-4-26b-a4b-it";
  const customEndpoint = process.env.GEMMA_API_ENDPOINT;

  // Sanitize base64 string
  const cleanBase64 = imageBase64.replace(/^data:image\/[a-z]+;base64,/, "");

  if (!apiKey && !customEndpoint) {
    throw new Error(
      "GEMMA_API_KEY is not configured in your environment. Please add it to .env.local or select 'Try Demo' to test with sample data."
    );
  }

  // 1. If Custom Endpoint is configured (e.g. Ollama or OpenRouter)
  if (customEndpoint) {
    const isOllama = customEndpoint.includes("localhost") || customEndpoint.includes("11434");
    const endpointUrl = isOllama
      ? `${customEndpoint.replace(/\/+$/, "")}/api/generate`
      : `${customEndpoint.replace(/\/+$/, "")}/chat/completions`;

    if (isOllama) {
      const response = await fetch(endpointUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          model: primaryModel,
          prompt: `${SYSTEM_PROMPT}\n\nPlease analyze this image carefully and return the required JSON.`,
          images: [cleanBase64],
          stream: false,
          format: "json"
        }),
      });
      if (!response.ok) {
        throw new Error(`Ollama API error: ${response.status} ${response.statusText}`);
      }
      const data = await response.json();
      return {
        ...cleanAndParseJSON(data.response),
        model_used: primaryModel,
        analysis_timestamp: new Date().toISOString()
      };
    } else {
      const response = await fetch(endpointUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${apiKey || ""}`
        },
        body: JSON.stringify({
          model: primaryModel,
          messages: [
            { role: "system", content: SYSTEM_PROMPT },
            {
              role: "user",
              content: [
                { type: "text", text: "Please analyze this plant image and provide the structured plant report JSON." },
                {
                  type: "image_url",
                  image_url: { url: `data:${mimeType};base64,${cleanBase64}` }
                }
              ]
            }
          ],
          response_format: { type: "json_object" }
        })
      });

      if (!response.ok) {
        const errText = await response.text();
        throw new Error(`Custom API error (${response.status}): ${errText}`);
      }
      const data = await response.json();
      const content = data.choices?.[0]?.message?.content || "";
      return {
        ...cleanAndParseJSON(content),
        model_used: primaryModel,
        analysis_timestamp: new Date().toISOString()
      };
    }
  }

  // 2. Official Google AI Studio endpoint with graceful fallback
  try {
    const parsed = await callGoogleApi(primaryModel, apiKey!, cleanBase64, mimeType);
    return {
      ...parsed,
      model_used: primaryModel,
      analysis_timestamp: new Date().toISOString()
    };
  } catch (err: any) {
    console.warn(`Primary model ${primaryModel} failed (${err.message}). Attempting fallback to gemini-2.5-flash...`);
    try {
      const fallbackParsed = await callGoogleApi("gemini-2.5-flash", apiKey!, cleanBase64, mimeType);
      return {
        ...fallbackParsed,
        model_used: "gemini-2.5-flash (fallback)",
        analysis_timestamp: new Date().toISOString()
      };
    } catch {
      // If fallback also fails, throw original primary model error
      throw err;
    }
  }
}
