/*
@license
Copyright (c) 2021 Paul H Mason. All rights reserved.
*/
import { html, css, ObapElement } from '../obap-element/obap-element.js';
import { animateCollapsibleVerticalContainer, animateCollapsibleHorizontalContainer } from '../obap-animation/obap-animation.js'; 

class ObapBaseCollapseContainer extends ObapElement {
    static get properties() {
        return {
            open: {
                type: Boolean,
                attribute: 'open',
                reflect: true
            },

            horizontal: {
                type: Boolean
            }
        }
    }

    get open() {
        return this._open;
    }

    set open(value) {
        const oldValue = this.open;

        if (oldValue !== value) {
            this._open = value;
            this.requestUpdate('open', oldValue); 
            
            const content = this.renderRoot.getElementById('content');

            if (content) {
                if (this._open) {
                    if (this.horizontal) {
                        animateCollapsibleHorizontalContainer(content, 'open');
                    } else {
                        animateCollapsibleVerticalContainer(content, 'open');
                    }
                    
                } else {
                    if (this.horizontal) {
                        animateCollapsibleHorizontalContainer(content, 'close');
                    } else {
                        animateCollapsibleVerticalContainer(content, 'close');
                    }    
                }
            }
        }
    }

    constructor() {
        super();
        this.horizontal = false;
        this.open = false;
    }

    render() {
        return html`<div id="content" class="content"><slot></slot></div>`;
    }

    toggle() {
        this.open = !this.open;
    }
}

export { html, css, ObapBaseCollapseContainer }