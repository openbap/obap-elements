/*
@license
Copyright (c) 2020 Paul H Mason. All rights reserved.
*/
import { html, css, ObapElement } from '../../src/obap-element/obap-element.js';
import '../../src/obap-splitter-container/obap-splitter-container.js';

export class SplitterContainerDemo extends ObapElement {
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
              margin-bottom: 8px;
            }

            obap-splitter {
                --obap-splitter-color: var(--obap-primary-light-color);
                --obap-splitter-handle-color: var(--obap-primary-color);
                --obap-splitter-size: 4px;
                --obap-splitter-handle-size: 24px;
            }

            .content {
                width: 100px;
                height: 100px;
                display: flex;
                flex-direction: column;
                justify-content: center;
                align-items: center;
                color: var(--obap-on-primary-color);
                background: var(--obap-primary-color);
                text-overflow: ellipsis;
                white-space: nowrap;
                overflow: hidden;
                box-sizing: border-box;
            }
        `];
    }
    
    render() {
        return html`
            <div class="container">
                <div class="title">Horizontal</div>
                <div class="row">
                    <obap-splitter-container orientation="horizontal" show-handle>
                        <div class="content">first</div>
                        <div class="content">second</div>
                        <div class="content">third</div>
                        <div class="content">fourth</div>
                    </obap-splitter-container>
                </div>

                <div class="title">Vertical</div>
                <div class="row">
                    <obap-splitter-container orientation="vertical" show-handle>
                        <div class="content">first</div>
                        <div class="content">second</div>
                        <div class="content">third</div>
                        <div class="content">fourth</div>
                    </obap-splitter-container>
                </div>
            </div>
        `;
    }
}

window.customElements.define('splitter-container-demo', SplitterContainerDemo);