/*
@license
Copyright (c) 2021 Paul H Mason. All rights reserved.
*/
/**
The following handlers can be provided:

onViewActivated(appId, viewId)
onViewDeactivated(appId, viewId)
onViewThemeChanged(name)
onViewLocaleChanged()

*/
export const ObapCompositeHostedApplicationContentController = (superClass) =>
    class ObapCompositeHostedApplicationContentControllerComponent extends superClass {
        constructor() {
            super();
            this.__isViewContentItem = true;
        }

        sendHostMessage(type, body, callback) {
            if (window.applicationHost) {
                window.applicationHost.sendHostMessage(type, body, callback);
            }
        }

        sendViewMessage(type, body, destination, callback) {
            if (window.applicationHost) {
                window.applicationHost.sendViewMessage(type, body, destination, callback);
            }
        }

        navigateTo(appId, viewId) {
            if (window.applicationHost) {
                window.applicationHost.navigateTo(appId, viewId);
            }
        }

        showDialog(id, url, data, callback) {
            if (window.applicationHost) {
                window.applicationHost.showDialog(id, url, data, callback);
            }
        }

        showMessageDialog(caption, message, actions, callback) {
            if (window.applicationHost) {
                window.applicationHost.showMessageDialog(caption, message, actions, callback);
            }
        }

        showSnackbar(message, timeout) {
            if (window.applicationHost) {
                window.applicationHost.showSnackbar(message, timeout);
            }
        }

        showActionSnackbar(message, action, callback) {
            if (window.applicationHost) {
                window.applicationHost.showActionSnackbar(message, action, callback);
            }
        }
    };