/*
@license
Copyright (c) 2021 Paul H Mason. All rights reserved.
*/
export const ObapAttachedElementController = (superClass) =>
    class ObapAttachedElementControllerComponent extends superClass {
        static get properties() {
            return {
                for: {
                    type: String,
                    attribute: 'for'
                },

                offsetX: {
                    type: Number,
                    attribute: 'offset-x'
                },

                offsetY: {
                    type: Number,
                    attribute: 'offset-y'
                },

                // top-left, top-right, bottom-left, bottom-right, middle-left, middle-right, middle-top, middle-bottom, center, none (default).
                anchor: {
                    type: String,
                    attribute: 'anchor',
                    reflect: true
                },

                // in, out, none (default - across the line)
                inset: {
                    type: String,
                    attribute: 'inset',
                    reflect: true
                },

                // none (default), left, right, up, down: Shifts by the element width/height.
                shift: {
                    type: String,
                    attribute: 'shift',
                    reflect: true
                }
            }
        }

        get targetElement() {
            return this._target;
        }

        constructor() {
            super();

            this.for = '';
            this.offsetX = 0;
            this.offsetY = 0;
            this.anchor = 'none';
            this.inset = 'none';
            this.shift = 'none';
            this._target = null;

            this._boundHandleResizeEvent = this._handleResizeEvent.bind(this);

            this._resizeObserver = new ResizeObserver(entries => {
                this.updatePosition();
            }); 
        }

        connectedCallback() {
            super.connectedCallback();
            window.addEventListener('resize', this._boundHandleResizeEvent);

            this._resizeObserver.observe(this);

            this._setTarget();
        }

        disconnectedCallback() {
            this._resizeObserver.unobserve(this);

            window.removeEventListener('resize', this._boundHandleResizeEvent);
            super.disconnectedCallback();
        }

        firstUpdated(changedProperties) {
            super.firstUpdated(changedProperties);
            this.updatePosition();
        }

        updated(changedProperties) {
            super.updated(changedProperties);
            this.updatePosition();
        }

        _setTarget() {
            let parentNode = this.parentNode;
            let attachNode = null;

            if ((this.for && this.for !== '')) {
                attachNode = parentNode.querySelector(`#${this.for}`);
            }

            if (attachNode === null) {
                attachNode = this.previousElementSibling;
            }

            if (attachNode === null) {
                attachNode = parentNode;
            };

            this._target = attachNode;
            this.updatePosition();
        }

        _handleResizeEvent(e) {
            this.updatePosition();
        }

        updatePosition() {
            // SNUG-FIT: Adjust the corner positions based on the border-radius over the target and child.
            if (!this._target || !this.offsetParent || this.anchor === 'none') {
                return;
            }
            
            let parentRect = this.offsetParent.getBoundingClientRect();
            let targetRect = this._target.getBoundingClientRect();
            let thisRect = this.getBoundingClientRect();

            let left = targetRect.left - parentRect.left + this.offsetX;
            let top = targetRect.top - parentRect.top + this.offsetY;

            switch (this.shift) {
                case 'left': {
                    left -= thisRect.width;
                    break;
                }

                case 'right': {
                    left += thisRect.width;
                    break;
                }

                case 'up': {
                    top -= thisRect.height;
                    break;
                }

                case 'down': {
                    top += thisRect.height;
                    break;
                }
            }

            switch (this.anchor) {
                case 'bottom-left': {
                    if (this.inset === 'in') {
                        // left same
                        top += targetRect.height - thisRect.height;

                    } else if (this.inset === 'out') {
                        left -= thisRect.width;
                        top += targetRect.height;

                    } else { // none
                        left -= (thisRect.width / 2);
                        top += targetRect.height - (thisRect.width / 2);
                    }
                    break;
                }

                case 'bottom-right': {
                    if (this.inset === 'in') {
                        left += targetRect.width - thisRect.width;
                        top += targetRect.height - thisRect.height;
                    } else if (this.inset === 'out') {
                        left += targetRect.width;
                        top += targetRect.height;
                    } else { // none
                        left += targetRect.width - (thisRect.width / 2);
                        top += targetRect.height - (thisRect.width / 2);
                    }
                    break;
                }

                case 'top-left': {
                    if (this.inset === 'in') {
                        // Do nothing.
                    } else if (this.inset === 'out') {
                        left -= thisRect.width;
                        top -= thisRect.height;

                    } else { // none
                        left -= (thisRect.width / 2);
                        top -= (thisRect.height / 2);
                    }
                    break;
                }

                case 'top-right': {
                    if (this.inset === 'in') {
                        left += targetRect.width - thisRect.width;
                        // Top stays the same.
                    } else if (this.inset === 'out') {
                        left += targetRect.width;
                        top -= thisRect.height;
                    } else { // none
                        left += targetRect.width - (thisRect.width / 2);
                        top -= (thisRect.height / 2);
                    }
                    break;
                }

                case 'middle-left': {
                    if (this.inset === 'in') {
                        // Left stays the same.
                        top += ((targetRect.height - thisRect.height) / 2);
                    } else if (this.inset === 'out') {
                        left -= thisRect.width;
                        top += ((targetRect.height - thisRect.height) / 2);
                    } else { // none
                        left -= (thisRect.width / 2);
                        top += ((targetRect.height - thisRect.height) / 2);
                    }
                    break;
                }

                case 'middle-right': {
                    if (this.inset === 'in') {
                        left += targetRect.width - thisRect.width;
                        top += ((targetRect.height - thisRect.height) / 2);
                    } else if (this.inset === 'out') {
                        left += targetRect.width;
                        top += ((targetRect.height - thisRect.height) / 2);
                    } else { // none
                        left += targetRect.width - (thisRect.width / 2);
                        top += ((targetRect.height - thisRect.height) / 2);
                    }
                    break;
                }

                case 'middle-top': {
                    if (this.inset === 'in') {
                        left += ((targetRect.width - thisRect.width) / 2);
                        // Top stays the same.
                    } else if (this.inset === 'out') {
                        left += ((targetRect.width - thisRect.width) / 2);
                        top -= thisRect.height;
                    } else { // none
                        left += ((targetRect.width - thisRect.width) / 2);
                        top -= (thisRect.height / 2);
                    }
                    break;
                }

                case 'middle-bottom': {
                    if (this.inset === 'in') {
                        left += ((targetRect.width - thisRect.width) / 2);
                        top += targetRect.height - thisRect.height;
                    } else if (this.inset === 'out') {
                        left += ((targetRect.width - thisRect.width) / 2);
                        top += targetRect.height;
                    } else { // none
                        left += ((targetRect.width - thisRect.width) / 2);
                        top += targetRect.height - (thisRect.height / 2);
                    }
                    break;
                }

                case 'center': {
                    // Doesn't use the inset.
                    left += ((targetRect.width - thisRect.width) / 2);
                    top += ((targetRect.height - thisRect.height) / 2);
                    break;
                }
            }

            this.style.left = left + 'px';
            this.style.top = top + 'px';
        }
    };