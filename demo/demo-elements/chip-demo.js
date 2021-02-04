/*
@license
Copyright (c) 2021 Paul H Mason. All rights reserved.
*/
import { html, css, ObapElement } from '../../src/obap-element/obap-element.js';
import '../../src/obap-chip/obap-chip.js';

export class ChipDemo extends ObapElement {
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

            obap-chip {
                margin: 16px 8px;
            }

            .red {
                --obap-chip-color: white;
                --obap-chip-background-color: red;

                --obap-chip-selected-color: red;
                --obap-chip-selected-background-color: silver;
            }

            .green {
                --obap-chip-color: white;
                --obap-chip-background-color: green;

                --obap-chip-selected-color: green;
                --obap-chip-selected-background-color: silver;
            }

            .magenta {
                --obap-chip-color: white;
                --obap-chip-background-color: magenta;

                --obap-chip-selected-color: magenta;
                --obap-chip-selected-background-color: silver;
            }

            .blue {
                --obap-chip-color: white;
                --obap-chip-background-color: blue;

                --obap-chip-selected-color: blue;
                --obap-chip-selected-background-color: silver;
            }

            .orange {
                --obap-chip-color: white;
                --obap-chip-background-color: orange;

                --obap-chip-selected-color: orange;
                --obap-chip-selected-background-color: silver;
            }
        `];
    }
    
    render() {
        return html`
            <div class="container">
                <div class="title">Normal Chips</div>
                <div class="row">
                    <obap-chip label="apple"></obap-chip>
                    <obap-chip label="orange"></obap-chip>
                    <obap-chip label="banana"></obap-chip>
                    <obap-chip label="lemon"></obap-chip>
                    <obap-chip label="peach"></obap-chip>
                </div>

                <div class="title">Chips with icons</div>
                <div class="row">
                    <obap-chip label="apple" icon="android"></obap-chip>
                    <obap-chip label="orange" icon="bug-report"></obap-chip>
                    <obap-chip label="banana" icon="face"></obap-chip>
                    <obap-chip label="lemon" icon="settings"></obap-chip>
                    <obap-chip label="peach" icon="room"></obap-chip>
                </div>

                <div class="title">Removable chips</div>
                <div class="row" @obap-chip-remove="${this._handleChipRemove}">
                    <obap-chip label="apple" icon="android" removable></obap-chip>
                    <obap-chip label="orange" icon="bug-report" removable></obap-chip>
                    <obap-chip label="banana" icon="face" removable></obap-chip>
                    <obap-chip label="lemon" icon="settings" removable></obap-chip>
                    <obap-chip label="peach" icon="room" removable></obap-chip>
                </div>

                <div class="title">Toggle chips</div>
                <div class="row">
                    <obap-chip label="apple" icon="android" toggle></obap-chip>
                    <obap-chip label="orange" icon="bug-report" toggle></obap-chip>
                    <obap-chip label="banana" icon="face" toggle></obap-chip>
                    <obap-chip label="lemon" icon="settings" toggle></obap-chip>
                    <obap-chip label="peach" icon="room" toggle></obap-chip>
                </div>

                <div class="title">Toggle chips with check</div>
                <div class="row">
                    <obap-chip label="apple" icon="android" toggle show-check></obap-chip>
                    <obap-chip label="orange" icon="bug-report" toggle show-check></obap-chip>
                    <obap-chip label="banana" icon="face" toggle show-check></obap-chip>
                    <obap-chip label="lemon" icon="settings" toggle show-check></obap-chip>
                    <obap-chip label="peach" icon="room" toggle show-check></obap-chip>
                </div>

                <div class="title">Custom Colors</div>
                <div class="row">
                    <obap-chip class="red" label="apple" icon="android" toggle show-check></obap-chip>
                    <obap-chip class="green" label="orange" icon="bug-report" toggle show-check></obap-chip>
                    <obap-chip class="magenta" label="banana" icon="face" toggle show-check></obap-chip>
                    <obap-chip class="blue" label="lemon" icon="settings" toggle show-check></obap-chip>
                    <obap-chip class="orange" label="peach" icon="room" toggle show-check></obap-chip>
                </div>
            </div>
        `;
    }

    _handleChipRemove(e) {
        e.target.parentNode.removeChild(e.target)
    }
}

window.customElements.define('chip-demo', ChipDemo);