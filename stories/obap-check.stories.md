```js script
import { html } from '@open-wc/demoing-storybook';
import { withKnobs, withWebComponentsKnobs } from '@open-wc/demoing-storybook';
import '../src/obap-check/obap-check.js';

export default {
  title: 'obap-check',
  component: 'obap-check',
  options: { selectedPanel: "storybookjs/knobs/panel" },
  decorators: [withKnobs, withWebComponentsKnobs],
  parameters: { options: { selectedPanel: 'storybookjs/knobs/panel' } },
};
```

# obap-check

A Material Design checkbox component.

## Features:

TODO

## Importing

```js
import '@obap/obap-elements/obap-check/obap-check.js';
```

```js preview-story
export const Simple = () => html`
  <obap-check label="check"></obap-check>
`;
```

## Variations

###### Custom Title

```js preview-story
export const CustomTitle = () => html`
  <obap-check label="check"></obap-check>
`;
```

## API

<sb-props of="obap-check"></sb-props>