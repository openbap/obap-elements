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
            }
    
            :host([hidden]) {
                display: none !important;
            }
    
            :host([disabled]) {
                pointer-events: none;
            }

            .content {
                width: 0px;
                height: 100%;
                overflow: hidden; 
                pointer-events: none;
            }
        `];
    }

    constructor() {
        super();
        this.horizontal = true;
    }
}

window.customElements.define('obap-horizontal-collapse-container', ObapHorizontalCollapseContainer);
