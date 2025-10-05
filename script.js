// Navbar scroll behavior & active year
(function() {
  const nav = document.querySelector('.custom-navbar');
  const handleScroll = () => {
    if (window.scrollY > 6) nav.classList.add('scrolled');
    else nav.classList.remove('scrolled');
  };
  handleScroll();
  window.addEventListener('scroll', handleScroll);
  document.getElementById('year').textContent = new Date().getFullYear();
})();