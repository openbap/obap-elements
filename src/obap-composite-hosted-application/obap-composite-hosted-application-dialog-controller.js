/*
@license
Copyright (c) 2021 Paul H Mason. All rights reserved.
*/
import { ObapMessageClientController } from '../obap-messaging/obap-message-client-controller.js';
import { ObapThemeController, themeManager } from '../obap-styles/obap-theme-controller.js';
/**
TODO
*/
export const ObapCompositeHostedApplicationDialogController = (superClass) =>
    class ObapCompositeHostedApplicationDialogControllerComponent extends ObapMessageClientController(ObapThemeController(superClass)) {
        static get properties() {
            return {
                dialogId: {
                    type: String,
                    attribute: 'dialog-id'
                },

                caption: {
                    type: String
                },
    
                actions: {
                    type: Array
                },
    
                getDialogResult: {
                    type: Function
                },

                customData: {
                    type: Object
                }
            }
        }

        get dialogId() {
            return this.messageClientId;
        }

        set dialogId(value) {
            this.messageClientId = value;
        }

        constructor() {
            super();

            this.caption = '';
            this.actions = [];
            this.customData = null;
        }

        disconnectedCallback() {
            this.unregisterMessageClient();
            this.stopMessageClient();
    
            super.disconnectedCallback();
        }
    
        firstUpdated(changedProperties) {
            super.firstUpdated(changedProperties);
            this.startMessageClient();
            this.registerMessageClient();
    
            requestAnimationFrame(() => this.sendHubMessage('initialize-dialog', this._getInitializationDetails(), (data) => {
                const theme = data.theme;
                const customData = data.customData ? data.customData : null;

                this.customData = data.customData ? data.customData : null;

                if (theme) {
                    this._doThemeChange(theme);
                }
            }));
        }

        showDialog(id, url, data, callback) {
            this.sendHubMessage('show-dialog', { id: id, content: url, data: data } , callback);
        }

        showMessageDialog(caption, message, actions, callback) {
            this.sendHubMessage('show-message-dialog', { caption: caption, message: message, actions: actions }, callback);
        }

        _getInitializationDetails() {
            return {
                width: document.body.scrollWidth + 'px',
                height: document.body.scrollHeight + 'px',
                caption: this.caption,
                actions: this.actions
            }
        }
    
        receiveHubMessage(message) {
            const data = message.body;
    
            switch (message.type) {
                case 'dialog-dismissed': {
                    if (this.getDialogResult) {
                        this.sendHubMessage('dialog-result', this.getDialogResult(message.body.action));
                    }

                    break;
                }
    
                case 'dialog-action': {
                    if (this.onDialogAction) {
                        this.onDialogAction(message.body.action);
                    }

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
            }
        }

        _doThemeChange(theme) {
            if (!this.hasTheme(theme.name)) {
                themeManager.create(theme.name, theme.primaryLight, theme.primary, theme.primaryDark, theme.accent, theme.window);
            }
            
            this.theme = theme.name;
        }
    };