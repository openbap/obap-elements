/*
@license
Copyright (c) 2020 Paul H Mason. All rights reserved.
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

                // 'none' (default), 'underline', 'outline'
                borderStyle: {
                    type: String,
                    attribute: 'border-style',
                    reflect: true
                },

                filled: {
                    type: Boolean,
                    attribute: 'filled',
                    reflect: true
                },

                floatLabel: {
                    type: Boolean,
                    attribute: 'float-label'
                },

                opened: {
                    type: Boolean,
                    attribute: 'opened'
                }
            }
        }

        constructor() {
            super();
            this.label = '';
            this.borderStyle = 'none';
            this.filled = false;
            this.floatLabel = false;
            this.opened = false;
        }
    };