/*
@license
Copyright (c) 2021 Paul H Mason. All rights reserved.
*/
import { css, ObapBaseCollapseContainer } from './obap-base-collapse-container.js';

/**
 * A vertical collapsible block of content.
 */
export class ObapVerticalCollapseContainer extends ObapBaseCollapseContainer {
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
                height: 0px;
                pointer-events: none;
            }
        `];
    }
}

window.customElements.define('obap-vertical-collapse-container', ObapVerticalCollapseContainer);
