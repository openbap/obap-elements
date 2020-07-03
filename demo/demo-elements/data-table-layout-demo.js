/*
@license
Copyright (c) 2020 Paul H Mason. All rights reserved.
*/
import { html, css, ObapElement } from '../../src/obap-element/obap-element.js';
import '../../src/obap-data-table-layout/obap-data-table-layout.js';

export class DataTableLayoutDemo extends ObapElement {
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

            obap-data-table-layout {
                /*--obap-data-table-layout-background-color: var(--obap-block-color, #ECECEC);*/
                --obap-data-table-layout-grouper-color: var(--obap-on-primary-color);
                --obap-data-table-layout-grouper-background-color: var(--obap-primary-color);

                --obap-data-table-layout-header-fixed-left-color: inherit;
                --obap-data-table-layout-header-fixed-left-background-color: #E0E0E0;

                --obap-data-table-layout-header-scroll-color: inherit;
                --obap-data-table-layout-header-scroll-background-color: #E0E0E0;

                --obap-data-table-layout-header-fixed-right-color: inherit;
                --obap-data-table-layout-header-fixed-right-background-color: #E0E0E0;

                --obap-data-table-layout-body-fixed-left-color: inherit;
                --obap-data-table-layout-body-fixed-left-background-color: #E0E0E0;

                --obap-data-table-layout-body-scroll-color: inherit;
                --obap-data-table-layout-body-scroll-background-color: inherit;

                --obap-data-table-layout-body-fixed-right-color: inherit;
                --obap-data-table-layout-body-fixed-right-background-color: #E0E0E0;

                --obap-data-table-layout-footer-fixed-left-color: inherit;
                --obap-data-table-layout-footer-fixed-left-background-color: #E0E0E0;

                --obap-data-table-layout-footer-scroll-color: inherit;
                --obap-data-table-layout-footer-scroll-background-color: #E0E0E0;

                --obap-data-table-layout-footer-fixed-right-color: inherit;
                --obap-data-table-layout-footer-fixed-right-background-color: #E0E0E0;

                --obap-data-table-layout-pager-color: var(--obap-on-primary-color);
                --obap-data-table-layout-pager-background-color: var(--obap-primary-color);

                width: 1000px;
                height: 600px;
            }

            obap-data-table-layout > div {
                display: flex;
                flex-direction: column;
                justify-content: center;
                align-items: center;
                padding: 8px 16px;
                box-sizing: border-box;
            }

            .part {
                box-sizing: border-box;
                white-space: nowrap;
            }

            .header-scroll, .header-fixed-left, .header-fixed-right {
                border-bottom: 1px solid silver;
            }

            .footer-scroll, .footer-fixed-left, .footer-fixed-right {
                border-top: 1px solid silver;
            }

            .header-fixed-left, .body-fixed-left, .footer-fixed-left {
                border-right: 1px solid silver;
            }

            .header-fixed-right, .body-fixed-right, .footer-fixed-right {
                border-left: 1px solid silver;
            }

            .large-h {
                width: 2000px;
            }

            .large-v {
                height: 3000px;
            }
        `];
    }
    
    render() {
        return html`
            <div class="container">
                <div class="title">Demo</div>
                <div class="row">

                    <obap-data-table-layout>
                        <div class="grouper part" slot="grouper">grouper</div>

                        <div class="header-fixed-left part" slot="header-fixed-left">header-fixed-left</div>  
                        <div class="body-fixed-left part large-v" slot="body-fixed-left">body-fixed-left</div> 
                        <div class="footer-fixed-left part" slot="footer-fixed-left">footer-fixed-left</div>

                        <div class="header-scroll part large-h" slot="header-scroll">header-scroll</div>  
                        <div class="body-scroll part large-h large-v" slot="body-scroll">body-scroll</div> 
                        <div class="footer-scroll part large-h" slot="footer-scroll">footer-scroll</div>

                        <div class="header-fixed-right part" slot="header-fixed-right">header-fixed-right</div>
                        <div class="body-fixed-right part large-v" slot="body-fixed-right">body-fixed-right</div>
                        <div class="footer-fixed-right part" slot="footer-fixed-right">footer-fixed-right</div>
                        
                        <div class="pager part" slot="pager">pager</div>
                    </obap-data-table-layout>

                </div>
            </div>
        `;
    }
}

window.customElements.define('data-table-layout-demo', DataTableLayoutDemo);