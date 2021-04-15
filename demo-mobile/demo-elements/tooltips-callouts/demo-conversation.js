/*
@license
Copyright (c) 2021 Paul H Mason. All rights reserved.
*/
import { html, css, ObapElement } from '../../../src/obap-element/obap-element.js';
import { caption, body } from '../../../src/obap-styles/obap-typography.js';
import '../../../src/obap-button/obap-button.js';
import '../../../src/obap-icon/obap-icon.js';
import '../../../src/obap-callout/obap-callout.js';
import '../../demo-mobile-app/demo-panel.js';

export class DemoConversation extends ObapElement {
    static get styles() {
        return [caption, body, css`
            :host {
                display: block;
                position: relative;
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

            obap-button {
                --obap-button-ripple-color: var(--obap-on-primary-color);
                --obap-button-color: var(--obap-on-primary-color);
                --obap-button-background-color: var(--obap-primary-color);
            }

            .avatar {
                display: flex;
                flex-direction: column;
                justify-content: center;
                align-items: center;
                margin-bottom: 8px;
                height: 48px;
                width: 48px;
                border-radius: var(--obap-border-radius-circle, 50%);
                cursor: pointer;
            }

            .blue {
                background: #2196F3;
            }

            .red {
                background: #EF9A9A;
            }

            .speech {
                max-width: 500px;
            }

            .speech-row {
              display: flex;
              flex-direction: row;
              align-items: center;
              padding-bottom: 8px;
            }

            .bubble-right {
                --obap-callout-background-color: var(--obap-accent-color);
                --obap-callout-color: var(--obap-on-accent-color);
            }

            .bubble-left {
                --obap-callout-background-color: var(--obap-primary-color);
                --obap-callout-color: var(--obap-on-primary-color);
            }

            .container-speech {
                position: relative;
                display: flex;
                flex-direction: column;
                margin: 16px 8px 0 8px;
            }

            .right {
                flex-direction: row-reverse;
            }

            obap-icon.speech-icon{
                --obap-icon-fill-color: white;
            }
        `];
    }

    render() {
        return html`
            <demo-panel>
                <div class="container-speech typography-caption">
                    <div class="speech-row left">
                        <div class="avatar blue" tabindex="0"><obap-icon class="speech-icon" icon="app:android"></obap-icon></div>
                        <obap-callout class="bubble-left" fixed elevated offset-x="4" offset-y="0" anchor="middle-right" arrow-position="left">
                            <div class="speech">
                                    Hello!
                            </div>
                        </obap-callout>
                    </div>

                    <div class="speech-row right">
                        <div class="avatar red" tabindex="0"><obap-icon class="speech-icon" icon="app:face"></div>
                        <obap-callout class="bubble-right" fixed elevated offset-x="-4" offset-y="0" anchor="middle-left" arrow-position="right">
                            <div class="speech">
                                Hello, how are you doing?
                            </div>
                        </obap-callout>
                    </div>

                    <div class="speech-row left">
                        <div class="avatar blue" tabindex="0"><obap-icon class="speech-icon" icon="app:android"></div>
                        <obap-callout class="bubble-left" fixed elevated offset-x="4" offset-y="0" anchor="middle-right" arrow-position="left">
                            <div class="speech">
                                Fine thanks, and you?
                            </div>
                        </obap-callout>
                    </div>

                    <div class="speech-row right">
                        <div class="avatar red" tabindex="0"><obap-icon class="speech-icon" icon="app:face"></div>
                        <obap-callout class="bubble-right" fixed elevated offset-x="-4" offset-y="0" anchor="middle-left" arrow-position="right">
                            <div class="speech">
                                Good, good, good.
                            </div>
                        </obap-callout>
                    </div>

                    <div class="speech-row right">
                        <div class="avatar red" tabindex="0"><obap-icon class="speech-icon" icon="app:face"></div>
                        <obap-callout class="bubble-right" fixed elevated offset-x="-4" offset-y="0" anchor="middle-left" arrow-position="right">
                            <div class="speech">
                                Okay, bye.
                            </div>
                        </obap-callout>
                    </div>
                </div>
            </demo-panel>
        `;
    }
}

window.customElements.define('demo-conversation', DemoConversation);