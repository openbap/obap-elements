/*
@license
Copyright (c) 2020 Paul H Mason. All rights reserved.
*/
import { html, css, ObapElement } from '../../src/obap-element/obap-element.js';
import '../../src/obap-slider/obap-slider.js';

export class SliderDemo extends ObapElement {
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
              padding: 16px;
              margin-bottom: 8px;
            }

            obap-slider {
                width : 500px;
            }
        `];
    }

    static get properties() {
        return {
            stops: {
                type: Array
            }
        }
    }

    constructor() {
        super();
        this.stops = [0, 25, 50, 75, 100];
    }
    
    render() {
        return html` 
            <div class="container">
                <div class="title">Single Value - Continuous</div>
                <div class="row">
                    <obap-slider show-floating-label min-value="0" max-value="200" value="25"></obap-slider>
                </div>

                <div class="title">Range Value - Continuous</div>
                <div class="row">
                    <obap-slider show-floating-label range min-value="0" max-value="100" start-value="25"  end-value="50"></obap-slider>
                </div>

                <div class="title">Single Value - Discrete</div>
                <div class="row">
                    <obap-slider show-floating-label min-value="0" max-value="100" value="25" .stops="${this.stops}" discrete></obap-slider>
                </div>

                <div class="title">Range Value - Discrete</div>
                <div class="row">
                    <obap-slider show-floating-label range min-value="0" max-value="100" start-value="25"  end-value="50" .stops="${this.stops}" discrete></obap-slider>
                </div>

                <div class="title">Single Value - Marker Labels</div>
                <div class="row">
                    <obap-slider show-floating-label min-value="0" max-value="100" value="25" .stops="${this.stops}" show-stop-labels></obap-slider>
                </div>

                <div class="title">Range Value - Marker Labels</div>
                <div class="row">
                    <obap-slider show-floating-label range min-value="0" max-value="100" start-value="25"  end-value="50" .stops="${this.stops}" show-stop-labels></obap-slider>
                </div>

                <div class="title">End Icons & Values</div>
                <div class="row">
                    <obap-slider show-floating-label start-icon="android" end-icon="face" show-start-label show-end-label range min-value="0" max-value="100" start-value="25"  end-value="50" .stops="${this.stops}"></obap-slider>
                </div>

                <div class="row">
                    <obap-slider show-floating-label show-start-label show-end-label range min-value="0" max-value="100" start-value="25"  end-value="50" .stops="${this.stops}"></obap-slider>
                </div>
            </div>
        `;
    }
}

window.customElements.define('slider-demo', SliderDemo);