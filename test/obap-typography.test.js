/*
@license
Copyright (c) 2020 Paul H Mason. All rights reserved.
*/
import { html, fixture, expect, nextFrame, defineCE, unsafeStatic } from '@open-wc/testing';
import { display, headline, title, subtitle, body, button, caption, overline, code, typography } from '../src/obap-styles/obap-typography.js';

describe('obap-typography', () => {
    it('has the display style', async () => {
        expect(display).to.not.equal(null);
    });

    it('has the headline style', async () => {
        expect(headline).to.not.equal(null);
    });

    it('has the title style', async () => {
        expect(title).to.not.equal(null);
    });

    it('has the subtitle style', async () => {
        expect(subtitle).to.not.equal(null);
    });

    it('has the body style', async () => {
        expect(body).to.not.equal(null);
    });

    it('has the button style', async () => {
        expect(button).to.not.equal(null);
    });

    it('has the caption style', async () => {
        expect(caption).to.not.equal(null);
    });

    it('has the overline style', async () => {
        expect(overline).to.not.equal(null);
    });

    it('has the code style', async () => {
        expect(code).to.not.equal(null);
    });

    it('has the style array', async () => {
        expect(typography).to.not.equal(null);
        expect(typography.length).to.equal(9);
    });
});