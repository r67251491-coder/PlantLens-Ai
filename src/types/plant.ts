export type HealthStatus =
  | "Healthy"
  | "Mostly Healthy"
  | "Needs Attention"
  | "Unhealthy"
  | "Unknown";

export type ConfidenceLevel = "High" | "Medium" | "Low";

export interface PossibleDisease {
  name: string;
  confidence: ConfidenceLevel;
  reason: string;
}

export interface PlantAnalysisResult {
  is_plant: boolean;
  plant_name: string;
  scientific_name: string;
  plant_confidence: ConfidenceLevel;
  health_status: HealthStatus;
  health_summary: string;
  possible_diseases: PossibleDisease[];
  visible_symptoms: string[];
  possible_causes: string[];
  watering: string;
  sunlight: string;
  soil: string;
  recommended_actions: string[];
  care_tips: string[];
  touch_grass_task: string;
  analysis_timestamp?: string;
  model_used?: string;
}

export interface DemoSample {
  id: string;
  title: string;
  subtitle: string;
  type: "healthy" | "diseased" | "pest" | "unclear" | "non-plant";
  imageUrl: string;
  analysis: PlantAnalysisResult;
}
