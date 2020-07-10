/*
@license
Copyright (c) 2020 Paul H Mason. All rights reserved.
*/
export const ObapApplicationContentController = (superClass) =>
    class ObapApplicationContentControllerComponent extends superClass {
        static get properties() {
            return {
                name: {
                    type: String,
                    attribute: 'name'
                },

                label: {
                    type: String,
                    attribute: 'label'
                }
            }
        }
        
        constructor() {
            super();
            this.label = '';
            this.name = ''
            this._active = false;
        }

        get active() {
            return this._active;
        }

        connectedCallback() {
            super.connectedCallback();
            this.setAttribute('application-content', '');
        }

        _canActivate() {
            if (this.canActivate) {
                return this.canActivate();
            } 

            return true;
        }

        _canDeactivate() {
            if (this.canDeactivate) {
                return this.canDeactivate();
            } 

            return true;
        }

        _activate() {
            if (!this._active) {
                this._active = true;

                if (this.activate) {
                    this.activate();
                } else {
                    this.fireMessage('obap-view-activate');
                }
            }
        }

        _deactivate() {
            if (this._active) {
                if (this.deactivate) {
                    this.deactivate();
                } else {
                    this.fireMessage('obap-view-deactivate');
                }

                this._active = false;
            }
        }
    };