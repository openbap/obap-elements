/*
@license
Copyright (c) 2020 Paul H Mason. All rights reserved.
*/
import { html, css, ObapElement } from '../../src/obap-element/obap-element.js';
import '../../src/obap-expandable-card/obap-expandable-card.js';

export class ExpandableCardDemo extends ObapElement {
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
              padding: 0;
            }

            .content {
                padding: 8px;
            }

            obap-expandable-card {
                width: 300px;
                outline: 1px solid #E0E0E0;
                transition: box-shadow 0.28s cubic-bezier(0.4, 0, 0.2, 1);
                box-shadow: 0;
            }

            obap-expandable-card[opened] {
                outline: 0;
                margin: 4px 0;
                box-shadow: 0 4px 5px 0 rgba(0, 0, 0, 0.14),
                            0 1px 10px 0 rgba(0, 0, 0, 0.12),
                            0 2px 4px -1px rgba(0, 0, 0, 0.4);
            }
        `];
    }
    
    render() {
        return html`
            <div class="container">
                <div class="title">Demo</div>
                <div class="row">
                    <obap-expandable-card icon="android" label="Item 1">
                        <div class="content">
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam suscipit consectetur est, eget lacinia quam tristique id. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Proin ullamcorper porttitor tellus. Nulla quis leo elit. Nulla egestas, mauris vel rhoncus vehicula, erat turpis elementum mauris, ut blandit felis ante eget nunc. Integer pellentesque eros tincidunt, tincidunt tellus non, dignissim tellus. Phasellus accumsan gravida bibendum. Etiam dignissim lorem a magna sagittis vehicula. Fusce eget ultricies metus, laoreet convallis est. Praesent nunc sapien, suscipit ultricies commodo vitae, semper id enim.
                        </div>
                    </obap-expandable-card>

                    <obap-expandable-card icon="bug-report" label="Item 2">
                        <div class="content">
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam suscipit consectetur est, eget lacinia quam tristique id. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Proin ullamcorper porttitor tellus. Nulla quis leo elit. Nulla egestas, mauris vel rhoncus vehicula, erat turpis elementum mauris, ut blandit felis ante eget nunc. Integer pellentesque eros tincidunt, tincidunt tellus non, dignissim tellus. Phasellus accumsan gravida bibendum. Etiam dignissim lorem a magna sagittis vehicula. Fusce eget ultricies metus, laoreet convallis est. Praesent nunc sapien, suscipit ultricies commodo vitae, semper id enim.
                        </div>
                    </obap-expandable-card>

                    <obap-expandable-card icon="face" label="Item 3">
                        <div class="content">
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam suscipit consectetur est, eget lacinia quam tristique id. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Proin ullamcorper porttitor tellus. Nulla quis leo elit. Nulla egestas, mauris vel rhoncus vehicula, erat turpis elementum mauris, ut blandit felis ante eget nunc. Integer pellentesque eros tincidunt, tincidunt tellus non, dignissim tellus. Phasellus accumsan gravida bibendum. Etiam dignissim lorem a magna sagittis vehicula. Fusce eget ultricies metus, laoreet convallis est. Praesent nunc sapien, suscipit ultricies commodo vitae, semper id enim.
                        </div>
                    </obap-expandable-card>
                </div>
            </div>
        `;
    }
}

window.customElements.define('expandable-card-demo', ExpandableCardDemo);