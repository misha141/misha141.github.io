// Navbar scroll behavior & active year
(function() {
  const nav = document.querySelector('.custom-navbar');
  const navLinks = Array.from(document.querySelectorAll('.custom-navbar .nav-link[href^="#"]'));
  const heroRoleTag = document.getElementById('hero-role-tag');
  const skillsSection = document.getElementById('skills');
  const galaxies = Array.from(document.querySelectorAll('.skills-galaxy'));
  const handleScroll = () => {
    if (window.scrollY > 6) nav.classList.add('scrolled');
    else nav.classList.remove('scrolled');
  };
  handleScroll();
  window.addEventListener('scroll', handleScroll);
  const yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

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

  if (heroRoleTag) {
    const heroRoleText = heroRoleTag.querySelector('.hero-role-text');
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    let phrases = [];

    try {
      phrases = JSON.parse(heroRoleTag.dataset.phrases || '[]');
    } catch (error) {
      phrases = [];
    }

    if (heroRoleText && phrases.length && !prefersReducedMotion) {
      let phraseIndex = 0;
      let charIndex = 0;
      let isDeleting = false;

      const tick = () => {
        const currentPhrase = phrases[phraseIndex];
        heroRoleText.textContent = currentPhrase.slice(0, charIndex);

        let delay = isDeleting ? 42 : 72;

        if (!isDeleting && charIndex < currentPhrase.length) {
          charIndex += 1;
        } else if (!isDeleting && charIndex === currentPhrase.length) {
          isDeleting = true;
          delay = 1600;
        } else if (isDeleting && charIndex > 0) {
          charIndex -= 1;
          delay = 28;
        } else {
          isDeleting = false;
          phraseIndex = (phraseIndex + 1) % phrases.length;
          delay = 260;
        }

        window.setTimeout(tick, delay);
      };

      heroRoleText.textContent = '';
      tick();
    }
  }

  if (galaxies.length) {
    const orbitRadii = [140, 200, 260, 320, 380];
    const orbitRadiiMobile = [92, 136, 180, 224, 264];

    galaxies.forEach((galaxy) => {
      const field = galaxy.querySelector('.planet-field');
      const planets = Array.from(galaxy.querySelectorAll('.skill-planet'));
      if (!field || !planets.length) return;

      planets.forEach((planet, index) => {
        const ring = orbitRadii[index % orbitRadii.length];
        const ringMobile = orbitRadiiMobile[index % orbitRadiiMobile.length];
        const angle = `${(360 / planets.length) * index}deg`;
        const counterAngle = `${(-360 / planets.length) * index}deg`;
        const duration = `${18 + (index % 5) * 3}s`;

        const orbit = document.createElement('div');
        orbit.className = 'planet-orbit';
        orbit.style.setProperty('--orbit-size', `${ring}px`);
        orbit.style.setProperty('--orbit-size-mobile', `${ringMobile}px`);
        orbit.style.setProperty('--angle', angle);
        orbit.style.setProperty('--counter-angle', counterAngle);
        orbit.style.setProperty('--duration', duration);

        const body = document.createElement('div');
        body.className = 'skill-planet-body';
        while (planet.firstChild) body.appendChild(planet.firstChild);
        planet.appendChild(body);

        field.appendChild(orbit);
        orbit.appendChild(planet);
      });
    });

    const setGalaxyState = (galaxy, isOpen) => {
      const core = galaxy.querySelector('.galaxy-core');
      const orbit = galaxy.querySelector('.galaxy-orbit');
      if (!core || !orbit) return;

      core.setAttribute('aria-expanded', String(isOpen));
      galaxy.classList.toggle('is-open', isOpen);
      orbit.hidden = !isOpen;
    };

    galaxies.forEach((galaxy) => {
      setGalaxyState(galaxy, false);
    });

    galaxies.forEach((galaxy) => {
      const core = galaxy.querySelector('.galaxy-core');
      if (!core) return;

      core.addEventListener('click', () => {
        const shouldOpen = core.getAttribute('aria-expanded') !== 'true';

        galaxies.forEach((otherGalaxy) => setGalaxyState(otherGalaxy, false));

        if (shouldOpen) {
          setGalaxyState(galaxy, true);
          if (skillsSection) skillsSection.classList.add('focus-mode');
        } else if (skillsSection) {
          skillsSection.classList.remove('focus-mode');
        }
      });
    });
  }
})();
