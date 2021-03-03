/*
@license
Copyright (c) 2021 Paul H Mason. All rights reserved.
*/

import { ObapMessageClientController } from '../obap-messaging/obap-message-client-controller.js';
import { ObapThemeController, themeManager } from '../obap-styles/obap-theme-controller.js';

export const ObapCompositeHostedApplicationController = (superClass) =>
    class ObapCompositeHostedApplicationControllerComponent extends ObapMessageClientController(ObapThemeController(superClass)) {
        static get properties() {
            return {
                viewId: {
                    type: String,
                    attribute: 'view-id'
                },

                topLevel: {
                    type: Boolean
                },

                publishedContexts: {
                    type: Array,
                    attribute: 'published-contexts'
                },

                subscribedContexts: {
                    type: Array,
                    attribute: 'subscribed-contexts'
                }
            }
        }

        get topLevel() {
            return this._topLevel;
        }

        get viewId() {
            return this.messageClientId;
        }

        set viewId(value) {
            this.messageClientId = value;
        }

        constructor() {
            super();

            this._topLevel = true;
            this.publishedContexts = [];
            this.subscribedContexts = [];
        }

        updated(changedProperties) {
            super.updated(changedProperties);

            changedProperties.forEach((oldValue, propName) => {
                if (propName === 'subscribedContexts') {
                    this._topLevel = (this.subscribedContexts.length === 0);
                }
            });
        }

        connectedCallback() {
            super.connectedCallback();
            this.startMessageClient();
            this.registerMessageClient(); 
        }

        disconnectedCallback() {
            this.unregisterMessageClient();
            this.stopMessageClient();
            super.disconnectedCallback();
        }

        sendHostMessage(type, body, callback) {
            this.sendHubMessage(type, body, callback);
        }

        sendViewMessage(type, body, destination, callback) {
            this.sendClientMessage(type, body, destination, callback)
        }

        navigateTo(appId, viewId) {
            this.sendHubMessage('navigate', { to: `${appId}-${viewId}` });
        }

        showDialog(id, url, data, callback) {
            this.sendHubMessage('show-dialog', { id: id, content: url, data: data}, callback);
        }

        showMessageDialog(caption, message, actions, callback) {
            this.sendHubMessage('show-message-dialog', { caption: caption, message: message, actions: actions }, callback);
        }

        showSnackbar(message, timeout) {
            this._showSnackbar(message, null, timeout, null);
        }

        showActionSnackbar(message, action, callback) {
            this._showSnackbar(message, action, null, callback);
        }

        _showSnackbar(message, action, timeout, callback) {
            this.sendHubMessage('show-snackbar', { message: message, action: action, timeout: timeout } , callback);
        }

        receiveHubMessage(message) {
            const data = message.body;

            switch (message.type) {
                case 'initialize': {
                    // Will contain:
                    //        View Information: appId, viewId, manageView (same as activate/deactivate).
                    //        Theme Information: theme = array of colors.
                    //        Locale Information: locale.
                    //this.active = (data.manageView ? data.appId : data.viewId) === this.viewId;
                    this._doInitialize(data);

                    if (data.theme) {
                        this._doThemeChange(data.theme);
                    }
                    
                    this._doLocaleChange();

                    this._doNavigation(data, true);
                    break;
                }


                case 'activate': {
                    // Will contain:
                    //        View Information: appId, viewId, manageView (same as activate/deactivate).
                    this._doNavigation(data, true);
                    break;
                }

                case 'deactivate': {
                    // Will contain:
                    //        View Information: appId, viewId, manageView (same as activate/deactivate).
                    this._doNavigation(data, false);
                    break;
                }
                
                case 'change-theme': {
                    // Will contain:
                    //      Theme Information: theme = array of colors.
                    if (data && data.theme) {
                        this._doThemeChange(data.theme);
                    }

                    break;
                }

                /*
                case 'set-locale': {
                    // Will contain:
                    //       Locale Information: locale.
    
                    this._doLocaleChange();
                    break;
                }
                */

                default: {
                    if (this.onViewMessage) {
                        this.onViewMessage(message);
                    }

                    const event = new CustomEvent(name, {
                        bubbles: true,
                        composed: true,
                        cancelable: false,
                        detail: message
                    });

                    this.dispatchEvent(event);
                }
            }
        }

        _doInitialize(data) {
            //console.log(`${this.appId} initialized`);
            if (this.onViewInitialized) {
                this.onViewInitialized(data.appId, (data.viewId === -1) ? null : data.viewId);
            }
        }

        _doThemeChange(theme) {
            //console.log(`${this.appId} theme changed`);
            if (!this.hasTheme(theme.name)) {
                themeManager.create(theme.name, theme.primaryLight, theme.primary, theme.primaryDark, theme.accent, theme.window);
            }
            
            this.theme = theme.name;
            //create(name, primaryLight, primary, primaryDark, accent, window)
            if (this.onViewThemeChanged) {
                this.onViewThemeChanged(theme.name);
            }
        }

        _doLocaleChange() {
            //console.log(`${this.appId} locale changed`);
            if (this.onViewLocaleChanged) {
                this.onViewLocaleChanged();
            }
        }

        _doNavigation(data, activate) {
            this.active = (data.manageView || data.viewId === -1 ? data.appId : data.viewId) === this.viewId;

            if (this.active) {
                if (activate) {
                    if (this.onViewActivated) {
                        this.onViewActivated(data.appId, (data.viewId === -1) ? null : data.viewId);
                    }
                } else {
                    if (this.onViewDeactivated) {
                        this.onViewDeactivated(data.appId, (data.viewId === -1) ? null : data.viewId);
                    }
                }
            }
        }
    };