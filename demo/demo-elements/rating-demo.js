/*
@license
Copyright (c) 2021 Paul H Mason. All rights reserved.
*/
import { html, css, ObapElement } from '../../src/obap-element/obap-element.js';
import '../../src/obap-rating/obap-rating.js';

export class RatingDemo extends ObapElement {
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
              padding: 8px 0 16px 0;
            }

            .custom {
                --obap-rating-color: var(--obap-accent-color);
                --obap-rating-size: 24px;
                --obap-rating-separation: 8px;
            }
        `];
    }
    
    render() {
        return html`
            <div class="container">
                <div class="title">Full Star</div>
                <div class="row">
                    <obap-rating count="5" rating="3"></obap-rating>
                </div>

                <div class="title">Half Star</div>
                <div class="row">
                    <obap-rating count="5" rating="2.5" allow-half @obap-rating-change="${this._handleRatingChange}"></obap-rating>
                </div>

                <div class="title">Hearts</div>
                <div class="row">
                    <obap-rating heart count="5" rating="2.5" allow-half></obap-rating>
                </div>

                <div class="title">Custom Styling</div>
                <div class="row">
                    <obap-rating class="custom" count="5" rating="2.5" allow-half></obap-rating>
                </div>

                <div class="title">Read Only</div>
                <div class="row">
                    <obap-rating class="custom" count="5" rating="2.5" allow-half read-only></obap-rating>
                </div>

                <div class="title">Disabled</div>
                <div class="row">
                    <obap-rating class="custom" count="5" rating="2.5" allow-half disabled></obap-rating>
                </div>

                <div class="title">Lots of Stars</div>
                <div class="row">
                    <obap-rating count="15" rating="2.5" allow-half></obap-rating>
                </div>
            </div>
        `;
    }

    _handleRatingChange(e) {
        //console.log(`${e.detail.oldValue} -> ${e.detail.newValue}`);
    }
}

window.customElements.define('rating-demo', RatingDemo);