# obap-material

A Material Design container that looks like a lifted piece of paper. 

## Usage

```javascript
import '@obap/obap-elements/obap-material/obap-material.js';

<obap-material elevation="2">
    <!-- Slotted Content -->
</obap-material>
```

## Properties

|Property |attribute |Type   |Default|Reflects |Notes                                          |
|---------|----------|-------|-------|:-------:|-----------------------------------------------|
|elevation|elevation |Number |1      |true     |Allowed values: 0, 1, 2, 3, 4, 6, 8, 12, 16, 24|

## Styling

### Default Host Style

```css
:host {
    display: block;
    border-radius: 3px;
    box-sizing: border-box;
    padding: 24px;
    background: var(--obap-surface-color, #FFFFFF);
    color: var(--obap-on-surface-color, rgba(black, 0.87));
}
```

## Slots

* Default Slot.

## Inherits

* ObapElement
* LitElement
* HTMLElement