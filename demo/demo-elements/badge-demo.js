/*
@license
Copyright (c) 2020 Paul H Mason. All rights reserved.
*/
import { html, css, ObapElement } from '../../src/obap-element/obap-element.js';
import '../../src/obap-badge/obap-badge.js';
import '../../src/obap-button/obap-button.js';

export class BadgeDemo extends ObapElement {
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

            .badge-parent {
                position: relative;
                margin: 16px;
            }

            .red {
                --obap-badge-color: white;
                --obap-badge-background-color: red;
            }

            .green {
                --obap-badge-color: white;
                --obap-badge-background-color: green;
            }

            .magenta {
                --obap-badge-color: white;
                --obap-badge-background-color: magenta;
            }

            .filled {
                --obap-icon-button-color: white;
                --obap-icon-button-background-color: silver;
            }

            .big {
                width: 24px;
                height: 24px;
            }

            obap-button {
                --obap-button-ripple-color: var(--obap-on-primary-color);
                --obap-button-color: var(--obap-on-primary-color);
                --obap-button-background-color: var(--obap-primary-light-color);
            }
        `];
    }

    static get properties() {
        return {
            elevations: { type: Array }
        };
    }

    constructor() {
        super();
        this.elevations = [0, 1, 2, 3, 4, 6, 8, 12, 16, 24]
    }
    
    render() {
        return html`
            <div class="container">
                <div class="title">Badges can be applied to specific elements.</div>
                <div class="row">
                    <div class="badge-parent">
                        <obap-button raised label="button" id="ib_1" class="button"></obap-button>
                        <obap-badge label="3" for="ib_1"></obap-badge>
                    </div>
                    <div class="badge-parent">
                        <obap-button raised label="button" id="ib_2" class="button"></obap-button>
                        <obap-badge icon="star" for="ib_2"></obap-badge>
                    </div>
                    <div class="badge-parent">
                        <obap-button raised label="button" id="ib_3" class="button"></obap-button>
                        <obap-badge label="5" for="b_1"></obap-badge>
                    </div>
                </div>

                <div class="title">Badges can be applied to direct siblings.</div>
                <div class="row">
                    <div class="badge-parent">
                        <obap-button raised label="button" class="button"></obap-button>
                        <obap-badge label="1"></obap-badge>
                    </div>
                    <div class="badge-parent">
                        <obap-button raised label="button" class="button"></obap-button>
                        <obap-badge icon="android"></obap-badge>
                    </div>
                    <div class="badge-parent">
                        <obap-button raised label="button" class="button"></obap-button>
                        <obap-badge label="15"></obap-badge>
                    </div>
                </div>

                <div class="title">Badges can be customized using custom properties.</div>
                <div class="row">
                    <div class="badge-parent">
                        <obap-button raised label="button" class="button"></obap-button>
                        <obap-badge class="red" label="7"></obap-badge>
                    </div>
                    <div class="badge-parent">
                        <obap-button raised label="button" class="button"></obap-button>
                        <obap-badge class="green" icon="bug-report"></obap-badge>
                    </div>
                    <div class="badge-parent">
                        <obap-button raised label="button" class="button"></obap-button>
                        <obap-badge class="magenta" label="8"></obap-badge>
                    </div>
                </div>

                <div class="title">Badges can be anchored to different positions (same as attached element - inset, shift and offsets can also be used).</div>
                <div class="row">
                    <div class="badge-parent">
                        <obap-button raised label="button" class="button"></obap-button>
                        <obap-badge class="big" anchor="top-left" label="TL"></obap-badge>
                    </div>
                    <div class="badge-parent">
                        <obap-button raised label="button" class="button"></obap-button>
                        <obap-badge class="big" anchor="top-right" label="TR"></obap-badge>
                    </div>
                    <div class="badge-parent">
                        <obap-button raised label="button" class="button"></obap-button>
                        <obap-badge class="big" anchor="bottom-left" label="BL"></obap-badge>
                    </div>
                    <div class="badge-parent">
                        <obap-button raised label="button" class="button"></obap-button>
                        <obap-badge class="big" anchor="bottom-right" label="BR"></obap-badge>
                    </div>

                    <div class="badge-parent">
                        <obap-button raised label="button" class="button"></obap-button>
                        <obap-badge class="big" anchor="middle-left" label="ML"></obap-badge>
                    </div>
                    <div class="badge-parent">
                        <obap-button raised label="button" class="button"></obap-button>
                        <obap-badge class="big" anchor="middle-right" label="MR"></obap-badge>
                    </div>
                    <div class="badge-parent">
                        <obap-button raised label="button" class="button"></obap-button>
                        <obap-badge class="big" anchor="middle-top" label="MT"></obap-badge>
                    </div>
                    <div class="badge-parent">
                        <obap-button raised label="button" class="button"></obap-button>
                        <obap-badge class="big" anchor="middle-bottom" label="MB"></obap-badge>
                    </div>
                    <div class="badge-parent">
                        <obap-button raised label="button" class="button"></obap-button>
                        <obap-badge class="big" anchor="center" label="C"></obap-badge>
                    </div>

                </div>

                <div class="title">Badges can have an elevation.</div>
                <div class="row">
                    ${this.elevations.map(elevation => html`
                        <div class="badge-parent">
                            <obap-button raised label="button" class="button"></obap-button>
                            <obap-badge elevation="${elevation}" label="${elevation}"></obap-badge>
                        </div>
                    `)}
                    
                </div>
            </div>
        `;
    }
}

window.customElements.define('badge-demo', BadgeDemo);