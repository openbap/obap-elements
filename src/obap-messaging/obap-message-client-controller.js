/*
@license
Copyright (c) 2021 Paul H Mason. All rights reserved.
*/
/**
TODO
*/
export const ObapMessageClientController = (superClass) =>
    class ObapMessageClientControllerComponent extends superClass {
        static get properties() {
            return {
                messageClientId: {
                    type: String,
                    attribute: 'message-client-id'
                },

                targetOrigin: {
                    type: String,
                    attribute: 'target-origin'
                },

                hubTargetOrigin: {
                    type: String,
                    attribute: 'hub-target-origin'
                }
            }
        }

        constructor() {
            super();

            this.messageClientId = null;
            this.targetOrigin = '*';
            this.hubTargetOrigin = '*';

            this._messageClientActive = false;
            this._responseCallbacks = new Map();
            this._boundHandleMessageClientPostMessage = this._handleMessageClientPostMessage.bind(this);
        }

        get messageClientActive() {
            return this._messageClientActive;
        }

        registerMessageClient() {
            var message = null;

            if (this.getRegistrationDetails) {
                message = this.getRegistrationDetails()
            }

            this.sendHubMessage('host-register', message);
        }

        unregisterMessageClient() {
            this.sendHubMessage('host-unregister', null); 
        }

        startMessageClient() {
            if (!this._messageClientActive) {
                window.addEventListener('message', this._boundHandleMessageClientPostMessage, false);
                this._messageClientActive = true;
            }
        }

        stopMessageClient() {
            window.removeEventListener('message', this._boundHandleMessageClientPostMessage, false);
            this._messageClientActive = false;
        }

        sendHubMessage(type, body, callback) {
            if (!this.messageClientActive || !window.parent) return null;

            const message = {
                source: this.messageClientId,
                targetOrigin: this.targetOrigin,
                type: type
            }

            if (body) {
                message.body = body;
            }

            if (callback) {
                message.correlationId = Math.floor(Math.random() * 10000000000); // Need to generate unique value.
                this._responseCallbacks.set(message.correlationId, callback);
            } 

            window.parent.postMessage(JSON.stringify(message), this.hubTargetOrigin);
        }

        /*
        Destination Values:
            null/undefined: hub
            -1            : all clients
            []            : all clients (id's) in array.
        */
        sendClientMessage(type, body, destination, callback) {
            if (!this.messageClientActive || !window.parent) return;
            
            const message = {
                source: this.messageClientId,
                destination: destination,
                type: type
            }

            if (body) {
                message.body = body;
            }

            if (callback) {
                message.correlationId = Math.floor(Math.random() * 10000000000); // Need to generate unique value.
                this._responseCallbacks.set(message.correlationId, callback);
            } 

            window.parent.postMessage(JSON.stringify(message), this.hubTargetOrigin);
        }

        _handleMessageClientPostMessage(e) {
            const message = JSON.parse(e.data);

            if (message && message.source && message.type) {
                if (message.correlationId) {
                    const callback = this._responseCallbacks.get(message.correlationId);

                    if (callback) {
                        this._responseCallbacks.delete(message.correlationId);
                        callback(message.body);
                    }
                }
                
                if (this.receiveHubMessage) {
                    this.receiveHubMessage(message);
                }
            }
        }

        deferPromise(func) {
            let res, rej;
        
            let promise = new Promise((resolve, reject) => {
                res = resolve;
                rej = reject;

                if (func) func();
            });
        
            promise.resolve = res;
            promise.reject = rej;

            return promise;
        }
    };
