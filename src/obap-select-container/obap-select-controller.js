/*
@license
Copyright (c) 2021 Paul H Mason. All rights reserved.
*/
/**
Provides some common functionality for creating select elements. 
*/
export const ObapSelectController = (superClass) =>
    class ObapSelectControllerComponent extends superClass {
        static get properties() {
            return {
                label: {
                    type: String,
                    attribute: 'label'
                },

                icon: {
                    type: String,
                    attribute: 'icon'
                },

                value: {
                    type: String,
                    attribute: 'value'
                },

                // 'none' (default), 'underline', 'outline', 'conventional'
                borderStyle: {
                    type: String,
                    attribute: 'border-style',
                    reflect: true
                },

                noFloatLabel: {
                    type: Boolean,
                    attribute: 'no-float-label'
                },

                opened: {
                    type: Boolean,
                    attribute: 'opened'
                }
            }
        }

        get opened() {
            return this._opened;
        }

        set opened(value) {
            const oldValue = this.opened;

            if (oldValue !== value) {
                this._opened = value;
                value ? this.fireMessage('obap-select-action', { action: 'opened' }) : this.fireMessage('obap-select-action', { action: 'closed' })
                this.requestUpdate('opened', oldValue);
            }
        }

        constructor() {
            super();
            this.label = '';
            this.icon = '';
            this.value = '';
            this.borderStyle = 'none';
            this.noFloatLabel = false;
            this._opened = false; 
        }
    };