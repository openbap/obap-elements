/*
@license
Copyright (c) 2020 Paul H Mason. All rights reserved.
*/
import { html, fixture, expect, nextFrame, defineCE, unsafeStatic } from '@open-wc/testing';
import '../src/obap-pages/obap-pages.js';

describe('obap-pages', () => {
    it('sets selectedClass to obap-page-selected', async () => {
        const el = await fixture(html`
            <obap-pages></obap-pages>
        `);

        expect(el.selectedClass).to.equal('obap-page-selected');
    });

});