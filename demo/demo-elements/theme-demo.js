/*
@license
Copyright (c) 2020 Paul H Mason. All rights reserved.
*/
import { html, css, ObapElement } from '../../src/obap-element/obap-element.js';
import { elevation1 } from '../../src/obap-styles/obap-elevation.js';
import { caption } from '../../src/obap-styles/obap-typography.js';

export class ThemeDemo extends ObapElement {
    static get styles() {
        return [elevation1, caption, css`
            :host {
                display: block;
                color: var(--obap-on-surface-color);
                background: var(--obap-surface-color);
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
                margin: 16px 24px 0 0;
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

            .secondary-item {
                color: var(--obap-on-secondary-color);
                background: var(--obap-secondary-color);
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
        `];
    }
    
    render() {
        return html`
            <div class="container">
                <div class="title">Theme</div>
                <div>Demo is still to be properly implemented - needs a few other UI elements to make it nice.</div>
                <div class="items">
                    <div class="item light-primary-item elevation-1 typography-caption">Light Primary Color</div>
                    <div class="item primary-item elevation-1 typography-caption">Primary Color</div>
                    <div class="item dark-primary-item elevation-1 typography-caption">Dark Primary Color</div>
                    <div class="item secondary-item elevation-1 typography-caption">Secondary Color</div>
                    <div class="item surface-item elevation-1 typography-caption">Surface Color</div>
                    <div class="item window-item elevation-1 typography-caption">Window Color</div>
                    <div class="item notification-item elevation-1 typography-caption">Notification Color</div>
                    <div class="item error-item elevation-1 typography-caption">Error Color</div>
                    <div class="item selection-item elevation-1 typography-caption">Selection Color</div>
                </div>
                
            </div>
        `;
    }
}

window.customElements.define('theme-demo', ThemeDemo);