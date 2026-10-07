import { DemoSample } from "@/types/plant";

export const DEMO_SAMPLES: DemoSample[] = [
  {
    id: "healthy-monstera",
    title: "Healthy Monstera",
    subtitle: "Vibrant foliage, active growth, zero lesions",
    type: "healthy",
    imageUrl: "https://images.unsplash.com/photo-1614594975525-e45190c55d0b?auto=format&fit=crop&w=800&q=80",
    analysis: {
      is_plant: true,
      plant_name: "Monstera Deliciosa (Swiss Cheese Plant)",
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
      watering: "Moderate watering. Allow top 2-3 inches of soil to dry out between waterings.",
      sunlight: "Bright, indirect sunlight. Avoid direct afternoon sun to prevent leaf scorching.",
      soil: "Well-draining peat-based potting mix amended with perlite and orchid bark.",
      recommended_actions: [
        "Check soil moisture with your finger before your next watering cycle.",
        "Gently wipe down the foliage with a soft, damp cloth to remove household dust.",
        "Rotate the pot 90 degrees every week to promote symmetrical growth toward ambient light.",
        "Maintain normal ambient room temperature between 18°C and 27°C (65°F - 80°F)."
      ],
      care_tips: [
        "Provide a moss pole or trellis support as aerial roots develop.",
        "Feed lightly with a balanced liquid houseplant fertilizer once monthly in spring and summer."
      ],
      touch_grass_task: "Step outside into the fresh air, wipe both sides of the largest leaf with a clean damp cotton cloth, and check underneath for any lurking dust or spider webbing."
    }
  },
  {
    id: "diseased-tomato",
    title: "Tomato (Early Blight)",
    subtitle: "Concentric rings, yellow chlorotic halo, lower foliage stress",
    type: "diseased",
    imageUrl: "https://images.unsplash.com/photo-1592841200221-a6898f307baa?auto=format&fit=crop&w=800&q=80",
    analysis: {
      is_plant: true,
      plant_name: "Garden Tomato",
      scientific_name: "Solanum lycopersicum",
      plant_confidence: "High",
      health_status: "Needs Attention",
      health_summary: "Several dark necrotic lesions with concentric rings and surrounding chlorotic yellow halos appear on the lower foliage, indicative of fungal leaf spot stress.",
      possible_diseases: [
        {
          "name": "Early Blight (Alternaria solani)",
          "confidence": "Medium",
          "reason": "Several dark spots appear on the leaves with subtle concentric rings and yellow margins. These visual symptoms can be consistent with early blight, but a photograph alone cannot confirm the diagnosis."
        },
        {
          "name": "Septoria Leaf Spot",
          "confidence": "Low",
          "reason": "Secondary consideration: smaller circular lesions on the lower canopy can occasionally mimic early fungal leaf spotting stages."
        }
      ],
      visible_symptoms: [
        "Brown spots with target-like concentric rings",
        "Yellow chlorosis surrounding leaf spots",
        "Premature drying and drooping of lower leaflets"
      ],
      possible_causes: [
        "Excess moisture and water splashing on foliage",
        "Poor airflow in the lower canopy",
        "Possible fungal infection (Alternaria species)"
      ],
      watering: "Water strictly at the soil base in the early morning. Never wet the foliage.",
      sunlight: "6-8 hours of direct full sun daily to dry dew and strengthen stems.",
      soil: "Rich, well-draining loamy soil with organic mulch layer to prevent soil splash.",
      recommended_actions: [
        "Sanitize garden shears with rubbing alcohol and prune off the lowest infected leaves touching the soil.",
        "Water strictly at the base around the root zone without wetting any leaves.",
        "Apply a 2-inch organic straw or mulch layer to prevent fungal spores from splashing up from soil.",
        "Improve spacing between plants to maximize air circulation and sunlight penetration.",
        "Monitor new upper growth daily to ensure symptoms are not progressing upward."
      ],
      care_tips: [
        "Dispose of removed diseased foliage in municipal green waste—never add it to home compost.",
        "Consider an organic copper-based fungicide or bio-fungicide if wet humid conditions persist."
      ],
      touch_grass_task: "Grab a pair of clean garden shears, head outside to your plant, and snip off the bottom two diseased leaves right where they meet the stem."
    }
  },
  {
    id: "pest-basil",
    title: "Basil (Pest Damage / Mites)",
    subtitle: "Stippling, microscopic chlorotic flecks, curled leaf margins",
    type: "pest",
    imageUrl: "https://images.unsplash.com/photo-1608686207856-001b95cf60ca?auto=format&fit=crop&w=800&q=80",
    analysis: {
      is_plant: true,
      plant_name: "Sweet Basil",
      scientific_name: "Ocimum basilicum",
      plant_confidence: "High",
      health_status: "Needs Attention",
      health_summary: "The foliage displays pale stippling, light mottled speckles, and mild cupping along leaf margins, which is characteristic of sap-sucking pest feeding activity.",
      possible_diseases: [
        {
          "name": "Pest Damage (Spider Mites or Thrips)",
          "confidence": "Medium",
          "reason": "Fine silvery-yellow stippling and small punctures across leaf surfaces suggest piercing-sucking insect feeding rather than systemic fungal disease."
        }
      ],
      visible_symptoms: [
        "Tiny pale stippled specks across foliage",
        "Mild inward leaf margin curling",
        "Loss of uniform emerald luster on older leaves"
      ],
      possible_causes: [
        "Pest damage from sap-feeding insects",
        "Dry, low-humidity microclimate around foliage",
        "Heat stress compounding pest susceptibility"
      ],
      watering: "Consistent moisture. Keep soil evenly moist but never waterlogged.",
      sunlight: "6-8 hours of sunlight daily with light afternoon shade if midday heat exceeds 32°C.",
      soil: "Rich, well-aerated organic potting soil with excellent drainage.",
      recommended_actions: [
        "Inspect the underside of leaves and leaf nodes with a magnifier for tiny mites or fine webbing.",
        "Gently spray the plant foliage outdoors with a brisk stream of lukewarm water to dislodge pests.",
        "Apply an organic cold-pressed neem oil spray or insecticidal soap during the cool evening.",
        "Isolate the plant from other neighboring indoor herbs to prevent pest cross-contamination.",
        "Pinch off the top flower buds to encourage the herb to focus energy on healthy vegetative foliage."
      ],
      care_tips: [
        "Never apply oil sprays in direct midday sun to prevent phototoxicity and leaf burn.",
        "Harvest healthy top leaves regularly to encourage bushy side shoots."
      ],
      touch_grass_task: "Take your basil pot outdoors into the garden, turn over three lower leaves to inspect for tiny insect specks, and give the foliage a refreshing rinse with the garden hose mist setting."
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
      health_summary: "No plant or botanical foliage was detected in this photo. PlantCare AI is specifically trained to analyze leaves, flowers, stems, and potted plants.",
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
        "PlantCare AI analyzes leaves, stems, soil surface, and flower petals."
      ],
      touch_grass_task: "Step away from your desk, walk out your front door or onto your balcony, find the nearest living green plant, and touch a real leaf with your fingers."
    }
  }
];
