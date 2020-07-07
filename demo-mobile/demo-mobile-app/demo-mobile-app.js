/*
@license
Copyright (c) 2020 Paul H Mason. All rights reserved.
*/
import { html, css, ObapElement } from '../../src/obap-element/obap-element.js';
import '../../src/obap-application/obap-mobile-application.js';
import { ObapThemeController, themeManager } from '../../src/obap-styles/obap-theme-controller.js';
import './imports.js';

export class DemoMobileApp extends ObapThemeController(ObapElement) {
    static get styles() {
        return [css`
            :host {
                display: block;
                overflow: hidden;
            }
    
            :host([hidden]) {
                display: none !important;
            }
    
            :host([disabled]) {
                pointer-events: none;
            }

            obap-mobile-application {
                height: 100%;
            }

            .content {
                height: 100%;
                display: flex;
                flex-direction: column;
                justify-content: center;
                align-items: center;
            }

            .demo {
                
            }

            obap-application-content {
                background: var(--obap-window-color);
            }
        `];
    }

    constructor() {
        super();
        themeManager.create('green', '#80e27e', '#4caf50', '#087f23', '#ffc107', '#FAFAFA');
        themeManager.apply('default');
    }
    
    render() {
        return html`
            <obap-mobile-application label="OBAP Elements" icon="app:polymer">
                <obap-application-view name="styles" label="Styles" icon="app:styles" hide-sub-view-scroll-buttons>
                    <obap-application-content name="styles-elevation" label="Elevation"><demo-styles-elevation class="demo"></demo-styles-elevation></obap-application-content>
                    <obap-application-content name="styles-iconography" label="Iconography"><demo-styles-iconography class="demo"></demo-styles-iconography></obap-application-content>
                    <obap-application-content name="styles-theming" label="Theming"><demo-styles-theming class="demo"></demo-styles-theming></obap-application-content>
                    <obap-application-content name="styles-typography" label="Typography"><demo-styles-typography class="demo"></demo-styles-typography></obap-application-content>
                </obap-application-view>

                <obap-application-view name="buttons" label="Buttons" icon="app:buttons" hide-sub-view-scroll-buttons>
                    <obap-application-content name="buttons-normal" label="Normal"><demo-buttons-normal class="demo"></demo-buttons-normal></obap-application-content>
                    <obap-application-content name="buttons-fab" label="Fab"><demo-buttons-fab class="demo"></demo-buttons-fab></obap-application-content>
                    <obap-application-content name="buttons-custom" label="Custom"><demo-buttons-custom class="demo"></demo-buttons-custom></obap-application-content>
                </obap-application-view>

                <obap-application-view name="cards" label="Cards" icon="app:cards" hide-sub-view-scroll-buttons>
                    <obap-application-content><div class="content">Cards</div></obap-application-content>
                </obap-application-view>

                <obap-application-view name="chips" label="Chips" icon="app:chips" hide-sub-view-scroll-buttons>
                    <obap-application-content><div class="content">Chips</div></obap-application-content>
                </obap-application-view>

                <obap-application-view name="data-tables" label="Data Tables" icon="app:data-tables" hide-sub-view-scroll-buttons>
                    <obap-application-content><demo-tables class="demo"></demo-tables></obap-application-content>
                </obap-application-view>

                <obap-application-view name="dialogs" label="Dialogs" icon="app:dialogs" hide-sub-view-scroll-buttons>
                    <obap-application-content><demo-dialogs class="demo"></demo-dialogs></obap-application-content>
                </obap-application-view>

                <obap-application-view name="progress-indicators" label="Progress Indicators" icon="app:progress-indicators" hide-sub-view-scroll-buttons>
                    <obap-application-content><div class="content">Progress Indicators</div></obap-application-content>
                </obap-application-view>

                <obap-application-view name="selection" label="Selection Controls" icon="app:selection" hide-sub-view-scroll-buttons>
                    <obap-application-content><div class="content">Selection Controls</div></obap-application-content>
                </obap-application-view>

                <obap-application-view name="charts-sparkline" label="Sparkline Charts" icon="app:charts" hide-sub-view-scroll-buttons>
                    <obap-application-content name="line" label="Line"><demo-sparkline-line class="demo"></demo-sparkline-line></obap-application-content>
                    <obap-application-content name="bar" label="Bar"><demo-sparkline-bar class="demo"></demo-sparkline-bar></obap-application-content>
                    <obap-application-content name="pie" label="Pie & Donut"><demo-sparkline-pie class="demo"></demo-sparkline-pie></obap-application-content>
                    <obap-application-content name="winloss" label="Win-Loss"><demo-sparkline-winloss class="demo"></demo-sparkline-winloss></obap-application-content>
                    <obap-application-content name="bullet" label="Bullet"><demo-sparkline-bullet class="demo"></demo-sparkline-bullet></obap-application-content>
                </obap-application-view>

                <obap-application-view name="tabs" label="Tabs" icon="app:tabs" hide-sub-view-scroll-buttons>
                    <obap-application-content><div class="content">Tabs</div></obap-application-content>
                </obap-application-view>

                <obap-application-view name="tooltips-callouts" label="Tooltips & Callouts" icon="app:tooltips-callouts" hide-sub-view-scroll-buttons>
                    <obap-application-content><div class="content">Tooltips & Callouts</div></obap-application-content>
                </obap-application-view>
            </obap-mobile-application>
        `;
    }
}

window.customElements.define('demo-mobile-app', DemoMobileApp);
