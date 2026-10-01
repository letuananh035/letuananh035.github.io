/**
 * Configuration, Constants & Global State
 * Cake Displacement Volume Calculator
 */

const APP_VERSION = 'v2.8.1';
const BUILD_TIMESTAMP = '2026-10-01 17:20';

// Cylindrical measuring vessel specifications
const CYLINDER = {
  H: 80.0,        // Total cylinder height: 80cm
  R: 9.37,        // Base radius: 9.37cm
  h0: 30.0,       // Initial rice level: 30cm
  greenMark: 50.0 // Green benchmark: 50cm (settles exactly here when inverted without cakes!)
};

// Application State
let isFlipped = true;         // Default to inverted state (the measuring state of the experiment)
let hAfter = 56.0;            // Measured rice level after inverting with 10 cakes (cm), default Δh = 6.0cm above 50cm mark as tested in Gemini chat!
let currentMode = 'experimental';
let currentMobileTab = 'visualizer';

// 10 Cake Items (default matching latest Gemini chat dataset: V=1629.3cm³, m=421.7g)
let cakes = [
  { id: 1, name: 'Bánh 1 (Chỏm cầu)', shape: 'spherical_cap', dims: { d: 81, h: 46 }, mass: 42.0 },
  { id: 2, name: 'Bánh 2 (Chỏm cầu)', shape: 'spherical_cap', dims: { d: 83, h: 49 }, mass: 41.9 },
  { id: 3, name: 'Bánh 3 (Chỏm cầu)', shape: 'spherical_cap', dims: { d: 78, h: 47 }, mass: 41.9 },
  { id: 4, name: 'Bánh 4 (Chỏm cầu)', shape: 'spherical_cap', dims: { d: 80, h: 50 }, mass: 42.7 },
  { id: 5, name: 'Bánh 5 (Chỏm cầu)', shape: 'spherical_cap', dims: { d: 83, h: 45 }, mass: 41.7 },
  { id: 6, name: 'Bánh 6 (Chỏm cầu)', shape: 'spherical_cap', dims: { d: 78, h: 46 }, mass: 42.8 },
  { id: 7, name: 'Bánh 7 (Chỏm cầu)', shape: 'spherical_cap', dims: { d: 78, h: 43 }, mass: 41.0 },
  { id: 8, name: 'Bánh 8 (Chỏm cầu)', shape: 'spherical_cap', dims: { d: 78, h: 44 }, mass: 42.7 },
  { id: 9, name: 'Bánh 9 (Chỏm cầu)', shape: 'spherical_cap', dims: { d: 78, h: 42 }, mass: 41.9 },
  { id: 10, name: 'Bánh 10 (Chỏm cầu)', shape: 'spherical_cap', dims: { d: 78, h: 43 }, mass: 43.1 }
];

// Presets for quick selection
const PRESETS = {
  gemini_dataset_2: [
    { id: 1, name: 'Bánh 1 (Chỏm cầu)', shape: 'spherical_cap', dims: { d: 81, h: 46 }, mass: 42.0 },
    { id: 2, name: 'Bánh 2 (Chỏm cầu)', shape: 'spherical_cap', dims: { d: 83, h: 49 }, mass: 41.9 },
    { id: 3, name: 'Bánh 3 (Chỏm cầu)', shape: 'spherical_cap', dims: { d: 78, h: 47 }, mass: 41.9 },
    { id: 4, name: 'Bánh 4 (Chỏm cầu)', shape: 'spherical_cap', dims: { d: 80, h: 50 }, mass: 42.7 },
    { id: 5, name: 'Bánh 5 (Chỏm cầu)', shape: 'spherical_cap', dims: { d: 83, h: 45 }, mass: 41.7 },
    { id: 6, name: 'Bánh 6 (Chỏm cầu)', shape: 'spherical_cap', dims: { d: 78, h: 46 }, mass: 42.8 },
    { id: 7, name: 'Bánh 7 (Chỏm cầu)', shape: 'spherical_cap', dims: { d: 78, h: 43 }, mass: 41.0 },
    { id: 8, name: 'Bánh 8 (Chỏm cầu)', shape: 'spherical_cap', dims: { d: 78, h: 44 }, mass: 42.7 },
    { id: 9, name: 'Bánh 9 (Chỏm cầu)', shape: 'spherical_cap', dims: { d: 78, h: 42 }, mass: 41.9 },
    { id: 10, name: 'Bánh 10 (Chỏm cầu)', shape: 'spherical_cap', dims: { d: 78, h: 43 }, mass: 43.1 }
  ],
  gemini_dataset_1: [
    { id: 1, name: 'Bánh 1 (Chỏm cầu)', shape: 'spherical_cap', dims: { d: 80, h: 49 }, mass: 41.1 },
    { id: 2, name: 'Bánh 2 (Chỏm cầu)', shape: 'spherical_cap', dims: { d: 80, h: 47 }, mass: 42.1 },
    { id: 3, name: 'Bánh 3 (Chỏm cầu)', shape: 'spherical_cap', dims: { d: 84, h: 44 }, mass: 42.5 },
    { id: 4, name: 'Bánh 4 (Chỏm cầu)', shape: 'spherical_cap', dims: { d: 82, h: 49 }, mass: 42.2 },
    { id: 5, name: 'Bánh 5 (Chỏm cầu)', shape: 'spherical_cap', dims: { d: 80, h: 47 }, mass: 41.6 },
    { id: 6, name: 'Bánh 6 (Chỏm cầu)', shape: 'spherical_cap', dims: { d: 79, h: 47 }, mass: 41.9 },
    { id: 7, name: 'Bánh 7 (Chỏm cầu)', shape: 'spherical_cap', dims: { d: 80, h: 45 }, mass: 42.3 },
    { id: 8, name: 'Bánh 8 (Chỏm cầu)', shape: 'spherical_cap', dims: { d: 83, h: 43 }, mass: 41.6 },
    { id: 9, name: 'Bánh 9 (Chỏm cầu)', shape: 'spherical_cap', dims: { d: 81, h: 47 }, mass: 41.8 },
    { id: 10, name: 'Bánh 10 (Chỏm cầu)', shape: 'spherical_cap', dims: { d: 81, h: 47 }, mass: 43.1 }
  ],
  dome_standard: Array.from({ length: 10 }, (_, i) => ({
    id: i + 1, name: `Chỏm cầu ${i + 1}`, shape: 'spherical_cap', dims: { d: 100, h: 50 }, mass: 260
  })),
  dome_varied: [
    { id: 1, name: 'Chỏm cầu 1', shape: 'spherical_cap', dims: { d: 100, h: 50 }, mass: 260 },
    { id: 2, name: 'Chỏm cầu 2', shape: 'spherical_cap', dims: { d: 100, h: 50 }, mass: 260 },
    { id: 3, name: 'Chỏm cầu 3', shape: 'spherical_cap', dims: { d: 105, h: 52 }, mass: 285 },
    { id: 4, name: 'Chỏm cầu 4', shape: 'spherical_cap', dims: { d: 105, h: 52 }, mass: 285 },
    { id: 5, name: 'Chỏm cầu 5', shape: 'spherical_cap', dims: { d: 98, h: 48 }, mass: 240 },
    { id: 6, name: 'Chỏm cầu 6', shape: 'spherical_cap', dims: { d: 98, h: 48 }, mass: 240 },
    { id: 7, name: 'Chỏm cầu 7', shape: 'spherical_cap', dims: { d: 102, h: 51 }, mass: 270 },
    { id: 8, name: 'Chỏm cầu 8', shape: 'spherical_cap', dims: { d: 102, h: 51 }, mass: 270 },
    { id: 9, name: 'Chỏm cầu 9', shape: 'spherical_cap', dims: { d: 100, h: 50 }, mass: 260 },
    { id: 10, name: 'Chỏm cầu 10', shape: 'spherical_cap', dims: { d: 100, h: 50 }, mass: 260 }
  ],
  dome_large: Array.from({ length: 10 }, (_, i) => ({
    id: i + 1, name: `Chỏm cầu ${i + 1}`, shape: 'spherical_cap', dims: { d: 110, h: 55 }, mass: 320
  })),
  dome_small: Array.from({ length: 10 }, (_, i) => ({
    id: i + 1, name: `Chỏm cầu ${i + 1}`, shape: 'spherical_cap', dims: { d: 85, h: 45 }, mass: 180
  })),
  muffin: Array.from({ length: 10 }, (_, i) => ({
    id: i + 1, name: `Muffin ${i + 1}`, shape: 'muffin', dims: { d1: 100, d2: 70, h: 80 }, mass: 320
  })),
  mixed: [
    { id: 1, name: 'Bánh 1 (Chỏm cầu)', shape: 'spherical_cap', dims: { d: 100, h: 50 }, mass: 260 },
    { id: 2, name: 'Bánh 2 (Chỏm cầu)', shape: 'spherical_cap', dims: { d: 100, h: 50 }, mass: 260 },
    { id: 3, name: 'Bánh 3 (Chỏm cầu)', shape: 'spherical_cap', dims: { d: 105, h: 52 }, mass: 285 },
    { id: 4, name: 'Bánh 4 (Trụ)', shape: 'cylinder', dims: { d: 100, h: 70 }, mass: 340 },
    { id: 5, name: 'Bánh 5 (Trụ)', shape: 'cylinder', dims: { d: 100, h: 70 }, mass: 340 },
    { id: 6, name: 'Bánh 6 (Hộp CN)', shape: 'cuboid', dims: { l: 120, w: 90, h: 50 }, mass: 350 },
    { id: 7, name: 'Bánh 7 (Hộp CN)', shape: 'cuboid', dims: { l: 120, w: 90, h: 50 }, mass: 350 },
    { id: 8, name: 'Bánh 8 (Cầu)', shape: 'sphere', dims: { d: 100 }, mass: 310 },
    { id: 9, name: 'Bánh 9 (Donut)', shape: 'donut', dims: { dout: 120, din: 45, thick: 40 }, mass: 280 },
    { id: 10, name: 'Bánh 10 (Chỏm cầu)', shape: 'spherical_cap', dims: { d: 100, h: 50 }, mass: 260 }
  ]
};

const SHAPE_ICONS = {
  cuboid: '📦',
  cylinder: '🥫',
  sphere: '⚪',
  spherical_cap: '🥣',
  muffin: '🧁',
  donut: '🍩',
  ellipsoid: '🥚',
  custom: '🍰'
};
