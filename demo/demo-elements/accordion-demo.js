/*
@license
Copyright (c) 2020 Paul H Mason. All rights reserved.
*/
import { html, css, ObapElement } from '../../src/obap-element/obap-element.js';
import '../../src/obap-accordion/obap-accordion.js';

export class AccordionDemo extends ObapElement {
    static get styles() {
        return [css`
            :host {
                display: block;
            }
    
            .container {
                height: 100%;
                display: flex;
                flex-direction: row;
                flex-wrap: wrap;
            }

            .title {
                padding: 4px 8px;
                margin-bottom: 4px;
                color: var(--obap-on-primary-color);
                background: var(--obap-primary-color);
            }

            .demo {
                margin-right: 8px;
            }

            .row {
              display: flex;
              flex-direction: row;
              flex-wrap: wrap;
              align-items: center;
              padding: 0;
            }

            .content {
                padding: 8px 16px;
                background: var(--obap-block-color);
            }

            obap-accordion {
                width: 300px;
                border: 1px solid var(--obap-divider-on-surface-color);
                margin-bottom: 4px;
            }
        `];
    }
    
    render() {
        return html`
            <div class="container">
                <div class="demo">
                    <div class="title">Single Expand</div>
                    <div class="row">
                        <obap-accordion>
                            <obap-expandable-card icon="android" label="Item 1">
                                <div class="content">
                                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam suscipit consectetur est, eget lacinia quam tristique id. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Proin ullamcorper porttitor tellus. Nulla quis leo elit. Nulla egestas, mauris vel rhoncus vehicula, erat turpis elementum mauris, ut blandit felis ante eget nunc. Integer pellentesque eros tincidunt, tincidunt tellus non, dignissim tellus. Phasellus accumsan gravida bibendum. Etiam dignissim lorem a magna sagittis vehicula. Fusce eget ultricies metus, laoreet convallis est.
                                </div>
                            </obap-expandable-card>

                            <obap-expandable-card icon="bug-report" label="Item 2">
                                <div class="content">
                                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam suscipit consectetur est, eget lacinia quam tristique id. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Proin ullamcorper porttitor tellus. Nulla quis leo elit. Nulla egestas, mauris vel rhoncus vehicula, erat turpis elementum mauris, ut blandit felis ante eget nunc. Integer pellentesque eros tincidunt, tincidunt tellus non, dignissim tellus. Phasellus accumsan gravida bibendum. Etiam dignissim lorem a magna sagittis vehicula. Fusce eget ultricies metus, laoreet convallis est.
                                </div>
                            </obap-expandable-card>

                            <obap-expandable-card icon="face" label="Item 3">
                                <div class="content">
                                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam suscipit consectetur est, eget lacinia quam tristique id. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Proin ullamcorper porttitor tellus. Nulla quis leo elit. Nulla egestas, mauris vel rhoncus vehicula, erat turpis elementum mauris, ut blandit felis ante eget nunc. Integer pellentesque eros tincidunt, tincidunt tellus non, dignissim tellus. Phasellus accumsan gravida bibendum. Etiam dignissim lorem a magna sagittis vehicula. Fusce eget ultricies metus, laoreet convallis est.
                                </div>
                            </obap-expandable-card>
                        </obap-accordion>
                    </div>
                </div>

                <div class="demo">
                    <div class="title">Multi Expand</div>
                    <div class="row">
                        <obap-accordion selector-type="multi">
                            <obap-expandable-card icon="android" label="Item 1">
                                <div class="content">
                                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam suscipit consectetur est, eget lacinia quam tristique id. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Proin ullamcorper porttitor tellus. Nulla quis leo elit. Nulla egestas, mauris vel rhoncus vehicula, erat turpis elementum mauris, ut blandit felis ante eget nunc. Integer pellentesque eros tincidunt, tincidunt tellus non, dignissim tellus. Phasellus accumsan gravida bibendum. Etiam dignissim lorem a magna sagittis vehicula. Fusce eget ultricies metus, laoreet convallis est.
                                </div>
                            </obap-expandable-card>

                            <obap-expandable-card icon="bug-report" label="Item 2">
                                <div class="content">
                                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam suscipit consectetur est, eget lacinia quam tristique id. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Proin ullamcorper porttitor tellus. Nulla quis leo elit. Nulla egestas, mauris vel rhoncus vehicula, erat turpis elementum mauris, ut blandit felis ante eget nunc. Integer pellentesque eros tincidunt, tincidunt tellus non, dignissim tellus. Phasellus accumsan gravida bibendum. Etiam dignissim lorem a magna sagittis vehicula. Fusce eget ultricies metus, laoreet convallis est.
                                </div>
                            </obap-expandable-card>

                            <obap-expandable-card icon="face" label="Item 3">
                                <div class="content">
                                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam suscipit consectetur est, eget lacinia quam tristique id. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Proin ullamcorper porttitor tellus. Nulla quis leo elit. Nulla egestas, mauris vel rhoncus vehicula, erat turpis elementum mauris, ut blandit felis ante eget nunc. Integer pellentesque eros tincidunt, tincidunt tellus non, dignissim tellus. Phasellus accumsan gravida bibendum. Etiam dignissim lorem a magna sagittis vehicula. Fusce eget ultricies metus, laoreet convallis est.
                                </div>
                            </obap-expandable-card>
                        </obap-accordion>
                    </div>
                </div>
            </div>
        `;
    }
}

window.customElements.define('accordion-demo', AccordionDemo);