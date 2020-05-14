/*
@license
Copyright (c) 2020 Paul H Mason. All rights reserved.
*/
import { html, css, ObapElement } from '../../src/obap-element/obap-element.js';
import '../../src/obap-attached-element/obap-attached-element.js';

export class AttachedElementDemo extends ObapElement {
    static get styles() {
        return [css`
            :host {
                display: block;
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

            .target {
                width: 80px;
                height: 80px;
                margin: 40px 40px 24px 40px;
                background: var(--obap-divider-on-surface-color);
            }

            .badge {
                width: 20px;
                height: 20px;
                background: var(--obap-accent-color);
            }

        `];
    }

    static get properties() {
        return {
            offsetX: {
                type: Number,
                attribute: 'offset-x'
            },

            offsetY: {
                type: Number,
                attribute: 'offset-y'
            },

            // top-left, top-right, bottom-left, bottom-right, middle-left, middle-right, middle-top, middle-bottom, center, none (default).
            anchor: {
                type: String,
                attribute: 'anchor',
                reflect: true
            },

            // in, out, none (default - across the line)
            inset: {
                type: String,
                attribute: 'inset',
                reflect: true
            },

            // none (default), left, right, up, down: Shifts by the element width/height.
            shift: {
                type: String,
                attribute: 'shift',
                reflect: true
            }
        }
    }

    constructor() {
        super();

        this.offsetX = 0;
        this.offsetY = 0;
        this.anchor = 'middle-top';
        this.inset = 'none';
        this.shift = 'none';
    }

    
    render() {
        return html`
            <div class="container">
                <div class="title">attached-element</div>
                <div>
                    <div id="target" class="target"></div>
                    <obap-attached-element for="target" anchor="${this.anchor}" inset="${this.inset}" shift="${this.shift}" offset-x="${this.offsetX}" offset-y="${this.offsetY}"><div class="badge"></div></obap-attached-element>
                </div>
            </div>
        `;
    }
}

window.customElements.define('attached-element-demo', AttachedElementDemo);