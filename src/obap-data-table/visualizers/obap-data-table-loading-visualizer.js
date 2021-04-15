/*
@license
Copyright (c) 2021 Paul H Mason. All rights reserved.
*/
/*
--obap-data-table-action-color: #5c6bc0;
--obap-data-table-disabled-action-color: rgba(0, 0, 0, 0.38);
*/
import { html, css, ObapElement } from '../../obap-element/obap-element.js';
import { ObapDataTableVisualizerController } from './obap-data-table-visualizer-controller.js';

export class ObapDataTableLoadingVisualizer extends ObapDataTableVisualizerController(ObapElement) {
    static get styles() {
        return [css`
            :host {
                display: block;
                height: 100%;
            }
    
            :host([hidden]) {
                display: none !important;
            }
    
            :host([disabled]) {
                pointer-events: none;
            }

            .container {
                margin: 12px 0;
                border-radius: var(--obap-border-radius-pill, 9999px);
                height: calc(100% - 24px);
                background: var(--obap-data-table-loading-color);
                animation: fade-animation var(--obap-data-table-loading-animation-duration, 3s) infinite linear;
            }

            @keyframes fade-animation {
                from {
                    opacity: 0.1;
                }

                50% {
                    opacity: 0.8;
                }

                to {
                    opacity: 0.1;
                }
            }
        `];
    }

    render() {
        return html`<div class="container"></div>`;
    }
}

window.customElements.define('obap-data-table-loading-visualizer', ObapDataTableLoadingVisualizer);
