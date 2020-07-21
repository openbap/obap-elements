/*
@license
Copyright (c) 2020 Paul H Mason. All rights reserved.
*/
import { html, css, ObapElement } from '../obap-element/obap-element.js';
import {ObapTreeviewItemController} from './obap-treeview-item-controller.js';
import { body } from '../obap-styles/obap-typography.js';
import './obap-treeview-item.js';

/**
* A Material Design heirarchical treeview.

```javascript
this.items = [
    {
        label: 'Dogs',
        icon: ''
    },
    {
        label: 'Cats',
        items: [
            {
                label: 'Siamese'
            },
            {
                label: 'Persian'
            },
            {
                label: 'Sphynx'
            }
        ]
    },
    {
        label: 'Unicorns'
    }
];
```

```html
<obap-treeview label="Pets" .items="${this.items}"></obap-treeview>
```
*/
export class ObapTreeview extends ObapTreeviewItemController(ObapElement) {
    static get styles() {
        return [body, css`
            :host {
                display: block;
            }
    
            :host([hidden]) {
                display: none !important;
            }
    
            :host([disabled]) {
                pointer-events: none;
            }

            .container {
                padding: 8px;
            }
        `];
    }

    constructor() {
        super();
        this._currentSelection = null;
    }

    render() {
        return html`
            <div class="container typography-body" @obap-treeview-selection-change=${this._onSelectionChange}>
                <obap-treeview-item label="${this.label ? this.label : ''}" .items="${this.items}" select-mode="${this.selectMode}" 
                                    ?select-leaf-only="${this.selectLeafOnly}" icon="${this.icon ? this.icon : ''}" .item="${this}"
                                    open-icon="${this.openIcon}" close-icon="${this.closeIcon}" ?selected="${this.selected}" ?open="${this.open}" root>
                </obap-treeview-item>
            </div>
        `;
    }

    _onSelectionChange(e) {
        if ((this.selectMode !== 'multiple') && this._currentSelection) {
            this._currentSelection.selected = false;
            this._currentSelection.indeterminate = false;
        }

        this._currentSelection = e.detail.sourceElement;
    }
}

window.customElements.define('obap-treeview', ObapTreeview);