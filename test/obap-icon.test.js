/*
@license
Copyright (c) 2020 Paul H Mason. All rights reserved.
*/
import { html, fixture, expect, nextFrame, defineCE, unsafeStatic } from '@open-wc/testing';
import { obapIcons, getIconNames, getIconGroups } from '../src/obap-icons/obap-core-icons.js';
import '../src/obap-icons/obap-standard-icons.js';
import '../src/obap-icon/obap-icon.js';

describe('obap-icon', () => {
    it('passes the a11y audit', async () => {
        const el = await fixture(html`
            <obap-icon></obap-icon>
        `);

        await expect(el).shadowDom.to.be.accessible();
    });

    it('defaults to no icon', async () => {
        const el = await fixture(html`
            <obap-icon></obap-icon>
        `);

        expect(el.icon).to.equal('');
    });

    it('can set an icon name via attribute', async () => {
        const el = await fixture(html`
            <obap-icon icon="core:cheveron-left"></obap-icon>
        `);

        expect(el.icon).to.equal('core:cheveron-left');
    });

    it('can set an icon name via property', async () => {
        const el = await fixture(html`
            <obap-icon></obap-icon>
        `);

        el.icon = 'core:cheveron-left';
        expect(el.icon).to.equal('core:cheveron-left');
    });

    it('can get all the icon group names', async () => {
        const iconGroups = getIconGroups();
        expect(iconGroups.length).to.equal(2);
        expect(iconGroups.indexOf('core')).to.not.equal(-1);
        expect(iconGroups.indexOf('standard')).to.not.equal(-1);
    });

    it('can get all the icon names in a group', async () => {
        const icons = getIconNames('core');
        expect(icons.length).to.be.greaterThan(0);
    });

    it('can get all the icon names in the standard group if no group name', async () => {
        const icons = getIconNames();
        expect(icons.length).to.be.greaterThan(0);
    });

    it('returns an empty array for icon names if a group does not exist', async () => {
        const icons = getIconNames('xxx');
        expect(icons.length).to.equal(0);
    });

    it('returns a standard group icon with an unprefixed name', async () => {
        const icon = obapIcons.get('android');
        expect(icon).to.not.equal(null);
    });

    it('can add an icon group', async () => {
        obapIcons.addGroup('test1', `
            <defs>
                <g id="chevron-left"><path d="M15.41 7.41L14 6l-6 6 6 6 1.41-1.41L10.83 12z"/></g>
                <g id="chevron-right"><path d="M10 6L8.59 7.41 13.17 12l-4.58 4.59L10 18l6-6z"/></g>
            </defs>
        `);

        const iconGroups = getIconGroups();
        expect(iconGroups.indexOf('test1')).to.not.equal(-1);

        const icons = getIconNames('test1');
        expect(icons.length).to.be.greaterThan(0);
    });

    it('does not add an icon group if there is no definition tag', async () => {
        obapIcons.addGroup('test2', ``);

        const iconGroups = getIconGroups();
        expect(iconGroups.indexOf('test2')).to.equal(-1);
    });

    it('does not add an icon group if there are no icons defined', async () => {
        obapIcons.addGroup('test3', `
            <defs></defs>
        `);

        const iconGroups = getIconGroups();
        expect(iconGroups.indexOf('test3')).to.equal(-1);
    });

    it('can add an icon group', async () => {
        obapIcons.addGroup('test1', `
            <defs>
                <g id="chevron-left"><path d="M15.41 7.41L14 6l-6 6 6 6 1.41-1.41L10.83 12z"/></g>
                <g id="chevron-right"><path d="M10 6L8.59 7.41 13.17 12l-4.58 4.59L10 18l6-6z"/></g>
            </defs>
        `);

        const iconGroups = getIconGroups();
        expect(iconGroups.indexOf('test1')).to.not.equal(-1);

        const icons = getIconNames('test1');
        expect(icons.length).to.be.greaterThan(0);
    });
});