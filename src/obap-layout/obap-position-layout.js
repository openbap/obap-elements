/*
@license
Copyright (c) 2020 Paul H Mason. All rights reserved.
*/
import { html, css, ObapElement } from '../obap-element/obap-element.js';

/**
 * Positions a single child in a particular position.
 */
export class ObapPositionLayout extends ObapElement {
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
                height: 100%;
                box-sizing: border-box;
                display: flex;
                flex-direction: row;
            }
        `];
    }

    static get properties() {
        return {
            // left, right, stretch, center (default).
            horizontal: {
                type: String,
                attribute: 'horizontal',
                reflect: true
            },

            // top, bottom, stretch, center (default).
            vertical: {
                type: String,
                attribute: 'vertical',
                reflect: true
            },

            padding: {
                type: Number,
                attribute: 'padding'
            }
        }
    }

    constructor() {
        super();
        this.gap = 0;
        this.horizontal = 'center';
        this.vertical = 'center';
    }

    render() {
        let justifyContent = 'center';
        let alignItems = 'center';
        let width = '';
        let height = '';

        switch (this.horizontal) {
            case 'left': {
                justifyContent = 'flex-start';
                break;
            }

            case 'right': {
                justifyContent = 'flex-end';
                break;
            }

            case 'stretch': {
                width = '100%';
                break;
            }
        }

        switch (this.vertical) {
            case 'top': {
                alignItems = 'flex-start';
                break;
            }

            case 'bottom': {
                alignItems = 'flex-end';
                break;
            }

            case 'stretch': {
                height = '100%';
                break;
            }
        }

        const widthValue = (width !== '') ? `width: ${width} !important;` : '';
        const heightValue = (height !== '') ? `height: ${height} !important;` : '';

        return html`
            <style>
                .container {
                    padding: ${this.padding}px;
                    justify-content: ${justifyContent};
                    align-items: ${alignItems};
                }
                ::slotted(*) {
                    ${widthValue}
                    ${heightValue}
                }
            </style>
            <div class="container"><slot></slot></div>
        `;
    }
}

window.customElements.define('obap-position-layout', ObapPositionLayout);