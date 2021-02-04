/*
@license
Copyright (c) 2021 Paul H Mason. All rights reserved.
*/
import { html, css, ObapElement } from '../../../src/obap-element/obap-element.js';
import '../../../src/obap-demo-snippet/obap-demo-snippet.js';
import '../../../src/obap-button/obap-button.js';

export class DemoSnippet extends ObapElement {
    static get styles() {
        return [css`
            :host {
                display: block;
                height: 100%;
                padding: 8px;
                box-sizing: border-box;
                overflow: hidden;
            }
    
            :host([hidden]) {
                display: none !important;
            }
    
            :host([disabled]) {
                pointer-events: none;
            }
            
            .container {
                height: 100%;
                box-sizing: border-box;
                display: flex;
                flex-direction: column;
                align-items: center;
            }

            obap-demo-snippet {
                background: var(--obap-surface-color);
                width: 100%;
            }
        `];
    }

    render() {
        return html`
            <div class="container">
                <obap-demo-snippet label="obap-demo-snippet">
                    <template>
                        <style>
                            .custom-button {
                                --obap-button-color: white;
                                --obap-button-background-color: cornflowerblue;
                            }
                        </style>
                            
                        <obap-button raised class="custom-button" label="button"></obap-button>
                    </template>
                </obap-demo-snippet>
            </div>
        `;
    }
}

window.customElements.define('demo-snippet', DemoSnippet);