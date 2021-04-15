/*
@license
Copyright (c) 2021 Paul H Mason. All rights reserved.
*/
import { html, css, ObapElement } from '../../src/obap-element/obap-element.js';
import { button } from '../../src/obap-styles/obap-typography.js';
import '../../src/obap-ripple/obap-ripple.js';

export class RippleDemo extends ObapElement {
    static get styles() {
        return [button, css`
            :host {
                display: block;
            }
    
            .container {
                height: 100%;
            }

            .title {
                padding: 4px 8px;
                color: var(--obap-on-primary-color);
                background: var(--obap-primary-color);
            }

            .row {
                display: flex;
                flex-direction: row;
                flex-wrap: wrap;
                align-items: center;
                padding: 16px;
            }

            .button {
                position: relative;
                display: inline-flex;
                flex-direction: row;
                justify-content: center;
                align-content: center;
                align-items: center;
                min-width: 64px;
                height: 36px;
                line-height: 36px;
                padding: 11px 10px 9px 10px;
                margin-right: 16px;
                box-sizing: border-box;
                border-radius: var(--obap-border-radius-normal, 3px);
                cursor: pointer;
                transition: box-shadow 0.28s cubic-bezier(0.4, 0, 0.2, 1);
                box-shadow: 0 2px 2px 0 rgba(0, 0, 0, 0.14),
                0 1px 5px 0 rgba(0, 0, 0, 0.12),
                0 3px 1px -2px rgba(0, 0, 0, 0.2);
            }

            .icon {
                position: relative;
                display: inline-flex;
                flex-direction: column;
                justify-content: center;
                align-items: center;
                margin-right: 32px;
                cursor: pointer;
                width: 40px;
                height: 40px;
            }

            .fab {
                display: inline-flex;
                position: relative;
                flex-direction: column;
                justify-content: center;
                align-items: center;
                box-sizing: border-box;
                cursor: pointer;
                border-radius: var(--obap-border-radius-circle, 50%);
                width: 40px;
                height: 40px;
                margin-right: 32px;
                overflow: hidden;
                transition: box-shadow 0.28s cubic-bezier(0.4, 0, 0.2, 1);
                box-shadow: 0 2px 2px 0 rgba(0, 0, 0, 0.14),
                0 1px 5px 0 rgba(0, 0, 0, 0.12),
                0 3px 1px -2px rgba(0, 0, 0, 0.2);
            }

            *[active] {
                box-shadow: 0 6px 10px 0 rgba(0, 0, 0, 0.14),
                0 1px 18px 0 rgba(0, 0, 0, 0.12),
                0 3px 5px -1px rgba(0, 0, 0, 0.4);
            }

            .circle {
                border-radius: var(--obap-border-radius-circle, 50%);
            }

            .grey {
                color: rgb(100, 100, 100);
                background: rgb(238, 238, 238);
            }

            .red {
                color: white;
                background: #db4437;
            }

            .green {
                color: white;
                background: rgb(15, 157, 88);
            }

            .blue {
                color: white;
                background: rgb(66, 133, 244);
            }

            .white-ripple {
                --obap-ripple-color: white;
            }

            .red-ripple {
                --obap-ripple-color: #db4437;
            }

            .green-ripple {
                --obap-ripple-color: rgb(15, 157, 88);
            }

            .blue-ripple {
                --obap-ripple-color: rgb(66, 133, 244);
            }

            .icon-red {
                color: #db4437;
            }

            .icon-green {
                color: rgb(15, 157, 88);
            }

            .icon-blue {
                color: rgb(66, 133, 244);
            }
        `];
    }
    
    render() {
        return html`
            <div class="container">
                <div class="title">Buttons</div>
                <div class="row">
                    <div class="button raised typography-button" @mousedown="${this._handleMouseDownEvent}" @mouseup="${this._handleMouseUpEvent}">
                        SUBMIT
                        <obap-ripple></obap-ripple>
                    </div>

                    <div class="button raised typography-button" @mousedown="${this._handleMouseDownEvent}" @mouseup="${this._handleMouseUpEvent}">
                        <div class="center" tabindex="0">NO INK</div>
                        <obap-ripple no-ink></obap-ripple>
                    </div>

                    <div class="button raised grey typography-button" @mousedown="${this._handleMouseDownEvent}" @mouseup="${this._handleMouseUpEvent}">
                        <div class="center" tabindex="0">CANCEL</div>
                        <obap-ripple></obap-ripple>
                    </div>

                    <div class="button raised blue typography-button" @mousedown="${this._handleMouseDownEvent}" @mouseup="${this._handleMouseUpEvent}">
                        <div class="center" tabindex="0">COMPOSE</div>
                        <obap-ripple class="white-ripple"></obap-ripple>
                    </div>

                    <div class="button raised green typography-button" @mousedown="${this._handleMouseDownEvent}" @mouseup="${this._handleMouseUpEvent}">
                        <div class="center" tabindex="0">OK</div>
                        <obap-ripple class="white-ripple"></obap-ripple>
                    </div>
                </div>

                <div class="title">Icons</div>
                <div class="row">
                    <div class="icon">
                        <obap-icon icon="menu"></obap-icon>
                        <obap-ripple class="circle"></obap-ripple>
                    </div>

                    <div class="icon">
                        <obap-icon icon="bug-report"></obap-icon>
                        <obap-ripple class="circle"></obap-ripple>
                    </div>

                    <div class="icon icon-red">
                        <obap-icon icon="delete"></obap-icon>
                        <obap-ripple class="circle red-ripple"></obap-ripple>
                    </div>

                    <div class="icon icon-green">
                        <obap-icon icon="account-box"></obap-icon>
                        <obap-ripple class="circle green-ripple"></obap-ripple>
                    </div>

                    <div class="icon icon-blue">
                        <obap-icon icon="android"></obap-icon>
                        <obap-ripple class="circle blue-ripple"></obap-ripple>
                    </div>
                </div>

                <div class="title typography-title">Floating Action Buttons</div>
                <div class="row">
                    <div class="fab red" @mousedown="${this._handleMouseDownEvent}" @mouseup="${this._handleMouseUpEvent}">
                        <obap-icon icon="delete"></obap-icon>
                        <obap-ripple class="white-ripple"></obap-ripple>
                    </div>

                    <div class="fab green" @mousedown="${this._handleMouseDownEvent}" @mouseup="${this._handleMouseUpEvent}">
                        <obap-icon icon="account-box"></obap-icon>
                        <obap-ripple class="white-ripple"></obap-ripple>
                    </div>

                    <div class="fab blue" @mousedown="${this._handleMouseDownEvent}" @mouseup="${this._handleMouseUpEvent}">
                        <obap-icon icon="android"></obap-icon>
                        <obap-ripple class="white-ripple"></obap-ripple>
                    </div>
                </div>
            </div>
        `;
    }

    _handleMouseDownEvent(e) {
        e.target.parentNode.setAttribute('active', '');
        e.stopPropagation();
    }

    _handleMouseUpEvent(e) {
        e.target.parentNode.removeAttribute('active');
        e.stopPropagation();
    }
}

window.customElements.define('ripple-demo', RippleDemo);