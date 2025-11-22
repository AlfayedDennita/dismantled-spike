class Theme extends EventTarget {
  #themes;
  #validTheme;
  #osTheme;
  #validLocalStorageTheme;

  constructor() {
    super();
    this.#themes = ['light', 'dark'];
    this.refresh();
  }

  refresh() {
    this.#osTheme = window.matchMedia('(prefers-color-scheme: dark)').matches
      ? 'dark'
      : 'light';
    const localStorageTheme = localStorage.getItem('theme');

    if (this.#themes.includes(localStorageTheme)) {
      this.#validLocalStorageTheme = localStorageTheme;
    } else {
      this.#validLocalStorageTheme = null;
      localStorage.removeItem('theme');
    }

    this.#validTheme = this.#validLocalStorageTheme || this.#osTheme;
    document.documentElement.dataset.theme = this.#validTheme;

    this.dispatchEvent(new CustomEvent('refresh', {
      detail: this.theme
    }));
  }

  get theme() {
    return {
      validTheme: this.#validTheme,
      osTheme: this.#osTheme,
      localStorageTheme: this.#validLocalStorageTheme,
    }
  }

  set theme(newTheme) {
    if (this.#themes.includes(newTheme)) {
      localStorage.setItem('theme', newTheme);
    } else {
      localStorage.removeItem('theme');
    }

    this.refresh();
  }
}

document.addEventListener('DOMContentLoaded', () => {
  window.theme = new Theme();
  window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', () => {
    window.theme.refresh();
  });
});
