/*
@license
Copyright (c) 2021 Paul H Mason. All rights reserved.
*/
import { html, css, ObapElement } from '../obap-element/obap-element.js';
import '../obap-linear-progress/obap-linear-progress.js';
import '../obap-circular-progress/obap-circular-progress.js';
import { hostElevation } from '../obap-styles/obap-elevation.js';

/**
 * A circular or linear busy/activity indicator.
 */
export class ObapActivityIndicator extends ObapElement {
    static get styles() {
        return [hostElevation, css`
            :host {
                --obap-activity-indicator-linear-width: 240px;
                --obap-activity-indicator-duration: 1s;
                --obap-activity-indicator-color: var(--obap-primary-color, #5c6bc0);
                --obap-activity-indicator-background-color: transparent;
                --obap-activity-indicator-track-color: var(--obap-block-color, #ECECEC);

                display: block;
                border-radius: 0;
                padding: 4px;
            }
    
            :host([hidden]) {
                display: none !important;
            }
    
            :host([disabled]) {
                pointer-events: none;
            }

            :host([activity-type="circular"]) {
                border-radius: 50%;
            }

            :host([activity-type="linear"]) {
                width: var(--obap-activity-indicator-linear-width);
            }

            obap-linear-progress {
                --obap-linear-progress-primary-color: var(--obap-activity-indicator-color);
                --obap-linear-progress-backround-color: var(--obap-activity-indicator-track-color);
                --obap-linear-progress-indeterminate-duration: var(--obap-activity-indicator-duration);
            }

            obap-circular-progress {
                --obap-circular-progress-primary-color: var(--obap-activity-indicator-color);
                --obap-circular-progress-indeterminate-duration: calc(var(--obap-activity-indicator-duration) * 1.5);
            }

            obap-linear-progress[mini] {
                height: 2px;
            }

            obap-circular-progress[mini] {
                --obap-circular-progress-size: 20px;
                --obap-circular-progress-stroke-width: 3px;
            }

            .typing-indicator {
                display: flex;
            }

            .pill {
                width: 8px;
                height: 8px;
                margin-right: 2px;   
                background: var(--obap-activity-indicator-color);
                transform-origin: 0% 100%;
                animation: pill-flip calc(var(--obap-activity-indicator-duration) * 0.5) infinite ;
            }

            .typing-indicator[round] > .pill {
                border-radius: 50%;
            }

            .typing-indicator[disabled] > .pill {
                background: var(--obap-activity-indicator-track-color);
                animation: none;
            }

            .pill[mini] {
                width: 6px;
                height: 6px;
            }

            .pill:last-of-type {
                margin-right: 0;
            }

            .pill-1 {
                animation-delay: 0;
            }

            .pill-2 {
                animation-delay: calc(var(--obap-activity-indicator-duration) * 0.1);
            }

            .pill-3 {
                animation-delay: calc(var(--obap-activity-indicator-duration) * 0.2);
            }

            @keyframes pill-flip {
                from {
                    transform: scale(1, 1);
                }

                50% {
                    transform: scale(1, -0.1);
                }

                to {
                    transform: scale(1, 1);
                } 
            }
        `];
    }

    static get properties() {
        return {
            // 'circular' (default), 'linear' 'typing' and 'equalizer'.
            activityType: {
                type: String,
                attribute: 'activity-type',
                reflect: true
            },

            mini: {
                type: Boolean,
                attribute: 'mini',
                reflect: true
            }
        }
    }

    constructor() {
        super();
        this.activityType = 'circular';
        this.mini = false;
    }

    render() {
        switch (this.activityType) {
            case 'linear': {
                return html`<obap-linear-progress ?mini="${this.mini}" indeterminate ?disabled="${this.disabled}"></obap-linear-progress>`;
            }

            case 'typing': {
                return this._renderTypingIndicator(true);
            }

            case 'equalizer': {
                return this._renderTypingIndicator(false);
            }

            default: {
                return html`<obap-circular-progress ?mini="${this.mini}" indeterminate ?disabled="${this.disabled}"></obap-circular-progress>`
            }
        }
    }

    _renderTypingIndicator(round) {
        return html`
            <div class="typing-indicator" ?round="${round}" ?disabled="${this.disabled}">
                <div ?mini="${this.mini}" class="pill pill-1"></div><div ?mini="${this.mini}" class="pill pill-2"></div><div ?mini="${this.mini}" class="pill pill-3"></div>
            </div>
        `;
    }
}

window.customElements.define('obap-activity-indicator', ObapActivityIndicator);
