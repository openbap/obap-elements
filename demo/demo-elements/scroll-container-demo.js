/*
@license
Copyright (c) 2021 Paul H Mason. All rights reserved.
*/
import { html, css, ObapElement } from '../../src/obap-element/obap-element.js';
import '../../src/obap-scroll-container/obap-scroll-container.js';

export class ScrollContainerDemo extends ObapElement {
    static get styles() {
        return [css`
            :host {
                display: block;
            }
    
            .container {
                height: 100%;
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

            .child {
                display: flex;
                flex-direction: column;
                justify-content: center;
                align-items: center;
                width: 64px;
                height: 48px;
                min-width: 64px;
                min-height: 48px;
                margin: 4px;
                color: var(--obap-on-primary-color);
                background: var(--obap-accent-color);
            }

            obap-scroll-container {
                height: auto;
                width: 308px;
                margin-bottom: 8px;
                --obap-scroll-container-color: var(--obap-on-primary-color);
                --obap-scroll-container-background-color: var(--obap-primary-light-color);
            }

            obap-scroll-container[mini-buttons] {
                width: 296px;
            }

            obap-scroll-container[vertical] {
                width: auto;
                height: 316px;
            }
        `];
    }

    render() {
        return html`
            <div class="container">
                <div class="title">Horizontal Scroll Container - Item Scrolling</div>
                <div class="row">
                    <obap-scroll-container item-step>${this._renderContent()}</obap-scroll-container>
                </div>

                <div class="title">Horizontal Scroll Container - Smooth Scrolling</div>
                <div class="row">
                    <obap-scroll-container>${this._renderContent()}</obap-scroll-container>
                </div>

                <div class="title">Mini Buttons</div>
                <div class="row">
                    <obap-scroll-container mini-buttons>${this._renderContent()}</obap-scroll-container>
                </div>

                <div class="title">Vertical Scroll Container - Smooth Scrolling</div>
                <div class="row">
                    <obap-scroll-container vertical>${this._renderContent()}</obap-scroll-container>
                </div>
            </div>
        `;
    }

    _renderContent() {
        const items = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

        return html`
            ${items.map((item) => html`<div class="child">${item}</div>`)}
        `;
    }
}

window.customElements.define('scroll-container-demo', ScrollContainerDemo);