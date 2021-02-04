/*
@license
Copyright (c) 2021 Paul H Mason. All rights reserved.
*/
import { html, css, ObapElement } from '../../src/obap-element/obap-element.js';
import '../../src/obap-splitter/obap-splitter.js';

export class SplitterDemo extends ObapElement {
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
              padding-bottom: 8px;
            }

            obap-splitter {
                --obap-splitter-color: var(--obap-primary-light-color);
                --obap-splitter-handle-color: var(--obap-primary-color);
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
            }

            .horizontal-content {
                overflow: hidden;
                display: flex;
                width: 412px
            }

            .vertical-content {
                overflow: hidden;
                display: flex;
                flex-direction: column;
            }

            .nested-content {
                display: flex;
                width: 408px;
                height: 204px;
            }

            .content-side {
                width: 100px;
                height: 100%;
                display: flex;
                flex-direction: column;
                justify-content: center;
                align-items: center;
                color: var(--obap-on-primary-color);
                background: var(--obap-primary-color);
                text-overflow: ellipsis;
                white-space: nowrap;
                overflow: hidden;
            }

            .content-middle {
                width: 100%;
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
            }

            .content-main {
                display: flex;
                flex-direction: column;
                width: 200px;
                height: 100%;
            }
        `];
    }
    
    render() {
        return html`
            <div class="container">
                <div class="title">Horizontal</div>
                <div class="row">
                    <div class="horizontal-content">
                        <div class="content">first</div>
                        <obap-splitter show-handle></obap-splitter>
                        <div class="content">second</div>
                        <obap-splitter show-handle></obap-splitter>
                        <div class="content">third</div>
                        <obap-splitter show-handle></obap-splitter>
                        <div class="content">fourth</div>
                    </div>
                </div>

                <div class="title">Vertical</div>
                <div class="row">
                    <div class="vertical-content">
                        <div class="content">first</div>
                        <obap-splitter show-handle orientation="horizontal"></obap-splitter>
                        <div class="content">second</div>
                        <obap-splitter show-handle orientation="horizontal"></obap-splitter>
                        <div class="content">third</div>
                        <obap-splitter show-handle orientation="horizontal"></obap-splitter>
                        <div class="content">fourth</div>
                    </div>
                </div>

                <div class="title">Nested</div>
                <div class="row">
                    <div class="nested-content">
                        <div class="content-side">left</div>
                        <obap-splitter show-handle></obap-splitter>
                        <div class="content-main">
                            <div class="content-middle">top</div>
                            <obap-splitter show-handle orientation="horizontal"></obap-splitter>
                            <div class="content-middle">bottom</div>
                        </div>
                        <obap-splitter show-handle></obap-splitter>
                        <div class="content-side">right</div>
                    </div>
                </div>
            </div>
        `;
    }
}

window.customElements.define('splitter-demo', SplitterDemo);