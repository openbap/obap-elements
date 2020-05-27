/*
@license
Copyright (c) 2020 Paul H Mason. All rights reserved.
*/
import { html, css, ObapElement } from '../../src/obap-element/obap-element.js';
import { body } from '../../src/obap-styles/obap-typography.js';
import '../../src/obap-card/obap-card.js';

export class CardDemo extends ObapElement {
    static get styles() {
        return [body, css`
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

            obap-card {
                max-width: 400px;
            }

            .media {
                display: flex;
                flex-direction: column;
                justify-content: center;
                align-items: center;
                height: 150px;
                color: var(--obap-text-secondary-color);
                background: var(--obap-block-color);
            }
        `];
    }

    render() {
        return html`
            <div class="container">
                <div class="title">Card</div>
                <div class="row">
                    <obap-card elevated heading="Title Goes Here" sub-heading="Secondary Text">
                        <div class="media typography-body" slot="media">MEDIA</div>
                        <div>
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam hendrerit urna ante, commodo dictum nisi accumsan vel. Ut felis orci, ultricies eu sodales quis, tincidunt vitae nulla. Ut a quam convallis, cursus erat convallis, feugiat mi.
                        </div>
                        <obap-button label="Action 1" slot="action-left"></obap-button>
                        <obap-button label="Action 2" slot="action-left"></obap-button>
                        <obap-button round icon="favorite" slot="action-right"></obap-button>
                        <obap-button round icon="room" slot="action-right"></obap-button>
                    </obap-card>
                </div>
            </div>
        `;
    }
}

window.customElements.define('card-demo', CardDemo);