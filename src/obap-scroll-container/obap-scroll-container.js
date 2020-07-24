/*
@license
Copyright (c) 2020 Paul H Mason. All rights reserved.
*/
import { html, css, svg, ObapElement } from '../obap-element/obap-element.js';
import '../obap-button/obap-button.js';

export class ObapScrollContainer extends ObapElement {
    static get styles() {
        return [css`
            :host {
                --obap-scroll-container-color: var(--obap-text-primary-color, rgba(0, 0, 0, 0.87));
                --obap-scroll-container-background-color: transparent;
                display: inline-block;
                color: var(--obap-scroll-container-color);
                background: var(--obap-scroll-container-background-color);
            }
    
            :host([hidden]) {
                display: none !important;
            }
    
            :host([disabled]) {
                pointer-events: none;
            }

            .container {
                display: flex;
                flex-direction: row;
                width: 100%;
                height: 100%;
            }

            :host([vertical]) > .container, :host([vertical]) * > .content-container {
                flex-direction: column;
            }

            .button-container {
                display: flex;
                flex-direction: column;
                justify-content: center;
                align-items: center;
                margin: 4px;
            }

            .button-container[hidden] {
                display: none;
            }

            .content-container {
                flex: 1;
                display: flex;
                flex-direction: row;
                overflow-y: hidden;
                overflow-x: scroll;
                scrollbar-width: none;
                outline: 0;
            }

            :host([vertical]) * > .content-container {
                overflow-y: scroll;
                overflow-x: hidden;
            }

            .content-container::-webkit-scrollbar {
                width: 0;
                height: 0;
            }

            .content-container[no-scroll] {
                overflow: hidden;
            }

            obap-button {
                --obap-button-color: var(--obap-scroll-container-color);
                --obap-button-background-color: var(--obap-scroll-container-background-color);
                --obap-button-ripple-color: var(--obap-scroll-container-color);
            }

            obap-button[mini] {
                height: 32px;
                width: 32px;
                min-height: 32px;
                min-width: 32px;
                border-radius: 16px;
            }

            obap-button[not-visible] {
                opacity: 0;
            }
        `];
    }

    static get properties() {
        return {
            vertical: {
                type: Boolean,
                attribute: 'vertical',
                reflect: true
            },

            scrollSpeed: {
                type: Number,
                attribute: 'scroll-speed'
            },

            itemStep: {
                type: Boolean,
                attribute: 'item-step'
            },

            disableScrolling: {
                type: Boolean,
                attribute: 'disable-scrolling'
            },

            hideButtons: {
                type: Boolean,
                attribute: 'hide-buttons'
            },

            miniButtons: {
                type: Boolean,
                attribute: 'mini-buttons'
            },

            _leftScrollButtonVisible: {
                type: Boolean
            },

            _rightScrollButtonVisible: {
                type: Boolean
            },

            _hasOverflow: {
                type: Boolean
            }
        }
    }

    constructor() {
        super();
        this.vertical = false;
        this.scrollSpeed = 2;
        this.itemStep = false;
        this.disableScrolling = false;
        this.hideButtons = false;
        this._scrolling = false;
        this._scrollDirection = 'none';
        this._container = null;
        this._containerRect = null;
        this.miniButtons = false;
        this._boundScroll = this._scroll.bind(this);
        this._holdDelay = 1;
        this._holdJob = null;
        this._hasOverflow = false;
        this._children = [];

        this._boundHandleSlotChangeEvent = this._handleSlotChangeEvent.bind(this);
        this.renderRoot.addEventListener('slotchange', this._boundHandleSlotChangeEvent);

        this._resizeObserver = new ResizeObserver(entries => {
            this._setScrollInfo();
            this._calculateButtonVisibility();
        });
    }

    connectedCallback() {
        super.connectedCallback();
        this._resizeObserver.observe(this);
    }

    disconnectedCallback() {
        this._resizeObserver.unobserve(this);
        super.disconnectedCallback();
    }

    updated(changedProperties) {
        super.updated(changedProperties);
        this._setScrollInfo();
        this._calculateButtonVisibility();
    }

    render() {
        return html`
            <div class="container">
                <div class="button-container" ?hidden="${this.disableScrolling || this.hideButtons || !this._hasOverflow}">
                    <obap-button round ?mini="${this.miniButtons}" ?not-visible="${!this._leftScrollButtonVisible}" icon="${this._getIconName(true)}" 
                        @mousedown="${this._scrollLeft}" @mouseup="${this._endScroll}" @touchstart="${this._scrollLeft}" @touchend="${this._endScroll}">
                    </obap-button>
                </div>
                <div class="content-container" id="contentContainer" tabindex="0" @scroll="${this._onScroll}" ?no-scroll="${this.disableScrolling}"><slot></slot></div>
                <div class="button-container" ?hidden="${this.disableScrolling || this.hideButtons || !this._hasOverflow}">
                    <obap-button round ?mini="${this.miniButtons}" ?not-visible="${!this._rightScrollButtonVisible}" icon="${this._getIconName(false)}" 
                        @mousedown="${this._scrollRight}" @mouseup="${this._endScroll}" @touchstart="${this._scrollRight}" @touchend="${this._endScroll}">
                    </obap-button>
                </div>
            </div>
        `;
    }

    _getIconName(left) {
        if (this.vertical) {
            return left ? 'core:chevron-up' : 'core:chevron-down';
        }

        return left ? 'core:chevron-left' : 'core:chevron-right';
    }

    _calculateButtonVisibility() {
        if (this.disableScrolling) {
            this._leftScrollButtonVisible = false;
            this._rightScrollButtonVisible = false;

            return;
        }

        if (this.vertical) {
            this._leftScrollButtonVisible = this._container.scrollTop > 0;
            this._rightScrollButtonVisible = this._container.scrollTop < this._container.scrollHeight - this._container.clientHeight - 1;
            this._hasOverflow = this._container.scrollHeight > this._container.clientHeight;
        } else {
            this._leftScrollButtonVisible = this._container.scrollLeft > 0;
            this._rightScrollButtonVisible = this._container.scrollLeft < this._container.scrollWidth - this._container.clientWidth - 1;
            this._hasOverflow = this._container.scrollWidth > this._container.clientWidth;
        }
    }

    _setScrollInfo() {
        this._container = this.renderRoot.getElementById('contentContainer');
        this._containerRect = this._container.getBoundingClientRect();
    }

    _scrollLeft(e) {
        if (this.disableScrolling) return;

        if (this.itemStep) {
            this._scrollToNextChild('left');
        } else {
            this._startScroll('left');
            this._holdJob = setInterval(this._boundScroll, this._holdDelay);
        }
    }

    _scrollRight(e) {
        if (this.disableScrolling) return;

        if (this.itemStep) {
            this._scrollToNextChild('right');
        } else {
            this._startScroll('right');
            this._holdJob = setInterval(this._boundScroll, this._holdDelay);
        }
    }

    _startScroll(direction) {
        this._scrolling = true;
        this._scrollDirection = direction;
        this._scroll();
    }

    _endScroll(e) {
        if (this._holdJob) {
            clearInterval(this._holdJob);
            this._holdJob = null;
        }

        this._scrolling = false;
        this._scrollDirection = 'none';
    }

    _scrollToNextChild(direction) {
        const containerRect = this._container.getBoundingClientRect();

        const visibleChildren = this._children.filter((child) => {
            const childRect = child.getBoundingClientRect();

            if (this.vertical) {
                return (childRect.top <= containerRect.bottom) && (childRect.bottom >= containerRect.top);
            } else {
                return (childRect.left <= containerRect.right) && (childRect.right >= containerRect.left);
            }
        });

        if (visibleChildren.length > 0) {
            const firstVisibleChild = visibleChildren[0];
            const style = getComputedStyle(firstVisibleChild);

            if (this.vertical) {
                let childheight = firstVisibleChild.offsetHeight;
                childheight += parseInt(style.marginTop) + parseInt(style.marginBottom);

                if (direction === 'left') {
                    this._container.scrollTop -= childheight;
                } else {
                    this._container.scrollTop += childheight;
                }
            } else {
                let childWidth = firstVisibleChild.offsetWidth;
                childWidth += parseInt(style.marginLeft) + parseInt(style.marginRight);

                if (direction === 'left') {
                    this._container.scrollLeft -= childWidth;
                } else {
                    this._container.scrollLeft += childWidth;
                }
            }

            this._calculateButtonVisibility();
        }
    }

    _scroll() {
        if (!this._scrolling) return;

        let scrollAmount = (this._scrollDirection === 'left') ? -this.scrollSpeed : this.scrollSpeed;
        let newAmount = 0;
        let updated = false;

        if (this.vertical) {
            newAmount = this._container.scrollTop + scrollAmount;

            if ((newAmount >= 0) && (newAmount <= this._container.scrollHeight - this._container.clientHeight)) {
                this._container.scrollTop = newAmount;
                updated = true;
            }
        } else {
            newAmount = this._container.scrollLeft + scrollAmount;

            if ((newAmount >= 0) && (newAmount <= this._container.scrollWidth - this._container.clientWidth)) {
                this._container.scrollLeft = newAmount;
                updated = true;
            }
        }

        if (updated) {
            this._calculateButtonVisibility();
        } else {
            this._endScroll();
        }
    }

    _onScroll() {
        this._calculateButtonVisibility();
    }

    _handleSlotChangeEvent(e) {
        let slot = this.renderRoot.querySelector('slot');

        const nodes = slot.assignedNodes({ flatten: true }).filter((el) => {
            return (el.nodeType === 1);
        });

        this._children = nodes;
        this.requestUpdate();
    }
}

window.customElements.define('obap-scroll-container', ObapScrollContainer);