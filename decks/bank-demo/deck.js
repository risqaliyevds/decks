// bank-demo — slide controller
// keyboard: ← → space PgUp PgDn Home End
// click:    left-half = back, right-half = forward
// hash:     #N deep-links to slide N

const slides  = [...document.querySelectorAll('.slide')];
const deck    = document.querySelector('.deck');
const counter = document.querySelector('.counter');
const bar     = document.querySelector('.bar');

function go(i) {
  i = Math.max(0, Math.min(slides.length - 1, i));
  deck.dataset.current = i;

  slides.forEach((s, n) => s.classList.toggle('is-active', n === i));

  if (counter) counter.textContent = `${String(i + 1).padStart(2, '0')} / ${String(slides.length).padStart(2, '0')}`;
  if (bar)     bar.value = (i + 1) / slides.length;

  document.body.dataset.slideKind = slides[i].dataset.slide || 'content';

  // sync every page-chip in the active slide
  const cur = String(i + 1).padStart(2, '0');
  const tot = String(slides.length).padStart(2, '0');
  slides[i].querySelectorAll('.page-chip').forEach(chip => {
    chip.innerHTML = `${cur}<span class="muted">/ ${tot}</span>`;
  });

  history.replaceState(null, '', `#${i + 1}`);

  // re-trigger entrance animations on the now-active slide
  const animated = slides[i].querySelectorAll('.title-content > *, [data-animate]');
  animated.forEach(el => {
    el.style.animation = 'none';
    void el.offsetWidth;
    el.style.animation = '';
  });
}

addEventListener('keydown', e => {
  const cur = +deck.dataset.current;
  if (['ArrowRight', 'PageDown', ' '].includes(e.key)) { e.preventDefault(); go(cur + 1); }
  else if (['ArrowLeft', 'PageUp'].includes(e.key))    { e.preventDefault(); go(cur - 1); }
  else if (e.key === 'Home')                            go(0);
  else if (e.key === 'End')                             go(slides.length - 1);
});

addEventListener('click', e => {
  if (e.target.closest('a, button, input, textarea, [data-no-advance]')) return;
  const cur = +deck.dataset.current;
  go(cur + (e.clientX > innerWidth / 2 ? 1 : -1));
});

const initial = parseInt(location.hash.slice(1), 10);
go(Number.isFinite(initial) ? initial - 1 : 0);
