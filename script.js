(() => {
  const header = document.querySelector('[data-header]');
  const menuButton = document.querySelector('[data-menu-button]');
  const navigation = document.querySelector('[data-nav]');

  const updateHeader = () => {
    header?.classList.toggle('scrolled', window.scrollY > 18);
  };

  const closeMenu = () => {
    if (!menuButton || !navigation) return;
    menuButton.setAttribute('aria-expanded', 'false');
    navigation.classList.remove('open');
    document.body.classList.remove('menu-open');
  };

  updateHeader();
  window.addEventListener('scroll', updateHeader, { passive: true });

  menuButton?.addEventListener('click', () => {
    const willOpen = menuButton.getAttribute('aria-expanded') !== 'true';
    menuButton.setAttribute('aria-expanded', String(willOpen));
    navigation?.classList.toggle('open', willOpen);
    document.body.classList.toggle('menu-open', willOpen);
  });

  navigation?.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', closeMenu);
  });

  window.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') closeMenu();
  });

  window.addEventListener('resize', () => {
    if (window.innerWidth > 900) closeMenu();
  });

  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const revealItems = document.querySelectorAll('.reveal');

  if (reduceMotion || !('IntersectionObserver' in window)) {
    revealItems.forEach((item) => item.classList.add('revealed'));
  } else {
    const observer = new IntersectionObserver((entries, currentObserver) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add('revealed');
        currentObserver.unobserve(entry.target);
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -36px' });

    revealItems.forEach((item) => observer.observe(item));
  }

  document.querySelectorAll('[data-year]').forEach((item) => {
    item.textContent = String(new Date().getFullYear());
  });

  const diagnosisForm = document.querySelector('[data-diagnosis-form]');

  diagnosisForm?.addEventListener('submit', async (event) => {
    event.preventDefault();

    const button = diagnosisForm.querySelector('[data-submit-button]');
    const result = diagnosisForm.querySelector('[data-form-result]');
    const honeypot = diagnosisForm.querySelector('[name="hp_field"]');

    if (honeypot?.value) return;

    if (button) {
      button.disabled = true;
      button.firstChild.textContent = '送信中… ';
    }

    if (result) {
      result.hidden = true;
      result.classList.remove('error');
    }

    try {
      await fetch(diagnosisForm.action, {
        method: 'POST',
        mode: 'no-cors',
        body: new FormData(diagnosisForm)
      });

      diagnosisForm.reset();

      if (result) {
        result.querySelector('b').textContent = '無料診断を受け付けました。';
        result.querySelector('span').textContent = '内容を確認し、通常2営業日以内にご連絡します。';
        result.hidden = false;
        result.scrollIntoView({ behavior: reduceMotion ? 'auto' : 'smooth', block: 'nearest' });
      }
    } catch (error) {
      if (result) {
        result.classList.add('error');
        result.querySelector('b').textContent = '送信できませんでした。';
        result.querySelector('span').textContent = '通信状況を確認し、もう一度お試しください。';
        result.hidden = false;
      }
    } finally {
      if (button) {
        button.disabled = false;
        button.firstChild.textContent = '無料診断を申し込む ';
      }
    }
  });
})();
