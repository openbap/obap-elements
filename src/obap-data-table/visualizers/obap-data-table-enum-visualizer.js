/*
@license
Copyright (c) 2020 Paul H Mason. All rights reserved.
*/
import { html, css, ObapElement } from '../../obap-element/obap-element.js';
import { ObapDataTableVisualizerController } from './obap-data-table-visualizer-controller.js';
import '../../obap-icon/obap-icon.js';

export class ObapDataTableEnumVisualizer extends ObapDataTableVisualizerController(ObapElement) {
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
                justify-content: flex-start;
                height: 100%;
                text-overflow: ellipsis;
                white-space: nowrap;
            }

            .label {
                display: flex;
                align-items: center;
                justify-content: flex-start;
                width: 100%;
                padding: 0 4px;
                text-align: left;
                box-sizing: border-box; 
            }

            .container[align="center"], .label[align="center"] {
                justify-content: center;
            }

            .container[align="right"], .label[align="right"] {
                justify-content: flex-end;
            }

            obap-icon {
                margin: auto 0;
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
        const icons = Boolean(this.getParamValue('icons', false));
        const iconSize = this.getParamValue('iconSize', '14px');

        /*
        const styles = this.getParamValue('styles', null);

        let color = styles ? styles[this.value].color : null;
        let background = styles ? styles[this.value].background : null;
        let style = `color: ${color ? color : 'inherit'}; background: ${background ? background : 'inherit'};`;
        */
        const style = this.getStyles(this.value);

        return html`
            <div class="container" align="${valueAlign}">
                ${icons ? html`
                    <obap-icon icon="${this.displayValue}" style="${style} width: ${iconSize}; height: ${iconSize};"></obap-icon>
                ` : html`
                    <div class="label" align="${valueAlign}" style="${style}">${this.displayValue}</div>
                `}
            </div>
        `;
    }
}

window.customElements.define('obap-data-table-enum-visualizer', ObapDataTableEnumVisualizer);
