document.documentElement.classList.add('js');

const header = document.querySelector('[data-header]');
const menu = document.querySelector('[data-menu]');
const menuButton = document.querySelector('[data-menu-button]');
const toast = document.querySelector('[data-toast]');
let toastTimer;

function updateHeader() {
  header?.classList.toggle('scrolled', window.scrollY > 12);
}

function closeMenu() {
  menu?.classList.remove('open');
  header?.classList.remove('menu-open');
  menuButton?.setAttribute('aria-expanded', 'false');
}

menuButton?.addEventListener('click', () => {
  const open = !menu?.classList.contains('open');
  menu?.classList.toggle('open', open);
  header?.classList.toggle('menu-open', open);
  menuButton.setAttribute('aria-expanded', String(open));
});

menu?.querySelectorAll('a').forEach((link) => link.addEventListener('click', closeMenu));
window.addEventListener('resize', () => {
  if (window.innerWidth > 760) closeMenu();
});
window.addEventListener('scroll', updateHeader, { passive: true });
updateHeader();

async function copyText(value) {
  if (navigator.clipboard?.writeText) {
    await navigator.clipboard.writeText(value);
    return;
  }

  const field = document.createElement('textarea');
  field.value = value;
  field.setAttribute('readonly', '');
  field.style.position = 'fixed';
  field.style.opacity = '0';
  document.body.append(field);
  field.select();
  document.execCommand('copy');
  field.remove();
}

document.querySelectorAll('[data-copy]').forEach((button) => {
  button.addEventListener('click', async () => {
    const label = button.querySelector('span');
    try {
      await copyText(button.dataset.copy);
      button.classList.add('copied');
      if (label) label.textContent = 'Copied';
      if (toast) {
        toast.classList.add('visible');
        clearTimeout(toastTimer);
        toastTimer = window.setTimeout(() => toast.classList.remove('visible'), 1800);
      }
      window.setTimeout(() => {
        button.classList.remove('copied');
        if (label) label.textContent = 'Copy';
      }, 1800);
    } catch {
      if (label) label.textContent = 'Select command';
    }
  });
});

const reveals = document.querySelectorAll('.reveal');
if ('IntersectionObserver' in window) {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    },
    { rootMargin: '0px 0px -7% 0px', threshold: 0.08 }
  );
  reveals.forEach((element) => observer.observe(element));
} else {
  reveals.forEach((element) => element.classList.add('visible'));
}
