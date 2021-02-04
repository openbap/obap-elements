/*
@license
Copyright (c) 2021 Paul H Mason. All rights reserved.
*/
import { html, css, ObapElement } from '../../src/obap-element/obap-element.js';
import '../../src/obap-banner/obap-banner.js';

export class BannerDemo extends ObapElement {
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
            }

            obap-banner {
                margin: 16px;
                outline: 1px solid lightgrey;
                
            }
        `];
    }
    
    render() {
        return html`
            <div class="container" @obap-banner-dismiss="${() => console.log('banner dismiss')}" @obap-banner-confirm="${() => console.log('banner confirm')}">
                <div class="title">Full Width</div>
                <div class="row">
                    <obap-banner dismiss-action="cancel" confirm-action="ok">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus sollicitudin ultricies rhoncus. Vestibulum convallis nunc viverra ligula efficitur varius. Curabitur nisi tortor, hendrerit non condimentum vel, tincidunt a dolor.
                    </obap-banner>
                </div>

                <div class="title">With Icon</div>
                <div class="row">
                    <obap-banner icon="android" dismiss-action="cancel" confirm-action="ok">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus sollicitudin ultricies rhoncus. Vestibulum convallis nunc viverra ligula efficitur varius. Curabitur nisi tortor, hendrerit non condimentum vel, tincidunt a dolor.
                    </obap-banner>
                </div>

                <div class="title">Text Wrapping</div>
                <div class="row">
                    <obap-banner icon="android" dismiss-action="cancel" confirm-action="ok" style="width: 400px;">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus sollicitudin ultricies rhoncus. Vestibulum convallis nunc viverra ligula efficitur varius. Curabitur nisi tortor, hendrerit non condimentum vel, tincidunt a dolor.
                    </obap-banner>
                </div>

                <div class="title">Actions</div>
                <div class="row">
                    <obap-banner icon="android" confirm-action="ok" style="width: 400px;">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus sollicitudin ultricies rhoncus. Vestibulum convallis nunc viverra ligula efficitur varius. Curabitur nisi tortor, hendrerit non condimentum vel, tincidunt a dolor.
                    </obap-banner>

                    <obap-banner icon="settings" dismiss-action="learn more" confirm-action="fix it" style="width: 400px;">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus sollicitudin ultricies rhoncus. Vestibulum convallis nunc viverra ligula efficitur varius. Curabitur nisi tortor, hendrerit non condimentum vel, tincidunt a dolor.
                    </obap-banner>
                </div>
            </div>
        `;
    }
}

window.customElements.define('banner-demo', BannerDemo);