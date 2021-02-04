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
                --obap-collapse-container-transition-duration: 300ms;
                --obap-collapse-container-max-size: 300px;
                --obap-collapse-container-min-size: 0px;
                transition: max-width var(--obap-collapse-container-transition-duration) linear;
                display: block;
                overflow: hidden; 
                max-width: var(--obap-collapse-container-min-size);
            }
    
            :host([hidden]) {
                display: none !important;
            }
    
            :host([disabled]) {
                pointer-events: none;
            }

            :host([opened]) {
                max-width: var(--obap-collapse-container-max-size);
            }
        `];
    }
}

window.customElements.define('obap-horizontal-collapse-container', ObapHorizontalCollapseContainer);
