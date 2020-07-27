/*
@license
Copyright (c) 2020 Paul H Mason. All rights reserved.
*/
import { html, css, ObapElement } from '../obap-element/obap-element.js';

/**
 * A single vertical column layout.
 */
export class ObapColumnLayout extends ObapElement {
    static get styles() {
        return [css`
            :host {
                display: block;
            }
    
            :host([hidden]) {
                display: none !important;
            }
    
            :host([disabled]) {
                pointer-events: none;
            }

            .container {
                display: flex;
                
            }

            ::slotted(*:last-child) {
                margin-top: 0;
                margin-bottom: 0;
            }
        `];
    }

    static get properties() {
        return {
            gap: {
                type: Number,
                attribute: 'gap'
            },

            padding: {
                type: Number,
                attribute: 'padding'
            },

            reverse: {
                type: Boolean,
                attribute: 'reverse'
            },

            wrap: {
                type: Boolean,
                attribute: 'wrap'
            },

            // start (default), end, center, space-between, space-around, space-evenly.
            mainAxisAlignment: {
                type: String,
                attribute: 'main-axis-alignment'
            },

            // start, end, center, stretch (default), baseline.
            crossAxisAlignment: {
                type: String,
                attribute: 'cross-axis-alignment'
            }
        }
    }

    constructor() {
        super();
        this.gap = 0;
        this.padding = 0;
        this.reverse = false;
        this.wrap = false;
        this.mainAxisAlignment = 'start';
        this.crossAxisAlignment = 'stretch';
    }
    
    render() {
        const flexDirection = (this.reverse) ? 'column-reverse' : 'column';
        const justifyContent = this.mainAxisAlignment.replace('start', 'flex-start').replace('end', 'flex-end');
        const alignItems = this.crossAxisAlignment.replace('start', 'flex-start').replace('end', 'flex-end');
        const marginTop = this.reverse ? ((justifyContent.indexOf('space') === -1) ? this.gap : 0) : 0;
        const marginBottom = this.reverse ? 0 : ((justifyContent.indexOf('space') === -1) ? this.gap : 0);
        const flexWrap = this.wrap ? 'wrap' : 'nowrap';

        return html`
            <style>
                .container {
                    flex-direction: ${flexDirection};
                    justify-content: ${justifyContent};
                    align-items: ${alignItems};
                    padding: ${this.padding}px;
                    flex-wrap: ${this.flexWrap};
                }
                ::slotted(*) {
                    margin-top: ${marginTop}px;
                    margin-bottom: ${marginBottom}px;
                }
            </style>
            <div class="container"><slot></slot></div>
        `;
    }
}

window.customElements.define('obap-column-layout', ObapColumnLayout);
