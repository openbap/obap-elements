# Iconography

The OBAP elements use 24x24 SVG icons and provides the full suite of [Material Design icons](https://material.io/resources/icons/?style=baseline) that can be used in your applications. You can also create and register your own SVG icon sets for use in your application.

## Using the Material Design Icons

The core icon set functionality is provided by `obap-icons`, which manages the icons used by applications. You generally don't need to use it directly unless you want to register a custom icon set. Before you can use icons in your application, you need to include at least one icon set (group) in your application. The following icon sets are provided out of the box:

* av
* communication
* core
* device
* editor
* hardware
* image
* maps
* notification
* places
* social
* standard

All of the sets, except `core` are well documented on the Material Design website. The `core` icons are a small set that are used by the other elements in the suite, so the should always be included in your application. You'd normally display an icon by using the `obap-icon` element and setting the icon attribute/property. You need to prefix the icon name with the icon set name (`set-name:icon-name`) except in the case of the standard icons, in which case you can simply use the icon name.

```javascript
// Always import the 'core' icon set.
import '@obap/obap-elements/obap-icons/obap-core-icons.js';

// Import the 'device' icon set.
import '@obap/obap-elements/obap-icons/obap-device-icons.js';

// Import the 'standard' icon set.
import '@obap/obap-elements/obap-icons/obap-standard-icons.js';

// Import the 'obap-icon' element.
import '@obap/obap-elements/obap-icon/obap-icon.js';

<obap-icon icon="device:bluetooth"></obap-material>
<obap-icon icon="core:chevron-left"></obap-material>

// Standard icons don't need a group prefix (same as 'standard:android').
<obap-icon icon="android"></obap-material>
```

*Note: An icon set only needs to be imported once, so it's best to do it at the application element level.*

## Creating an Icon Set

It's not a good idea to include all the provided icon sets if you aren't going to use all of them (there's a lot of icons that will just take up space). It's better to copy the ones you want from the provided icon sets (or create your own) and create your own set.

```javascript
// In a file called 'my-icons.js'.
import { obapIcons } from '@obap/obap-elements/obap-icons/obap-icons.js';

obapIcons.addGroup('my-icons', `
    <defs>
        <g id="chevron-left"><path d="M15.41 7.41L14 6l-6 6 6 6 1.41-1.41L10.83 12z"/></g>
        <g id="chevron-right"><path d="M10 6L8.59 7.41 13.17 12l-4.58 4.59L10 18l6-6z"/></g>
    </defs>
`);
```

This creates a new icon set called `my-icons`, which you can use like this:

```javascript
// Import your icon set.
import './my-icons.js';

// Import the 'obap-icon' element.
import '@obap/obap-elements/obap-icon/obap-icon.js';

<obap-icon icon="my-icons:chevron-left"></obap-material>
<obap-icon icon="my-icons:chevron-right"></obap-material>
```

*If you want to create your own icons, ensure that they are 24x24 in size.*

