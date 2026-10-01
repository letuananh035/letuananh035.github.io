/**
 * Configuration, Constants & Global State
 * Cake Displacement Volume Calculator
 */

const APP_VERSION = 'v2.8.0';
const BUILD_TIMESTAMP = '2026-10-01 16:40';

// Cylindrical measuring vessel specifications
const CYLINDER = {
  H: 80.0,        // Total cylinder height: 80cm
  R: 9.37,        // Base radius: 9.37cm
  h0: 30.0,       // Initial rice level: 30cm
  greenMark: 50.0 // Green benchmark: 50cm (settles exactly here when inverted without cakes!)
};

// Application State
let isFlipped = true;         // Default to inverted state (the measuring state of the experiment)
let hAfter = 59.7;            // Measured rice level after inverting with 10 cakes (cm), default ~9.7cm above 50cm
let currentMode = 'experimental';
let currentMobileTab = 'visualizer';

// 10 Cake Items (default 10 spherical caps, dimensions in mm, mass in g)
let cakes = [
  { id: 1, name: 'Bánh 1 (Chỏm cầu)', shape: 'spherical_cap', dims: { d: 100, h: 50 }, mass: 260 },
  { id: 2, name: 'Bánh 2 (Chỏm cầu)', shape: 'spherical_cap', dims: { d: 100, h: 50 }, mass: 260 },
  { id: 3, name: 'Bánh 3 (Chỏm cầu)', shape: 'spherical_cap', dims: { d: 105, h: 52 }, mass: 285 },
  { id: 4, name: 'Bánh 4 (Chỏm cầu)', shape: 'spherical_cap', dims: { d: 105, h: 52 }, mass: 285 },
  { id: 5, name: 'Bánh 5 (Chỏm cầu)', shape: 'spherical_cap', dims: { d: 98, h: 48 }, mass: 240 },
  { id: 6, name: 'Bánh 6 (Chỏm cầu)', shape: 'spherical_cap', dims: { d: 98, h: 48 }, mass: 240 },
  { id: 7, name: 'Bánh 7 (Chỏm cầu)', shape: 'spherical_cap', dims: { d: 102, h: 51 }, mass: 270 },
  { id: 8, name: 'Bánh 8 (Chỏm cầu)', shape: 'spherical_cap', dims: { d: 102, h: 51 }, mass: 270 },
  { id: 9, name: 'Bánh 9 (Chỏm cầu)', shape: 'spherical_cap', dims: { d: 100, h: 50 }, mass: 260 },
  { id: 10, name: 'Bánh 10 (Chỏm cầu)', shape: 'spherical_cap', dims: { d: 100, h: 50 }, mass: 260 }
];

// Presets for quick selection
const PRESETS = {
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
