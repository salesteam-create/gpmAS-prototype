// ─────────────────────────────────────────────────────────────────────────
// GPM demo data — a fictional elite academy ("Nordvik Academy"), football.
// Architected sport-agnostically: a `sport` field gates everything so the
// same UI can render basketball, tennis, etc. Football is the seeded vertical.
// ─────────────────────────────────────────────────────────────────────────

export type Sport = "Football" | "Basketball" | "Tennis";

export type DrillCategory =
  | "Technical"
  | "Tactical"
  | "Strength & Conditioning"
  | "Speed & Agility"
  | "Cardio"
  | "Recovery"
  | "Goalkeeping";

export type Intensity = "Low" | "Moderate" | "High" | "Max";

export interface Drill {
  id: string;
  title: string;
  category: DrillCategory;
  sport: Sport;
  duration: number; // minutes
  intensity: Intensity;
  difficulty: 1 | 2 | 3 | 4 | 5;
  players: string; // group size
  equipment: string[];
  focus: string[]; // skill tags
  ageGroups: string[];
  coachingPoints: string[];
  description: string;
  metrics: string[]; // what it tracks
  rating: number; // 0-5
  uses: number; // times added to a session
  signature?: boolean; // part of the Viking-style proprietary curriculum
  accent: "volt" | "plasma" | "viol";
}

export interface Player {
  id: string;
  name: string;
  position: string;
  squad: string;
  age: number;
  number: number;
  readiness: number; // 0-100
  acwr: number; // acute:chronic workload ratio
  load7d: number;
  attendance: number; // %
  form: number; // -100..100 trend
  status: "Available" | "Monitor" | "Injured" | "Rest";
  topAttribute: string;
  attributes: { label: string; value: number }[];
  trend: number[]; // performance index series
}

export interface Squad {
  id: string;
  name: string;
  level: string;
  coach: string;
  players: number;
  avgReadiness: number;
  nextSession: string;
  color: string;
}

export interface SessionBlock {
  drillId: string;
  minutes: number;
}

export interface ScheduleEvent {
  id: string;
  title: string;
  squad: string;
  type: "Training" | "Match" | "Gym" | "Recovery" | "Analysis";
  day: number; // 0=Mon
  start: number; // hour, 24h
  duration: number; // hours
  location: string;
}

export const club = {
  name: "Nordvik Academy",
  tagline: "Forging the next generation",
  sport: "Football" as Sport,
  season: "2025/26",
  established: 2011,
  playersDeveloped: 38,
  signedPro: 12,
};

export const squads: Squad[] = [
  { id: "sen", name: "Senior Squad", level: "First Team", coach: "Henrik Sørensen", players: 26, avgReadiness: 84, nextSession: "Today · 16:00", color: "#C6F24E" },
  { id: "u19", name: "Under-19", level: "Elite Development", coach: "Marco Bianchi", players: 22, avgReadiness: 79, nextSession: "Today · 17:30", color: "#5B8CFF" },
  { id: "u17", name: "Under-17", level: "Academy", coach: "Lena Brandt", players: 24, avgReadiness: 88, nextSession: "Tomorrow · 16:00", color: "#9A7BFF" },
  { id: "u15", name: "Under-15", level: "Foundation", coach: "Tomás Rivas", players: 28, avgReadiness: 91, nextSession: "Tomorrow · 15:30", color: "#3FD79A" },
];

export const players: Player[] = [
  {
    id: "p1", name: "Eskil Hauge", position: "ST", squad: "Senior Squad", age: 19, number: 9,
    readiness: 92, acwr: 1.08, load7d: 2140, attendance: 98, form: 34, status: "Available",
    topAttribute: "Finishing",
    attributes: [
      { label: "Finishing", value: 88 }, { label: "Pace", value: 84 }, { label: "Positioning", value: 81 },
      { label: "Strength", value: 74 }, { label: "Vision", value: 69 }, { label: "Dribbling", value: 77 },
    ],
    trend: [62, 65, 64, 70, 72, 71, 78, 82, 80, 86, 89, 92],
  },
  {
    id: "p2", name: "Mateo Solberg", position: "CM", squad: "Senior Squad", age: 21, number: 8,
    readiness: 76, acwr: 1.38, load7d: 2680, attendance: 95, form: -8, status: "Monitor",
    topAttribute: "Passing",
    attributes: [
      { label: "Passing", value: 90 }, { label: "Vision", value: 86 }, { label: "Stamina", value: 88 },
      { label: "Tackling", value: 72 }, { label: "Pace", value: 68 }, { label: "Shooting", value: 70 },
    ],
    trend: [80, 82, 84, 83, 85, 84, 82, 79, 78, 77, 76, 76],
  },
  {
    id: "p3", name: "Idris Bakar", position: "CB", squad: "Senior Squad", age: 23, number: 4,
    readiness: 45, acwr: 1.71, load7d: 980, attendance: 88, form: -22, status: "Injured",
    topAttribute: "Heading",
    attributes: [
      { label: "Heading", value: 89 }, { label: "Strength", value: 90 }, { label: "Tackling", value: 85 },
      { label: "Positioning", value: 83 }, { label: "Pace", value: 64 }, { label: "Passing", value: 71 },
    ],
    trend: [84, 85, 83, 80, 78, 70, 62, 55, 50, 47, 46, 45],
  },
  {
    id: "p4", name: "Noah Lindqvist", position: "GK", squad: "Senior Squad", age: 20, number: 1,
    readiness: 88, acwr: 0.94, load7d: 1620, attendance: 99, form: 12, status: "Available",
    topAttribute: "Reflexes",
    attributes: [
      { label: "Reflexes", value: 87 }, { label: "Handling", value: 84 }, { label: "Distribution", value: 80 },
      { label: "Positioning", value: 85 }, { label: "Aerial", value: 82 }, { label: "Communication", value: 78 },
    ],
    trend: [74, 76, 78, 77, 80, 82, 81, 83, 85, 86, 87, 88],
  },
  {
    id: "p5", name: "Diego Fontaine", position: "LW", squad: "Under-19", age: 18, number: 11,
    readiness: 81, acwr: 1.12, load7d: 1980, attendance: 96, form: 28, status: "Available",
    topAttribute: "Dribbling",
    attributes: [
      { label: "Dribbling", value: 91 }, { label: "Pace", value: 89 }, { label: "Crossing", value: 78 },
      { label: "Finishing", value: 74 }, { label: "Stamina", value: 80 }, { label: "Vision", value: 72 },
    ],
    trend: [58, 61, 64, 66, 70, 73, 75, 78, 79, 80, 80, 81],
  },
  {
    id: "p6", name: "Kai Andersen", position: "RB", squad: "Under-19", age: 18, number: 2,
    readiness: 85, acwr: 1.02, load7d: 1870, attendance: 97, form: 18, status: "Available",
    topAttribute: "Stamina",
    attributes: [
      { label: "Stamina", value: 88 }, { label: "Pace", value: 83 }, { label: "Crossing", value: 76 },
      { label: "Tackling", value: 79 }, { label: "Positioning", value: 75 }, { label: "Passing", value: 73 },
    ],
    trend: [66, 68, 70, 72, 74, 76, 78, 80, 82, 83, 84, 85],
  },
  {
    id: "p7", name: "Samir Okafor", position: "CM", squad: "Under-19", age: 17, number: 6,
    readiness: 90, acwr: 0.98, load7d: 1740, attendance: 100, form: 41, status: "Available",
    topAttribute: "Vision",
    attributes: [
      { label: "Vision", value: 85 }, { label: "Passing", value: 84 }, { label: "Dribbling", value: 80 },
      { label: "Stamina", value: 82 }, { label: "Tackling", value: 70 }, { label: "Shooting", value: 72 },
    ],
    trend: [55, 60, 63, 67, 71, 74, 78, 81, 84, 86, 88, 90],
  },
  {
    id: "p8", name: "Theo Marchand", position: "ST", squad: "Under-17", age: 16, number: 19,
    readiness: 94, acwr: 0.91, load7d: 1480, attendance: 99, form: 52, status: "Available",
    topAttribute: "Finishing",
    attributes: [
      { label: "Finishing", value: 82 }, { label: "Pace", value: 86 }, { label: "Positioning", value: 76 },
      { label: "Dribbling", value: 79 }, { label: "Strength", value: 64 }, { label: "Heading", value: 70 },
    ],
    trend: [48, 52, 57, 62, 66, 71, 75, 79, 83, 87, 91, 94],
  },
  {
    id: "p9", name: "Lukas Vogt", position: "CB", squad: "Under-17", age: 16, number: 5,
    readiness: 87, acwr: 1.05, load7d: 1390, attendance: 94, form: 22, status: "Available",
    topAttribute: "Positioning",
    attributes: [
      { label: "Positioning", value: 80 }, { label: "Heading", value: 78 }, { label: "Strength", value: 75 },
      { label: "Tackling", value: 77 }, { label: "Passing", value: 72 }, { label: "Pace", value: 68 },
    ],
    trend: [60, 62, 65, 68, 70, 73, 76, 79, 82, 84, 86, 87],
  },
  {
    id: "p10", name: "Adam Nowak", position: "LW", squad: "Under-17", age: 15, number: 7,
    readiness: 72, acwr: 1.44, load7d: 1560, attendance: 91, form: 6, status: "Monitor",
    topAttribute: "Pace",
    attributes: [
      { label: "Pace", value: 90 }, { label: "Dribbling", value: 81 }, { label: "Crossing", value: 70 },
      { label: "Finishing", value: 68 }, { label: "Stamina", value: 74 }, { label: "Vision", value: 66 },
    ],
    trend: [64, 67, 69, 71, 73, 72, 70, 71, 72, 73, 72, 72],
  },
  {
    id: "p11", name: "Finn Halvorsen", position: "CM", squad: "Under-15", age: 14, number: 10,
    readiness: 95, acwr: 0.88, load7d: 1120, attendance: 100, form: 60, status: "Available",
    topAttribute: "Technique",
    attributes: [
      { label: "Technique", value: 78 }, { label: "Vision", value: 74 }, { label: "Passing", value: 76 },
      { label: "Dribbling", value: 80 }, { label: "Stamina", value: 70 }, { label: "Shooting", value: 68 },
    ],
    trend: [40, 45, 50, 56, 62, 67, 72, 78, 84, 89, 93, 95],
  },
  {
    id: "p12", name: "Oskar Lund", position: "RW", squad: "Under-15", age: 14, number: 17,
    readiness: 89, acwr: 1.0, load7d: 1050, attendance: 97, form: 33, status: "Rest",
    topAttribute: "Agility",
    attributes: [
      { label: "Agility", value: 82 }, { label: "Pace", value: 80 }, { label: "Dribbling", value: 77 },
      { label: "Crossing", value: 66 }, { label: "Finishing", value: 64 }, { label: "Stamina", value: 72 },
    ],
    trend: [50, 54, 58, 63, 67, 71, 75, 79, 82, 85, 87, 89],
  },
];

export const drills: Drill[] = [
  {
    id: "d1", title: "Rondo Pressure Cooker", category: "Technical", sport: "Football",
    duration: 20, intensity: "High", difficulty: 4, players: "8–10", signature: true, accent: "volt",
    equipment: ["Cones", "Balls", "Bibs"], focus: ["First Touch", "Press Resistance", "Quick Passing"],
    ageGroups: ["U17", "U19", "Senior"],
    description: "The signature Nordvik possession drill. A 6v2 rondo with rotating pressers and a one-touch constraint in the final third of each cycle — engineered to replicate match-tempo decision-making under pressure.",
    coachingPoints: ["Body shape open to receive", "Disguise the pass", "Press the lane, not the ball", "Third-man runs on the trigger"],
    metrics: ["Pass completion %", "Touches per possession", "Press recovery time"],
    rating: 4.9, uses: 312,
  },
  {
    id: "d2", title: "Vertical Transition Wave", category: "Tactical", sport: "Football",
    duration: 25, intensity: "High", difficulty: 5, players: "16–22", signature: true, accent: "plasma",
    equipment: ["Full pitch", "Balls", "Mannequins"], focus: ["Counter-Press", "Transition", "Spacing"],
    ageGroups: ["U19", "Senior"],
    description: "Wave-based attack vs defence that drills the 5-second counter-press and immediate vertical transition. The core of the Viking-inspired transition identity.",
    coachingPoints: ["Win it back within 5 seconds", "First pass forward", "Width holds, runners attack depth", "Rest defence stays compact"],
    metrics: ["Recovery time", "Transition speed", "Chances created"],
    rating: 4.8, uses: 198,
  },
  {
    id: "d3", title: "Nordic Power Complex", category: "Strength & Conditioning", sport: "Football",
    duration: 35, intensity: "Max", difficulty: 4, players: "1–6", signature: true, accent: "viol",
    equipment: ["Barbell", "Plates", "Box"], focus: ["Explosive Power", "Posterior Chain", "Force"],
    ageGroups: ["U19", "Senior"],
    description: "Contrast complex pairing heavy trap-bar deadlifts with box jumps to maximise post-activation potentiation. Periodised across the in-season micro-cycle.",
    coachingPoints: ["Brace before the pull", "Triple extension on the jump", "60s rest between contrast pairs", "Quality over quantity"],
    metrics: ["Peak power (W)", "Jump height", "Estimated 1RM"],
    rating: 4.7, uses: 156,
  },
  {
    id: "d4", title: "Reactive Agility Ladder", category: "Speed & Agility", sport: "Football",
    duration: 15, intensity: "High", difficulty: 3, accent: "volt",
    players: "1–8", equipment: ["Agility ladder", "Lights", "Cones"], focus: ["Footwork", "Reaction", "Change of Direction"],
    ageGroups: ["U15", "U17", "U19", "Senior"],
    description: "Ladder footwork patterns triggered by reactive light cues, training neuromuscular response and deceleration mechanics.",
    coachingPoints: ["Low centre of gravity", "Drive the arms", "React, don't anticipate", "Soft landings"],
    metrics: ["Reaction time", "Completion speed", "Error count"],
    rating: 4.6, uses: 241,
  },
  {
    id: "d5", title: "Tempo Interval Engine", category: "Cardio", sport: "Football",
    duration: 30, intensity: "High", difficulty: 3, accent: "plasma",
    players: "Any", equipment: ["GPS vests", "Cones"], focus: ["Aerobic Base", "Repeated Sprint", "Recovery"],
    ageGroups: ["U17", "U19", "Senior"],
    description: "GPS-tracked tempo runs in 4-minute blocks at 85% HRmax, building the aerobic engine that underpins high-press intensity.",
    coachingPoints: ["Hit the target zone", "Controlled breathing", "Consistent splits", "Active recovery walks"],
    metrics: ["Total distance", "HR zones", "Sprint count"],
    rating: 4.4, uses: 187,
  },
  {
    id: "d6", title: "Finishing Carousel", category: "Technical", sport: "Football",
    duration: 20, intensity: "Moderate", difficulty: 3, accent: "volt",
    players: "6–12", equipment: ["Balls", "Goals", "Mannequins"], focus: ["Finishing", "First Touch", "Movement"],
    ageGroups: ["U15", "U17", "U19", "Senior"],
    description: "Rotating multi-station finishing circuit hitting first-time strikes, cutbacks and 1v1s vs the keeper from varied angles.",
    coachingPoints: ["Open the body", "Pick your spot early", "Follow your shot", "Composure over power"],
    metrics: ["Conversion %", "Shot placement", "Reps completed"],
    rating: 4.7, uses: 276,
  },
  {
    id: "d7", title: "Keeper Shot-Stopping Matrix", category: "Goalkeeping", sport: "Football",
    duration: 25, intensity: "High", difficulty: 4, accent: "viol",
    players: "1–3", equipment: ["Balls", "Goal", "Rebounder"], focus: ["Reflexes", "Set Position", "Recovery Saves"],
    ageGroups: ["U17", "U19", "Senior"],
    description: "Rapid-fire shot sequences with screen and deflection variables to sharpen reaction saves and the second-save reset.",
    coachingPoints: ["Set before the strike", "Strong side hand", "Recover to feet fast", "Catch or parry decisively"],
    metrics: ["Save %", "Set time", "Second-save rate"],
    rating: 4.5, uses: 92,
  },
  {
    id: "d8", title: "Active Recovery Flow", category: "Recovery", sport: "Football",
    duration: 25, intensity: "Low", difficulty: 1, accent: "plasma",
    players: "Any", equipment: ["Mats", "Foam rollers", "Bands"], focus: ["Mobility", "Parasympathetic", "Regeneration"],
    ageGroups: ["U15", "U17", "U19", "Senior"],
    description: "Guided mobility and breathwork session the day after matches to accelerate recovery and downregulate the nervous system.",
    coachingPoints: ["Nasal breathing", "Slow controlled tempo", "Hydrate throughout", "Listen to the body"],
    metrics: ["HRV", "Perceived recovery", "Range of motion"],
    rating: 4.8, uses: 203,
  },
  {
    id: "d9", title: "Positional Build-Up 4-3-3", category: "Tactical", sport: "Football",
    duration: 30, intensity: "Moderate", difficulty: 5, accent: "plasma", signature: true,
    players: "14–22", equipment: ["Full pitch", "Balls", "Zones"], focus: ["Build-Up", "Positioning", "Progression"],
    ageGroups: ["U19", "Senior"],
    description: "Zoned positional play teaching the academy's 4-3-3 build-up principles — playing through the thirds against a structured press.",
    coachingPoints: ["Create the free man", "Find the line-breaking pass", "Rotate to open angles", "Patience then penetrate"],
    metrics: ["Progressive passes", "Build-up success %", "Time in zones"],
    rating: 4.9, uses: 144,
  },
  {
    id: "d10", title: "1v1 Duel Lab", category: "Technical", sport: "Football",
    duration: 18, intensity: "High", difficulty: 3, accent: "volt",
    players: "4–12", equipment: ["Cones", "Balls", "Mini goals"], focus: ["Dribbling", "Defending", "Deception"],
    ageGroups: ["U15", "U17", "U19"],
    description: "Isolated attacking and defending duels in tight channels, building the confidence and technique to win individual battles.",
    coachingPoints: ["Attack the front foot", "Change of pace beats change of direction", "Defender stays patient", "Commit late"],
    metrics: ["Duel win %", "Take-on success", "1v1 reps"],
    rating: 4.6, uses: 219,
  },
  {
    id: "d11", title: "Hamstring Resilience Set", category: "Strength & Conditioning", sport: "Football",
    duration: 20, intensity: "Moderate", difficulty: 2, accent: "viol",
    players: "Any", equipment: ["Nordic pads", "Bands"], focus: ["Injury Prevention", "Eccentric Strength"],
    ageGroups: ["U17", "U19", "Senior"],
    description: "Evidence-based Nordic hamstring protocol to cut soft-tissue injury risk — a non-negotiable in the weekly load plan.",
    coachingPoints: ["Control the lowering", "Maintain neutral spine", "Progress volume weekly", "Never skip on heavy weeks"],
    metrics: ["Eccentric force", "L/R symmetry", "Compliance %"],
    rating: 4.5, uses: 167,
  },
  {
    id: "d12", title: "Small-Sided Game 4v4+2", category: "Tactical", sport: "Football",
    duration: 24, intensity: "High", difficulty: 2, accent: "plasma",
    players: "10", equipment: ["Cones", "Balls", "Bibs"], focus: ["Game Intelligence", "Pressing", "Support Play"],
    ageGroups: ["U15", "U17", "U19", "Senior"],
    description: "Conditioned small-sided game with floating jokers that maximises touches, decisions and high-intensity actions per minute.",
    coachingPoints: ["Scan before you receive", "Support angles, not lines", "Press as a unit", "Quick restarts"],
    metrics: ["High-intensity actions", "Possessions won", "Goals"],
    rating: 4.8, uses: 298,
  },
];

export const sessionTemplate = {
  name: "Matchday –1 · Activation & Set-Piece",
  squad: "Senior Squad",
  date: "Fri 20 Jun · 16:00",
  focus: "Sharpness, low volume, high quality",
  blocks: [
    { drillId: "d8", minutes: 12 },
    { drillId: "d4", minutes: 15 },
    { drillId: "d1", minutes: 20 },
    { drillId: "d6", minutes: 18 },
    { drillId: "d12", minutes: 20 },
  ] as SessionBlock[],
};

export const schedule: ScheduleEvent[] = [
  { id: "e1", title: "Activation & Rondo", squad: "Senior", type: "Training", day: 0, start: 16, duration: 2, location: "Pitch 1" },
  { id: "e2", title: "Strength · Lower", squad: "Senior", type: "Gym", day: 0, start: 10, duration: 1.5, location: "Performance Centre" },
  { id: "e3", title: "Technical Block", squad: "U19", type: "Training", day: 0, start: 17.5, duration: 2, location: "Pitch 2" },
  { id: "e4", title: "Possession & Build-Up", squad: "Senior", type: "Training", day: 1, start: 16, duration: 2, location: "Pitch 1" },
  { id: "e5", title: "Finishing & SSG", squad: "U17", type: "Training", day: 1, start: 16, duration: 1.5, location: "Pitch 3" },
  { id: "e6", title: "Speed & Agility", squad: "U15", type: "Training", day: 1, start: 15.5, duration: 1.5, location: "Pitch 2" },
  { id: "e7", title: "Tactical Walkthrough", squad: "Senior", type: "Analysis", day: 2, start: 11, duration: 1, location: "Video Room" },
  { id: "e8", title: "Transition Wave", squad: "U19", type: "Training", day: 2, start: 17, duration: 2, location: "Pitch 1" },
  { id: "e9", title: "Power Complex", squad: "Senior", type: "Gym", day: 3, start: 10, duration: 1.5, location: "Performance Centre" },
  { id: "e10", title: "Set-Piece Lab", squad: "Senior", type: "Training", day: 3, start: 16, duration: 1.5, location: "Pitch 1" },
  { id: "e11", title: "Matchday –1 Activation", squad: "Senior", type: "Training", day: 4, start: 16, duration: 1.5, location: "Pitch 1" },
  { id: "e12", title: "U17 League Match", squad: "U17", type: "Match", day: 4, start: 18, duration: 2, location: "Main Stadium" },
  { id: "e13", title: "Senior League Match", squad: "Senior", type: "Match", day: 5, start: 15, duration: 2.5, location: "Main Stadium" },
  { id: "e14", title: "Recovery Flow", squad: "Senior", type: "Recovery", day: 6, start: 11, duration: 1, location: "Performance Centre" },
];

// Org-wide trend series for the command-center hero chart
export const loadTrend = [
  { week: "W1", load: 4200, readiness: 78, injuries: 2 },
  { week: "W2", load: 4650, readiness: 80, injuries: 1 },
  { week: "W3", load: 5100, readiness: 76, injuries: 3 },
  { week: "W4", load: 4800, readiness: 82, injuries: 1 },
  { week: "W5", load: 5300, readiness: 85, injuries: 0 },
  { week: "W6", load: 4950, readiness: 83, injuries: 1 },
  { week: "W7", load: 5450, readiness: 86, injuries: 0 },
  { week: "W8", load: 5200, readiness: 84, injuries: 1 },
];

export const categoryMeta: Record<DrillCategory, { color: string; icon: string }> = {
  Technical: { color: "#C6F24E", icon: "Target" },
  Tactical: { color: "#5B8CFF", icon: "Network" },
  "Strength & Conditioning": { color: "#9A7BFF", icon: "Dumbbell" },
  "Speed & Agility": { color: "#3FD79A", icon: "Zap" },
  Cardio: { color: "#FBBF3C", icon: "HeartPulse" },
  Recovery: { color: "#34D7C6", icon: "Wind" },
  Goalkeeping: { color: "#FF8A5B", icon: "Hand" },
};

export const intensityColor: Record<Intensity, string> = {
  Low: "#3FD79A",
  Moderate: "#FBBF3C",
  High: "#FF8A5B",
  Max: "#FF5E6C",
};
