/**
 * Visual Cylinder & 2D Graphic Updates
 * Cake Displacement Volume Calculator
 */

function renderCakeVisuals(isFlipped) {
  const submergedContainer = document.getElementById('cakes-submerged-container');
  const unflippedContainer = document.getElementById('cakes-unflipped-container');

  if (isFlipped) {
    if (submergedContainer) {
      submergedContainer.innerHTML = '';
      cakes.forEach((c, idx) => {
        const item = document.createElement('div');
        item.className = 'flex items-center gap-0.5 bg-slate-900/90 px-1 py-0.5 rounded border border-amber-500/40 text-[9px] shadow select-none';
        item.innerHTML = `
          <span class="text-[11px]">${SHAPE_ICONS[c.shape] || '🥣'}</span>
          <span class="text-amber-300 font-mono font-bold text-[8px]">#${idx + 1}</span>
        `;
        item.title = `${c.name}: ${c.shape} (${c.mass}g)`;
        submergedContainer.appendChild(item);
      });
    }
  } else {
    if (unflippedContainer) {
      unflippedContainer.innerHTML = '';
      cakes.forEach((c, idx) => {
        const item = document.createElement('div');
        item.className = 'flex items-center gap-0.5 bg-slate-900/90 px-1 py-0.5 rounded border border-amber-500/40 text-[9px] shadow select-none';
        item.innerHTML = `
          <span class="text-[11px]">${SHAPE_ICONS[c.shape] || '🥣'}</span>
          <span class="text-amber-300 font-mono font-bold text-[8px]">#${idx + 1}</span>
        `;
        item.title = `${c.name}: ${c.shape} (${c.mass}g)`;
        unflippedContainer.appendChild(item);
      });
    }
  }
}

function updateCylinderVisualizer(hAfter, greenRef, isFlipped, isOverflow, deltaGreenVal) {
  // Overflow check (H = 80cm)
  const overflowElem = document.getElementById('overflow-alert');
  if (overflowElem) overflowElem.classList.toggle('hidden', !isOverflow);

  // Percentages relative to cylinder height (80cm)
  const visualHAfter = Math.min(80, Math.max(greenRef, hAfter));
  const visualHAfterPct = (visualHAfter / CYLINDER.H) * 100; // % from bottom
  const greenRefPct = (greenRef / CYLINDER.H) * 100;        // e.g. 30/80 = 37.5%, or 50/80 = 62.5%
  const displacedLayerPct = Math.max(0, visualHAfterPct - greenRefPct);

  // 1. Total Rice Column (extends from 0 to visualHAfterPct)
  const riceColumn = document.getElementById('cylinder-rice-column');
  if (riceColumn) {
    riceColumn.style.height = `${visualHAfterPct}%`;
  }

  // 2. Displaced Rice Layer (from greenRef up to visualHAfter)
  const displacedLayer = document.getElementById('displaced-layer');
  if (displacedLayer) {
    displacedLayer.style.bottom = `${greenRefPct}%`;
    displacedLayer.style.height = `${displacedLayerPct}%`;
    displacedLayer.classList.toggle('hidden', !isFlipped || displacedLayerPct <= 0);
    const layerDeltaVal = document.getElementById('layer-delta-val');
    if (layerDeltaVal) {
      layerDeltaVal.textContent = deltaGreenVal >= 0 ? `+${deltaGreenVal.toFixed(1)}` : deltaGreenVal.toFixed(1);
    }
  }

  // 3. Current Level Marker Line (h_sau)
  const hAfterLine = document.getElementById('h-after-line');
  if (hAfterLine) {
    hAfterLine.style.bottom = `${visualHAfterPct}%`;
    const badge = document.getElementById('h-after-badge');
    if (badge) badge.textContent = `h_sau: ${hAfter.toFixed(1)}cm`;
  }

  // 4. Dynamic Green Benchmark Line & Ruler
  const greenLine = document.getElementById('green-benchmark-line');
  const greenBadge = document.getElementById('green-benchmark-badge');
  const unflippedPreview = document.getElementById('unflipped-cakes-preview');
  const scaleRuler = document.getElementById('scale-ruler');
  const flipBtnText = document.getElementById('flip-btn-text');
  const flipBadge = document.getElementById('flip-badge');
  const flipBannerDesc = document.getElementById('flip-banner-desc');
  const btnQuickFlip = document.getElementById('btn-quick-flip-toggle');
  const baseRiceLabel = document.getElementById('base-rice-label');

  if (isFlipped) {
    if (greenLine) greenLine.style.bottom = `${greenRefPct}%`;
    if (greenBadge) {
      const modeLabel = rulerMode === 'new_bottom' ? '30cm (Đáy mới)' : '50cm (Thân ống)';
      greenBadge.innerHTML = `<i data-lucide="flag" class="w-2.5 h-2.5"></i> Vạch xanh (${modeLabel})`;
    }
    if (unflippedPreview) unflippedPreview.classList.add('hidden');

    if (baseRiceLabel) {
      baseRiceLabel.textContent = '10 bánh chìm ở đáy mới, lẫn trong gạo';
    }

    if (scaleRuler) {
      if (rulerMode === 'new_bottom') {
        scaleRuler.innerHTML = `
          <span class="font-bold text-red-400">80cm (Đỉnh)</span>
          <span>70cm</span>
          <span>60cm</span>
          <span>50cm</span>
          <span>40cm</span>
          <span class="text-emerald-400 font-extrabold flex items-center justify-end gap-1">30cm <span class="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span></span>
          <span>20cm</span>
          <span>10cm</span>
          <span class="text-amber-400 font-bold">0cm (Đáy mới)</span>
        `;
      } else {
        scaleRuler.innerHTML = `
          <span class="font-bold text-red-400">80cm (H)</span>
          <span>70cm</span>
          <span>60cm</span>
          <span class="text-emerald-400 font-extrabold flex items-center justify-end gap-1">50cm <span class="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span></span>
          <span>40cm</span>
          <span class="text-amber-400 font-semibold">30cm (h₀)</span>
          <span>20cm</span>
          <span>10cm</span>
          <span>0cm (Đáy cũ)</span>
        `;
      }
    }

    if (flipBtnText) flipBtnText.textContent = '🔄 Đã lật 180°';
    if (flipBadge) {
      flipBadge.textContent = 'ĐÃ LẬT 180°';
      flipBadge.className = 'px-2 py-0.5 rounded font-mono font-bold text-[10px] bg-emerald-500 text-slate-950';
    }
    if (flipBannerDesc) {
      if (rulerMode === 'new_bottom') {
        flipBannerDesc.innerHTML = `Khi lật ngược không bánh, gạo đạt đúng <strong>vạch xanh 30cm</strong> (do 80 - 50 = 30cm). Bánh chìm ở đáy mới → đẩy gạo dâng <strong>+${deltaGreenVal.toFixed(1)}cm</strong>!`;
      } else {
        flipBannerDesc.innerHTML = `Theo thước vỏ ống gốc: Vạch xanh ở <strong>50cm</strong>. Cho 10 bánh vào → đo gạo dâng trên vạch xanh <strong>+${deltaGreenVal.toFixed(1)}cm</strong>!`;
      }
    }
    if (btnQuickFlip) btnQuickFlip.textContent = 'Xem lúc chưa lật';
  } else {
    // Unflipped State
    if (greenLine) greenLine.style.bottom = '62.5%';
    if (greenBadge) greenBadge.innerHTML = '<i data-lucide="flag" class="w-2.5 h-2.5"></i> Vạch xanh (50cm)';
    if (unflippedPreview) unflippedPreview.classList.remove('hidden');

    if (baseRiceLabel) {
      baseRiceLabel.textContent = 'Gạo ban đầu: 30cm ở đáy cũ';
    }

    if (scaleRuler) {
      scaleRuler.innerHTML = `
        <span class="font-bold text-slate-300">80cm (Miệng)</span>
        <span>70cm</span>
        <span>60cm</span>
        <span class="text-emerald-400 font-extrabold flex items-center justify-end gap-1">50cm <span class="w-1.5 h-1.5 rounded-full bg-emerald-400"></span></span>
        <span>40cm</span>
        <span class="text-amber-400 font-bold">30cm (Gạo)</span>
        <span>20cm</span>
        <span>10cm</span>
        <span>0cm (Đáy)</span>
      `;
    }

    if (flipBtnText) flipBtnText.textContent = '🔄 Lật ngược ống 180°';
    if (flipBadge) {
      flipBadge.textContent = 'CHƯA LẬT (XUÔI)';
      flipBadge.className = 'px-2 py-0.5 rounded font-mono font-bold text-[10px] bg-amber-500 text-slate-950';
    }
    if (flipBannerDesc) {
      flipBannerDesc.innerHTML = `Gạo 30cm ở đáy cũ, 10 bánh thả vào phía trên. Bấm "Lật ngược ống" để bánh chìm xuống đáy mới và đo độ dâng!`;
    }
    if (btnQuickFlip) btnQuickFlip.textContent = 'Lật ngược ống ngay';
  }

  renderCakeVisuals(isFlipped);
  if (window.lucide) lucide.createIcons();
}
