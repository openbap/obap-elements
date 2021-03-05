/*
@license
Copyright (c) 2021 Paul H Mason. All rights reserved.
*/
import { html, css, ObapElement } from '../obap-element/obap-element.js';
import { ifDefined } from 'lit-html/directives/if-defined';
import './obap-composite-application-container.js';
import '../obap-top-app-bar/obap-top-app-bar.js';
import '../obap-navigation-bar/obap-navigation-bar.js';
import '../obap-material/obap-material.js';
import '../obap-dialog/obap-message-dialog.js';
import '../obap-button/obap-button.js';
import '../obap-snackbar/obap-snackbar.js';
import './obap-composite-application-dialog.js';
import '../obap-pages/obap-pages.js';
import { ObapThemeController, themeManager } from '../obap-styles/obap-theme-controller.js';
import { ObapRouterController, ObapRoute } from '../obap-router/obap-router-controller.js';
import { ObapMessageHubController } from '../obap-messaging/obap-message-hub-controller.js';

/**
 * An iFrame view based desktop application framework.
 */
export class ObapCompositeApplication extends ObapRouterController(ObapThemeController(ObapMessageHubController(ObapElement))) {
    static get styles() {
        return [css`
            :host {
                display: block;
                height: 100%;
                padding: 4px;
                box-sizing: border-box;
                background: var(--obap-surface-color, #FFFFFF); 
            }
    
            :host([hidden]) {
                display: none !important;
            }
    
            :host([disabled]) {
                pointer-events: none;
            }

            obap-top-app-bar {
                grid-area: header;
                margin-bottom: 4px;
            }

            obap-navigation-bar {
                grid-area: sidebar;
                margin-right: 4px;
            }

            obap-pages {
                height: 100%;
            }

            obap-button[default-item] {
                pointer-events: none;
            }

            .container {
                
                display: grid;
                grid-gap: 0px;
                grid-template-rows: auto 1fr;
                grid-template-columns: auto 1fr;
                grid-template-areas: "header  header"
                                     "sidebar content";
                height: 100%;
                
            }

            .content {
                grid-area: content;
                background: var(--obap-surface-color, #FFFFFF);
            }

            .title-icon {
                margin: 0 -4px;
            }
        `];
    }

    static get properties() {
        return {
            defaultTitle: {
                type: String,
                attribute: 'default-title'
            },

            defaultIcon: {
                type: String,
                attribute: 'default-icon'
            },

            items: {
                type: Array
            },

            selectedApplicationDetails: {
                type: Object
            },

            defaultApplicationDetails: {
                type: Object
            },

            elevation: {
                type: Number
            },

            hideLabels: {
                type: Boolean,
                attribute: 'hide-labels'
            },

            hideIcons: {
                type: Boolean,
                attribute: 'hide-icons'
            }
        }
    }

    constructor() {
        super();

        this.defaultTitle = 'Application';
        this.defaultIcon = '';
        this.items = [];
        this.elevation = 0;
        this._selectedApplicationDetails = null;
        this._defaultApplicationDetails = null;
        this.hideLabels = false;
        this.hideIcons = false;

        this.addTheme('green', '#80e27e', '#4caf50', '#087f23', '#ffc107', '#FAFAFA');
        this.theme = 'default';
    }

    get selectedApplicationDetails() {
        return this._selectedApplicationDetails;
    }

    get defaultApplicationDetails() {
        return this._defaultApplicationDetails;
    }

    connectedCallback() {
        super.connectedCallback();
        this.startMessageHub();
    }

    disconnectedCallback() {
        this.stopMessageHub();
        super.disconnectedCallback();
    }

    updated(changedProperties) {
        super.updated(changedProperties);

        changedProperties.forEach((oldValue, propName) => {
            if (propName === 'items') {
                this._loadHosts();
            }
        });
    }

    render() {
        return html`
            <div class="container">
                <obap-top-app-bar ?hidden="${this._hideTitle(this.selectedApplicationDetails)}" elevation="${this.elevation}" caption="${this._getTitle(this.defaultTitle, this.selectedApplicationDetails)}">
                    <obap-button ?default-item="${this.currentRoute ? this.currentRoute.isDefault : false}" @click="${this._onToolbarButtonClick}" round class="title-icon" slot="left" icon="${this._getIcon(this.defaultIcon, this.selectedApplicationDetails)}" icon-src="${ifDefined(this._getIconSrc(this.defaultIcon, this.selectedApplicationDetails))}"></obap-button>
                </obap-top-app-bar>
                <obap-navigation-bar ?hidden="${this._isModal(this.selectedApplicationDetails)}" .items="${this.items}" elevation="${this.elevation}" @obap-navigation-bar-change="${this._selectionChanged}"
                                     ?hide-icons="${this.hideIcons}" ?hide-labels="${this.hideLabels}"
                                     selected-index="${this.selectedApplicationDetails ? this.selectedApplicationDetails.index : -1}"
                                     selected-sub-index="${this.selectedApplicationDetails ? this.selectedApplicationDetails.subIndex : -1}"></obap-navigation-bar>
                ${this._renderContent()}
            </div>
        `;
    }

    _renderContent() {
        return html`
            <obap-material class="content" elevation="${this.elevation}">
                <obap-pages selected-index="${this.selectedApplicationDetails ? this.selectedApplicationDetails.index : -1}">
                    ${this.items.map((item, index) => this._renderChildContent(item, index))}
                </obap-pages>
            </obap-material>
        `;
    }

    _renderChildContent(item, index) {
        const hasChildren = item.items && item.items.length > 0;
        const usePages = hasChildren && (item.items.filter(child => child.url).length > 0);

        if (usePages) {
            return html`
                <obap-pages selected-index="${this.selectedApplicationDetails ? this.selectedApplicationDetails.displaySubIndex : -1}">
                    ${item.url ? html`<obap-composite-application-container host-id="${item.id}" ?load="${this._canLoad(item, this.selectedApplicationDetails, false)}" class="view-content" url="${item.url}" caption="${item.label}"></obap-composite-application-container>` : null}
                    ${item.items.filter(child => child.url).map((child) => html`
                        <obap-composite-application-container host-id="${child.id}" ?load="${this._canLoad(child, this.selectedApplicationDetails, true)}" class="view-content" url="${child.url}" caption="${child.label}"></obap-composite-application-container>
                    `)}
                </obap-pages>
            `;
        } else {
            let childLabel = 'No Child';

            if (hasChildren && this.selectedApplicationDetails && (this.selectedApplicationDetails.subIndex > -1 && (this.selectedApplicationDetails.index === index))) {
                const child = item.items[this.selectedApplicationDetails.subIndex];
                childLabel = child.label; 
            }

            return html`<obap-composite-application-container host-id="${item.id}" ?load="${this._canLoad(item, this.selectedApplicationDetails, false)}" class="view-content" url="${item.url}" caption="${item.label}"></obap-composite-application-container>`;
        }
    }

    _canLoad(item, details, isChild) {
        if (item.autoLoad) {
            return true;
        } else if (details) {
            return item === (isChild ? details.subItem : details.item);
        }

        return false;
    }

    _isModal(application) {
        if ((application) && (application.item)) {
            return application.subItem ? (application.subItem.modal || application.subItem.noNavigation) : application.item.modal;
        }

        return false;
    }

    _hideTitle(application) {
        
        const result = application && application.item && application.item.hideTitle;
        console.log('hide title : ' + result)
        console.log(application)
        return application && application.item && application.item.hideTitle;
        
    }

    _getTitle(defaultTitle, application) {
        if (application) {
            if (application.item) {
                if (application.subItem) {
                    return `${application.item.label} - ${application.subItem.label}`;
                }

                return application.item.label;
            }
        }

        return defaultTitle;
    }

    _getIcon(defaultIcon, application) {
        if (application) {
            return this._isModal(application) ? 'core:chevron-left' : application.item.icon;
        }

        return defaultIcon;
    }

    _getIconSrc(defaultIcon, application) {
        if (application) {
            return this._isModal(application) ? undefined : application.item.iconSrc;
        }

        return defaultIcon;
    }

    _selectView(index, subIndex, source) {
        //console.log(`SELECT VIEW: ${index}, ${subIndex}`)
        if ((!this.selectedApplicationDetails) || (this.selectedApplicationDetails.index !== index) || (this.selectedApplicationDetails.subIndex !== subIndex)) {
            const oldValue = this.selectedApplicationDetails;
            const item = this.items[index];
    
            let subItem = null;

            if (subIndex > -1) {
                if (item.items && item.items.length > 0) {
                    subItem = item.items[subIndex];

                    if (!subItem) {
                        subIndex = -1;
                    }
                } else {
                    subIndex = -1;
                }
            }

            let displaySubIndex = subIndex;

            if (subItem) {
                if (subItem.url) {
                    displaySubIndex = item.items.filter(child => child.url).indexOf(subItem) + (item.url ? 1 : 0);
                } else {
                    displaySubIndex = 0;
                }
            }

            let isDefault = this.defaultApplicationDetails ? (this.defaultApplicationDetails.index === index && this.defaultApplicationDetails.subIndex === subIndex) : false; 

            this._selectedApplicationDetails = {
                index: index,
                subIndex: subIndex,
                displaySubIndex: displaySubIndex,
                item: item,
                subItem: subItem,
                isDefault: isDefault
            }

            this._previousSelectedApplicationDetails = oldValue;

            this.requestUpdate('selectedApplicationDetails', oldValue);

            this.sendMessageToAllClients({
                type: 'deactivate',
                body: {
                    appId: oldValue && oldValue.item ? oldValue.item.id : -1,
                    viewId: oldValue && oldValue.subItem ? oldValue.subItem.id : -1,
                    manageView: (oldValue && oldValue.subItem) ? (oldValue.subItem.url ? false : true) : false
                }
            });

            this.sendMessageToClient(subItem && subItem.url ? subItem.id : item.id, {
                type: 'activate',
                body: {
                    appId: item.id,
                    viewId: subItem ? subItem.id : -1,
                    manageView: subItem && subItem.url ? false : true
                }
            });

            if (subItem) {
                this.setCurrentRoute(`${item.id}-${subItem.id}`, null);
            } else {
                this.setCurrentRoute(`${item.id}`, null);
            }
        }
    }

    _selectionChanged(e) {
        this._selectView(e.detail.index, e.detail.subIndex, 'event');
    }

    _loadHosts() {
        this.hostList = [...this.renderRoot.querySelectorAll('obap-composite-application-container')].map(host => {
            return {
                id: host.hostId,
                host: host,
                loaded: false
            }
        });

        this.hostMap = new Map();

        this.hostList.forEach(host => {
            this.hostMap.set(host.id, host)
        });

        let defaultDetails = null;
        let hasDefaultDetails = false;

        this.items.forEach((item, index) => {
            let isDefault = false;

            if (!hasDefaultDetails && item.default) {
                defaultDetails = {
                    index: index,
                    subIndex: (item.items && item.items.length > 0) ? 0 : -1
                }

                hasDefaultDetails = true;
                isDefault = true;
            }

            if (item.items && item.items.length > 0) {
                item.items.forEach((child, childIndex) => {
                    this.registerRoute(new ObapRoute(`${item.id}-${child.id}`, `/${item.id}/${child.id}`, (isDefault && (childIndex === 0))));
                });
            } else {
                this.registerRoute(new ObapRoute(`${item.id}`, `/${item.id}`, isDefault));
            }
        });

        if (this.items && this.items.length > 0) {
            if (!defaultDetails) {
                const firstItem = this.items[0];
                const firstSubItemIndex = (firstItem.items && firstItem.items.length > 0) ? 0 : -1;

                defaultDetails = {
                    index: 0,
                    subIndex: firstSubItemIndex
                }
            }

            this.setRouteFromUrl();

            if (this.currentRoute) {
                this._loadViewFromRoute();
            } 
        }

        this._defaultApplicationDetails = defaultDetails;
        this.requestUpdate('defaultApplicationDetails', null);

        if (!this.currentRoute && this.defaultApplicationDetails) {
            this._selectView(this.defaultApplicationDetails.index, this.defaultApplicationDetails.subIndex, 'no route');
        }
    }

    _loadViewFromRoute() {
        if (this.currentRoute) {
            const patternParts = this.currentRoute.pattern.split('/')
            const item = this.items.find(item => item.id === patternParts[1]);

            if (item) {
                if (item.items && item.items.length > 0) {
                    const subItem = item.items.find(item => item.id === patternParts[2]);
                    item.selectedIndex = item.items.indexOf(subItem);

                    if (subItem) {
                        this._selectView(this.items.indexOf(item), item.selectedIndex, 'route');
                    } else {
                        this._selectView(this.items.indexOf(item), -1, 'route');
                    }
                } else {
                    item.selectedIndex = -1;
                    this._selectView(this.items.indexOf(item), item.selectedIndex, 'route');
                }
            }
        }
    }

    onThemeChanged(name) {
        this.sendMessageToAllClients({
            type: 'change-theme',
            body: {
                theme: this.getThemeDetail(this.theme)
            }
        });
    }

    onRouteChange(name) {
        this._loadViewFromRoute();
    }

    onClientRegistered(message) {
        this.sendMessageToClient(message.source, {
            type: 'initialize',
            body: {
                appId: this.selectedApplicationDetails.item.id,
                viewId: this.selectedApplicationDetails.subItem ? this.selectedApplicationDetails.subItem.id : -1,
                manageView: this.selectedApplicationDetails.subItem && this.selectedApplicationDetails.subItem.url ? false : true,
                theme: this.getThemeDetail(this.theme),
                locale: this._getLocaleInfo()
            }
        });
    }

    onClientUnregistered(message) {

    }

    onClientMessage(message) {
        if (message && message.type) {
            switch (message.type) {
                case 'navigate': {
                    if (message.body.to) {
                        this.setCurrentRoute(message.body.to);
                    }

                    break;
                }

                case 'show-snackbar': {
                     const snackbar = document.createElement('obap-snackbar');

                    snackbar.message = message.body.message;
                    snackbar.timeout = message.body.timeout;
                    snackbar.action = message.body.action;

                    snackbar.addEventListener('obap-snackbar-dismissed', (e) => {
                        if (message.correlationId) {
                            this.sendMessageToClient(message.source, {
                                type: 'snackbar-dismissed',
                                correlationId: message.correlationId,
                                body: null
                            });
                        }

                        this.renderRoot.removeChild(snackbar);
                    });

                    this.renderRoot.appendChild(snackbar);

                    setTimeout(() => {
                        snackbar.show();
                    }, 100);
                    
                    break;
                }
                
                case 'show-message-dialog': {
                    const dlg = document.createElement('obap-message-dialog');

                    dlg.caption = message.body.caption;
                    dlg.message = message.body.message;
                    dlg.actions = message.body.actions;

                    dlg.addEventListener('obap-message-dialog-action', (e) => {
                        if (message.correlationId) {
                            this.sendMessageToClient(message.source, {
                                type: 'message-dialog-dismissed',
                                correlationId: message.correlationId,
                                body: e.detail.action
                            });
                        }

                        this.renderRoot.removeChild(dlg);
                    });

                    this.renderRoot.appendChild(dlg);
                    dlg.open();

                    break;
                }

                case 'show-dialog': {
                    const dlg = document.createElement('obap-composite-application-dialog');
                    
                    dlg.content = message.body.content;
                    dlg.dialogId  = message.body.id;
                    dlg.correlationId = message.correlationId;
                    dlg.initiatorId = message.source;
                    dlg.customData = message.body.data;
                    dlg.sendActionKeyPress = (key) => {
                        this.sendMessageToClient(dlg.dialogId, {
                            type: 'dialog-action',
                            body: { 
                                action: key
                            }
                        });
                    };

                    dlg.onDismiss((action) => {
                        this.sendMessageToClient(dlg.dialogId, {
                            type: 'dialog-dismissed',
                            body: { 
                                action: action
                            }
                        });
                    });

                    this.renderRoot.appendChild(dlg);

                    dlg.open();

                    break;
                }

                case 'initialize-dialog': {
                    const dlg = this.renderRoot.querySelector(`obap-composite-application-dialog[dialog-id="${message.source}"]`);

                    if (dlg) {
                        const data = message.body;
                        dlg.caption = data.caption;
                        dlg.actions = data.actions;
                        dlg.contentWidth = data.width;
                        dlg.contentHeight = data.height;

                        if (message.correlationId) {
                            this.sendMessageToClient(dlg.dialogId, {
                                type: 'initialize-dialog-response',
                                correlationId: message.correlationId,
                                body: {
                                    theme: this.getThemeDetail(this.theme),
                                    customData: dlg.customData
                                }
                            });
                        }
                    }

                    break;
                }

                case 'dialog-result': {
                    const dlg = this.renderRoot.querySelector(`obap-composite-application-dialog[dialog-id="${message.source}"]`);

                    if (dlg) {
                        this.sendMessageToClient(dlg.initiatorId, {
                            correlationId: dlg.correlationId,
                            type: 'dlg-response',
                            body: message.body
                        });

                        this.renderRoot.removeChild(dlg);
                    }
                    
                    break;
                }
            }
        }
    }

    _getLocaleInfo() {
        return {
            name: 'en'
        };
    }

    _onToolbarButtonClick(e) {
        if ((this.selectedApplicationDetails.subItem && (this.selectedApplicationDetails.subItem.modal || this.selectedApplicationDetails.subItem.noNavigation)) ||
            (this.selectedApplicationDetails.item && this.selectedApplicationDetails.item.modal)) {
            if (this._previousSelectedApplicationDetails) {
                this._selectView(this._previousSelectedApplicationDetails.index, this._previousSelectedApplicationDetails.subIndex, 'tool')
            } else {
                this.navigateToDefault();
            }
        } else {
            this.navigateToDefault();
        }
    }
}

window.customElements.define('obap-composite-application', ObapCompositeApplication);
