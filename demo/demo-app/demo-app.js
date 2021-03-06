/*
@license
Copyright (c) 2021 Paul H Mason. All rights reserved.
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
                margin: 8px 0 8px 8px;
                overflow: auto;
                background: var(--obap-surface-color);
            }

            .pages {
                flex: 1;
                margin: 8px 8px 8px 0;
                padding: 8px;
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

            obap-selector {
                margin: 8px;
            }

            obap-pages, obap-animated-pages {
                height: 100%;
            }

            obap-splitter {
                --obap-splitter-size: 8px;
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
        themeManager.create('green', '#80e27e', '#4caf50', '#087f23', '#ffc107', '#FAFAFA');
        themeManager.apply('default');
        //this.selectedPage = 44;
        //this.selectedPage = 32;
        this.selectedPage = 18;
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
                        <div class="item">obap-accordion</div>
                        <div class="item">obap-activity-indicator</div>
                        <div class="item">obap-attached-element</div>
                        <div class="item">obap-badge</div>
                        <div class="item">obap-banner</div>
                        <div class="item">obap-button</div>
                        <div class="item">obap-callout</div>
                        <div class="item">obap-card</div>
                        <div class="item">obap-chart</div>
                        <div class="item">obap-check</div>
                        <div class="item">obap-chip</div>
                        <div class="item">obap-circular-progress</div>
                        <div class="item">obap-collapse-container</div>
                        <div class="item">obap-data-pager</div>
                        <div class="item">obap-data-table</div>
                        <div class="item">obap-data-table-layout</div>
                        <div class="item">obap-demo-snippet</div>
                        <div class="item">obap-dialog</div>
                        <div class="item">obap-expandable-card</div>
                        <div class="item">obap-input-outline</div>
                        <div class="item">obap-layout</div>
                        <div class="item">obap-linear-progress</div>
                        <div class="item">obap-markdown-viewer</div>
                        <div class="item">obap-material</div>
                        <div class="item">obap-menu</div>
                        <div class="item">obap-navigation-bar</div>
                        <div class="item">obap-navigation-rail</div>
                        <div class="item">obap-pages</div>
                        <div class="item">obap-pickers</div>
                        <div class="item">obap-pill-navigator</div>
                        <div class="item">obap-radio</div>
                        <div class="item">obap-rating</div>
                        <div class="item">obap-ripple</div>
                        <div class="item">obap-scroll-container</div>
                        <div class="item">obap-select</div>
                        <div class="item">obap-selector</div>
                        <div class="item">obap-slider</div>
                        <div class="item">obap-snackbar</div>
                        <div class="item">obap-sparkline</div>
                        <div class="item">obap-spinner</div>
                        <div class="item">obap-splitter</div>
                        <div class="item">obap-splitter-container</div>
                        <div class="item">obap-status-label</div>
                        <div class="item">obap-stepper</div>
                        <div class="item">obap-switch</div>
                        <div class="item">obap-tabs</div>
                        <div class="item">obap-textfield</div>
                        <div class="item">obap-toolbar</div>
                        <div class="item">obap-tooltip</div>
                        <div class="item">obap-top-app-bar</div>
                        <div class="item">obap-treeview</div>
                        <div class="separator" no-select>Application</div>
                        <div class="item">obap-application</div>
                        <div class="item">obap-local-storage</div>
                        <div class="item">obap-translations</div>
                    </obap-selector>
                </obap-material>
                <obap-splitter show-handle></obap-splitter>
                <obap-material class="pages">
                    <obap-pages animation-style="fade" selected-index="${this.selectedPage}">
                        <!-- STYLES -->
                        <theme-demo></theme-demo>
                        <elevation-demo></elevation-demo>
                        <typography-demo></typography-demo>
                        <icons-demo></icons-demo>
                        <!-- ELEMENTS -->
                        <accordion-demo></accordion-demo>
                        <activity-indicator-demo></activity-indicator-demo>
                        <attached-element-demo></attached-element-demo>
                        <badge-demo></badge-demo>
                        <banner-demo></banner-demo>
                        <button-demo></button-demo>
                        <callout-demo></callout-demo>
                        <card-demo></card-demo>
                        <chart-demo></chart-demo>
                        <check-demo></check-demo>
                        <chip-demo></chip-demo>
                        <circular-progress-demo></circular-progress-demo>
                        <collapse-container-demo></collapse-container-demo>
                        <data-pager-demo></data-pager-demo>
                        <data-table-demo></data-table-demo>
                        <data-table-layout-demo></data-table-layout-demo>
                        <demo-snippet-demo></demo-snippet-demo>
                        <dialog-demo></dialog-demo>
                        <expandable-card-demo></expandable-card-demo>
                        <input-outline-demo></input-outline-demo>
                        <layout-demo></layout-demo>
                        <linear-progress-demo></linear-progress-demo>
                        <markdown-viewer-demo></markdown-viewer-demo>
                        <material-demo></material-demo>
                        <menu-demo></menu-demo>
                        <navigation-bar-demo></navigation-bar-demo>
                        <navigation-rail-demo></navigation-rail-demo>
                        <pages-demo></pages-demo>
                        <pickers-demo></pickers-demo>
                        <pill-navigator-demo></pill-navigator-demo>
                        <radio-demo></radio-demo>
                        <rating-demo></rating-demo>
                        <ripple-demo></ripple-demo>
                        <scroll-container-demo></scroll-container-demo>
                        <select-demo></select-demo>
                        <selector-demo></selector-demo>
                        <slider-demo></slider-demo>
                        <snackbar-demo></snackbar-demo>
                        <sparkline-demo></sparkline-demo>
                        <spinner-demo></spinner-demo>
                        <splitter-demo></splitter-demo>
                        <splitter-container-demo></splitter-container-demo>
                        <status-label-demo></status-label-demo>
                        <stepper-demo></stepper-demo>
                        <switch-demo></switch-demo>
                        <tabs-demo></tabs-demo>
                        <textfield-demo></textfield-demo>
                        <toolbar-demo></toolbar-demo>
                        <tooltip-demo></tooltip-demo>
                        <top-app-bar-demo></top-app-bar-demo>
                        <treeview-demo></treeview-demo>
                        <!-- APPLICATION -->
                        <application-demo></application-demo>
                        <local-storage-demo></local-storage-demo>
                        <translations-demo></translations-demo>
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

