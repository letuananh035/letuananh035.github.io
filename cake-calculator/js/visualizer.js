/**
 * Visual Cylinder & 2D Graphic Updates
 */

function renderFloatingCakes() {
  const container = document.getElementById('cakes-floating-container');
  if (!container) return;
  container.innerHTML = '';
  cakes.forEach(c => {
    const span = document.createElement('span');
    span.className = 'text-[11px] select-none';
    span.textContent = SHAPE_ICONS[c.shape] || '🍰';
    span.title = `${c.name}: ${c.shape}`;
    container.appendChild(span);
  });
}

function updateCylinderVisualizer(hAfter, greenRef, isFlipped, isOverflow) {
  // Overflow check (H = 80cm)
  const overflowElem = document.getElementById('overflow-alert');
  if (overflowElem) overflowElem.classList.toggle('hidden', !isOverflow);

  // Visual cylinder graphic (0 to 80cm scale)
  const visualHAfter = Math.min(80, Math.max(greenRef, hAfter));
  const visualHAfterPct = (visualHAfter / CYLINDER.H) * 100; // % from bottom
  const initialRicePct = (greenRef / CYLINDER.H) * 100;      // 50/80 = 62.5%
  const displacedLayerPct = Math.max(0, visualHAfterPct - initialRicePct);

  const displacedLayer = document.getElementById('displaced-layer');
  if (displacedLayer) {
    displacedLayer.style.height = `${displacedLayerPct}%`;
    const layerVal = document.getElementById('layer-h-sau-val');
    if (layerVal) layerVal.textContent = hAfter.toFixed(1);
  }

  const hAfterLine = document.getElementById('h-after-line');
  if (hAfterLine) {
    hAfterLine.style.bottom = `${visualHAfterPct}%`;
    const badge = document.getElementById('h-after-badge');
    if (badge) badge.textContent = `h_sau: ${hAfter.toFixed(1)}cm`;
  }

  // Dynamic Green Line & Ruler according to isFlipped
  const greenLine = document.getElementById('green-benchmark-line');
  const greenBadge = document.getElementById('green-benchmark-badge');
  const unflippedPreview = document.getElementById('unflipped-cakes-preview');
  const scaleRuler = document.getElementById('scale-ruler');
  const flipBtnText = document.getElementById('flip-btn-text');
  const flipBadge = document.getElementById('flip-badge');
  const flipBannerDesc = document.getElementById('flip-banner-desc');
  const btnQuickFlip = document.getElementById('btn-quick-flip-toggle');

  if (isFlipped) {
    if (greenLine) greenLine.style.bottom = '62.5%';
    if (greenBadge) greenBadge.innerHTML = '<i data-lucide="flag" class="w-2.5 h-2.5"></i> Vạch xanh (50cm)';
    if (unflippedPreview) unflippedPreview.classList.add('hidden');
    if (displacedLayer) displacedLayer.classList.remove('hidden');

    if (scaleRuler) {
      scaleRuler.innerHTML = `
        <span class="font-bold text-red-400">80cm (H)</span>
        <span>70cm</span>
        <span>60cm</span>
        <span class="text-emerald-400 font-extrabold flex items-center justify-end gap-1">50cm <span class="w-1.5 h-1.5 rounded-full bg-emerald-400"></span></span>
        <span>40cm</span>
        <span class="text-amber-400 font-semibold">30cm (h₀)</span>
        <span>20cm</span>
        <span>10cm</span>
        <span>0cm (Đáy)</span>
      `;
    }

    if (flipBtnText) flipBtnText.textContent = '🔄 Đã lật 180°';
    if (flipBadge) {
      flipBadge.textContent = 'ĐÃ LẬT 180°';
      flipBadge.className = 'px-2 py-0.5 rounded font-mono font-bold text-[10px] bg-emerald-500 text-slate-950';
    }
    if (flipBannerDesc) {
      flipBannerDesc.innerHTML = `Khi không bánh, gạo đạt đúng <strong>vạch xanh 50cm</strong>. Cho 10 bánh vào $\\to$ đo dâng trên vạch xanh!`;
    }
    if (btnQuickFlip) btnQuickFlip.textContent = 'Xem lúc chưa lật';
  } else {
    if (greenLine) greenLine.style.bottom = '62.5%';
    if (greenBadge) greenBadge.innerHTML = '<i data-lucide="flag" class="w-2.5 h-2.5"></i> Vạch xanh (50cm)';
    if (unflippedPreview) unflippedPreview.classList.remove('hidden');
    if (displacedLayer) displacedLayer.classList.add('hidden');

    if (scaleRuler) {
      scaleRuler.innerHTML = `
        <span class="font-bold text-slate-300">80cm (Miệng)</span>
        <span>70cm</span>
        <span>60cm</span>
        <span class="text-emerald-400 font-extrabold flex items-center justify-end gap-1">50cm <span class="w-1.5 h-1.5 rounded-full bg-emerald-400"></span></span>
        <span>40cm</span>
        <span class="text-amber-400 font-bold">30cm (gạo)</span>
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
      flipBannerDesc.innerHTML = `Gạo 30cm ở đáy, bánh ở trên. Vạch xanh 50cm. Bấm Lật ống để bắt đầu đo!`;
    }
    if (btnQuickFlip) btnQuickFlip.textContent = 'Lật ngược ống ngay';
  }

  renderFloatingCakes();
  if (window.lucide) lucide.createIcons();
}
