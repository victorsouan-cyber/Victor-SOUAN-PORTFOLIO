document.addEventListener('DOMContentLoaded', () => {
  // 1. Menu mobile
  const toggleBtn = document.querySelector('.menu-toggle');
  const nav = document.querySelector('nav');
  if (toggleBtn && nav) {
    toggleBtn.addEventListener('click', () => {
      nav.classList.toggle('open');
    });
  }

  // 2. Animations d'apparition au scroll (Scroll Reveal)
  const reveals = document.querySelectorAll('.reveal');
  const revealOnScroll = () => {
    const triggerBottom = window.innerHeight * 0.9;
    reveals.forEach(el => {
      const boxTop = el.getBoundingClientRect().top;
      if (boxTop < triggerBottom) {
        el.classList.add('visible');
      }
    });
  };
  window.addEventListener('scroll', revealOnScroll);
  revealOnScroll();

  // 3. Bouton retour en haut
  const backToTop = document.getElementById('backToTop');
  if (backToTop) {
    window.addEventListener('scroll', () => {
      if (window.scrollY > 350) {
        backToTop.classList.add('show');
      } else {
        backToTop.classList.remove('show');
      }
    });
    backToTop.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  // 4. Copie rapide de l'adresse email avec feedback visuel
  const copyEmailBtns = document.querySelectorAll('[data-copy-email]');
  copyEmailBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const email = btn.getAttribute('data-copy-email');
      navigator.clipboard.writeText(email).then(() => {
        const originalText = btn.innerHTML;
        btn.innerHTML = '✅ Adresse copiée !';
        setTimeout(() => {
          btn.innerHTML = originalText;
        }, 2500);
      });
    });
  });

  // 5. Filtres dynamiques sur la page Projets
  const filterBtns = document.querySelectorAll('.filter-btn');
  const projectCards = document.querySelectorAll('.project-item');
  if (filterBtns.length > 0) {
    filterBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        filterBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        const category = btn.getAttribute('data-filter');
        projectCards.forEach(card => {
          if (category === 'all' || card.getAttribute('data-category').includes(category)) {
            card.style.display = 'block';
          } else {
            card.style.display = 'none';
          }
        });
      });
    });
  }

  // 6. Visionneuse plein écran (Lightbox) au clic sur les preuves
  const zoomableImages = document.querySelectorAll('.proof-img');
  if (zoomableImages.length > 0) {
    const lightbox = document.createElement('div');
    lightbox.id = 'imageLightbox';
    lightbox.innerHTML = `
      <button id="lightboxClose" aria-label="Fermer">✕</button>
      <img id="lightboxImg" src="" alt="">
      <p id="lightboxCaption"></p>
    `;
    document.body.appendChild(lightbox);

    const lightboxImg = document.getElementById('lightboxImg');
    const lightboxCaption = document.getElementById('lightboxCaption');
    const closeBtn = document.getElementById('lightboxClose');

    zoomableImages.forEach(img => {
      img.title = "Cliquer pour agrandir en plein écran";
      img.addEventListener('click', () => {
        lightboxImg.src = img.src;
        lightboxImg.alt = img.alt;
        const cardTitle = img.closest('.proof-item')?.querySelector('h4')?.textContent || img.alt;
        lightboxCaption.textContent = cardTitle;
        lightbox.classList.add('active');
      });
    });

    const closeLightbox = () => lightbox.classList.remove('active');
    closeBtn.addEventListener('click', closeLightbox);
    lightbox.addEventListener('click', (e) => {
      if (e.target === lightbox) closeLightbox();
    });
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') closeLightbox();
    });
  }
});
// === ZOOM PLEIN ÉCRAN (LIGHTBOX) SUR LES IMAGES TECHNIQUES ===
document.addEventListener("DOMContentLoaded", () => {
  const zoomableImages = document.querySelectorAll(".proof-img, .sim-card img, .pcb-figure img");
  if (!zoomableImages.length) return;

  const overlay = document.createElement("div");
  overlay.className = "lightbox-overlay";
  overlay.innerHTML = `
    <button class="lightbox-close" aria-label="Fermer">&times;</button>
    <img src="" alt="">
    <p class="lightbox-caption"></p>
  `;
  document.body.appendChild(overlay);

  const overlayImg = overlay.querySelector("img");
  const overlayCaption = overlay.querySelector(".lightbox-caption");
  const closeBtn = overlay.querySelector(".lightbox-close");

  zoomableImages.forEach((img) => {
    img.addEventListener("click", () => {
      overlayImg.src = img.src;
      overlayImg.alt = img.alt;
      overlayCaption.textContent = img.alt || "";
      overlay.classList.add("open");
    });
  });

  const closeLightbox = () => overlay.classList.remove("open");

  closeBtn.addEventListener("click", closeLightbox);
  overlay.addEventListener("click", (e) => {
    if (e.target === overlay) closeLightbox();
  });
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") closeLightbox();
  });
});
// === ACTIVATION DU MODE TRANSLUCIDE AU DÉFILEMENT ===
window.addEventListener("scroll", () => {
  const header = document.querySelector("header");
  if (!header) return;
  if (window.scrollY > 30) {
    header.classList.add("scrolled");
  } else {
    header.classList.remove("scrolled");
  }
});