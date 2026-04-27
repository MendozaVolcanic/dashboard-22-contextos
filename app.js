/* ============================================================
   Dashboard 22 Contextos Geológicos de Chile
   app.js — lógica principal
   ============================================================ */

'use strict';

// ── Estado global ──────────────────────────────────────────
const state = {
  datos: [],
  filtrados: [],
  sortCol: null,
  sortDir: 'asc',
  busqueda: '',
  filtroEstado: '',
  filtroFuente: '',
  map: null,
  markersLayer: null,
  chartsInit: false
};

// ── Constantes ─────────────────────────────────────────────
const COLORES_ESTADO = {
  completo:  '#5fb878',
  parcial:   '#e67e22',
  pendiente: '#c0392b'
};

const LABEL_ESTADO = {
  completo:  'Completo',
  parcial:   'Parcial',
  pendiente: 'Pendiente'
};

// ── Utilidad DOM segura ────────────────────────────────────
function el(tag, props, ...children) {
  const node = document.createElement(tag);
  if (props) {
    Object.entries(props).forEach(([k, v]) => {
      if (k === 'class') node.className = v;
      else if (k === 'style') node.style.cssText = v;
      else if (k.startsWith('data-')) node.setAttribute(k, v);
      else node[k] = v;
    });
  }
  children.forEach(ch => {
    if (ch == null) return;
    if (typeof ch === 'string' || typeof ch === 'number') {
      node.appendChild(document.createTextNode(String(ch)));
    } else {
      node.appendChild(ch);
    }
  });
  return node;
}

// ── Arranque ───────────────────────────────────────────────
document.addEventListener('DOMContentLoaded', async () => {
  await cargarDatos();
  initTabs();
  initInventario();
  renderTabla();
});

// ── Carga de datos ─────────────────────────────────────────
async function cargarDatos() {
  try {
    const res = await fetch('data/contextos.json');
    if (!res.ok) throw new Error('No se pudo cargar contextos.json');
    state.datos = await res.json();
    state.filtrados = [...state.datos];
  } catch (err) {
    console.error(err);
    state.datos = [];
    state.filtrados = [];
  }
}

// ── Tabs ───────────────────────────────────────────────────
function initTabs() {
  const btns = document.querySelectorAll('.tab-btn');
  btns.forEach(btn => {
    btn.addEventListener('click', () => {
      const tab = btn.dataset.tab;
      btns.forEach(b => b.classList.remove('active'));
      document.querySelectorAll('.tab-content').forEach(c => c.classList.remove('active'));
      btn.classList.add('active');
      document.getElementById('tab-' + tab).classList.add('active');

      if (tab === 'cobertura' && !state.chartsInit) {
        initCharts();
        state.chartsInit = true;
      }
      if (tab === 'mapa' && !state.map) {
        setTimeout(initMapa, 50);
      }
    });
  });
}

// ═══════════════════════════════════════════════════════════
// TAB 1 — INVENTARIO
// ═══════════════════════════════════════════════════════════
function initInventario() {
  const buscador     = document.getElementById('buscador');
  const selectEstado = document.getElementById('filtro-estado');
  const selectFuente = document.getElementById('filtro-fuente');

  buscador.addEventListener('input', () => {
    state.busqueda = buscador.value.toLowerCase();
    aplicarFiltros();
  });

  selectEstado.addEventListener('change', () => {
    state.filtroEstado = selectEstado.value;
    aplicarFiltros();
  });

  selectFuente.addEventListener('change', () => {
    state.filtroFuente = selectFuente.value;
    aplicarFiltros();
  });

  document.querySelectorAll('th[data-col]').forEach(th => {
    th.addEventListener('click', () => {
      const col = th.dataset.col;
      if (state.sortCol === col) {
        state.sortDir = state.sortDir === 'asc' ? 'desc' : 'asc';
      } else {
        state.sortCol = col;
        state.sortDir = 'asc';
      }
      actualizarIconosSort(col);
      aplicarFiltros();
    });
  });
}

function aplicarFiltros() {
  let resultado = [...state.datos];

  if (state.busqueda) {
    resultado = resultado.filter(c =>
      c.codigo.toLowerCase().includes(state.busqueda) ||
      c.nombre.toLowerCase().includes(state.busqueda) ||
      c.region.toLowerCase().includes(state.busqueda) ||
      c.fuente.toLowerCase().includes(state.busqueda)
    );
  }

  if (state.filtroEstado) {
    resultado = resultado.filter(c => c.estado === state.filtroEstado);
  }

  if (state.filtroFuente) {
    resultado = resultado.filter(c => c.fuente === state.filtroFuente);
  }

  if (state.sortCol) {
    resultado.sort((a, b) => {
      let va = a[state.sortCol];
      let vb = b[state.sortCol];
      if (typeof va === 'string') va = va.toLowerCase();
      if (typeof vb === 'string') vb = vb.toLowerCase();
      if (va < vb) return state.sortDir === 'asc' ? -1 : 1;
      if (va > vb) return state.sortDir === 'asc' ? 1 : -1;
      return 0;
    });
  }

  state.filtrados = resultado;
  renderTabla();
}

function actualizarIconosSort(colActiva) {
  document.querySelectorAll('th[data-col]').forEach(th => {
    th.classList.remove('sorted');
    const icon = th.querySelector('.sort-icon');
    if (icon) icon.textContent = '↕';
  });
  const thActivo = document.querySelector('th[data-col="' + colActiva + '"]');
  if (thActivo) {
    thActivo.classList.add('sorted');
    const icon = thActivo.querySelector('.sort-icon');
    if (icon) icon.textContent = state.sortDir === 'asc' ? '↑' : '↓';
  }
}

function renderTabla() {
  const tbody   = document.getElementById('tabla-body');
  const countEl = document.getElementById('tabla-count');

  while (tbody.firstChild) tbody.removeChild(tbody.firstChild);

  if (!state.filtrados.length) {
    const tr = el('tr');
    const td = el('td', { class: 'table-empty', colspan: 6 },
      'No se encontraron contextos con los filtros aplicados.');
    tr.appendChild(td);
    tbody.appendChild(tr);
    if (countEl) countEl.textContent = 'Sin resultados';
    return;
  }

  state.filtrados.forEach(c => {
    const tr = el('tr');

    // Código
    tr.appendChild(el('td', { class: 'td-code' }, c.codigo));

    // Nombre
    tr.appendChild(el('td', { class: 'td-nombre' }, c.nombre));

    // Región
    tr.appendChild(el('td', { class: 'td-region' }, c.region));

    // Geositios
    tr.appendChild(el('td', { class: 'td-geositios' }, c.geositios));

    // Estado (badge)
    const dot   = el('span', { class: 'badge-dot' });
    const badge = el('span', { class: 'badge-estado ' + c.estado }, dot, LABEL_ESTADO[c.estado] || c.estado);
    tr.appendChild(el('td', null, badge));

    // Fuente
    tr.appendChild(el('td', { class: 'td-fuente' }, c.fuente));

    tbody.appendChild(tr);
  });

  if (countEl) {
    const total    = state.datos.length;
    const mostrados = state.filtrados.length;
    countEl.textContent = mostrados === total
      ? 'Mostrando los ' + total + ' contextos'
      : 'Mostrando ' + mostrados + ' de ' + total + ' contextos';
  }
}

// ═══════════════════════════════════════════════════════════
// TAB 2 — COBERTURA
// ═══════════════════════════════════════════════════════════
function initCharts() {
  actualizarStats();
  crearGraficoBarras();
  crearGraficoDona();
}

function actualizarStats() {
  const total         = state.datos.length;
  const cubiertos     = state.datos.filter(c => c.estado !== 'pendiente').length;
  const completos     = state.datos.filter(c => c.estado === 'completo').length;
  const totalGeositios = state.datos.reduce((s, c) => s + c.geositios, 0);
  const pctCubiertos  = Math.round((cubiertos / total) * 100);

  setEl('stat-total',     total);
  setEl('stat-cubiertos', pctCubiertos + '%');
  setEl('stat-geositios', totalGeositios);
  setEl('stat-completos', completos);
}

function crearGraficoBarras() {
  const ctx   = document.getElementById('chart-barras').getContext('2d');
  const datos = [...state.datos].sort((a, b) => b.geositios - a.geositios);
  const colores = datos.map(c => COLORES_ESTADO[c.estado] || '#8b949e');

  new Chart(ctx, {
    type: 'bar',
    data: {
      labels: datos.map(c => c.codigo),
      datasets: [{
        label: 'Geositios vinculados',
        data:  datos.map(c => c.geositios),
        backgroundColor: colores.map(col => col + 'bb'),
        borderColor:     colores,
        borderWidth:     1.5,
        borderRadius:    4,
        borderSkipped:   false
      }]
    },
    options: {
      indexAxis: 'y',
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: { display: false },
        tooltip: {
          backgroundColor: '#1a2129',
          borderColor:     '#30363d',
          borderWidth:     1,
          titleColor:      '#e6edf3',
          bodyColor:       '#8b949e',
          callbacks: {
            label: ctx => ' ' + ctx.parsed.x + ' geositio' + (ctx.parsed.x !== 1 ? 's' : ''),
            title: items => {
              const d = datos[items[0].dataIndex];
              return d.codigo + ' — ' + d.nombre;
            }
          }
        }
      },
      scales: {
        x: {
          grid:  { color: '#30363d44' },
          ticks: { color: '#8b949e', font: { size: 11 } },
          title: { display: true, text: 'N° de geositios', color: '#8b949e', font: { size: 11 } }
        },
        y: {
          grid:  { display: false },
          ticks: { color: '#d9764a', font: { family: "'Courier New', monospace", size: 11, weight: '700' } }
        }
      }
    }
  });
}

function crearGraficoDona() {
  const ctx       = document.getElementById('chart-dona').getContext('2d');
  const completo  = state.datos.filter(c => c.estado === 'completo').length;
  const parcial   = state.datos.filter(c => c.estado === 'parcial').length;
  const pendiente = state.datos.filter(c => c.estado === 'pendiente').length;

  new Chart(ctx, {
    type: 'doughnut',
    data: {
      labels: ['Completo', 'Parcial', 'Pendiente'],
      datasets: [{
        data:            [completo, parcial, pendiente],
        backgroundColor: [
          COLORES_ESTADO.completo  + 'cc',
          COLORES_ESTADO.parcial   + 'cc',
          COLORES_ESTADO.pendiente + 'cc'
        ],
        borderColor: [
          COLORES_ESTADO.completo,
          COLORES_ESTADO.parcial,
          COLORES_ESTADO.pendiente
        ],
        borderWidth:  2,
        hoverOffset:  6
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      cutout: '62%',
      plugins: {
        legend: {
          position: 'bottom',
          labels: {
            color: '#8b949e',
            font: { size: 11 },
            padding: 14,
            usePointStyle: true,
            pointStyleWidth: 8
          }
        },
        tooltip: {
          backgroundColor: '#1a2129',
          borderColor:     '#30363d',
          borderWidth:     1,
          titleColor:      '#e6edf3',
          bodyColor:       '#8b949e',
          callbacks: {
            label: ctx => {
              const total = ctx.dataset.data.reduce((s, v) => s + v, 0);
              const pct   = Math.round((ctx.parsed / total) * 100);
              return ' ' + ctx.parsed + ' contextos (' + pct + '%)';
            }
          }
        }
      }
    }
  });
}

// ═══════════════════════════════════════════════════════════
// TAB 3 — MAPA
// ═══════════════════════════════════════════════════════════
function initMapa() {
  if (state.map) return;

  const mapEl = document.getElementById('map');
  if (!mapEl) return;

  const map = L.map('map', {
    center: [-35.0, -70.5],
    zoom: 4,
    zoomControl: true
  });

  state.map = map;

  L.tileLayer('https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png', {
    attribution: '© <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> © <a href="https://carto.com/attributions">CARTO</a>',
    subdomains: 'abcd',
    maxZoom: 19
  }).addTo(map);

  state.markersLayer = L.layerGroup().addTo(map);

  state.datos.forEach(c => {
    const color  = COLORES_ESTADO[c.estado] || '#8b949e';
    const marker = L.circleMarker([c.lat, c.lng], {
      radius:      8,
      fillColor:   color,
      color:       '#ffffff',
      weight:      1.5,
      opacity:     0.9,
      fillOpacity: 0.82
    });

    // Popup construido con DOM seguro y serializado a string para Leaflet
    const geositiosStr = c.geositios === 0
      ? 'Sin geositios registrados'
      : c.geositios + ' geositio' + (c.geositios !== 1 ? 's' : '') + ' vinculado' + (c.geositios !== 1 ? 's' : '');

    const wrap    = el('div', { style: 'min-width:200px;max-width:260px;' });
    const dot     = el('span', { class: 'badge-dot' });
    const badge   = el('span', { class: 'badge-estado ' + c.estado, style: 'font-size:0.68rem;padding:2px 7px;' }, dot, LABEL_ESTADO[c.estado]);
    const row     = el('div', { class: 'popup-row' }, badge, el('span', null, geositiosStr));
    const fuente  = el('div', { style: 'font-size:0.7rem;color:#8b949e;margin-top:0.4rem;font-style:italic;' }, c.fuente);

    wrap.appendChild(el('div', { class: 'popup-code'   }, c.codigo));
    wrap.appendChild(el('div', { class: 'popup-nombre' }, c.nombre));
    wrap.appendChild(el('div', { class: 'popup-region' }, c.region));
    wrap.appendChild(el('div', { class: 'popup-desc'   }, c.descripcion));
    wrap.appendChild(row);
    wrap.appendChild(fuente);

    marker.bindPopup(wrap, { maxWidth: 280 });
    marker.addTo(state.markersLayer);
  });
}

// ── Utilidades ─────────────────────────────────────────────
function setEl(id, val) {
  const node = document.getElementById(id);
  if (node) node.textContent = String(val);
}
