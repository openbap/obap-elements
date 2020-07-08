/*
@license
Copyright (c) 2020 Paul H Mason. All rights reserved.
*/
import { html, css, ObapElement } from '../../../src/obap-element/obap-element.js';
import '../../../src/obap-chip/obap-chip.js';
import '../../demo-mobile-app/demo-panel.js';

export class DemoChips extends ObapElement {
    static get styles() {
        return [css`
            :host {
                display: block;
                height: 100%;
                padding: 8px;
                box-sizing: border-box;
                overflow: hidden;
            }
    
            :host([hidden]) {
                display: none !important;
            }
    
            :host([disabled]) {
                pointer-events: none;
            }

            demo-panel {
                margin-bottom: 8px;
            }

            demo-panel:last-of-type {
                margin-bottom: 0;
            }
            
            .container {
                height: 100%;
                box-sizing: border-box;
                display: flex;
                justify-content: space-between;
                margin-top: 4px;
            }
        `];
    }

    render() {
        return html`
            <demo-panel label="Normal">
                <div class="container">
                    <obap-chip label="apple"></obap-chip>
                    <obap-chip label="orange"></obap-chip>
                    <obap-chip label="banana"></obap-chip>
                    <obap-chip label="lemon"></obap-chip>
                </div>
            </demo-panel>

            <demo-panel label="With Icons">
                <div class="container">
                    <obap-chip label="apple" icon="app:android"></obap-chip>
                    <obap-chip label="orange" icon="app:polymer"></obap-chip>
                    <obap-chip label="banana" icon="app:styles"></obap-chip>
                    <obap-chip label="lemon" icon="app:buttons"></obap-chip>
                </div>
            </demo-panel>

            <demo-panel label="Removable">
                <div class="container" @obap-chip-remove="${this._handleChipRemove}">
                    <obap-chip label="apple" removable></obap-chip>
                    <obap-chip label="orange" removable></obap-chip>
                    <obap-chip label="banana" removable></obap-chip>
                    <obap-chip label="lemon" removable></obap-chip>
                </div>
            </demo-panel>

            <demo-panel label="Toggle">
                <div class="container">
                    <obap-chip label="apple" icon="app:android" toggle></obap-chip>
                    <obap-chip label="orange" icon="app:polymer" toggle></obap-chip>
                    <obap-chip label="banana" icon="app:styles" toggle></obap-chip>
                    <obap-chip label="lemon" icon="app:buttons" toggle></obap-chip>
                </div>
            </demo-panel>

            <demo-panel label="Toggle with Check">
                <div class="container">
                    <obap-chip label="apple" icon="app:android" toggle show-check></obap-chip>
                    <obap-chip label="orange" icon="app:polymer" toggle show-check></obap-chip>
                    <obap-chip label="banana" icon="app:styles" toggle show-check></obap-chip>
                    <obap-chip label="lemon" icon="app:buttons" toggle show-check></obap-chip>
                </div>
            </demo-panel>
        `;
    }

    _handleChipRemove(e) {
        e.target.parentNode.removeChild(e.target)
    }
}

window.customElements.define('demo-chips', DemoChips);