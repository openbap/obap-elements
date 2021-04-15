/*
@license
Copyright (c) 2021 Paul H Mason. All rights reserved.
*/
import { html, css, ObapElement } from '../../src/obap-element/obap-element.js';
import '../../src/obap-button/obap-button-group.js';

export class ButtonDemo extends ObapElement {
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

            obap-button {
                margin: 16px; 
            }

            .primary {
                --obap-button-ripple-color: var(--obap-on-primary-color);
                --obap-button-color: var(--obap-on-primary-color);
                --obap-button-background-color: var(--obap-primary-color);
            }

            .accent {
                --obap-button-ripple-color: var(--obap-on-accent-color);
                --obap-button-color: var(--obap-on-accent-color);
                --obap-button-background-color: var(--obap-accent-color);
            }

            .primary-reverse {
                --obap-button-ripple-color: var(--obap-primary-color);
                --obap-button-color: var(--obap-primary-color);
                --obap-button-background-color: var(--obap-on-primary-color);
            }

            .accent-reverse {
                --obap-button-ripple-color: var(--obap-accent-color);
                --obap-button-color: var(--obap-accent-color);
                --obap-button-background-color: var(--obap-on-accent-color);
            }

            .green {
                --obap-button-color: white;
                --obap-button-background-color: green;
            }

            .blue {
                --obap-button-color: yellow;
                --obap-button-background-color: blue;
              
            }

            .magenta {
                --obap-button-disabled-background-color: lightpink;
            }

            obap-button-group {
                margin: 16px;
            }

            obap-button-group > obap-button {
                margin: 0;
            }
        `];
    }
    
    render() {
        return html`
            <div class="container">
                <div class="title"  @click="${this._click}">Regular Buttons</div>
                <div class="row">
                    <obap-button @click="${this._click}" label="flat"></obap-button>
                    <obap-button @click="${this._click}" label="outline" outline></obap-button>
                    <obap-button @click="${this._click}" label="raised" raised></obap-button>
                    <obap-button @click="${this._click}" label="no ink" no-ink raised></obap-button>
                    <obap-button @click="${this._click}" label="toggle" raised toggle></obap-button>
                    <obap-button @click="${this._click}" label="disabled" disabled></obap-button>

                    <obap-button @click="${this._click}" label="flat" icon="android"></obap-button>
                    <obap-button @click="${this._click}" label="outline" icon="android" outline></obap-button>
                    <obap-button @click="${this._click}" label="raised" raised icon="face"></obap-button>
                    <obap-button @click="${this._click}" label="no ink" no-ink raised icon="bug-report"></obap-button>
                    <obap-button @click="${this._click}" label="toggle" raised toggle icon="settings"></obap-button>
                    <obap-button @click="${this._click}" label="disabled" icon="add" disabled></obap-button>
                </div>

                <div class="title">Floating Action Buttons</div>
                <div class="row">
                    <obap-button round icon="android"></obap-button>
                    <obap-button round icon="android" outline></obap-button>
                    <obap-button round raised icon="face"></obap-button>
                    <obap-button round no-ink raised icon="bug-report"></obap-button>
                    <obap-button round raised toggle icon="settings"></obap-button>
                    <obap-button round icon="add" disabled></obap-button>

                    <obap-button label="flat" round icon="android"></obap-button>
                    <obap-button label="outline" round icon="android" outline></obap-button>
                    <obap-button label="raised" round raised icon="face"></obap-button>
                    <obap-button label="no ink" round no-ink raised icon="bug-report"></obap-button>
                    <obap-button label="toggle" round raised toggle icon="settings"></obap-button>
                    <obap-button label="disabled" round icon="add" disabled></obap-button>
                </div>

                <div class="title">Custom Colors</div>
                <div class="row">
                    <obap-button label="primary" raised class="primary"></obap-button>
                    <obap-button label="accent" raised class="accent"></obap-button>
                    <obap-button round raised icon="android" class="primary-reverse"></obap-button>
                    <obap-button round raised icon="bug-report" class="accent-reverse"></obap-button>
                    <obap-button round icon="android" class="primary-reverse"></obap-button>
                    <obap-button round icon="bug-report" class="accent-reverse"></obap-button>
                    <obap-button round icon="android" class="primary-reverse" toggle raised label="toggle"></obap-button>
                    <obap-button round icon="bug-report" class="accent-reverse" toggle raised label="toggle"></obap-button>
                </div>

                <div class="title"  @click="${this._click}">Button Group</div>
                <div class="row">
                    <obap-button-group selected-index="0">
                        <obap-button icon="settings" outline toggle></obap-button>
                        <obap-button icon="android" outline toggle></obap-button>
                        <obap-button icon="bug-report" outline toggle></obap-button>
                        <obap-button icon="face" outline toggle></obap-button>
                        <obap-button icon="shopping-cart" outline toggle></obap-button>
                    </obap-button-group>
                </div>
            </div>
        `;
    }

    _click() {
        console.log('CLICK');
    }
}

window.customElements.define('button-demo', ButtonDemo);