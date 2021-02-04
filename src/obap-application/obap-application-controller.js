/*
@license
Copyright (c) 2021 Paul H Mason. All rights reserved.
*/
import { ObapThemeController } from '../obap-styles/obap-theme-controller.js';
import { ObapRouterController, ObapRoute } from '../obap-router/obap-router-controller.js';

export const ObapApplicationController = (superClass) =>
    class ObapApplicationControllerComponent extends ObapRouterController(ObapThemeController(superClass)) {
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

                views: {
                    type: Array
                },

                canChangeView: {
                    type: Boolean
                }
            }
        }

        get selectedViewIndex() {
            return this._selectedViewIndex;
        }

        set selectedViewIndex(value) {
            const oldValue = this.selectedViewIndex;

            if (oldValue !== value) {
                this._selectedViewIndex = value;
                this._previousViewIndex = oldValue;

                const view = this.getSelectedView();

                if (view) {
                    this.setCurrentRoute(view.name, null);
                }

                this.requestUpdate('selectedViewIndex', oldValue);
            }
        }

        constructor() {
            super();

            this._boundHandleSlotChangeEvent = this._handleSlotChangeEvent.bind(this);
            this.views = [];
            this.label = 'untitled';
            this.icon = '';
            this.defaultViewName = null;
            this._selectedViewIndex = null;
            this._previousViewIndex = null;
            this._navigatorCounts = {};

            this.renderRoot.addEventListener('slotchange', this._boundHandleSlotChangeEvent);
        }

        updated(changedProperties) {
            super.updated(changedProperties);

            changedProperties.forEach((oldValue, propName) => {
                if (propName === 'views') {
                    this._registerViews();
                }
            });
        }

        findView(name) {
            return this.views.find((view) => (view.name === name));
        }

        showView(name) {
            const view = this.findView(name);

            if (view) {
                this.selectedViewIndex = this.views.indexOf(view);
            }
        }

        showDefaultView() {
            this.showView(this.defaultViewName);
        }

        canViewActivate(name) {
            let view = null;

            if (name) {
                view = this.findView(name);
            } else {
                view = this.views[this.selectedViewIndex];
            }

            if (view) {
                return view.canViewActivate();
            }

            return true;
        }

        canViewDeactivate(name) {
            let view = null;

            if (name) {
                view = this.findView(name);
            } else {
                view = this.views[this.selectedViewIndex];
            }

            if (view) {
                return view.canViewDeactivate();
            }

            return true;
        }

        showPreviousView() {
            let val = parseInt(this._previousViewIndex);

            if (val >= 0) {
                this.selectedViewIndex = val;
                this._previousViewIndex = null;
            } else if (this.defaultViewName) {
                this.showView(this.defaultViewName);
            }
        }

        getSelectedView() {
            let val = parseInt(this.selectedViewIndex);

            if (val >= 0) {
                return this.views[val];
            }

            return null;
        }

        getNavigatorViews(navigator) {
            let selectedView = this.views[this.selectedViewIndex];

            if (!selectedView) {
                return [];
            }

            let views = this.views.filter((view) => {
                return ((view.navigators.indexOf(navigator) > -1) &&
                    ((view.associations.length === 0) || view.associations.indexOf(selectedView.name) > -1));
            });

            return views;
        }

        getEffectiveDisplayTitle() {
            let selectedView = this.getSelectedView();

            if ((selectedView) && (selectedView.modal)) {
                return selectedView.label;
            }

            return this.label;
        }

        isModalView() {
            let selectedView = this.getSelectedView();

            if ((selectedView) && (selectedView.modal)) {
                return true;
            }

            return false;
        }

        navigatorViewCount(navigator) {
            if (this._navigatorCounts[navigator] !== undefined) {
                return this._navigatorCounts[navigator];
            }

            return 0;
        }

        onRouteChange(name) {
            this.showView(name);
        }

        _handleSlotChangeEvent(e) {
            let slot = this.renderRoot.querySelector('slot');

            if (!slot) return;

            let views = slot.assignedNodes({ flatten: true }).filter((el) => {
                return ((el.nodeType === 1) && (el.tagName === 'OBAP-APPLICATION-VIEW'));
            });

            if (this.views.length !== views.length) {
                this.views = views;
            };

            this.views.forEach((view) => {
                view.navigators.forEach((navigator) => {
                    if (this._navigatorCounts[navigator] === undefined) {
                        this._navigatorCounts[navigator] = 0;
                    }

                    this._navigatorCounts[navigator]++;
                });
            });

            this.requestUpdate();
        }

        _registerViews() {
            let hasDefault = false;

            this.views.forEach((view) => {
                if (view.default) {
                    hasDefault = true;
                    this.defaultViewName = view.name;
                }

                this.registerRoute(new ObapRoute(view.name, view.name, view.default));
            });

            if ((!hasDefault) && (this.views.length > 0)) {
                this.defaultViewName = this.views[0].name
                this.setDefaultRoute(this.defaultViewName);
            }

            this.navigateToDefault(true);
        }
    };
