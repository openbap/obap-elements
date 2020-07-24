

```js script
import { html } from '@open-wc/demoing-storybook';
import { withKnobs, withWebComponentsKnobs } from '@open-wc/demoing-storybook';
import '../src/obap-button/obap-button.js';

export default {
  title: 'obap-button',
  component: 'obap-button',
  options: { selectedPanel: "storybookjs/knobs/panel" },
  decorators: [withKnobs, withWebComponentsKnobs],
  parameters: { options: { selectedPanel: 'storybookjs/knobs/panel' } },
};
```

# obap-button

A Material Design button component with various styles, such as regular, raised, rectangular and round (floating action button).

```js
import '@obap/obap-elements/obap-button/obap-button.js';
```

##### Normal
```js preview-story
export const Normal = () => html`
  <style>
    obap-button {
      margin-right: 8px;
    }
  </style>

  <obap-button label="flat"></obap-button>
  <obap-button label="raised" raised></obap-button>
  <obap-button label="no ink" raised noink></obap-button>
  <obap-button label="icon" icon="core:edit" raised></obap-button>
  <obap-button label="toggle" icon="core:edit" raised toggle></obap-button>
  <obap-button label="disabled" raised disabled></obap-button>
`;
```

##### Round
```js preview-story
export const Round = () => html`
  <style>
    obap-button {
      margin-right: 8px;
    }
  </style>
  
  <obap-button round icon="core:edit"></obap-button>
  <obap-button round icon="core:edit" raised></obap-button>
  <obap-button round icon="core:edit" raised noink></obap-button>
  <obap-button round icon="core:edit" label="label" raised></obap-button>
  <obap-button round icon="core:edit" label="toggle" raised toggle></obap-button>
  <obap-button round icon="core:edit" raised disabled></obap-button>
`;
```

### API

<sb-props of="obap-button"></sb-props>