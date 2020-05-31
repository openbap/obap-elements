/*
@license
Copyright (c) 2020 Paul H Mason. All rights reserved.
*/
import { html, css, ObapElement } from '../../src/obap-element/obap-element.js';
import { ObapThemeController, themeManager } from '../../src/obap-styles/obap-theme-controller.js';
import { body } from '../../src/obap-styles/obap-typography.js';
import '../demo-elements/imports.js';

export class DemoApp extends ObapThemeController(ObapElement) {
    static get styles() {
        return [body, css`
            :host {
                display: block;
                height: 100%;
                overflow: hidden;
                box-sizing: border-box;
                background: var(--obap-window-color);
            }
    
            .container {
                height: 100%;
                display: flex;
      
            }

            .navigator {
                min-width: 200px;
                margin: 8px;
                padding: 8px;
                border-radius: 0;
                overflow: auto;
                background: var(--obap-surface-color);
            }

            .pages {
                flex: 1;
                margin: 8px 8px 8px 0;
                padding: 8px;
                border-radius: 0;
                background: var(--obap-surface-color);
                position: relative;
                overflow: auto;
            }

            .separator {
                padding: 4px 8px;
                margin: 2px 0;
                background: var(--obap-primary-color);
                color: var(--obap-on-primary-color);
            }

            .separator:first-of-type {
                margin-top: 0;
            }

            .item {
                padding: 4px 8px;
                cursor: pointer;
            }

            div[selected] {
                background: var(--obap-selection-color);
                color: var(--obap-on-selection-color);
            }
        `];
    }

    static get properties() {
        return {
            selectedPage: {
                type: Number
            }
        }
    }

    constructor() {
        super();
        themeManager.create('green', '#4caf50', '#087f23', '#80e27e', '#ffc107', '#FAFAFA');
        themeManager.apply('default');
        //this.theme = 'default';
        this.selectedPage = 14;
    }

    render() {
        return html`
            <div class="container typography-body">
                <obap-material class="navigator">
                    <obap-selector selected-index="${this.selectedPage}" @obap-item-selected="${this._pageSelected}">
                        <div class="separator" no-select>Style</div>
                        <div class="item">Theme</div>
                        <div class="item">Elevation</div>
                        <div class="item">Typography</div>
                        <div class="item">Iconography</div>
                        <div class="separator" no-select>Elements</div>
                        <div class="item">obap-attached-element</div>
                        <div class="item">obap-badge</div>
                        <div class="item">obap-button</div>
                        <div class="item">obap-callout</div>
                        <div class="item">obap-card</div>
                        <div class="item">obap-check</div>
                        <div class="item">obap-chip</div>
                        <div class="item">obap-material</div>
                        <div class="item">obap-radio</div>
                        <div class="item">obap-ripple</div>
                        <div class="item">obap-scroll-container</div>
                        <div class="item">obap-selector</div>
                        <div class="item">obap-switch</div>
                        <div class="item">obap-tabs</div>
                        <div class="item">obap-tooltip</div>
                        <div class="separator" no-select>Application</div>
                    </obap-selector>
                </obap-material>
                <obap-material class="pages">
                    <obap-pages selected-index="${this.selectedPage}">
                        <theme-demo></theme-demo>
                        <elevation-demo></elevation-demo>
                        <typography-demo></typography-demo>
                        <icons-demo></icons-demo>
                        <attached-element-demo></attached-element-demo>
                        <badge-demo></badge-demo>
                        <button-demo></button-demo>
                        <callout-demo></callout-demo>
                        <card-demo></card-demo>
                        <check-demo></check-demo>
                        <chip-demo></chip-demo>
                        <material-demo></material-demo>
                        <radio-demo></radio-demo>
                        <ripple-demo></ripple-demo>
                        <scroll-container-demo></scroll-container-demo>
                        <selector-demo></selector-demo>
                        <switch-demo></switch-demo>
                        <tabs-demo></tabs-demo>
                        <tooltip-demo></tooltip-demo>
                    </obap-pages>
                </obap-material>
            </div>
        `;
    }    

    _pageSelected(e) {
        this.selectedPage = e.detail.index;
    }
}

window.customElements.define('demo-app', DemoApp);

