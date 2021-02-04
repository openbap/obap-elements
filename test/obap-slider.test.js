/*
@license
Copyright (c) 2021 Paul H Mason. All rights reserved.
*/
import { html, fixture, expect, oneEvent, nextFrame } from '@open-wc/testing';
import '../src/obap-slider/obap-slider.js';

describe('obap-slider', () => {
    function getStops() {
        return [
            { value: 0 },
            { value: 25 },
            { value: 50 },
            { value: 75 },
            { value: 100 }
        ];
    }

    function getCustomStops() {
        return [
            { value: 0, label: 'min' },
            { value: 25, label: 'small' },
            { value: 50, label: 'medium' },
            { value: 75, label: 'large' },
            { value: 100, label: 'max' }
        ];
    }

    /*
    it('passes the a11y audit', async () => {
        const el = await fixture(html`
            <obap-slider></obap-slider>
        `);

        await expect(el).shadowDom.to.be.accessible();
    });
    */

    it('can be created', async () => {
        const el = await fixture(html`
            <obap-slider></obap-slider>
        `);

        expect(el).to.not.equal(null);
    });

    it('ignores dupicate values in setters', async () => {
        const stops = getStops();

        const el = await fixture(html`
            <obap-slider min-value="0" max-value="100" value="25" start-value="25" end-value="50" .stops="${stops}" discrete></obap-slider>
        `);

        expect(el.value).to.equal(25);
        expect(el.startValue).to.equal(25);
        expect(el.endValue).to.equal(50);
        expect(el.stops).to.equal(stops);
        expect(el.discrete).to.equal(true);

        el.value = 25;
        el.startValue = 25;
        el.endValue = 50;
        el.stops = stops;
        el.discrete = true;

        await nextFrame();

        expect(el.value).to.equal(25);
        expect(el.startValue).to.equal(25);
        expect(el.endValue).to.equal(50);
        expect(el.stops).to.equal(stops);
        expect(el.discrete).to.equal(true);

        el.discrete = false;

        await nextFrame();
        expect(el.discrete).to.equal(false);
    });

    it('creates stops', async () => {
        const stops = getStops();

        const el = await fixture(html`
            <obap-slider min-value="0" max-value="100" value="25" .stops="${stops}"></obap-slider>
        `);

        await nextFrame();
        const stopItems = el.renderRoot.querySelectorAll('.stop');
        const stopLabels = el.renderRoot.querySelectorAll('.stop-label');

        expect(stopItems.length).to.equal(5);
        expect(stopLabels.length).to.equal(0);
    });

    it('creates stop labels', async () => {
        const stops = getStops();

        const el = await fixture(html`
            <obap-slider min-value="0" max-value="100" value="25" .stops="${stops}" show-stop-labels></obap-slider>
        `);

        await nextFrame();
        const stopItems = el.renderRoot.querySelectorAll('.stop');
        const stopLabels = el.renderRoot.querySelectorAll('.stop-label');

        expect(stopItems.length).to.equal(5);
        expect(stopLabels.length).to.equal(5);
    });

    it('creates stops for range', async () => {
        const stops = getStops();

        const el = await fixture(html`
            <obap-slider range min-value="0" max-value="100" start-value="25" end-value="50" .stops="${stops}"></obap-slider>
        `);

        await nextFrame();
        const stopItems = el.renderRoot.querySelectorAll('.stop');
        const stopLabels = el.renderRoot.querySelectorAll('.stop-label');

        expect(stopItems.length).to.equal(5);
        expect(stopLabels.length).to.equal(0);
    });

    it('creates stop labels for range', async () => {
        const stops = getStops();

        const el = await fixture(html`
            <obap-slider range min-value="0" max-value="100" start-value="25" end-value="50" .stops="${stops}" show-stop-labels></obap-slider>
        `);

        await nextFrame();
        const stopItems = el.renderRoot.querySelectorAll('.stop');
        const stopLabels = el.renderRoot.querySelectorAll('.stop-label');

        expect(stopItems.length).to.equal(5);
        expect(stopLabels.length).to.equal(5);
    });

    it('creates a thumb and floating label', async () => {
        const stops = getStops();

        const el = await fixture(html`
            <obap-slider min-value="0" max-value="100" value="25" .stops="${stops}" show-floating-label></obap-slider>
        `);

        await nextFrame();
        const thumbs = el.renderRoot.querySelectorAll('.thumb');
        const labels = el.renderRoot.querySelectorAll('.balloon');

        expect(thumbs.length).to.equal(1);
        expect(labels.length).to.equal(1);
    });

    it('creates two thumbs and floating labels for a range', async () => {
        const stops = getStops();

        const el = await fixture(html`
            <obap-slider range min-value="0" max-value="100" start-value="25" end-value="50" .stops="${stops}" show-floating-label></obap-slider>
        `);

        await nextFrame();
        const thumbs = el.renderRoot.querySelectorAll('.thumb');
        const labels = el.renderRoot.querySelectorAll('.balloon');

        expect(thumbs.length).to.equal(2);
        expect(labels.length).to.equal(2);
    });

    it('creates end icons and labels', async () => {
        const stops = getStops();

        const el = await fixture(html`
            <obap-slider range min-value="0" max-value="100" value="50" .stops="${stops}" show-start-label show-end-label show-start-icon show-end-icon start-icon="android" end-icon="android"></obap-slider>
        `);

        await nextFrame();
        const icons = el.renderRoot.querySelectorAll('.end-icon');
        const labels = el.renderRoot.querySelectorAll('.end-label');
        expect(icons.length).to.equal(2);
        expect(labels.length).to.equal(2);
    });

    it('snaps values in discrete mode', async () => {
        const stops = getStops();

        const el = await fixture(html`
            <obap-slider min-value="0" max-value="100" value="45" .stops="${stops}" style="width: 300px;"></obap-slider>
        `);

        await nextFrame();
        expect(el.value).to.equal(45);
        el.discrete = true;

        await nextFrame();
        expect(el.value).to.equal(50);
    });

    it('snaps values in discrete range mode', async () => {
        const stops = getStops();

        const el = await fixture(html`
            <obap-slider range min-value="0" max-value="100" start-value="45"  end-value="70" .stops="${stops}"></obap-slider>
        `);

        await nextFrame();
        expect(el.startValue).to.equal(45);
        expect(el.endValue).to.equal(70);
        el.discrete = true;

        await nextFrame();
        expect(el.startValue).to.equal(50);
        expect(el.endValue).to.equal(75);
    });

    it('displays stop labels', async () => {
        const stops = getStops();

        const el = await fixture(html`
            <obap-slider range min-value="0" max-value="100" value="45" .stops="${stops}" show-stop-labels></obap-slider>
        `);

        await nextFrame();
        const labels = el.renderRoot.querySelectorAll('.stop-label');
        expect(labels.length).to.equal(5);
    });

    it('displays custom stop labels', async () => {
        const stops = getCustomStops();

        const el = await fixture(html`
            <obap-slider min-value="0" max-value="100" value="45" .stops="${stops}" show-stop-labels></obap-slider>
        `);

        await nextFrame();
        const labels = el.renderRoot.querySelectorAll('.stop-label');
        expect(labels.length).to.equal(5);
    });

    it('displays stop labels for ranges', async () => {
        const stops = getStops();

        const el = await fixture(html`
            <obap-slider min-value="0" max-value="100" start-value="45"  end-value="70" .stops="${stops}" show-stop-labels></obap-slider>
        `);

        await nextFrame();
        const labels = el.renderRoot.querySelectorAll('.stop-label');
        expect(labels.length).to.equal(5);
    });

    it('displays custom stop labels for ranges', async () => {
        const stops = getCustomStops();

        const el = await fixture(html`
            <obap-slider range min-value="0" max-value="100" start-value="45"  end-value="70" .stops="${stops}" show-stop-labels></obap-slider>
        `);

        await nextFrame();
        const labels = el.renderRoot.querySelectorAll('.stop-label');
        expect(labels.length).to.equal(5);
    });

    it('displays start and end labels', async () => {
        const stops = getStops();

        const el = await fixture(html`
            <obap-slider range min-value="0" max-value="100" value="45" .stops="${stops}" show-start-label show-end-label></obap-slider>
        `);

        await nextFrame();
        const labels = el.renderRoot.querySelectorAll('.end-label');
        expect(labels.length).to.equal(2);
    });

    it('displays start and end icons', async () => {
        const stops = getStops();

        const el = await fixture(html`
            <obap-slider range min-value="0" max-value="100" value="45" .stops="${stops}" show-start-icon show-end-icon start-icon="android" end-icon="android"></obap-slider>
        `);

        await nextFrame();
        const icons = el.renderRoot.querySelectorAll('.end-icon');
        expect(icons.length).to.equal(2);
    });

    /* KEYBOARD EVENTS */
    it('supports keyboard navigation in single value mode', async () => {
        const stops = getStops();

        const el = await fixture(html`
            <obap-slider min-value="0" max-value="100" value="50" .stops="${stops}"></obap-slider>
        `);

        await nextFrame();

        const thumb = el.renderRoot.getElementById('thumb');
        expect(thumb).to.not.equal(null);
        thumb.focus();
        await nextFrame();
        expect(el.renderRoot.activeElement).to.equal(thumb);

        setTimeout(() => el.dispatchEvent(new KeyboardEvent('keydown', { 'key': 'ArrowUp' })));
        await nextFrame();
        expect(el.value).to.equal(51);

        setTimeout(() => el.dispatchEvent(new KeyboardEvent('keydown', { 'key': 'ArrowRight' })));
        await nextFrame();
        expect(el.value).to.equal(52);

        setTimeout(() => el.dispatchEvent(new KeyboardEvent('keydown', { 'key': 'PageUp' })));
        await nextFrame();
        expect(el.value).to.equal(53);

        setTimeout(() => el.dispatchEvent(new KeyboardEvent('keydown', { 'key': 'ArrowDown' })));
        await nextFrame();
        expect(el.value).to.equal(52);

        setTimeout(() => el.dispatchEvent(new KeyboardEvent('keydown', { 'key': 'ArrowLeft' })));
        await nextFrame();
        expect(el.value).to.equal(51);

        setTimeout(() => el.dispatchEvent(new KeyboardEvent('keydown', { 'key': 'PageDown' })));
        await nextFrame();
        expect(el.value).to.equal(50);

        setTimeout(() => el.dispatchEvent(new KeyboardEvent('keydown', { 'key': 'Home' })));
        await nextFrame();
        expect(el.value).to.equal(0);

        setTimeout(() => el.dispatchEvent(new KeyboardEvent('keydown', { 'key': 'End' })));
        await nextFrame();
        expect(el.value).to.equal(100);

        setTimeout(() => el.dispatchEvent(new KeyboardEvent('keydown', { 'key': 'Escape' })));
        await nextFrame();
        expect(el.renderRoot.activeElement).to.equal(null);

        setTimeout(() => el.dispatchEvent(new KeyboardEvent('keydown', { 'key': 'Escape' })));
        await nextFrame();
        expect(el.renderRoot.activeElement).to.equal(null);

        setTimeout(() => el.dispatchEvent(new KeyboardEvent('keydown', { 'key': 'A' })));
        await nextFrame();
        expect(el.renderRoot.activeElement).to.equal(null);
    });

    it('supports keyboard navigation in range value mode', async () => {
        const stops = getStops();

        const el = await fixture(html`
            <obap-slider range min-value="0" max-value="100" start-value="50" end-value="60" .stops="${stops}"></obap-slider>
        `);

        await nextFrame();

        const thumbStart = el.renderRoot.getElementById('thumb-start');
        const thumbEnd = el.renderRoot.getElementById('thumb-end');
        expect(thumbStart).to.not.equal(null);
        expect(thumbEnd).to.not.equal(null);

        // Start Thumb
        thumbStart.focus();
        await nextFrame();
        expect(el.renderRoot.activeElement).to.equal(thumbStart);

        setTimeout(() => el.dispatchEvent(new KeyboardEvent('keydown', { 'key': 'ArrowUp' })));
        await nextFrame();
        expect(el.startValue).to.equal(51);

        setTimeout(() => el.dispatchEvent(new KeyboardEvent('keydown', { 'key': 'ArrowRight' })));
        await nextFrame();
        expect(el.startValue).to.equal(52);

        setTimeout(() => el.dispatchEvent(new KeyboardEvent('keydown', { 'key': 'PageUp' })));
        await nextFrame();
        expect(el.startValue).to.equal(53);

        setTimeout(() => el.dispatchEvent(new KeyboardEvent('keydown', { 'key': 'ArrowDown' })));
        await nextFrame();
        expect(el.startValue).to.equal(52);

        setTimeout(() => el.dispatchEvent(new KeyboardEvent('keydown', { 'key': 'ArrowLeft' })));
        await nextFrame();
        expect(el.startValue).to.equal(51);

        setTimeout(() => el.dispatchEvent(new KeyboardEvent('keydown', { 'key': 'PageDown' })));
        await nextFrame();
        expect(el.startValue).to.equal(50);

        setTimeout(() => el.dispatchEvent(new KeyboardEvent('keydown', { 'key': 'Home' })));
        await nextFrame();
        expect(el.startValue).to.equal(0);

        setTimeout(() => el.dispatchEvent(new KeyboardEvent('keydown', { 'key': 'End' })));
        await nextFrame();
        expect(el.startValue).to.equal(60);

        setTimeout(() => el.dispatchEvent(new KeyboardEvent('keydown', { 'key': 'Escape' })));
        await nextFrame();
        expect(el.renderRoot.activeElement).to.equal(null);

        setTimeout(() => el.dispatchEvent(new KeyboardEvent('keydown', { 'key': 'Escape' })));
        await nextFrame();
        expect(el.renderRoot.activeElement).to.equal(null);
        el.startValue = 50;

        // End Thumb
        thumbEnd.focus();
        await nextFrame();
        expect(el.renderRoot.activeElement).to.equal(thumbEnd);
        expect(el.endValue).to.equal(60);

        setTimeout(() => el.dispatchEvent(new KeyboardEvent('keydown', { 'key': 'ArrowUp' })));
        await nextFrame();
        expect(el.endValue).to.equal(61);

        setTimeout(() => el.dispatchEvent(new KeyboardEvent('keydown', { 'key': 'ArrowRight' })));
        await nextFrame();
        expect(el.endValue).to.equal(62);

        setTimeout(() => el.dispatchEvent(new KeyboardEvent('keydown', { 'key': 'PageUp' })));
        await nextFrame();
        expect(el.endValue).to.equal(63);

        setTimeout(() => el.dispatchEvent(new KeyboardEvent('keydown', { 'key': 'ArrowDown' })));
        await nextFrame();
        expect(el.endValue).to.equal(62);

        setTimeout(() => el.dispatchEvent(new KeyboardEvent('keydown', { 'key': 'ArrowLeft' })));
        await nextFrame();
        expect(el.endValue).to.equal(61);

        setTimeout(() => el.dispatchEvent(new KeyboardEvent('keydown', { 'key': 'PageDown' })));
        await nextFrame();
        expect(el.endValue).to.equal(60);

        setTimeout(() => el.dispatchEvent(new KeyboardEvent('keydown', { 'key': 'Home' })));
        await nextFrame();
        expect(el.endValue).to.equal(50);

        setTimeout(() => el.dispatchEvent(new KeyboardEvent('keydown', { 'key': 'End' })));
        await nextFrame();
        expect(el.endValue).to.equal(100);

        setTimeout(() => el.dispatchEvent(new KeyboardEvent('keydown', { 'key': 'Escape' })));
        await nextFrame();
        expect(el.renderRoot.activeElement).to.equal(null);

        setTimeout(() => el.dispatchEvent(new KeyboardEvent('keydown', { 'key': 'Escape' })));
        await nextFrame();
        expect(el.renderRoot.activeElement).to.equal(null);
    });

    /* THUMB MOVING */
    it('supports selecting a new value in single value mode', async () => {
        const stops = getStops();

        const el = await fixture(html`
            <obap-slider min-value="0" max-value="100" value="50" .stops="${stops}"></obap-slider>
        `);

        await nextFrame();

        const thumb = el.renderRoot.getElementById('thumb');
        el._dragTarget = thumb;
        expect(thumb).to.not.equal(null);
        thumb.focus();
        await nextFrame();
        expect(el.renderRoot.activeElement).to.equal(thumb);

        el._move(60);
        await nextFrame();
        expect(el.value).to.equal(60);
    });

    it('supports selecting a new value in range value mode', async () => {
        const stops = getStops();

        const el = await fixture(html`
            <obap-slider range min-value="0" max-value="100" start-value="50" end-value="60" .stops="${stops}"></obap-slider>
        `);

        await nextFrame();

        const thumbStart = el.renderRoot.getElementById('thumb-start');
        const thumbEnd = el.renderRoot.getElementById('thumb-end');
        expect(thumbStart).to.not.equal(null);
        expect(thumbEnd).to.not.equal(null);

        el._dragTarget = thumbStart;
        thumbStart.focus();
        await nextFrame();
        expect(el.renderRoot.activeElement).to.equal(thumbStart);

        el._move(55);
        await nextFrame();
        expect(el.startValue).to.equal(55);

        el._dragTarget = thumbEnd;
        thumbEnd.focus();
        await nextFrame();
        expect(el.renderRoot.activeElement).to.equal(thumbEnd);

        el._move(65);
        await nextFrame();
        expect(el.endValue).to.equal(65);
    });

    it('supports selecting a new range', async () => {
        const stops = getStops();

        const el = await fixture(html`
            <obap-slider range min-value="0" max-value="100" start-value="50" end-value="60" .stops="${stops}"></obap-slider>
        `);

        await nextFrame();
        el._rangeDragPreviousValue = 50;
        el._moveRange(55);
        await nextFrame();
        expect(el.startValue).to.equal(55);
        expect(el.endValue).to.equal(65);

        el._moveRange(155);
        await nextFrame();
        expect(el.startValue).to.equal(55);
        expect(el.endValue).to.equal(65);
    });

    it('mouse positions to values', async () => {
        const stops = getStops();

        const el = await fixture(html`
            <obap-slider range min-value="0" max-value="100" value="0" .stops="${stops}" style="width: 200px;"></obap-slider>
        `);

        await nextFrame();
        const pos = el._mouseToValue(100)
        expect(pos).to.equal(45.5);
    });

    it('snaps values to stops', async () => {
        const stops = getStops();

        const el = await fixture(html`
            <obap-slider range min-value="0" max-value="100"  start-value="45" end-value="80" .stops="${stops}" ></obap-slider>
        `);

        await nextFrame();
        expect(el.startValue).to.equal(45);
        expect(el.endValue).to.equal(80);

        el.discrete = true;

        await nextFrame();
        expect(el.startValue).to.equal(50);
        expect(el.endValue).to.equal(75);

    });

    /* MOUSE DOWN */
    it('handles thumb mousedown event', async () => {
        const stops = getStops();

        const el = await fixture(html`
            <obap-slider min-value="0" max-value="100" value="50" .stops="${stops}" style="width: 200px;"></obap-slider>
        `);

        await nextFrame();

        const thumb = el.renderRoot.getElementById('thumb');
        expect(thumb).to.not.equal(null);

        const event = new MouseEvent('mousedown');
        event.composedPath = function () {
            return [thumb];
        }

        el._handleMouseDownEvent(event);
        await nextFrame();

        expect(el._dragTarget).to.equal(thumb);
        expect(el._dragging).to.equal(true);
        expect(thumb.hasAttribute('dragging')).to.equal(true);
    });

    it('handles mousedown event in non range', async () => {
        const stops = getStops();

        const el = await fixture(html`
            <obap-slider min-value="0" max-value="100" value="50" .stops="${stops}" style="width: 200px;"></obap-slider>
        `);

        await nextFrame();

        const thumb = el.renderRoot.getElementById('thumb');
        expect(thumb).to.not.equal(null);

        const event = new MouseEvent('mousedown');
        event.composedPath = function () {
            return [el];
        }

        el._handleMouseDownEvent(event);
        await nextFrame();

        expect(el._dragTarget).to.equal(thumb);
        expect(el._dragging).to.equal(true);
        expect(thumb.hasAttribute('dragging')).to.equal(true);
    });

    it('handles range mousedown event', async () => {
        const stops = getStops();

        const el = await fixture(html`
            <obap-slider range min-value="0" max-value="100" start-value="45" end-value="70" .stops="${stops}" style="width: 200px;"></obap-slider>
        `);

        await nextFrame();

        const thumbStart = el.renderRoot.getElementById('thumb-start');
        const thumbEnd = el.renderRoot.getElementById('thumb-end');
        expect(thumbStart).to.not.equal(null);
        expect(thumbEnd).to.not.equal(null);

        const event = new MouseEvent('mousedown', {
            clientX: 100
        });

        event.composedPath = function () {
            return [el];
        }

        el._handleMouseDownEvent(event);
        await nextFrame();

        expect(el._dragTargetStart).to.equal(thumbStart);
        expect(thumbStart.hasAttribute('dragging')).to.equal(true);
        expect(el._dragTargetEnd).to.equal(thumbEnd);
        expect(thumbEnd.hasAttribute('dragging')).to.equal(true);

        expect(el._rangeDragging).to.equal(true);
        expect(el._dragging).to.equal(false);
    });

    it('handles mousedown event in range', async () => {
        const stops = getStops();

        const el = await fixture(html`
            <obap-slider range min-value="0" max-value="100" start-value="45" end-value="70" .stops="${stops}" style="width: 200px;"></obap-slider>
        `);

        await nextFrame();

        const thumbStart = el.renderRoot.getElementById('thumb-start');
        const thumbEnd = el.renderRoot.getElementById('thumb-end');
        expect(thumbStart).to.not.equal(null);
        expect(thumbEnd).to.not.equal(null);

        const event1 = new MouseEvent('mousedown', {
            clientX: 10
        });

        event1.composedPath = function () {
            return [el];
        }

        el._handleMouseDownEvent(event1);
        await nextFrame();

        expect(el._dragTarget).to.equal(thumbStart);
        expect(el._dragging).to.equal(true);
        expect(el._rangeDragging).to.equal(false);

        const event2 = new MouseEvent('mousedown', {
            clientX: 190
        });

        event2.composedPath = function () {
            return [el];
        }

        el._handleMouseDownEvent(event2);
        await nextFrame();

        expect(el._dragTarget).to.equal(thumbEnd);
        expect(el._dragging).to.equal(true);
        expect(el._rangeDragging).to.equal(false);
    });

    it('handles range touchstart event', async () => {
        const stops = getStops();

        const el = await fixture(html`
            <obap-slider range min-value="0" max-value="100" start-value="45" end-value="70" .stops="${stops}" style="width: 200px;"></obap-slider>
        `);

        await nextFrame();

        const thumbStart = el.renderRoot.getElementById('thumb-start');
        const thumbEnd = el.renderRoot.getElementById('thumb-end');
        expect(thumbStart).to.not.equal(null);
        expect(thumbEnd).to.not.equal(null);

        const event = new TouchEvent('touchstart', {
            changedTouches: [
                new Touch({ clientX: 100, identifier: 100, target: el })
            ]
        });

        event.composedPath = function () {
            return [el];
        }

        el._handleMouseDownEvent(event);
        await nextFrame();

        expect(el._dragTargetStart).to.equal(thumbStart);
        expect(thumbStart.hasAttribute('dragging')).to.equal(true);
        expect(el._dragTargetEnd).to.equal(thumbEnd);
        expect(thumbEnd.hasAttribute('dragging')).to.equal(true);

        expect(el._rangeDragging).to.equal(true);
        expect(el._dragging).to.equal(false);
    });

    /* MOUSE & TOUCH MOVE */
    it('handles mousemove event in non range', async () => {
        const stops = getStops();

        const el = await fixture(html`
            <obap-slider min-value="0" max-value="100" value="50" .stops="${stops}" style="width: 200px;"></obap-slider>
        `);

        await nextFrame();

        const thumb = el.renderRoot.getElementById('thumb');
        expect(thumb).to.not.equal(null);
        el._dragTarget = thumb;
        el._dragging = true;

        const event = new MouseEvent('mousemove', {
            clientX: 100
        });

        event.composedPath = function () {
            return [el];
        }

        el._handleMouseMoveEvent(event);
        await nextFrame();

        expect(el.value).to.equal(45.5);
    });

    it('handles touchmove event in non range', async () => {
        const stops = getStops();

        const el = await fixture(html`
            <obap-slider min-value="0" max-value="100" value="50" .stops="${stops}" style="width: 200px;"></obap-slider>
        `);

        await nextFrame();

        const thumb = el.renderRoot.getElementById('thumb');
        expect(thumb).to.not.equal(null);
        el._dragTarget = thumb;
        el._dragging = true;

        const event = new TouchEvent('touchmove', {
            changedTouches: [
                new Touch({ clientX: 100, identifier: 100, target: el })
            ]
        });

        event.composedPath = function () {
            return [el];
        }

        el._handleMouseMoveEvent(event);
        await nextFrame();

        expect(el.value).to.equal(45.5);

        el._dragTarget = null;
        el._dragging = false;

        el._handleMouseMoveEvent(event);
        await nextFrame();

        expect(el.value).to.equal(45.5);
    });

    it('handles mousemove event in range', async () => {
        const stops = getStops();

        const el = await fixture(html`
            <obap-slider range min-value="0" max-value="100"  start-value="45" end-value="55" .stops="${stops}" style="width: 200px;"></obap-slider>
        `);

        el._rangeDragPreviousValue = 45;

        await nextFrame();

        const thumbStart = el.renderRoot.getElementById('thumb-start');
        const thumbEnd = el.renderRoot.getElementById('thumb-end');
        expect(thumbStart).to.not.equal(null);
        expect(thumbEnd).to.not.equal(null);

        el._dragTargetStart = thumbStart;
        el._dragTargetEnd = thumbEnd;
        el._rangeDragging = true;

        const event = new MouseEvent('mousemove', {
            clientX: 100
        });

        event.composedPath = function () {
            return [el];
        }

        el._handleMouseMoveEvent(event);
        await nextFrame();

        expect(el.startValue).to.equal(45.5);
        expect(el.endValue).to.equal(55.5);
    });

    it('handles touchmove event in range', async () => {
        const stops = getStops();

        const el = await fixture(html`
            <obap-slider range min-value="0" max-value="100"  start-value="45" end-value="55" .stops="${stops}" style="width: 200px;"></obap-slider>
        `);

        el._rangeDragPreviousValue = 45;

        await nextFrame();

        const thumbStart = el.renderRoot.getElementById('thumb-start');
        const thumbEnd = el.renderRoot.getElementById('thumb-end');
        expect(thumbStart).to.not.equal(null);
        expect(thumbEnd).to.not.equal(null);

        el._dragTargetStart = thumbStart;
        el._dragTargetEnd = thumbEnd;
        el._rangeDragging = true;

        const event = new TouchEvent('touchmove', {
            changedTouches: [
                new Touch({ clientX: 100, identifier: 100, target: el })
            ]
        });

        event.composedPath = function () {
            return [el];
        }

        el._handleMouseMoveEvent(event);
        await nextFrame();

        expect(el.startValue).to.equal(45.5);
        expect(el.endValue).to.equal(55.5);
    });

    /* MOUSE UP & TOUCH END */
    it('handles mouseup event in non range', async () => {
        const stops = getStops();

        const el = await fixture(html`
            <obap-slider min-value="0" max-value="100" value="50" .stops="${stops}" style="width: 200px;"></obap-slider>
        `);

        await nextFrame();

        const thumb = el.renderRoot.getElementById('thumb');
        expect(thumb).to.not.equal(null);
        el._dragTarget = thumb;
        el._dragging = true;

        const event = new MouseEvent('mouseup', {
            clientX: 100
        });

        event.composedPath = function () {
            return [el];
        }

        el._handleMouseUpEvent(event);
        await nextFrame();

        expect(el.value).to.equal(45.5);

        el._dragTarget = null;
        el._dragging = true;
        el._handleMouseUpEvent(event);
        await nextFrame();

        expect(el.value).to.equal(45.5);
    });

    it('handles touchend event in non range', async () => {
        const stops = getStops();

        const el = await fixture(html`
            <obap-slider min-value="0" max-value="100" value="50" .stops="${stops}" style="width: 200px;"></obap-slider>
        `);

        await nextFrame();

        const thumb = el.renderRoot.getElementById('thumb');
        expect(thumb).to.not.equal(null);
        el._dragTarget = thumb;
        el._dragging = true;

        const event = new TouchEvent('touchend', {
            changedTouches: [
                new Touch({ clientX: 100, identifier: 100, target: el })
            ]
        });

        event.composedPath = function () {
            return [el];
        }

        el._handleMouseUpEvent(event);
        await nextFrame();

        expect(el.value).to.equal(45.5);

        el._dragTarget = null;
        el._dragging = false;

        el._handleMouseUpEvent(event);
        await nextFrame();

        expect(el.value).to.equal(45.5);
    });

    it('handles mouseup event in range', async () => {
        const stops = getStops();

        const el = await fixture(html`
            <obap-slider range min-value="0" max-value="100"  start-value="45" end-value="55" .stops="${stops}" style="width: 200px;"></obap-slider>
        `);

        el._rangeDragPreviousValue = 45;

        await nextFrame();

        const thumbStart = el.renderRoot.getElementById('thumb-start');
        const thumbEnd = el.renderRoot.getElementById('thumb-end');
        expect(thumbStart).to.not.equal(null);
        expect(thumbEnd).to.not.equal(null);

        el._dragTargetStart = thumbStart;
        el._dragTargetEnd = thumbEnd;
        el._rangeDragging = true;

        const event = new MouseEvent('mouseup', {
            clientX: 100
        });

        event.composedPath = function () {
            return [el];
        }

        el._handleMouseUpEvent(event);
        await nextFrame();

        expect(el.startValue).to.equal(45.5);
        expect(el.endValue).to.equal(55.5);

        el._dragTargetStart = null;
        el._dragTargetEnd = null;
        el._rangeDragging = true;

        el._handleMouseUpEvent(event);
        await nextFrame();

        expect(el.startValue).to.equal(45.5);
        expect(el.endValue).to.equal(55.5);
    });

    it('handles touchend event in range', async () => {
        const stops = getStops();

        const el = await fixture(html`
            <obap-slider range min-value="0" max-value="100"  start-value="45" end-value="55" .stops="${stops}" style="width: 200px;"></obap-slider>
        `);

        el._rangeDragPreviousValue = 45;

        await nextFrame();

        const thumbStart = el.renderRoot.getElementById('thumb-start');
        const thumbEnd = el.renderRoot.getElementById('thumb-end');
        expect(thumbStart).to.not.equal(null);
        expect(thumbEnd).to.not.equal(null);

        el._dragTargetStart = thumbStart;
        el._dragTargetEnd = thumbEnd;
        el._rangeDragging = true;

        const event = new TouchEvent('touchend', {
            changedTouches: [
                new Touch({ clientX: 100, identifier: 100, target: el })
            ]
        });

        event.composedPath = function () {
            return [el];
        }

        el._handleMouseUpEvent(event);
        await nextFrame();

        expect(el.startValue).to.equal(45.5);
        expect(el.endValue).to.equal(55.5);
    });

    /* LABEL FORMAT */
    it('can format labels', async () => {
        const stops = getStops();

        const el = await fixture(html`
            <obap-slider min-value="0" max-value="100" value="55" .stops="${stops}" label-format="{}%"></obap-slider>
        `);

        await nextFrame();

        expect(el._formatValue(50)).to.equal('50%');
    });

    /* VALUE CLAMPING */
    it('does not go below min or above max value', async () => {
        const stops = getStops();

        const el = await fixture(html`
            <obap-slider min-value="10" max-value="20" value="15"></obap-slider>
        `);

        await nextFrame();

        expect(el._clampValue(5)).to.equal(10);
        expect(el._clampValue(25)).to.equal(20);
    });

    it('clamps to stop values in discrete mode', async () => {
        const stops = getStops();

        const el = await fixture(html`
            <obap-slider discrete min-value="0" max-value="100" value="0" .stops="${stops}" label-format="{}%"></obap-slider>
        `);

        await nextFrame();

        expect(el._clampValue(55)).to.equal(50);
        expect(el._clampValue(55, 'forward')).to.equal(75);
        expect(el._clampValue(74, 'backward')).to.equal(50);
    });
});