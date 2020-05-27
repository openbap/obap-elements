# Theming

Theming in the context of OBAP elements only involves colors and follows a modified version of the [Material Design standards](https://material.io/design/color/the-color-system.html#color-theme-creation) (a mix of V1 and V2). It's implemented as a fairly large set of CSS custom variables (only a few of which are configurable).

## Creating Themes

The theming system only has a single default theme (blue and pink), so you'll probaly want to create at least one theme for your application. Theme management is all done using the `theme` export from `obap-theme.js`.

```javascript
import { theme } from '@obap/obap-elements/obap-styles/obap-theme.js';
```

You can then create a theme like so:

```javascript
theme.create('green', '#4caf50', '#087f23', '#80e27e', '#ffc107', '#FAFAFA');
``

The `theme.create` method has the following signature (the parameters are self-explanatory):

```javascript
create(name, primary, primaryDark, primaryLight, accent, window)
```

## Setting Themes
Setting themes should be restricted to specific elements (usually the top level application element) and is managed *via* the `ObapThemeableMixin` mixin. Typically, you'll add the mixin to your application element and create custom themes and set themes in the application element.


```javascript
import { html, css, ObapElement } from '@obap/obap-elements/obap-element/obap-element.js';
import { ObapThemeableMixin, themeManager } from '@obap/obap-elements/obap-styles/obap-themeable-mixin.js';

export class MyApp extends ObapThemeableMixin(ObapElement) {
    constructor() {
        super();
        
        themeManager.create('green', '#4caf50', '#087f23', '#80e27e', '#ffc107', '#FAFAFA');
        this.theme = 'green';
    }
}

window.customElements.define('my-app', MyApp);
```

*Note: `theme` is exported by the mixin module as `themeManager` so that is doesn't cause issues with the `theme` property that the mixin adds to the element.*

Themes are set at the shadow boundary, so different themes can be applied to different elements (if they use the mixin).

## Using a Theme

Since a theme is just a bunch of CSS variables, you use them the same way as any CSS variable.

```css
.some-class {
    color: var(--obap-on-primary-color);
    background: var(--obap-primary-color);
    border: 1px solid var(--obap-divider-on-primary-color);
}
```

## Theme Variables

|CSS Variable                      |Can Modify  |
|----------------------------------|:----------:|
|--obap-primary-light-color        |Yes         |
|--obap-primary-color              |Yes         |
|--obap-primary-dark-color         |Yes         |
|--obap-accent-color               |Yes         |
|--obap-window-color               |Yes         |
|--obap-surface-color              |No          |
|--obap-error-color                |No          |
|--obap-notification-color         |No          | 
|--obap-selection-color            |No          | 
|--obap-block-color                |No          | 
|--obap-on-primary-color           |No          |
|--obap-on-primary-inactive-color  |No          |
|--obap-on-accent-color            |No          |
|--obap-on-accent-inactive-color   |No          |
|--obap-on-background-color        |No          |
|--obap-on-surface-color           |No          |
|--obap-on-window-color            |No          |
|--obap-on-error-color             |No          |
|--obap-on-notification-color      |No          |
|--obap-on-selection-color         |No          |
|--obap-text-primary-color         |No          |
|--obap-text-secondary-color       |No          |
|--obap-text-hint-color            |No          |
|--obap-text-disabled-color        |No          |
|--obap-text-icon-color            |No          |
|--obap-divider-on-primary-color   |No          |
|--obap-divider-on-surface-color   |No          |