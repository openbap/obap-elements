# obap-icon

Displays a single svg icon.  

## Usage

```javascript
import '@obap/obap-elements/obap-icons/obap-device-icons.js';
import '@obap/obap-elements/obap-icon/obap-icon.js';

<obap-icon icon="device:bluetooth"></obap-material>
```

## Properties

| Property   | Attribute  | Type      | Default | Description                                      |
|------------|------------|-----------|---------|--------------------------------------------------|
| `disabled` | `disabled` | `Boolean` | "false" | If true, the button will be disabled.            |
| `icon`     | `icon`     | `string`  | ""      | The name of the icon to use. The name should be of the form: `iconset_name:icon_name`. |
| `role`     | `role`     | `String`  | "null"  | The ARIA role of the element.                    |
