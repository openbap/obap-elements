/*
@license
Copyright (c) 2021 Paul H Mason. All rights reserved.
*/
import { html, css, ObapElement } from '../obap-element/obap-element.js';

/**
 * A single vertical row layout.
 */
export class ObapRowLayout extends ObapElement {
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
                margin-right: 0;
                margin-left: 0;
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
        const flexDirection = (this.reverse) ? 'row-reverse' : 'row';
        const justifyContent = this.mainAxisAlignment.replace('start', 'flex-start').replace('end', 'flex-end');
        const alignItems = this.crossAxisAlignment.replace('start', 'flex-start').replace('end', 'flex-end');
        const marginLeft = this.reverse ? ((justifyContent.indexOf('space') === -1) ? this.gap : 0) : 0;
        const marginRight = this.reverse ? 0 : ((justifyContent.indexOf('space') === -1) ? this.gap : 0);
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
                    margin-left: ${marginLeft}px;
                    margin-right: ${marginRight}px;
                }
            </style>
            <div class="container"><slot></slot></div>
        `;
    }
}

window.customElements.define('obap-row-layout', ObapRowLayout);