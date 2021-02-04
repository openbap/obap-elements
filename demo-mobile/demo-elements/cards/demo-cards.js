/*
@license
Copyright (c) 2021 Paul H Mason. All rights reserved.
*/
import { html, css, ObapElement } from '../../../src/obap-element/obap-element.js';
import '../../../src/obap-card/obap-card.js';
import '../../../src/obap-button/obap-button.js';

export class DemoCards extends ObapElement {
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
                padding-top: 24px;
            }

            obap-card {
                width: 350px;
                height: 350px;
            }

            .media {
                display: flex;
                flex-direction: column;
                justify-content: center;
                align-items: center;
                height: 100px;
                color: var(--obap-text-secondary-color);
                background: var(--obap-block-color);
            }
        `];
    }

    render() {
        return html`
            <div class="container">
                <obap-card elevated heading="Title Goes Here" sub-heading="Secondary Text">
                    <div class="media typography-body" slot="media">MEDIA</div>
                    <div>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam hendrerit urna ante, commodo dictum nisi accumsan vel. Ut felis orci, ultricies eu sodales quis, tincidunt vitae nulla. Ut a quam convallis, cursus erat convallis, feugiat mi.
                    </div>
                    <obap-button label="Action 1" slot="action-left"></obap-button>
                    <obap-button label="Action 2" slot="action-left"></obap-button>
                    <obap-button round icon="app:android" slot="action-right"></obap-button>
                    <obap-button round icon="app:polymer" slot="action-right"></obap-button>
                </obap-card>
            </div>
        `;
    }
}

window.customElements.define('demo-cards', DemoCards);