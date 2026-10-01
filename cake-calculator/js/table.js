/**
 * Cake Table & Mobile Card Rendering
 * Input controls and row event listeners
 */

function formatDimSummary(cake) {
  const d = cake.dims || {};
  if (cake.shape === 'cuboid') return `L:${d.l} W:${d.w} H:${d.h}`;
  if (cake.shape === 'cylinder') return `D:${d.d} H:${d.h}`;
  if (cake.shape === 'spherical_cap') return `D:${d.d}mm h:${d.h}mm`;
  if (cake.shape === 'sphere') return `D:${d.d}`;
  if (cake.shape === 'muffin') return `D1:${d.d1} D2:${d.d2} H:${d.h}`;
  if (cake.shape === 'donut') return `D_out:${d.dout} D_in:${d.din} T:${d.thick}`;
  if (cake.shape === 'ellipsoid') return `a:${d.a} b:${d.b} c:${d.c}`;
  return `V:${d.v}`;
}

function getDimensionInputsHTML(cake, index, isMobile) {
  const d = cake.dims || {};
  if (isMobile) {
    switch (cake.shape) {
      case 'cuboid':
        return `
          <div><span class="text-[10px] text-slate-500">Dài</span><input type="number" inputmode="decimal" step="1" value="${d.l || 120}" data-index="${index}" data-dim="l" class="dim-input w-full px-2 py-1 bg-slate-900 border border-slate-700 rounded text-right text-xs text-white"></div>
          <div><span class="text-[10px] text-slate-500">Rộng</span><input type="number" inputmode="decimal" step="1" value="${d.w || 90}" data-index="${index}" data-dim="w" class="dim-input w-full px-2 py-1 bg-slate-900 border border-slate-700 rounded text-right text-xs text-white"></div>
          <div><span class="text-[10px] text-slate-500">Cao</span><input type="number" inputmode="decimal" step="1" value="${d.h || 50}" data-index="${index}" data-dim="h" class="dim-input w-full px-2 py-1 bg-slate-900 border border-slate-700 rounded text-right text-xs text-white"></div>
        `;
      case 'cylinder':
        return `
          <div class="col-span-1"><span class="text-[10px] text-slate-500">Đ.kính</span><input type="number" inputmode="decimal" step="1" value="${d.d || 100}" data-index="${index}" data-dim="d" class="dim-input w-full px-2 py-1 bg-slate-900 border border-slate-700 rounded text-right text-xs text-white"></div>
          <div class="col-span-2"><span class="text-[10px] text-slate-500">Cao</span><input type="number" inputmode="decimal" step="1" value="${d.h || 70}" data-index="${index}" data-dim="h" class="dim-input w-full px-2 py-1 bg-slate-900 border border-slate-700 rounded text-right text-xs text-white"></div>
        `;
      case 'spherical_cap':
        return `
          <div class="col-span-1"><span class="text-[10px] text-slate-500">ĐK D (mm)</span><input type="number" inputmode="decimal" step="1" value="${d.d || 100}" data-index="${index}" data-dim="d" class="dim-input w-full px-2 py-1 bg-slate-900 border border-slate-700 rounded text-right text-xs text-white"></div>
          <div class="col-span-2"><span class="text-[10px] text-slate-500">Cao h (mm)</span><input type="number" inputmode="decimal" step="1" value="${d.h || 50}" data-index="${index}" data-dim="h" class="dim-input w-full px-2 py-1 bg-slate-900 border border-slate-700 rounded text-right text-xs text-white"></div>
        `;
      case 'muffin':
        return `
          <div><span class="text-[10px] text-slate-500">ĐK trên</span><input type="number" inputmode="decimal" step="1" value="${d.d1 || 100}" data-index="${index}" data-dim="d1" class="dim-input w-full px-2 py-1 bg-slate-900 border border-slate-700 rounded text-right text-xs text-white"></div>
          <div><span class="text-[10px] text-slate-500">ĐK đáy</span><input type="number" inputmode="decimal" step="1" value="${d.d2 || 70}" data-index="${index}" data-dim="d2" class="dim-input w-full px-2 py-1 bg-slate-900 border border-slate-700 rounded text-right text-xs text-white"></div>
          <div><span class="text-[10px] text-slate-500">Cao</span><input type="number" inputmode="decimal" step="1" value="${d.h || 80}" data-index="${index}" data-dim="h" class="dim-input w-full px-2 py-1 bg-slate-900 border border-slate-700 rounded text-right text-xs text-white"></div>
        `;
      case 'sphere':
        return `
          <div class="col-span-3"><span class="text-[10px] text-slate-500">Đường kính D (mm)</span><input type="number" inputmode="decimal" step="1" value="${d.d || 100}" data-index="${index}" data-dim="d" class="dim-input w-full px-2 py-1 bg-slate-900 border border-slate-700 rounded text-right text-xs text-white"></div>
        `;
      case 'donut':
        return `
          <div><span class="text-[10px] text-slate-500">ĐK ngoài</span><input type="number" inputmode="decimal" step="1" value="${d.dout || 120}" data-index="${index}" data-dim="dout" class="dim-input w-full px-2 py-1 bg-slate-900 border border-slate-700 rounded text-right text-xs text-white"></div>
          <div><span class="text-[10px] text-slate-500">ĐK lỗ</span><input type="number" inputmode="decimal" step="1" value="${d.din || 45}" data-index="${index}" data-dim="din" class="dim-input w-full px-2 py-1 bg-slate-900 border border-slate-700 rounded text-right text-xs text-white"></div>
          <div><span class="text-[10px] text-slate-500">Độ dày</span><input type="number" inputmode="decimal" step="1" value="${d.thick || 40}" data-index="${index}" data-dim="thick" class="dim-input w-full px-2 py-1 bg-slate-900 border border-slate-700 rounded text-right text-xs text-white"></div>
        `;
      case 'ellipsoid':
        return `
          <div><span class="text-[10px] text-slate-500">Trục a</span><input type="number" inputmode="decimal" step="1" value="${d.a || 130}" data-index="${index}" data-dim="a" class="dim-input w-full px-2 py-1 bg-slate-900 border border-slate-700 rounded text-right text-xs text-white"></div>
          <div><span class="text-[10px] text-slate-500">Trục b</span><input type="number" inputmode="decimal" step="1" value="${d.b || 90}" data-index="${index}" data-dim="b" class="dim-input w-full px-2 py-1 bg-slate-900 border border-slate-700 rounded text-right text-xs text-white"></div>
          <div><span class="text-[10px] text-slate-500">Trục c</span><input type="number" inputmode="decimal" step="1" value="${d.c || 60}" data-index="${index}" data-dim="c" class="dim-input w-full px-2 py-1 bg-slate-900 border border-slate-700 rounded text-right text-xs text-white"></div>
        `;
      case 'custom':
        return `
          <div class="col-span-3"><span class="text-[10px] text-slate-500">Thể tích V (cm³)</span><input type="number" inputmode="decimal" step="1" value="${d.v || 450}" data-index="${index}" data-dim="v" class="dim-input w-full px-2 py-1 bg-slate-900 border border-slate-700 rounded text-right text-xs text-white"></div>
        `;
    }
  } else {
    switch (cake.shape) {
      case 'cuboid':
        return `
          <span class="text-[10px] text-slate-500">L:</span><input type="number" inputmode="decimal" step="1" value="${d.l || 120}" data-index="${index}" data-dim="l" class="dim-input w-12 px-1 py-0.5 bg-slate-950 border border-slate-700 rounded text-right text-xs text-white">
          <span class="text-[10px] text-slate-500">W:</span><input type="number" inputmode="decimal" step="1" value="${d.w || 90}" data-index="${index}" data-dim="w" class="dim-input w-12 px-1 py-0.5 bg-slate-950 border border-slate-700 rounded text-right text-xs text-white">
          <span class="text-[10px] text-slate-500">H:</span><input type="number" inputmode="decimal" step="1" value="${d.h || 50}" data-index="${index}" data-dim="h" class="dim-input w-12 px-1 py-0.5 bg-slate-950 border border-slate-700 rounded text-right text-xs text-white">
        `;
      case 'cylinder':
        return `
          <span class="text-[10px] text-slate-500">D:</span><input type="number" inputmode="decimal" step="1" value="${d.d || 100}" data-index="${index}" data-dim="d" class="dim-input w-14 px-1 py-0.5 bg-slate-950 border border-slate-700 rounded text-right text-xs text-white">
          <span class="text-[10px] text-slate-500">H:</span><input type="number" inputmode="decimal" step="1" value="${d.h || 70}" data-index="${index}" data-dim="h" class="dim-input w-14 px-1 py-0.5 bg-slate-950 border border-slate-700 rounded text-right text-xs text-white">
        `;
      case 'spherical_cap':
        return `
          <span class="text-[10px] text-slate-500">D (mm):</span><input type="number" inputmode="decimal" step="1" value="${d.d || 100}" data-index="${index}" data-dim="d" class="dim-input w-14 px-1 py-0.5 bg-slate-950 border border-slate-700 rounded text-right text-xs text-white">
          <span class="text-[10px] text-slate-500">h (mm):</span><input type="number" inputmode="decimal" step="1" value="${d.h || 50}" data-index="${index}" data-dim="h" class="dim-input w-14 px-1 py-0.5 bg-slate-950 border border-slate-700 rounded text-right text-xs text-white">
        `;
      case 'muffin':
        return `
          <span class="text-[10px] text-slate-500">D1:</span><input type="number" inputmode="decimal" step="1" value="${d.d1 || 100}" data-index="${index}" data-dim="d1" class="dim-input w-12 px-1 py-0.5 bg-slate-950 border border-slate-700 rounded text-right text-xs text-white">
          <span class="text-[10px] text-slate-500">D2:</span><input type="number" inputmode="decimal" step="1" value="${d.d2 || 70}" data-index="${index}" data-dim="d2" class="dim-input w-12 px-1 py-0.5 bg-slate-950 border border-slate-700 rounded text-right text-xs text-white">
          <span class="text-[10px] text-slate-500">H:</span><input type="number" inputmode="decimal" step="1" value="${d.h || 80}" data-index="${index}" data-dim="h" class="dim-input w-12 px-1 py-0.5 bg-slate-950 border border-slate-700 rounded text-right text-xs text-white">
        `;
      case 'sphere':
        return `
          <span class="text-[10px] text-slate-500">D:</span><input type="number" inputmode="decimal" step="1" value="${d.d || 100}" data-index="${index}" data-dim="d" class="dim-input w-16 px-1 py-0.5 bg-slate-950 border border-slate-700 rounded text-right text-xs text-white">
        `;
      case 'donut':
        return `
          <span class="text-[10px] text-slate-500">D_out:</span><input type="number" inputmode="decimal" step="1" value="${d.dout || 120}" data-index="${index}" data-dim="dout" class="dim-input w-12 px-1 py-0.5 bg-slate-950 border border-slate-700 rounded text-right text-xs text-white">
          <span class="text-[10px] text-slate-500">D_in:</span><input type="number" inputmode="decimal" step="1" value="${d.din || 45}" data-index="${index}" data-dim="din" class="dim-input w-12 px-1 py-0.5 bg-slate-950 border border-slate-700 rounded text-right text-xs text-white">
          <span class="text-[10px] text-slate-500">T:</span><input type="number" inputmode="decimal" step="1" value="${d.thick || 40}" data-index="${index}" data-dim="thick" class="dim-input w-12 px-1 py-0.5 bg-slate-950 border border-slate-700 rounded text-right text-xs text-white">
        `;
      case 'ellipsoid':
        return `
          <span class="text-[10px] text-slate-500">a:</span><input type="number" inputmode="decimal" step="1" value="${d.a || 130}" data-index="${index}" data-dim="a" class="dim-input w-12 px-1 py-0.5 bg-slate-950 border border-slate-700 rounded text-right text-xs text-white">
          <span class="text-[10px] text-slate-500">b:</span><input type="number" inputmode="decimal" step="1" value="${d.b || 90}" data-index="${index}" data-dim="b" class="dim-input w-12 px-1 py-0.5 bg-slate-950 border border-slate-700 rounded text-right text-xs text-white">
          <span class="text-[10px] text-slate-500">c:</span><input type="number" inputmode="decimal" step="1" value="${d.c || 60}" data-index="${index}" data-dim="c" class="dim-input w-12 px-1 py-0.5 bg-slate-950 border border-slate-700 rounded text-right text-xs text-white">
        `;
      case 'custom':
        return `
          <span class="text-[10px] text-slate-500">V:</span><input type="number" inputmode="decimal" step="1" value="${d.v || 450}" data-index="${index}" data-dim="v" class="dim-input w-20 px-1 py-0.5 bg-slate-950 border border-slate-700 rounded text-right text-xs text-white">
        `;
    }
  }
  return '';
}

function renderCakeTable() {
  const tbody = document.getElementById('cake-table-body');
  const mobileContainer = document.getElementById('mobile-cake-cards-container');
  const printBody = document.getElementById('print-table-body');

  if (tbody) tbody.innerHTML = '';
  if (mobileContainer) mobileContainer.innerHTML = '';
  if (printBody) printBody.innerHTML = '';

  cakes.forEach((cake, index) => {
    // 1. DESKTOP ROW
    if (tbody) {
      const tr = document.createElement('tr');
      tr.className = 'hover:bg-slate-800/40 transition';
      const dimInputsDesktop = getDimensionInputsHTML(cake, index, false);

      tr.innerHTML = `
        <td class="py-2 px-2 text-center text-slate-400 font-bold">${index + 1}</td>
        <td class="py-2 px-2">
          <select data-index="${index}" class="cake-shape-select bg-slate-950 border border-slate-700 text-slate-200 text-xs rounded px-1.5 py-1 w-full focus:outline-none focus:border-emerald-500 font-sans">
            <option value="cuboid" ${cake.shape === 'cuboid' ? 'selected' : ''}>Hộp chữ nhật</option>
            <option value="cylinder" ${cake.shape === 'cylinder' ? 'selected' : ''}>Hình trụ</option>
            <option value="spherical_cap" ${cake.shape === 'spherical_cap' ? 'selected' : ''}>Chỏm cầu (Vòm)</option>
            <option value="muffin" ${cake.shape === 'muffin' ? 'selected' : ''}>Muffin (Nón cụt)</option>
            <option value="sphere" ${cake.shape === 'sphere' ? 'selected' : ''}>Hình cầu</option>
            <option value="donut" ${cake.shape === 'donut' ? 'selected' : ''}>Donut (Xuyến)</option>
            <option value="ellipsoid" ${cake.shape === 'ellipsoid' ? 'selected' : ''}>Bầu dục (Elip)</option>
            <option value="custom" ${cake.shape === 'custom' ? 'selected' : ''}>Tùy chỉnh</option>
          </select>
        </td>
        <td class="py-2 px-2">
          <div class="flex items-center gap-1.5 flex-wrap">${dimInputsDesktop}</div>
        </td>
        <td class="py-2 px-2 text-right">
          <input type="number" inputmode="decimal" step="1" min="1" value="${cake.mass}" data-index="${index}" data-field="mass"
            class="cake-mass-input w-16 px-1.5 py-1 bg-slate-950 border border-slate-700 rounded text-right text-xs text-white focus:outline-none focus:border-emerald-500 font-mono">
        </td>
        <td data-cake-vol="${index}" class="py-2 px-2 text-right font-bold text-amber-300">
          ${(cake.calculatedVolume || 0).toFixed(1)}
        </td>
        <td data-cake-density="${index}" class="py-2 px-2 text-right text-purple-300">
          ${(cake.calculatedDensity || 0).toFixed(2)}
        </td>
      `;
      tbody.appendChild(tr);
    }

    // 2. MOBILE CARD
    if (mobileContainer) {
      const card = document.createElement('div');
      card.className = 'bg-slate-950 border border-slate-800 rounded-xl p-3 space-y-2';
      const dimInputsMobile = getDimensionInputsHTML(cake, index, true);

      card.innerHTML = `
        <div class="flex items-center justify-between pb-1.5 border-b border-slate-800/80">
          <div class="flex items-center gap-2">
            <span class="w-6 h-6 rounded-full bg-emerald-500/20 text-emerald-400 font-bold text-xs flex items-center justify-center font-mono">#${index + 1}</span>
            <span class="text-xs font-bold text-white">${cake.name}</span>
          </div>
          <select data-index="${index}" class="cake-shape-select bg-slate-900 border border-slate-700 text-slate-200 text-xs rounded-lg px-2 py-1 focus:outline-none focus:border-emerald-500">
            <option value="cuboid" ${cake.shape === 'cuboid' ? 'selected' : ''}>📦 Hộp CN</option>
            <option value="cylinder" ${cake.shape === 'cylinder' ? 'selected' : ''}>🥫 Hình trụ</option>
            <option value="spherical_cap" ${cake.shape === 'spherical_cap' ? 'selected' : ''}>🥣 Chỏm cầu</option>
            <option value="muffin" ${cake.shape === 'muffin' ? 'selected' : ''}>🧁 Muffin</option>
            <option value="sphere" ${cake.shape === 'sphere' ? 'selected' : ''}>⚪ Hình cầu</option>
            <option value="donut" ${cake.shape === 'donut' ? 'selected' : ''}>🍩 Donut</option>
            <option value="ellipsoid" ${cake.shape === 'ellipsoid' ? 'selected' : ''}>🥚 Bầu dục</option>
            <option value="custom" ${cake.shape === 'custom' ? 'selected' : ''}>🍰 Tùy chỉnh</option>
          </select>
        </div>

        <div class="space-y-1.5">
          <div class="text-[10px] text-slate-400 font-medium">Kích thước (mm):</div>
          <div class="grid grid-cols-3 gap-2">
            ${dimInputsMobile}
          </div>
        </div>

        <div class="flex items-center justify-between pt-1 text-xs">
          <div class="flex items-center gap-1.5">
            <span class="text-slate-400 text-[11px]">Khối lượng:</span>
            <input type="number" inputmode="decimal" step="1" min="1" value="${cake.mass}" data-index="${index}" data-field="mass"
              class="cake-mass-input w-16 px-1.5 py-1 bg-slate-900 border border-slate-700 rounded text-right text-xs text-white focus:outline-none focus:border-emerald-500 font-mono">
            <span class="text-slate-500 text-[10px]">g</span>
          </div>
          <div class="text-right">
            <div data-mobile-cake-vol="${index}" class="text-amber-300 font-bold font-mono text-xs">V: ${(cake.calculatedVolume || 0).toFixed(1)} cm³</div>
            <div data-mobile-cake-density="${index}" class="text-purple-300 text-[10px] font-mono">ρ: ${(cake.calculatedDensity || 0).toFixed(2)} g/cm³</div>
          </div>
        </div>
      `;
      mobileContainer.appendChild(card);
    }

    // 3. PRINT ROW
    if (printBody) {
      const printTr = document.createElement('tr');
      printTr.className = 'border-b border-gray-300';
      printTr.innerHTML = `
        <td class="p-1 border border-gray-300 text-center font-bold">${index + 1}</td>
        <td class="p-1 border border-gray-300 capitalize">${cake.shape}</td>
        <td class="p-1 border border-gray-300 font-mono">${formatDimSummary(cake)}</td>
        <td class="p-1 border border-gray-300 text-right font-mono">${cake.mass}</td>
        <td class="p-1 border border-gray-300 text-right font-mono font-bold">${(cake.calculatedVolume || 0).toFixed(1)}</td>
        <td class="p-1 border border-gray-300 text-right font-mono">${(cake.calculatedDensity || 0).toFixed(2)}</td>
      `;
      printBody.appendChild(printTr);
    }
  });

  attachTableEventListeners();
}

function attachTableEventListeners() {
  document.querySelectorAll('.cake-shape-select').forEach(select => {
    select.addEventListener('change', (e) => {
      const index = parseInt(e.target.dataset.index);
      const newShape = e.target.value;
      cakes[index].shape = newShape;
      if (newShape === 'cuboid') cakes[index].dims = { l: 120, w: 90, h: 50 };
      else if (newShape === 'cylinder') cakes[index].dims = { d: 100, h: 70 };
      else if (newShape === 'spherical_cap') cakes[index].dims = { d: 100, h: 50 };
      else if (newShape === 'muffin') cakes[index].dims = { d1: 100, d2: 70, h: 80 };
      else if (newShape === 'sphere') cakes[index].dims = { d: 100 };
      else if (newShape === 'donut') cakes[index].dims = { dout: 120, din: 45, thick: 40 };
      else if (newShape === 'ellipsoid') cakes[index].dims = { a: 130, b: 90, c: 60 };
      else if (newShape === 'custom') cakes[index].dims = { v: 450 };
      
      renderCakeTable();
      updateAll();
    });
  });

  document.querySelectorAll('.dim-input').forEach(input => {
    input.addEventListener('input', (e) => {
      const index = parseInt(e.target.dataset.index);
      const dimKey = e.target.dataset.dim;
      cakes[index].dims[dimKey] = parseFloat(e.target.value) || 0;
      updateAll();
    });
  });

  document.querySelectorAll('.cake-mass-input').forEach(input => {
    input.addEventListener('input', (e) => {
      const index = parseInt(e.target.dataset.index);
      cakes[index].mass = parseFloat(e.target.value) || 0;
      updateAll();
    });
  });
}
