/*
@license
Copyright (c) 2021 Paul H Mason. All rights reserved.
*/
import { html, css, svg, ObapElement } from '../obap-element/obap-element.js';

/**
 * A star rating element.
 */
export class ObapRating extends ObapElement {
    static get styles() {
        return [css`
            :host {
                --obap-rating-color: var(--obap-text-icon-color, rgba(0, 0, 0, 0.38));
                --obap-rating-disabled-color: #E0E0E0;
                --obap-rating-size: 20px;
                --obap-rating-separation: 4px;
                display: block;
                fill: var(--obap-rating-color); 
            }
    
            :host([hidden]) {
                display: none !important;
            }
    
            :host([disabled]) {
                pointer-events: none;
            }

            /*
            :host([disabled]) > div > div > svg {
                fill: var(--obap-rating-disabled-color);
            }
            */
           :host([disabled]) {
                fill: var(--obap-rating-disabled-color);
            }

            .container {
                display: flex;
                align-items: center;
            }

            .container[read-only] {
                pointer-events: none;
            }

            .item {
                width: var(--obap-rating-size);
                height: var(--obap-rating-size);
                margin-right: var(--obap-rating-separation);
                cursor: pointer;
            }

            .item:last-of-type {
                margin-right: 0;
            }

            svg {
                user-select: none;
                stroke: transparent;
                /*fill: var(--obap-rating-color);*/
                pointer-events: none;
            }
        `];
    }

    static get properties() {
        return {
            count: {
                type: Number,
                attribute: 'count'
            },

            rating: {
                type: Number,
                attribute: 'rating'
            },

            allowHalf: {
                type: Boolean,
                attribute: 'allow-half'
            },

            heart: {
                type: Boolean,
                attribute: 'heart'
            },

            readOnly: {
                type: Boolean,
                attribute: 'read-only'
            },

            label: {
                type: String
            }
        }
    }

    get label() {
        return this._label;
    }

    set label(value) {
        const oldValue = this.label;

        if (oldValue !== value) {
            this._label = value;
            this.requestUpdate('label', oldValue);
            this.setAttribute('aria-label', value); 
        }
    }

    get count() {
        return this._count;
    }

    set count(value) {
        const oldValue = this.count;

        if (oldValue !== value) {
            this._count = value;
            this.requestUpdate('count', oldValue);
            this.setAttribute('aria-valuemax', value);
        }
    }

    get rating() {
        return this._rating;
    }

    set rating(value) {
        const oldValue = this.rating;

        if ((value >= 0) && (value <= this.count) && (oldValue !== value) && (!this.disabled)) {
            this._rating = value;

            this.fireMessage('obap-rating-change', {
                oldValue: oldValue,
                newValue: this._rating
            });

            this.requestUpdate('rating', oldValue);
            this.setAttribute('aria-valuenow', value);
        }
    }

    constructor() {
        super();
        
        this.role = 'progressbar';
        this.label = 'Rating';
        this.count = 5;
        this._rating = 0;
        this.allowHalf = false;
        this.heart = false;
        this.readOnly = false;
        this._prevIndex = -1;
    }

    connectedCallback() {
        super.connectedCallback();
        this.setAttribute('aria-valuemin', 0);
    }

    render() {
        return html`
            <div class="container" ?read-only="${this.readOnly}">
                ${[...Array(this.count)].map((_, index) => html`
                    <div class="item" index="${index}" @click="${this._starClick}">  
                        ${this._renderImage(index, this.rating)}
                    </div>
                `)}
            </div>`;
    }

    // open, half, closed
    _renderImage(index, rating) {
        const delta = rating - index;
        let style = delta > 0 ? 'closed' : 'open';

        if ((this.allowHalf) && (delta === 0.5)) {
            style = 'half';
        }

        return this.heart ? this._renderHeart(style) : this._renderStar(style);
    }

    _renderStar(style) {
        switch (style) {
            case 'half': {
                return svg`<svg val="0.5" class="star" viewBox="0 0 24 24"><g><path d="M22 9.24l-7.19-.62L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21 12 17.27 18.18 21l-1.63-7.03L22 9.24zM12 15.4V6.1l1.71 4.04 4.38.38-3.32 2.88 1 4.28L12 15.4z"/></g></svg>`;
            }

            case 'closed': {
                return svg`<svg val="1" class="star" viewBox="0 0 24 24"><g><path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"/></g></svg>`;
            }

            default: {
                return svg`<svg val="0" class="star" viewBox="0 0 24 24"><g><path d="M22 9.24l-7.19-.62L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21 12 17.27 18.18 21l-1.63-7.03L22 9.24zM12 15.4l-3.76 2.27 1-4.28-3.32-2.88 4.38-.38L12 6.1l1.71 4.04 4.38.38-3.32 2.88 1 4.28L12 15.4z"/></g></svg>`;
            }
        }
    }

    _renderHeart(style) {
        switch (style) {
            case 'half': {
                return svg`<svg val="0.5" class="star" viewBox="0 0 24 24"><g><path d="M16.5,3C14.76,3 13.09,3.81 12,5.09C10.91,3.81 9.24,3 7.5,3C4.42,3 2,5.42 2,8.5C2,12.28 5.4,15.36 10.55,20.04L12,21.35L13.45,20.03C18.6,15.36 22,12.28 22,8.5C22,5.42 19.58,3 16.5,3ZM12.1,18.55L12,18.65L12.005,7.36L12.94,7.36C13.46,5.99 14.96,5 16.5,5C18.5,5 20,6.5 20,8.5C20,11.39 16.86,14.24 12.1,18.55Z"/></g></svg>`;
            }

            case 'closed': {
                return svg`<svg val="1" class="star" viewBox="0 0 24 24"><g><path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/></g></svg>`;
            }

            default: {
                return svg`<svg val="0" class="star" viewBox="0 0 24 24"><g><path d="M16.5 3c-1.74 0-3.41.81-4.5 2.09C10.91 3.81 9.24 3 7.5 3 4.42 3 2 5.42 2 8.5c0 3.78 3.4 6.86 8.55 11.54L12 21.35l1.45-1.32C18.6 15.36 22 12.28 22 8.5 22 5.42 19.58 3 16.5 3zm-4.4 15.55l-.1.1-.1-.1C7.14 14.24 4 11.39 4 8.5 4 6.5 5.5 5 7.5 5c1.54 0 3.04.99 3.57 2.36h1.87C13.46 5.99 14.96 5 16.5 5c2 0 3.5 1.5 3.5 3.5 0 2.89-3.14 5.74-7.9 10.05z"/></g></svg>`;
            }
        }
    }

    _starClick(e) {
        const index = Number(e.target.getAttribute('index'));
        let newRating = index;

        if (this.allowHalf) {
            const val = Number(e.target.querySelector('svg').getAttribute('val'));

            if (val !== 1) {
                newRating += val + 0.5;
            }

            if (index < this._prevIndex) {
                newRating += 0.5;
            }
        } else {
            newRating += 1;

            if (this.rating === newRating) {
                newRating -= 1;
            }
        }

        this._prevIndex = index;
        this.rating = newRating;
    }
}

window.customElements.define('obap-rating', ObapRating);