// Navbar scroll behavior & active year
(function() {
  const nav = document.querySelector('.custom-navbar');
  const navLinks = Array.from(document.querySelectorAll('.custom-navbar .nav-link[href^="#"]'));
  const handleScroll = () => {
    if (window.scrollY > 6) nav.classList.add('scrolled');
    else nav.classList.remove('scrolled');
  };
  handleScroll();
  window.addEventListener('scroll', handleScroll);
  document.getElementById('year').textContent = new Date().getFullYear();

  const funLine = document.getElementById('fun-line');
  const funShuffle = document.getElementById('fun-shuffle');
  const funBug = document.getElementById('fun-bug');
  const bugCountEl = document.getElementById('bug-count');
  const funCard = document.querySelector('.fun-card');
  const moodLines = [
    'Current mode: making APIs faster than your coffee gets cold.',
    'Current mode: turning vague requirements into production features.',
    'Current mode: reducing latency and pretending it was easy.',
    'Current mode: writing tests so future me can sleep at night.',
    'Current mode: debugging with confidence and one browser tab too many.',
    'Current mode: shipping features before the snack break ends.'
  ];
  const bugLines = [
    'Critical bug neutralized. Coffee rights restored.',
    'One bug down. Twelve mysterious edge cases to go.',
    'Bug fixed. Stack Overflow tabs can rest now.',
    'Regression avoided. Future me says thank you.',
    'Issue closed with confidence and suspiciously clean logs.'
  ];

  if (funLine && funShuffle) {
    funShuffle.addEventListener('click', () => {
      let next = moodLines[Math.floor(Math.random() * moodLines.length)];
      while (next === funLine.textContent) {
        next = moodLines[Math.floor(Math.random() * moodLines.length)];
      }
      funLine.textContent = next;
      funLine.classList.remove('pop');
      void funLine.offsetWidth;
      funLine.classList.add('pop');
    });
  }

  if (funLine && funBug && bugCountEl && funCard) {
    let bugCount = 0;
    funBug.addEventListener('click', () => {
      bugCount += 1;
      bugCountEl.textContent = String(bugCount);
      funLine.textContent = `${bugLines[Math.floor(Math.random() * bugLines.length)]} (#${bugCount})`;
      funLine.classList.remove('pop');
      void funLine.offsetWidth;
      funLine.classList.add('pop');
      funCard.classList.remove('party');
      void funCard.offsetWidth;
      funCard.classList.add('party');
    });
  }

  if (navLinks.length) {
    const sections = navLinks
      .map((link) => document.querySelector(link.getAttribute('href')))
      .filter(Boolean);

    const markActive = () => {
      const offset = window.scrollY + 140;
      let currentId = sections[0]?.id || '';
      sections.forEach((section) => {
        if (offset >= section.offsetTop) currentId = section.id;
      });
      navLinks.forEach((link) => {
        const isActive = link.getAttribute('href') === `#${currentId}`;
        link.classList.toggle('active', isActive);
        link.setAttribute('aria-current', isActive ? 'page' : 'false');
      });
    };

    markActive();
    window.addEventListener('scroll', markActive, { passive: true });
    window.addEventListener('resize', markActive);
  }
})();
