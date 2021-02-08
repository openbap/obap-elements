/*
@license
Copyright (c) 2021 Paul H Mason. All rights reserved.
*/
import { html, css, ObapElement } from '../../src/obap-element/obap-element.js';
import '../../src/obap-toolbar/obap-toolbar.js';

export class ToolbarDemo extends ObapElement {
    static get styles() {
        return [css`
            :host {
                display: block;
            }
    
            .container {
                height: 100%;
            }

            .title {
                padding: 4px 8px;
                margin-bottom: 8px;
                color: var(--obap-on-primary-color);
                background: var(--obap-primary-color);
            }

            /*
            .row {
              display: flex;
              flex-direction: row;
              flex-wrap: wrap;
              align-items: center;
              padding: 0;
            }
            */

           obap-toolbar {
               margin-bottom: 8px;
           }

            obap-toolbar > obap-toolbar-button {
               min-width: 64px;
           }

            obap-toolbar[vertical]  > obap-toolbar-button {
               min-height: 64px;
            }

            obap-toolbar[vertical] {
               margin-top: 8px;
               height: 300px;
            }

            .custom-button {
                --obap-toolbar-color: #FFFF00;
                --obap-toolbar-inactive-color:#FFFDE7;
            }
        `];
    }

    render() {
        return html`
            <div class="container">
                <div class="title">Horizontal</div>
                <div class="row">
                    <obap-toolbar @click="${this._toolbarClick}">
                        <obap-toolbar-button label="Home" icon="standard:home" tooltip="Go to home page"></obap-toolbar-button>
                        <obap-toolbar-button label="Find" icon="standard:search" tooltip="Find a task"></obap-toolbar-button>
                        <obap-toolbar-button label="Bugs" icon="standard:bug-report" class="custom-button" tooltip="Log a bug"></obap-toolbar-button>
                    </obap-toolbar>
                </div>

                <div class="title">Label Position</div>
                <div class="row">
                    <obap-toolbar @click="${this._toolbarClick}">
                        <obap-toolbar-button label="Left" icon="standard:bug-report" tooltip="Go to home page" label-position="left"></obap-toolbar-button>
                        <obap-toolbar-button label="Right" icon="standard:bug-report" tooltip="Go to home page" label-position="right"></obap-toolbar-button>
                        <obap-toolbar-button label="Top" icon="standard:bug-report" tooltip="Go to home page" label-position="top"></obap-toolbar-button>
                        <obap-toolbar-button label="Bottom" icon="standard:bug-report" tooltip="Go to home page" label-position="bottom"></obap-toolbar-button>
                    </obap-toolbar>
                </div>

                <div class="title">Vertical</div>
                <div class="row">
                    <obap-toolbar @click="${this._toolbarClick}" vertical>
                        <obap-toolbar-button label="Home" icon="standard:home" tooltip="Go to home page"></obap-toolbar-button>
                        <obap-toolbar-button label="Find" icon="standard:search" tooltip="Find a task"></obap-toolbar-button>
                        <obap-toolbar-button label="Bugs" icon="standard:bug-report" class="custom-button" tooltip="Log a bug"></obap-toolbar-button>
                    </obap-toolbar>
                </div>
            </div>
        `;
    }

    _toolbarClick(e) {
        console.log(e.target);
    }
}

window.customElements.define('toolbar-demo', ToolbarDemo);