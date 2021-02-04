/*
@license
Copyright (c) 2021 Paul H Mason. All rights reserved.
*/
import { html, css, ObapElement } from '../../obap-element/obap-element.js';
import { ObapDataTableVisualizerController } from './obap-data-table-visualizer-controller.js';
import '../../obap-icon/obap-icon.js';

export class ObapDataTableBooleanVisualizer extends ObapDataTableVisualizerController(ObapElement) {
    static get styles() {
        return [css`
            :host {
                display: block;
                overflow: hidden;
            }
    
            :host([hidden]) {
                display: none !important;
            }
    
            :host([disabled]) {
                pointer-events: none;
            }

            .container {
                display: flex;
                align-items: center;
                justify-content: flex-start;
                height: 100%;
                text-overflow: ellipsis;
                white-space: nowrap;
            }

            .container[align="center"] {
                justify-content: center;
            }

            .container[align="right"] {
                justify-content: flex-end;
            }
        `];
    }

    static get properties() {
        return {
            displayValue: {
                type: String
            }
        }
    }

    constructor() {
        super();
        this.displayValue = '';
    }

    updated(changedProperties) {
        super.updated(changedProperties);

        changedProperties.forEach((oldValue, propName) => {
            if ((propName === 'value') || (propName === 'params')) {
                if ((this.value !== undefined) && (this.value !== null) && (this.params) && (this.params.lookups)) {
                    const v = Number(this.value);

                    if ((v >= 0) && (v < this.params.lookups.length)) {
                        this.displayValue = this.params.lookups[v];
                    }
                }
            }
        });
    }

    render() {
        const valueAlign = this.getParamValue('valueAlign', 'left');
        const trueValue = this.getParamValue('trueValue', 'true');
        const falseValue = this.getParamValue('falseValue', 'false');
        const icons = Boolean(this.getParamValue('icons', false));
        const iconSize = this.getParamValue('iconSize', '14px');
        const val = this.value ? trueValue : falseValue;
        
        return html`
            <div class="container" align="${valueAlign}">
                ${icons ? html`
                    <obap-icon icon="${val}" style="width: ${iconSize}; height: ${iconSize};"></obap-icon>
                ` : html`
                    <div>${val}</div>
                `}
            </div>
        `;
    }
}

window.customElements.define('obap-data-table-boolean-visualizer', ObapDataTableBooleanVisualizer);
