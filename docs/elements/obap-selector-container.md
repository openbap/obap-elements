# obap-selector-container

A container that synchronises multiple selectors. It should contain more than one (two is typical) selectors (elements that include `ObapSelectableMixin` or `ObapMultiSelectableMixin`) whose `selectedIndex` you wish to synchronise. You can set the initial selected index on the container, which will then be set on the appropriate children. Changing the selected index on a child (say, by clicking on a tab), will be reflected by the container and any other selectable children. All light DOM children are considered for selection (not just immediate children), so they can be nested like the `obap-tabs` element, which is contained in a `obap-material` container.

Note: You shouldn't set the selected index on a child directly; only use the container for changing the selected index.

## Usage

```html
import '@obap/obap-elements/obap-selector/obap-selector-container.js';
import '@obap/obap-elements/obap-tabs/obap-tabs.js';
import '@obap/obap-elements/obap-pages/obap-pages.js';
import '@obap/obap-elements/obap-material/obap-material.js';

<obap-selector-container selected-index="0">
    <obap-material>
        <obap-tabs>
            <obap-tab>Tab 1</obap-tab>
            <obap-tab>Tab 2</obap-tab>
            <obap-tab>Tab 3</obap-tab>
        </obap-tabs>
    </obap-material>
    <obap-pages>
        <div>Page 1</div>
        <div>Page 2</div>
        <div>Page 3</div>
    </obap-pages>
</obap-selector-container>
```

## Properties

| Property        | Attribute        | Type      | Default | Description                              |
|-----------------|------------------|-----------|---------|------------------------------------------|
| `disabled`      | `disabled`       | `Boolean` | "false" | If true, the button will be disabled.    |
| `role`          | `role`           | `String`  | "null"  | The ARIA role of the element.            |
| `selectedIndex` | `selected-index` | `Number`  | "1"     | Gets or sets the selected element index. |
