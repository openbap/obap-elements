/*
@license
Copyright (c) 2021 Paul H Mason. All rights reserved.
*/
import { html, css, ObapElement } from '../obap-element/obap-element.js';

/**
 * A helper container element to simplify creating complex data table elements. You normally wouldn't use this element directly, but rather use it if you need to create a data table with a complex layout. It isn't actualy a table, but rather a way of laying out table parts that are fixed and scrolling.
 *
 * ## Content Positioning
 * 
 * All the parts of the table are positioned using named slots:
 * 
 * |Slot               |Description                                                                      |
 * |-------------------|---------------------------------------------------------------------------------|
 * |grouper            |The area for column grouping, etc.                                               |
 * |header-action-left |The area containing the left fixed column headers for row selector checkboxes.   |
 * |header-fixed-left  |The area containing the left fixed column headers for frozen columns.            |
 * |header-scroll      |The area containing scrolling column headers.                                    |
 * |header-fixed-right |The area containing the right fixed column headers for frozen columns.           |
 * |header-action-right|The area containing the right fixed column headers for action menus. etc.        |
 * |body-action-left   |The area containing the left fixed data rows for row selector checkboxes.        |
 * |body-fixed-left    |The area containing the left fixed data rows for frozen columns.                 |
 * |body-scroll        |The area containing scrolling data rows.                                         |
 * |body-fixed-right   |The area containing the right fixed data rows for frozen columns.                |
 * |body-action-right  |The area containing the right fixed data rows for action menus, etc.             |
 * |footer-action-left |The area containing the left fixed column footers (for counts and aggregations). |
 * |footer-fixed-left  |The area containing the left fixed column footers (for counts and aggregations). |
 * |footer-scroll      |The area containing scrolling column footers.                                    |
 * |footer-fixed-right |The area containing the right fixed column footers (for counts and aggregations).|
 * |footer-action-right|The area containing the right fixed column footers (for counts and aggregations).|
 * |pager              |The area for pagers, etc.                                                        |
 * 
 * ## Content Styling
 * 
 * The overall background and foreground colors are set by the following 2 CSS variables:
 * 
 * |Variable                                 |Default Value                                 |
 * |-----------------------------------------|----------------------------------------------|
 * |--obap-data-table-layout-color           |rgba(0, 0, 0, 0.87)|
 * |--obap-data-table-layout-background-color|transparent                                   |
 * 
 * You can also set a top level border color and style and then just set the border widths on the individual parts, or override the color and style per part.
 * 
 * |Variable                             |Default Value                                       |
 * |-------------------------------------|----------------------------------------------------|
 * |--obap-data-table-layout-border-color|rgba(0, 0, 0, 0.20)|
 * |--obap-data-table-layout-border-style|solid                                               |
 * 
 * Each slotted part inherits the overall background and foreground colors, but you can override them individually, and set the border properties. They are named according to the following rules:
 * 
 * |Variable                                                  |Default Value                        |
 * |----------------------------------------------------------|-------------------------------------|
 * |--obap-data-table-layout-{part-slot-name}-color           |inherit                              |
 * |--obap-data-table-layout-{part-slot-name}-background-color|inherit                              |
 * |--obap-data-table-layout-{part-slot-name}-border-color    |--obap-data-table-layout-border-color|
 * |--obap-data-table-layout-{part-slot-name}-border-style    |--obap-data-table-layout-border-style|
 * |--obap-data-table-layout-{part-slot-name}-border-width    |0                                    |
 */
export class OpenDataTableLayout extends ObapElement {
    static get styles() {
        return [css`
            :host {
                --obap-data-table-layout-color: var(--obap-text-primary-color, rgba(0, 0, 0, 0.87));
                --obap-data-table-layout-background-color: transparent;
                --obap-data-table-layout-border-color: var(--obap-divider-on-surface-color, rgba(0, 0, 0, 0.20));
                --obap-data-table-layout-border-style: solid;

                --obap-data-table-layout-detail-color: inherit;
                --obap-data-table-layout-detail-background-color: inherit;
                --obap-data-table-layout-detail-border-color: var(--obap-data-table-layout-border-color);
                --obap-data-table-layout-detail-border-style: var(--obap-data-table-layout-border-style);
                --obap-data-table-layout-detail-border-width: 0;

                --obap-data-table-layout-grouper-color: inherit;
                --obap-data-table-layout-grouper-background-color: inherit;
                --obap-data-table-layout-grouper-border-color: var(--obap-data-table-layout-border-color);
                --obap-data-table-layout-grouper-border-style: var(--obap-data-table-layout-border-style);
                --obap-data-table-layout-grouper-border-width: 0;

                --obap-data-table-layout-header-action-left-color: inherit;
                --obap-data-table-layout-header-action-left-background-color: inherit;
                --obap-data-table-layout-header-action-left-border-color: var(--obap-data-table-layout-border-color);
                --obap-data-table-layout-header-action-left-border-style: var(--obap-data-table-layout-border-style);
                --obap-data-table-layout-header-action-left-border-width: 0;

                --obap-data-table-layout-header-fixed-left-color: inherit;
                --obap-data-table-layout-header-fixed-left-background-color: inherit;
                --obap-data-table-layout-header-fixed-left-border-color: var(--obap-data-table-layout-border-color);
                --obap-data-table-layout-header-fixed-left-border-style: var(--obap-data-table-layout-border-style);
                --obap-data-table-layout-header-fixed-left-border-width: 0;

                --obap-data-table-layout-header-scroll-color: inherit;
                --obap-data-table-layout-header-scroll-background-color: inherit;
                --obap-data-table-layout-header-scroll-border-color: var(--obap-data-table-layout-border-color);
                --obap-data-table-layout-header-scroll-border-style: var(--obap-data-table-layout-border-style);
                --obap-data-table-layout-header-scroll-border-width: 0;

                --obap-data-table-layout-header-fixed-right-color: inherit;
                --obap-data-table-layout-header-fixed-right-background-color: inherit;
                --obap-data-table-layout-header-fixed-right-border-color: var(--obap-data-table-layout-border-color);
                --obap-data-table-layout-header-fixed-right-border-style: var(--obap-data-table-layout-border-style);
                --obap-data-table-layout-header-fixed-right-border-width: 0;

                --obap-data-table-layout-header-action-right-color: inherit;
                --obap-data-table-layout-header-action-right-background-color: inherit;
                --obap-data-table-layout-header-action-right-border-color: var(--obap-data-table-layout-border-color);
                --obap-data-table-layout-header-action-right-border-style: var(--obap-data-table-layout-border-style);
                --obap-data-table-layout-header-action-right-border-width: 0;

                --obap-data-table-layout-body-action-left-color: inherit;
                --obap-data-table-layout-body-action-left-background-color: inherit;
                --obap-data-table-layout-body-action-left-border-color: var(--obap-data-table-layout-border-color);
                --obap-data-table-layout-body-action-left-border-style: var(--obap-data-table-layout-border-style);
                --obap-data-table-layout-body-action-left-border-width: 0;

                --obap-data-table-layout-body-fixed-left-color: inherit;
                --obap-data-table-layout-body-fixed-left-background-color: inherit;
                --obap-data-table-layout-body-fixed-left-border-color: var(--obap-data-table-layout-border-color);
                --obap-data-table-layout-body-fixed-left-border-style: var(--obap-data-table-layout-border-style);
                --obap-data-table-layout-body-fixed-left-border-width: 0;

                --obap-data-table-layout-body-scroll-color: inherit;
                --obap-data-table-layout-body-scroll-background-color: inherit;
                --obap-data-table-layout-body-scroll-border-color: var(--obap-data-table-layout-border-color);
                --obap-data-table-layout-body-scroll-border-style: var(--obap-data-table-layout-border-style);
                --obap-data-table-layout-body-scroll-border-width: 0;

                --obap-data-table-layout-body-fixed-right-color: inherit;
                --obap-data-table-layout-body-fixed-right-background-color: inherit;
                --obap-data-table-layout-body-fixed-right-border-color: var(--obap-data-table-layout-border-color);
                --obap-data-table-layout-body-fixed-right-border-style: var(--obap-data-table-layout-border-style);
                --obap-data-table-layout-body-fixed-right-border-width: 0;

                --obap-data-table-layout-body-action-right-color: inherit;
                --obap-data-table-layout-body-action-right-background-color: inherit;
                --obap-data-table-layout-body-action-right-border-color: var(--obap-data-table-layout-border-color);
                --obap-data-table-layout-body-action-right-border-style: var(--obap-data-table-layout-border-style);
                --obap-data-table-layout-body-action-right-border-width: 0;

                --obap-data-table-layout-footer-action-left-color: inherit;
                --obap-data-table-layout-footer-action-left-background-color: inherit;
                --obap-data-table-layout-footer-action-left-border-color: var(--obap-data-table-layout-border-color);
                --obap-data-table-layout-footer-action-left-border-style: var(--obap-data-table-layout-border-style);
                --obap-data-table-layout-footer-action-left-border-width: 0;

                --obap-data-table-layout-footer-fixed-left-color: inherit;
                --obap-data-table-layout-footer-fixed-left-background-color: inherit;
                --obap-data-table-layout-footer-fixed-left-border-color: var(--obap-data-table-layout-border-color);
                --obap-data-table-layout-footer-fixed-left-border-style: var(--obap-data-table-layout-border-style);
                --obap-data-table-layout-footer-fixed-left-border-width: 0;

                --obap-data-table-layout-footer-scroll-color: inherit;
                --obap-data-table-layout-footer-scroll-background-color: inherit;
                --obap-data-table-layout-footer-scroll-border-color: var(--obap-data-table-layout-border-color);
                --obap-data-table-layout-footer-scroll-border-style: var(--obap-data-table-layout-border-style);
                --obap-data-table-layout-footer-scroll-border-width: 0;

                --obap-data-table-layout-footer-fixed-right-color: inherit;
                --obap-data-table-layout-footer-fixed-right-background-color: inherit;
                --obap-data-table-layout-footer-fixed-right-border-color: var(--obap-data-table-layout-border-color);
                --obap-data-table-layout-footer-fixed-right-border-style: var(--obap-data-table-layout-border-style);
                --obap-data-table-layout-footer-fixed-right-border-width: 0;

                --obap-data-table-layout-footer-action-right-color: inherit;
                --obap-data-table-layout-footer-action-right-background-color: inherit;
                --obap-data-table-layout-footer-action-right-border-color: var(--obap-data-table-layout-border-color);
                --obap-data-table-layout-footer-action-right-border-style: var(--obap-data-table-layout-border-style);
                --obap-data-table-layout-footer-action-right-border-width: 0;

                --obap-data-table-layout-pager-color: inherit;
                --obap-data-table-layout-pager-background-color: inherit;
                --obap-data-table-layout-pager-border-color: var(--obap-data-table-layout-border-color);
                --obap-data-table-layout-pager-border-style: var(--obap-data-table-layout-border-style);
                --obap-data-table-layout-pager-border-width: 0;
                
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
                color: var(--obap-data-table-layout-color);
                background: var(--obap-data-table-layout-background-color);
                display: grid;
                
                grid-template-columns: auto auto 1fr auto auto auto; 
                grid-template-rows:    auto auto 1fr auto auto auto;
                grid-template-areas: "grouper              grouper             grouper         grouper              grouper               grouper"
                                     "header-action-left   header-fixed-left   header-scroll   header-fixed-right   header-action-right   detail"
                                     "body-action-left     body-fixed-left     body-scroll     body-fixed-right     body-action-right     detail"
                                     "footer-action-left   footer-fixed-left   footer-scroll   footer-fixed-right   footer-action-right   detail"
                                     "pager                pager               pager           pager                pager                 pager";
            }

            .grid-part {
                width: 100%;
                height: 100%;
                overflow: hidden;
                box-sizing: border-box;
                outline: 0;
            }

            .detail {
                grid-area: detail;
                color: var(--obap-data-table-layout-detail-color);
                background: var(--obap-data-table-layout-detail-background-color);
                
                border-color: var(--obap-data-table-layout-detail-border-color);
                border-style: var(--obap-data-table-layout-detail-border-style);
                border-width: var(--obap-data-table-layout-detail-border-width);
                
            }

            .grouper {
                grid-area: grouper;
                color: var(--obap-data-table-layout-grouper-color);
                background: var(--obap-data-table-layout-grouper-background-color);
                border-color: var(--obap-data-table-layout-grouper-border-color);
                border-style: var(--obap-data-table-layout-grouper-border-style);
                border-width: var(--obap-data-table-layout-grouper-border-width);
            }

            .header-action-left {
                grid-area: header-action-left;
                color: var(--obap-data-table-layout-header-action-left-color);
                background: var(--obap-data-table-layout-header-action-left-background-color);
                border-color: var(--obap-data-table-layout-header-action-left-border-color);
                border-style: var(--obap-data-table-layout-header-action-left-border-style);
                border-width: var(--obap-data-table-layout-header-action-left-border-width);
            }

            .header-fixed-left {
                grid-area: header-fixed-left;
                color: var(--obap-data-table-layout-header-fixed-left-color);
                background: var(--obap-data-table-layout-header-fixed-left-background-color);
                border-color: var(--obap-data-table-layout-header-fixed-left-border-color);
                border-style: var(--obap-data-table-layout-header-fixed-left-border-style);
                border-width: var(--obap-data-table-layout-header-fixed-left-border-width); 
            }

            .header-scroll {
                grid-area: header-scroll;
                color: var(--obap-data-table-layout-header-scroll-color);
                background: var(--obap-data-table-layout-header-scroll-background-color);
                border-color: var(--obap-data-table-layout-header-scroll-border-color);
                border-style: var(--obap-data-table-layout-header-scroll-border-style);
                border-width: var(--obap-data-table-layout-header-scroll-border-width);
            }

            .header-fixed-right {
                grid-area: header-fixed-right;
                color: var(--obap-data-table-layout-header-fixed-right-color);
                background: var(--obap-data-table-layout-header-fixed-right-background-color);
                border-color: var(--obap-data-table-layout-header-fixed-right-border-color);
                border-style: var(--obap-data-table-layout-header-fixed-right-border-style);
                border-width: var(--obap-data-table-layout-header-fixed-right-border-width);
            }

            .header-action-right {
                grid-area: header-action-right;
                color: var(--obap-data-table-layout-header-action-right-color);
                background: var(--obap-data-table-layout-header-action-right-background-color);
                border-color: var(--obap-data-table-layout-header-action-right-border-color);
                border-style: var(--obap-data-table-layout-header-action-right-border-style);
                border-width: var(--obap-data-table-layout-header-action-right-border-width);
            }

            .body-action-left {
                grid-area: body-action-left;
                color: var(--obap-data-table-layout-body-action-left-color);
                background: var(--obap-data-table-layout-body-action-left-background-color);
                border-color: var(--obap-data-table-layout-body-action-left-border-color);
                border-style: var(--obap-data-table-layout-body-action-left-border-style);
                border-width: var(--obap-data-table-layout-body-action-left-border-width);
            }

            .body-fixed-left {
                grid-area: body-fixed-left;
                color: var(--obap-data-table-layout-body-fixed-left-color);
                background: var(--obap-data-table-layout-body-fixed-left-background-color);
                border-color: var(--obap-data-table-layout-body-fixed-left-border-color);
                border-style: var(--obap-data-table-layout-body-fixed-left-border-style);
                border-width: var(--obap-data-table-layout-body-fixed-left-border-width);
            }

            .body-scroll {
                grid-area: body-scroll;
                color: var(--obap-data-table-layout-body-scroll-color);
                background: var(--obap-data-table-layout-body-scroll-background-color);
                border-color: var(--obap-data-table-layout-body-scroll-border-color);
                border-style: var(--obap-data-table-layout-body-scroll-border-style);
                border-width: var(--obap-data-table-layout-body-scroll-border-width);
            }

            .body-fixed-right {
                grid-area: body-fixed-right;
                color: var(--obap-data-table-layout-body-fixed-right-color);
                background: var(--obap-data-table-layout-body-fixed-right-background-color);
                border-color: var(--obap-data-table-layout-body-fixed-right-border-color);
                border-style: var(--obap-data-table-layout-body-fixed-right-border-style);
                border-width: var(--obap-data-table-layout-body-fixed-right-border-width);
            }

            .body-action-right {
                grid-area: body-action-right;
                color: var(--obap-data-table-layout-body-action-right-color);
                background: var(--obap-data-table-layout-body-action-right-background-color);
                border-color: var(--obap-data-table-layout-body-action-right-border-color);
                border-style: var(--obap-data-table-layout-body-action-right-border-style);
                border-width: var(--obap-data-table-layout-body-action-right-border-width);
            }

            .footer-action-left {
                grid-area: footer-action-left;
                color: var(--obap-data-table-layout-footer-action-left-color);
                background: var(--obap-data-table-layout-footer-action-left-background-color);
                border-color: var(--obap-data-table-layout-footer-action-left-border-color);
                border-style: var(--obap-data-table-layout-footer-action-left-border-style);
                border-width: var(--obap-data-table-layout-footer-action-left-border-width);
            }

            .footer-fixed-left {
                grid-area: footer-fixed-left;
                color: var(--obap-data-table-layout-footer-fixed-left-color);
                background: var(--obap-data-table-layout-footer-fixed-left-background-color);
                border-color: var(--obap-data-table-layout-footer-fixed-left-border-color);
                border-style: var(--obap-data-table-layout-footer-fixed-left-border-style);
                border-width: var(--obap-data-table-layout-footer-fixed-left-border-width);
            }

            .footer-scroll {
                grid-area: footer-scroll;
                color: var(--obap-data-table-layout-footer-scroll-color);
                background: var(--obap-data-table-layout-footer-scroll-background-color);
                border-color: var(--obap-data-table-layout-footer-scroll-border-color);
                border-style: var(--obap-data-table-layout-footer-scroll-border-style);
                border-width: var(--obap-data-table-layout-footer-scroll-border-width);
            }

            .footer-fixed-right {
                grid-area: footer-fixed-right;
                color: var(--obap-data-table-layout-footer-fixed-right-color);
                background: var(--obap-data-table-layout-footer-fixed-right-background-color);
                border-color: var(--obap-data-table-layout-footer-fixed-right-border-color);
                border-style: var(--obap-data-table-layout-footer-fixed-right-border-style);
                border-width: var(--obap-data-table-layout-footer-fixed-right-border-width);
            }

            .footer-action-right {
                grid-area: footer-action-right;
                color: var(--obap-data-table-layout-footer-action-right-color);
                background: var(--obap-data-table-layout-footer-action-right-background-color);
                border-color: var(--obap-data-table-layout-footer-action-right-border-color);
                border-style: var(--obap-data-table-layout-footer-action-right-border-style);
                border-width: var(--obap-data-table-layout-footer-action-right-border-width);
            }

            .pager {
                grid-area: pager;
                color: var(--obap-data-table-layout-pager-color);
                background: var(--obap-data-table-layout-pager-background-color);
                border-color: var(--obap-data-table-layout-pager-border-color);
                border-style: var(--obap-data-table-layout-pager-border-style);
                border-width: var(--obap-data-table-layout-pager-border-width);
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

            .empty {
                border: none;
            }
        `];
    }

    constructor() {
        super();
        this._slotLayoutComplete = false;
        this._boundHandleSlotChangeEvent = this._handleSlotChangeEvent.bind(this);
        this._boundHScrollHandler = this._hScrollHandler.bind(this);
        this._boundVScrollHandler = this._vScrollHandler.bind(this);
        this.renderRoot.addEventListener('slotchange', this._boundHandleSlotChangeEvent);

        this._resizeObserver = new ResizeObserver(entries => {
            requestAnimationFrame(() => this._positionScrollAreas());
            this.fireMessage('obap-data-table-layout-size-changed');
        });
    }

    connectedCallback() {
        super.connectedCallback();
        this._scrollbarWidth = this._getScrollbarWidth();
        this._scrollbarStyle = this._hasScrollbarStyle();
        this._resizeObserver.observe(this);
    }

    disconnectedCallback() {
        this._resizeObserver.unobserve(this);
        super.disconnectedCallback();
    }

    render() {
        return html`
            <div class="container">
                <div tabindex="0" class="grid-part detail" no-scroll><slot name="detail"></slot></div>

                <div tabindex="0" class="grid-part grouper" no-scroll><slot name="grouper"></slot></div>
                
                <div tabindex="0" class="grid-part header-action-left" no-scroll><slot name="header-action-left"></slot></div>
                <div tabindex="0" class="grid-part header-fixed-left" no-scroll><slot name="header-fixed-left"></slot></div>
                <div tabindex="0" class="grid-part header-scroll" h-scroll><slot name="header-scroll"></slot></div>
                <div tabindex="0" class="grid-part header-fixed-right" no-scroll><slot name="header-fixed-right"></slot></div>
                <div tabindex="0" class="grid-part header-action-right" no-scroll><slot name="header-action-right"></slot></div>
               
                <div tabindex="0" class="grid-part body-action-left" v-scroll><slot name="body-action-left"></slot></div>
                <div tabindex="0" class="grid-part body-fixed-left" v-scroll><slot name="body-fixed-left"></slot></div>
                <div tabindex="0" class="grid-part body-scroll" v-scroll h-scroll><slot name="body-scroll"></slot></div>
                <div tabindex="0" class="grid-part body-fixed-right" v-scroll><slot name="body-fixed-right"></slot></div>
                <div tabindex="0" class="grid-part body-action-right" v-scroll><slot name="body-action-right"></slot></div>
                
                <div tabindex="0" class="grid-part footer-action-left" no-scroll><slot name="footer-action-left"></slot></div>
                <div tabindex="0" class="grid-part footer-fixed-left" no-scroll><slot name="footer-fixed-left"></slot></div>
                <div tabindex="0" class="grid-part footer-scroll" h-scroll><slot name="footer-scroll"></slot></div>
                <div tabindex="0" class="grid-part footer-fixed-right" no-scroll><slot name="footer-fixed-right"></slot></div>
                <div tabindex="0" class="grid-part footer-action-right" no-scroll><slot name="footer-action-right"></slot></div>
                
                <div tabindex="0" class="grid-part pager" no-scroll><slot name="pager"></slot></div>
            </div>
        `;
    }

    updateLayout() {
        this._resetScrollElements();
        this._positionScrollAreas();

        this._slotLayoutComplete = false;
    }

    _handleSlotChangeEvent(e) {
        if (!this._slotLayoutComplete) {
            this._slotLayoutComplete = true

            let currentEmptyElements = [...this.renderRoot.querySelectorAll('slot')].filter((slot) => slot.parentElement.classList.contains('empty')).map((slot) => slot.parentElement);
            
            currentEmptyElements.forEach((el) => {
                el.classList.remove('empty');
            });

            this._positionScrollAreas();

            let emptyElements = [...this.renderRoot.querySelectorAll('slot')].filter((slot => slot.assignedElements().length === 0)).map((slot) => slot.parentElement);

            emptyElements.forEach((el) => {
                if ((el.clientWidth <= 1) || (el.clientHeight <= 1)) {
                    el.classList.add('empty');
                }
            });
        }
    }

    _hScrollHandler(e) {
        const el = e.target;

        requestAnimationFrame(() => {
            this._hSync(el);

            if (!el.classList.contains('hidden-scrollbar')) {
                this.fireMessage('open-data-table-horizontal-scroll', { position: el.scrollLeft, clientWidth: el.clientWidth, scrollWidth: el.scrollWidth })
            }
        });
    }

    _vScrollHandler(e) {
        const el = e.target;

        requestAnimationFrame(() => {
            this._vSync(el);

            if (!el.classList.contains('hidden-scrollbar')) {
                this.fireMessage('open-data-table-vertical-scroll', { position: el.scrollTop, clientHeight: el.clientHeight, scrollHeight: el.scrollHeight })
            }
        });
    }

    _hSync(src) {
        if ((src._ignoreLeftScroll) || (src.offsetHeight < 1.1)) {
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
        if ((src._ignoreTopScroll) || (src.offsetWidth < 1.1)) {
            src._ignoreTopScroll = false;
            return;
        }

        this._vElements.forEach((el) => {
            if ((el !== src) && (el.scrollTop !== src.scrollTop)) {
                this._scrollTop(el, src.scrollTop);
            }
        });
    }

    _hasScrollbarStyle() {
        const style = getComputedStyle(this);
        return style.scrollbarWidth; // This basically identifies Firefox.
    }

    _resetScrollElements() {
        const vElements = [...this.renderRoot.querySelectorAll('div[v-scroll]')];

        vElements.forEach((el, index) => {
            let div = el.querySelector('div.scroll-spacer');

            if (div) {
                el.removeChild(div);
            }
        });

        const hElements = [...this.renderRoot.querySelectorAll('div[h-scroll]')];

        hElements.forEach((el, index) => {
            let div = el.querySelector('div.scroll-spacer');

            if (div) {
                el.removeChild(div);
            }
        });
    }

    _positionScrollAreas() {
        // Vertical scrollbar on right body-xxx.
        this._vElements = [...this.renderRoot.querySelectorAll('div[v-scroll]')];
        const lastVIndex = this._vElements.length - 1;
        const maxHeight = Math.max(...this._vElements.map((el) => el.scrollHeight));

        this._vElements.forEach((el, index) => {
            el.style.overflowY = 'auto';

            if (el.children[0].assignedElements().length === 0) {
                let div = el.querySelector('div.scroll-spacer');

                if (!div) {
                    div = document.createElement('div');
                    div.classList.add('scroll-spacer');
                    el.appendChild(div);
                }

                div.style.height = maxHeight + 'px';
                div.style.width = (maxHeight - el.clientHeight > 0) && this._scrollbarStyle && (index === lastVIndex) ? this._scrollbarWidth : '0.1px';
            }

            if (index !== lastVIndex) {
                el.classList.add('hidden-scrollbar');
            } else {
                el.classList.remove('hidden-scrollbar');
            }

            el.addEventListener('scroll', this._boundVScrollHandler, { passive: true });
        });

        // Horizontal scrollbar on bottom xxx-scroll.
        //this._hElements = [...this.renderRoot.querySelectorAll('div[h-scroll]')].filter((el) => !el.classList.contains('empty'));
        this._hElements = [...this.renderRoot.querySelectorAll('div[h-scroll]')];
        const lastHIndex = this._hElements.length - 1;
        const maxWidth = Math.max(...this._hElements.filter((el) => !el.classList.contains('empty')).map((el) => el.scrollWidth));

        this._hElements.forEach((el, index) => {
            el.style.overflowX = 'auto';

            if (el.children[0].assignedElements().length === 0) {
                let div = el.querySelector('div.scroll-spacer');

                if (!div) {
                    div = document.createElement('div');
                    div.classList.add('scroll-spacer');
                    el.appendChild(div);
                }

                div.style.width = maxWidth + 'px';
                div.style.height = '0.1px';
            }

            if (index !== lastHIndex) {
                el.classList.add('hidden-scrollbar');
            } else {
                el.classList.remove('hidden-scrollbar');
            }

            el.addEventListener('scroll', this._boundHScrollHandler, { passive: true });
        });
    }

    _scrollLeft(el, value) {
        el._ignoreLeftScroll = true;
        el.scrollLeft = value;
    }

    _scrollTop(el, value) {
        el._ignoreTopScroll = true;
        el.scrollTop = value;
    }

    _getScrollbarWidth() {
        const outer = document.createElement('div');
        outer.style.visibility = 'hidden';
        outer.style.overflow = 'scroll';
        outer.style.msOverflowStyle = 'scrollbar';
        document.body.appendChild(outer);
        const inner = document.createElement('div');
        outer.appendChild(inner);
        const scrollbarWidth = (outer.offsetWidth - inner.offsetWidth);
        outer.parentNode.removeChild(outer);
        return scrollbarWidth + 'px';
    }
}

window.customElements.define('obap-data-table-layout', OpenDataTableLayout);