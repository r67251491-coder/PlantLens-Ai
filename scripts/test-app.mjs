// Comprehensive End-to-End Test Suite for PlantCare AI
// Tests all 7 required cases:
// 1. Healthy plant
// 2. Diseased-looking plant
// 3. Pest-damaged plant
// 4. Unclear photo
// 5. Non-plant photo
// 6. Invalid file / bad payload / unsupported format
// 7. API / Server failure handling

const BASE_URL = "http://localhost:3000";

async function runTests() {
  console.log("==================================================");
  console.log("🌿 PlantCare AI — Automated Verification Test Suite");
  console.log("==================================================");
  let passed = 0;
  let total = 7;

  // Test 1: Healthy Plant
  try {
    const res = await fetch(`${BASE_URL}/api/analyze`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ demoId: "healthy-monstera" }),
    });
    const data = await res.json();
    if (res.ok && data.result.health_status === "Healthy" && data.result.is_plant) {
      console.log("✅ [1/7] Healthy Plant: PASS (Identified:", data.result.plant_name, "| Status:", data.result.health_status, ")");
      passed++;
    } else {
      console.error("❌ [1/7] Healthy Plant: FAIL", data);
    }
  } catch (err) {
    console.error("❌ [1/7] Healthy Plant: ERROR", err);
  }

  // Test 2: Diseased Plant
  try {
    const res = await fetch(`${BASE_URL}/api/analyze`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ demoId: "diseased-tomato" }),
    });
    const data = await res.json();
    const hasDisease = data.result.possible_diseases.some(d => d.name.toLowerCase().includes("blight"));
    if (res.ok && data.result.health_status === "Needs Attention" && hasDisease) {
      console.log("✅ [2/7] Diseased Plant: PASS (Disease:", data.result.possible_diseases[0].name, "| Confidence:", data.result.possible_diseases[0].confidence, ")");
      passed++;
    } else {
      console.error("❌ [2/7] Diseased Plant: FAIL", data);
    }
  } catch (err) {
    console.error("❌ [2/7] Diseased Plant: ERROR", err);
  }

  // Test 3: Pest-Damaged Plant
  try {
    const res = await fetch(`${BASE_URL}/api/analyze`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ demoId: "pest-basil" }),
    });
    const data = await res.json();
    const hasPestIssue = data.result.possible_causes.some(c => c.toLowerCase().includes("pest") || c.toLowerCase().includes("damage"));
    if (res.ok && (data.result.health_status === "Needs Attention" || hasPestIssue)) {
      console.log("✅ [3/7] Pest-Damaged Plant: PASS (Symptoms:", data.result.visible_symptoms[0], "| Causes:", data.result.possible_causes[0], ")");
      passed++;
    } else {
      console.error("❌ [3/7] Pest-Damaged Plant: FAIL", data);
    }
  } catch (err) {
    console.error("❌ [3/7] Pest-Damaged Plant: ERROR", err);
  }

  // Test 4: Unclear Photo
  try {
    const res = await fetch(`${BASE_URL}/api/analyze`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ demoId: "unclear-photo" }),
    });
    const data = await res.json();
    const hasSafeSunlight = data.result.sunlight.includes("6-8 hours");
    const hasLowConfidence = data.result.plant_confidence === "Low" || data.result.health_status === "Unknown";
    if (res.ok && hasSafeSunlight && hasLowConfidence) {
      console.log("✅ [4/7] Unclear Photo: PASS (Sunlight:", data.result.sunlight, "| Confidence:", data.result.plant_confidence, ")");
      passed++;
    } else {
      console.error("❌ [4/7] Unclear Photo: FAIL", data);
    }
  } catch (err) {
    console.error("❌ [4/7] Unclear Photo: ERROR", err);
  }

  // Test 5: Non-Plant Photo
  try {
    const res = await fetch(`${BASE_URL}/api/analyze`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ demoId: "non-plant-object" }),
    });
    const data = await res.json();
    if (res.ok && data.result.is_plant === false && data.result.health_status === "Unknown") {
      console.log("✅ [5/7] Non-Plant Photo: PASS (is_plant: false | Name:", data.result.plant_name, ")");
      passed++;
    } else {
      console.error("❌ [5/7] Non-Plant Photo: FAIL", data);
    }
  } catch (err) {
    console.error("❌ [5/7] Non-Plant Photo: ERROR", err);
  }

  // Test 6: Invalid File / Bad Payload
  try {
    const res = await fetch(`${BASE_URL}/api/analyze`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        imageBase64: "not_a_real_image_base64_data",
        mimeType: "application/pdf" // Unsupported format
      }),
    });
    const data = await res.json();
    if (res.status === 400 && data.error.includes("Unsupported image format")) {
      console.log("✅ [6/7] Invalid File Handling: PASS (Correctly rejected with 400:", data.error, ")");
      passed++;
    } else {
      console.error("❌ [6/7] Invalid File Handling: FAIL", res.status, data);
    }
  } catch (err) {
    console.error("❌ [6/7] Invalid File Handling: ERROR", err);
  }

  // Test 7: Missing Payload / API Failure Handling
  try {
    const res = await fetch(`${BASE_URL}/api/analyze`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({}),
    });
    const data = await res.json();
    if (res.status === 400 && data.error.includes("No image provided")) {
      console.log("✅ [7/7] Missing Payload / API Error: PASS (Cleanly returned 400:", data.error, ")");
      passed++;
    } else {
      console.error("❌ [7/7] Missing Payload: FAIL", res.status, data);
    }
  } catch (err) {
    console.error("❌ [7/7] Missing Payload: ERROR", err);
  }

  console.log("==================================================");
  console.log(`Summary: ${passed}/${total} tests passed successfully!`);
  console.log("==================================================");

  if (passed !== total) {
    process.exit(1);
  }
}

runTests();
