/*
@license
Copyright (c) 2020 Paul H Mason. All rights reserved.
*/
import { html, fixture, expect, nextFrame, defineCE, unsafeStatic } from '@open-wc/testing';
import './test-element.js';
import '../src/obap-attached-element/obap-attached-element.js';

describe('obap-attached-element', () => {
    it('passes the a11y audit', async () => {
        const el = await fixture(html`
            <test-element>
                <div id="target"></div>
                <obap-attached-element for="target" anchor="top-right"><div class="badge"></div></obap-attached-element>
            </test-element>
        `);

        await expect(el.items[1]).shadowDom.to.be.accessible();
    });

    it('sets the target element by id', async () => {
        const el = await fixture(html`
            <test-element>
                <div id="target"></div>
                <obap-attached-element for="target" anchor="top-right"><div class="badge"></div></obap-attached-element>
            </test-element>
        `);
        //await nextFrame();
        const target = el.items[0];
        const attachedElement = el.items[1];

        await expect(attachedElement.targetElement).to.equal(target);
    });

    it('sets the target element to previous sibling if no id', async () => {
        const el = await fixture(html`
            <test-element>
                <div></div>
                <obap-attached-element anchor="top-right"><div class="badge"></div></obap-attached-element>
            </test-element>
        `);
        //await nextFrame();
        const target = el.items[0];
        const attachedElement = el.items[1];

        await expect(attachedElement.targetElement).to.equal(target);
    });

    it('sets the target element to the parent if no previous sibling or id', async () => {
        const el = await fixture(html`
            <test-element>
                <obap-attached-element anchor="top-right"><div class="badge"></div></obap-attached-element>
            </test-element>
        `);
        //await nextFrame();

        const attachedElement = el.items[0];

        await expect(attachedElement.targetElement).to.equal(el);
    });

    it('sets the default values', async () => {
        const el = await fixture(html`
            <test-element>
                <div id="target"></div>
                <obap-attached-element><div class="badge"></div></obap-attached-element>
            </test-element>
        `);
        
        await nextFrame();
        const attachedElement = el.items[1];

        await expect(attachedElement.anchor).to.equal('none');
        await expect(attachedElement.inset).to.equal('none');
        await expect(attachedElement.shift).to.equal('none');
        await expect(attachedElement.offsetX).to.equal(0);
        await expect(attachedElement.offsetY).to.equal(0);
        await expect(attachedElement.for).to.equal('');
    });

    it('sets anchor: none', async () => {
        const el = await fixture(html`
            <test-element>
                <div id="target" style="width: 100px; height: 100px;"></div>
                <obap-attached-element for="target"><div style="width: 20px; height: 20px;"></div></obap-attached-element>
            </test-element>
        `);
        
        await nextFrame();
        const target = el.items[0];
        const attachedElement = el.items[1];
        const rect = attachedElement.getBoundingClientRect()

        await expect(rect.top).to.equal(100);
        await expect(rect.left).to.equal(0);
    });

    it('sets anchor: top-left', async () => {
        const el = await fixture(html`
            <test-element>
                <div id="target" style="width: 100px; height: 100px;"></div>
                <obap-attached-element for="target" anchor="top-left"><div style="width: 20px; height: 20px;"></div></obap-attached-element>
            </test-element>
        `);
        
        await nextFrame();
        const target = el.items[0];
        const attachedElement = el.items[1];
        let rect = attachedElement.getBoundingClientRect();

        // Anchor
        await expect(rect.top).to.equal(-10);
        await expect(rect.left).to.equal(-10);

        // Inset
        attachedElement.inset = 'in';
        await nextFrame();
        rect = attachedElement.getBoundingClientRect()
        await expect(rect.top).to.equal(0);
        await expect(rect.left).to.equal(0);

        attachedElement.inset = 'out';
        await nextFrame();
        rect = attachedElement.getBoundingClientRect()
        await expect(rect.top).to.equal(-20);
        await expect(rect.left).to.equal(-20);

        //Shift
        attachedElement.inset = 'none';

        attachedElement.shift = 'left';
        await nextFrame();
        rect = attachedElement.getBoundingClientRect()
        await expect(rect.top).to.equal(-10);
        await expect(rect.left).to.equal(-30);

        attachedElement.shift = 'right';
        await nextFrame();
        rect = attachedElement.getBoundingClientRect()
        await expect(rect.top).to.equal(-10);
        await expect(rect.left).to.equal(10);
 
        attachedElement.shift = 'up';
        await nextFrame();
        rect = attachedElement.getBoundingClientRect()
        await expect(rect.top).to.equal(-30);
        await expect(rect.left).to.equal(-10);

        attachedElement.shift = 'down';
        await nextFrame();
        rect = attachedElement.getBoundingClientRect()
        await expect(rect.top).to.equal(10);
        await expect(rect.left).to.equal(-10);
    });

    it('sets anchor: top-right', async () => {
        const el = await fixture(html`
            <test-element>
                <div id="target" style="width: 100px; height: 100px;"></div>
                <obap-attached-element for="target" anchor="top-right"><div style="width: 20px; height: 20px;"></div></obap-attached-element>
            </test-element>
        `);
        
        await nextFrame();
        const target = el.items[0];
        const attachedElement = el.items[1];
        let rect = attachedElement.getBoundingClientRect();

        // Anchor
        await expect(rect.top).to.equal(-10);
        await expect(rect.left).to.equal(90);
        
        // Inset
        attachedElement.inset = 'in';
        await nextFrame();
        rect = attachedElement.getBoundingClientRect()
        await expect(rect.top).to.equal(0);
        await expect(rect.left).to.equal(80);

        attachedElement.inset = 'out';
        await nextFrame();
        rect = attachedElement.getBoundingClientRect()
        await expect(rect.top).to.equal(-20);
        await expect(rect.left).to.equal(100);
        
        //Shift
        attachedElement.inset = 'none';

        attachedElement.shift = 'left';
        await nextFrame();
        rect = attachedElement.getBoundingClientRect()
        await expect(rect.top).to.equal(-10);
        await expect(rect.left).to.equal(70);

        attachedElement.shift = 'right';
        await nextFrame();
        rect = attachedElement.getBoundingClientRect()
        await expect(rect.top).to.equal(-10);
        await expect(rect.left).to.equal(110);
 
        attachedElement.shift = 'up';
        await nextFrame();
        rect = attachedElement.getBoundingClientRect()
        await expect(rect.top).to.equal(-30);
        await expect(rect.left).to.equal(90);

        attachedElement.shift = 'down';
        await nextFrame();
        rect = attachedElement.getBoundingClientRect()
        await expect(rect.top).to.equal(10);
        await expect(rect.left).to.equal(90);
    });

    it('sets anchor: bottom-left', async () => {
        const el = await fixture(html`
            <test-element>
                <div id="target" style="width: 100px; height: 100px;"></div>
                <obap-attached-element for="target" anchor="bottom-left"><div style="width: 20px; height: 20px;"></div></obap-attached-element>
            </test-element>
        `);
        
        await nextFrame();
        const target = el.items[0];
        const attachedElement = el.items[1];
        let rect = attachedElement.getBoundingClientRect();

        // Anchor
        await expect(rect.top).to.equal(90);
        await expect(rect.left).to.equal(-10);
        
        // Inset
        attachedElement.inset = 'in';
        await nextFrame();
        rect = attachedElement.getBoundingClientRect()
        await expect(rect.top).to.equal(80);
        await expect(rect.left).to.equal(0);

        attachedElement.inset = 'out';
        await nextFrame();
        rect = attachedElement.getBoundingClientRect()
        await expect(rect.top).to.equal(100);
        await expect(rect.left).to.equal(-20);

        //Shift
        attachedElement.inset = 'none';

        attachedElement.shift = 'left';
        await nextFrame();
        rect = attachedElement.getBoundingClientRect()
        await expect(rect.top).to.equal(90);
        await expect(rect.left).to.equal(-30);

        attachedElement.shift = 'right';
        await nextFrame();
        rect = attachedElement.getBoundingClientRect()
        await expect(rect.top).to.equal(90);
        await expect(rect.left).to.equal(10);
 
        attachedElement.shift = 'up';
        await nextFrame();
        rect = attachedElement.getBoundingClientRect()
        await expect(rect.top).to.equal(70);
        await expect(rect.left).to.equal(-10);

        attachedElement.shift = 'down';
        await nextFrame();
        rect = attachedElement.getBoundingClientRect()
        await expect(rect.top).to.equal(110);
        await expect(rect.left).to.equal(-10);
    });

    it('sets anchor: bottom-right', async () => {
        const el = await fixture(html`
            <test-element>
                <div id="target" style="width: 100px; height: 100px;"></div>
                <obap-attached-element for="target" anchor="bottom-right"><div style="width: 20px; height: 20px;"></div></obap-attached-element>
            </test-element>
        `);
        
        await nextFrame();
        const target = el.items[0];
        const attachedElement = el.items[1];
        let rect = attachedElement.getBoundingClientRect();

        // Anchor
        await expect(rect.top).to.equal(90);
        await expect(rect.left).to.equal(90);
        
        // Inset
        attachedElement.inset = 'in';
        await nextFrame();
        rect = attachedElement.getBoundingClientRect()
        await expect(rect.top).to.equal(80);
        await expect(rect.left).to.equal(80);

        attachedElement.inset = 'out';
        await nextFrame();
        rect = attachedElement.getBoundingClientRect()
        await expect(rect.top).to.equal(100);
        await expect(rect.left).to.equal(100);

        //Shift
        attachedElement.inset = 'none';

        attachedElement.shift = 'left';
        await nextFrame();
        rect = attachedElement.getBoundingClientRect()
        await expect(rect.top).to.equal(90);
        await expect(rect.left).to.equal(70);

        attachedElement.shift = 'right';
        await nextFrame();
        rect = attachedElement.getBoundingClientRect()
        await expect(rect.top).to.equal(90);
        await expect(rect.left).to.equal(110);
 
        attachedElement.shift = 'up';
        await nextFrame();
        rect = attachedElement.getBoundingClientRect()
        await expect(rect.top).to.equal(70);
        await expect(rect.left).to.equal(90);

        attachedElement.shift = 'down';
        await nextFrame();
        rect = attachedElement.getBoundingClientRect()
        await expect(rect.top).to.equal(110);
        await expect(rect.left).to.equal(90);
    });

    it('sets anchor: middle-left', async () => {
        const el = await fixture(html`
            <test-element>
                <div id="target" style="width: 100px; height: 100px;"></div>
                <obap-attached-element for="target" anchor="middle-left"><div style="width: 20px; height: 20px;"></div></obap-attached-element>
            </test-element>
        `);
        
        await nextFrame();
        const target = el.items[0];
        const attachedElement = el.items[1];
        let rect = attachedElement.getBoundingClientRect();

        // Anchor
        await expect(rect.top).to.equal(40);
        await expect(rect.left).to.equal(-10);
        
        // Inset
        attachedElement.inset = 'in';
        await nextFrame();
        rect = attachedElement.getBoundingClientRect()
        await expect(rect.top).to.equal(40);
        await expect(rect.left).to.equal(0);

        attachedElement.inset = 'out';
        await nextFrame();
        rect = attachedElement.getBoundingClientRect()
        await expect(rect.top).to.equal(40);
        await expect(rect.left).to.equal(-20);

        //Shift
        attachedElement.inset = 'none';

        attachedElement.shift = 'left';
        await nextFrame();
        rect = attachedElement.getBoundingClientRect()
        await expect(rect.top).to.equal(40);
        await expect(rect.left).to.equal(-30);

        attachedElement.shift = 'right';
        await nextFrame();
        rect = attachedElement.getBoundingClientRect()
        await expect(rect.top).to.equal(40);
        await expect(rect.left).to.equal(10);
 
        attachedElement.shift = 'up';
        await nextFrame();
        rect = attachedElement.getBoundingClientRect()
        await expect(rect.top).to.equal(20);
        await expect(rect.left).to.equal(-10);

        attachedElement.shift = 'down';
        await nextFrame();
        rect = attachedElement.getBoundingClientRect()
        await expect(rect.top).to.equal(60);
        await expect(rect.left).to.equal(-10);
    });

    it('sets anchor: middle-right', async () => {
        const el = await fixture(html`
            <test-element>
                <div id="target" style="width: 100px; height: 100px;"></div>
                <obap-attached-element for="target" anchor="middle-right"><div style="width: 20px; height: 20px;"></div></obap-attached-element>
            </test-element>
        `);
        
        await nextFrame();
        const target = el.items[0];
        const attachedElement = el.items[1];
        let rect = attachedElement.getBoundingClientRect();

        // Anchor
        await expect(rect.top).to.equal(40);
        await expect(rect.left).to.equal(90);
        
        // Inset
        attachedElement.inset = 'in';
        await nextFrame();
        rect = attachedElement.getBoundingClientRect()
        await expect(rect.top).to.equal(40);
        await expect(rect.left).to.equal(80);

        attachedElement.inset = 'out';
        await nextFrame();
        rect = attachedElement.getBoundingClientRect()
        await expect(rect.top).to.equal(40);
        await expect(rect.left).to.equal(100);

        //Shift
        attachedElement.inset = 'none';

        attachedElement.shift = 'left';
        await nextFrame();
        rect = attachedElement.getBoundingClientRect()
        await expect(rect.top).to.equal(40);
        await expect(rect.left).to.equal(70);

        attachedElement.shift = 'right';
        await nextFrame();
        rect = attachedElement.getBoundingClientRect()
        await expect(rect.top).to.equal(40);
        await expect(rect.left).to.equal(110);
 
        attachedElement.shift = 'up';
        await nextFrame();
        rect = attachedElement.getBoundingClientRect()
        await expect(rect.top).to.equal(20);
        await expect(rect.left).to.equal(90);

        attachedElement.shift = 'down';
        await nextFrame();
        rect = attachedElement.getBoundingClientRect()
        await expect(rect.top).to.equal(60);
        await expect(rect.left).to.equal(90);
    });

    it('sets anchor: middle-top', async () => {
        const el = await fixture(html`
            <test-element>
                <div id="target" style="width: 100px; height: 100px;"></div>
                <obap-attached-element for="target" anchor="middle-top"><div style="width: 20px; height: 20px;"></div></obap-attached-element>
            </test-element>
        `);
        
        await nextFrame();
        const target = el.items[0];
        const attachedElement = el.items[1];
        let rect = attachedElement.getBoundingClientRect();

        // Anchor
        await expect(rect.top).to.equal(-10);
        await expect(rect.left).to.equal(40);
        
        // Inset
        attachedElement.inset = 'in';
        await nextFrame();
        rect = attachedElement.getBoundingClientRect()
        await expect(rect.top).to.equal(0);
        await expect(rect.left).to.equal(40);

        attachedElement.inset = 'out';
        await nextFrame();
        rect = attachedElement.getBoundingClientRect()
        await expect(rect.top).to.equal(-20);
        await expect(rect.left).to.equal(40);

        //Shift
        attachedElement.inset = 'none';

        attachedElement.shift = 'left';
        await nextFrame();
        rect = attachedElement.getBoundingClientRect()
        await expect(rect.top).to.equal(-10);
        await expect(rect.left).to.equal(20);

        attachedElement.shift = 'right';
        await nextFrame();
        rect = attachedElement.getBoundingClientRect()
        await expect(rect.top).to.equal(-10);
        await expect(rect.left).to.equal(60);

        attachedElement.shift = 'up';
        await nextFrame();
        rect = attachedElement.getBoundingClientRect()
        await expect(rect.top).to.equal(-30);
        await expect(rect.left).to.equal(40);

        attachedElement.shift = 'down';
        await nextFrame();
        rect = attachedElement.getBoundingClientRect()
        await expect(rect.top).to.equal(10);
        await expect(rect.left).to.equal(40);
    });

    it('sets anchor: middle-bottom', async () => {
        const el = await fixture(html`
            <test-element>
                <div id="target" style="width: 100px; height: 100px;"></div>
                <obap-attached-element for="target" anchor="middle-bottom"><div style="width: 20px; height: 20px;"></div></obap-attached-element>
            </test-element>
        `);
        
        await nextFrame();
        const target = el.items[0];
        const attachedElement = el.items[1];
        let rect = attachedElement.getBoundingClientRect();

        // Anchor
        await expect(rect.top).to.equal(90);
        await expect(rect.left).to.equal(40);
       
        // Inset
        attachedElement.inset = 'in';
        await nextFrame();
        rect = attachedElement.getBoundingClientRect()
        await expect(rect.top).to.equal(80);
        await expect(rect.left).to.equal(40);

        attachedElement.inset = 'out';
        await nextFrame();
        rect = attachedElement.getBoundingClientRect()
        await expect(rect.top).to.equal(100);
        await expect(rect.left).to.equal(40);

        //Shift
        attachedElement.inset = 'none';

        attachedElement.shift = 'left';
        await nextFrame();
        rect = attachedElement.getBoundingClientRect()
        await expect(rect.top).to.equal(90);
        await expect(rect.left).to.equal(20);

        attachedElement.shift = 'right';
        await nextFrame();
        rect = attachedElement.getBoundingClientRect()
        await expect(rect.top).to.equal(90);
        await expect(rect.left).to.equal(60);

        attachedElement.shift = 'up';
        await nextFrame();
        rect = attachedElement.getBoundingClientRect()
        await expect(rect.top).to.equal(70);
        await expect(rect.left).to.equal(40);

        attachedElement.shift = 'down';
        await nextFrame();
        rect = attachedElement.getBoundingClientRect()
        await expect(rect.top).to.equal(110);
        await expect(rect.left).to.equal(40);
    });

    it('sets anchor: center', async () => {
        const el = await fixture(html`
            <test-element>
                <div id="target" style="width: 100px; height: 100px;"></div>
                <obap-attached-element for="target" anchor="center"><div style="width: 20px; height: 20px;"></div></obap-attached-element>
            </test-element>
        `);
        
        await nextFrame();
        const target = el.items[0];
        const attachedElement = el.items[1];
        let rect = attachedElement.getBoundingClientRect();

        // Anchor
        await expect(rect.top).to.equal(40);
        await expect(rect.left).to.equal(40);
        
        // Inset
        attachedElement.inset = 'in';
        await nextFrame();
        rect = attachedElement.getBoundingClientRect()
        await expect(rect.top).to.equal(40);
        await expect(rect.left).to.equal(40);

        attachedElement.inset = 'out';
        await nextFrame();
        rect = attachedElement.getBoundingClientRect()
        await expect(rect.top).to.equal(40);
        await expect(rect.left).to.equal(40);

        //Shift
        attachedElement.inset = 'none';

        attachedElement.shift = 'left';
        await nextFrame();
        rect = attachedElement.getBoundingClientRect()
        await expect(rect.top).to.equal(40);
        await expect(rect.left).to.equal(20);

        attachedElement.shift = 'right';
        await nextFrame();
        rect = attachedElement.getBoundingClientRect()
        await expect(rect.top).to.equal(40);
        await expect(rect.left).to.equal(60);

        attachedElement.shift = 'up';
        await nextFrame();
        rect = attachedElement.getBoundingClientRect()
        await expect(rect.top).to.equal(20);
        await expect(rect.left).to.equal(40);

        attachedElement.shift = 'down';
        await nextFrame();
        rect = attachedElement.getBoundingClientRect()
        await expect(rect.top).to.equal(60);
        await expect(rect.left).to.equal(40);
    });

    it('applies offsets correctly via attribute', async () => {
        const el = await fixture(html`
            <test-element>
                <div id="target" style="width: 100px; height: 100px;"></div>
                <obap-attached-element for="target" anchor="center" offset-x="5" offset-y="5"><div style="width: 20px; height: 20px;"></div></obap-attached-element>
            </test-element>
        `);
        
        await nextFrame();
        const target = el.items[0];
        const attachedElement = el.items[1];
        let rect = attachedElement.getBoundingClientRect();

        // Anchor
        await expect(rect.top).to.equal(45);
        await expect(rect.left).to.equal(45);
    });

    it('applies offsets correctly via property', async () => {
        const el = await fixture(html`
            <test-element>
                <div id="target" style="width: 100px; height: 100px;"></div>
                <obap-attached-element for="target" anchor="center"><div style="width: 20px; height: 20px;"></div></obap-attached-element>
            </test-element>
        `);
        
        await nextFrame();
        const target = el.items[0];
        const attachedElement = el.items[1];
        attachedElement.offsetX = 5;
        attachedElement.offsetY = 5;
        await nextFrame();
        let rect = attachedElement.getBoundingClientRect();

        // Anchor
        await expect(rect.top).to.equal(45);
        await expect(rect.left).to.equal(45);
    });

    it('repositions on window size change', async () => {
        const el = await fixture(html`
            <test-element>
                <div></div>
                <obap-attached-element anchor="top-right"><div class="badge"></div></obap-attached-element>
            </test-element>
        `);
        //await nextFrame();
        
        const target = el.items[0];
        const attachedElement = el.items[1];
        attachedElement._handleResizeEvent();

        await expect(attachedElement.targetElement).to.equal(target);
    });
});