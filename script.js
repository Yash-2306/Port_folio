// ── Avatar / Profile Picture ──────────────────────────────
const avatarWrap  = document.getElementById('avatarWrap');
const avatarInput = document.getElementById('avatarInput');
const avatarImg   = document.getElementById('avatarImg');

// Inline SVG placeholder — neutral silhouette, no background color flash
const PLACEHOLDER = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='72' height='72' viewBox='0 0 72 72'%3E%3Ccircle cx='36' cy='36' r='36' fill='%230f1a1d'/%3E%3Ccircle cx='36' cy='28' r='12' fill='%231e3038'/%3E%3Cellipse cx='36' cy='54' rx='17' ry='12' fill='%231e3038'/%3E%3C/svg%3E";

(function initAvatar() {
  const saved = localStorage.getItem('yy_avatar');
  avatarImg.src = saved || PLACEHOLDER;
})();

avatarWrap.addEventListener('click', () => avatarInput.click());

avatarInput.addEventListener('change', function () {
  const file = this.files[0];
  if (!file) return;
  const reader = new FileReader();
  reader.onload = (e) => {
    avatarImg.src = e.target.result;
    try { localStorage.setItem('yy_avatar', e.target.result); } catch (_) {}
  };
  reader.readAsDataURL(file);
});


// ── Certificate Uploads ───────────────────────────────────
const TOTAL = 6;

function ck(i)  { return 'yy_cert_'  + i; }
function cnk(i) { return 'yy_cname_' + i; }

function showPreview(i, dataUrl, name, isImg) {
  const wrap  = document.getElementById('prev'   + i);
  const img   = document.getElementById('pimg'   + i);
  const badge = document.getElementById('pbadge' + i);

  wrap.classList.add('show');
  if (isImg) {
    img.src            = dataUrl;
    img.style.display  = 'block';
    badge.style.display = 'none';
  } else {
    img.style.display   = 'none';
    badge.textContent   = name;
    badge.style.display = 'inline';
  }
}

function hidePreview(i) {
  const wrap  = document.getElementById('prev'   + i);
  const img   = document.getElementById('pimg'   + i);
  const badge = document.getElementById('pbadge' + i);
  wrap.classList.remove('show');
  img.src = '';
  badge.textContent = '';
}

// Restore from localStorage on load
for (let i = 0; i < TOTAL; i++) {
  const saved = localStorage.getItem(ck(i));
  const name  = localStorage.getItem(cnk(i));
  if (saved && name) showPreview(i, saved, name, saved.startsWith('data:image'));
}

// Wire file inputs
for (let i = 0; i < TOTAL; i++) {
  document.getElementById('cert' + i).addEventListener('change', (function (idx) {
    return function () {
      const file = this.files[0];
      if (!file) return;
      const isImg = file.type.startsWith('image/');
      const reader = new FileReader();
      reader.onload = (e) => {
        showPreview(idx, e.target.result, file.name, isImg);
        try {
          localStorage.setItem(ck(idx),  e.target.result);
          localStorage.setItem(cnk(idx), file.name);
        } catch (_) {}
      };
      reader.readAsDataURL(file);
    };
  })(i));
}

// Remove buttons
document.querySelectorAll('.cert-remove').forEach(btn => {
  btn.addEventListener('click', () => {
    const i = parseInt(btn.dataset.id);
    hidePreview(i);
    localStorage.removeItem(ck(i));
    localStorage.removeItem(cnk(i));
    document.getElementById('cert' + i).value = '';
  });
});


// ── Scroll fade-in ────────────────────────────────────────
const observer = new IntersectionObserver((entries) => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      e.target.classList.add('in');
      observer.unobserve(e.target);
    }
  });
}, { threshold: 0.06 });

document.querySelectorAll('.fade').forEach(el => observer.observe(el));


// ── Active nav highlight (sidebar) ───────────────────────
const sections = Array.from(document.querySelectorAll('.section[id]'));
const navLinks = document.querySelectorAll('.sidebar-nav a');

function updateNav() {
  let active = '';
  const scrollEl = document.querySelector('.main') || window;
  const scrollTop = scrollEl === window ? window.scrollY : scrollEl.scrollTop;

  sections.forEach(s => {
    if (s.offsetTop - 100 <= scrollTop) active = s.id;
  });

  navLinks.forEach(a => {
    a.classList.toggle('active', a.getAttribute('href') === '#' + active);
  });
}

// The main content is inside .main which itself scrolls in some layouts
const mainEl = document.querySelector('.main');
if (mainEl) mainEl.addEventListener('scroll', updateNav, { passive: true });
window.addEventListener('scroll', updateNav, { passive: true });
updateNav();
