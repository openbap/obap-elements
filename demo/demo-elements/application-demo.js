/*
@license
Copyright (c) 2021 Paul H Mason. All rights reserved.
*/
import { html, css, ObapElement } from '../../src/obap-element/obap-element.js';
import '../../src/obap-application/obap-application.js';

export class ApplicationDemo extends ObapElement {
    static get styles() {
        return [css`
            :host {
                display: block;
                height: 100%;
            }
    
            obap-application {
                height: 100%;
            }
        `]; 
    }
    
    render() {
        return html`
            <obap-application label="Mail Application" icon="mail">
                <!-- Normal Views -->
                <obap-application-view name="inbox" label="Inbox" icon="inbox" navigators="rail" badge-label="5">
                    <obap-application-content name="inbox-all" label="All">Inbox All</obap-application-content>
                    <obap-application-content name="inbox-flagged" label="Flagged">Inbox Flagged</obap-application-content>
                </obap-application-view>

                <obap-application-view name="starred" label="Starred" icon="star-border" navigators="rail">
                    <obap-application-content>Starred</obap-application-content>
                </obap-application-view>

                <obap-application-view name="sent" label="Sent" icon="send" navigators="rail">
                    <obap-application-content>Sent</obap-application-content>
                    <obap-application-content label="Side Content" slot="side">Side Content</obap-application-content>
                </obap-application-view>

                <obap-application-view name="trash" label="Trash" icon="delete" navigators="rail">
                    <obap-application-content>Trash</obap-application-content>
                </obap-application-view>

                <obap-application-view name="spam" label="Spam" icon="info-outline" navigators="rail">
                    <obap-application-content>Spam</obap-application-content>
                </obap-application-view>

                <obap-application-view name="drafts" label="Drafts" icon="drafts" navigators="rail">
                    <obap-application-content>Drafts</obap-application-content>
                </obap-application-view>

                <!-- Fab Views -->
                <obap-application-view modal name="compose" label="Compose" icon="add" navigators="fab">
                    <obap-application-content>Compose</obap-application-content>
                </obap-application-view>
            </obap-application>
        `;
    }
}

window.customElements.define('application-demo', ApplicationDemo);