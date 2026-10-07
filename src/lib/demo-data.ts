import { DemoSample } from "@/types/plant";

export const DEMO_SAMPLES: DemoSample[] = [
  {
    id: "healthy-monstera",
    title: "1. Healthy Plant",
    subtitle: "Monstera (Vibrant foliage, zero lesions)",
    type: "healthy",
    imageUrl: "https://images.unsplash.com/photo-1614594975525-e45190c55d0b?auto=format&fit=crop&w=800&q=80",
    analysis: {
      is_plant: true,
      plant_name: "Monstera Deliciosa",
      scientific_name: "Monstera deliciosa",
      plant_confidence: "High",
      health_status: "Healthy",
      health_summary: "The plant exhibits robust turgor pressure, rich chlorophyll pigmentation, and well-formed fenestrations with no visible necrotic spots or pest signatures.",
      possible_diseases: [],
      visible_symptoms: [
        "Vibrant deep green foliage",
        "Clean leaf margins without browning",
        "Firm erect petioles"
      ],
      possible_causes: [
        "Optimal ambient humidity",
        "Balanced watering regimen",
        "Adequate indirect luminosity"
      ],
      watering: "Moderate watering",
      sunlight: "6-8 hours of sunlight (bright indirect)",
      soil: "Well-draining peat-based potting mix amended with perlite.",
      recommended_actions: [
        "Check soil moisture with your finger before your next watering cycle.",
        "Gently wipe down the foliage with a soft, damp cloth to remove household dust.",
        "Rotate the pot 90 degrees every week to promote symmetrical growth toward ambient light.",
        "Maintain normal ambient room temperature between 18°C and 27°C."
      ],
      care_tips: [
        "Provide a moss pole or trellis support as aerial roots develop.",
        "Feed lightly with a balanced liquid houseplant fertilizer once monthly in spring."
      ],
      touch_grass_task: "Step outside into the fresh air, wipe both sides of the largest leaf with a clean damp cotton cloth, and check underneath for any lurking dust or spider webbing."
    }
  },
  {
    id: "diseased-tomato",
    title: "2. Visible Disease Symptoms",
    subtitle: "Tomato (Early blight dark concentric lesions)",
    type: "diseased",
    imageUrl: "https://images.unsplash.com/photo-1592841200221-a6898f307baa?auto=format&fit=crop&w=800&q=80",
    analysis: {
      is_plant: true,
      plant_name: "Tomato",
      scientific_name: "Solanum lycopersicum",
      plant_confidence: "High",
      health_status: "Needs Attention",
      health_summary: "Some visible symptoms suggest this plant may be experiencing stress.",
      possible_diseases: [
        {
          "name": "Early Blight",
          "confidence": "Medium",
          "reason": "Several dark spots appear on the leaves. These visual symptoms can be consistent with early blight, but a photograph alone cannot confirm the diagnosis."
        }
      ],
      visible_symptoms: [
        "Brown spots",
        "Yellowing chlorotic halo around leaf spots",
        "Leaf curling and lower foliage drooping"
      ],
      possible_causes: [
        "Excess moisture",
        "Poor airflow",
        "Possible fungal infection"
      ],
      watering: "Moderate watering. Water strictly at the soil base without wetting the foliage.",
      sunlight: "6-8 hours of sunlight",
      soil: "Rich, well-draining loamy soil with mulch layer to prevent fungal soil splash.",
      recommended_actions: [
        "Check the soil moisture.",
        "Improve airflow around the plant.",
        "Avoid wetting the leaves while watering.",
        "Remove severely damaged leaves if appropriate.",
        "Monitor new growth for additional symptoms."
      ],
      care_tips: [
        "Dispose of removed diseased foliage in trash—never add to compost.",
        "Apply organic copper fungicide if wet humid conditions persist."
      ],
      touch_grass_task: "Look closely at the new leaves for additional symptoms."
    }
  },
  {
    id: "pest-basil",
    title: "3. Pest / Stress Symptoms",
    subtitle: "Sweet Basil (Stippling & sap-sucker damage)",
    type: "pest",
    imageUrl: "https://images.unsplash.com/photo-1608686207856-001b95cf60ca?auto=format&fit=crop&w=800&q=80",
    analysis: {
      is_plant: true,
      plant_name: "Sweet Basil",
      scientific_name: "Ocimum basilicum",
      plant_confidence: "High",
      health_status: "Needs Attention",
      health_summary: "Visible stippling and margin curling suggest the plant is experiencing pest-induced stress.",
      possible_diseases: [
        {
          "name": "Pest Damage (Spider Mites / Thrips)",
          "confidence": "Medium",
          "reason": "Fine silvery-yellow stippling and punctures across foliage indicate piercing-sucking insect feeding."
        }
      ],
      visible_symptoms: [
        "Tiny pale stippled specks",
        "Leaf curling along margins",
        "Holes and loss of uniform luster"
      ],
      possible_causes: [
        "Pest damage",
        "Excess moisture or localized dry air",
        "Nutrient stress"
      ],
      watering: "Moderate watering. Keep soil evenly moist but never soggy.",
      sunlight: "6-8 hours of sunlight",
      soil: "Well-aerated potting mix with excellent drainage.",
      recommended_actions: [
        "Check the soil moisture.",
        "Improve airflow around the plant.",
        "Avoid wetting the leaves while watering.",
        "Spray foliage with a gentle jet of lukewarm water outdoors to dislodge pests.",
        "Monitor new growth for additional symptoms."
      ],
      care_tips: [
        "Apply cold-pressed neem oil or insecticidal soap in the evening.",
        "Pinch off flower buds to redirect energy to vegetative growth."
      ],
      touch_grass_task: "Inspect the undersides of three lower leaves with your fingers for tiny pests, then mist the foliage outside."
    }
  },
  {
    id: "unclear-photo",
    title: "Unclear / Blurry Leaf Photo",
    subtitle: "Low resolution, high blur, ambiguous angles handled gracefully",
    type: "unclear",
    imageUrl: "https://images.unsplash.com/photo-1518531933037-91b2f5f229cc?auto=format&fit=crop&w=800&q=80",
    analysis: {
      is_plant: true,
      plant_name: "Unidentified Foliage (Blurry / Low Light)",
      scientific_name: "Plantae (Unable to determine reliably from this image)",
      plant_confidence: "Low",
      health_status: "Unknown",
      health_summary: "Unable to determine reliably from this image. The photo suffers from focal blur and low contrast, preventing accurate botanical identification or pathological assessment.",
      possible_diseases: [
        {
          "name": "Undetermined visual assessment",
          "confidence": "Low",
          "reason": "Image resolution or focus is insufficient to distinguish true pathological spots from surface shadows, dirt particles, or motion blur."
        }
      ],
      visible_symptoms: [
        "Focal blur obscuring leaf venation",
        "Indistinct color contrasts",
        "Partial foliage visibility"
      ],
      possible_causes: [
        "Camera focus locked on background",
        "Insufficient illumination during photo capture",
        "Extreme close-up motion blur"
      ],
      watering: "Check the top inch of soil with your fingertip. Water only if soil feels completely dry.",
      sunlight: "6-8 hours of sunlight (general baseline for most common indoor and garden plants).",
      soil: "Ensure potting container has free-flowing drainage holes to prevent root rot.",
      recommended_actions: [
        "Take a new photo in bright, indirect natural daylight.",
        "Hold the camera 6 to 12 inches away and tap the screen to lock focus directly on the leaf.",
        "Capture both the entire plant structure and a crisp close-up of any symptomatic leaves.",
        "Avoid using strong camera flash which can wash out subtle discoloration."
      ],
      care_tips: [
        "Do not invent or apply heavy chemical treatments until the plant issue is reliably diagnosed.",
        "Keep the plant in steady ambient conditions until a clearer diagnosis is completed."
      ],
      touch_grass_task: "Carry your plant over to a window or walk out to the garden, examine the soil with your hand, and take a crisp daylight photo with your camera focused directly on the leaf vein."
    }
  },
  {
    id: "non-plant-object",
    title: "Non-Plant Photo (Coffee Cup)",
    subtitle: "Accurately detects non-plant objects and guides user",
    type: "non-plant",
    imageUrl: "https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?auto=format&fit=crop&w=800&q=80",
    analysis: {
      is_plant: false,
      plant_name: "Not a Plant Detected",
      scientific_name: "Non-biological object",
      plant_confidence: "Low",
      health_status: "Unknown",
      health_summary: "No plant or botanical foliage was detected in this photo. PlantLens AI is specifically trained to analyze leaves, flowers, stems, and potted plants.",
      possible_diseases: [],
      visible_symptoms: [
        "Absence of plant tissue, leaves, stems, or chlorophytic cellular structure."
      ],
      possible_causes: [
        "Photo contains household object, furniture, food, or artificial surfaces."
      ],
      watering: "Not applicable.",
      sunlight: "6-8 hours of sunlight recommended for living green plants once you take a photo of one!",
      soil: "Not applicable.",
      recommended_actions: [
        "Find a houseplant, garden shrub, vegetable crop, or tree leaf in your vicinity.",
        "Take a clear photo centered on the plant foliage.",
        "Re-upload the new plant image to receive real-time Gemma analysis."
      ],
      care_tips: [
        "PlantLens AI analyzes leaves, stems, soil surface, and flower petals."
      ],
      touch_grass_task: "Step away from your desk, walk out your front door or onto your balcony, find the nearest living green plant, and touch a real leaf with your fingers."
    }
  }
];
