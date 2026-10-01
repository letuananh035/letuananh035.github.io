/**
 * Mathematical & Physics Calculations
 * Cylinder & Cake Geometry Formulas
 */

// Cross-sectional base area of cylinder: A = pi * R^2 (cm2)
function getCylinderArea() {
  return Math.PI * Math.pow(CYLINDER.R, 2); // ~275.8234 cm2
}

/**
 * Calculates geometric volume of an individual cake from millimeter inputs.
 * Returns volume in cm³ (converted from mm to cm).
 */
function calculateCakeVolume(cake) {
  const d = cake.dims || {};
  switch (cake.shape) {
    case 'spherical_cap': {
      // Spherical cap (Chỏm cầu):
      // Input: D (mm) base diameter, h (mm) cap height
      // Convert mm to cm: D_cm = D / 10, h_cm = h / 10, a_cm = D_cm / 2
      // V (cm3) = (1/6) * pi * h_cm * (3 * a_cm^2 + h_cm^2)
      const dia_mm = parseFloat(d.d) || 0;
      const h_mm = parseFloat(d.h) || 0;
      const dia_cm = dia_mm / 10;
      const h_cm = h_mm / 10;
      const a_cm = dia_cm / 2;
      return (1 / 6) * Math.PI * h_cm * (3 * Math.pow(a_cm, 2) + Math.pow(h_cm, 2));
    }
    case 'cuboid': {
      const l_cm = (parseFloat(d.l) || 0) / 10;
      const w_cm = (parseFloat(d.w) || 0) / 10;
      const h_cm = (parseFloat(d.h) || 0) / 10;
      return l_cm * w_cm * h_cm;
    }
    case 'cylinder': {
      const r_cm = ((parseFloat(d.d) || 0) / 10) / 2;
      const h_cm = (parseFloat(d.h) || 0) / 10;
      return Math.PI * Math.pow(r_cm, 2) * h_cm;
    }
    case 'sphere': {
      const r_cm = ((parseFloat(d.d) || 0) / 10) / 2;
      return (4 / 3) * Math.PI * Math.pow(r_cm, 3);
    }
    case 'muffin': {
      const r1_cm = ((parseFloat(d.d1) || 0) / 10) / 2;
      const r2_cm = ((parseFloat(d.d2) || 0) / 10) / 2;
      const h_cm = (parseFloat(d.h) || 0) / 10;
      return (1 / 3) * Math.PI * h_cm * (Math.pow(r1_cm, 2) + Math.pow(r2_cm, 2) + r1_cm * r2_cm);
    }
    case 'donut': {
      const dOut_cm = (parseFloat(d.dout) || 0) / 10;
      const dIn_cm = (parseFloat(d.din) || 0) / 10;
      if (dOut_cm <= dIn_cm) return 0;
      const rTube_cm = (dOut_cm - dIn_cm) / 4;
      const rMajor_cm = (dOut_cm + dIn_cm) / 4;
      return 2 * Math.pow(Math.PI, 2) * rMajor_cm * Math.pow(rTube_cm, 2);
    }
    case 'ellipsoid': {
      const a_cm = ((parseFloat(d.a) || 0) / 10) / 2;
      const b_cm = ((parseFloat(d.b) || 0) / 10) / 2;
      const c_cm = ((parseFloat(d.c) || 0) / 10) / 2;
      return (4 / 3) * Math.PI * a_cm * b_cm * c_cm;
    }
    case 'custom': {
      return parseFloat(d.v) || 0;
    }
    default:
      return 0;
  }
}
