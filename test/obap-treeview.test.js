/*
@license
Copyright (c) 2021 Paul H Mason. All rights reserved.
*/
import { html, fixture, expect, oneEvent, nextFrame } from '@open-wc/testing';
import '../src/obap-treeview/obap-treeview.js';

describe('obap-treeview', () => {
    function getItems() {
        return [
            {
                label: 'Cats',
                items: [
                    {
                        label: 'Siamese'
                    },
                    {
                        label: 'Persian'
                    },
                    {
                        label: 'Sphynx'
                    }
                ]
            },
            {
                label: 'Dogs',
                selected: false,
                icon: 'core:cross',
                openIcon: 'core:check',
                closeIcon: 'core:cross',
                items: [
                    {
                        label: 'Poodle'
                    },
                    {
                        label: 'Bulldog',
                        items: [
                            {
                                label: 'English'
                            },
                            {
                                label: 'French'
                            }
                        ]
                    },
                    {
                        label: 'Dalmation'
                    },
                    {
                        label: 'Labrador'
                    },
                    {
                        label: ''
                    }
                ]
            },
            {
                label: 'Unicorns',
                items: [
                    {
                        label: 'Pegasus'
                    },
                    {
                        label: 'Rainbow'
                    },
                    {
                        label: 'Narwhal'
                    }
                ]
            }
        ];
    }

    /*
    it('passes the a11y audit', async () => {
        const el = await fixture(html`
            <obap-treeview></obap-treeview>
        `);

        await expect(el).shadowDom.to.be.accessible();
    });
    */

    it('can be created', async () => {
        const el = await fixture(html`
            <obap-treeview .items="${getItems()}"></obap-treeview>
        `);

        expect(el).to.not.equal(null);
    });

    it('supports a root node', async () => {
        const el = await fixture(html`
            <obap-treeview label="pets" icon="test" .items="${getItems()}"></obap-treeview>
        `);

        await nextFrame();
        const children = el.renderRoot.querySelectorAll('obap-treeview-item');

        expect(children.length).to.equal(1);
        expect(el.label).to.equal('pets');
        expect(el.icon).to.equal('test');
    });

    it('tracks the last selected item in single mode', async () => {
        const el = await fixture(html`
            <obap-treeview label="pets" select-mode="single" .items="${getItems()}"></obap-treeview>
        `);

        await nextFrame();
        const rootChild = el.renderRoot.querySelector('obap-treeview-item');
        const children = rootChild.renderRoot.querySelectorAll('obap-treeview-item');

        expect(rootChild).to.not.equal(null);
        expect(children.length).to.equal(3);
        expect(el._currentSelection).to.equal(null);

        children[0].select();
        await nextFrame();
        expect(el._currentSelection).to.not.equal(null);
        expect(el._currentSelection).to.equal(children[0]);

        children[1].select();
        await nextFrame();
        expect(el._currentSelection).to.not.equal(null);
        expect(el._currentSelection).to.equal(children[1]);
    });

    it('tracks the last selected item in multiple mode', async () => {
        const el = await fixture(html`
            <obap-treeview label="pets" select-mode="multiple" .items="${getItems()}"></obap-treeview>
        `);

        await nextFrame();
        const rootChild = el.renderRoot.querySelector('obap-treeview-item');
        const children = rootChild.renderRoot.querySelectorAll('obap-treeview-item');

        expect(rootChild).to.not.equal(null);
        expect(children.length).to.equal(3);
        expect(el._currentSelection).to.equal(null);


        children[0].select();
        await nextFrame();
        expect(el._currentSelection).to.not.equal(null);
        expect(el._currentSelection).to.equal(children[0]);

        children[1].select();
        await nextFrame();
        expect(el._currentSelection).to.not.equal(null);
        expect(el._currentSelection).to.equal(children[1]);
    });

    it('sets the correct state on the last selected item', async () => {
        const el = await fixture(html`
            <obap-treeview label="pets" select-mode="single" .items="${getItems()}"></obap-treeview>
        `);

        await nextFrame();
        const rootChild = el.renderRoot.querySelector('obap-treeview-item');
        const children = rootChild.renderRoot.querySelectorAll('obap-treeview-item');

        expect(rootChild).to.not.equal(null);
        expect(children.length).to.equal(3);
        expect(el._currentSelection).to.equal(null);

        children[0].select();
        await nextFrame();
        expect(el._currentSelection).to.not.equal(null);
        expect(el._currentSelection).to.equal(children[0]);
        expect(el._currentSelection.selected).to.equal(true);

        children[0].deselect();
        await nextFrame();
        expect(el._currentSelection).to.not.equal(null);
        expect(el._currentSelection).to.equal(children[0]);
        expect(el._currentSelection.selected).to.equal(false);
    });

    it('supports leaf node selection in single mode', async () => {
        const el = await fixture(html`
            <obap-treeview label="pets" select-mode="single" .items="${getItems()}" select-leaf-only></obap-treeview>
        `);

        el.selectLeafOnly = true;

        await nextFrame();
        const rootChild = el.renderRoot.querySelector('obap-treeview-item');
        const children = rootChild.renderRoot.querySelectorAll('obap-treeview-item');

        expect(rootChild).to.not.equal(null);
        expect(children.length).to.equal(3);
        expect(el._currentSelection).to.equal(null);

        children[0].select();
        await nextFrame();
        expect(el._currentSelection).to.equal(null);
    });

    it('supports leaf node selection in multiple mode', async () => {
        const el = await fixture(html`
            <obap-treeview label="pets" select-mode="multiple" .items="${getItems()}" select-leaf-only></obap-treeview>
        `);

        el.selectLeafOnly = true;

        await nextFrame();
        const rootChild = el.renderRoot.querySelector('obap-treeview-item');
        const children = rootChild.renderRoot.querySelectorAll('obap-treeview-item');

        expect(rootChild).to.not.equal(null);
        expect(children.length).to.equal(3);
        expect(el._currentSelection).to.equal(null);

        children[0].select();
        await nextFrame();
        expect(el._currentSelection).to.equal(null);
    });

    it('can expand and collapse', async () => {
        const el = await fixture(html`
            <obap-treeview label="pets" .items="${getItems()}"></obap-treeview>
        `);

        const rootChild = el.renderRoot.querySelector('obap-treeview-item');
        const children = rootChild.renderRoot.querySelectorAll('obap-treeview-item');

        await nextFrame();
        expect(rootChild.open).to.equal(false);
        expect(children[0].open).to.equal(false);
        expect(children[1].open).to.equal(false);
        expect(children[2].open).to.equal(false);
        
        el.expand();

        await nextFrame();
        expect(rootChild.open).to.equal(true);
        expect(children[0].open).to.equal(false);
        expect(children[1].open).to.equal(false);
        expect(children[2].open).to.equal(false);

        
        el.collapse();

        await nextFrame();
        expect(rootChild.open).to.equal(false);
        expect(children[0].open).to.equal(false);
        expect(children[1].open).to.equal(false);
        expect(children[2].open).to.equal(false);

        el.expandAll();

        await nextFrame();
        expect(rootChild.open).to.equal(true);
        await nextFrame();
        expect(children[0].open).to.equal(true);
        expect(children[1].open).to.equal(true);
        expect(children[2].open).to.equal(true);

        el.collapseAll();

        await nextFrame();
        expect(rootChild.open).to.equal(false);
        await nextFrame();
        expect(children[0].open).to.equal(false);
        expect(children[1].open).to.equal(false);
        expect(children[2].open).to.equal(false);
    });

    it('supports indeterminate nodes', async () => {
        const el = await fixture(html`
            <obap-treeview label="pets" select-mode="multiple" .items="${getItems()}"></obap-treeview>
        `);

        await nextFrame();
        const rootChild = el.renderRoot.querySelector('obap-treeview-item');
        const children = rootChild.renderRoot.querySelectorAll('obap-treeview-item');
        const grandChildren = children[0].renderRoot.querySelectorAll('obap-treeview-item');

        grandChildren[0].select();
        await nextFrame();
        expect(grandChildren[0].selected).to.equal(true);
        await nextFrame();
        expect(rootChild.selected).to.equal(false);
        expect(rootChild.indeterminate).to.equal(true);

        grandChildren[0].deselect();
        await nextFrame();
        expect(grandChildren[0].selected).to.equal(false);
        await nextFrame();
        expect(rootChild.selected).to.equal(false);
        expect(rootChild.indeterminate).to.equal(false);
    });

    it('expands on click', async () => {
        const el = await fixture(html`
            <obap-treeview label="pets" select-mode="multiple" .items="${getItems()}"></obap-treeview>
        `);

        await nextFrame();
        const rootChild = el.renderRoot.querySelector('obap-treeview-item');
        expect(rootChild.open).to.equal(false);
        rootChild._handleItemClick();

        await nextFrame();
        expect(rootChild.open).to.equal(true);
    });

    it('does no expand if no items', async () => {
        const el = await fixture(html`
            <obap-treeview label="pets" select-mode="multiple"></obap-treeview>
        `);

        await nextFrame();
        const rootChild = el.renderRoot.querySelector('obap-treeview-item');
        expect(rootChild.open).to.equal(false);
        rootChild._handleItemClick();

        await nextFrame();
        expect(rootChild.open).to.equal(false);
    });

    it('selects if label clicked in single select mode', async () => {
        const el = await fixture(html`
            <obap-treeview label="pets" select-mode="single" .items="${getItems()}"></obap-treeview>
        `);

        await nextFrame();
        const rootChild = el.renderRoot.querySelector('obap-treeview-item');
        const label = rootChild.renderRoot.querySelector('.label');
        expect(rootChild.selected).to.equal(false);
        expect(label).to.not.equal(null);

        setTimeout(() => label.click());
        await nextFrame();
        expect(rootChild.selected).to.equal(true);
    });

    it('selects if label clicked in single select leaf mode', async () => {
        const el = await fixture(html`
            <obap-treeview label="pets" select-mode="single" .items="${getItems()}" select-leaf-only></obap-treeview>
        `);

        await nextFrame();
        const rootChild = el.renderRoot.querySelector('obap-treeview-item');
        const children = rootChild.renderRoot.querySelectorAll('obap-treeview-item');
        const grandChildren = children[0].renderRoot.querySelectorAll('obap-treeview-item');

        const label = rootChild.renderRoot.querySelector('.label');
        const leafLabel = grandChildren[0].renderRoot.querySelector('.label');
        expect(rootChild.selected).to.equal(false);
        expect(label).to.not.equal(null);
        expect(leafLabel).to.not.equal(null);

        setTimeout(() => label.click());
        await nextFrame();
        expect(rootChild.selected).to.equal(false);

        setTimeout(() => leafLabel.click());
        await nextFrame();
        expect(grandChildren[0].selected).to.equal(true);
    });
});