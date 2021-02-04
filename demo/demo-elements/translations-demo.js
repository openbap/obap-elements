/*
@license
Copyright (c) 2021 Paul H Mason. All rights reserved.
*/
import { html, css, ObapElement } from '../../src/obap-element/obap-element.js';
import '../../src/obap-translations/obap-translations.js';
import { localize, currency, ObapTranslationController } from '../../src/obap-translations/obap-translation-controller.js';
import { title, code } from '../../src/obap-styles/obap-typography.js';
import '../../src/obap-radio/obap-radio-group.js';
import '../../src/obap-radio/obap-radio.js';

export class TranslationsDemo extends ObapTranslationController(ObapElement) {
    static get styles() {
        return [title, code, css`
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

            obap-radio {
                margin: 16px;
            }

            .text-block {
                padding: 8px;
            }
        `];
    }

    get properties() {
        return {
            supportedCultures: {
                type: Array
            },

            currentCulture: {
                type: String,
                attribute: 'culture',
                reflect: true
            }
        }
    }

    constructor() {
        super();
        this.supportedCultures = 'en,es';
        this.currentCulture = 'en';
    }

    render() {
        return html`
            <obap-translations id="translations" url="./translations/", culture="${this.currentCulture}", supported-cultures="${this.supportedCultures}"></obap-translations>
           
            <div class="container">
                <div class="title">Choose Language</div>
                <div class="row">
                    <obap-radio-group selected-index="0" @obap-item-selected="${this._cultureChange}">
                        <obap-radio label="English"></obap-radio>
                        <obap-radio label="Spanish"></obap-radio>
                    </obap-radio-group>
                </div>

                <div class="title">Translations</div>
                <div class="row">
                    <div class="text-block">
                        <div>'this_is_a_sentence' - ${localize('this_is_a_sentence', 'blob')}</div>
                        <div>'hello_world' - ${localize('hello_world')}</div>
                        <div>'this_does_not_exist' - ${localize('this_does_not_exist', 'This is the default value')}</div>
                        <div>'UPPER CASE' - ${localize('this_is_a_sentence', '', 'upper')}</div>
                        <div>'lower case' - ${localize('this_is_a_sentence', '', 'lower')}</div>
                        <div>'Title Case' - ${localize('this_is_a_sentence', '', 'title')}</div>
                        <div>'Interpolation' - ${localize('selection', '', '', 1, 10)}</div>
                    </div>
                </div>

                <div class="title">Currency Symbols</div>
                <div class="row">
                    <div class="text-block typography-code">
                        <div>JPY: ${currency('JPY')}</div>
                        <div>SGD: ${currency('SGD')}</div>
                        <div>USD: ${currency('USD')}</div>
                        <div>EUR: ${currency('EUR')}</div>
                    </div>
                </div>

                <div class="title">Currency Formatting</div>
                <div class="row">
                    <div class="text-block typography-code">
                        <div>30100400.99 JPY: ${currency('JPY', 30100400.99)}</div>
                        <div>30100400.99 SGD: ${currency('SGD', 30100400.99)}</div>
                        <div>30100400.99 USD: ${currency('USD', 30100400.99)}</div>
                        <div>30100400.99 EUR: ${currency('EUR', 30100400.99)}</div>
                    </div>
                </div>
            </div>
        `;
    }

    _cultureChange(e) {
        this.currentCulture = e.detail.index === 0 ? 'en' : 'es';
        const el = this.renderRoot.getElementById('translations');

        if (el) {
            el.culture = this.currentCulture;
        }
    }
}

window.customElements.define('translations-demo', TranslationsDemo);