/*
@license
Copyright (c) 2020 Paul H Mason. All rights reserved.
*/
import { html, css, ObapElement } from '../../src/obap-element/obap-element.js';
import { elevation1 } from '../../src/obap-styles/obap-elevation.js';
import { caption } from '../../src/obap-styles/obap-typography.js';
import { ObapThemeController } from '../../src/obap-styles/obap-theme-controller.js';
import '../../src/obap-radio/obap-radio-group.js';

export class ThemeDemo extends ObapThemeController(ObapElement) {
    static get styles() {
        return [elevation1, caption, css`
            :host {
                display: block;
                color: var(--obap-on-surface-color);
                background: var(--obap-surface-color);
            }

            obap-radio-group {
                margin: 16px 8px 12px 8px;
            }

            obap-radio {
                margin-right: 24px;
            }
    
            .container {
                height: 100%;
            }

            .title {
                padding: 4px 8px;
                margin-bottom: 8px;
                color: var(--obap-on-primary-color);
                background: var(--obap-primary-color);
            }

            .items {
                display: flex;
                flex-wrap: wrap;
                width: 100%;
            }

            .item {
                display: flex;
                flex-direction: column;
                justify-content: center;
                align-items: center;
                width: 120px;
                min-width: 120px;
                max-width: 120px;
                height: 40px;
                margin-right: 24px;
            }

            .light-primary-item {
                color: var(--obap-on-primary-color);
                background: var(--obap-primary-light-color);
            }

            .primary-item {
                color: var(--obap-on-primary-color);
                background: var(--obap-primary-color);
            }

            .dark-primary-item {
                color: var(--obap-on-primary-color);
                background: var(--obap-primary-dark-color);
            }

            .accent-item {
                color: var(--obap-on-accent-color);
                background: var(--obap-accent-color);
            }

            .surface-item {
                color: var(--obap-on-surface-color);
                background: var(--obap-surface-color);
            }

            .window-item {
                color: var(--obap-on-window-color);
                background: var(--obap-window-color);
            }

            .notification-item {
                color: var(--obap-on-notification-color);
                background: var(--obap-notification-color);
            }

            .error-item {
                color: var(--obap-on-error-color);
                background: var(--obap-error-color);
            }

            .selection-item {
                color: var(--obap-on-selection-color);
                background: var(--obap-selection-color);
            }

            .block-item {
                color: var(--obap-text-secondary-color);
                background: var(--obap-block-color);
            }

            .inactive-item {
                color: white;
                background: var(--obap-inactive-color);
            }
        `];
    }

    static get properties() {
        return {
            themes: {
                type: Array
            },

            selectedThemeIndex: {
                type: Number
            }
        }
    }

    constructor() {
        super();

        this.themes = this.getThemeNames();
        this.selectedThemeIndex = 0;
    }
    
    render() {
        return html`
            <div class="container">
                <div class="title">Theme</div>

                <obap-radio-group selected-index="${this.selectedThemeIndex}" @obap-item-selected="${this._themeSelected}">
                    ${this.themes.map((name) => html`<obap-radio label="${name}"></obap-radio>`)}
                </obap-radio-group>

                <div class="items">
                    <div class="item light-primary-item elevation-1 typography-caption">Light Primary</div>
                    <div class="item primary-item elevation-1 typography-caption">Primary</div>
                    <div class="item dark-primary-item elevation-1 typography-caption">Dark Primary</div>
                    <div class="item accent-item elevation-1 typography-caption">Accent</div>
                    <div class="item surface-item elevation-1 typography-caption">Surface</div>
                    <div class="item window-item elevation-1 typography-caption">Window</div>
                    <div class="item notification-item elevation-1 typography-caption">Notification</div>
                    <div class="item error-item elevation-1 typography-caption">Error</div>
                    <div class="item selection-item elevation-1 typography-caption">Selection</div>
                    <div class="item block-item elevation-1 typography-caption">Block</div>
                    <div class="item inactive-item elevation-1 typography-caption">Inactive</div>
                </div>
            </div>
        `;
    }

    _themeSelected(e) {
        this.setGlobalTheme(e.detail.item.label);
    }
}

window.customElements.define('theme-demo', ThemeDemo);