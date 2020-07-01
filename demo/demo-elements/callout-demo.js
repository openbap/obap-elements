/*
@license
Copyright (c) 2020 Paul H Mason. All rights reserved.
*/
import { html, css, ObapElement } from '../../src/obap-element/obap-element.js';
import { caption } from '../../src/obap-styles/obap-typography.js';
import '../../src/obap-callout/obap-callout.js';
import '../../src/obap-icon/obap-icon.js';

export class CalloutDemo extends ObapElement {
    static get styles() {
        return [caption, css`
            :host {
                display: block;
            }
    
            .container {
                height: 100%;
                position: relative;
            }

            .row {
              display: flex;
              flex-direction: row;
              flex-wrap: wrap;
              align-items: center;
              padding: 16px;
            }

            .title {
                padding: 4px 8px;
                color: var(--obap-on-primary-color);
                background: var(--obap-primary-color);
            }

            .button {
                margin: 8px 32px 8px 0;
                height: 40px;
                width: 40px;
                cursor: pointer;
                background: lightgrey;
            }

            .callout-content {
                display: flex;
                flex-direction: column;
                justify-content: center;
                align-items: center;
            }

            .offset {
                margin-bottom: 4px;
            }
            
            obap-callout.accent {
              --obap-callout-color: var(--obap-on-accent-color);
              --obap-callout-background-color: var(--obap-accent-color);
            }
            
            obap-callout.magenta {
              --obap-callout-color: var(--obap-on-primary-color);
              --obap-callout-background-color: magenta;
            }

            obap-callout.white {
              --obap-callout-color: var(--obap-primary-color);
              --obap-callout-background-color: var(--obap-surface-color);
            }

            .avatar {
                display: flex;
                flex-direction: column;
                justify-content: center;
                align-items: center;
                margin-bottom: 8px;
                height: 48px;
                width: 48px;
                border-radius: 50%;
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
                background: #FFF59D;
                padding: 16px;
                width: 400px;
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
            <div class="container">
                <div class="title">Callouts</div>
                <div class="row">
                    Hover the mouse over the grey squares to see the callout, or tap on mobile.
                </div>
                
                <div class="title">Regular Callouts</div>
                <div class="row">
                    <div class="button" tabindex="0">
                        <obap-callout>
                            <div class="callout-content">
                                <div>callout</div>
                            </div>
                        </obap-callout>
                    </div>
                    
                    <div class="button" tabindex="0">
                        <obap-callout>
                            <div class="callout-content">
                                <obap-icon icon="android"></obap-icon>
                            </div>
                        </obap-callout>
                    </div>

                    <div class="button" tabindex="0">
                        <obap-callout>
                            <div class="callout-content">  
                                <obap-icon class="offset" icon="android"></obap-icon>
                                <div>callout</div>
                            </div>
                        </obap-callout>
                    </div>
                </div>

                <div class="title">Elevated Callouts</div>
                <div class="row">
                    <div class="button" tabindex="0">
                        <obap-callout elevated>
                            <div class="callout-content">
                                <div>callout</div>
                            </div>
                        </obap-callout>
                    </div>
                    
                    <div class="button" tabindex="0">
                        <obap-callout elevated>
                            <div class="callout-content">
                                <obap-icon icon="android"></obap-icon>
                            </div>
                        </obap-callout>
                    </div>

                    <div class="button" tabindex="0">
                        <obap-callout elevated>
                            <div class="callout-content">  
                                <obap-icon class="offset" icon="android"></obap-icon>
                                <div>callout</div>
                            </div>
                        </obap-callout>
                    </div>
                </div>

                <div class="title">Different Positions</div>
                <div class="row">
                    <div class="button" tabindex="0">
                        <obap-callout anchor="middle-top" arrow-position="bottom">
                            <div class="callout-content">
                                <obap-icon icon="android"></obap-icon>
                            </div>
                        </obap-callout>
                    </div>

                    <div class="button" tabindex="0">
                        <obap-callout anchor="middle-bottom" arrow-position="top">
                            <div class="callout-content">
                                <obap-icon icon="android"></obap-icon>
                            </div>
                        </obap-callout>
                    </div>

                    <div class="button" tabindex="0">
                        <obap-callout anchor="middle-left" arrow-position="right">
                            <div class="callout-content">
                                <obap-icon icon="android"></obap-icon>
                            </div>
                        </obap-callout>
                    </div>

                    <div class="button" tabindex="0">
                        <obap-callout anchor="middle-right" arrow-position="left">
                            <div class="callout-content">
                                <obap-icon icon="android"></obap-icon>
                            </div>
                        </obap-callout>
                    </div>
                </div>

                <div class="title">Custom Colors</div>
                <div class="row">
                    <div class="button" tabindex="0">
                        <obap-callout elevated class="accent">
                            <div class="callout-content">  
                                <obap-icon class="offset" icon="android"></obap-icon>
                                <div>callout</div>
                            </div>
                        </obap-callout>
                    </div>

                    <div class="button" tabindex="0">
                        <obap-callout elevated class="magenta">
                            <div class="callout-content">  
                                <obap-icon class="offset" icon="android"></obap-icon>
                                <div>callout</div>
                            </div>
                        </obap-callout>
                    </div>

                    <div class="button" tabindex="0">
                        <obap-callout elevated class="white">
                            <div class="callout-content">  
                                <obap-icon class="offset" icon="android"></obap-icon>
                                <div>callout</div>
                            </div>
                        </obap-callout>
                    </div>
                </div>

                <div class="title">Not Attached</div>
                <div class="row">
                    <div class="container-speech typography-caption" slot="demo">
                        <div class="speech-row left">
                            <div class="avatar blue" tabindex="0"><obap-icon class="speech-icon" icon="android"></obap-icon></div>
                            <obap-callout class="bubble-left" fixed elevated offset-x="4" offset-y="0" anchor="middle-right" arrow-position="left">
                                <div class="speech">
                                    Hello!
                                </div>
                            </obap-callout>
                        </div>

                        <div class="speech-row right">
                            <div class="avatar red" tabindex="0"><obap-icon class="speech-icon" icon="face"></div>
                            <obap-callout class="bubble-right" fixed elevated offset-x="-4" offset-y="0" anchor="middle-left" arrow-position="right">
                                <div class="speech">
                                    Hello, how are you doing?
                                </div>
                            </obap-callout>
                        </div>

                        <div class="speech-row left">
                            <div class="avatar blue" tabindex="0"><obap-icon class="speech-icon" icon="android"></div>
                            <obap-callout class="bubble-left" fixed elevated offset-x="4" offset-y="0" anchor="middle-right" arrow-position="left">
                                <div class="speech">
                                    Fine thanks, and you?
                                </div>
                            </obap-callout>
                        </div>

                        <div class="speech-row right">
                            <div class="avatar red" tabindex="0"><obap-icon class="speech-icon" icon="face"></div>
                            <obap-callout class="bubble-right" fixed elevated offset-x="-4" offset-y="0" anchor="middle-left" arrow-position="right">
                                <div class="speech">
                                    Good, good, good.
                                </div>
                            </obap-callout>
                        </div>

                        <div class="speech-row right">
                            <div class="avatar red" tabindex="0"><obap-icon class="speech-icon" icon="face"></div>
                            <obap-callout class="bubble-right" fixed elevated offset-x="-4" offset-y="0" anchor="middle-left" arrow-position="right">
                                <div class="speech">
                                    Okay, bye.
                                </div>
                            </obap-callout>
                        </div>
                    </div>
                </div>
            </div>
        `;
    }
}

window.customElements.define('callout-demo', CalloutDemo);