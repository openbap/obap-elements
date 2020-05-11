/*
@license
Copyright (c) 2020 Paul H Mason. All rights reserved.
*/
import { html, css, ObapElement } from '../../src/obap-element/obap-element.js';
import { typography } from '../../src/obap-styles/obap-typography.js';

export class TypographyDemo extends ObapElement {
    static get styles() {
        return [typography, css`
            :host {
                display: block;
                color: var(--obap-on-surface-color);
                background: var(--obap-surface-color);
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
        `];
    }

    render() {
        return html`
            <div class="container">
                <div class="title">Typography</div>
                <div class="typography-display">Display</div>
                <div class="typography-headline">Headline</div>
                <div class="typography-title">Title</div>
                <div class="typography-subtitle">Subtitle</div>
                <div class="typography-body">Body</div>
                <div class="typography-button">Button</div>
                <div class="typography-caption">Caption</div>
                <div class="typography-overline">Overline</div>
                <div class="typography-code">Code</div>
            </div>
        `;
    }
}

window.customElements.define('typography-demo', TypographyDemo);