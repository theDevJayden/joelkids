document.addEventListener('DOMContentLoaded', function () {
  const toggleBtn = document.getElementById('theme-toggle');
  const themeIcon = document.getElementById('theme-icon');
  const themeText = document.getElementById('theme-text');

  // Load saved theme or default to light
  const savedTheme = localStorage.getItem('theme');
  if (savedTheme === 'dark') {
    document.body.classList.add('dark-mode');
    if (themeIcon) themeIcon.textContent = '☀️';
    if (themeText) themeText.textContent = 'Terang';
  } else {
    document.body.classList.remove('dark-mode');
    if (themeIcon) themeIcon.textContent = '🌙';
    if (themeText) themeText.textContent = 'Gelap';
  }

  if (toggleBtn) {
    toggleBtn.addEventListener('click', function () {
      const isDark = document.body.classList.toggle('dark-mode');
      if (isDark) {
        localStorage.setItem('theme', 'dark');
        if (themeIcon) themeIcon.textContent = '☀️';
        if (themeText) themeText.textContent = 'Terang';
      } else {
        localStorage.setItem('theme', 'light');
        if (themeIcon) themeIcon.textContent = '🌙';
        if (themeText) themeText.textContent = 'Gelap';
      }
    });
  }
});
