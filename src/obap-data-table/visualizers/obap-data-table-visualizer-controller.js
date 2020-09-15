/*
@license
Copyright (c) 2020 Paul H Mason. All rights reserved.
*/
/**
TODO
*/
export const ObapDataTableVisualizerController = (superClass) =>
    class ObapDataTableVisualizerControllerComponent extends superClass {
        static get properties() {
            return {
                value: {
                    type: Object
                },

                params: {
                    type: Object
                }
            }
        }

        constructor() {
            super();

            this.value = null;
            this.params = null;
        }

        getParamValue(name, defaultValue) {
            return (this.params && this.params[name]) ? this.params[name] : defaultValue;
        }

        getBaseStyle() {
            const style = this.getParamValue('baseStyle', null);

            if (style) {
                const styleNames = Object.getOwnPropertyNames(style);
                return styleNames.map((name) => `${name}: ${style[name]};`).join('');
            }

            return '';
        }

        getStyles(index) {
            const styles = this.getParamValue('styles', null);

            if (styles) {
                const style = styles[index];

                if (style) {
                    const styleNames = Object.getOwnPropertyNames(style);
                    return this.getBaseStyle() + styleNames.map((name) => `${name}: ${style[name]};`).join('');
                }
            }

            return this.getBaseStyle();
        }
    };