/*
@license
Copyright (c) 2020 Paul H Mason. All rights reserved.
*/
import { html, css, ObapElement } from '../obap-element/obap-element.js';

/**
 * A helper container element to simplify creating complex data table elements. You normally wouldn't use this element directly, but rather use it if you need to create a data table with a complex layout. It isn't actualy a table, but rather a way of laying out table parts that are fixed and scrolling.
 *
 * All the part of the table are positioned using named slots:
 * 
 * 'header'             - the main header area for titles, etc. (this isn't the column header).
 * 'header-fixed-left'  - the area containing the left fixed column headers (for frozen columns and row selector checkboxes).
 * 'header-scroll'      - the area containing scrolling column headers.
 * 'header-fixed-right' - the area containing the right fixed column headers (for frozen action menus, etc.).
 * 'body-fixed-left'    - the area containing the left fixed data rows (for frozen columns and row selector checkboxes).
 * 'body-scroll'        - the area containing scrolling data rows.
 * 'body-fixed-right'   - the area containing the right fixed data rows (for frozen action menus, etc.).
 * 'footer-fixed-left'  - the area containing the left fixed column footers (for counts and aggregations).
 * 'footer-scroll'      - the area containing scrolling column footers.
 * 'footer-fixed-right' - the area containing the right fixed column footers (for counts and aggregations).
 * 'footer'             - the main footer area for pagers, etc. (this isn't the column footer).
 */
export class ObapDataTableLayout extends ObapElement {
    static get styles() {
        return [css`
            :host {
                --obap-data-table-layout-background-color: var(--obap-block-color, #ECECEC);
                display: block;
            }
    
            :host([hidden]) {
                display: none !important;
            }
    
            :host([disabled]) {
                pointer-events: none;
            }

            .container {
                width: 100%;
                height: 100%;
                overflow: hidden;
                background: var(--obap-data-table-layout-background-color);
                display: grid;
                grid-template-columns: auto 1fr auto;
                grid-template-rows: auto auto 1fr auto auto;
                grid-template-areas: "header            header        header"
                                     "header-fixed-left header-scroll header-fixed-right"
                                     "body-fixed-left   body-scroll   body-fixed-right"
                                     "footer-fixed-left footer-scroll footer-fixed-right"
                                     "footer            footer        footer"
            }

            .grid-part {
                width: 100%;
                height: 100%;
                overflow: hidden;
                box-sizing: border-box;
                outline: 0;
                /*border: 0.5px dotted lightgrey;*/
            }

            .header {
                grid-area: header;
            }

            .header-fixed-left {
                grid-area: header-fixed-left;
                border-bottom: 1px solid lightgrey;
            }

            .header-scroll {
                grid-area: header-scroll;
                border-bottom: 1px solid lightgrey;
            }

            .header-fixed-right {
                grid-area: header-fixed-right;
                border-bottom: 1px solid lightgrey;
            }

            .body-fixed-left {
                grid-area: body-fixed-left;
                border-right: 1px solid lightgrey;
            }

            .body-scroll {
                grid-area: body-scroll;
            }

            .body-fixed-right {
                grid-area: body-fixed-right;
                border-left: 1px solid lightgrey;
            }

            .footer-fixed-left {
                grid-area: footer-fixed-left;
                border-right: 1px solid lightgrey;
                border-top: 1px solid lightgrey;
            }

            .footer-scroll {
                grid-area: footer-scroll;
                border-top: 1px solid lightgrey;
            }

            .footer-fixed-right {
                grid-area: footer-fixed-right;
                border-left: 1px solid lightgrey;
                border-top: 1px solid lightgrey;
            }

            .footer {
                grid-area: footer;
            }

            ::slotted([slot="body-fixed-left"]), ::slotted([slot="body-scroll"]), ::slotted([slot="body-fixed-right"]) {
                width: 100%;
                height: 100%;
            }

            .hidden-scrollbar {
                scrollbar-width: none;
            }

            .hidden-scrollbar::-webkit-scrollbar {
                width: 0;
                height: 0;
            }
        `];
    }

    constructor() {
        super();
        this._boundHandleSlotChangeEvent = this._handleSlotChangeEvent.bind(this);
        this._boundHScrollHandler = this._hScrollHandler.bind(this);
        this._boundVScrollHandler = this._vScrollHandler.bind(this);
    }

    connectedCallback() {
        super.connectedCallback();
        this.renderRoot.addEventListener('slotchange', this._boundHandleSlotChangeEvent);
    }

    disconnectedCallback() {
        this.renderRoot.removeEventListener('slotchange', this._boundHandleSlotChangeEvent);
        super.disconnectedCallback();
    }

    render() {
        return html`
            <div class="container">
                <div tabindex="0" class="grid-part header"><slot name="header"></slot></div>
                
                <div tabindex="0" class="grid-part header-fixed-left"><slot name="header-fixed-left"></slot></div>
                <div tabindex="0" class="grid-part header-scroll" h-scroll><slot name="header-scroll"></slot></div>
                <div tabindex="0" class="grid-part header-fixed-right"><slot name="header-fixed-right"></slot></div>
                
                <div tabindex="0" class="grid-part body-fixed-left" v-scroll><slot name="body-fixed-left"></slot></div>
                <div tabindex="0" class="grid-part body-scroll" v-scroll h-scroll><slot name="body-scroll"></slot></div>
                <div tabindex="0" class="grid-part body-fixed-right" v-scroll><slot name="body-fixed-right"></slot></div>
                
                <div tabindex="0" class="grid-part footer-fixed-left"><slot name="footer-fixed-left"></slot></div>
                <div tabindex="0" class="grid-part footer-scroll" h-scroll><slot name="footer-scroll"></slot></div>
                <div tabindex="0" class="grid-part footer-fixed-right"><slot name="footer-fixed-right"></slot></div>
                
                <div tabindex="0" class="grid-part footer"><slot name="footer"></slot></div>
            </div>
        `;
    }

    _handleSlotChangeEvent(e) {
        this._positionScrollAreas();
    }

    _hScrollHandler(e) {
        this._hSync(e.target);
    }

    _vScrollHandler(e) {
        this._vSync(e.target);
    }

    _hSync(src) {
        if (src._ignoreLeftScroll) {
            src._ignoreLeftScroll = false;
            return;
        }

        this._hElements.forEach((el) => {
            if ((el !== src) && (el.scrollLeft !== src.scrollLeft)) {
                this._scrollLeft(el, src.scrollLeft);
            }
        });
    }

    _vSync(src) {
        if (src._ignoreTopScroll) {
            src._ignoreTopScroll = false;
            return;
        }


        this._vElements.forEach((el) => {
            if ((el !== src) && (el.scrollTop !== src.scrollTop)) {
                this._scrollTop(el, src.scrollTop);
            }
        });
    }

    _positionScrollAreas() {
        if (this._scrollPositionsSet) return;

        // Vertical scrollbar on right body-xxx.
        this._vElements = [...this.renderRoot.querySelectorAll('div[v-scroll]')].filter((el) => el.children[0].assignedElements().length > 0);
        const lastVIndex = this._vElements.length - 1;

        this._vElements.forEach((el, index) => {
            el.style.overflowY = 'scroll';

            if (index !== lastVIndex) {
                el.classList.add('hidden-scrollbar');
            }

            el.addEventListener('scroll', this._boundVScrollHandler, { passive: true });
        });

        // Horizontal scrollbar on bottom xxx-scroll.
        this._hElements = [...this.renderRoot.querySelectorAll('div[h-scroll]')].filter((el) => el.children[0].assignedElements().length > 0);
        const lastHIndex = this._hElements.length - 1;

        this._hElements.forEach((el, index) => {
            el.style.overflowX = 'scroll';

            if (index !== lastHIndex) {
                el.classList.add('hidden-scrollbar');
            }

            el.addEventListener('scroll', this._boundHScrollHandler, { passive: true });
        });

        this._scrollPositionsSet = true;
    }

    _scrollLeft(el, value) {
        el._ignoreLeftScroll = true;
        el.scrollLeft = value;
    }

    _scrollTop(el, value) {
        el._ignoreTopScroll = true;
        el.scrollTop = value;
    }

    /*
    _throttle(fn, wait) {
        var time = Date.now();

        return function (e) {
            if ((time + wait - Date.now()) < 0) {
                fn(e);
                time = Date.now();
            }
        }
    }
    */
}

window.customElements.define('obap-data-table-layout', ObapDataTableLayout);
