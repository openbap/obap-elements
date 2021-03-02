/*
@license
Copyright (c) 2021 Paul H Mason. All rights reserved.
*/
/**
TODO
*/

/*
Message Structure

const message = {
    source: this.id,
    destination: null // null/undefined = host, valid string id = one other client, string array = group of clients, -1 all clients.
    type: 'standard:register',
    body: {

    }
}
*/

export const ObapMessageHubController = (superClass) =>
    class ObapMessageHubControllerComponent extends superClass {
        static get properties() {
            return {
                targetOrigin: {
                    type: String,
                    attribute: 'target-origin'
                }
            }
        }

        constructor() {
            super();

            this._messageHubActive = false;
            this.targetOrigin = '*';
            this._messageClients = new Map();
            this._boundHandleMessageHubPostMessage = this._handleMessageHubPostMessage.bind(this);
        }

        get messageHubActive() {
            return this._messageHubActive;
        }

        startMessageHub() {
            if (!this._messageHubActive) {
                window.addEventListener('message', this._boundHandleMessageHubPostMessage, false);
                this._messageHubActive = true;
            }
        }

        stopMessageHub() {
            window.removeEventListener('message', this._boundHandleMessageHubPostMessage, false);
            this._messageHubActive = false;
        }

        createClientMessage(type, body) {
            return {
                type: type,
                body: body
            };
        }

        sendMessageToAllClients(message) {
            this.sendMessageToClient(-1, message);
        }

        sendMessageToSomeClients(destinations, message) {
            this.sendMessageToClient(destinations, message);
        }

        sendMessageToClient(destination, message) {
            if (!this.messageHubActive) return;
            
            if (destination === -1) {
                // Broadcast to all clients.
                for (let client of this._messageClients.keys()) {
                    this._sendMessageToClient(client, message);
                }
            } else {
                // Send to list of clients.
                if (Array.isArray(destination)) {
                    destination.forEach(item => {
                        this._sendMessageToClient(item, message);
                    });
                } else {
                    // Send to single client.
                    this._sendMessageToClient(destination, message);
                }
            }
        }

        _handleMessageHubPostMessage(e) {
            const message = JSON.parse(e.data);

            if (message.source && message.type) {
                if ((message.destination !== undefined) && (message.destination !== null)) {
                    this._processClientMessage(message);
                } else {
                    this._processHubMessage(message, e.source)
                }

            }
        }

        _processHubMessage(message, source) {
            switch (message.type) {
                case 'host-register': {
                    if (message.targetOrigin) {
                        const client = {
                            id: message.source,
                            targetOrigin: message.targetOrigin,
                            target: source 
                        }

                        this._messageClients.set(message.source, client);

                        if (this.onClientRegistered) {
                            this.onClientRegistered(message);
                        } 
                    }

                    break;
                }

                case 'host-unregister': {
                    this._messageClients.delete(message.source);

                    if (this.onClientUnregistered) {
                        this.onClientUnregistered(message);
                    }

                    return true;
                }

                default: {
                    if (this.onClientMessage) {
                        this.onClientMessage(message);
                    }
                }
            }
        }

        _processClientMessage(message) {
            this.sendMessageToClient(message.destination, message)
        }

        _sendMessageToClient(id, message) {
            if (!this.messageHubActive) return;

            const client = this._messageClients.get(id);

            if (client) {
                const target = client.target;
                const targetOrigin = client.targetOrigin;

                let msg = {
                    source: 'host',
                    originalSource: message.source,
                    type: message.type,
                    body: message.body
                };

                if (message.correlationId) {
                    msg.correlationId = message.correlationId;
                }

                target.postMessage(JSON.stringify(msg), targetOrigin);
            }
        }
    };