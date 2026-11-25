(() => {
  const root = document.documentElement;
  let theme = "dark";
  try { if (localStorage.getItem("util-dashboard-theme") === "light") theme = "light"; } catch {}
  function apply() {
    root.dataset.bsTheme = theme;
    root.style.colorScheme = theme;
    document.querySelector('meta[name="color-scheme"]').content = theme;
    const button = document.getElementById("theme");
    if (button) button.textContent = theme === "dark" ? "Light mode" : "Dark mode";
  }
  apply();
  document.addEventListener("DOMContentLoaded", () => {
    apply();
    document.getElementById("theme").addEventListener("click", () => {
      theme = theme === "dark" ? "light" : "dark";
      apply();
      try { localStorage.setItem("util-dashboard-theme", theme); } catch {}
    });
  });
})();
