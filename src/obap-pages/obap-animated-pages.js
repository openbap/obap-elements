/*
@license
Copyright (c) 2021 Paul H Mason. All rights reserved.
*/
import { html, css, ObapElement } from '../obap-element/obap-element.js';
import { ObapSelectorController } from '../obap-selector/obap-selector-controller.js';

/**
A content switcher.  

## Usage

```javascript
import '@obap/obap-elements/obap-pages/obap-pages.js';

<obap-pages selected-index="0">
    <div>Page 1</div>
    <div>Page 2</div>
    <div>Page 3</div>
</obap-pages>
```

@slot - - Default slot
 */
export class ObapAnimatedPages extends ObapSelectorController(ObapElement) {
    static get styles() {
        return css`
            :host {
                position: relative;
                display: block;
                overflow: hidden;
            }

            :host([hidden]) {
                display: none !important;
            }
    
            :host([disabled]) {
                pointer-events: none;
            }

            :host > ::slotted(:not(slot)) {
                transform-style: preserve-3d;
                -webkit-backface-visibility: hidden;
                backface-visibility: hidden;
            }

            :host > ::slotted(:not(slot):not([selected])) {
                display: none;
                position: absolute;
                left: 0;
                top: 0;
                transform: translateY(-100%);
            }
        `;
    }

    static get properties() {
        return {
            animationStyle: {
                type: String,
                attribute: 'animation-style',
                reflect: true
            },

            animationDuration: {
                type: Number,
                attribute: 'animation-duration'
            }
        }
    }

    constructor() {
        super();
        this.disableManualSelection = true;
        this.animationStyle = 'left';
        this.animationDuration = 500;
    }

    updated(changedProperties) {
        super.updated(changedProperties);

        changedProperties.forEach((oldValue, propName) => {
            if (propName === 'items') {
                this.items.forEach(item => {
                    if (!item.hasAttribute('selected')) {
                        item.style.display = 'none';
                    }
                });
            }
        });
    }

    render() {
        return html`<slot></slot>`;
    }

    onSelectedIndexChanged(oldValue, newValue) {
        this._animatePageChange(oldValue, newValue, this.animationDuration); 
    }

    _animatePageChange(oldValue, newValue, duration) {
        const oldItem = this.items[oldValue];
        const newItem = this.items[newValue];

        let oldItemStartTransform = 'none';
        let oldItemEndTransform = 'none';
        let newItemStartTransform = 'none';
        let newItemEndTransform = 'none';

        let oldItemStartOpacity = '1';
        let oldItemEndOpacity = '1';
        let newItemStartOpacity = '1';
        let newItemEndOpacity = '1';

        let transformOrigin = 'top left';
        let easing = 'ease-in-out';

        let oldDelay = 0;
        let newDelay = 0;

        switch (this.animationStyle) {
            case 'right': {
                oldItemStartTransform = 'translateX(0)';
                oldItemEndTransform = 'translateX(-100%)';
                newItemStartTransform = 'translateX(100%)';
                newItemEndTransform = 'translateX(0)';
                break;
            }

            case 'top': {
                oldItemStartTransform = 'translateY(0)';
                oldItemEndTransform = 'translateY(100%)';
                newItemStartTransform = 'translateY(-100%)';
                newItemEndTransform = 'translateY(0)';
                break;
            }

            case 'bottom': {
                oldItemStartTransform = 'translateY(0)';
                oldItemEndTransform = 'translateY(-100%)';
                newItemStartTransform = 'translateY(100%)';
                newItemEndTransform = 'translateY(0)';
                break;
            }

            case 'fade': {
                oldItemEndOpacity = '0';
                newItemStartOpacity = '0';
                break;
            }

            case 'horizontal': {
                oldItemStartTransform = 'translateX(0)';
                oldItemEndTransform = (newValue > oldValue) ? 'translateX(-100%)' : 'translateX(100%)';
                newItemStartTransform = (newValue > oldValue) ? 'translateX(100%)' : 'translateX(-100%)';
                newItemEndTransform = 'translateX(0)';
                break;
            }

            case 'vertical': {
                oldItemStartTransform = 'translateY(0)';
                oldItemEndTransform = (newValue > oldValue) ? 'translateY(-100%)' : 'translateY(100%)';
                newItemStartTransform = (newValue > oldValue) ? 'translateY(100%)' : 'translateY(-100%)';
                newItemEndTransform = 'translateY(0)';
                break;
            }

            case 'flip-horizontal': {
                transformOrigin = 'center';
                easing = 'linear';
                oldItemStartTransform = 'rotateX(0)';
                oldItemEndTransform = 'rotateX(90deg)';
                newItemStartTransform = 'rotateX(90deg)';
                newItemEndTransform = 'rotateX(0)';

                if (oldItem) {
                    duration = duration / 2;
                    newDelay = duration;
                }

                break;
            }

            case 'flip-vertical': {
                transformOrigin = 'center';
                easing = 'linear';
                oldItemStartTransform = 'rotateY(0)';
                oldItemEndTransform = 'rotateY(90deg)';
                newItemStartTransform = 'rotateY(90deg)';
                newItemEndTransform = 'rotateY(0)';

                if (oldItem) {
                    duration = duration / 2;
                    newDelay = duration;
                }

                break;
            }

            default: { // left
                oldItemStartTransform = 'translateX(0)';
                oldItemEndTransform = 'translateX(100%)';
                newItemStartTransform = 'translateX(-100%)';
                newItemEndTransform = 'translateX(0)';
            }
        }

        if (oldItem) {
            var oldPlayer = oldItem.animate([{
                transformOrigin: transformOrigin,
                transform: oldItemStartTransform,
                opacity: oldItemStartOpacity
            }, {
                transformOrigin: transformOrigin,
                transform: oldItemEndTransform,
                opacity: oldItemEndOpacity
            }], {
                duration: duration,
                delay: oldDelay,
                easing: easing,
                fill: 'both'
            });

            oldPlayer.addEventListener('finish', () => {
                oldItem.style.display = 'none';
            });
        }

        if (newItem) {
            newItem.style.display = '';

            newItem.animate([{
                transformOrigin: transformOrigin,
                transform: newItemStartTransform,
                opacity: newItemStartOpacity

            }, {
                transformOrigin: transformOrigin,
                transform: newItemEndTransform,
                opacity: newItemEndOpacity
            }], {
                duration: duration,
                delay: newDelay,
                easing: easing,
                fill: 'both'
            });
        }
    }
}

window.customElements.define('obap-animated-pages', ObapAnimatedPages);