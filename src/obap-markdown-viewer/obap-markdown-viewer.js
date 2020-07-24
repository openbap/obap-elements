/*
@license
Copyright (c) 2020 Paul H Mason. All rights reserved.
*/
import { html, css, ObapElement } from '../obap-element/obap-element.js';
import { unsafeHTML } from 'lit-html/directives/unsafe-html.js';
import { theme } from './obap-markdown-theme.js'

/**
 * A markdown viewer, based on Marked.
 */
export class ObapMarkdownViewer extends ObapElement {
    static get styles() {
        return [theme, css`
            :host {
                display: block;
            }
    
            :host([hidden]) {
                display: none !important;
            }
    
            :host([disabled]) {
                pointer-events: none;
            }
        `];
    }

    static get properties() {
        return {
            markdown: {
                type: String,
                attribute: 'markdown'
            },

            src: {
                type: String,
                attribute: 'src'
            },

            /**
             * Enable GFM line breaks (regular newlines instead of two spaces for
             * breaks)
             */
            breaks: {
                type: Boolean
            },
            /**
             * Conform to obscure parts of markdown.pl as much as possible. Don't fix
             * any of the original markdown bugs or poor behavior.
             */
            pedantic: {
                type: Boolean
            },

            /**
             * Sanitize the output. Ignore any HTML that has been input.
             */
            sanitize: {
                type: Boolean
            },
            /**
             * If true, disables the default sanitization of any markdown received by
             * a request and allows fetched unsanitized markdown
             *
             * e.g. fetching markdown via `src` that has HTML.
             * Note: this value overrides `sanitize` if a request is made.
             */
            disableRemoteSanitization: {
                type: Boolean
            },
            /**
             * Use "smart" typographic punctuation for things like quotes and dashes.
             */
            smartypants: {
                type: Boolean
            },

            _scriptTag: {
                type: Object
            }
        }
    }

    get markdown() {
        return this._markdown;
    }

    set markdown(value) {
        const oldValue = this.markdown;

        if (oldValue !== value) {
            this._markdown = this.unindent(value);
            this.requestUpdate('markdown', oldValue);
        }
    }

    get src() {
        return this._src;
    }

    set src(value) {
        const oldValue = this.src;

        if (oldValue !== value) {
            this._src = value;
            this._setMarkdownFile(this._src);
            this.requestUpdate('src', oldValue);
        }
    }

    constructor() {
        super();
        this._scriptTag = null;
        this._markdown = '';
        this.breaks = false;
        this.pedantic = false;
        this.sanitize = false;
        this.smartypants = false;
        this.disableRemoteSanitization = false;
        this._src = '';
        this._boundHandleSlotChangeEvent = this._handleSlotChangeEvent.bind(this);
        this.renderRoot.addEventListener('slotchange', this._boundHandleSlotChangeEvent);
    }

    updated(changedProperties) {
        super.updated(changedProperties);

        changedProperties.forEach((oldValue, propName) => {
            if (propName === 'markdown') {
                if (this.markdown) {
                    Prism.highlightAllUnder(this.renderRoot, false);
                    this.fireMessage('obap-markdown-viewer-markdown-ready');
                }
            }
        });
    }

    unindent(text) {
        if (!text) return text;

        let lines = text.replace(/\t/g, '  ').split('\n');

        let indent = lines.reduce(function (prev, line) {
            if (/^\s*$/.test(line)) {
                return prev;  // Completely ignore blank lines.
            }

            let lineIndent = line.match(/^(\s*)/)[0].length;
            
            if (prev === null) {
                return lineIndent;
            }

            return lineIndent < prev ? lineIndent : prev;
        }, null);

        return lines
            .map(function (l) {
                return l.substr(indent);
            }).join('\n');
    }

    render() {
        return html`<slot></slot>${this._renderMarkdown(this.markdown)}`;
    }

    _renderMarkdown(markdown) {
        this.renderer = this.renderer || new marked.Renderer();

        var opts = {
            renderer: this.renderer,
            breaks: this.breaks,
            sanitize: this.sanitize,
            pedantic: this.pedantic,
            smartypants: this.smartypants
        };

        return html`
            ${unsafeHTML(marked(markdown, opts))}
        `;
    }

    _setMarkdownFile(src) {
        this._fetchMarkdownFile(src).then(response => {
            this.markdown = response;
        });
    }

    async _fetchMarkdownFile(src) {
        if (src && src.toLowerCase().includes('.md')) {
            return await fetch(src)
                .then(async response => await response.text())
                .catch(e => 'Error fetching markdown file.')
        }

        return '';
    }

    _handleSlotChangeEvent(e) {
        this._scriptTag = this.querySelector('script[type="text/markdown"]');

        if (this._scriptTag) {
            this.markdown = this._scriptTag.text.trim();
        }
    }
}

window.customElements.define('obap-markdown-viewer', ObapMarkdownViewer);
