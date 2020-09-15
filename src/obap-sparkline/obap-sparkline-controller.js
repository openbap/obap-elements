/*
@license
Copyright (c) 2020 Paul H Mason. All rights reserved.
*/
/**
TODO
*/
export const ObapSparklineController = (superClass) =>
    class ObapSparklineControllerComponent extends superClass {
        constructor() {
            super();

            this._resizeObserver = new ResizeObserver(entries => {
                this.requestUpdate();
            });
        }


        connectedCallback() {
            super.connectedCallback();
            this._resizeObserver.observe(this);
        }

        disconnectedCallback() {
            this._resizeObserver.unobserve(this);
            super.disconnectedCallback();
        }
    };