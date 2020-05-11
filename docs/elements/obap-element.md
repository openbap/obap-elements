# obap-element

`ObapElement` is a LitElement decendent class that's used as the base class for all the OBAP elements.

## Usage

You simply use `ObapElement` as your base class, rather than `LitElement` or `HTMLElement`.

```javascript
import { html, css, ObapElement } from '@obap/obap-elements/obap-element/obap-element.js';

export class MyElement extends ObapElement {
    static get styles() {
        return [css`
            :host {
                display: block;
            }
    
            :host([hidden]) {
                display: none !important;
            }
    
            :host([disabled]) {
                pointer-events: none;
            }
        `];
    }

    constructor() {
        super();
        this.disabled = false;
        this.role = 'button';
    }
}

window.customElements.define('my-element', MyElement);
```

## Properties

| Property   | Attribute  | Type      | Default | Description                           |
|------------|------------|-----------|---------|---------------------------------------|
| `disabled` | `disabled` | `Boolean` | "false" | If true, the button will be disabled. |
| `role`     | `role`     | `String`  | "null"  | The ARIA role of the element.         |
