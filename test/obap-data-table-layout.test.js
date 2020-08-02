/*
@license
Copyright (c) 2020 Paul H Mason. All rights reserved.
*/
import { fixture, expect, nextFrame, oneEvent } from '@open-wc/testing';
import { html, css, svg, ObapElement } from '../src/obap-element/obap-element.js';
import '../src/obap-data-table-layout/obap-data-table-layout.js';

describe('obap-data-table-layout', () => {
    it('can be created', async () => {     
        const el = await buildUi();
        await nextFrame();

        expect(el).to.not.equal(null);
        expect(el.tagName.toLowerCase()).to.equal('obap-data-table-layout');
    });

    it('determines the scroll areas', async () => {     
        const el = await buildUi();
        await nextFrame();

        expect(el._vElements.length).to.equal(5);
        expect(el._hElements.length).to.equal(3);
    });

    it('can scroll vertically', async () => {     
        const el = await buildUi();
        await nextFrame();
        expect(el._vElements.length).to.equal(5);
        el._vElements[2].scrollTop = 50; 
               
        await nextFrame();
        expect(el._vElements[0].scrollTop).to.equal(50);
        expect(el._vElements[1].scrollTop).to.equal(50);
        expect(el._vElements[2].scrollTop).to.equal(50);
    });

    it('can debounce vertical scroll events for dependent areas', async () => {     
        const el = await buildUi();
        await nextFrame();
        expect(el._vElements.length).to.equal(5);
        el._vElements[2]._ignoreTopScroll = true;
        el._vElements[2].scrollTop = 50; 
               
        await nextFrame();
        expect(el._vElements[0].scrollTop).to.equal(0);
        expect(el._vElements[1].scrollTop).to.equal(0);
        expect(el._vElements[2].scrollTop).to.equal(50);
    });

    it('can scroll horizontally', async () => {     
        const el = await buildUi();
        await nextFrame();
        expect(el._hElements.length).to.equal(3);
        el._hElements[1].scrollLeft = 50; 
               
        await nextFrame();
        expect(el._hElements[0].scrollLeft).to.equal(50);
        expect(el._hElements[1].scrollLeft).to.equal(50);
        expect(el._hElements[2].scrollLeft).to.equal(50);
    });

    it('can debounce horizontal scroll events for dependent areas', async () => {     
        const el = await buildUi();
        await nextFrame();
        expect(el._hElements.length).to.equal(3);
        el._hElements[1]._ignoreLeftScroll = true;
        el._hElements[1].scrollLeft = 50; 
               
        await nextFrame();
        expect(el._hElements[0].scrollLeft).to.equal(0);
        expect(el._hElements[1].scrollLeft).to.equal(50);
        expect(el._hElements[2].scrollLeft).to.equal(0);
    });

    it('supports partial parts', async () => {     
        const el = await buildSmallUi();
        await nextFrame();

        expect(el._vElements.length).to.equal(5);
        expect(el._hElements.length).to.equal(3);
    });

    it('supports Firefox weirdness', async () => {     
        const el = await buildFFUi();

        await nextFrame();
        el._scrollbarStyle = true;
        await nextFrame();

        expect(el._vElements.length).to.equal(5);
        expect(el._hElements.length).to.equal(3);
    });
});


/* Helper Functions */
async function buildUi() {
    return await fixture(html`
        <obap-data-table-layout>
            <div class="header part" slot="header">header</div>

            <div class="header-fixed-left part fixed" slot="header-fixed-left">header-fixed-left</div>  
            <div class="body-fixed-left part fixed large-v" slot="body-fixed-left">body-fixed-left</div> 
            <div class="footer-fixed-left part fixed" slot="footer-fixed-left">footer-fixed-left</div>

            <div class="header-scroll fixed part large-h" slot="header-scroll">header-scroll</div>  
            <div class="body-scroll part large-h large-v" slot="body-scroll">body-scroll</div> 
            <div class="footer-scroll part large-h" slot="footer-scroll">footer-scroll</div>

            <div class="header-fixed-right part fixed" slot="header-fixed-right">header-fixed-right</div>
            <div class="body-fixed-right part fixed large-v" slot="body-fixed-right">body-fixed-right</div>
            <div class="footer-fixed-right part fixed" slot="footer-fixed-right">footer-fixed-right</div>

            <div class="footer part" slot="footer">footer</div>
        </obap-data-table-layout>

        <style>
                obap-data-table-layout {
                    --obap-data-table-layout-background-color: var(--obap-block-color, #ECECEC);
                    width: 1000px;
                    height: 400px;
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
                    background: white;
                }

                .fixed {
                    background: #ECECEC;
                }

                .large-h {
                    width: 2000px;
                }

                .large-v {
                    height: 3000px;
                }

                .header, .footer {
                    color: var(--obap-on-primary-color);
                    background: var(--obap-primary-color);
                }
            </style>
    `);
}

async function buildSmallUi() {
    return await fixture(html`
        <obap-data-table-layout>
            <div class="header part" slot="header">header</div>

            <div class="header-fixed-left part fixed" slot="header-fixed-left">header-fixed-left</div>  
            <div class="body-fixed-left part fixed large-v" slot="body-fixed-left">body-fixed-left</div> 

            <div class="header-scroll fixed part large-h" slot="header-scroll">header-scroll</div>  
            <div class="body-scroll part large-h large-v" slot="body-scroll">body-scroll</div> 

            <div class="footer part" slot="footer">footer</div>
        </obap-data-table-layout>

        <style>
                obap-data-table-layout {
                    --obap-data-table-layout-background-color: var(--obap-block-color, #ECECEC);
                    width: 1000px;
                    height: 400px;
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
                    background: white;
                }

                .fixed {
                    background: #ECECEC;
                }

                .large-h {
                    width: 2000px;
                }

                .large-v {
                    height: 3000px;
                }

                .header, .footer {
                    color: var(--obap-on-primary-color);
                    background: var(--obap-primary-color);
                }
            </style>
    `);
}

async function buildFFUi() {
    return await fixture(html`
        <obap-data-table-layout>
            <div class="header-fixed-left" slot="header-fixed-left"></div>
            <div class="body-fixed-left" slot="body-fixed-left"></div>
            <div id="header-scroll" class="header-scroll" slot="header-scroll"></div>
            <div class="body-scroll" slot="body-scroll"></div>
        </obap-data-table-layout>

        <style>
                obap-data-table-layout {
                    --obap-data-table-layout-background-color: var(--obap-block-color, #ECECEC);
                    width: 1000px;
                    height: 400px;
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
                    background: white;
                }

                .fixed {
                    background: #ECECEC;
                }

                .large-h {
                    width: 2000px;
                }

                .large-v {
                    height: 3000px;
                }

                .header, .footer {
                    color: var(--obap-on-primary-color);
                    background: var(--obap-primary-color);
                }
            </style>
    `);
}