/*
@license
Copyright (c) 2021 Paul H Mason. All rights reserved.
*/
import { html, css, ObapElement } from '../../src/obap-element/obap-element.js';
import { title, body, code } from '../../src/obap-styles/obap-typography.js';
import '../../src/obap-attached-element/obap-attached-element.js';
import '../../src/obap-radio/obap-radio-group.js';

export class AttachedElementDemo extends ObapElement {
    static get styles() {
        return [title, body, code, css`
            :host {
                display: block;
            }

            obap-radio-group {
                margin-left: 24px;
            }

            obap-radio {
                min-width: 130px;
                width: 130px;
                max-width: 130px;
            }

            obap-button {
                margin-left: 16px;
                --obap-button-color: var(--obap-on-primary-color);
                --obap-button-background-color: var(--obap-primary-color);
            }
    
            .container {
                height: 100%;
                position: relative;
            }

            .title {
                padding: 4px 8px;
                margin-bottom: 8px;
                color: var(--obap-on-primary-color);
                background: var(--obap-primary-color);
            }

            .row {
                display: flex;
                flex-direction: row;
                flex-wrap: wrap;
                align-items: center;
                padding: 0;
            }

            .target {
                width: 80px;
                height: 80px;
                margin: 40px 40px 24px 40px;
                background: var(--obap-divider-on-surface-color);
            }

            .badge {
                width: 20px;
                height: 20px;
                background: var(--obap-accent-color);
            }

            .code {
                background: lightgrey;
                padding: 16px;
            }
        `];
    }

    static get properties() {
        return {
            offsetX: {
                type: Number,
                attribute: 'offset-x'
            },

            offsetY: {
                type: Number,
                attribute: 'offset-y'
            },

            // top-left, top-right, bottom-left, bottom-right, middle-left, middle-right, middle-top, middle-bottom, center, none (default).
            anchorIndex: {
                type: Number,
                attribute: 'anchor-index',
                reflect: true
            },

            // in, out, none (default - across the line)
            insetIndex: {
                type: Number,
                attribute: 'inset-index',
                reflect: true
            },

            // none (default), left, right, up, down: Shifts by the element width/height.
            shiftIndex: {
                type: Number,
                attribute: 'shift-index',
                reflect: true
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

    constructor() {
        super();

        this.offsetX = 0;
        this.offsetY = 0;
        this.anchorIndex = 0;
        this.insetIndex = 0;
        this.shiftIndex = 0;

        this.anchor = 'none';
        this.inset = 'none';
        this.shift = 'none';
    }

    render() {
        return html`
            <div class="container">
                <div class="title">attached-element</div>

                <div class="row">
                    <table>
                        <tr>
                            <td><div class="option-label typography-body">Anchor</div></td>
                            <td>
                                <obap-radio-group selected-index="${this.anchorIndex}" @obap-item-selected="${this.anchorSelected}">
                                    <obap-radio label="none"></obap-radio>
                                    <obap-radio label="top-left"></obap-radio>
                                    <obap-radio label="top-right"></obap-radio>
                                    <obap-radio label="bottom-left"></obap-radio>
                                    <obap-radio label="bottom-right"></obap-radio>
                                    <obap-radio label="middle-left"></obap-radio>
                                    <obap-radio label="middle-right"></obap-radio>
                                    <obap-radio label="middle-top"></obap-radio>
                                    <obap-radio label="middle-bottom"></obap-radio>
                                    <obap-radio label="center"></obap-radio>
                                </obap-radio-group> 
                            </td>
                        </tr>

                        <tr>
                            <td><div class="option-label typography-body">Inset</div></td>
                            <td>
                                <obap-radio-group selected-index="${this.insetIndex}" @obap-item-selected="${this.insetSelected}">
                                    <obap-radio label="none"></obap-radio>
                                    <obap-radio label="in"></obap-radio>
                                    <obap-radio label="out"></obap-radio>
                                </obap-radio-group>
                            </td>
                        </tr>

                        <tr>
                            <td><div class="option-label typography-body">Shift</div></td>
                            <td>
                                <obap-radio-group selected-index="${this.shiftIndex}" @obap-item-selected="${this.shiftSelected}">
                                    <obap-radio label="none"></obap-radio>
                                    <obap-radio label="left"></obap-radio>
                                    <obap-radio label="right"></obap-radio>
                                    <obap-radio label="up"></obap-radio>
                                    <obap-radio label="down"></obap-radio>
                                </obap-radio-group>
                            </td>
                        </tr>
                    </table>
                </div>

                <div class="row">
                    <div id="target" class="target"></div>
                    <obap-attached-element for="target" anchor="${this.anchor}" inset="${this.inset}" shift="${this.shift}" offset-x="${this.offsetX}" offset-y="${this.offsetY}"><div class="badge"></div></obap-attached-element>
                </div>

                <div class="row">
                    <div class="code typography-code">${this.getCode(this.anchor, this.inset, this.shift, this.offsetX, this.offsetY)}</div>
                    <obap-button raised label="reset" @click="${this.reset}"></obap-button>
                </div>
            </div>
        `;
    }

    reset(e) {
        this.anchorIndex = 0;
        this.insetIndex = 0;
        this.shiftIndex = 0;
        this.offsetX = 0;
        this.offsetY = 0;
        this.anchor = 'none';
        this.inset = 'none';
        this.shift = 'none';
    }

    getCode(anchor, inset, shift, offsetX, offsetY) {
        return `<obap-attached-element for="target" anchor="${anchor}" inset="${inset}" shift="${shift}" offset-x="${offsetX}" offset-y="${offsetY}"><!-- content --></obap-attached-element>`;
    }

    anchorSelected(e) {
        this.anchorIndex = e.detail.index;
        this.anchor = e.detail.item.label;
        e.stopPropagation();
    }

    insetSelected(e) {
        this.insetIndex = e.detail.index;
        this.inset = e.detail.item.label;
        e.stopPropagation();
    }

    shiftSelected(e) {
        this.shiftIndex = e.detail.index;
        this.shift = e.detail.item.label;
        e.stopPropagation();
    }
}

window.customElements.define('attached-element-demo', AttachedElementDemo);