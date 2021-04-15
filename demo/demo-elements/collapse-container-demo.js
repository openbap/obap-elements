/*
@license
Copyright (c) 2021 Paul H Mason. All rights reserved.
*/
import { html, css, ObapElement } from '../../src/obap-element/obap-element.js';
import '../../src/obap-collapse-container/obap-vertical-collapse-container.js';
import '../../src/obap-collapse-container/obap-horizontal-collapse-container.js';
import '../../src/obap-button/obap-button.js';

export class CollapseContainerDemo extends ObapElement {
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

              padding: 16px;
            }

            .primary {
                --obap-button-ripple-color: var(--obap-on-primary-color);
                --obap-button-color: var(--obap-on-primary-color);
                --obap-button-background-color: var(--obap-primary-color);
            }

            .content-vertical {
                width: 300px;
                border: 1px solid lightgrey;
                padding: 4px;
            }

            .content-horizontal {
                height: 100px;
                border: 1px solid lightgrey;
                padding: 4px;
            }
        `];
    }
    
    render() {
        return html`
            <div class="container">
                <div class="title">Vertical</div>
                <div class="row">
                    <obap-button class="primary" label="toggle" @click="${this._toggleVertical}" raised></obap-button>
                    <obap-vertical-collapse-container id="cc1">
                        <div class="content-vertical">
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam suscipit consectetur est, eget lacinia quam tristique id. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Proin ullamcorper porttitor tellus. Nulla quis leo elit. Nulla egestas, mauris vel rhoncus vehicula, erat turpis elementum mauris, ut blandit felis ante eget nunc. Integer pellentesque eros tincidunt, tincidunt tellus non, dignissim tellus. Phasellus accumsan gravida bibendum. Etiam dignissim lorem a magna sagittis vehicula. Fusce eget ultricies metus, laoreet convallis est. Praesent nunc sapien, suscipit ultricies commodo vitae, semper id enim.
                        </div>
                    </obap-vertical-collapse-container>
                </div>

                <div class="title">Horizontal</div>
                <div class="row">
                    <obap-button class="primary" label="toggle" @click="${this._toggleHorizontal}" raised></obap-button>
                    <obap-horizontal-collapse-container id="cc2">
                        <div class="content-horizontal">
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam suscipit consectetur est, eget lacinia quam tristique id. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Proin ullamcorper porttitor tellus. Nulla quis leo elit. Nulla egestas, mauris vel rhoncus vehicula, erat turpis elementum mauris, ut blandit felis ante eget nunc. Integer pellentesque eros tincidunt, tincidunt tellus non, dignissim tellus. Phasellus accumsan gravida bibendum. Etiam dignissim lorem a magna sagittis vehicula. Fusce eget ultricies metus, laoreet convallis est. Praesent nunc sapien, suscipit ultricies commodo vitae, semper id enim.
                        </div>
                    </obap-horizontal-collapse-container>
                </div>
            </div>
        `;
    }

    _toggleVertical(e) {
        const cc = this.renderRoot.getElementById('cc1');
        cc.toggle();
    }

    _toggleHorizontal(e) {
        const cc = this.renderRoot.getElementById('cc2');
        cc.toggle();
    }
}

window.customElements.define('collapse-container-demo', CollapseContainerDemo);