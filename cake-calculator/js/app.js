/**
 * Main Controller & Event Handlers
 * Cake Displacement Volume Calculator
 */

function updateAll() {
  const A = getCylinderArea();
  const greenRef = CYLINDER.greenMark; // 50.0 cm
  
  // Relative rise over green mark (50.0cm)
  const deltaGreen = isFlipped ? (hAfter - greenRef) : (hAfter - CYLINDER.h0);
  const measuredVolume = A * Math.max(0, deltaGreen); // V = A * deltaGreen (cm3)
  const measuredVolumeLiters = measuredVolume / 1000;

  let totalGeoVolume = 0;
  let totalMass = 0;

  cakes.forEach((cake, index) => {
    const v = calculateCakeVolume(cake);
    cake.calculatedVolume = v;
    const m = parseFloat(cake.mass) || 0;
    cake.calculatedDensity = v > 0 ? (m / v) : 0;
    totalGeoVolume += v;
    totalMass += m;

    // Dynamic sync to visible row and mobile card without re-rendering inputs
    const dVol = document.querySelector(`[data-cake-vol="${index}"]`);
    if (dVol) dVol.textContent = v.toFixed(1);
    const dDens = document.querySelector(`[data-cake-density="${index}"]`);
    if (dDens) dDens.textContent = cake.calculatedDensity.toFixed(2);

    const mVol = document.querySelector(`[data-mobile-cake-vol="${index}"]`);
    if (mVol) mVol.textContent = `V: ${v.toFixed(1)} cm³`;
    const mDens = document.querySelector(`[data-mobile-cake-density="${index}"]`);
    if (mDens) mDens.textContent = `ρ: ${cake.calculatedDensity.toFixed(2)} g/cm³`;
  });

  // Predicted rise from 10 cakes
  const predictedDeltaGreen = totalGeoVolume / A;
  const predictedHAfter = greenRef + predictedDeltaGreen;

  // Overflow check (H = 80cm)
  const isOverflow = hAfter > CYLINDER.H;

  // Update visual cylinder graphic
  updateCylinderVisualizer(hAfter, greenRef, isFlipped, isOverflow);

  // Update Cylinder Specs Display
  const dispH = document.getElementById('disp-H');
  if (dispH) dispH.textContent = `${CYLINDER.H.toFixed(1)}cm`;
  const dispR = document.getElementById('disp-R');
  if (dispR) dispR.textContent = `${CYLINDER.R.toFixed(2)}cm`;
  const dispH0 = document.getElementById('disp-h0');
  if (dispH0) dispH0.textContent = `${CYLINDER.h0.toFixed(1)}cm`;
  const dispGreen = document.getElementById('disp-green');
  if (dispGreen) dispGreen.textContent = `${greenRef.toFixed(1)}cm`;

  // Relative to Green Mark Display
  const deltaGreenSign = deltaGreen >= 0 ? `+${deltaGreen.toFixed(1)}` : `${deltaGreen.toFixed(1)}`;
  const statDeltaGreen = document.getElementById('stat-delta-green');
  if (statDeltaGreen) statDeltaGreen.textContent = `${deltaGreenSign} cm`;
  
  const statGreenDesc = document.getElementById('stat-green-desc');
  if (statGreenDesc) {
    if (deltaGreen > 0) {
      statGreenDesc.textContent = `Dâng +${deltaGreen.toFixed(1)}cm trên vạch xanh`;
    } else if (deltaGreen === 0) {
      statGreenDesc.textContent = 'Ngang bằng vạch xanh (50cm)';
    } else {
      statGreenDesc.textContent = `Thấp hơn vạch xanh ${Math.abs(deltaGreen).toFixed(1)}cm`;
    }
  }

  const statHSau = document.getElementById('stat-h-sau');
  if (statHSau) statHSau.textContent = `${hAfter.toFixed(1)} cm`;
  const statTotalRise = document.getElementById('stat-total-rise');
  if (statTotalRise) statTotalRise.textContent = `${deltaGreen.toFixed(1)}cm`;
  const statVolumeV = document.getElementById('stat-volume-v');
  if (statVolumeV) statVolumeV.textContent = `${measuredVolume.toLocaleString('en-US', { minimumFractionDigits: 1, maximumFractionDigits: 1 })} cm³`;
  const statVolumeL = document.getElementById('stat-volume-liters');
  if (statVolumeL) statVolumeL.textContent = `≈ ${measuredVolumeLiters.toFixed(2)} Lít`;

  const statTotalMass = document.getElementById('stat-total-mass');
  if (statTotalMass) statTotalMass.textContent = `${totalMass.toLocaleString('en-US')} g`;
  const statMassKg = document.getElementById('stat-mass-kg');
  if (statMassKg) statMassKg.textContent = `≈ ${(totalMass / 1000).toFixed(2)} kg`;

  const specVolume = totalMass > 0 ? (measuredVolume / totalMass) : 0;
  const statSpecVolume = document.getElementById('stat-spec-volume');
  if (statSpecVolume) statSpecVolume.textContent = `${specVolume.toFixed(2)} cm³/g`;

  const avgDensity = measuredVolume > 0 ? (totalMass / measuredVolume) : 0;
  const statDensity = document.getElementById('stat-density');
  if (statDensity) statDensity.textContent = `${avgDensity.toFixed(2)} g/cm³`;

  // Comparison Metrics (Requirements 1, 2, 3)
  const diffAbs = Math.abs(measuredVolume - totalGeoVolume);
  const diffPercent = totalGeoVolume > 0 ? (diffAbs / totalGeoVolume * 100) : 0;
  const diffElem = document.getElementById('stat-diff-percent');
  if (diffElem) {
    diffElem.textContent = `${diffPercent.toFixed(2)}%`;
    if (diffPercent < 5) {
      diffElem.className = 'text-base sm:text-xl font-extrabold font-mono text-emerald-400 mt-1';
      document.getElementById('stat-diff-desc').textContent = 'Rất chính xác (< 5%)';
    } else if (diffPercent < 15) {
      diffElem.className = 'text-base sm:text-xl font-extrabold font-mono text-amber-400 mt-1';
      document.getElementById('stat-diff-desc').textContent = 'Chênh lệch vừa (5% - 15%)';
    } else {
      diffElem.className = 'text-base sm:text-xl font-extrabold font-mono text-rose-400 mt-1';
      document.getElementById('stat-diff-desc').textContent = 'Chênh lệch lớn (> 15%)';
    }
  }

  // Update DEDICATED 3-REQUIREMENT CARD
  // (1) Thể tích từng bánh & Tổng thể tích 10 bánh
  const req1TotalV = document.getElementById('req1-total-v');
  if (req1TotalV) req1TotalV.textContent = `${totalGeoVolume.toLocaleString('en-US', { minimumFractionDigits: 1, maximumFractionDigits: 1 })} cm³`;
  const req1Liters = document.getElementById('req1-total-liters');
  if (req1Liters) req1Liters.textContent = `≈ ${(totalGeoVolume / 1000).toFixed(2)} Lít`;
  const req1Mass = document.getElementById('req1-total-mass');
  if (req1Mass) req1Mass.textContent = `${totalMass.toLocaleString('en-US')} g`;
  
  const req1List = document.getElementById('req1-individual-list');
  if (req1List) {
    req1List.innerHTML = '';
    cakes.forEach((c, idx) => {
      const item = document.createElement('div');
      item.className = 'flex items-center justify-between bg-slate-900/80 px-2 py-0.5 rounded border border-slate-800 text-[10px]';
      const dimTxt = c.shape === 'spherical_cap' ? `D:${c.dims.d} h:${c.dims.h}` : `${c.shape}`;
      item.innerHTML = `
        <span class="text-slate-400">#${idx + 1} (${dimTxt})</span>
        <span class="text-amber-300 font-bold font-mono">${(c.calculatedVolume || 0).toFixed(1)} cm³</span>
      `;
      req1List.appendChild(item);
    });
  }

  // (2) Độ cao mức gạo sau khi lật so với vạch xanh
  const req2Delta = document.getElementById('req2-delta-green');
  if (req2Delta) req2Delta.textContent = `${deltaGreenSign} cm`;
  const req2HSau = document.getElementById('req2-h-sau');
  if (req2HSau) req2HSau.textContent = `${hAfter.toFixed(1)} cm`;
  const req2PredDelta = document.getElementById('req2-pred-delta');
  if (req2PredDelta) req2PredDelta.textContent = `+${predictedDeltaGreen.toFixed(2)} cm`;
  const req2PredHSau = document.getElementById('req2-pred-hsau');
  if (req2PredHSau) req2PredHSau.textContent = `${predictedHAfter.toFixed(2)} cm`;

  // (3) Thể tích bánh suy ra từ độ dâng & so sánh với hình học
  const req3Vol = document.getElementById('req3-measured-v');
  if (req3Vol) req3Vol.textContent = `${measuredVolume.toLocaleString('en-US', { minimumFractionDigits: 1, maximumFractionDigits: 1 })} cm³`;
  const req3Lit = document.getElementById('req3-measured-l');
  if (req3Lit) req3Lit.textContent = `≈ ${measuredVolumeLiters.toFixed(2)} Lít`;
  const req3Diff = document.getElementById('req3-diff-abs');
  if (req3Diff) req3Diff.textContent = `${diffAbs.toFixed(1)} cm³`;
  const req3Pct = document.getElementById('req3-diff-pct');
  if (req3Pct) req3Pct.textContent = `${diffPercent.toFixed(2)}%`;
  const req3Eval = document.getElementById('req3-evaluation');
  if (req3Eval) {
    if (diffPercent < 2) {
      req3Eval.textContent = '✓ Độ dâng thực tế rất khớp với tổng thể tích 10 bánh (< 2%)';
      req3Eval.className = 'p-1.5 rounded bg-emerald-950/30 border border-emerald-500/30 text-[10px] text-emerald-300 font-medium';
    } else if (diffPercent < 5) {
      req3Eval.textContent = '✓ Độ dâng thực tế khớp tốt với mô hình chỏm cầu (< 5%)';
      req3Eval.className = 'p-1.5 rounded bg-emerald-950/30 border border-emerald-500/30 text-[10px] text-emerald-300 font-medium';
    } else {
      req3Eval.textContent = `⚠️ Chênh lệch ${diffPercent.toFixed(1)}%: Cần kiểm tra lại độ lèn chặt hoặc kích thước bánh`;
      req3Eval.className = 'p-1.5 rounded bg-amber-950/30 border border-amber-500/30 text-[10px] text-amber-300 font-medium';
    }
  }

  // Update Quick Prediction Preset Button
  const btnQuickPred = document.getElementById('btn-quick-pred');
  if (btnQuickPred) {
    btnQuickPred.textContent = `+${predictedDeltaGreen.toFixed(1)}cm (LT)`;
    btnQuickPred.dataset.delta = predictedDeltaGreen.toFixed(1);
  }

  const sumGeoV = document.getElementById('sum-geo-volume');
  if (sumGeoV) sumGeoV.textContent = `${totalGeoVolume.toLocaleString('en-US', { minimumFractionDigits: 1, maximumFractionDigits: 1 })} cm³`;
  const predGreenSign = predictedDeltaGreen >= 0 ? `+${predictedDeltaGreen.toFixed(1)}` : `${predictedDeltaGreen.toFixed(1)}`;
  const predDeltaGreenElem = document.getElementById('predicted-delta-green');
  if (predDeltaGreenElem) predDeltaGreenElem.textContent = `${predGreenSign} cm (h_sau = ${predictedHAfter.toFixed(1)}cm)`;

  // Sync input elements without triggering recursive input events
  const inputHSauNum = document.getElementById('input-h-sau-number');
  if (inputHSauNum) inputHSauNum.value = hAfter.toFixed(1);
  const inputDeltaGreen = document.getElementById('input-delta-green');
  if (inputDeltaGreen) inputDeltaGreen.value = deltaGreen.toFixed(1);
  const inputHSauSlider = document.getElementById('input-h-sau-slider');
  if (inputHSauSlider) inputHSauSlider.value = hAfter.toFixed(1);

  // Sync Mobile Sticky Bar
  const mobDeltaGreen = document.getElementById('mobile-bar-delta-green');
  if (mobDeltaGreen) mobDeltaGreen.textContent = `${deltaGreenSign} cm`;
  const mobVolume = document.getElementById('mobile-bar-volume');
  if (mobVolume) mobVolume.textContent = `${measuredVolume.toLocaleString('en-US', { maximumFractionDigits: 0 })} cm³`;

  // Sync Print Fields
  const printHSau = document.getElementById('print-h-sau');
  if (printHSau) printHSau.textContent = hAfter.toFixed(1);
  const printDeltaGreen = document.getElementById('print-delta-green');
  if (printDeltaGreen) printDeltaGreen.textContent = deltaGreenSign;
  const printDeltaH = document.getElementById('print-delta-h');
  if (printDeltaH) printDeltaH.textContent = deltaGreen.toFixed(1);
  const printVol = document.getElementById('print-volume');
  if (printVol) printVol.textContent = measuredVolume.toFixed(1);
  const printVolL = document.getElementById('print-volume-l');
  if (printVolL) printVolL.textContent = measuredVolumeLiters.toFixed(2);
  const printMass = document.getElementById('print-mass');
  if (printMass) printMass.textContent = totalMass.toFixed(0);
  const printDensity = document.getElementById('print-density');
  if (printDensity) printDensity.textContent = avgDensity.toFixed(2);
}

function initMobileTabs() {
  const tabButtons = document.querySelectorAll('.mobile-tab-btn');
  const secVisualizer = document.getElementById('section-visualizer');
  const secCakes = document.getElementById('section-cakes');
  const secMetrics = document.getElementById('section-metrics');

  function switchTab(tabName) {
    currentMobileTab = tabName;
    if (window.innerWidth < 1024) {
      if (secVisualizer) secVisualizer.classList.toggle('hidden', tabName !== 'visualizer');
      if (secCakes) secCakes.classList.toggle('hidden', tabName !== 'cakes');
      if (secMetrics) secMetrics.classList.toggle('hidden', tabName !== 'metrics');
    } else {
      if (secVisualizer) secVisualizer.classList.remove('hidden');
      if (secCakes) secCakes.classList.remove('hidden');
      if (secMetrics) secMetrics.classList.remove('hidden');
    }

    tabButtons.forEach(btn => {
      const isActive = btn.dataset.tab === tabName;
      if (isActive) {
        btn.className = 'mobile-tab-btn flex-1 py-2.5 text-center text-xs font-bold border-b-2 border-emerald-500 text-emerald-400 flex items-center justify-center gap-1.5';
      } else {
        btn.className = 'mobile-tab-btn flex-1 py-2.5 text-center text-xs font-bold border-b-2 border-transparent text-slate-400 hover:text-slate-200 flex items-center justify-center gap-1.5';
      }
    });
  }

  tabButtons.forEach(btn => {
    btn.addEventListener('click', () => switchTab(btn.dataset.tab));
  });

  const btnMobileSync = document.getElementById('mobile-btn-quick-sync');
  if (btnMobileSync) {
    btnMobileSync.addEventListener('click', () => {
      switchTab('visualizer');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  window.addEventListener('resize', () => {
    if (window.innerWidth >= 1024) {
      if (secVisualizer) secVisualizer.classList.remove('hidden');
      if (secCakes) secCakes.classList.remove('hidden');
      if (secMetrics) secMetrics.classList.remove('hidden');
    } else {
      switchTab(currentMobileTab);
    }
  });

  if (window.innerWidth < 1024) {
    switchTab('visualizer');
  }
}

function exportToCSV() {
  const A = getCylinderArea();
  const greenRef = CYLINDER.greenMark;
  const deltaGreen = hAfter - greenRef;
  const measuredVolume = A * Math.max(0, deltaGreen);

  let csv = 'Cylinder Rice Displacement Experiment Report\n';
  csv += `Application Version,${APP_VERSION},Build ${BUILD_TIMESTAMP}\n`;
  csv += `Cylinder Height (H),${CYLINDER.H},cm\n`;
  csv += `Cylinder Radius (R),${CYLINDER.R},cm\n`;
  csv += `Cylinder Base Area (A),${A.toFixed(4)},cm2\n`;
  csv += `Initial Rice Height (before flip),${CYLINDER.h0},cm\n`;
  csv += `Green Benchmark (after flip without cakes),${CYLINDER.greenMark},cm\n`;
  csv += `Cylinder Inversion State,${isFlipped ? 'Inverted (180° Flip)' : 'Original (Upright)'}\n`;
  csv += `Final Rice Height (h_sau),${hAfter.toFixed(2)},cm\n`;
  csv += `Height Rise relative to Green Mark (delta_h_xanh),${deltaGreen.toFixed(2)},cm\n`;
  csv += `Displaced Volume from Rice Rise (V),${measuredVolume.toFixed(2)},cm3\n\n`;

  csv += 'Cake #,Name,Shape,Dimensions,Mass (g),Geometric Volume (cm3),Density (g/cm3)\n';
  cakes.forEach((c, i) => {
    csv += `${i + 1},${c.name},${c.shape},"${formatDimSummary(c)}",${c.mass},${(c.calculatedVolume || 0).toFixed(2)},${(c.calculatedDensity || 0).toFixed(2)}\n`;
  });

  const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `cake_displacement_report_flipped_${new Date().toISOString().slice(0, 10)}.csv`;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
}

// Application Lifecycle Entrypoint
document.addEventListener('DOMContentLoaded', () => {
  if (window.lucide) lucide.createIcons();
  initMobileTabs();

  const slider = document.getElementById('input-h-sau-slider');
  const numInput = document.getElementById('input-h-sau-number');
  const deltaGreenInput = document.getElementById('input-delta-green');

  // 1. Slider change
  if (slider) {
    slider.addEventListener('input', (e) => {
      hAfter = parseFloat(e.target.value);
      updateAll();
    });
  }

  // 2. Absolute Height number change
  if (numInput) {
    numInput.addEventListener('input', (e) => {
      hAfter = parseFloat(e.target.value) || CYLINDER.h0;
      updateAll();
    });
  }

  // 3. Green Benchmark delta input change: h_sau = greenRef + deltaGreen
  if (deltaGreenInput) {
    deltaGreenInput.addEventListener('input', (e) => {
      const dG = parseFloat(e.target.value) || 0;
      const greenRef = CYLINDER.greenMark;
      hAfter = greenRef + dG;
      updateAll();
    });
  }

  // Quick delta buttons (0, +5, +10, +15, +20)
  document.querySelectorAll('.quick-delta-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const dG = parseFloat(btn.dataset.delta);
      const greenRef = CYLINDER.greenMark;
      hAfter = greenRef + dG;
      updateAll();
    });
  });

  // Flip Cylinder Toggle Handlers
  const btnFlip = document.getElementById('btn-flip-cylinder');
  if (btnFlip) {
    btnFlip.addEventListener('click', () => {
      isFlipped = !isFlipped;
      const wrapper = document.getElementById('cylinder-visual-wrapper');
      if (wrapper) {
        wrapper.classList.add('scale-95');
        setTimeout(() => wrapper.classList.remove('scale-95'), 200);
      }
      updateAll();
    });
  }

  const btnQuickFlip = document.getElementById('btn-quick-flip-toggle');
  if (btnQuickFlip) {
    btnQuickFlip.addEventListener('click', () => {
      isFlipped = !isFlipped;
      const wrapper = document.getElementById('cylinder-visual-wrapper');
      if (wrapper) {
        wrapper.classList.add('scale-95');
        setTimeout(() => wrapper.classList.remove('scale-95'), 200);
      }
      updateAll();
    });
  }

  // Mode toggles
  const btnModeExp = document.getElementById('btn-mode-exp');
  const btnModeTheo = document.getElementById('btn-mode-theo');
  const modeBadge = document.getElementById('mode-status-badge');

  if (btnModeExp && btnModeTheo) {
    btnModeExp.addEventListener('click', () => {
      currentMode = 'experimental';
      btnModeExp.className = 'p-2.5 sm:p-3 rounded-xl border text-left transition flex items-start gap-2.5 bg-emerald-500/10 border-emerald-500 text-white';
      btnModeTheo.className = 'p-2.5 sm:p-3 rounded-xl border text-left transition flex items-start gap-2.5 bg-slate-900 border-slate-800 hover:border-slate-700 text-slate-300';
      if (modeBadge) {
        modeBadge.textContent = 'Đo theo vạch xanh';
        modeBadge.className = 'text-[10px] sm:text-xs font-medium px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30';
      }
    });

    btnModeTheo.addEventListener('click', () => {
      currentMode = 'theoretical';
      btnModeTheo.className = 'p-2.5 sm:p-3 rounded-xl border text-left transition flex items-start gap-2.5 bg-indigo-500/10 border-indigo-500 text-white';
      btnModeExp.className = 'p-2.5 sm:p-3 rounded-xl border text-left transition flex items-start gap-2.5 bg-slate-900 border-slate-800 hover:border-slate-700 text-slate-300';
      if (modeBadge) {
        modeBadge.textContent = 'Dự đoán từ 10 bánh';
        modeBadge.className = 'text-[10px] sm:text-xs font-medium px-2 py-0.5 rounded-full bg-indigo-500/20 text-indigo-300 border border-indigo-500/30';
      }

      const A = getCylinderArea();
      let totalV = 0;
      cakes.forEach(c => totalV += calculateCakeVolume(c));
      hAfter = CYLINDER.greenMark + (totalV / A);
      updateAll();
    });
  }

  const btnSyncPred = document.getElementById('btn-sync-prediction');
  if (btnSyncPred) {
    btnSyncPred.addEventListener('click', () => {
      const A = getCylinderArea();
      let totalV = 0;
      cakes.forEach(c => totalV += calculateCakeVolume(c));
      hAfter = CYLINDER.greenMark + (totalV / A);
      updateAll();
      if (window.innerWidth < 1024) {
        const tabBtn = document.querySelector('[data-tab="visualizer"]');
        if (tabBtn) tabBtn.click();
      }
    });
  }

  // Presets selector
  const presetSelector = document.getElementById('preset-selector');
  if (presetSelector) {
    presetSelector.addEventListener('change', (e) => {
      const pKey = e.target.value;
      if (PRESETS[pKey]) {
        cakes = JSON.parse(JSON.stringify(PRESETS[pKey]));
        renderCakeTable();
        updateAll();
      }
    });
  }

  // Copy first to all
  const btnCopyFirst = document.getElementById('btn-copy-first-to-all');
  if (btnCopyFirst) {
    btnCopyFirst.addEventListener('click', () => {
      const first = cakes[0];
      cakes = cakes.map((c, i) => ({
        id: i + 1,
        name: `Bánh ${i + 1}`,
        shape: first.shape,
        dims: JSON.parse(JSON.stringify(first.dims)),
        mass: first.mass
      }));
      renderCakeTable();
      updateAll();
    });
  }

  // Export CSV
  const btnExportCsv = document.getElementById('btn-export-csv');
  if (btnExportCsv) btnExportCsv.addEventListener('click', exportToCSV);

  // Print Report
  const btnPrintReport = document.getElementById('btn-print-report');
  if (btnPrintReport) {
    btnPrintReport.addEventListener('click', () => {
      window.print();
    });
  }

  // Edit Cylinder Config
  const btnToggleConfig = document.getElementById('btn-toggle-cylinder-config');
  if (btnToggleConfig) {
    btnToggleConfig.addEventListener('click', () => {
      const newH = prompt('Nhập chiều cao ống H (cm):', CYLINDER.H);
      if (newH && !isNaN(parseFloat(newH))) CYLINDER.H = parseFloat(newH);

      const newR = prompt('Nhập bán kính đáy R (cm):', CYLINDER.R);
      if (newR && !isNaN(parseFloat(newR))) CYLINDER.R = parseFloat(newR);

      const newH0 = prompt('Nhập mức gạo ban đầu h0 (cm):', CYLINDER.h0);
      if (newH0 && !isNaN(parseFloat(newH0))) CYLINDER.h0 = parseFloat(newH0);

      const newGreen = prompt('Nhập vạch xanh khi lật không bánh (cm):', CYLINDER.greenMark);
      if (newGreen && !isNaN(parseFloat(newGreen))) CYLINDER.greenMark = parseFloat(newGreen);

      updateAll();
    });
  }

  // Version badge popup on click
  const headerVerBadge = document.getElementById('header-version-badge');
  if (headerVerBadge) {
    headerVerBadge.addEventListener('click', () => {
      alert(
        `Phiên bản hiện tại: ${APP_VERSION}\n` +
        `Thời gian cập nhật: ${BUILD_TIMESTAMP}\n\n` +
        `Các yêu cầu bài toán đã đáp ứng đầy đủ:\n` +
        `✓ Ống trụ R = 9.37cm (A = 275.82 cm²), H = 80cm, gạo ban đầu = 30cm\n` +
        `✓ Khi lật không bánh, mức gạo đạt đúng vạch xanh = 50.0cm\n` +
        `✓ 10 bánh hình chỏm cầu: đường kính D (mm), cao h (mm), khối lượng m (g)\n` +
        `✓ (1) Tính thể tích từng bánh & tổng thể tích 10 bánh chỏm cầu (cm³)\n` +
        `✓ (2) Độ cao mức gạo dâng sau khi lật so với vạch xanh (Δh_xanh)\n` +
        `✓ (3) Thể tích bánh suy ra từ độ dâng thực tế V = A × Δh_xanh & so sánh với V hình học\n` +
        `✓ Nút Tải lại & Xóa cache để luôn tải bản mới nhất.`
      );
    });
  }

  // Force Reload / Cache Busting button
  const btnForceReload = document.getElementById('btn-force-reload');
  if (btnForceReload) {
    btnForceReload.addEventListener('click', () => {
      const baseUrl = window.location.origin + window.location.pathname;
      window.location.href = `${baseUrl}?v=${Date.now()}`;
    });
  }

  renderCakeTable();
  updateAll();
});
