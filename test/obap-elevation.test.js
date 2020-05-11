/*
@license
Copyright (c) 2020 Paul H Mason. All rights reserved.
*/
import { html, fixture, expect, nextFrame, defineCE, unsafeStatic } from '@open-wc/testing';
import { elevation0, hostElevation0, elevation1, hostElevation1, elevation2, hostElevation2, elevation3, hostElevation3, elevation4, hostElevation4, 
         elevation6, hostElevation6, elevation8, hostElevation8, elevation12, hostElevation12, elevation16, hostElevation16, elevation24, hostElevation24, 
         elevation, hostElevation } from '../src/obap-styles/obap-elevation.js';

describe('obap-elevation', () => {
    it('has elevation 0', async () => {
        expect(elevation0).to.not.equal(null);
        expect(hostElevation0).to.not.equal(null);
    });

    it('has elevation 1', async () => {
        expect(elevation1).to.not.equal(null);
        expect(hostElevation1).to.not.equal(null);
    });

    it('has elevation 2', async () => {
        expect(elevation2).to.not.equal(null);
        expect(hostElevation2).to.not.equal(null);
    });

    it('has elevation 3', async () => {
        expect(elevation3).to.not.equal(null);
        expect(hostElevation3).to.not.equal(null);
    });

    it('has elevation 4', async () => {
        expect(elevation4).to.not.equal(null);
        expect(hostElevation4).to.not.equal(null);
    });

    it('has elevation 6', async () => {
        expect(elevation6).to.not.equal(null);
        expect(hostElevation6).to.not.equal(null);
    });

    it('has elevation 8', async () => {
        expect(elevation8).to.not.equal(null);
        expect(hostElevation8).to.not.equal(null);
    });

    it('has elevation 12', async () => {
        expect(elevation12).to.not.equal(null);
        expect(hostElevation12).to.not.equal(null);
    });

    it('has elevation 16', async () => {
        expect(elevation16).to.not.equal(null);
        expect(hostElevation16).to.not.equal(null);
    });

    it('has elevation 24', async () => {
        expect(elevation24).to.not.equal(null);
        expect(hostElevation24).to.not.equal(null);
    });
    
    it('has the elevation arrays', async () => {
        expect(elevation).to.not.equal(null);
        expect(elevation.length).to.equal(10);

        expect(hostElevation).to.not.equal(null);
        expect(hostElevation.length).to.equal(10);
    });
});