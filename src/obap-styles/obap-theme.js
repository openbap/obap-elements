/*
@license
Copyright (c) 2020 Paul H Mason. All rights reserved.
*/
class ObapThemeItem {
    constructor(name, primary, primaryDark, primaryLight, accent, window) {
      this.name = name;
      this.primary = primary;
      this.primaryLight = primaryLight;
      this.primaryDark = primaryDark;
      this.accent = accent;
      this.window = window;
    }
  
    apply(root) {
      root = root || document.documentElement;
  
      // Variable
      root.style.setProperty('--obap-primary-light-color', this.primaryLight);
      root.style.setProperty('--obap-primary-color', this.primary);
      root.style.setProperty('--obap-primary-dark-color', this.primaryDark);
      root.style.setProperty('--obap-accent-color', this.accent);
  
      if (this.window) {
        root.style.setProperty('--obap-window-color', this.window);
      } else {
        root.style.setProperty('--obap-window-color', '#FAFAFA');
      }
    }
  }
  
  class ObapTheme {
    constructor() {
      this.__themes = {};
  
      // Create the default theme.
      //this.create('default', '#8d6e63', '#5f4339', '#be9c91', '#FFCA28', '#FAFAFA');
      this.create('default', '#5c6bc0', '#26418f', '#8e99f3', '#ec407a', '#E0E0E0');
      //this.create('green', '#4caf50', '#087f23', '#80e27e', '#ffc107', '#FAFAFA');
  
      // Set the fixed theme items.
      let root = document.documentElement;

      root.style.setProperty('-webkit-tap-highlight-color', 'transparent');
  
      root.style.setProperty('--obap-background-color', '#FFFFFF');
      root.style.setProperty('--obap-surface-color', '#FFFFFF');
      root.style.setProperty('--obap-error-color', '#e53935');
      root.style.setProperty('--obap-notification-color', '#323232');
      root.style.setProperty('--obap-selection-color', '#E0E0E0');
      root.style.setProperty('--obap-block-color', '#ECECEC');
  
      root.style.setProperty('--obap-on-primary-color', '#FFFFFF');
      root.style.setProperty('--obap-on-primary-inactive-color', 'rgba(255, 255, 255, 0.7)');
      root.style.setProperty('--obap-on-accent-color', '#FFFFFF');
      root.style.setProperty('--obap-on-accent-inactive-color', 'rgba(255, 255, 255, 0.7)');
      root.style.setProperty('--obap-on-background-color', 'rgba(0, 0, 0, 0.87)');
      root.style.setProperty('--obap-on-surface-color', 'rgba(0, 0, 0, 0.87)');
      root.style.setProperty('--obap-on-window-color', 'rgba(0, 0, 0, 0.87)');
      root.style.setProperty('--obap-on-error-color', '#FFFFFF');
      root.style.setProperty('--obap-on-notification-color', 'rgba(255, 255, 255, 0.87)');
      root.style.setProperty('--obap-on-selection-color', 'rgba(0, 0, 0, 0.87)');
  
      root.style.setProperty('--obap-text-primary-color', 'rgba(0, 0, 0, 0.87)');
      root.style.setProperty('--obap-text-secondary-color', 'rgba(0, 0, 0, 0.54)');
      root.style.setProperty('--obap-text-hint-color', 'rgba(0, 0, 0, 0.38)');
      root.style.setProperty('--obap-text-disabled-color', 'rgba(0, 0, 0, 0.38)');
      root.style.setProperty('--obap-text-icon-color', 'rgba(0, 0, 0, 0.38)');
  
      root.style.setProperty('--obap-divider-on-primary-color', 'rgba(255, 255, 255, 0.20)');
      root.style.setProperty('--obap-divider-on-surface-color', 'rgba(0, 0, 0, 0.20)');
    }
  
    apply(name, root) {
      let theme = this.__themes[name];
  
      if (theme) {
        theme.apply(root);
        return true;
      }

      return false;
    }
  
    clear(root, all) {
      all = all || false;
      root = root || document.documentElement;
  
      // Variable
      root.style.removeProperty('--obap-primary-light-color');
      root.style.removeProperty('--obap-primary-color');
      root.style.removeProperty('--obap-primary-dark-color');
      root.style.removeProperty('--obap-accent-color');
      root.style.removeProperty('--obap-window-color');
  
      // Fixed
      if (all) {
        let documentRoot = document.documentElement;
  
        documentRoot.style.removeProperty('--obap-background-color');
        documentRoot.style.removeProperty('--obap-surface-color');
        documentRoot.style.removeProperty('--obap-error-color');
        documentRoot.style.removeProperty('--obap-notification-color');
  
        documentRoot.style.removeProperty('--obap-on-primary-color');
        documentRoot.style.removeProperty('--obap-on-primary-inactive-color');
        documentRoot.style.removeProperty('--obap-on-accent-color');
        documentRoot.style.removeProperty('--obap-on-accent-inactive-color');
        documentRoot.style.removeProperty('--obap-on-background-color');
        documentRoot.style.removeProperty('--obap-on-surface-color');
        documentRoot.style.removeProperty('--obap-on-window-color');
        documentRoot.style.removeProperty('--obap-on-error-color');
        documentRoot.style.removeProperty('--obap-on-notification-color');
  
        documentRoot.style.removeProperty('--obap-text-primary-color');
        documentRoot.style.removeProperty('--obap-text-secondary-color');
        documentRoot.style.removeProperty('--obap-text-hint-color');
        documentRoot.style.removeProperty('--obap-text-disabled-color');
        documentRoot.style.removeProperty('--obap-text-icon-color');
      }
    }
  
    create(name, primary, primaryDark, primaryLight, accent, window) {
      this.__themes[name] = new ObapThemeItem(name, primary, primaryDark, primaryLight, accent, window);
    }
  
    getNames() {
      let names = Object.getOwnPropertyNames(this.__themes);
      return names;
    }
  
    hasTheme(name) {
      return (this.getNames().indexOf(name) > -1);
    }
  }
  
  const theme = new ObapTheme();
  
  export { theme } 