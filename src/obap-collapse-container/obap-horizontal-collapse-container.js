/*
@license
Copyright (c) 2021 Paul H Mason. All rights reserved.
*/
import { css, ObapBaseCollapseContainer } from './obap-base-collapse-container.js';

/**
 * A horizontal collapsible block of content.
 */
export class ObapHorizontalCollapseContainer extends ObapBaseCollapseContainer {
    static get styles() {
        return [css`
            :host {
                display: block;
                overflow: hidden; 
                width: 0;
            }
    
            :host([hidden]) {
                display: none !important;
            }
    
            :host([disabled]) {
                pointer-events: none;
            }

            :host([open]) {
                width: auto;
                overflow: visible; 
            }
        `];
    }
}

window.customElements.define('obap-horizontal-collapse-container', ObapHorizontalCollapseContainer);
