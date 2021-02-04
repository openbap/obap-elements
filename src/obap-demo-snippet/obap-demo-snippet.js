/*
@license
Copyright (c) 2021 Paul H Mason. All rights reserved.
*/
import { html, css, ObapElement } from '../obap-element/obap-element.js';
import '../obap-markdown-viewer/obap-markdown-viewer.js';
import '../obap-button/obap-button.js';

/**
 * A helper element that displays the source of a code snippet and its rendered demo.
 */
export class ObapDemoSnippet extends ObapElement {
    static get styles() {
        return [css`
            :host {
                display: block;
                box-shadow: 0 2px 2px 0 rgba(0, 0, 0, 0.14),
                            0 1px 5px 0 rgba(0, 0, 0, 0.12),
                            0 3px 1px -2px rgba(0, 0, 0, 0.2);
            }
    
            :host([hidden]) {
                display: none !important;
            }
    
            :host([disabled]) {
                pointer-events: none;
            }

            .hidden {
                display: none !important;
            }

            .container {
                display: flex;
                flex-direction: column;
                height: 100%;
            }

            .demo {
                padding: 16px;
            }

            .code {
                flex: 1;
                display: flex;
                flex-direction: column;
                background: #F5F2F0;
            }

            obap-markdown-viewer {
                flex: 1;
                width: 100%; 
            }

            #copy-button {
                --obap-button-background-color: transparent;
                height: 24px;
                min-width: 0;
                align-self: flex-end;
                margin: 4px 4px 0 0;
            }
        `];
    }

    static get properties() {
        return {
            label: {
                type: String,
                attribute: 'label'
            },

            disableCopy: {
                type: Boolean,
                attribute: 'disable-copy'
            },

            copyLabel: {
                type: String,
                attribute: 'copy-label'
            },

            doneLabel: {
                type: String,
                attribute: 'done-label'
            },

            errorLabel: {
                type: String,
                attribute: 'error-label'
            }
        }
    }

    constructor() {
        super();
        this.label = '';
        this.disableCopy = false;
        this.copyLabel = 'copy';
        this.doneLabel = 'done';
        this.errorLabel = 'error';
        this._codeSnippet = '';
        this._boundHandleSlotChangeEvent = this._handleSlotChangeEvent.bind(this);
        this.renderRoot.addEventListener('slotchange', this._boundHandleSlotChangeEvent);
    }

    updated(changedProperties) {
        super.updated(changedProperties);

        this._codeViewer = this.renderRoot.getElementById('code-viewer');
        this._demoViewer = this.renderRoot.getElementById('demo-viewer');
        this._copyButton = this.renderRoot.getElementById('copy-button');
    }

    render() {
        return html`
            <div class="container">
                <div class="demo">
                    <div id="demo-viewer"></div>
                </div>

                <div class="code">
                    ${this.disableCopy ? null : html`<obap-button id="copy-button" label="${this.copyLabel}" @click="${this._copyToClipboard}"></obap-button>`}
                    <obap-markdown-viewer id="code-viewer"></obap-markdown-viewer>
                </div>

                <div class="hidden">
                    <slot></slot>
                </div>
            </div>
        `;
    }

    _handleSlotChangeEvent(e) {
        let slot = this.renderRoot.querySelector('slot');

        let template = slot.assignedNodes({ flatten: true }).filter((el) => {
            return (el.nodeType === 1) && (el.tagName === 'TEMPLATE');
        })[0];

        if (template) {
            this._updateContent(template)
        }
    }

    _updateContent(template) {
        // Code
        let snippet = this._codeViewer.unindent(template.innerHTML).trim();
        snippet = snippet.replace(/ class=""/g, '');
        snippet = snippet.replace(/=""/g, '');

        this._codeSnippet = snippet;

        let code = '```html\n' + snippet + '\n' + '```';
        this._codeViewer.markdown = code;

        // Demo
        this._demoViewer.appendChild(document.importNode(template.content, true));
    }

    _copyToClipboard() {
        // From
        // https://github.com/google/material-design-lite/blob/master/docs/_assets/snippets.js
        let snipRange = document.createRange();
        snipRange.selectNodeContents(this._codeViewer.renderRoot);

        let selection = window.getSelection();
        selection.removeAllRanges();
        selection.addRange(snipRange);

        let result = false;

        try {
            result = document.execCommand('copy');
            this._copyButton.label = this.doneLabel;
        } catch (error) {
            // Copy command is not available
            console.error(error);
            this._copyButton.label = this.errorLabel;
        }

        // Return to the copy button after a second.
        setTimeout(this._resetCopyButtonState.bind(this), 1000);

        selection.removeAllRanges();

        return result;
    }

    _resetCopyButtonState() {
        this._copyButton.label = this.copyLabel;
    }
}

window.customElements.define('obap-demo-snippet', ObapDemoSnippet);
