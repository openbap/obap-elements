/*
@license
Copyright (c) 2021 Paul H Mason. All rights reserved.
*/
import { html, css, ObapElement } from '../../src/obap-element/obap-element.js';
import '../../src/obap-textfield/obap-textfield.js';

export class TextfieldDemo extends ObapElement {
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

            obap-textfield {
                margin: 16px;
                width: 200px;
            }
        `];
    }
    
    render() {
        return html`
            <div class="container">
                <div class="title">Outline Style</div>
                <div class="row">
                    <obap-textfield label="none" outline-style="none"></obap-textfield>
                    <obap-textfield label="underline" outline-style="underline"></obap-textfield>
                    <obap-textfield label="outline" outline-style="outline"></obap-textfield>
                </div>

                <div class="title">Label Options</div>
                <div class="row">
                    <obap-textfield label="normal" outline-style="outline"></obap-textfield>
                    <obap-textfield label="no float" outline-style="outline" no-float></obap-textfield>
                    <obap-textfield label="no placeholder" outline-style="outline" no-placeholder></obap-textfield>
                </div>

                <div class="title">Invalid State</div>
                <div class="row">
                    <obap-textfield label="none" outline-style="none" invalid></obap-textfield>
                    <obap-textfield label="underline" outline-style="underline" invalid></obap-textfield>
                    <obap-textfield label="outline" outline-style="outline" invalid></obap-textfield>
                </div>

                <div class="title">Icons</div>
                <div class="row">
                    <obap-textfield label="none" outline-style="none" start-icon="standard:bug-report"></obap-textfield>
                    <obap-textfield label="underline" outline-style="underline" end-icon="standard:mail"></obap-textfield>
                    <obap-textfield label="outline" outline-style="outline" start-icon="standard:bug-report" end-icon="standard:mail"></obap-textfield>
                </div>

                <div class="title">Helpers</div>
                <div class="row">
                    <obap-textfield label="helper text" outline-style="underline" helper-text="Helper Text"></obap-textfield>
                    <obap-textfield label="char count" outline-style="underline" char-counter></obap-textfield>
                    <obap-textfield label="max char" outline-style="underline" char-counter max-length="15"></obap-textfield>
                    <obap-textfield label="everything" outline-style="underline" char-counter max-length="15" helper-text="Helper Text"></obap-textfield>
                </div>

                <div class="title">Types</div>
                <div class="row">
                    <obap-textfield label="text" outline-style="outline" type="text"></obap-textfield>
                    <obap-textfield label="password" outline-style="outline" type="password"></obap-textfield>
                    <obap-textfield label="email" outline-style="outline" type="email" validation-message="Invalid email address"></obap-textfield>
                    <obap-textfield label="number" outline-style="outline" type="number" min="-5" max="5"></obap-textfield>
                    <obap-textfield label="search" outline-style="outline" type="search"></obap-textfield>
                    <obap-textfield label="tel" outline-style="outline" type="tel"></obap-textfield></div>
                    <obap-textfield label="url" outline-style="outline" type="url"></obap-textfield></div>
                </div>

                <div class="title">Disabled</div>
                <div class="row">
                    <obap-textfield label="none" outline-style="none" disabled></obap-textfield>
                    <obap-textfield label="underline" outline-style="underline" disabled></obap-textfield>
                    <obap-textfield label="outline" outline-style="outline" disabled></obap-textfield>
                </div>
            </div>
        `;
    }
}

window.customElements.define('textfield-demo', TextfieldDemo);