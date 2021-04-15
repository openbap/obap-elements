/*
@license
Copyright (c) 2021 Paul H Mason. All rights reserved.
*/
import { html, css, ObapElement } from '../../src/obap-element/obap-element.js';
import '../../src/obap-selector/obap-selector-container.js';
import '../../src/obap-pages/obap-pages.js';
import '../../src/obap-pages/obap-animated-pages.js';
import '../../src/obap-radio/obap-radio-group.js';
import '../../src/obap-radio/obap-radio.js';

export class PagesDemo extends ObapElement {
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
              padding: 8px 16px;
              margin-bottom: 8px;
            }

            .page {
                display: flex;
                flex-direction: column;
                justify-content: center;
                align-items: center;
                background-color: lightyellow;
                color: grey;
                border: 1px dashed grey;
                width: 600px;
                height: 400px;
                font-size: 20px;
            }

            .book-page {
                display: flex;
                flex-direction: column;
                justify-content: center;
                align-items: center;
                background-color: lightyellow;
                color: grey;
                border: 1px dashed grey;
                width: 300px;
                height: 400px;
                font-size: 20px;
            }

            obap-radio-group {
                margin-bottom: 8px;
            }

            obap-radio {
                margin-right: 24px;
            }

            .animation-styles {
                margin: 0 16px;
            }
        `];
    }

    static get properties() {
        return {
            pages: {
                type: Array
            }
        }
    }

    constructor() {
        super();
        
        this.pages = [
            {
                label: 'Page 1',
                background: '#D32F2F',
                color: 'white'
            }, 
            {
                label: 'Page 2',
                background: '#9C27B0',
                color: 'white'
            }, 
            {
                label: 'Page 3',
                background: '#D81B60',
                color: 'white'
            }, 
            {
                label: 'Page 4',
                background: '#00796B',
                color: 'white'
            }, 
            {
                label: 'Page 5',
                background: '#2E7D32',
                color: 'white'
            }, 
            {
                label: 'Page 6',
                background: '#546E7A',
                color: 'white'
            }, 
            
        ];
    }
    
    render() {
        return html`
            <div class="container">
                <div class="title">Normal Pages</div>
                <div class="row">
                    <obap-selector-container selected-index="0">
                        <obap-radio-group>
                            ${this.pages.map(page => html`<obap-radio label="${page.label}"></obap-radio>`)} 
                        </obap-radio-group>
        
                        <obap-pages>
                            ${this.pages.map(page => html`<div class="page">${page.label}</div>`)}
                        </obap-pages>
                    </obap-selector-container>
                </div>
 
                <div class="title">Animated Pages</div>
                <div class="row">
                    <obap-selector-container selected-index="0">
                        <obap-radio-group>
                            ${this.pages.map(page => html`<obap-radio label="${page.label}"></obap-radio>`)} 
                        </obap-radio-group>
        
                        <obap-animated-pages id="anim" animation-style="left">
                            ${this.pages.map(page => html`<div class="page" style="${`background-color: ${page.background}; color: ${page.color};`}">${page.label}</div>`)}
                        </obap-animated-pages>
                    </obap-selector-container>
                </div>
                <obap-radio-group class="animation-styles" selected-index="0" @obap-item-selected="${(e) => this.renderRoot.getElementById('anim').animationStyle = e.detail.item.label}">
                    <obap-radio label="left"></obap-radio>
                    <obap-radio label="right"></obap-radio>
                    <obap-radio label="top"></obap-radio>
                    <obap-radio label="bottom"></obap-radio>
                    <obap-radio label="horizontal"></obap-radio>
                    <obap-radio label="vertical"></obap-radio>
                    <obap-radio label="fade"></obap-radio>
                    <obap-radio label="flip-horizontal"></obap-radio>
                    <obap-radio label="flip-vertical"></obap-radio>
                </obap-radio-group>
            </div>
        `;
    }
}

window.customElements.define('pages-demo', PagesDemo);