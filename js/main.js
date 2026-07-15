document.addEventListener('DOMContentLoaded', () => {
  // Mobile menu
  const toggle = document.getElementById('menuToggle');
  const nav = document.getElementById('nav');
  if (toggle && nav) {
    toggle.addEventListener('click', () => {
      nav.classList.toggle('open');
      const icon = toggle.querySelector('i');
      icon.classList.toggle('fa-bars');
      icon.classList.toggle('fa-times');
    });
    nav.querySelectorAll('.nav-link').forEach(link => {
      link.addEventListener('click', () => {
        nav.classList.remove('open');
        toggle.querySelector('i').classList.add('fa-bars');
        toggle.querySelector('i').classList.remove('fa-times');
      });
    });
  }

  // Header scroll
  const header = document.getElementById('header');
  if (header) {
    window.addEventListener('scroll', () => {
      header.classList.toggle('scrolled', window.scrollY > 40);
    });
  }

  // Dark mode
  const themeToggle = document.getElementById('themeToggle');
  const savedTheme = localStorage.getItem('theme') || 'light';
  document.documentElement.setAttribute('data-theme', savedTheme);
  updateThemeIcon(savedTheme);

  if (themeToggle) {
    themeToggle.addEventListener('click', () => {
      const current = document.documentElement.getAttribute('data-theme');
      const next = current === 'dark' ? 'light' : 'dark';
      document.documentElement.setAttribute('data-theme', next);
      localStorage.setItem('theme', next);
      updateThemeIcon(next);
    });
  }

  function updateThemeIcon(theme) {
    if (!themeToggle) return;
    const icon = themeToggle.querySelector('i');
    if (icon) {
      icon.className = theme === 'dark' ? 'fas fa-sun' : 'fas fa-moon';
    }
  }

  // Language switch
  const langBtn = document.getElementById('langSwitch');
  const savedLang = localStorage.getItem('lang') || 'en';
  document.documentElement.setAttribute('data-lang', savedLang);
  updateLangButton(savedLang);

  if (langBtn) {
    langBtn.addEventListener('click', () => {
      const current = document.documentElement.getAttribute('data-lang');
      const next = current === 'en' ? 'zh' : 'en';
      document.documentElement.setAttribute('data-lang', next);
      localStorage.setItem('lang', next);
      updateLangButton(next);
    });
  }

  function updateLangButton(lang) {
    if (!langBtn) return;
    langBtn.textContent = lang === 'en' ? '中文' : 'EN';
  }

  // Initialize Map
  initMap();
});

function initMap() {
  const mapEl = document.getElementById('ibca-map');
  if (!mapEl || typeof L === 'undefined') return;

  const map = L.map('ibca-map', {
    center: [20, 20],
    zoom: 2,
    minZoom: 2,
    maxZoom: 8,
    worldCopyJump: true
  });

  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>',
    maxZoom: 18
  }).addTo(map);

  // Custom icons
  const hqIcon = L.divIcon({
    className: 'custom-marker',
    html: '<div style="background:#0f766e;width:18px;height:18px;border-radius:50%;border:3px solid white;box-shadow:0 2px 8px rgba(0,0,0,0.3);"></div>',
    iconSize: [18, 18],
    iconAnchor: [9, 9]
  });

  const ldcIcon = L.divIcon({
    className: 'custom-marker',
    html: '<div style="background:#dc2626;width:14px;height:14px;border-radius:50%;border:2px solid white;box-shadow:0 2px 6px rgba(0,0,0,0.25);"></div>',
    iconSize: [14, 14],
    iconAnchor: [7, 7]
  });

  const sidsIcon = L.divIcon({
    className: 'custom-marker',
    html: '<div style="background:#2563eb;width:14px;height:14px;border-radius:50%;border:2px solid white;box-shadow:0 2px 6px rgba(0,0,0,0.25);"></div>',
    iconSize: [14, 14],
    iconAnchor: [7, 7]
  });

  // Locations
  const locations = [
    { lat: 46.2044, lng: 6.1432, title: 'Geneva, Switzerland', desc: 'IBCA Headquarters', type: 'hq', icon: hqIcon },
    { lat: 23.6850, lng: 90.3563, title: 'Bangladesh', desc: 'Least Developed Country (LDC) – High climate vulnerability', type: 'ldc', icon: ldcIcon },
    { lat: 3.2028, lng: 73.2207, title: 'Maldives', desc: 'Small Island Developing State (SIDS) – Sea-level rise risk', type: 'sids', icon: sidsIcon },
    { lat: -8.5211, lng: 179.1983, title: 'Tuvalu', desc: 'Small Island Developing State (SIDS) – Existential climate threat', type: 'sids', icon: sidsIcon },
    { lat: 18.9712, lng: -72.2852, title: 'Haiti', desc: 'Least Developed Country (LDC) – Extreme weather exposure', type: 'ldc', icon: ldcIcon },
    { lat: 9.1450, lng: 40.4897, title: 'Ethiopia', desc: 'Least Developed Country (LDC) – Drought & food security risks', type: 'ldc', icon: ldcIcon },
    { lat: -9.6457, lng: 160.1562, title: 'Solomon Islands', desc: 'Small Island Developing State (SIDS) – Coastal vulnerability', type: 'sids', icon: sidsIcon },
    { lat: 12.8628, lng: 30.2176, title: 'Sudan', desc: 'Least Developed Country (LDC) – Climate & conflict nexus', type: 'ldc', icon: ldcIcon },
    { lat: -13.7590, lng: -172.1046, title: 'Samoa', desc: 'Small Island Developing State (SIDS)', type: 'sids', icon: sidsIcon },
    { lat: 17.5707, lng: -3.9962, title: 'Mali', desc: 'Least Developed Country (LDC) – Sahel climate stress', type: 'ldc', icon: ldcIcon }
  ];

  locations.forEach(loc => {
    const marker = L.marker([loc.lat, loc.lng], { icon: loc.icon }).addTo(map);
    marker.bindPopup(`<strong>${loc.title}</strong><br>${loc.desc}`);
  });

  // Legend
  const legend = L.control({ position: 'bottomright' });
  legend.onAdd = function () {
    const div = L.DomUtil.create('div', 'info legend');
    div.style.cssText = 'background:white;padding:12px 16px;border-radius:10px;box-shadow:0 2px 10px rgba(0,0,0,0.15);font-size:13px;line-height:1.8;';
    div.innerHTML = `
      <div style="margin-bottom:6px;font-weight:600;">Legend</div>
      <div><span style="display:inline-block;width:12px;height:12px;background:#0f766e;border-radius:50%;margin-right:8px;"></span> Headquarters</div>
      <div><span style="display:inline-block;width:12px;height:12px;background:#dc2626;border-radius:50%;margin-right:8px;"></span> LDC (example)</div>
      <div><span style="display:inline-block;width:12px;height:12px;background:#2563eb;border-radius:50%;margin-right:8px;"></span> SIDS (example)</div>
    `;
    return div;
  };
  legend.addTo(map);
}
