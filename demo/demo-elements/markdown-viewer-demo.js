/*
@license
Copyright (c) 2021 Paul H Mason. All rights reserved.
*/
import { html, css, ObapElement } from '../../src/obap-element/obap-element.js';
import {unsafeHTML} from 'lit-html/directives/unsafe-html.js';
import '../../src/obap-markdown-viewer/obap-markdown-viewer.js';

export class MarkdownViewerDemo extends ObapElement {
    static get styles() {
        return [css`
            :host {
                display: block;
            }
    
            .container {
                height: 100%;
            }
        `];
    }
    
    render() {
        return html`
            <div class="container">
                <obap-markdown-viewer src="./markdown/test.md">
                </obap-markdown-viewer>
            </div>
        `;
    }
}

window.customElements.define('markdown-viewer-demo', MarkdownViewerDemo);