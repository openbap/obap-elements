/*
@license
Copyright (c) 2020 Paul H Mason. All rights reserved.
*/
import { html, css, ObapElement } from '../obap-element/obap-element.js';
import { body } from '../obap-styles/obap-typography.js';
import '../obap-pages/obap-pages.js';
import '../obap-tabs/obap-tabs.js';
import '../obap-material/obap-material.js';
import './obap-application-content.js';

export class ObapApplicationView extends ObapElement {
    static get styles() {
        return [body, css`
            :host {
                display: block;
                height: 100%;
                background: transparent;
            }

            obap-pages {
                height: 100%;
            }

            .page-container {
                flex: 1;
            }

            .container {
                display: flex;
                flex-direction: column;
                flex: 1;
                height: 100%;
            }

            .side {
                display: none;
                height: 100%;
                margin-left: 4px;
            }

            :host([has-side-views]) * > .side {
                display: block;
            }

            .content-container {
                display: flex;
                flex-direction: row;
                height: 100%;
            }

            .sub-view-navigator {
                margin-bottom: 4px;
            }

            .sub-view-item {
                height: 32px;
                line-height: 26px;
                padding: 4px 8px;
                border-radius: 3px;
                box-sizing: border-box;
                cursor: pointer;
            }
        `];
    }

    static get properties() {
        return {
            name: {
                type: String,
                attribute: 'name'
            },

            label: {
                type: String,
                attribute: 'label'
            },

            icon: {
                type: String,
                attribute: 'icon'
            },

            badgeIcon: {
                type: String,
                attribute: 'badge-icon'
            },

            badgeLabel: {
                type: String,
                attribute: 'badge-label'
            },

            modal: {
                type: Boolean,
                attribute: 'modal'
            },

            default: {
                type: Boolean,
                attribute: 'default'
            },

            subViews: {
                type: Array
            },

            selectedSubViewIndex: {
                type: Number,
            },

            // Can be 'rail', 'fab'.
            navigators: {
                type: Array,
                attribute: 'navigators',
                converter: {
                    toAttribute(value) {
                        return value.join(',');
                    },

                    fromAttribute(value) {
                        return value.split(',');
                    }
                }
            },

            associations: {
                type: Array,
                attribute: 'associations',
                converter: {
                    toAttribute(value) {
                        return value.join(',');
                    },

                    fromAttribute(value) {
                        return value.split(',');
                    }
                }
            },

            hasSideViews: {
                type: Boolean,
                attribute: 'has-side-views',
                reflect: true
            },

            hideSubViewScrollButtons: {
                type: Boolean,
                attribute: 'hide-sub-view-scroll-buttons'
            }
        }
    }

    constructor() {
        super();
        this._active = false;
        this._slotUpdated = false;
        this.name = '';
        this.label = 'untitled';
        this.icon = '';
        this.badgeIcon = '';
        this.badgeLabel = '';
        this.modal = false;
        this.default = false;
        this.selectedSubViewIndex = 0;
        this.subViews = [];
        this.navigators = [];
        this.associations = [];
        this.hasSideViews = false;
        this._boundHandleSlotChangeEvent = this._handleSlotChangeEvent.bind(this);
    }

    connectedCallback() {
        super.connectedCallback();
        this.renderRoot.addEventListener('slotchange', this._boundHandleSlotChangeEvent);
    }

    disconnectedCallback() {
        this.renderRoot.removeEventListener('slotchange', this._boundHandleSlotChangeEvent);
        super.disconnectedCallback();
    }

    notifyViewActivate() {
        this._active = true;

        this.subViews.forEach((subView) => {
            if (subView._activate) {
                subView._activate();
            }
        });
    }

    notifyViewDeactivate() {
        if (this._active) {
            this._active = false;

            this.subViews.forEach((subView) => {
                if (subView._deactivate) {
                    subView._deactivate();
                }
            });
        }
    }

    canViewActivate() {
        let result = true;

        this.subViews.forEach((subView) => {
            if (subView._canActivate) {
                if (!subView._canActivate()) {
                    result = false;
                }
            }
        });

        return result;
    }

    canViewDeactivate() {
        let result = true;

        this.subViews.forEach((subView) => {
            if (subView._canDeactivate) {
                if (!subView._canDeactivate()) {
                    result = false;
                }
            }
        });

        return result;
    }

    render() {
        return html`
            <div class="container">
                ${this._getSubViewNavigator()}
                <div class="content-container" elevation="1">
                    <obap-material class="page-container" elevation="1">
                        <obap-pages selected-index="${this.selectedSubViewIndex}">
                            <slot></slot>
                        </obap-pages>
                    </obap-material>
                    <obap-material class="side" elevation="1">
                        <slot name="side"></slot>
                    </obap-material>
                </div>
            </div>
        `;
    }

    _getSubViewNavigator() {
        if (this.subViews.length > 1) {
            return html`
                <obap-material class="sub-view-navigator" elevation="1">
                    <obap-tabs scroll ?hide-scroll-buttons="${this.hideSubViewScrollButtons}" selected-index="${this.selectedSubViewIndex}" @obap-item-selected="${this._handleSubViewSelect}">
                        ${this.subViews.map(item => html`<obap-tab sub-view-name="${item.name}">${item.label}</obap-tab>`)}
                    </obap-tabs>
                </obap-material>
            `;
        }

        return null;
    }

    _handleSubViewSelect(e) {
        this.selectedSubViewIndex = e.detail.index;
    }

    _handleSlotChangeEvent(e) {
        let slot = this.renderRoot.querySelector('slot');
        let slotSide = this.renderRoot.querySelector('slot[name="side"]');

        if (slotSide) {
            const sideCount = slotSide.assignedNodes({ flatten: true }).filter((el) => {
                const result = ((el.nodeType === 1) && (el.hasAttribute('application-content')));
                return result;
            }).length;

            this.hasSideViews = (sideCount > 0);
        }

        if (!slot) return;

        let subViews = slot.assignedNodes({ flatten: true }).filter((el) => {
            const result = ((el.nodeType === 1) && (el.hasAttribute('application-content')));
            return result;
        });

        if (this.subViews.length !== subViews.length) {
            this.subViews = subViews;
        };

        if ((this.selectedSubViewIndex === null) && (this.subViews) && (this.subViews.length > 0)) {
            this.selectedSubViewIndex = 0;
        }

        if (this._active) {
            this.notifyViewActivate();
        }

        this.requestUpdate();
    }

    _fireEvent(eventName, detail) {
        let event = new CustomEvent(eventName, {
            detail: detail,
            bubbles: true,
            composed: true
        });

        this.dispatchEvent(event);
    }
}

window.customElements.define('obap-application-view', ObapApplicationView);