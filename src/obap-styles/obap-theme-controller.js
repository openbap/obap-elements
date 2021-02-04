/*
@license
Copyright (c) 2021 Paul H Mason. All rights reserved.
*/
import { theme as themeManager } from './obap-theme.js';

const ObapThemeController = (superClass) =>
    class ObapThemeControllerComponent extends superClass {
        get theme() {
            return this._theme;
        }

        set theme(value) {
            const oldval = this.theme;

            if (value !== oldval) {
                this._theme = value;

                if (this.shadowRoot) {
                    const root = this.shadowRoot.host;

                    if ((this.theme) && (this.hasTheme(this.theme))) {
                        themeManager.apply(this.theme, root)
                    } else {
                        this._theme = null;
                        themeManager.clear(root, false);
                    }
                } else {
                    this._theme = null;
                }

                this.requestUpdate('theme', oldval);
            }
        }
        
        static get properties() {
            return {
                theme: {
                    type: String,
                    attribute: 'theme'
                }
            }
        }

        constructor() {
            super();
            this._theme = null;
        }

        setGlobalTheme(name) {
            themeManager.apply(name);
        }

        getThemeNames() {
            return themeManager.getNames();
        }

        hasTheme(name) {
            return themeManager.hasTheme(name);
        }
    };

    export {ObapThemeController as ObapThemeController, themeManager}