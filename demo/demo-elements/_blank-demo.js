/*
@license
Copyright (c) 2020 Paul H Mason. All rights reserved.
*/
import { html, css, ObapElement } from '../../src/obap-element/obap-element.js';
import '../../src/obap-xxx/obap-xxx.js';

export class XXXDemo extends ObapElement {
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
        `];
    }
    
    render() {
        return html`
            <div class="container">
                <div class="title">Demo</div>
            </div>
        `;
    }
}

window.customElements.define('xxx-demo', XXXDemo);